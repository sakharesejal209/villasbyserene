// src/app/admin/properties/tabs/UnitsTab.tsx
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  ExpandMoreOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { httpService } from "@/app/@services";
import {
  AdminPropertyDetailDTO,
  AdminUnitDTO,
  AdminUnitPricingDTO,
  SeasonalForm,
  SeasonalPricingDTO,
  UnitForm,
} from "@/app/@types";
// import { NewUnitForm, NewSeasonalForm } from "../types";

const API = "/admin/properties";

// ── Unit Editor ────────────────────────────────────────────────────

interface UnitEditorProps {
  unit: AdminUnitDTO;
  propertyId: string;
  saving: string | null;
  onSaveUnit: (unit: AdminUnitDTO) => void;
  onSavePricing: (
    unitId: string,
    pricing: Partial<AdminUnitPricingDTO>,
  ) => void;
  onDelete: (unitId: string) => void;
}

const UnitEditor = ({
  unit,
  propertyId,
  saving,
  onSaveUnit,
  onSavePricing,
  onDelete,
}: UnitEditorProps) => {
  const [sOpen, setSOpen] = useState(false);
  const [seasonal, setSeasonal] = useState<SeasonalPricingDTO[]>(
    unit.seasonal || [],
  );

  // ── Unit form ─────────────────────────────────────────────────
  const { control: uControl, handleSubmit: uSubmit } = useForm<AdminUnitDTO>({
    defaultValues: {
      unit_type: unit.unit_type ?? "VILLA",
      title: unit.title ?? "",
      description: unit.description ?? "",
      max_capacity: unit.max_capacity ?? 2,
      minOccupancy: unit.minOccupancy ?? 2,
      no_of_bedrooms: unit.no_of_bedrooms ?? 1,
      no_of_restrooms: unit.no_of_restrooms ?? 1,
      is_pool_available: unit.is_pool_available ?? false,
      is_available: unit.is_available ?? true,
      is_display_unit: unit.is_display_unit ?? false,
      extraGuestCharge: unit.extraGuestCharge ?? 0,
      petCharge: unit.petCharge ?? 0,
      maxPets: unit.maxPets ?? 0,
      childCharge: unit.childCharge ?? 0,
      childAgeFree: unit.childAgeFree ?? 5,
      vbs_commission: unit.vbs_commission ?? 13,
    },
  });

  // ── Pricing form ──────────────────────────────────────────────
  const { control: pControl, handleSubmit: pSubmit } = useForm<
    Partial<AdminUnitPricingDTO>
  >({
    defaultValues: {
      weekdayPrice: unit.pricing?.weekdayPrice ?? 0,
      weekendPrice: unit.pricing?.weekendPrice ?? 0,
      cleaningFee: unit.pricing?.cleaningFee ?? 0,
      securityDeposit: unit.pricing?.securityDeposit ?? 0,
      minNights: unit.pricing?.minNights ?? 0,
      isActive: unit.pricing?.isActive ?? true,
    },
  });

  // ── Seasonal form ─────────────────────────────────────────────
  const {
    control: sControl,
    handleSubmit: sSubmit,
    reset: sReset,
  } = useForm<SeasonalForm>({
    defaultValues: {
      label: "",
      startDate: "",
      endDate: "",
      pricePerNight: "",
      isActive: true,
    },
  });

  const addSeasonal = async (data: SeasonalForm) => {
    try {
      const res = await httpService<SeasonalPricingDTO>().post(
        `/admin/properties/${propertyId}/units/${unit.unit_id}/seasonal`,
        { ...data, unitId: unit.unit_id },
      );
      setSeasonal((s) => [...s, res]);
      sReset();
      setSOpen(false);
    } catch {}
  };

  const deleteSeasonal = async (id: string) => {
    await httpService().delete(
      `/admin/properties/${propertyId}/units/${unit.unit_id}/seasonal/${id}`,
    );
    setSeasonal((s) => s.filter((x) => x.id !== id));
  };

  return (
    <Accordion
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px !important",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
          <Chip label={unit.unit_type} size="small" />
          <Typography fontWeight={700}>{unit.title || "Untitled"}</Typography>
          {unit.is_display_unit && (
            <Chip label="Display" size="small" color="primary" />
          )}
          <Box sx={{ ml: "auto", mr: 1 }}>
            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(unit.unit_id);
              }}
            >
              <DeleteOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* ── Unit Details ──────────────────────────────────── */}
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}
          >
            Unit Details
          </Typography>

          <Box
            component="form"
            onSubmit={uSubmit((data) => onSaveUnit({ ...unit, ...data }))}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                gap: 1.5,
              }}
            >
              <Controller
                name="unit_type"
                control={uControl}
                render={({ field }) => (
                  <FormControl size="small" fullWidth>
                    <InputLabel>Unit Type</InputLabel>
                    <Select {...field} label="Unit Type">
                      {["VILLA", "CHALET", "COTTAGE", "ROOM", "APARTMENT"].map(
                        (t) => (
                          <MenuItem key={t} value={t}>
                            {t}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                )}
              />

              <Controller
                name="title"
                control={uControl}
                render={({ field }) => (
                  <TextField {...field} label="Title" size="small" fullWidth />
                )}
              />

              <Controller
                name="vbs_commission"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="VBS Commission %"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />

              <Controller
                name="max_capacity"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Max Capacity"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />

              <Controller
                name="minOccupancy"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Min Occupancy"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />

              <Controller
                name="no_of_bedrooms"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bedrooms"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />

              <Controller
                name="no_of_restrooms"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bathrooms"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />

              <Controller
                name="extraGuestCharge"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Extra Guest Charge ₹"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />

              <Controller
                name="childCharge"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Child Charge ₹"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />

              <Controller
                name="childAgeFree"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Child Age Free (under)"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />

              <Controller
                name="petCharge"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Pet Charge ₹ (per pet)"
                    type="number"
                    size="small"
                    fullWidth
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />

              <Controller
                name="maxPets"
                control={uControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Max Pets Allowed (0 = no pets)"
                    type="number"
                    size="small"
                    fullWidth
                    helperText="0 = pets not allowed"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />
            </Box>

            <Controller
              name="description"
              control={uControl}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  size="small"
                  multiline
                  rows={5}
                  fullWidth
                />
              )}
            />

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Controller
                name="is_pool_available"
                control={uControl}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Pool Available"
                  />
                )}
              />
              <Controller
                name="is_available"
                control={uControl}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Available"
                  />
                )}
              />
              <Controller
                name="is_display_unit"
                control={uControl}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Display Unit"
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="outlined"
                size="small"
                startIcon={
                  saving === unit.unit_id ? (
                    <CircularProgress size={14} color="inherit" />
                  ) : (
                    <SaveOutlined />
                  )
                }
                disabled={saving === unit.unit_id}
                sx={{ borderRadius: 0.2 }}
              >
                Save Unit
              </Button>
            </Box>
          </Box>

          <Divider />

          {/* ── Pricing ───────────────────────────────────────── */}
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}
          >
            Pricing
          </Typography>

          <Box
            component="form"
            onSubmit={pSubmit((data) => onSavePricing(unit.unit_id, data))}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                gap: 1.5,
              }}
            >
              <Controller
                name="weekdayPrice"
                control={pControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Weekday Price ₹"
                    type="number"
                    size="small"
                  />
                )}
              />
              <Controller
                name="weekendPrice"
                control={pControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Weekend Price ₹"
                    type="number"
                    size="small"
                  />
                )}
              />
              <Controller
                name="cleaningFee"
                control={pControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Cleaning Fee ₹"
                    type="number"
                    size="small"
                  />
                )}
              />
              <Controller
                name="securityDeposit"
                control={pControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Security Deposit ₹"
                    type="number"
                    size="small"
                  />
                )}
              />
              <Controller
                name="minNights"
                control={pControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Min Nights"
                    type="number"
                    size="small"
                  />
                )}
              />
              <Controller
                name="isActive"
                control={pControl}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Active"
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="outlined"
                size="small"
                startIcon={
                  saving === `pricing-${unit.unit_id}` ? (
                    <CircularProgress size={14} color="inherit" />
                  ) : (
                    <SaveOutlined />
                  )
                }
                disabled={saving === `pricing-${unit.unit_id}`}
                sx={{ borderRadius: 0.2 }}
              >
                Save Pricing
              </Button>
            </Box>
          </Box>

          <Divider />

          {/* ── Seasonal Pricing ──────────────────────────────── */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}
            >
              Seasonal Pricing
            </Typography>
            <Button
              size="small"
              startIcon={<AddOutlined />}
              onClick={() => setSOpen(true)}
            >
              Add Season
            </Button>
          </Box>

          {seasonal.length > 0 && (
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["Label", "Start", "End", "₹/night", "Active", ""].map(
                    (h) => (
                      <TableCell key={h} sx={{ fontWeight: 700, fontSize: 12 }}>
                        {h}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {seasonal.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.label}</TableCell>
                    <TableCell>
                      {dayjs(s.start_date).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell>
                      {dayjs(s.end_date).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell>₹{Number(s.price_per_night)}</TableCell>
                    <TableCell>
                      <Chip
                        label={s.isActive ? "Active" : "Off"}
                        size="small"
                        color={s.isActive ? "success" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => deleteSeasonal(s.id)}
                      >
                        <DeleteOutlined sx={{ fontSize: 14 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Seasonal dialog */}
          <Dialog
            open={sOpen}
            onClose={() => setSOpen(false)}
            maxWidth="xs"
            fullWidth
            slotProps={{
              paper: { sx: { borderRadius: 0.2, backgroundImage: "none" } },
            }}
          >
            <DialogTitle>
              <Typography fontWeight={700}>Add Seasonal Rate</Typography>
            </DialogTitle>
            <DialogContent>
              <Box
                component="form"
                id="seasonal-form"
                onSubmit={sSubmit(addSeasonal)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  pt: 1,
                }}
              >
                <Controller
                  name="label"
                  control={sControl}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Label"
                      size="small"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="startDate"
                  control={sControl}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Start Date"
                      type="date"
                      size="small"
                      fullWidth
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={sControl}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="End Date"
                      type="date"
                      size="small"
                      fullWidth
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  )}
                />
                <Controller
                  name="pricePerNight"
                  control={sControl}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Price per night ₹"
                      type="number"
                      size="small"
                      fullWidth
                    />
                  )}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
              <Button onClick={() => setSOpen(false)}>Cancel</Button>
              <Button
                type="submit"
                form="seasonal-form"
                variant="contained"
                sx={{ borderRadius: 0.2, fontWeight: 700 }}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

// ── Units Tab ──────────────────────────────────────────────────────

interface UnitsTabProps {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}

export const UnitsTab = ({ detail, propertyId, onSaved }: UnitsTabProps) => {
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<UnitForm>({
    defaultValues: {
      unit_type: "VILLA",
      title: "",
      description: "",
      max_capacity: 2,
      minOccupancy: 2,
      no_of_bedrooms: 1,
      no_of_restrooms: 1,
      is_pool_available: false,
      is_display_unit: false,
      extraGuestCharge: 0,
      petCharge: 0,
      maxPets: 0,
      childCharge: 0,
      childAgeFree: 5,
      vbs_commission: 13,
    },
  });

  const saveUnit = async (unit: AdminUnitDTO) => {
    setSaving(unit.unit_id);
    setError(null);
    try {
      await httpService().put(
        `${API}/${propertyId}/units/${unit.unit_id}`,
        unit,
      );
      onSaved();
    } catch {
      setError("Failed to save unit");
    } finally {
      setSaving(null);
    }
  };

  const savePricing = async (
    unitId: string,
    pricing: Partial<AdminUnitPricingDTO>,
  ) => {
    setSaving(`pricing-${unitId}`);
    setError(null);
    try {
      await httpService().put(
        `${API}/${propertyId}/units/${unitId}/pricing`,
        pricing,
      );
      onSaved();
    } catch {
      setError("Failed to save pricing");
    } finally {
      setSaving(null);
    }
  };

  const deleteUnit = async (unitId: string) => {
    if (!confirm("Delete this unit?")) return;
    try {
      await httpService().delete(`${API}/${propertyId}/units/${unitId}`);
      onSaved();
    } catch {
      setError("Failed to delete unit");
    }
  };

  const createUnit = async (data: UnitForm) => {
    try {
      await httpService().post(`${API}/${propertyId}/units`, data);
      setAddOpen(false);
      reset();
      onSaved();
    } catch {
      setError("Failed to create unit");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={() => setAddOpen(true)}
          sx={{ borderRadius: 0.2 }}
        >
          Add Unit
        </Button>
      </Box>

      {detail.units.map((unit) => (
        <UnitEditor
          key={unit.unit_id}
          unit={unit}
          propertyId={propertyId}
          saving={saving}
          onSaveUnit={saveUnit}
          onSavePricing={savePricing}
          onDelete={deleteUnit}
        />
      ))}

      {/* Add Unit Dialog */}
      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 0.2, backgroundImage: "none" } },
        }}
      >
        <DialogTitle>
          <Typography fontWeight={700}>Add New Unit</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="add-unit-form"
            onSubmit={handleSubmit(createUnit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
          >
            <Controller
              name="unit_type"
              control={control}
              render={({ field }) => (
                <FormControl size="small" fullWidth>
                  <InputLabel>Unit Type</InputLabel>
                  <Select {...field} label="Unit Type">
                    {["VILLA", "CHALET", "COTTAGE", "ROOM", "APARTMENT"].map(
                      (t) => (
                        <MenuItem key={t} value={t}>
                          {t}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Title" size="small" fullWidth />
              )}
            />

            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              <Controller
                name="max_capacity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Max Capacity"
                    type="number"
                    size="small"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />
              <Controller
                name="minOccupancy"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Min Occupancy"
                    type="number"
                    size="small"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />
              <Controller
                name="no_of_bedrooms"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bedrooms"
                    type="number"
                    size="small"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />
              <Controller
                name="no_of_restrooms"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bathrooms"
                    type="number"
                    size="small"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />
              <Controller
                name="vbs_commission"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="VBS Commission %"
                    type="number"
                    size="small"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />
              <Controller
                name="extraGuestCharge"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Extra Guest Charge ₹"
                    type="number"
                    size="small"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />
              <Controller
                name="petCharge"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Pet Charge ₹ (per pet)"
                    type="number"
                    size="small"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />
              <Controller
                name="maxPets"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Max Pets (0 = no pets)"
                    type="number"
                    size="small"
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Controller
                name="is_pool_available"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Pool"
                  />
                )}
              />
              <Controller
                name="is_display_unit"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Display Unit"
                  />
                )}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => {
              setAddOpen(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-unit-form"
            variant="contained"
            sx={{ borderRadius: 0.2, fontWeight: 700 }}
          >
            Create Unit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
