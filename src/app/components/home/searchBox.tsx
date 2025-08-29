"use client";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Collapse,
  TextField,
} from "@mui/material";
import React, { FormEvent, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

export const locations = [
  "All",
  "Lonavala",
  "Gadeshwar",
  "Karjat",
  "Alibaug",
  "Uran",
];

const SearchBox = () => {
  const [location, setLocation] = useState<string>("All");
  const [guests, setGuests] = useState<number>(1);

  const [open, setOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const anchorRef = useRef(null);
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
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div className="mt-3 relative">
          <Box
            ref={anchorRef}
            onClick={() => setOpen((prev) => !prev)}
            sx={{
              backgroundColor: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(4px)",
              borderRadius: 1,
              padding: "15px",
              display: open ? "none" : "block",
              color: "#ffffff",
            }}
          >
            <SearchIcon /> search for location, guest count...
          </Box>

          <Collapse in={open} timeout={300} unmountOnExit>
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
                  {loadingButton ? <CircularProgress size={30} color="inherit" /> : "Search"}
                </Button>
              </form>
            </Box>
          </Collapse>
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default SearchBox;
