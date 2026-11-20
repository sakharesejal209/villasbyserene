"use client";

import { ImageCategory } from "@/app/@types";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { IoAdd as AddIcon } from "react-icons/io5";

interface Props {
  newImg: { image_url: string; image_alt: string; image_category_id: string };
  categories: ImageCategory[];
  adding: boolean;
  onChange: (patch: Partial<{ image_url: string; image_alt: string; image_category_id: string }>) => void;
  onAdd: () => void;
}

export const AddToPoolStep = ({ newImg, categories, adding, onChange, onAdd }: Props) => (
  <Box>
    <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
      Step 1 — Add Images to Pool
    </Typography>
    <Paper
      elevation={0}
      sx={{ p: 2, border: "1px solid", borderColor: "divider" }}
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
          onChange={(e) => onChange({ image_url: e.target.value })}
          fullWidth
        />
        <TextField
          label="Alt text (e.g. air-eco-pool-01)"
          defaultValue="cliffview-"
          size="small"
          value={newImg.image_alt}
          onChange={(e) => onChange({ image_alt: e.target.value })}
          fullWidth
        />
        <FormControl size="small" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={newImg.image_category_id}
            label="Category"
            onChange={(e) => onChange({ image_category_id: e.target.value as string })}
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
          startIcon={adding ? <CircularProgress size={14} color="inherit" /> : <AddIcon />}
          onClick={onAdd}
          disabled={!newImg.image_url || !newImg.image_alt || adding}
          sx={{ borderRadius: 0.2 }}
        >
          {adding ? "Adding..." : "Add to Pool"}
        </Button>
      </Box>
    </Paper>
  </Box>
);
