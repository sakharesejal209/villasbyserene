"use client";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const locations = [
  "All",
  "Lonavala",
  "Gadeshwar",
  "Karjat",
  "Alibaug",
  "Uran",
  "Udaipur",
];

const SearchBox = () => {
  const [location, setLocation] = useState<string>("All");
  const [guests, setGuests] = useState<number>(1);

  const [loadingButton, setLoadingButton] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    setLoadingButton(true);
    e.preventDefault();

    const locSlug = location
      ? location.toLowerCase().replace(/\s+/g, "-")
      : "all";

    let path = `/stays/${locSlug}`;

    if (guests && guests > 0) {
      path += `?guests=${guests}`;
    }
    router.push(path);
  };

  return (
    <div>
      <div className="mt-3 relative">
        <Box className="mt-1 p-2 rounded-lg w-full flex flex-col justify-center">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <Autocomplete
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
              <TextField
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
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              {loadingButton ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                "Search"
              )}
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default SearchBox;
