"use client";

import { AdminUnitDTO, ImageSelection, PoolImage } from "@/app/@types";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
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
import {
  MdDeleteOutline as DeleteIcon,
  MdOutlineDeleteSweep as DeleteSweepIcon,
} from "react-icons/md";

interface Props {
  // search
  prefix: string;
  searching: boolean;
  poolImages: PoolImage[];
  onPrefixChange: (v: string) => void;
  onSearch: () => void;

  // mode
  assignMode: "property" | "unit";
  deleteMode: boolean;
  selectedUnit: string;
  units: AdminUnitDTO[];
  onAssignModeChange: (v: "property" | "unit") => void;
  onDeleteModeToggle: () => void;
  onSelectedUnitChange: (v: string) => void;

  // selections
  selections: Map<string, ImageSelection>;
  removing: string | null;
  submitting: boolean;
  bulkDeleting: boolean;
  onToggleSelect: (img: PoolImage) => void;
  onUpdateSelection: (imageId: string, patch: Partial<ImageSelection>) => void;
  onClearSelections: () => void;
  onSubmitAssignments: () => void;
  onBulkDelete: () => void;
  onDeleteFromPool: (imageId: string) => void;
  onUnassignProp: (imageId: string) => void;
  onUnassignUnit: (imageId: string) => void;

  // helpers
  isCurrentlyAssigned: (imageId: string) => boolean;
}

