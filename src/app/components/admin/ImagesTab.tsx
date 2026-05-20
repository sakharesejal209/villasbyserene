// src/app/admin/properties/tabs/ImagesTab.tsx
// ── Unchanged from original — all functions kept as-is ────────────
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
import { AddOutlined, DeleteOutlined } from "@mui/icons-material";
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

  useEffect(() => {
    setSelections(new Map());
  }, [assignMode, selectedUnit]);

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
                  <AddOutlined />
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
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mb: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
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
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: "auto" }}
              >
                Click image to select · {selections.size} selected
              </Typography>
            </Box>

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
                return (
                  <Paper
                    key={img.image_id}
                    elevation={0}
                    sx={{
                      border: "2px solid",
                      borderColor: alreadyAssigned
                        ? "success.main"
                        : isSelected
                          ? "primary.main"
                          : "divider",
                      borderRadius: 0.2,
                      overflow: "hidden",
                      position: "relative",
                      cursor: alreadyAssigned ? "default" : "pointer",
                      opacity: removing === img.image_id ? 0.4 : 1,
                      transition: "border-color 0.15s, opacity 0.15s",
                    }}
                    onClick={() => !alreadyAssigned && toggleSelect(img)}
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
                      {alreadyAssigned && (
                        <Chip
                          label="Assigned"
                          size="small"
                          color="success"
                          sx={{ fontSize: 9, height: 16 }}
                        />
                      )}
                      {isSelected && !alreadyAssigned && (
                        <Chip
                          label="✓ Selected"
                          size="small"
                          color="primary"
                          sx={{ fontSize: 9, height: 16 }}
                        />
                      )}
                    </Box>
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
                        <DeleteOutlined sx={{ fontSize: 12 }} />
                      )}
                    </IconButton>
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
                      {isSelected && sel && (
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
                      {alreadyAssigned && (
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

            {selections.size > 0 && (
              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: 0.2,
                  position: "sticky",
                  bottom: 16,
                  zIndex: 10,
                }}
              >
                <Typography variant="body2" fontWeight={700}>
                  {selections.size} image{selections.size > 1 ? "s" : ""}{" "}
                  selected
                  {" → "}
                  {assignMode === "unit" && selectedUnit
                    ? detail.units.find((u) => u.unit_id === selectedUnit)
                        ?.title || "Unit"
                    : "Property"}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    onClick={() => setSelections(new Map())}
                    sx={{ borderRadius: 0.2 }}
                  >
                    Clear
                  </Button>
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
                </Box>
              </Paper>
            )}
          </>
        )}
      </Box>

      <Divider />

      {/* Step 3 — Current assignments */}
      <Box>
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
          Current Property Images
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
          {detail.images.map(
            (pi: AdminPropertyImageDTO) =>
              pi.image && (
                <Box
                  key={pi.image_id}
                  sx={{
                    position: "relative",
                    width: 400,
                    opacity: removing === pi.image_id ? 0.4 : 1,
                    transition: "opacity 0.15s",
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
                    {pi.is_banner_image === "true" && (
                      <Chip
                        label="Banner"
                        size="small"
                        color="primary"
                        sx={{ fontSize: 8, height: 14 }}
                      />
                    )}
                    {pi.is_carousel_image === "true" && (
                      <Chip
                        label="Carousel"
                        size="small"
                        color="secondary"
                        sx={{ fontSize: 8, height: 14 }}
                      />
                    )}
                  </Box>
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
                      <DeleteOutlined sx={{ fontSize: 11 }} />
                    )}
                  </IconButton>
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

        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
          Current Unit Images
        </Typography>
        <FormControl size="small" sx={{ mb: 1.5, minWidth: 200 }}>
          <InputLabel>View unit</InputLabel>
          <Select
            value={selectedUnit}
            label="View unit"
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            {detail.units.map((u: AdminUnitDTO) => (
              <MenuItem key={u.unit_id} value={u.unit_id}>
                {u.title || u.unit_type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedUnit && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {detail.units
              .find((u: AdminUnitDTO) => u.unit_id === selectedUnit)
              ?.images?.map(
                (ui: AdminUnitImageDTO) =>
                  ui.image && (
                    <Box
                      key={ui.image_id}
                      sx={{
                        position: "relative",
                        width: 120,
                        opacity: removing === ui.image_id ? 0.4 : 1,
                        transition: "opacity 0.15s",
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
                      {ui.is_banner_image === "true" && (
                        <Chip
                          label="Banner"
                          size="small"
                          color="primary"
                          sx={{
                            position: "absolute",
                            top: 2,
                            left: 2,
                            fontSize: 8,
                            height: 14,
                          }}
                        />
                      )}
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
                          <DeleteOutlined sx={{ fontSize: 11 }} />
                        )}
                      </IconButton>
                    </Box>
                  ),
              )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
