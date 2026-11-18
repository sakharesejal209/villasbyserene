"use client";

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
  Typography,
} from "@mui/material";
import {
  MdDeleteOutline as DeleteIcon,
  MdOutlineDeleteSweep as DeleteSweepIcon,
  MdDragIndicator as DragIcon,
} from "react-icons/md";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { AdminPropertyImageDTO, AdminUnitDTO, AdminUnitImageDTO } from "@/app/@types";
import { PropImageFlag, UnitImageFlag } from "@/app/@types/admin/dto/ImagesTabDTO";


// ─── Sortable property image card ────────────────────────────────────────────

interface SortablePropCardProps {
  pi: AdminPropertyImageDTO;
}

const SortablePropCard = ({ pi }: SortablePropCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: pi.image_id });

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.45 : 1,
      }}
      sx={{
        position: "relative",
        width: 400,
        outline: "2px solid",
        outlineColor: "primary.main",
        borderRadius: 0.2,
        userSelect: "none",
        cursor: "grab",
      }}
    >
      {/* Full-card drag handle overlay */}
      <Box
        {...attributes}
        {...listeners}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0,0,0,0.3)",
          borderRadius: 0.2,
        }}
      >
        <DragIcon size={28} color="#fff" />
      </Box>
      <Box
        component="img"
        src={pi.image!.image_url}
        sx={{ width: 400, height: 100, objectFit: "cover", borderRadius: 0.2 }}
      />
      <Typography variant="caption" color="text.secondary" display="block" noWrap sx={{ fontSize: 9 }}>
        {pi.image!.image_alt}
      </Typography>
    </Box>
  );
};

// ─── Sortable unit image card ─────────────────────────────────────────────────

interface SortableUnitCardProps {
  ui: AdminUnitImageDTO;
}

