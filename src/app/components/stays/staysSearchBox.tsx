"use client";

import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
} from "react";

import {
  Autocomplete,
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { locations } from "../home/searchBox";
import { useRouter } from "next/navigation";
import allAmenities from "./data.json";

type Filters = {
  location: string;
  guests: number;
  bedrooms: number | null;
  amenities: string[];
  accommodationType: string;
};

type StaysSearchBoxPropType = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

const StaysSearchBox: FC<StaysSearchBoxPropType> = (props) => {
  const { filters, setFilters } = props;
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.guests) params.set("guests", String(filters.guests));
    if (filters.bedrooms) params.set("bedrooms", String(filters.bedrooms));
    if (filters.amenities.length)
      params.set("amenities", filters.amenities.join(","));
    if (filters.accommodationType)
      params.set("accommodation", filters.accommodationType);

    router.replace(`/stays/${filters.location}?${params.toString()}`);
  }, [filters, router]);

  return (
    <div className="col-span-3">
      <Card className="p-3 h-full">
        <Typography variant="h6">Filters</Typography>
        <form className="w-full">
          <div className="w-full min-h-screen flex flex-col gap-4 p-2 mt-4">
            {/* location */}
            <div className="w-full">
              <Typography variant="subtitle2">Location</Typography>
              <Autocomplete
                options={locations}
                value={filters.location}
                onChange={(e, val) =>
                  setFilters({ ...filters, location: val || "all" })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    sx={{
                      borderRadius: 0,
                    }}
                  />
                )}
              />
            </div>

            {/* guest count */}
            <div className="w-full">
              <Typography variant="subtitle2">Guest Count</Typography>
              <TextField
                type="number"
                slotProps={{
                  input: {
                    inputProps: {
                      min: 1,
                      max: 70,
                      step: 1,
                    },
                  },
                }}
                fullWidth
                value={filters.guests}
                onChange={(e) =>
                  setFilters({ ...filters, guests: Number(e.target.value) })
                }
                sx={{
                  borderRadius: 0,
                }}
              />
            </div>

            {/* bedroom count */}
            <div className="w-full">
              <Typography variant="subtitle2">No. of Bedrooms</Typography>
              <Slider
                value={filters.bedrooms || 0}
                onChange={(_, value) =>
                  setFilters({ ...filters, bedrooms: value })
                }
                step={1}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">min 1</Typography>
                <Typography variant="body2">max 12</Typography>
              </Box>
            </div>

            {/* Amenities */}
            <div className="w-full">
              <Typography variant="subtitle2">Amenities</Typography>
              <FormGroup className="h-[250px] overflow-y-auto !block">
                {[...allAmenities]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <div className="!block" key={item.amenity_id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filters.amenities.includes(
                              item.amenity_id
                            )}
                            onChange={(e) => {
                              setFilters({
                                ...filters,
                                amenities: e.target.checked
                                  ? [...filters.amenities, item.amenity_id]
                                  : filters.amenities.filter(
                                      (x) => x !== item.amenity_id
                                    ),
                              });
                            }}
                          />
                        }
                        label={item.name}
                      />
                    </div>
                  ))}
              </FormGroup>
            </div>

            {/* accomodation type */}
            <div className="w-full">
              <Typography variant="subtitle2">Accomodation Type</Typography>

              <ToggleButtonGroup
                value={filters.accommodationType}
                exclusive
                onChange={(_, value) =>
                  setFilters({ ...filters, accommodationType: value })
                }
              >
                <ToggleButton value="ENTIRE_HOME">Entire Home</ToggleButton>
                <ToggleButton value="PRIVATE_ROOM">Private Room</ToggleButton>
                <ToggleButton value="LUXURY_VILLA">Luxury Villa</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default StaysSearchBox;
