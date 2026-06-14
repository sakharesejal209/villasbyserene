"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { IoSaveOutline  as SaveIcon } from "react-icons/io5";


import { httpService } from "@/app/@services";
import { AdminPropertyDetailDTO, AdminPropertyEntityDTO } from "@/app/@types";

const API = "/admin/properties";

interface Props {
  detail: AdminPropertyDetailDTO;
  onSaved: () => void;
}

export const BasicInfoTab = ({ detail, onSaved }: Props) => {
  const p = detail.property;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<AdminPropertyEntityDTO>({
    defaultValues: { ...p },
  });

  // Reset form when detail changes (after onSaved reload)
  useEffect(() => {
    reset({ ...p });
  }, [detail, reset]);

  const onSubmit = async (data: AdminPropertyEntityDTO) => {
    setSaving(true);
    setError(null);
    try {
      await httpService().put(`${API}/${p.property_id}`, data);
      onSaved();
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
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
        <Controller
          name="name"
          control={control}
          rules={{ required: "Property name is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Property Name"
              fullWidth
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="bookingType"
          control={control}
          render={({ field }) => (
            <FormControl size="small" fullWidth>
              <InputLabel>Booking Type</InputLabel>
              <Select {...field} label="Booking Type">
                <MenuItem value="DIRECT">Direct (Online Booking)</MenuItem>
                <MenuItem value="ENQUIRY">Enquiry Only</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="accommodationType"
          control={control}
          render={({ field }) => (
            <FormControl size="small" fullWidth>
              <InputLabel>Accommodation Type</InputLabel>
              <Select {...field} label="Accommodation Type">
                <MenuItem value="ENTIRE_HOME">Entire Home</MenuItem>
                <MenuItem value="SEPARATE_ROOMS">Separate Rooms</MenuItem>
                <MenuItem value="ENTIRE_HOME_AND_SEPARATE_ROOMS">
                  Entire Home + Rooms
                </MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Controller
            name="checkin_time"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Check-in Time"
                fullWidth
                size="small"
                placeholder="01:00 PM"
              />
            )}
          />
          <Controller
            name="checkout_time"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Check-out Time"
                fullWidth
                size="small"
                placeholder="10:30 AM"
              />
            )}
          />
        </Box>

        <Controller
          name="maxcapacity"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Max Capacity"
              type="number"
              fullWidth
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
              label="Bedroom Count"
              type="number"
              fullWidth
              size="small"
              onChange={(e) => field.onChange(+e.target.value)}
            />
          )}
        />
      </Box>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            multiline
            rows={5}
            fullWidth
            size="small"
          />
        )}
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
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Address" fullWidth size="small" />
          )}
        />
        <Controller
          name="area"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Area / Locality"
              fullWidth
              size="small"
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="City" fullWidth size="small" />
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="State" fullWidth size="small" />
          )}
        />
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Country" fullWidth size="small" />
          )}
        />
        <Controller
          name="map_location"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Map Location (embed URL)"
              fullWidth
              size="small"
            />
          )}
        />
        <Controller
          name="google_maps_url"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Google Maps URL"
              fullWidth
              size="small"
              sx={{ gridColumn: "1 / -1" }}
            />
          )}
        />
      </Box>

      <Divider />

      <Controller
        name="mealsAvailable"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            label="Meals Available"
          />
        )}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          startIcon={
            saving ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <SaveIcon />
            )
          }
          disabled={saving}
          sx={{ borderRadius: 0.2, fontWeight: 700 }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
};