const SortableUnitCard = ({ ui }: SortableUnitCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: ui.image_id });

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.45 : 1,
      }}
      sx={{
        position: "relative",
        width: 120,
        outline: "2px solid",
        outlineColor: "primary.main",
        borderRadius: 0.2,
        userSelect: "none",
        cursor: "grab",
      }}
    >
      <Box
        {...attributes}
        {...listeners}
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0,0,0,0.3)",
          borderRadius: 0.2,
        }}
      >
        <DragIcon size={20} color="#fff" />
      </Box>
      <Box
        component="img"
        src={ui.image!.image_url}
        sx={{ width: 120, height: 80, objectFit: "cover", borderRadius: 0.2 }}
      />
      <Typography variant="caption" color="text.secondary" display="block" noWrap sx={{ fontSize: 9 }}>
        {ui.image!.image_alt}
      </Typography>
    </Box>
  );
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  propertyId: string;
  propertyImages: AdminPropertyImageDTO[];
  units: AdminUnitDTO[];
  selectedUnit: string;
  removing: string | null;
  togglingImg: string | null;
  propImageFlags: Map<string, PropImageFlag>;
  unitImageFlags: Map<string, UnitImageFlag>;

  onSelectedUnitChange: (v: string) => void;
  onUnassignProp: (imageId: string) => void;
  onUnassignUnit: (imageId: string) => void;
  onTogglePropFlag: (imageId: string, flag: "is_banner_image" | "is_carousel_image", value: boolean) => void;
  onToggleUnitFlag: (imageId: string, flag: "is_banner_image", value: boolean) => void;
  onSavePropOrder: (ordered: AdminPropertyImageDTO[]) => Promise<void>;
  onSaveUnitOrder: (ordered: AdminUnitImageDTO[]) => Promise<void>;
  onBulkUnassignProp: (ids: string[]) => Promise<void>;
  onBulkUnassignUnit: (ids: string[]) => Promise<void>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CurrentImagesStep = ({
  propertyImages,
  units,
  selectedUnit,
  removing,
  togglingImg,
  propImageFlags,
  unitImageFlags,
  onSelectedUnitChange,
  onUnassignProp,
  onUnassignUnit,
  onTogglePropFlag,
  onToggleUnitFlag,
  onSavePropOrder,
  onSaveUnitOrder,
  onBulkUnassignProp,
  onBulkUnassignUnit,
}: Props) => {
  // ── Property image modes ──
  const [propUnassignMode, setPropUnassignMode] = useState(false);
  const [propUnassignSel, setPropUnassignSel] = useState<Set<string>>(new Set());
  const [bulkUnassigningProp, setBulkUnassigningProp] = useState(false);
  const [propReorderMode, setPropReorderMode] = useState(false);
  const [propOrderItems, setPropOrderItems] = useState<AdminPropertyImageDTO[]>([]);
  const [savingPropOrder, setSavingPropOrder] = useState(false);

  // ── Unit image modes ──
  const [unitUnassignMode, setUnitUnassignMode] = useState(false);
  const [unitUnassignSel, setUnitUnassignSel] = useState<Set<string>>(new Set());
  const [bulkUnassigningUnit, setBulkUnassigningUnit] = useState(false);
  const [unitReorderMode, setUnitReorderMode] = useState(false);
  const [unitOrderItems, setUnitOrderItems] = useState<AdminUnitImageDTO[]>([]);
  const [savingUnitOrder, setSavingUnitOrder] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const currentUnit = units.find((u) => u.unit_id === selectedUnit);
  const unitImages = currentUnit?.images ?? [];

  // ── Handlers ──

  const handleBulkUnassignProp = async () => {
    if (propUnassignSel.size === 0) return;
    if (!confirm(`Remove ${propUnassignSel.size} image${propUnassignSel.size > 1 ? "s" : ""} from this property?`))
      return;
    setBulkUnassigningProp(true);
    await onBulkUnassignProp(Array.from(propUnassignSel));
    setPropUnassignSel(new Set());
    setBulkUnassigningProp(false);
    setPropUnassignMode(false);
  };

  const handleBulkUnassignUnit = async () => {
    if (unitUnassignSel.size === 0) return;
    if (!confirm(`Remove ${unitUnassignSel.size} image${unitUnassignSel.size > 1 ? "s" : ""} from this unit?`))
      return;
    setBulkUnassigningUnit(true);
    await onBulkUnassignUnit(Array.from(unitUnassignSel));
    setUnitUnassignSel(new Set());
    setBulkUnassigningUnit(false);
    setUnitUnassignMode(false);
  };

  const handleSavePropOrder = async () => {
    setSavingPropOrder(true);
    await onSavePropOrder(propOrderItems);
    setSavingPropOrder(false);
    setPropReorderMode(false);
  };

  const handleSaveUnitOrder = async () => {
    setSavingUnitOrder(true);
    await onSaveUnitOrder(unitOrderItems);
    setSavingUnitOrder(false);
    setUnitReorderMode(false);
  };

  const enterPropReorder = () => {
    const sorted = [...propertyImages].sort((a, b) => a.display_order - b.display_order);
    setPropOrderItems(sorted);
    setPropReorderMode(true);
  };

  const enterUnitReorder = () => {
    const sorted = [...unitImages].sort((a, b) => a.display_order - b.display_order);
    setUnitOrderItems(sorted);
    setUnitReorderMode(true);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Box>

      {/* ══ PROPERTY IMAGES ══════════════════════════════════════════════════ */}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Typography variant="subtitle2" fontWeight={700}>
          Current Property Images
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {propertyImages.length > 1 && !propUnassignMode && (
            <Button
              size="small"
              variant={propReorderMode ? "contained" : "outlined"}
              color="primary"
              startIcon={<DragIcon />}
              onClick={() => propReorderMode ? setPropReorderMode(false) : enterPropReorder()}
              sx={{ borderRadius: 0.2 }}
            >
              {propReorderMode ? "Cancel" : "Reorder"}
            </Button>
          )}
          {propertyImages.length > 0 && !propReorderMode && (
            <Button
              size="small"
              variant={propUnassignMode ? "contained" : "outlined"}
              color="error"
              startIcon={<DeleteSweepIcon />}
              onClick={() => { setPropUnassignMode((v) => !v); setPropUnassignSel(new Set()); }}
              sx={{ borderRadius: 0.2 }}
            >
              {propUnassignMode ? "Cancel" : "Bulk Remove"}
            </Button>
          )}
        </Box>
      </Box>

      {propReorderMode ? (
        /* ── Drag-to-reorder grid ── */
        <>
          <Alert severity="info" sx={{ mb: 1.5, borderRadius: 0.2 }}>
            Drag images to rearrange. Order saves left-to-right (0, 1, 2…).
          </Alert>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event: DragEndEvent) => {
              const { active, over } = event;
              if (over && active.id !== over.id) {
                setPropOrderItems((items) => {
                  const oldIdx = items.findIndex((i) => i.image_id === active.id);
                  const newIdx = items.findIndex((i) => i.image_id === over.id);
                  return arrayMove(items, oldIdx, newIdx);
                });
              }
            }}
          >
            <SortableContext
              items={propOrderItems.map((i) => i.image_id)}
              strategy={rectSortingStrategy}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
                {propOrderItems.map((pi) =>
                  pi.image ? <SortablePropCard key={pi.image_id} pi={pi} /> : null,
                )}
              </Box>
            </SortableContext>
          </DndContext>

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
              mb: 2,
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              Drag to rearrange · {propOrderItems.length} images
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button size="small" onClick={() => setPropReorderMode(false)} sx={{ borderRadius: 0.2 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleSavePropOrder}
                disabled={savingPropOrder}
                startIcon={savingPropOrder ? <CircularProgress size={14} color="inherit" /> : undefined}
                sx={{ borderRadius: 0.2, fontWeight: 700 }}
              >
                {savingPropOrder ? "Saving..." : "Save Order"}
              </Button>
            </Box>
          </Paper>
        </>
      ) : (
        /* ── Normal property images grid ── */
        <>
          {propUnassignMode && (
            <Alert severity="warning" sx={{ mb: 1.5, borderRadius: 0.2 }}>
              Bulk remove mode — click images to select, then confirm removal.
            </Alert>
          )}

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
            {propertyImages.map(
              (pi) =>
                pi.image && (
                  <Box
                    key={pi.image_id}
                    onClick={() => {
                      if (!propUnassignMode) return;
                      setPropUnassignSel((prev) => {
                        const n = new Set(prev);
                        n.has(pi.image_id) ? n.delete(pi.image_id) : n.add(pi.image_id);
                        return n;
                      });
                    }}
                    sx={{
                      position: "relative",
                      width: 400,
                      cursor: propUnassignMode ? "pointer" : "default",
                      opacity: removing === pi.image_id || togglingImg === pi.image_id ? 0.4 : 1,
                      outline: propUnassignSel.has(pi.image_id) ? "2px solid" : "none",
                      outlineColor: "error.main",
                      borderRadius: 0.2,
                      transition: "opacity 0.15s, outline 0.1s",
                    }}
                  >
                    <Box
                      component="img"
                      src={pi.image.image_url}
                      sx={{ width: 400, height: 100, objectFit: "cover", borderRadius: 0.2 }}
                    />

                    <Box sx={{ position: "absolute", top: 2, left: 2, display: "flex", flexDirection: "column", gap: 0.25 }}>
                      {propUnassignSel.has(pi.image_id) && (
                        <Chip label="✕ Remove" size="small" color="error" sx={{ fontSize: 8, height: 14 }} />
                      )}
                      {!propUnassignMode && (
                        <Box
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            bgcolor: "rgba(0,0,0,0.55)",
                            borderRadius: 0.5,
                            px: 0.5,
                            py: 0.25,
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                          }}
                        >
                          <FormControlLabel
                            sx={{ m: 0 }}
                            label={<Typography sx={{ fontSize: 9, color: "#fff", lineHeight: 1 }}>Banner</Typography>}
                            control={
                              <Switch
                                size="small"
                                checked={(propImageFlags.get(pi.image_id)?.is_banner_image ?? pi.is_banner_image) === "true"}
                                disabled={togglingImg === pi.image_id}
                                onChange={(e) => onTogglePropFlag(pi.image_id, "is_banner_image", e.target.checked)}
                                sx={{ transform: "scale(0.7)", ml: -0.5 }}
                              />
                            }
                          />
                          <FormControlLabel
                            sx={{ m: 0 }}
                            label={<Typography sx={{ fontSize: 9, color: "#fff", lineHeight: 1 }}>Carousel</Typography>}
                            control={
                              <Switch
                                size="small"
                                checked={(propImageFlags.get(pi.image_id)?.is_carousel_image ?? pi.is_carousel_image) === "true"}
                                disabled={togglingImg === pi.image_id}
                                onChange={(e) => onTogglePropFlag(pi.image_id, "is_carousel_image", e.target.checked)}
                                sx={{ transform: "scale(0.7)", ml: -0.5 }}
                              />
                            }
                          />
                        </Box>
                      )}
                    </Box>

                    {!propUnassignMode && (
                      <IconButton
                        size="small"
                        color="error"
                        disabled={removing === pi.image_id}
                        onClick={() => onUnassignProp(pi.image_id)}
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
                        {removing === pi.image_id
                          ? <CircularProgress size={10} color="inherit" />
                          : <DeleteIcon fontSize={11} />}
                      </IconButton>
                    )}
                    <Typography variant="caption" color="text.secondary" display="block" noWrap sx={{ fontSize: 9 }}>
                      Order: {pi.display_order}
                    </Typography>
                  </Box>
                ),
            )}
            {propertyImages.length === 0 && (
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
                {propUnassignSel.size} image{propUnassignSel.size > 1 ? "s" : ""} selected
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button size="small" onClick={() => setPropUnassignSel(new Set())} sx={{ borderRadius: 0.2 }}>
                  Clear
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={handleBulkUnassignProp}
                  disabled={bulkUnassigningProp}
                  startIcon={
                    bulkUnassigningProp
                      ? <CircularProgress size={14} color="inherit" />
                      : <DeleteSweepIcon />
                  }
                  sx={{ borderRadius: 0.2, fontWeight: 700 }}
                >
                  {bulkUnassigningProp ? "Removing..." : "Remove All"}
                </Button>
              </Box>
            </Paper>
          )}
        </>
      )}

      {/* ══ UNIT IMAGES ══════════════════════════════════════════════════════ */}

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="subtitle2" fontWeight={700}>
          Current Unit Images
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {selectedUnit && unitImages.length > 1 && !unitUnassignMode && (
            <Button
              size="small"
              variant={unitReorderMode ? "contained" : "outlined"}
              color="primary"
              startIcon={<DragIcon />}
              onClick={() => unitReorderMode ? setUnitReorderMode(false) : enterUnitReorder()}
              sx={{ borderRadius: 0.2 }}
            >
              {unitReorderMode ? "Cancel" : "Reorder"}
            </Button>
          )}
          {selectedUnit && unitImages.length > 0 && !unitReorderMode && (
            <Button
              size="small"
              variant={unitUnassignMode ? "contained" : "outlined"}
              color="error"
              startIcon={<DeleteSweepIcon />}
              onClick={() => { setUnitUnassignMode((v) => !v); setUnitUnassignSel(new Set()); }}
              sx={{ borderRadius: 0.2 }}
            >
              {unitUnassignMode ? "Cancel" : "Bulk Remove"}
            </Button>
          )}
        </Box>
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
            onSelectedUnitChange(e.target.value);
            setUnitUnassignMode(false);
            setUnitUnassignSel(new Set());
            setUnitReorderMode(false);
          }}
        >
          {units.map((u) => (
            <MenuItem key={u.unit_id} value={u.unit_id}>
              {u.title || u.unit_type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedUnit && (
        <>
          {unitReorderMode ? (
            /* ── Drag-to-reorder grid ── */
            <>
              <Alert severity="info" sx={{ mb: 1.5, borderRadius: 0.2 }}>
                Drag images to rearrange. Order saves left-to-right (0, 1, 2…).
              </Alert>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event: DragEndEvent) => {
                  const { active, over } = event;
                  if (over && active.id !== over.id) {
                    setUnitOrderItems((items) => {
                      const oldIdx = items.findIndex((i) => i.image_id === active.id);
                      const newIdx = items.findIndex((i) => i.image_id === over.id);
                      return arrayMove(items, oldIdx, newIdx);
                    });
                  }
                }}
              >
                <SortableContext
                  items={unitOrderItems.map((i) => i.image_id)}
                  strategy={rectSortingStrategy}
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}>
                    {unitOrderItems.map((ui) =>
                      ui.image ? <SortableUnitCard key={ui.image_id} ui={ui} /> : null,
                    )}
                  </Box>
                </SortableContext>
              </DndContext>

              <Paper
                elevation={2}
                sx={{
                  p: 1.5,
                  mt: 2,
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
                  Drag to rearrange · {unitOrderItems.length} images
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button size="small" onClick={() => setUnitReorderMode(false)} sx={{ borderRadius: 0.2 }}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleSaveUnitOrder}
                    disabled={savingUnitOrder}
                    startIcon={savingUnitOrder ? <CircularProgress size={14} color="inherit" /> : undefined}
                    sx={{ borderRadius: 0.2, fontWeight: 700 }}
                  >
                    {savingUnitOrder ? "Saving..." : "Save Order"}
                  </Button>
                </Box>
              </Paper>
            </>
          ) : (
            /* ── Normal unit images grid ── */
            <>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {unitImages.map(
                  (ui) =>
                    ui.image && (
                      <Box
                        key={ui.image_id}
                        onClick={() => {
                          if (!unitUnassignMode) return;
                          setUnitUnassignSel((prev) => {
                            const n = new Set(prev);
                            n.has(ui.image_id) ? n.delete(ui.image_id) : n.add(ui.image_id);
                            return n;
                          });
                        }}
                        sx={{
                          position: "relative",
                          width: 120,
                          cursor: unitUnassignMode ? "pointer" : "default",
                          opacity: removing === ui.image_id || togglingImg === ui.image_id ? 0.4 : 1,
                          outline: unitUnassignSel.has(ui.image_id) ? "2px solid" : "none",
                          outlineColor: "error.main",
                          borderRadius: 0.2,
                          transition: "opacity 0.15s, outline 0.1s",
                        }}
                      >
                        <Box
                          component="img"
                          src={ui.image.image_url}
                          sx={{ width: 120, height: 80, objectFit: "cover", borderRadius: 0.2 }}
                        />
                        <Box sx={{ position: "absolute", top: 2, left: 2, display: "flex", flexDirection: "column", gap: 0.25 }}>
                          {unitUnassignSel.has(ui.image_id) && (
                            <Chip label="✕" size="small" color="error" sx={{ fontSize: 8, height: 14 }} />
                          )}
                          {!unitUnassignMode && (
                            <Box
                              onClick={(e) => e.stopPropagation()}
                              sx={{ bgcolor: "rgba(0,0,0,0.55)", borderRadius: 0.5, px: 0.5, py: 0.25 }}
                            >
                              <FormControlLabel
                                sx={{ m: 0 }}
                                label={<Typography sx={{ fontSize: 9, color: "#fff", lineHeight: 1 }}>Banner</Typography>}
                                control={
                                  <Switch
                                    size="small"
                                    checked={(unitImageFlags.get(ui.image_id)?.is_banner_image ?? ui.is_banner_image) === "true"}
                                    disabled={togglingImg === ui.image_id}
                                    onChange={(e) => onToggleUnitFlag(ui.image_id, "is_banner_image", e.target.checked)}
                                    sx={{ transform: "scale(0.7)", ml: -0.5 }}
                                  />
                                }
                              />
                            </Box>
                          )}
                        </Box>

                        {!unitUnassignMode && (
                          <IconButton
                            size="small"
                            color="error"
                            disabled={removing === ui.image_id}
                            onClick={() => onUnassignUnit(ui.image_id)}
                            sx={{
                              position: "absolute",
                              bottom: 2,
                              right: 2,
                              bgcolor: "rgba(0,0,0,0.6)",
                              color: "#fff",
                              width: 20,
                              height: 20,
                            }}
                          >
                            {removing === ui.image_id
                              ? <CircularProgress size={10} color="inherit" />
                              : <DeleteIcon fontSize={18} />}
                          </IconButton>
                        )}
                        <Typography variant="caption" color="text.secondary" display="block" noWrap sx={{ fontSize: 9 }}>
                          Order: {ui.display_order}
                        </Typography>
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
                    {unitUnassignSel.size} image{unitUnassignSel.size > 1 ? "s" : ""} selected
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button size="small" onClick={() => setUnitUnassignSel(new Set())} sx={{ borderRadius: 0.2 }}>
                      Clear
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={handleBulkUnassignUnit}
                      disabled={bulkUnassigningUnit}
                      startIcon={
                        bulkUnassigningUnit
                          ? <CircularProgress size={14} color="inherit" />
                          : <DeleteSweepIcon />
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
        </>
      )}
    </Box>
  );
};
