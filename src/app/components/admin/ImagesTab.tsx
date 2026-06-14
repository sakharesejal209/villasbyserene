"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { IoAdd as AddIcon } from "react-icons/io5";
import {
  MdDeleteOutline as DeleteIcon,
  MdOutlineEdit as EditIcon,
  MdOutlineDeleteSweep as DeleteSweepIcon,
} from "react-icons/md";

import { httpService } from "@/app/@services";
import {
  AdminPropertyDetailDTO,
  AdminUnitDTO,
  AdminPropertyImageDTO,
  AdminUnitImageDTO,
  PoolImage,
  ImageCategory,
  ImageSelection,
} from "@/app/@types";

interface Props {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}

export const ImagesTab = ({ detail, propertyId, onSaved }: Props) => {
  const [prefix, setPrefix] = useState("");
  const [poolImages, setPoolImages] = useState<PoolImage[]>([]);
  const [categories, setCategories] = useState<ImageCategory[]>([]);
  const [searching, setSearching] = useState(false);
  const [newImg, setNewImg] = useState({
    image_url: "",
    image_alt: "",
    image_category_id: "",
  });
  const [adding, setAdding] = useState(false);
  const [assignMode, setAssignMode] = useState<"property" | "unit">("property");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selections, setSelections] = useState<Map<string, ImageSelection>>(
    new Map(),
  );
  const [submitting, setSubmitting] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // bulk delete from pool
  const [deleteMode, setDeleteMode] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  // bulk unassign — property images (Step 3)
  const [propUnassignMode, setPropUnassignMode] = useState(false);
  const [propUnassignSel, setPropUnassignSel] = useState<Set<string>>(
    new Set(),
  );
  const [bulkUnassigningProp, setBulkUnassigningProp] = useState(false);
  // bulk unassign — unit images (Step 3)
  const [unitUnassignMode, setUnitUnassignMode] = useState(false);
  const [unitUnassignSel, setUnitUnassignSel] = useState<Set<string>>(
    new Set(),
  );
  const [bulkUnassigningUnit, setBulkUnassigningUnit] = useState(false);

  const assignedPropIds = new Set(
    detail.images.map((pi: AdminPropertyImageDTO) => pi.image_id),
  );
  const assignedUnitIds = (uid: string) =>
    new Set(
      detail.units
        .find((u: AdminUnitDTO) => u.unit_id === uid)
        ?.images?.map((ui: AdminUnitImageDTO) => ui.image_id) ?? [],
    );

  useEffect(() => {
    httpService<ImageCategory[]>()
      .get("/admin/properties/images/categories")
      .then(setCategories)
      .catch(() => {});
  }, []);

  // Clear selections when mode or unit changes
  useEffect(() => {
    setSelections(new Map());
  }, [assignMode, selectedUnit, deleteMode]);

  const searchPool = async () => {
    if (!prefix.trim()) return;
    setSearching(true);
    setSelections(new Map());
    try {
      const data = await httpService<PoolImage[]>().get(
        `/admin/properties/images/pool?prefix=${encodeURIComponent(prefix)}`,
      );
      setPoolImages(data);
    } catch {
      setError("Failed to search images");
    } finally {
      setSearching(false);
    }
  };

  const addToPool = async () => {
    if (!newImg.image_url || !newImg.image_alt) return;
    setAdding(true);
    try {
      const res = await httpService<PoolImage>().post(
        "/admin/properties/images/pool",
        {
          image_url: newImg.image_url,
          image_alt: newImg.image_alt,
          image_category_id: newImg.image_category_id
            ? +newImg.image_category_id
            : null,
        },
      );
      setPoolImages((prev) => [
        ...prev.filter((i) => i.image_id !== res.image_id),
        res,
      ]);
      setNewImg({ image_url: "", image_alt: "", image_category_id: "" });
      setSuccess("Image added to pool");
    } catch {
      setError("Failed to add image");
    } finally {
      setAdding(false);
    }
  };

  const deleteFromPool = async (imageId: string) => {
    if (!confirm("Delete image from pool? This also removes all assignments."))
      return;
    setRemoving(imageId);
    try {
      await httpService().delete(`/admin/properties/images/pool/${imageId}`);
      setPoolImages((prev) => prev.filter((i) => i.image_id !== imageId));
      setSelections((prev) => {
        const n = new Map(prev);
        n.delete(imageId);
        return n;
      });
      onSaved();
    } catch {
      setError("Failed to delete");
    } finally {
      setRemoving(null);
    }
  };

  // NEW: bulk delete selected images from pool
  const bulkDeleteFromPool = async () => {
    if (selections.size === 0) return;
    if (
      !confirm(
        `Delete ${selections.size} image${selections.size > 1 ? "s" : ""} from pool? This also removes all their assignments.`,
      )
    )
      return;
    setBulkDeleting(true);
    const ids = Array.from(selections.keys());
    const results = await Promise.allSettled(
      ids.map((id) =>
        httpService().delete(`/admin/properties/images/pool/${id}`),
      ),
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    const succeeded = ids.filter((_, i) => results[i].status === "fulfilled");
    setPoolImages((prev) =>
      prev.filter((img) => !succeeded.includes(img.image_id)),
    );
    setSelections(new Map());
    if (failed > 0) {
      setError(`${failed} image${failed > 1 ? "s" : ""} failed to delete`);
    } else {
      setSuccess(
        `${succeeded.length} image${succeeded.length > 1 ? "s" : ""} deleted from pool`,
      );
    }
    onSaved();
    setBulkDeleting(false);
  };

  // bulk unassign property images
  const bulkUnassignProp = async () => {
    if (propUnassignSel.size === 0) return;
    if (
      !confirm(
        `Remove ${propUnassignSel.size} image${propUnassignSel.size > 1 ? "s" : ""} from this property?`,
      )
    )
      return;
    setBulkUnassigningProp(true);
    const ids = Array.from(propUnassignSel);
    const results = await Promise.allSettled(
      ids.map((id) =>
        httpService().delete(
          `/admin/properties/${propertyId}/images/unassign/${id}`,
        ),
      ),
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    setPropUnassignSel(new Set());
    if (failed > 0) {
      setError(`${failed} image${failed > 1 ? "s" : ""} failed to unassign`);
    } else {
      setSuccess(
        `${ids.length - failed} image${ids.length - failed > 1 ? "s" : ""} removed from property`,
      );
    }
    onSaved();
    setBulkUnassigningProp(false);
  };

  // bulk unassign unit images
  const bulkUnassignUnit = async () => {
    if (!selectedUnit || unitUnassignSel.size === 0) return;
    if (
      !confirm(
        `Remove ${unitUnassignSel.size} image${unitUnassignSel.size > 1 ? "s" : ""} from this unit?`,
      )
    )
      return;
    setBulkUnassigningUnit(true);
    const ids = Array.from(unitUnassignSel);
    const results = await Promise.allSettled(
      ids.map((id) =>
        httpService().delete(
          `/admin/properties/${propertyId}/units/${selectedUnit}/images/unassign/${id}`,
        ),
      ),
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    setUnitUnassignSel(new Set());
    if (failed > 0) {
      setError(`${failed} image${failed > 1 ? "s" : ""} failed to unassign`);
    } else {
      setSuccess(
        `${ids.length - failed} image${ids.length - failed > 1 ? "s" : ""} removed from unit`,
      );
    }
    onSaved();
    setBulkUnassigningUnit(false);
  };

  const toggleSelect = (img: PoolImage) => {
    setSelections((prev) => {
      const n = new Map(prev);
      if (n.has(img.image_id)) {
        n.delete(img.image_id);
      } else {
        n.set(img.image_id, {
          image_id: img.image_id,
          is_banner_image: false,
          is_carousel_image: false,
          display_order: n.size,
        });
      }
      return n;
    });
  };

  const updateSelection = (imageId: string, patch: Partial<ImageSelection>) => {
    setSelections((prev) => {
      const n = new Map(prev);
      const cur = n.get(imageId);
      if (cur) n.set(imageId, { ...cur, ...patch });
      return n;
    });
  };

  const submitAssignments = async () => {
    if (selections.size === 0) {
      setError("No images selected");
      return;
    }
    if (assignMode === "unit" && !selectedUnit) {
      setError("Select a unit first");
      return;
    }
    setSubmitting(true);
    try {
      await Promise.all(
        Array.from(selections.values()).map((sel) =>
          assignMode === "property"
            ? httpService().post(
                `/admin/properties/${propertyId}/images/assign`,
                sel,
              )
            : httpService().post(
                `/admin/properties/${propertyId}/units/${selectedUnit}/images/assign`,
                sel,
              ),
        ),
      );
      setSuccess(
        `${selections.size} image${selections.size > 1 ? "s" : ""} assigned`,
      );
      setSelections(new Map());
      onSaved();
    } catch {
      setError("Failed to assign some images");
    } finally {
      setSubmitting(false);
    }
  };

  const unassignProp = async (imageId: string) => {
    setRemoving(imageId);
    try {
      await httpService().delete(
        `/admin/properties/${propertyId}/images/unassign/${imageId}`,
      );
      setSuccess("Removed");
      onSaved();
    } catch {
      setError("Failed to remove");
    } finally {
      setRemoving(null);
    }
  };

  const unassignUnit = async (imageId: string) => {
    if (!selectedUnit) return;
    setRemoving(imageId);
    try {
      await httpService().delete(
        `/admin/properties/${propertyId}/units/${selectedUnit}/images/unassign/${imageId}`,
      );
      setSuccess("Removed");
      onSaved();
    } catch {
      setError("Failed to remove");
    } finally {
      setRemoving(null);
    }
  };

  const isCurrentlyAssigned = (imageId: string) =>
    assignMode === "property"
      ? assignedPropIds.has(imageId)
      : assignedUnitIds(selectedUnit).has(imageId);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {/* Step 1 */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
          Step 1 — Add Images to Pool
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 0.2,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "3fr 2fr 1fr" },
              gap: 1.5,
            }}
          >
            <TextField
              label="Firebase Image URL"
              size="small"
              value={newImg.image_url}
              onChange={(e) =>
                setNewImg((i) => ({ ...i, image_url: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Alt text (e.g. air-eco-pool-01)"
              defaultValue="cliffview-"
              size="small"
              value={newImg.image_alt}
              onChange={(e) =>
                setNewImg((i) => ({ ...i, image_alt: e.target.value }))
              }
              fullWidth
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newImg.image_category_id}
                label="Category"
                onChange={(e) =>
                  setNewImg((i) => ({
                    ...i,
                    image_category_id: e.target.value as string,
                  }))
                }
              >
                <MenuItem value="">None</MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c.category_id} value={c.category_id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={
                adding ? (
                  <CircularProgress size={14} color="inherit" />
                ) : (
                  <AddIcon />
                )
              }
              onClick={addToPool}
              disabled={!newImg.image_url || !newImg.image_alt || adding}
              sx={{ borderRadius: 0.2 }}
            >
              {adding ? "Adding..." : "Add to Pool"}
            </Button>
          </Box>
        </Paper>
      </Box>

      <Divider />

      {/* Step 2 */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
          Step 2 — Search, Select & Assign
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
          <TextField
            label="Alt text prefix (e.g. air-eco)"
            size="small"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchPool()}
            sx={{ flex: 1 }}
          />
          <Button
            variant="outlined"
            onClick={searchPool}
            disabled={searching}
            sx={{ borderRadius: 0.2, minWidth: 100 }}
          >
            {searching ? <CircularProgress size={18} /> : "Search"}
          </Button>
        </Box>

        {poolImages.length > 0 && (
          <>
            {/* Mode bar — assign controls on left, Bulk Delete toggle on right */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mb: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {/* Assign-mode controls — hidden in delete mode */}
              {!deleteMode && (
                <>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    Assign to:
                  </Typography>
                  <Chip
                    label="Property"
                    clickable
                    size="small"
                    onClick={() => setAssignMode("property")}
                    color={assignMode === "property" ? "primary" : "default"}
                    variant={assignMode === "property" ? "filled" : "outlined"}
                  />
                  <Chip
                    label="Unit"
                    clickable
                    size="small"
                    onClick={() => setAssignMode("unit")}
                    color={assignMode === "unit" ? "primary" : "default"}
                    variant={assignMode === "unit" ? "filled" : "outlined"}
                  />
                  {assignMode === "unit" && (
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                      <InputLabel>Select Unit</InputLabel>
                      <Select
                        value={selectedUnit}
                        label="Select Unit"
                        onChange={(e) => setSelectedUnit(e.target.value)}
                      >
                        {detail.units.map((u: AdminUnitDTO) => (
                          <MenuItem key={u.unit_id} value={u.unit_id}>
                            {u.title || u.unit_type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </>
              )}

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: deleteMode ? 0 : "auto" }}
              >
                {deleteMode
                  ? `Select images to delete · ${selections.size} selected`
                  : `Click image to select · ${selections.size} selected`}
              </Typography>

              {/* Bulk Delete toggle */}
              <Button
                size="small"
                variant={deleteMode ? "contained" : "outlined"}
                color="error"
                startIcon={<DeleteSweepIcon />}
                onClick={() => setDeleteMode((v) => !v)}
                sx={{ borderRadius: 0.2, ml: deleteMode ? "auto" : 0 }}
              >
                {deleteMode ? "Cancel Delete" : "Bulk Delete"}
              </Button>
            </Box>

            {deleteMode && (
              <Alert severity="warning" sx={{ mb: 1.5, borderRadius: 0.2 }}>
                Bulk delete mode — selecting an image will delete it from the
                pool and remove all its assignments.
              </Alert>
            )}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                gap: 1.5,
                mb: 2,
              }}
            >
              {poolImages.map((img) => {
                const alreadyAssigned = isCurrentlyAssigned(img.image_id);
                const sel = selections.get(img.image_id);
                const isSelected = !!sel;

                // In delete mode every image is clickable; in assign mode skip already-assigned
                const isClickable = deleteMode || !alreadyAssigned;

                return (
                  <Paper
                    key={img.image_id}
                    elevation={0}
                    sx={{
                      border: "2px solid",
                      borderColor: isSelected
                        ? deleteMode
                          ? "error.main"
                          : "primary.main"
                        : alreadyAssigned && !deleteMode
                          ? "success.main"
                          : "divider",
                      borderRadius: 0.2,
                      overflow: "hidden",
                      position: "relative",
                      cursor: isClickable ? "pointer" : "default",
                      opacity: removing === img.image_id ? 0.4 : 1,
                      transition: "border-color 0.15s, opacity 0.15s",
                    }}
                    onClick={() => isClickable && toggleSelect(img)}
                  >
                    <Box
                      component="img"
                      src={img.image_url}
                      sx={{
                        width: "100%",
                        height: 100,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <Box sx={{ position: "absolute", top: 4, left: 4 }}>
                      {isSelected && deleteMode && (
                        <Chip
                          label="✕ Delete"
                          size="small"
                          color="error"
                          sx={{ fontSize: 9, height: 16 }}
                        />
                      )}
                      {isSelected && !deleteMode && (
                        <Chip
                          label="✓ Selected"
                          size="small"
                          color="primary"
                          sx={{ fontSize: 9, height: 16 }}
                        />
                      )}
                      {alreadyAssigned && !isSelected && !deleteMode && (
                        <Chip
                          label="Assigned"
                          size="small"
                          color="success"
                          sx={{ fontSize: 9, height: 16 }}
                        />
                      )}
                    </Box>

                    {/* Single-image delete button — hidden in bulk delete mode */}
                    {!deleteMode && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFromPool(img.image_id);
                        }}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          bgcolor: "rgba(0,0,0,0.5)",
                          color: "#fff",
                          width: 20,
                          height: 20,
                        }}
                      >
                        {removing === img.image_id ? (
                          <CircularProgress size={10} color="inherit" />
                        ) : (
                          <DeleteIcon fontSize={12} />
                        )}
                      </IconButton>
                    )}

                    <Box sx={{ p: 0.75 }}>
                      <Typography
                        variant="caption"
                        display="block"
                        noWrap
                        color="text.secondary"
                        sx={{ fontSize: 10, mb: 0.5 }}
                      >
                        {img.image_alt}
                      </Typography>

                      {/* Assign options — only in assign mode */}
                      {isSelected && sel && !deleteMode && (
                        <Box
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            <FormControlLabel
                              sx={{ m: 0 }}
                              label={
                                <Typography sx={{ fontSize: 9 }}>
                                  Banner
                                </Typography>
                              }
                              control={
                                <Switch
                                  size="small"
                                  checked={sel.is_banner_image}
                                  onChange={(e) =>
                                    updateSelection(img.image_id, {
                                      is_banner_image: e.target.checked,
                                    })
                                  }
                                />
                              }
                            />
                            {assignMode === "property" && (
                              <FormControlLabel
                                sx={{ m: 0 }}
                                label={
                                  <Typography sx={{ fontSize: 9 }}>
                                    Carousel
                                  </Typography>
                                }
                                control={
                                  <Switch
                                    size="small"
                                    checked={sel.is_carousel_image}
                                    onChange={(e) =>
                                      updateSelection(img.image_id, {
                                        is_carousel_image: e.target.checked,
                                      })
                                    }
                                  />
                                }
                              />
                            )}
                          </Box>
                          <TextField
                            label="Order"
                            type="number"
                            size="small"
                            value={sel.display_order}
                            onChange={(e) =>
                              updateSelection(img.image_id, {
                                display_order: +e.target.value,
                              })
                            }
                            sx={{
                              "& .MuiInputBase-input": {
                                py: 0.25,
                                fontSize: 11,
                              },
                            }}
                          />
                        </Box>
                      )}

                      {/* Unassign button — only in assign mode */}
                      {alreadyAssigned && !deleteMode && (
                        <Button
                          size="small"
                          color="error"
                          fullWidth
                          disabled={removing === img.image_id}
                          onClick={(e) => {
                            e.stopPropagation();
                            assignMode === "property"
                              ? unassignProp(img.image_id)
                              : unassignUnit(img.image_id);
                          }}
                          sx={{
                            fontSize: 10,
                            minHeight: 24,
                            borderRadius: 0.2,
                            mt: 0.5,
                          }}
                        >
                          {removing === img.image_id ? (
                            <CircularProgress size={12} />
                          ) : (
                            "Remove"
                          )}
                        </Button>
                      )}
                    </Box>
                  </Paper>
                );
              })}
            </Box>

            {/* Sticky action bar */}
            {selections.size > 0 && (
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid",
                  borderColor: deleteMode ? "error.main" : "primary.main",
                  borderRadius: 0.2,
                  position: "sticky",
                  bottom: 16,
                  zIndex: 10,
                }}
              >
                <Typography variant="body2" fontWeight={700}>
                  {selections.size} image{selections.size > 1 ? "s" : ""}{" "}
                  selected
                  {!deleteMode && (
                    <>
                      {" → "}
                      {assignMode === "unit" && selectedUnit
                        ? detail.units.find((u) => u.unit_id === selectedUnit)
                            ?.title || "Unit"
                        : "Property"}
                    </>
                  )}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() => setSelections(new Map())}
                    sx={{ borderRadius: 0.2 }}
                  >
                    Clear
                  </Button>
                  {deleteMode ? (
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={bulkDeleteFromPool}
                      disabled={bulkDeleting}
                      startIcon={
                        bulkDeleting ? (
                          <CircularProgress size={14} color="inherit" />
                        ) : (
                          <DeleteSweepIcon />
                        )
                      }
                      sx={{ borderRadius: 0.2, fontWeight: 700 }}
                    >
                      {bulkDeleting ? "Deleting..." : "Delete All"}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={submitAssignments}
                      disabled={
                        submitting || (assignMode === "unit" && !selectedUnit)
                      }
                      startIcon={
                        submitting ? (
                          <CircularProgress size={14} color="inherit" />
                        ) : undefined
                      }
                      sx={{ borderRadius: 0.2, fontWeight: 700 }}
                    >
                      {submitting ? "Assigning..." : "Assign All"}
                    </Button>
                  )}
                </Box>
              </Paper>
            )}
          </>
        )}
      </Box>

      <Divider />

      {/* Step 3 — Current assignments */}
      <Box>
        {/* ── Property images ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <Typography variant="subtitle2" fontWeight={700}>
            Current Property Images
          </Typography>
          {detail.images.length > 0 && (
            <Button
              size="small"
              variant={propUnassignMode ? "contained" : "outlined"}
              color="error"
              startIcon={<DeleteSweepIcon />}
              onClick={() => {
                setPropUnassignMode((v) => !v);
                setPropUnassignSel(new Set());
              }}
              sx={{ borderRadius: 0.2 }}
            >
              {propUnassignMode ? "Cancel" : "Bulk Remove"}
            </Button>
          )}
        </Box>

        {propUnassignMode && (
          <Alert severity="warning" sx={{ mb: 1.5, borderRadius: 0.2 }}>
            Bulk remove mode — click images to select, then confirm removal.
          </Alert>
        )}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
          {detail.images.map(
            (pi: AdminPropertyImageDTO) =>
              pi.image && (
                <Box
                  key={pi.image_id}
                  onClick={() => {
                    if (!propUnassignMode) return;
                    setPropUnassignSel((prev) => {
                      const n = new Set(prev);
                      n.has(pi.image_id)
                        ? n.delete(pi.image_id)
                        : n.add(pi.image_id);
                      return n;
                    });
                  }}
                  sx={{
                    position: "relative",
                    width: 400,
                    cursor: propUnassignMode ? "pointer" : "default",
                    opacity: removing === pi.image_id ? 0.4 : 1,
                    outline: propUnassignSel.has(pi.image_id)
                      ? "2px solid"
                      : "none",
                    outlineColor: "error.main",
                    borderRadius: 0.2,
                    transition: "opacity 0.15s, outline 0.1s",
                  }}
                >
                  <Box
                    component="img"
                    src={pi.image.image_url}
                    sx={{
                      width: 400,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 0.2,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 2,
                      left: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.25,
                    }}
                  >
                    {propUnassignSel.has(pi.image_id) && (
                      <Chip
                        label="✕ Remove"
                        size="small"
                        color="error"
                        sx={{ fontSize: 8, height: 14 }}
                      />
                    )}
                    {!propUnassignSel.has(pi.image_id) &&
                      pi.is_banner_image === "true" && (
                        <Chip
                          label="Banner"
                          size="small"
                          color="primary"
                          sx={{ fontSize: 8, height: 14 }}
                        />
                      )}
                    {!propUnassignSel.has(pi.image_id) &&
                      pi.is_carousel_image === "true" && (
                        <Chip
                          label="Carousel"
                          size="small"
                          color="secondary"
                          sx={{ fontSize: 8, height: 14 }}
                        />
                      )}
                  </Box>
                  {/* Single remove button — hidden in bulk mode */}
                  {!propUnassignMode && (
                    <IconButton
                      size="small"
                      color="error"
                      disabled={removing === pi.image_id}
                      onClick={() => unassignProp(pi.image_id)}
                      sx={{
                        position: "absolute",
                        bottom: 2,
                        right: 2,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        width: 18,
                        height: 18,
                      }}
                    >
                      {removing === pi.image_id ? (
                        <CircularProgress size={10} color="inherit" />
                      ) : (
                        <DeleteIcon fontSize={11} />
                      )}
                    </IconButton>
                  )}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    noWrap
                    sx={{ fontSize: 9 }}
                  >
                    Order: {pi.display_order}
                  </Typography>
                </Box>
              ),
          )}
          {detail.images.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No images assigned yet
            </Typography>
          )}
        </Box>

        {/* Sticky bar — property bulk remove */}
        {propUnassignMode && propUnassignSel.size > 0 && (
          <Paper
            elevation={2}
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid",
              borderColor: "error.main",
              borderRadius: 0.2,
              position: "sticky",
              bottom: 16,
              zIndex: 10,
              mb: 2,
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              {propUnassignSel.size} image{propUnassignSel.size > 1 ? "s" : ""}{" "}
              selected
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                onClick={() => setPropUnassignSel(new Set())}
                sx={{ borderRadius: 0.2 }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={bulkUnassignProp}
                disabled={bulkUnassigningProp}
                startIcon={
                  bulkUnassigningProp ? (
                    <CircularProgress size={14} color="inherit" />
                  ) : (
                    <DeleteSweepIcon />
                  )
                }
                sx={{ borderRadius: 0.2, fontWeight: 700 }}
              >
                {bulkUnassigningProp ? "Removing..." : "Remove All"}
              </Button>
            </Box>
          </Paper>
        )}

        {/* ── Unit images ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="subtitle2" fontWeight={700}>
            Current Unit Images
          </Typography>
          {selectedUnit &&
            (detail.units.find((u) => u.unit_id === selectedUnit)?.images
              ?.length ?? 0) > 0 && (
              <Button
                size="small"
                variant={unitUnassignMode ? "contained" : "outlined"}
                color="error"
                startIcon={<DeleteSweepIcon />}
                onClick={() => {
                  setUnitUnassignMode((v) => !v);
                  setUnitUnassignSel(new Set());
                }}
                sx={{ borderRadius: 0.2 }}
              >
                {unitUnassignMode ? "Cancel" : "Bulk Remove"}
              </Button>
            )}
        </Box>

        {unitUnassignMode && (
          <Alert severity="warning" sx={{ mb: 1.5, borderRadius: 0.2 }}>
            Bulk remove mode — click images to select, then confirm removal.
          </Alert>
        )}

        <FormControl size="small" sx={{ mb: 1.5, minWidth: 200 }}>
          <InputLabel>View unit</InputLabel>
          <Select
            value={selectedUnit}
            label="View unit"
            onChange={(e) => {
              setSelectedUnit(e.target.value);
              setUnitUnassignMode(false);
              setUnitUnassignSel(new Set());
            }}
          >
            {detail.units.map((u: AdminUnitDTO) => (
              <MenuItem key={u.unit_id} value={u.unit_id}>
                {u.title || u.unit_type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedUnit && (
          <>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {detail.units
                .find((u: AdminUnitDTO) => u.unit_id === selectedUnit)
                ?.images?.map(
                  (ui: AdminUnitImageDTO) =>
                    ui.image && (
                      <Box
                        key={ui.image_id}
                        onClick={() => {
                          if (!unitUnassignMode) return;
                          setUnitUnassignSel((prev) => {
                            const n = new Set(prev);
                            n.has(ui.image_id)
                              ? n.delete(ui.image_id)
                              : n.add(ui.image_id);
                            return n;
                          });
                        }}
                        sx={{
                          position: "relative",
                          width: 120,
                          cursor: unitUnassignMode ? "pointer" : "default",
                          opacity: removing === ui.image_id ? 0.4 : 1,
                          outline: unitUnassignSel.has(ui.image_id)
                            ? "2px solid"
                            : "none",
                          outlineColor: "error.main",
                          borderRadius: 0.2,
                          transition: "opacity 0.15s, outline 0.1s",
                        }}
                      >
                        <Box
                          component="img"
                          src={ui.image.image_url}
                          sx={{
                            width: 120,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 0.2,
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 2,
                            left: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.25,
                          }}
                        >
                          {unitUnassignSel.has(ui.image_id) && (
                            <Chip
                              label="✕"
                              size="small"
                              color="error"
                              sx={{ fontSize: 8, height: 14 }}
                            />
                          )}
                          {!unitUnassignSel.has(ui.image_id) &&
                            ui.is_banner_image === "true" && (
                              <Chip
                                label="Banner"
                                size="small"
                                color="primary"
                                sx={{ fontSize: 8, height: 14 }}
                              />
                            )}
                        </Box>
                        {/* Single remove button — hidden in bulk mode */}
                        {!unitUnassignMode && (
                          <IconButton
                            size="small"
                            color="error"
                            disabled={removing === ui.image_id}
                            onClick={() => unassignUnit(ui.image_id)}
                            sx={{
                              position: "absolute",
                              bottom: 2,
                              right: 2,
                              bgcolor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                              width: 18,
                              height: 18,
                            }}
                          >
                            {removing === ui.image_id ? (
                              <CircularProgress size={10} color="inherit" />
                            ) : (
                              <DeleteIcon fontSize={11} />
                            )}
                          </IconButton>
                        )}
                      </Box>
                    ),
                )}
            </Box>

            {/* Sticky bar — unit bulk remove */}
            {unitUnassignMode && unitUnassignSel.size > 0 && (
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid",
                  borderColor: "error.main",
                  borderRadius: 0.2,
                  position: "sticky",
                  bottom: 16,
                  zIndex: 10,
                }}
              >
                <Typography variant="body2" fontWeight={700}>
                  {unitUnassignSel.size} image
                  {unitUnassignSel.size > 1 ? "s" : ""} selected
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() => setUnitUnassignSel(new Set())}
                    sx={{ borderRadius: 0.2 }}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={bulkUnassignUnit}
                    disabled={bulkUnassigningUnit}
                    startIcon={
                      bulkUnassigningUnit ? (
                        <CircularProgress size={14} color="inherit" />
                      ) : (
                        <DeleteSweepIcon />
                      )
                    }
                    sx={{ borderRadius: 0.2, fontWeight: 700 }}
                  >
                    {bulkUnassigningUnit ? "Removing..." : "Remove All"}
                  </Button>
                </Box>
              </Paper>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
