"use client";

import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import {
  CheckCircleOutlined,
  HomeOutlined,
  WhatsApp,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

// ── Types ─────────────────────────────────────────────────────────

interface BookingDetails {
  id: string;
  unitId: string;
  propertyId: string;
  checkInDate: string;
  checkOutDate: string;
  amount: number;
  status: string;
  currency: string;
  createdAt: string;
}

// ── Component ─────────────────────────────────────────────────────

const BookingConfirmed: FC<{ bookingId: string }> = ({ bookingId }) => {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/booking/${bookingId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Booking not found");
        const data = await res.json();
        setBooking(data);
      } catch {
        setError("Could not load booking details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  function formatINR(amount: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const handleWhatsApp = () => {
    const msg = booking
      ? `Hi! I've just completed a booking (ID: ${booking.id}). Check-in: ${dayjs(booking.checkInDate).format("DD MMM YYYY")}, Check-out: ${dayjs(booking.checkOutDate).format("DD MMM YYYY")}.`
      : `Hi! I've just completed a booking (ID: ${bookingId}).`;
    window.open(
      `https://wa.me/9594377736?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button variant="outlined" onClick={() => router.push("/")}>
          Go Home
        </Button>
      </Box>
    );
  }

  const nights = booking
    ? dayjs(booking.checkOutDate).diff(dayjs(booking.checkInDate), "day")
    : 0;

  return (
    <section>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          p: 2,
          marginTop: "30px"
        }}
      >
        <Paper
          sx={{
            maxWidth: 480,
            width: "100%",
             borderRadius: 0.2,
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          {/* Success header */}
          <Box
            sx={{
              bgcolor: "success.main",
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CheckCircleOutlined sx={{ fontSize: 56, color: "#fff" }} />
            <Typography variant="h5" fontWeight={800} color="#fff">
              Booking Confirmed!
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.85)", textAlign: "center" }}
            >
              Your reservation has been successfully placed.
            </Typography>
          </Box>

          {/* Booking details */}
          <Box sx={{ p: 3 }}>
            {/* Booking ID */}
            <Box
              sx={{
                p: 1.5,
                mb: 2,
                 borderRadius: 0.2,
                bgcolor: "action.hover",
                textAlign: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Booking ID
              </Typography>
              <Typography
                variant="body1"
                fontWeight={700}
                sx={{ fontFamily: "monospace", letterSpacing: 1 }}
              >
                {bookingId.slice(0, 8).toUpperCase()}
              </Typography>
            </Box>

            {booking && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Check-in
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {dayjs(booking.checkInDate).format("ddd, DD MMM YYYY")}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Check-out
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {dayjs(booking.checkOutDate).format("ddd, DD MMM YYYY")}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {nights} night{nights !== 1 ? "s" : ""}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={700}>
                    Amount paid
                  </Typography>
                  <Typography variant="h6" fontWeight={800} color="primary">
                    {formatINR(booking.amount)}
                  </Typography>
                </Box>
              </Box>
            )}

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "center", mt: 2, mb: 2.5 }}
            >
              A confirmation will be sent to your registered email. Our team
              will reach out on WhatsApp with property details.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<WhatsApp />}
                onClick={handleWhatsApp}
                sx={{
                   borderRadius: 0.2,
                  fontWeight: 700,
                  py: 1.25,
                  bgcolor: "#25D366",
                  "&:hover": { bgcolor: "#1ebe5d" },
                }}
              >
                Message us on WhatsApp
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<HomeOutlined />}
                onClick={() => router.push("/")}
                sx={{  borderRadius: 0.2, fontWeight: 600, py: 1.25 }}
              >
                Back to Home
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </section>
  );
};

export default BookingConfirmed;
