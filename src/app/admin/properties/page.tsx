"use client";

import { useEffect, useState, useCallback } from "react";
import {
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
  Paper,
  Select,
  Switch,
  Tab,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableBody,
} from "@mui/material";
import {
  AddOutlined,
  ArrowBackOutlined,
  DeleteOutlined,
  EditOutlined,
  ExpandMoreOutlined,
  HouseOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { httpService } from "@/app/@services";
import {
  AdminPropertyRowDTO,
  AdminPropertyDetailDTO,
  AdminPropertyEntityDTO,
  AdminUnitDTO,
  AdminUnitPricingDTO,
  AdminPropertyImageDTO,
  AdminUnitImageDTO,
  SeasonalPricingDTO,
  MasterAmenityDTO,
  MasterHouseRuleDTO,
  MasterThemeDTO,
  SelectedAmenityDTO,
  SelectedRuleDTO,
  SelectedThemeDTO,
  NearByAttractionDTO,
  FoodMenuDTO,
} from "@/app/@types";
import { parseInt } from "lodash";

// ── Local form types ───────────────────────────────────────────────

interface NewUnitForm {
  unit_type: string;
  title: string;
  description: string;
  max_capacity: number;
  minOccupancy: number;
  no_of_bedrooms: number;
  no_of_restrooms: number;
  is_pool_available: boolean;
  is_display_unit: boolean;
  extraGuestCharge: number;
  petCharge: number;
  maxPets: number;
  childCharge: number;
  childAgeFree: number;
  vbs_commission: number;
}

interface NewSeasonalForm {
  label: string;
  startDate: string;
  endDate: string;
  pricePerNight: string;
  isActive: boolean;
}

interface NewAttractionForm {
  title: string;
  description: string;
  distance: string;
  imageUrl: string;
}

interface NewPropertyForm {
  name: string;
  area: string;
  city: string;
  state: string;
  country: string;
  address: string;
  description: string;
  accommodationType: string;
  bookingType: string;
  checkin_time: string;
  checkout_time: string;
  maxcapacity: number;
  bedroomcount: number;
  mealsAvailable: boolean;
}

// ── Image pool types ───────────────────────────────────────────────
interface PoolImage {
  image_id: string;
  image_url: string;
  image_alt: string | null;
  image_category_id: number | null;
}

interface ImageCategory {
  category_id: number;
  name: string;
}

// ── Image pool types ──────────────────────────────────────────────
interface PoolImage {
  image_id: string;
  image_url: string;
  image_alt: string | null;
  image_category_id: number | null;
}

interface ImageCategory {
  category_id: number;
  name: string;
}

const API = "/admin/properties";

// ── Reusable save button ───────────────────────────────────────────
const SaveBtn = ({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) => (
  <Button
    variant="contained"
    startIcon={
      loading ? (
        <CircularProgress size={16} color="inherit" />
      ) : (
        <SaveOutlined />
      )
    }
    onClick={onClick}
    disabled={loading}
    sx={{ borderRadius: 0.2, fontWeight: 700 }}
  >
    {loading ? "Saving..." : "Save Changes"}
  </Button>
);

// ════════════════════════════════════════════════════════════════════
// 1. Basic Info Tab
// ════════════════════════════════════════════════════════════════════
const BasicInfoTab = ({
  detail,
  onSaved,
}: {
  detail: AdminPropertyDetailDTO;
  onSaved: () => void;
}) => {
  const p = detail.property;
  const [form, setForm] = useState<AdminPropertyEntityDTO>({ ...p });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (k: keyof AdminPropertyEntityDTO) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  const setCheck =
    (k: keyof AdminPropertyEntityDTO) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.checked }));

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await httpService().put(`${API}/${p.property_id}`, form);
      onSaved();
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Typography
        variant="subtitle2"
        fontWeight={700}
        color="text.secondary"
        sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}
      >
        Property Details
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          label="Property Name"
          value={form.name || ""}
          onChange={set("name")}
          fullWidth
          size="small"
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Booking Type</InputLabel>
          <Select
            value={form.bookingType || "ENQUIRY"}
            label="Booking Type"
            onChange={(e) =>
              setForm((f) => ({ ...f, bookingType: e.target.value }))
            }
          >
            <MenuItem value="DIRECT">Direct (Online Booking)</MenuItem>
            <MenuItem value="ENQUIRY">Enquiry Only</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel>Accommodation Type</InputLabel>
          <Select
            value={form.accommodationType || "ENTIRE_HOME"}
            label="Accommodation Type"
            onChange={(e) =>
              setForm((f) => ({ ...f, accommodationType: e.target.value }))
            }
          >
            <MenuItem value="ENTIRE_HOME">Entire Home</MenuItem>
            <MenuItem value="SEPARATE_ROOMS">Separate Rooms</MenuItem>
            <MenuItem value="ENTIRE_HOME_AND_SEPARATE_ROOMS">
              Entire Home + Rooms
            </MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Check-in Time"
            value={form.checkin_time || ""}
            onChange={set("checkin_time")}
            fullWidth
            size="small"
            placeholder="01:00 PM"
          />
          <TextField
            label="Check-out Time"
            value={form.checkout_time || ""}
            onChange={set("checkout_time")}
            fullWidth
            size="small"
            placeholder="10:30 AM"
          />
        </Box>
        <TextField
          label="Max Capacity"
          type="number"
          value={form.maxcapacity || ""}
          onChange={set("maxcapacity")}
          fullWidth
          size="small"
        />
        <TextField
          label="Bedroom Count"
          type="number"
          value={form.bedroomcount || ""}
          onChange={set("bedroomcount")}
          fullWidth
          size="small"
        />
      </Box>
      <TextField
        label="Description"
        value={form.description || ""}
        onChange={set("description")}
        multiline
        rows={5}
        fullWidth
        size="small"
      />
      <Divider />
      <Typography
        variant="subtitle2"
        fontWeight={700}
        color="text.secondary"
        sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}
      >
        Location
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          label="Address"
          value={form.address || ""}
          onChange={set("address")}
          fullWidth
          size="small"
        />
        <TextField
          label="Area / Locality"
          value={form.area || ""}
          onChange={set("area")}
          fullWidth
          size="small"
        />
        <TextField
          label="City"
          value={form.city || ""}
          onChange={set("city")}
          fullWidth
          size="small"
        />
        <TextField
          label="State"
          value={form.state || ""}
          onChange={set("state")}
          fullWidth
          size="small"
        />
        <TextField
          label="Country"
          value={form.country || ""}
          onChange={set("country")}
          fullWidth
          size="small"
        />
        <TextField
          label="Map Location (embed URL)"
          value={form.map_location || ""}
          onChange={set("map_location")}
          fullWidth
          size="small"
        />
        <TextField
          label="Google Maps URL"
          value={form.google_maps_url || ""}
          onChange={set("google_maps_url")}
          fullWidth
          size="small"
          sx={{ gridColumn: "1 / -1" }}
        />
      </Box>
      <Divider />
      <FormControlLabel
        control={
          <Switch
            checked={!!form.mealsAvailable}
            onChange={setCheck("mealsAvailable")}
          />
        }
        label="Meals Available"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveBtn onClick={save} loading={saving} />
      </Box>
    </Box>
  );
};

