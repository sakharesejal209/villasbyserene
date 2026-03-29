"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CloseOutlined } from "@mui/icons-material";
import { locations } from "../home/searchBox";
import allAmenities from "./data.json";
import { StayFilters } from "./StaysMainContainer";

// ── Types───

interface FilterFormValues {
  location: string;
  guests: number;
  bedrooms: number;
  amenities: string[];
  accommodationType: string;
  checkIn: Dayjs | null;
  checkOut: Dayjs | null;
}

interface StaysSearchBoxProps {
  filters: StayFilters;
  setFilters: Dispatch<SetStateAction<StayFilters>>;
  setopenFilters: Dispatch<SetStateAction<boolean>>;
}

const PRICE_MIN = 0;
const PRICE_MAX = 50000;

const StaysSearchBox: FC<StaysSearchBoxProps> = ({
  filters,
  setFilters,
  setopenFilters,
}) => {
  const router = useRouter();
  const urlParams = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const isDesktop = useMediaQuery("(min-width:768px)");
  const slug = decodeURIComponent(urlParams.slug || "all");

  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.priceMin,
    filters.priceMax,
  ]);
  const [appliedPrice, setAppliedPrice] = useState<[number, number]>([
    filters.priceMin,
    filters.priceMax,
  ]);

  const { control, getValues, setValue } = useForm<FilterFormValues>({
    defaultValues: {
      location: filters.location,
      guests: filters.guests,
      bedrooms: filters.bedrooms,
      amenities: filters.amenities,
      accommodationType: filters.accommodationType,
      checkIn: filters.checkIn ? dayjs(filters.checkIn) : dayjs(),
      checkOut: filters.checkOut
        ? dayjs(filters.checkOut)
        : dayjs().add(1, "day"),
    },
  });

  const syncUrl = (values: FilterFormValues, price: [number, number]) => {
    const params = new URLSearchParams();
    const city =
      values.location && values.location !== "all" ? values.location : slug;

    if (values.guests > 1) params.set("guests", String(values.guests));
    if (values.bedrooms > 0) params.set("bedrooms", String(values.bedrooms));
    if (values.amenities.length)
      params.set("amenities", values.amenities.join(","));
    if (values.accommodationType !== "ALL")
      params.set("accommodationType", values.accommodationType);
    if (values.checkIn)
      params.set("checkIn", values.checkIn.format("YYYY-MM-DD"));
    if (values.checkOut)
      params.set("checkOut", values.checkOut.format("YYYY-MM-DD"));
    if (price[0] > PRICE_MIN) params.set("priceMin", String(price[0]));
    if (price[1] < PRICE_MAX) params.set("priceMax", String(price[1]));

    router.replace(`/stays/${city}?${params.toString()}`, { scroll: false });
  };

  const handleChange = (
    field: keyof FilterFormValues,
    value: FilterFormValues[keyof FilterFormValues],
  ) => {
    setValue(field, value as any);
    const updated = { ...getValues(), [field]: value };

    setFilters((prev) => ({
      ...prev,
      [field]:
        field === "checkIn" || field === "checkOut"
          ? ((value as Dayjs | null)?.format("YYYY-MM-DD") ?? null)
          : value,
    }));

    if (isDesktop) syncUrl(updated, appliedPrice);
  };

  const handlePriceApply = () => {
    setAppliedPrice(priceRange);
    setFilters((prev) => ({
      ...prev,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
    }));
    if (isDesktop) syncUrl(getValues(), priceRange);
  };

  const handleMobileApply = () => {
    syncUrl(getValues(), appliedPrice);
    setopenFilters(false);
  };

  const checkIn =
    useWatch({ control, name: "checkIn" }) ??
    (filters.checkIn ? dayjs(filters.checkIn) : dayjs());

  return (
    <div className="block md:col-span-3 sticky top-0 md:h-fit px-4">
      <Card className="p-3">
        {/* Header */}
        <div className="md:hidden flex justify-between items-center">
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setopenFilters(false)}>
            <CloseOutlined />
          </IconButton>
        </div>
        <Typography className="hidden md:block" variant="h6">
          Filters
        </Typography>

        <div className="w-full h-full md:min-h-screen flex flex-col p-2 gap-4 mt-4">
          <div className="w-full">
            <Typography variant="subtitle2">Location</Typography>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={locations}
                  value={field.value}
                  onChange={(_, val) => handleChange("location", val || "all")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      sx={{ borderRadius: 0, marginTop: 0.5 }}
                    />
                  )}
                />
              )}
            />
          </div>

          <div className="w-full flex justify-between gap-2">
            <div className="w-1/2">
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Check-in
              </Typography>
              <Controller
                name="checkIn"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    format="DD/MM/YYYY"
                    disablePast
                    minDate={dayjs()}
                    onChange={(val) => {
                      handleChange("checkIn", val);
                      const currentCheckOut = getValues("checkOut");
                      if (
                        val &&
                        currentCheckOut &&
                        val.isAfter(currentCheckOut)
                      ) {
                        handleChange("checkOut", val.add(1, "day"));
                      }
                    }}
                    slotProps={{
                      textField: { fullWidth: true, size: "small" },
                    }}
                  />
                )}
              />
            </div>
            <div className="w-1/2">
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Check-out
              </Typography>
              <Controller
                name="checkOut"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value}
                    format="DD/MM/YYYY"
                    disablePast
                    minDate={
                      checkIn ? checkIn.add(1, "day") : dayjs().add(1, "day")
                    }
                    onChange={(val) => handleChange("checkOut", val)}
                    slotProps={{
                      textField: { fullWidth: true, size: "small" },
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-2">
            <div className="w-1/2">
              <Typography variant="subtitle2">Guest Count</Typography>
              <Controller
                name="guests"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    value={field.value}
                    onChange={(e) =>
                      handleChange("guests", Number(e.target.value))
                    }
                    slotProps={{
                      input: { inputProps: { min: 1, max: 70, step: 1 } },
                    }}
                    sx={{ borderRadius: 0, marginTop: 0.5 }}
                  />
                )}
              />
            </div>
            <div className="w-1/2">
              <Typography variant="subtitle2">No. of Rooms</Typography>
              <Controller
                name="bedrooms"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    value={field.value || ""}
                    placeholder="Any"
                    onChange={(e) =>
                      handleChange(
                        "bedrooms",
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
                    slotProps={{
                      input: { inputProps: { min: 0, max: 12, step: 1 } },
                    }}
                    sx={{ borderRadius: 0, marginTop: 0.5 }}
                  />
                )}
              />
            </div>
          </div>

          <div className="w-full">
            <Typography variant="subtitle2">Price per Night (₹)</Typography>
            <Slider
              value={priceRange}
              onChange={(_, value) => setPriceRange(value as [number, number])}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={5000}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `₹${v.toLocaleString("en-IN")}`}
              sx={{ mt: 1 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 0.5,
              }}
            >
              <Typography variant="body2">
                ₹{priceRange[0].toLocaleString("en-IN")} – ₹
                {priceRange[1].toLocaleString("en-IN")}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={handlePriceApply}
                disabled={
                  priceRange[0] === appliedPrice[0] &&
                  priceRange[1] === appliedPrice[1]
                }
                sx={{ minWidth: 64 }}
              >
                Apply
              </Button>
            </Box>
          </div>

          <div className="w-full">
            <Typography variant="subtitle2">Amenities</Typography>
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <FormGroup className="h-62.5 overflow-y-auto block!">
                  {[...allAmenities]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                      <div className="block!" key={item.amenity_id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value.includes(item.amenity_id)}
                              onChange={(e) => {
                                const updated = e.target.checked
                                  ? [...field.value, item.amenity_id]
                                  : field.value.filter(
                                      (x) => x !== item.amenity_id,
                                    );
                                handleChange("amenities", updated);
                              }}
                            />
                          }
                          label={item.name}
                        />
                      </div>
                    ))}
                </FormGroup>
              )}
            />
          </div>

          <div className="w-full">
            <Typography variant="subtitle2">Accommodation Type</Typography>
            <Controller
              name="accommodationType"
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  value={field.value}
                  exclusive
                  onChange={(_, value) => {
                    if (value !== null)
                      handleChange("accommodationType", value);
                  }}
                  sx={{ marginTop: 1, flexWrap: "wrap" }}
                >
                  <ToggleButton value="ALL">All</ToggleButton>
                  <ToggleButton value="ENTIRE_HOME">Entire Home</ToggleButton>
                  <ToggleButton value="SEPARATE_ROOMS">
                    Private Room
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            />
          </div>
        </div>

        {/* Mobile close */}
        <Button
          variant="contained"
          className="w-full lg:hidden! md:hidden!"
          onClick={handleMobileApply}
        >
          Apply Filters
        </Button>
      </Card>
    </div>
  );
};

export default StaysSearchBox;
