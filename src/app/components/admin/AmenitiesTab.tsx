"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Chip,
  Typography,
} from "@mui/material";
import { IoSaveOutline as SaveIcon } from "react-icons/io5";
import { httpService } from "@/app/@services";
import {
  AdminPropertyDetailDTO,
  MasterAmenityDTO,
  MasterHouseRuleDTO,
  MasterThemeDTO,
  SelectedAmenityDTO,
  SelectedRuleDTO,
  SelectedThemeDTO,
} from "@/app/@types";

const API = "/admin/properties";

interface Props {
  detail: AdminPropertyDetailDTO;
  propertyId: string;
  onSaved: () => void;
}

export const AmenitiesTab = ({ detail, propertyId, onSaved }: Props) => {
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
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 0.2,
              maxWidth: "74%",
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
          </Box>
        </Box>
      ))}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={save}
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
