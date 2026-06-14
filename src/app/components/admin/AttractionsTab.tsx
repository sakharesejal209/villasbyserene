// src/app/admin/properties/tabs/AttractionsTab.tsx
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { IoAdd as AddIcon } from "react-icons/io5";
import {
  MdDeleteOutline as DeleteIcon,
  MdOutlineEdit as EditIcon,
} from "react-icons/md";
import { httpService } from "@/app/@services";
import {
  AdminPropertyDetailDTO,
  AttractionForm,
  NearByAttractionDTO,
} from "@/app/@types";

const API = "/admin/properties";

interface Props {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}

export const AttractionsTab = ({ detail, propertyId, onSaved }: Props) => {
  const [attractions, setAttractions] = useState<NearByAttractionDTO[]>(
    detail.attractions,
  );
  const [editing, setEditing] = useState<NearByAttractionDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Add form ──────────────────────────────────────────────────
  const { control, handleSubmit, reset } = useForm<AttractionForm>({
    defaultValues: { title: "", description: "", distance: "", imageUrl: "" },
  });

  // ── Edit form ─────────────────────────────────────────────────
  const {
    control: eControl,
    handleSubmit: eSubmit,
    reset: eReset,
  } = useForm<NearByAttractionDTO>({ defaultValues: editing ?? {} });

  const add = async (data: AttractionForm) => {
    try {
      const res = await httpService<NearByAttractionDTO>().post(
        `${API}/${propertyId}/attractions`,
        data,
      );
      setAttractions((a) => [...a, res]);
      reset();
    } catch {
      setError("Failed to add attraction");
    }
  };

  const openEdit = (a: NearByAttractionDTO) => {
    setEditing(a);
    eReset(a);
  };

  const update = async (data: NearByAttractionDTO) => {
    if (!editing) return;
    try {
      await httpService().put(
        `${API}/${propertyId}/attractions/${editing.attraction_id}`,
        data,
      );
      setAttractions((a) =>
        a.map((x) =>
          x.attraction_id === editing.attraction_id ? { ...x, ...data } : x,
        ),
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
              <IconButton size="small" onClick={() => openEdit(a)}>
                <EditIcon fontSize={16} />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => del(a.attraction_id)}
              >
                <DeleteIcon fontSize={16}  />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}

      {/* Add form */}
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
          component="form"
          onSubmit={handleSubmit(add)}
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 1.5,
            }}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Title" size="small" fullWidth />
              )}
            />
            <Controller
              name="distance"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Distance"
                  size="small"
                  fullWidth
                  placeholder="5 mins"
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
                  fullWidth
                  sx={{ gridColumn: "1 / -1" }}
                />
              )}
            />
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL"
                  size="small"
                  fullWidth
                  sx={{ gridColumn: "1 / -1" }}
                />
              )}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 0.2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Edit dialog */}
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
            component="form"
            id="edit-attraction-form"
            onSubmit={eSubmit(update)}
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}
          >
            <Controller
              name="title"
              control={eControl}
              render={({ field }) => (
                <TextField {...field} label="Title" size="small" fullWidth />
              )}
            />
            <Controller
              name="distance"
              control={eControl}
              render={({ field }) => (
                <TextField {...field} label="Distance" size="small" fullWidth />
              )}
            />
            <Controller
              name="description"
              control={eControl}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                />
              )}
            />
            <Controller
              name="image_url"
              control={eControl}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL"
                  size="small"
                  fullWidth
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setEditing(null)}>Cancel</Button>
          <Button
            type="submit"
            form="edit-attraction-form"
            variant="contained"
            sx={{ borderRadius: 0.2, fontWeight: 700 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
