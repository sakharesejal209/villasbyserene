"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  CloseOutlined,
  ExpandMoreOutlined,
  LockOutlined,
} from "@mui/icons-material";
import { formatINR } from "./BookingWidget";
import type { BookingQuoteDTO } from "@/app/@types/";
import { useAuth } from "@/hooks/useAuth";

export interface GuestDetails {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface BookingSummary {
  propertyName: string;
  unitName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  infants: number;
  securityDeposit: number;
  returnUrl?: string;
}

interface GuestDetailsModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  error: string | null;
  onConfirm: (details: GuestDetails) => Promise<void>;
  quote: BookingQuoteDTO;
  units: number;
  summary: BookingSummary;
}

const GuestDetailsModal: FC<GuestDetailsModalProps> = ({
  open,
  onClose,
  loading,
  error,
  onConfirm,
  quote,
  units,
  summary,
}) => {
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const { user, loading: authLoading, login } = useAuth();

  const {
    control,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useForm<GuestDetails>({
    defaultValues: { name: "", email: "", phone: "", specialRequests: "" },
  });

  // Pre-fill form when user is available
  useEffect(() => {
    if (user) {
      if (user.full_name) setFormValue("name", user.full_name);
      if (user.email) setFormValue("email", user.email);
    }
  }, [user, setFormValue]);

  const handleFormSubmit = useCallback(
    async (details: GuestDetails) => {
      await onConfirm(details);
    },
    [onConfirm],
  );

  const handleLoginClick = () => {
    login(
      summary.returnUrl ?? window.location.pathname + window.location.search,
    );
  };

  const nights = dayjs(summary.checkOut).diff(dayjs(summary.checkIn), "day");
  const totalPayable = quote.total * units;
  const convenienceFee = quote.cleaning_fee * units;

  const breakdownRows = [
    {
      label: `${quote.min_occupancy} Guest${quote.min_occupancy === 1 ? "" : "s"}`,
      amount: quote.subtotal * units,
      show: true,
    },
    {
      label: `${quote.extra_adult_count} Extra Adult${quote.extra_adult_count === 1 ? "" : "s"}`,
      amount: quote.extra_guest_charge,
      show: quote.extra_guest_charge > 0,
    },
    {
      label: `${quote.extra_child_count} Extra Child${quote.extra_child_count === 1 ? "" : "ren"}`,
      amount: quote.child_charge,
      show: quote.child_charge > 0,
    },
    {
      label: "Property charges",
      amount: quote.commission_amount * units,
      show: quote.commission_amount > 0,
    },
    {
      label: "GST on property charges",
      amount: quote.commission_gst * units,
      show: quote.commission_gst > 0,
    },
    {
      label: "Convenience fee",
      amount: convenienceFee,
      show: convenienceFee > 0,
    },
  ].filter((r) => r.show);

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: { sx: { borderRadius: 2, backgroundImage: "none" } },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            Complete your booking
          </Typography>
          {!loading && (
            <IconButton size="small" onClick={onClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          )}
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        {/* ── Stay summary card ──────────────────────────── */}
        <Box
          sx={{
            p: 1.5,
            mb: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "action.hover",
          }}
        >
          <Typography variant="subtitle2" fontWeight={700}>
            {summary.propertyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {summary.unitName}
            {units > 1 && ` × ${units}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {dayjs(summary.checkIn).format("DD MMM YYYY")} →{" "}
            {dayjs(summary.checkOut).format("DD MMM YYYY")}
            {" · "}
            {nights} night{nights === 1 ? "" : "s"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {summary.adults} adult{summary.adults === 1 ? "" : "s"}
            {summary.children > 0 &&
              `, ${summary.children} child${summary.children === 1 ? "" : "ren"}`}
            {summary.infants > 0 &&
              `, ${summary.infants} infant${summary.infants === 1 ? "" : "s"}`}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" fontWeight={700}>
              Total payable now
            </Typography>
            <Typography variant="h6" fontWeight={800} color="primary">
              {formatINR(totalPayable)}
            </Typography>
          </Box>

          <Button
            size="small"
            endIcon={
              <ExpandMoreOutlined
                sx={{
                  fontSize: 16,
                  transition: "transform 0.2s",
                  transform: breakdownOpen ? "rotate(180deg)" : "none",
                }}
              />
            }
            onClick={() => setBreakdownOpen((v) => !v)}
            sx={{
              mt: 0.5,
              px: 0,
              color: "text.secondary",
              fontSize: 12,
              textTransform: "none",
              minWidth: "auto",
            }}
          >
            {breakdownOpen ? "Hide" : "View"} price breakdown
          </Button>

          <Collapse in={breakdownOpen}>
            <Box
              sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}
            >
              <Typography variant="caption" fontWeight={600}>
                Rental cost for {nights} night{nights === 1 ? "" : "s"}
              </Typography>
              {breakdownRows.map((row) => (
                <Box
                  key={row.label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight={400}
                    color="text.primary"
                  >
                    {row.label}
                  </Typography>
                  <Typography variant="caption" fontWeight={500}>
                    {formatINR(row.amount)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 0.5 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption" fontWeight={700}>
                  Total
                </Typography>
                <Typography variant="caption" fontWeight={700} color="primary">
                  {formatINR(totalPayable)}
                </Typography>
              </Box>
              {summary.securityDeposit > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 0.25,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Security deposit (refundable)
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatINR(summary.securityDeposit)} · at property
                  </Typography>
                </Box>
              )}
            </Box>
          </Collapse>
        </Box>

        {/* ── Guest details form ──────────────────────────── */}
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
          Guest details
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full name"
                size="small"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  size="small"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Valid 10-digit number",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  type="tel"
                  size="small"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  slotProps={{ input: { inputProps: { maxLength: 10 } } }}
                />
              )}
            />
          </Box>
          <Controller
            name="specialRequests"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Special requests (optional)"
                size="small"
                fullWidth
                multiline
                rows={2}
                placeholder="Early check-in, dietary requirements, celebrations..."
              />
            )}
          />

          {error && (
            <Alert severity="error" sx={{ py: 0.5 }}>
              {error}
            </Alert>
          )}

          {/* ── Auth gate ──────────────────────────────────── */}
          {!authLoading && !user ? (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 0.5 }}
            >
              <Alert severity="info" sx={{ py: 0.5 }}>
                Please log in to complete your booking
              </Alert>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={handleLoginClick}
                startIcon={
                  <Box
                    component="img"
                    src="https://www.google.com/favicon.ico"
                    sx={{ width: 16, height: 16 }}
                  />
                }
                sx={{
                  borderRadius: 2,
                  fontWeight: 700,
                  py: 1.25,
                  bgcolor: "background.paper",
                }}
              >
                Continue with Google
              </Button>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Your booking details will be saved after login
              </Typography>
            </Box>
          ) : (
            <>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading || authLoading}
                startIcon={
                  loading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <LockOutlined />
                  )
                }
                sx={{ borderRadius: 2, fontWeight: 700, py: 1.25, mt: 0.5 }}
              >
                {loading ? "Processing..." : `Pay ${formatINR(totalPayable)}`}
              </Button>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                You&apos;ll be redirected to Razorpay&apos;s secure payment page
              </Typography>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GuestDetailsModal;
