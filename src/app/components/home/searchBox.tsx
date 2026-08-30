"use client";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";

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
  "& .MuiPickersInputBase-root": { borderRadius: "4px" },
});

const SearchBox = ({ isMobile }: { isMobile: boolean }) => {
  const [location, setLocation] = useState<string>("All");
  const [guests, setGuests] = useState<number>(6);
  const [checkIn, setCheckIn] = useState<PickerValue>(dayjs());
  const [checkOut, setCheckOut] = useState<PickerValue>(dayjs().add(1, "day"));

  const [loadingButton, setLoadingButton] = useState(false);
  const router = useRouter();
  const theme = useTheme();
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
      setLoadingButton(false);
    }

    router.push(`/stays/${citySlug}?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        width: { sm: "95%", md: "85%" },
        height: isMobile ? "100%" : "132px",
        margin: "auto",
        marginTop: isMobile ? "0px" : "-93.13px",
        bgcolor: theme.palette.background.paper,
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{ padding: isMobile ? 1 : 2.5, marginBottom: isMobile ? 0.5 : 0 }}
        className="w-full flex flex-col justify-center p-4 relative"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-11 gap-3 md:gap-2 w-full">
            <Autocomplete
              className="col-span-2 mb-0! md:col-span-4"
              options={locations}
              value={location}
              onChange={(e, val) => setLocation(val || "")}
              disableClearable
              renderInput={(params) => (
                <TextField {...params} label="Location" fullWidth />
              )}
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
              className="md:col-span-2 col-span-2"
              type="number"
              label="Guests"
              fullWidth
              value={guests}
              onChange={(e) =>
                setGuests(Math.max(1, Number.parseInt(e.target.value)))
              }
            />

            <Button
              className="md:col-span-1 col-span-2 w-full"
              size="small"
              variant="contained"
              type="submit"
              disabled={loadingButton}
              onClick={handleSubmit}
              startIcon={!loadingButton && <IoSearchOutline className="mr-1" />}
            >
              {loadingButton ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </form>
      </Box>
      {/* Trust stats */}
      <Box
        sx={{
          bgcolor: theme.palette.secondary.light,
          display: "flex",
          gap: isMobile ? 1 : 2,
          flexWrap: "wrap",
          padding: 1,
          position: "relative",
          borderRadius: "0px 0px 20px 20px",
        }}
      >
        {[
          { value: "13+", label: "Curated Villas" },
          { value: "500+", label: "Happy Guests" },
          { value: "4.8★", label: "Average Rating" },
        ].map((stat) => (
          <Box
            key={stat.label}
            sx={{
              textAlign: "center",
              px: 1,
              py: 0.5,
              backdropFilter: "blur(8px)",
              bgcolor: "rgba(255,255,255,0.6)",
              borderRadius: 1,
              border: "1px solid rgba(255,255,255,0.15)",
              display: isMobile ? "block" : "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: "#414042",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: "#414042",
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchBox;