// ════════════════════════════════════════════════════════════════════
// 2. Units Tab
// ════════════════════════════════════════════════════════════════════
const UnitsTab = ({
  detail,
  propertyId,
  onSaved,
}: {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}) => {
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newUnit, setNewUnit] = useState<NewUnitForm>({
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
  });

  console.log('detail:', detail);
  
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

  const createUnit = async () => {
    try {
      await httpService().post(`${API}/${propertyId}/units`, newUnit);
      setAddOpen(false);
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Unit Type</InputLabel>
              <Select
                value={newUnit.unit_type}
                label="Unit Type"
                onChange={(e) =>
                  setNewUnit((u) => ({ ...u, unit_type: e.target.value }))
                }
              >
                {["VILLA", "CHALET", "COTTAGE", "ROOM", "APARTMENT"].map(
                  (t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
            <TextField
              label="Title"
              size="small"
              value={newUnit.title}
              onChange={(e) =>
                setNewUnit((u) => ({ ...u, title: e.target.value }))
              }
              fullWidth
            />
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              <TextField
                label="Max Capacity"
                type="number"
                size="small"
                value={newUnit.max_capacity}
                onChange={(e) =>
                  setNewUnit((u) => ({ ...u, max_capacity: +e.target.value }))
                }
              />
              <TextField
                label="Min Occupancy"
                type="number"
                size="small"
                value={newUnit.minOccupancy}
                onChange={(e) =>
                  setNewUnit((u) => ({ ...u, minOccupancy: +e.target.value }))
                }
              />
              <TextField
                label="Bedrooms"
                type="number"
                size="small"
                value={newUnit.no_of_bedrooms}
                onChange={(e) =>
                  setNewUnit((u) => ({ ...u, no_of_bedrooms: +e.target.value }))
                }
              />
              <TextField
                label="Bathrooms"
                type="number"
                size="small"
                value={newUnit.no_of_restrooms}
                onChange={(e) =>
                  setNewUnit((u) => ({
                    ...u,
                    no_of_restrooms: +e.target.value,
                  }))
                }
              />
              <TextField
                label="VBS Commission %"
                type="number"
                size="small"
                value={newUnit.vbs_commission}
                onChange={(e) =>
                  setNewUnit((u) => ({ ...u, vbs_commission: +e.target.value }))
                }
              />
              <TextField
                label="Extra Guest Charge ₹"
                type="number"
                size="small"
                value={newUnit.extraGuestCharge}
                onChange={(e) =>
                  setNewUnit((u) => ({
                    ...u,
                    extraGuestCharge: parseInt(e.target.value),
                  }))
                }
              />
              <TextField
                label="Max Pets Allowed (0 = no pets)"
                type="number"
                size="small"
                value={newUnit.maxPets}
                onChange={(e) =>
                  setNewUnit((u) => ({
                    ...u,
                    maxPets: parseInt(e.target.value),
                  }))
                }
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newUnit.is_pool_available}
                    onChange={(e) =>
                      setNewUnit((u) => ({
                        ...u,
                        is_pool_available: e.target.checked,
                      }))
                    }
                  />
                }
                label="Pool"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={newUnit.is_display_unit}
                    onChange={(e) =>
                      setNewUnit((u) => ({
                        ...u,
                        is_display_unit: e.target.checked,
                      }))
                    }
                  />
                }
                label="Display Unit"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setAddOpen(false)} sx={{ borderRadius: 0.2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={createUnit}
            sx={{ borderRadius: 0.2, fontWeight: 700 }}
          >
            Create Unit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

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
  const [uForm, setUForm] = useState<AdminUnitDTO>({ ...unit });
  console.log('unit maxPets:', unit.maxPets, 'uForm maxPets:', uForm.maxPets);

  const [pForm, setPForm] = useState<Partial<AdminUnitPricingDTO>>(
    unit.pricing ? { ...unit.pricing } : {},
  );
  const [sOpen, setSOpen] = useState(false);
  const [seasonal, setSeasonal] = useState<SeasonalPricingDTO[]>(
    unit.seasonal || [],
  );
  const [newS, setNewS] = useState<NewSeasonalForm>({
    label: "",
    startDate: "",
    endDate: "",
    pricePerNight: "",
    isActive: true,
  });

  const setU =
    (k: keyof AdminUnitDTO) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setUForm((f) => ({ ...f, [k]: e.target.value }));
  const setUCheck =
    (k: keyof AdminUnitDTO) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setUForm((f) => ({ ...f, [k]: e.target.checked }));
  const setP =
    (k: keyof AdminUnitPricingDTO) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setPForm((f) => ({ ...f, [k]: e.target.value }));

  const addSeasonal = async () => {
    try {
      const res = await httpService<SeasonalPricingDTO>().post(
        `/admin/properties/${propertyId}/units/${unit.unit_id}/seasonal`,
        { ...newS, unitId: unit.unit_id },
      );
      setSeasonal((s) => [...s, res]);
      setNewS({
        label: "",
        startDate: "",
        endDate: "",
        pricePerNight: "",
        isActive: true,
      });
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
          <Chip label={uForm.unit_type} size="small" />
          <Typography fontWeight={700}>{uForm.title || "Untitled"}</Typography>
          {uForm.is_display_unit && (
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
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}
          >
            Unit Details
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 1.5,
            }}
          >
            <FormControl size="small" fullWidth>
              <InputLabel>Unit Type</InputLabel>
              <Select
                value={uForm.unit_type}
                label="Unit Type"
                onChange={(e) =>
                  setUForm((f) => ({ ...f, unit_type: e.target.value }))
                }
              >
                {["VILLA", "CHALET", "COTTAGE", "ROOM", "APARTMENT"].map(
                  (t) => (
                    <MenuItem key={t} value={t}>
                      {t}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
            <TextField
              label="Title"
              size="small"
              value={uForm.title || ""}
              onChange={setU("title")}
            />
            <TextField
              label="VBS Commission %"
              type="number"
              size="small"
              // disabled
              value={uForm.vbs_commission || ""}
              onChange={setU("vbs_commission")}
            />
            <TextField
              label="Max Capacity"
              type="number"
              size="small"
              value={uForm.max_capacity || ""}
              onChange={setU("max_capacity")}
            />
            <TextField
              label="Min Occupancy"
              type="number"
              size="small"
              value={uForm.minOccupancy || ""}
              onChange={setU("minOccupancy")}
            />
            <TextField
              label="Bedrooms"
              type="number"
              size="small"
              value={uForm.no_of_bedrooms || ""}
              onChange={setU("no_of_bedrooms")}
            />
            <TextField
              label="Bathrooms"
              type="number"
              size="small"
              value={uForm.no_of_restrooms || ""}
              onChange={setU("no_of_restrooms")}
            />
            <TextField
              label="Extra Guest Charge ₹"
              type="number"
              size="small"
              value={uForm.extraGuestCharge || ""}
              onChange={setU("extraGuestCharge")}
            />
            <TextField
              label="Child Charge ₹"
              type="number"
              size="small"
              value={uForm.childCharge || ""}
              onChange={setU("childCharge")}
            />
            <TextField
              label="Child Age Free (under)"
              type="number"
              size="small"
              value={uForm.childAgeFree || ""}
              onChange={setU("childAgeFree")}
            />
            <TextField
              label="Pet Charge ₹"
              type="number"
              size="small"
              value={uForm.petCharge || ""}
              onChange={setU("petCharge")}
            />
            <TextField
              label="Max Pets Allowed (0 = no pets)"
              type="number"
              size="small"
              value={uForm.maxPets || 0}
              onChange={(e) =>
                setUForm((f) => ({ ...f, maxPets: +e.target.value }))
              }
              helperText="0 = pets not allowed"
            />
          </Box>
          <TextField
            label="Description"
            size="small"
            value={uForm.description || ""}
            onChange={setU("description")}
            multiline
            rows={5}
            fullWidth
          />
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={!!uForm.is_pool_available}
                  onChange={setUCheck("is_pool_available")}
                />
              }
              label="Pool Available"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={!!uForm.is_available}
                  onChange={setUCheck("is_available")}
                />
              }
              label="Available"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={!!uForm.is_display_unit}
                  onChange={setUCheck("is_display_unit")}
                />
              }
              label="Display Unit"
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<SaveOutlined />}
              onClick={() => onSaveUnit(uForm)}
              disabled={saving === unit.unit_id}
              sx={{ borderRadius: 0.2 }}
            >
              Save Unit
            </Button>
          </Box>
          <Divider />
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}
          >
            Pricing
          </Typography>
          {/* {Object.keys(pForm).length > 0 ? ( */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 1.5,
            }}
          >
            <TextField
              label="Weekday Price ₹"
              type="number"
              size="small"
              value={pForm.weekdayPrice || ""}
              onChange={setP("weekdayPrice")}
            />
            <TextField
              label="Weekend Price ₹"
              type="number"
              size="small"
              value={pForm.weekendPrice || ""}
              onChange={setP("weekendPrice")}
            />
            <TextField
              label="Cleaning Fee ₹"
              type="number"
              size="small"
              value={pForm.cleaningFee || ""}
              onChange={setP("cleaningFee")}
            />
            <TextField
              label="Security Deposit ₹"
              type="number"
              size="small"
              value={pForm.securityDeposit || ""}
              onChange={setP("securityDeposit")}
            />
            <TextField
              label="Min Nights"
              type="number"
              size="small"
              value={pForm.minNights || ""}
              onChange={setP("minNights")}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={!!pForm.isActive}
                  onChange={(e) =>
                    setPForm((f) => ({ ...f, isActive: e.target.checked }))
                  }
                />
              }
              label="Active"
            />
          </Box>
          {/* )
           : (
            <Typography variant="body2" color="text.secondary">
              No pricing set. Save below to create
            </Typography>
          )} */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<SaveOutlined />}
              onClick={() => onSavePricing(unit.unit_id, pForm)}
              disabled={saving === `pricing-${unit.unit_id}`}
              sx={{ borderRadius: 0.2 }}
            >
              Save Pricing
            </Button>
          </Box>
          <Divider />
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
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  pt: 1,
                }}
              >
                <TextField
                  label="Label"
                  size="small"
                  value={newS.label}
                  onChange={(e) =>
                    setNewS((s) => ({ ...s, label: e.target.value }))
                  }
                  fullWidth
                />
                <TextField
                  label="Start Date"
                  type="date"
                  size="small"
                  value={newS.startDate}
                  onChange={(e) =>
                    setNewS((s) => ({ ...s, startDate: e.target.value }))
                  }
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  size="small"
                  value={newS.endDate}
                  onChange={(e) =>
                    setNewS((s) => ({ ...s, endDate: e.target.value }))
                  }
                  fullWidth
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                  label="Price per night ₹"
                  type="number"
                  size="small"
                  value={newS.pricePerNight}
                  onChange={(e) =>
                    setNewS((s) => ({ ...s, pricePerNight: e.target.value }))
                  }
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
              <Button onClick={() => setSOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={() => {
                  addSeasonal();
                  setSOpen(false);
                }}
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

// ════════════════════════════════════════════════════════════════════
// 3. Images Tab — Pool-based image management
// ════════════════════════════════════════════════════════════════════

interface ImageSelection {
  image_id: string;
  is_banner_image: boolean;
  is_carousel_image: boolean;
  display_order: number;
}

const ImagesTab = ({
  detail,
  propertyId,
  onSaved,
}: {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}) => {
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

      {/* Step 1 — Add to pool */}
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

      {/* Step 2 — Search, select, assign in bulk */}
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
            {/* Mode + unit selector */}
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

            {/* Image grid */}
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

                      {/* Per-image config when selected */}
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

                      {/* Already assigned — show remove */}
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

            {/* Sticky bulk submit bar */}
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

// ════════════════════════════════════════════════════════════════════
// 4. Amenities / Rules / Themes Tab
// ════════════════════════════════════════════════════════════════════
const AmenitiesTab = ({
  detail,
  propertyId,
  onSaved,
}: {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    detail.amenities.selected.map((a: SelectedAmenityDTO) => a.amenity_id),
  );
  const [selectedRules, setSelectedRules] = useState<string[]>(
    detail.houseRules.selected.map((r: SelectedRuleDTO) => r.rule_id),
  );
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    detail.themes.selected.map((t: SelectedThemeDTO) => t.theme_id),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>,
    id: string,
  ) =>
    setArr((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await Promise.all([
        httpService().put(`${API}/${propertyId}/amenities`, {
          amenityIds: selectedAmenities,
        }),
        httpService().put(`${API}/${propertyId}/rules`, {
          ruleIds: selectedRules,
        }),
        httpService().put(`${API}/${propertyId}/themes`, {
          themeIds: selectedThemes,
        }),
      ]);
      onSaved();
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const sections: Array<{
    label: string;
    all: (MasterAmenityDTO | MasterHouseRuleDTO | MasterThemeDTO)[];
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    idKey: string;
    nameKey: string;
  }> = [
    {
      label: "Amenities",
      all: detail.amenities.all,
      selected: selectedAmenities,
      setSelected: setSelectedAmenities,
      idKey: "amenity_id",
      nameKey: "name",
    },
    {
      label: "House Rules",
      all: detail.houseRules.all,
      selected: selectedRules,
      setSelected: setSelectedRules,
      idKey: "rule_id",
      nameKey: "description",
    },
    {
      label: "Themes",
      all: detail.themes.all,
      selected: selectedThemes,
      setSelected: setSelectedThemes,
      idKey: "theme_id",
      nameKey: "name",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {sections.map(({ label, all, selected, setSelected, idKey, nameKey }) => (
        <Box key={label}>
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            {label}
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
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {all.map((item) => {
                const id = (item as unknown as Record<string, string>)[idKey];
                const name =
                  (item as unknown as Record<string, string>)[nameKey] || id;
                return (
                  <Chip
                    key={id}
                    label={name}
                    clickable
                    onClick={() => toggle(selected, setSelected, id)}
                    color={selected.includes(id) ? "primary" : "default"}
                    variant={selected.includes(id) ? "filled" : "outlined"}
                    size="small"
                    sx={{ fontWeight: selected.includes(id) ? 700 : 400 }}
                  />
                );
              })}
            </Box>
          </Paper>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveBtn onClick={save} loading={saving} />
      </Box>
    </Box>
  );
};

// ════════════════════════════════════════════════════════════════════
// 5. Food Menu Tab
// ════════════════════════════════════════════════════════════════════
const FoodMenuTab = ({
  detail,
  propertyId,
  onSaved,
}: {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}) => {
  const existing = (detail.foodMenus?.[0] as Partial<FoodMenuDTO>) ?? {};
  const [form, setForm] = useState<Partial<FoodMenuDTO>>({
    description: existing.description ?? "",
    is_veg: existing.is_veg ?? true,
    is_non_veg: existing.is_non_veg ?? false,
    isJain: existing.isJain ?? false,
    menu_url: existing.menu_url ?? "",
    breakfast_time:existing.breakfast_time ?? "08:00 AM - 09:30 AM",
    lunch_time: existing.lunch_time ?? "01:00 PM - 02:30 PM",
    dinner_time: existing.dinner_time ?? "08:00 PM - 09:30 PM",
    hightea_time: existing.hightea_time ?? "04:30 PM - 05:30 PM",
    ...existing,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (k: keyof FoodMenuDTO) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));
  const setCheck =
    (k: keyof FoodMenuDTO) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.checked }));

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await httpService().put(`${API}/${propertyId}/food-menu`, form);
      onSaved();
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <FormControlLabel
          control={
            <Switch checked={form.is_veg} onChange={setCheck("is_veg")} />
          }
          label="Vegetarian"
        />
        <FormControlLabel
          control={
            <Switch
              checked={!!form.is_non_veg}
              onChange={setCheck("is_non_veg")}
            />
          }
          label="Non-Vegetarian"
        />
        <FormControlLabel
          control={
            <Switch checked={form.isJain} onChange={setCheck("isJain")} />
          }
          label="Jain"
        />
      </Box>
      <TextField
        label="Menu Description"
        value={form.description || ""}
        onChange={set("description")}
        multiline
        rows={5}
        fullWidth
        size="small"
      />
      <TextField
        label="Menu URL (PDF/image)"
        value={form.menu_url || ""}
        onChange={set("menu_url")}
        fullWidth
        size="small"
      />
      <Divider />
      <Typography variant="subtitle2" fontWeight={700}>
        Meal Timings
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          label="Breakfast"
          value={form.breakfast_time || ""}
          onChange={set("breakfast_time")}
          fullWidth
          size="small"
        />
        <TextField
          label="Lunch"
          value={form.lunch_time || ""}
          onChange={set("lunch_time")}
          fullWidth
          size="small"
        />
        <TextField
          label="High Tea"
          value={form.hightea_time || ""}
          onChange={set("hightea_time")}
          fullWidth
          size="small"
        />
        <TextField
          label="Dinner"
          value={form.dinner_time || ""}
          onChange={set("dinner_time")}
          fullWidth
          size="small"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveBtn onClick={save} loading={saving} />
      </Box>
    </Box>
  );
};

// ════════════════════════════════════════════════════════════════════
// 6. Nearby Attractions Tab
// ════════════════════════════════════════════════════════════════════
const AttractionsTab = ({
  detail,
  propertyId,
  onSaved,
}: {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}) => {
  const [attractions, setAttractions] = useState<NearByAttractionDTO[]>(
    detail.attractions,
  );
  const [editing, setEditing] = useState<NearByAttractionDTO | null>(null);
  const [newA, setNewA] = useState<NewAttractionForm>({
    title: "",
    description: "",
    distance: "",
    imageUrl: "",
  });
  const [error, setError] = useState<string | null>(null);

  const add = async () => {
    try {
      const res = await httpService<NearByAttractionDTO>().post(
        `${API}/${propertyId}/attractions`,
        newA,
      );
      setAttractions((a) => [...a, res]);
      setNewA({ title: "", description: "", distance: "", imageUrl: "" });
    } catch {
      setError("Failed to add attraction");
    }
  };

  const update = async () => {
    if (!editing) return;
    try {
      await httpService().put(
        `${API}/${propertyId}/attractions/${editing.attraction_id}`,
        editing,
      );
      setAttractions((a) =>
        a.map((x) => (x.attraction_id === editing.attraction_id ? editing : x)),
      );
      setEditing(null);
    } catch {
      setError("Failed to update");
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete attraction?")) return;
    try {
      await httpService().delete(`${API}/${propertyId}/attractions/${id}`);
      setAttractions((a) => a.filter((x) => x.attraction_id !== id));
    } catch {
      setError("Failed to delete");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {attractions.map((a) => (
        <Paper
          key={a.attraction_id}
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{ display: "flex", gap: 1.5, alignItems: "center", flex: 1 }}
            >
              {a.image_url && (
                <Box
                  component="img"
                  src={a.image_url}
                  sx={{
                    width: 56,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 0.5,
                  }}
                />
              )}
              <Box>
                <Typography variant="body2" fontWeight={700}>
                  {a.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {a.distance} · {a.description}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <IconButton size="small" onClick={() => setEditing(a)}>
                <EditOutlined sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => del(a.attraction_id)}
              >
                <DeleteOutlined sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 0.2,
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{ display: "block", mb: 1.5 }}
        >
          Add Nearby Attraction
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 1.5,
          }}
        >
          <TextField
            label="Title"
            size="small"
            value={newA.title}
            onChange={(e) => setNewA((n) => ({ ...n, title: e.target.value }))}
          />
          <TextField
            label="Distance"
            size="small"
            value={newA.distance}
            onChange={(e) =>
              setNewA((n) => ({ ...n, distance: e.target.value }))
            }
            placeholder="5 mins"
            multiline
            rows={5}
          />
          <TextField
            label="Description"
            size="small"
            value={newA.description}
            onChange={(e) =>
              setNewA((n) => ({ ...n, description: e.target.value }))
            }
            sx={{ gridColumn: "1 / -1" }}
          />
          <TextField
            label="Image URL"
            size="small"
            value={newA.imageUrl}
            onChange={(e) =>
              setNewA((n) => ({ ...n, imageUrl: e.target.value }))
            }
            sx={{ gridColumn: "1 / -1" }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddOutlined />}
            onClick={add}
            disabled={!newA.title}
            sx={{ borderRadius: 0.2 }}
          >
            Add
          </Button>
        </Box>
      </Paper>
      <Dialog
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 0.2, backgroundImage: "none" } },
        }}
      >
        <DialogTitle>
          <Typography fontWeight={700}>Edit Attraction</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}
          >
            <TextField
              label="Title"
              size="small"
              value={editing?.title || ""}
              onChange={(e) =>
                setEditing((a) => (a ? { ...a, title: e.target.value } : a))
              }
              fullWidth
            />
            <TextField
              label="Distance"
              size="small"
              value={editing?.distance || ""}
              onChange={(e) =>
                setEditing((a) => (a ? { ...a, distance: e.target.value } : a))
              }
              fullWidth
            />
            <TextField
              label="Description"
              size="small"
              value={editing?.description || ""}
              onChange={(e) =>
                setEditing((a) =>
                  a ? { ...a, description: e.target.value } : a,
                )
              }
              fullWidth
              multiline
              rows={5}
            />
            <TextField
              label="Image URL"
              size="small"
              value={editing?.image_url || ""}
              onChange={(e) =>
                setEditing((a) => (a ? { ...a, image_url: e.target.value } : a))
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={update}
            sx={{ borderRadius: 0.2, fontWeight: 700 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// ════════════════════════════════════════════════════════════════════
// Property Editor
// ════════════════════════════════════════════════════════════════════
const PropertyEditor = ({
  propertyId,
  onBack,
}: {
  propertyId: string;
  onBack: () => void;
}) => {
  const [detail, setDetail] = useState<AdminPropertyDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [saved, setSaved] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    httpService<AdminPropertyDetailDTO>()
      .get(`${API}/${propertyId}`)
      .then(setDetail)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [propertyId]);

  useEffect(() => {
    load();
  }, [load]);

  const onSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    load();
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  if (!detail) return <Alert severity="error">Failed to load property</Alert>;

  const TABS = [
    "Basic Info",
    "Units & Pricing",
    "Images",
    "Amenities & Rules",
    "Food Menu",
    "Nearby Attractions",
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <IconButton onClick={onBack}>
          <ArrowBackOutlined />
        </IconButton>
        <Box>
          <Typography variant="h6" fontWeight={800}>
            {detail.property.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {detail.property.area}, {detail.property.state}
          </Typography>
        </Box>
        {saved && (
          <Chip
            label="Saved ✓"
            color="success"
            size="small"
            sx={{ ml: "auto" }}
          />
        )}
      </Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          "& .MuiTab-root.Mui-selected": {
            color: "primary.main",
            fontWeight: 700,
          },
        }}
      >
        {TABS.map((t) => (
          <Tab key={t} label={t} sx={{ fontWeight: 600, fontSize: 13 }} />
        ))}
      </Tabs>
      <Box>
        {tab === 0 && <BasicInfoTab detail={detail} onSaved={onSaved} />}
        {tab === 1 && (
          <UnitsTab detail={detail} propertyId={propertyId} onSaved={onSaved} />
        )}
        {tab === 2 && (
          <ImagesTab
            detail={detail}
            propertyId={propertyId}
            onSaved={onSaved}
          />
        )}
        {tab === 3 && (
          <AmenitiesTab
            detail={detail}
            propertyId={propertyId}
            onSaved={onSaved}
          />
        )}
        {tab === 4 && (
          <FoodMenuTab
            detail={detail}
            propertyId={propertyId}
            onSaved={onSaved}
          />
        )}
        {tab === 5 && (
          <AttractionsTab
            detail={detail}
            propertyId={propertyId}
            onSaved={onSaved}
          />
        )}
      </Box>
    </Box>
  );
};

// ════════════════════════════════════════════════════════════════════
// Main Page
// ════════════════════════════════════════════════════════════════════
export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<AdminPropertyRowDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newProp, setNewProp] = useState<NewPropertyForm>({
    name: "",
    area: "",
    city: "",
    state: "",
    country: "India",
    address: "",
    description: "",
    accommodationType: "ENTIRE_HOME",
    bookingType: "ENQUIRY",
    checkin_time: "01:00 PM",
    checkout_time: "10:30 AM",
    maxcapacity: 10,
    bedroomcount: 3,
    mealsAvailable: false,
  });
  const [creating, setCreating] = useState(false);

  const load = () => {
    setLoading(true);
    httpService<AdminPropertyRowDTO[]>()
      .get(API)
      .then(setProperties)
      .catch(() => setError("Failed to load properties"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const createProperty = async () => {
    setCreating(true);
    try {
      const res = await httpService<{ property_id: string }>().post(
        API,
        newProp,
      );
      setCreateOpen(false);
      setEditingId(res.property_id);
      load();
    } catch {
      setError("Failed to create property");
    } finally {
      setCreating(false);
    }
  };

  if (editingId)
    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <PropertyEditor
          propertyId={editingId}
          onBack={() => {
            setEditingId(null);
            load();
          }}
        />
      </Box>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Properties
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {properties.length} properties
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={() => setCreateOpen(true)}
          sx={{ borderRadius: 0.2, fontWeight: 700 }}
        >
          Add Property
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gap: 2,
          }}
        >
          {properties.map((p) => (
            <Paper
              key={p.property_id}
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0.2,
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": { borderColor: "primary.main", boxShadow: 2 },
              }}
              onClick={() => setEditingId(p.property_id)}
            >
              <Box
                sx={{
                  height: 120,
                  bgcolor: "action.hover",
                  position: "relative",
                }}
              >
                {p.banner_url ? (
                  <Box
                    component="img"
                    src={p.banner_url}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <HouseOutlined
                      sx={{ fontSize: 40, color: "text.disabled" }}
                    />
                  </Box>
                )}
                <Chip
                  label={p.booking_type}
                  size="small"
                  color={p.booking_type === "DIRECT" ? "success" : "default"}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    fontWeight: 700,
                    fontSize: 10,
                  }}
                />
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" fontWeight={700} noWrap>
                  {p.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {p.area}, {p.city}, {p.state}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Chip
                    label={`${p.unit_count} units`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
      <Dialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 0.2, backgroundImage: "none" } },
        }}
      >
        <DialogTitle>
          <Typography fontWeight={700}>New Property</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}
          >
            <TextField
              label="Property Name *"
              size="small"
              value={newProp.name}
              onChange={(e) =>
                setNewProp((p) => ({ ...p, name: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Description"
              size="small"
              value={newProp.description}
              onChange={(e) =>
                setNewProp((p) => ({ ...p, description: e.target.value }))
              }
              multiline
              rows={5}
              fullWidth
            />
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              <TextField
                label="Area"
                size="small"
                value={newProp.area}
                onChange={(e) =>
                  setNewProp((p) => ({ ...p, area: e.target.value }))
                }
              />
              <TextField
                label="City"
                size="small"
                value={newProp.city}
                onChange={(e) =>
                  setNewProp((p) => ({ ...p, city: e.target.value }))
                }
              />
              <TextField
                label="State"
                size="small"
                value={newProp.state}
                onChange={(e) =>
                  setNewProp((p) => ({ ...p, state: e.target.value }))
                }
              />
              <TextField
                label="Country"
                size="small"
                value={newProp.country}
                onChange={(e) =>
                  setNewProp((p) => ({ ...p, country: e.target.value }))
                }
              />
              <TextField
                label="Address"
                size="small"
                value={newProp.address}
                onChange={(e) =>
                  setNewProp((p) => ({ ...p, address: e.target.value }))
                }
                sx={{ gridColumn: "1 / -1" }}
              />
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              <FormControl size="small">
                <InputLabel>Booking Type</InputLabel>
                <Select
                  value={newProp.bookingType}
                  label="Booking Type"
                  onChange={(e) =>
                    setNewProp((p) => ({ ...p, bookingType: e.target.value }))
                  }
                >
                  <MenuItem value="DIRECT">Direct</MenuItem>
                  <MenuItem value="ENQUIRY">Enquiry Only</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel>Accommodation</InputLabel>
                <Select
                  value={newProp.accommodationType}
                  label="Accommodation"
                  onChange={(e) =>
                    setNewProp((p) => ({
                      ...p,
                      accommodationType: e.target.value,
                    }))
                  }
                >
                  <MenuItem value="ENTIRE_HOME">Entire Home</MenuItem>
                  <MenuItem value="SEPARATE_ROOMS">Separate Rooms</MenuItem>
                  <MenuItem value="ENTIRE_HOME_AND_SEPARATE_ROOMS">
                    Both
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Max Capacity"
                type="number"
                size="small"
                value={newProp.maxcapacity}
                onChange={(e) =>
                  setNewProp((p) => ({ ...p, maxcapacity: +e.target.value }))
                }
              />
              <TextField
                label="Bedrooms"
                type="number"
                size="small"
                value={newProp.bedroomcount}
                onChange={(e) =>
                  setNewProp((p) => ({ ...p, bedroomcount: +e.target.value }))
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={createProperty}
            disabled={!newProp.name || creating}
            startIcon={
              creating ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <AddOutlined />
              )
            }
            sx={{ borderRadius: 0.2, fontWeight: 700 }}
          >
            {creating ? "Creating..." : "Create Property"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
