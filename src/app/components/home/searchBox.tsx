"use client";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  styled,
  TextField,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";
import { propertiesService } from "@/app/@services";
import { usePropertyStore } from "@/context/PropertyContext";

export const locations = [
  "All",
  "Lonavala",
  "Karjat",
  "Alibaug",
  "Navi Mumbai",
  "Udaipur",
];

const CustomDatePicker = styled(DatePicker)({
  "& .MuiInputLabel-root": {
    color: "#fff", // label color
  },
  "& .MuiPickersInputBase-root": { color: "#fff" },
  "& .MuiPickersOutlinedInput-root": { color: "#fff" },
  // The actual input value text
  "& .MuiPickersInputBase-input": { color: "#fff" },
  // Label
  // "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
  // Border
  "& .MuiPickersOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.4)",
  },
  "&:hover .MuiPickersOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.7)",
  },
  "& .Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  // Calendar icon
  "& .MuiSvgIcon-root": { color: "#fff" },
});

const SearchBox = () => {
  const [location, setLocation] = useState<string>("All");
  const [guests, setGuests] = useState<number>(6);
  const [checkIn, setCheckIn] = useState<PickerValue>(dayjs());
  const [checkOut, setCheckOut] = useState<PickerValue>(dayjs().add(1, "day"));

  const [loadingButton, setLoadingButton] = useState(false);
  const router = useRouter();
  const { setAvailabilityCache } = usePropertyStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loadingButton) return;

    setLoadingButton(true);

    const citySlug = location ? location.toLowerCase() : "all";
    const checkInStr = checkIn ? checkIn.format("YYYY-MM-DD") : null;
    const checkOutStr = checkOut ? checkOut.format("YYYY-MM-DD") : null;

    const params = new URLSearchParams();
    if (guests) params.set("guests", String(guests));
    if (checkInStr) params.set("checkIn", checkInStr);
    if (checkOutStr) params.set("checkOut", checkOutStr);

    try {
      if (checkInStr && checkOutStr) {
        const result = await propertiesService.getProperties({
          checkIn: checkInStr,
          checkOut: checkOutStr,
        });
        setAvailabilityCache({
          checkIn: checkInStr,
          checkOut: checkOutStr,
          properties: result,
        });
      }
    } catch {
      setLoadingButton(false)
    }

    router.push(`/stays/${citySlug}?${params.toString()}`);
  };

  return (
    <div>
      <div className="mt-3 relative">
        <Box className="mt-1 p-2 rounded-sm w-full flex flex-col justify-center">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-2">
              <Autocomplete
                className="col-span-2 mb-0! md:col-span-4 "
                options={locations}
                value={location}
                onChange={(e, val) => setLocation(val || "")}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location"
                    fullWidth
                    sx={{
                      cursor: "context-menu !important",
                      "& label": {
                        color: "#ffffff",
                      },
                      "& label.Mui-focused": {
                        color: "white",
                      },
                      borderRadius: 1,
                      input: {
                        color: "white",
                        "&::label": {
                          color: "white",
                        },
                        "&::placeholder": {
                          color: "white",
                          opacity: 1,
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                )}
                sx={{
                  mb: 2,
                  "& .MuiAutocomplete-clearIndicator": {
                    color: "#ffffff",
                  },
                  "& .MuiAutocomplete-popupIndicator": {
                    color: "#ffffff",
                  },
                }}
              />

              <CustomDatePicker
                className="md:col-span-2 col-span-1"
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                label="Check-in Date"
                format="DD/MM/YYYY"
                disablePast
                minDate={dayjs()}
                // slotProps={{ textField: { fullWidth: true } }}
                value={checkIn}
                onChange={(newVal) => {
                  if (newVal) {
                    setCheckIn(newVal);
                    if (newVal.isAfter(checkOut)) {
                      setCheckOut(newVal.add(1, "day"));
                    }
                  }
                }}
              />
              <CustomDatePicker
                className="md:col-span-2 col-span-1"
                label="Check-out Date"
                format="DD/MM/YYYY"
                disablePast
                slotProps={{ textField: { fullWidth: true } }}
                value={checkOut}
                onChange={(newVal) => {
                  if (newVal) setCheckOut(newVal);
                }}
              />
              <TextField
                className="col-span-2"
                type="number"
                label="Guests"
                fullWidth
                value={guests}
                onChange={(e) =>
                  setGuests(Math.max(1, Number.parseInt(e.target.value)))
                }
                sx={{
                  "& label": {
                    color: "#ffffff",
                  },
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  borderRadius: 1,
                  input: {
                    color: "white",
                    "&::label": {
                      color: "white",
                    },
                    "&::placeholder": {
                      color: "white",
                      opacity: 1,
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />

              <Button
                className="col-span-2"
                variant="contained"
                type="submit"
                disabled={loadingButton}
                onClick={handleSubmit}
                sx={{
                  "&.Mui-disabled": {
                    bgcolor: "primary.main",
                    color: "#fff",
                    opacity: 0.85,
                  },
                }}
              >
                {loadingButton ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "SEARCH"
                )}
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default SearchBox;
