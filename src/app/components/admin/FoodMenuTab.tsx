// src/app/admin/properties/tabs/FoodMenuTab.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { IoSaveOutline  as SaveIcon } from "react-icons/io5";

import { httpService } from "@/app/@services";
import { AdminPropertyDetailDTO, FoodMenuDTO } from "@/app/@types";

const API = "/admin/properties";

interface Props {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}

export const FoodMenuTab = ({ detail, propertyId, onSaved }: Props) => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const existing = useMemo(() => {
    return detail.foodMenus?.[0] ?? {};
  }, [detail.foodMenus]);

  const { control, handleSubmit, reset } = useForm<Partial<FoodMenuDTO>>({
    defaultValues: {
      breakfastTime: existing.breakfastTime,
      description: existing.description,
      dinnerTime: existing.dinnerTime,
      highteaTime: existing.highteaTime,
      isJain: existing.isJain,
      isNonVeg: existing.isNonVeg,
      isVeg: existing.isVeg,
      lunchTime: existing.lunchTime,
      menuUrl: existing.menuUrl,
    },
  });

  const onSubmit = async (data: Partial<FoodMenuDTO>) => {
    setSaving(true);
    setError(null);
    try {
      await httpService().put(`${API}/${propertyId}/food-menu`, data);
      onSaved();
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    reset({
      ...existing,
    });
  }, [detail, existing, reset]);

  return (
    <form className="flex flex-col gap-2.5" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Controller
          name="isVeg"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Vegetarian"
            />
          )}
        />
        <Controller
          name="isNonVeg"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Non-Vegetarian"
            />
          )}
        />
        <Controller
          name="isJain"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Jain"
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
            label="Menu Description"
            multiline
            rows={5}
            fullWidth
            size="small"
          />
        )}
      />

      <Controller
        name="menuUrl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Menu URL (PDF/image)"
            fullWidth
            size="small"
          />
        )}
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
        <Controller
          name="breakfastTime"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Breakfast" fullWidth size="small" />
          )}
        />
        <Controller
          name="lunchTime"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Lunch" fullWidth size="small" />
          )}
        />
        <Controller
          name="highteaTime"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="High Tea" fullWidth size="small" />
          )}
        />
        <Controller
          name="dinnerTime"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Dinner" fullWidth size="small" />
          )}
        />
      </Box>

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
    </form>
  );
};