export const SearchAndAssignStep = ({
  prefix,
  searching,
  poolImages,
  onPrefixChange,
  onSearch,
  assignMode,
  deleteMode,
  selectedUnit,
  units,
  onAssignModeChange,
  onDeleteModeToggle,
  onSelectedUnitChange,
  selections,
  removing,
  submitting,
  bulkDeleting,
  onToggleSelect,
  onUpdateSelection,
  onClearSelections,
  onSubmitAssignments,
  onBulkDelete,
  onDeleteFromPool,
  onUnassignProp,
  onUnassignUnit,
  isCurrentlyAssigned,
}: Props) => (
  <Box>
    <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
      Step 2 — Search, Select & Assign
    </Typography>

    {/* Search bar */}
    <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
      <TextField
        label="Alt text prefix (e.g. air-eco)"
        size="small"
        value={prefix}
        onChange={(e) => onPrefixChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        sx={{ flex: 1 }}
      />
      <Button
        variant="outlined"
        onClick={onSearch}
        disabled={searching}
        sx={{ borderRadius: 0.2, minWidth: 100 }}
      >
        {searching ? <CircularProgress size={18} /> : "Search"}
      </Button>
    </Box>

    {poolImages.length > 0 && (
      <>
        {/* Mode bar */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap", alignItems: "center" }}>
          {!deleteMode && (
            <>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Assign to:
              </Typography>
              <Chip
                label="Property"
                clickable
                size="small"
                onClick={() => onAssignModeChange("property")}
                color={assignMode === "property" ? "primary" : "default"}
                variant={assignMode === "property" ? "filled" : "outlined"}
              />
              <Chip
                label="Unit"
                clickable
                size="small"
                onClick={() => onAssignModeChange("unit")}
                color={assignMode === "unit" ? "primary" : "default"}
                variant={assignMode === "unit" ? "filled" : "outlined"}
              />
              {assignMode === "unit" && (
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <InputLabel>Select Unit</InputLabel>
                  <Select
                    value={selectedUnit}
                    label="Select Unit"
                    onChange={(e) => onSelectedUnitChange(e.target.value)}
                  >
                    {units.map((u) => (
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

          <Button
            size="small"
            variant={deleteMode ? "contained" : "outlined"}
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={onDeleteModeToggle}
            sx={{ borderRadius: 0.2, ml: deleteMode ? "auto" : 0 }}
          >
            {deleteMode ? "Cancel Delete" : "Bulk Delete"}
          </Button>
        </Box>

        {deleteMode && (
          <Alert severity="warning" sx={{ mb: 1.5, borderRadius: 0.2 }}>
            Bulk delete mode — selecting an image will delete it from the pool and remove all its
            assignments.
          </Alert>
        )}

        {/* Pool grid */}
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
                onClick={() => isClickable && onToggleSelect(img)}
              >
                <Box
                  component="img"
                  src={img.image_url}
                  sx={{ width: "100%", height: 100, objectFit: "cover", display: "block" }}
                />
                <Box sx={{ position: "absolute", top: 4, left: 4 }}>
                  {isSelected && deleteMode && (
                    <Chip label="✕ Delete" size="small" color="error" sx={{ fontSize: 9, height: 16 }} />
                  )}
                  {isSelected && !deleteMode && (
                    <Chip label="✓ Selected" size="small" color="primary" sx={{ fontSize: 9, height: 16 }} />
                  )}
                  {alreadyAssigned && !isSelected && !deleteMode && (
                    <Chip label="Assigned" size="small" color="success" sx={{ fontSize: 9, height: 16 }} />
                  )}
                </Box>

                {/* Single-image delete — hidden in bulk delete mode */}
                {!deleteMode && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => { e.stopPropagation(); onDeleteFromPool(img.image_id); }}
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
                    {removing === img.image_id
                      ? <CircularProgress size={10} color="inherit" />
                      : <DeleteIcon fontSize={12} />}
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

                  {/* Assign options when selected */}
                  {isSelected && sel && !deleteMode && (
                    <Box
                      onClick={(e) => e.stopPropagation()}
                      sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                    >
                      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <FormControlLabel
                          sx={{ m: 0 }}
                          label={<Typography sx={{ fontSize: 9 }}>Banner</Typography>}
                          control={
                            <Switch
                              size="small"
                              checked={sel.is_banner_image}
                              onChange={(e) =>
                                onUpdateSelection(img.image_id, { is_banner_image: e.target.checked })
                              }
                            />
                          }
                        />
                        {assignMode === "property" && (
                          <FormControlLabel
                            sx={{ m: 0 }}
                            label={<Typography sx={{ fontSize: 9 }}>Carousel</Typography>}
                            control={
                              <Switch
                                size="small"
                                checked={sel.is_carousel_image}
                                onChange={(e) =>
                                  onUpdateSelection(img.image_id, { is_carousel_image: e.target.checked })
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
                          onUpdateSelection(img.image_id, { display_order: +e.target.value })
                        }
                        sx={{ "& .MuiInputBase-input": { py: 0.25, fontSize: 11 } }}
                      />
                    </Box>
                  )}

                  {/* Unassign button */}
                  {alreadyAssigned && !deleteMode && (
                    <Button
                      size="small"
                      color="error"
                      fullWidth
                      disabled={removing === img.image_id}
                      onClick={(e) => {
                        e.stopPropagation();
                        assignMode === "property"
                          ? onUnassignProp(img.image_id)
                          : onUnassignUnit(img.image_id);
                      }}
                      sx={{ fontSize: 10, minHeight: 24, borderRadius: 0.2, mt: 0.5 }}
                    >
                      {removing === img.image_id ? <CircularProgress size={12} /> : "Remove"}
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
              {selections.size} image{selections.size > 1 ? "s" : ""} selected
              {!deleteMode && (
                <>
                  {" → "}
                  {assignMode === "unit" && selectedUnit
                    ? units.find((u) => u.unit_id === selectedUnit)?.title || "Unit"
                    : "Property"}
                </>
              )}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button size="small" onClick={onClearSelections} sx={{ borderRadius: 0.2 }}>
                Clear
              </Button>
              {deleteMode ? (
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={onBulkDelete}
                  disabled={bulkDeleting}
                  startIcon={
                    bulkDeleting
                      ? <CircularProgress size={14} color="inherit" />
                      : <DeleteSweepIcon />
                  }
                  sx={{ borderRadius: 0.2, fontWeight: 700 }}
                >
                  {bulkDeleting ? "Deleting..." : "Delete All"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  onClick={onSubmitAssignments}
                  disabled={submitting || (assignMode === "unit" && !selectedUnit)}
                  startIcon={submitting ? <CircularProgress size={14} color="inherit" /> : undefined}
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
);
