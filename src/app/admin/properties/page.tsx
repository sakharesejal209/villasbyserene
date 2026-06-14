"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import {
  IoAddOutline as AddIcon,
  IoArrowBack as BackIcon,
  IoHomeOutline as HomeIcon,
} from "react-icons/io5";

import { httpService } from "@/app/@services";
import {
  AdminPropertyDetailDTO,
  AdminPropertyRowDTO,
  PropertyForm,
} from "@/app/@types";
import { BasicInfoTab } from "../../components/admin/BasicInfoTab";
import { UnitsTab } from "../../components/admin/UnitsTab";
import { ImagesTab } from "../../components/admin/ImagesTab";
import { AmenitiesTab } from "../../components/admin/AmenitiesTab";
import { FoodMenuTab } from "../../components/admin/FoodMenuTab";
import { AttractionsTab } from "../../components/admin/AttractionsTab";

const API = "/admin/properties";

// ════════════════════════════════════════════════════════════════════
// Property Editor — tab shell
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
      .then((res) => setDetail(res))
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
          <BackIcon />
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
// Main Page — property list + create
// ════════════════════════════════════════════════════════════════════
export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<AdminPropertyRowDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const theme = useTheme();

  const { control, handleSubmit, reset } = useForm<PropertyForm>({
    defaultValues: {
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
    },
  });

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

  const handleToggle = async (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation(); // prevent opening the editor
    try {
      await httpService().put(`${API}/${propertyId}/toggle`, {});
      load();
    } catch {
      setError("Failed to toggle property");
    }
  };

  const createProperty = async (data: PropertyForm) => {
    setCreating(true);
    try {
      const res = await httpService<{ property_id: string }>().post(API, data);
      setCreateOpen(false);
      reset();
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
          startIcon={<AddIcon />}
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
                    <HomeIcon
                      fontSize={40}
                      color={theme.palette.text.disabled}
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={700} noWrap>
                      {p.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {p.area}, {p.city}, {p.state}
                    </Typography>
                  </Box>
                  <Switch
                    size="small"
                    checked={p.isEnabled ?? true}
                    onClick={(e) => handleToggle(e, p.property_id)}
                    color="primary"
                    sx={{ ml: 1, flexShrink: 0 }}
                  />
                </Box>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Chip
                    label={`${p.unit_count} units`}
                    size="small"
                    variant="outlined"
                  />
                  {!(p.isEnabled ?? true) && (
                    <Chip
                      label="Disabled"
                      size="small"
                      color="error"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* Create Property Dialog */}
      <Dialog
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
          reset();
        }}
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
            component="form"
            id="create-property-form"
            onSubmit={handleSubmit(createProperty)}
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Property Name *"
                  size="small"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  size="small"
                  multiline
                  rows={3}
                  fullWidth
                />
              )}
            />
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Area" size="small" />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="City" size="small" />
                )}
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="State" size="small" />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Country" size="small" />
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    size="small"
                    sx={{ gridColumn: "1 / -1" }}
                  />
                )}
              />
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              <Controller
                name="bookingType"
                control={control}
                render={({ field }) => (
                  <FormControl size="small">
                    <InputLabel>Booking Type</InputLabel>
                    <Select {...field} label="Booking Type">
                      <MenuItem value="DIRECT">Direct</MenuItem>
                      <MenuItem value="ENQUIRY">Enquiry Only</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="accommodationType"
                control={control}
                render={({ field }) => (
                  <FormControl size="small">
                    <InputLabel>Accommodation</InputLabel>
                    <Select {...field} label="Accommodation">
                      <MenuItem value="ENTIRE_HOME">Entire Home</MenuItem>
                      <MenuItem value="SEPARATE_ROOMS">Separate Rooms</MenuItem>
                      <MenuItem value="ENTIRE_HOME_AND_SEPARATE_ROOMS">
                        Both
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="maxcapacity"
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
                name="bedroomcount"
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
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => {
              setCreateOpen(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-property-form"
            variant="contained"
            disabled={creating}
            startIcon={
              creating ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <AddIcon />
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
