"use client";

import { FC, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  IoCalendarOutline as CalendarIcon,
  IoSearchOutline as SearchIcon,
} from "react-icons/io5";

interface StaysTopBarProps {
  initialCheckIn: string | null;
  initialCheckOut: string | null;
  loading?: boolean;
}

const StaysTopBar: FC<StaysTopBarProps> = ({
  initialCheckIn,
  initialCheckOut,
  loading,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParams = useParams<{ slug: string }>();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Dayjs | null>(
    initialCheckIn ? dayjs(initialCheckIn) : null,
  );
  const [checkOut, setCheckOut] = useState<Dayjs | null>(
    initialCheckOut ? dayjs(initialCheckOut) : null,
  );

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (checkIn) params.set("checkIn", checkIn.format("YYYY-MM-DD"));
    else params.delete("checkIn");
    if (checkOut) params.set("checkOut", checkOut.format("YYYY-MM-DD"));
    else params.delete("checkOut");
    const slug = decodeURIComponent(urlParams.slug || "all");
    router.push(`/stays/${slug}?${params.toString()}`, { scroll: false });
  };

  const nights = checkIn && checkOut ? checkOut.diff(checkIn, "day") : null;

  const dateLabel =
    checkIn && checkOut
      ? `${checkIn.format("DD MMM")} – ${checkOut.format("DD MMM")}${nights ? ` · ${nights} night${nights === 1 ? "" : "s"}` : ""}`
      : "Select dates";

  const hasDate = !!(checkIn && checkOut);

    useEffect(() => {
    if (!loading) setOpen(false);
  }, [loading]);

  return (
    <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          overflow: "hidden",
          borderRadius: open ? 0.5 : 6,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          width: open ? { xs: "100%", sm: "auto" } : "auto",
          transition: "border-color 0.25s ease, border-radius 0.25s ease",
        }}
      >
        {/* Date pickers + buttons — hidden until open */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "auto auto auto" },
            alignItems: "center",
            gap: 1,
            px: open ? 1.5 : 0,
            py: open ? 1.5 : 0,
            maxHeight: open ? 300 : 0,
            maxWidth: open ? 600 : 0,
            opacity: open ? 1 : 0,
            overflow: "hidden",
            transition:
              "max-height 0.3s cubic-bezier(0.4,0,0.2,1), max-width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease, padding 0.3s ease",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <Box sx={{ minWidth: 140 }}>
            <DatePicker
              value={checkIn}
              format="DD/MM/YYYY"
              disablePast
              minDate={dayjs()}
              onChange={(val) => {
                setCheckIn(val);
                if (val && checkOut && val.isAfter(checkOut))
                  setCheckOut(val.add(1, "day"));
              }}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  label: "Check-in",
                },
              }}
            />
          </Box>

          <Box sx={{ minWidth: 140 }}>
            <DatePicker
              value={checkOut}
              format="DD/MM/YYYY"
              disablePast
              minDate={checkIn ? checkIn.add(1, "day") : dayjs().add(1, "day")}
              onChange={(val) => setCheckOut(val)}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  label: "Check-out",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexShrink: 0,
              gridColumn: { xs: "1 / -1", sm: "auto" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpen(false)}
              sx={{ flex: { xs: 1, sm: "none" } }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleApply}
              loading={loading}
              startIcon={!loading ? <SearchIcon size={14} /> : undefined}
              sx={{ flex: { xs: 1, sm: "none" } }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {/* Chip — always visible, divider appears when open */}
        {!open && (

        <Box
          onClick={() => setOpen((v) => !v)}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.5,
            py: 0.875,
            flexShrink: 0,
            cursor: "pointer",
            "&:hover": { opacity: 0.75 },
            transition: "all 0.2s ease",
          }}
        >
          <CalendarIcon
            size={14}
            color={
              hasDate
                ? theme.palette.primary.main
                : theme.palette.text.secondary
            }
          />
          <Typography
            variant="body2"
            fontWeight={hasDate ? 600 : 400}
            color={hasDate ? "text.primary" : "text.secondary"}
            sx={{ whiteSpace: "nowrap" }}
          >
            {open ? "Close" : dateLabel}
          </Typography>
        </Box>
        )}

      </Box>
    </Box>
  );
};

export default StaysTopBar;
