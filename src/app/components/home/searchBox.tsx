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

export const locations = [
  "All",
  "Lonavala",
  "Panvel",
  "Karjat",
  "Alibaug",
  "Navi Mumbai",
  "Udaipur",
];

const CustomDatePicker = styled(DatePicker)({
  "& label.Mui-focused": {
    color: "#ffffff",
  },
});

const SearchBox = () => {
  const [location, setLocation] = useState<string>("All");
  const [guests, setGuests] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<PickerValue>(dayjs());
  const [checkOut, setCheckOut] = useState<PickerValue>(dayjs().add(1, "day"));

  const [loadingButton, setLoadingButton] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    setLoadingButton(true);
    e.preventDefault();

    const params = new URLSearchParams();
    if (guests) params.set("guests", String(guests));
    if (checkIn) params.set("checkIn", checkIn.format("YYYY-MM-DD"));
    if (checkOut) params.set("checkOut", checkOut.format("YYYY-MM-DD"));

    router.push(`/stays/${location}?${params.toString()}`);
  };

  return (
    <div>
      <div className="mt-3 relative">
        <Box className="mt-1 p-2 rounded-lg w-full flex flex-col justify-center">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 md:grid-cols-12 gap-2">
              <Autocomplete
                className="col-span-2 mb-0! md:col-span-4 "
                options={locations}
                value={location}
                onChange={(e, val) => setLocation(val || "")}
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
                label="Check-in Date"
                format="DD/MM/YYYY"
                disablePast
                minDate={dayjs()}
                slotProps={{ textField: { fullWidth: true } }}
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
                  setGuests(Math.max(1, parseInt(e.target.value)))
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
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleSubmit}
              >
                {loadingButton ? (
                  <CircularProgress size={30} color="inherit" />
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
