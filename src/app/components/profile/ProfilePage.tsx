"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  AccountCircleOutlined,
  CancelOutlined,
  CheckCircleOutlined,
  HouseOutlined,
  LockOutlined,
  NightShelterOutlined,
} from "@mui/icons-material";
import { useAuth } from "@/hooks/useAuth";
import { ProfileFormDTO, UserBookingDTO } from "@/app/@types/user";
import { bookingService, userSevice } from "@/app/@services";

const StatusChip: FC<{ status: string }> = ({ status }) => {
  const map: Record<
    string,
    { label: string; color: "success" | "warning" | "error" | "default" }
  > = {
    CONFIRMED: { label: "Confirmed", color: "success" },
    PENDING: { label: "Pending", color: "warning" },
    CANCELLED: { label: "Cancelled", color: "error" },
    FAILED: { label: "Failed", color: "error" },
  };
  const cfg = map[status] ?? { label: status, color: "default" };
  return (
    <Chip
      label={cfg.label}
      color={cfg.color}
      size="small"
      sx={{ fontWeight: 700 }}
    />
  );
};

// ── Booking card ──────────────────────────────────────────────────

const BookingCard: FC<{
  booking: UserBookingDTO;
  onCancel: (booking: UserBookingDTO) => void;
}> = ({ booking, onCancel }) => {
  const nights = dayjs(booking.checkOutDate).diff(
    dayjs(booking.checkInDate),
    "day",
  );

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "action.hover",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={700}>
            {booking.property?.name ?? "Property"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {booking.property?.area}, {booking.property?.state}
          </Typography>
        </Box>
        <StatusChip status={booking.status} />
      </Box>

      <Box sx={{ p: 2.5 }}>
        {/* Dates grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                display: "block",
                mb: 0.25,
              }}
            >
              Check-in
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {dayjs(booking.checkInDate).format("ddd, DD MMM YYYY")}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                display: "block",
                mb: 0.25,
              }}
            >
              Check-out
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {dayjs(booking.checkOutDate).format("ddd, DD MMM YYYY")}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                display: "block",
                mb: 0.25,
              }}
            >
              Duration
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {nights} night{nights !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Amount + unit + cancel */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box>
            {booking.unit && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.25 }}
              >
                {booking.unit.title}
              </Typography>
            )}
            <Typography variant="h6" fontWeight={800} color="primary">
              ₹{booking.amount.toLocaleString("en-IN")}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total paid · Booking #{booking.id.slice(0, 8).toUpperCase()}
            </Typography>
          </Box>

          {booking.cancellation.canCancel && booking.status !== "CANCELLED" && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<CancelOutlined />}
              onClick={() => onCancel(booking)}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Cancel Booking
            </Button>
          )}
        </Box>

        {/* Refund preview for upcoming confirmed */}
        {booking.status === "CONFIRMED" &&
          booking.cancellation.daysToCheckin > 0 && (
            <Alert
              severity={
                booking.cancellation.refundPercent > 0 ? "info" : "warning"
              }
              sx={{ mt: 2, py: 0.5 }}
            >
              {booking.cancellation.refundPercent > 0
                ? `If cancelled now: ${booking.cancellation.refundPercent}% refund (₹${booking.cancellation.refundAmount.toLocaleString("en-IN")})`
                : "Cancellation now: No refund as per policy"}
            </Alert>
          )}
      </Box>
    </Paper>
  );
};

// ── Main ──────────────────────────────────────────────────────────

const ProfilePage: FC = () => {
  const router = useRouter();
  const { user, loading: authLoading, login } = useAuth();
  const [tab, setTab] = useState(0);
  const [bookings, setBookings] = useState<UserBookingDTO[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [tripsError, setTripsError] = useState<string | null>(null);
  const [cancelTarget, setCancelTarget] = useState<UserBookingDTO | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelResult, setCancelResult] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormDTO>({ defaultValues: { full_name: "", phone: "" } });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) login(globalThis.location.pathname);
  }, [authLoading, login, user]);

  // Pre-fill form
  useEffect(() => {
    if (user)
      reset({ full_name: user.full_name ?? "", phone: user.phone ?? "" });
  }, [user, reset]);

  // Fetch bookings
  useEffect(() => {
    if (!user) return;
    setLoadingTrips(true);
    bookingService
      .getUserBookings()
      .then(setBookings)
      .catch(() => setTripsError("Failed to load your trips."))
      .finally(() => setLoadingTrips(false));
  }, [user]);

  // Cancel booking
  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      const res = await bookingService.cancelBooking(cancelTarget.id);
      setCancelResult(res.message);
      // Update local state
      setBookings((prev) =>
        prev.map((b) =>
          b.id === cancelTarget.id ? { ...b, status: "CANCELLED" } : b,
        ),
      );
    } catch (err: any) {
      setCancelResult(
        err?.response?.data?.message ??
          "Cancellation failed. Please try again.",
      );
    } finally {
      setCancelling(false);
      setCancelTarget(null);
    }
  };

  // Save profile
  const handleSaveProfile = async (data: ProfileFormDTO) => {
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);
    try {
      await userSevice.updateUser(data).then(() => {
        setSaveSuccess(true);
      });
    } catch {
      setSaveError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const upcoming = (bookings ?? []).filter(
    (b) => b.status === "CONFIRMED" && dayjs(b.checkInDate).isAfter(dayjs()),
  );
  const pastBookings = (bookings ?? []).filter(
    (b) => b.status === "CONFIRMED" && !dayjs(b.checkInDate).isAfter(dayjs()),
  );
  const cancelledBookings = (bookings ?? []).filter(
    (b) => b.status === "CANCELLED",
  );

  if (authLoading)
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
        <Skeleton variant="circular" width={64} height={64} sx={{ mb: 2 }} />
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 1 }} />
        <Skeleton variant="rounded" height={200} />
      </Box>
    );

  if (!user) return null;

  return (
    <section>
      <div className="container">
        {/* Profile header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
            marginY: "50px",
          }}
        >
          <Avatar
            src={user.profile_image ?? undefined}
            sx={{ width: 64, height: 64, fontSize: 28 }}
          >
            {user.full_name?.[0] ?? "?"}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={800}>
              {user.full_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
            },
          }}
        >
          <Tab
            label="My Trips"
            icon={<NightShelterOutlined sx={{ fontSize: 18 }} />}
            iconPosition="start"
            sx={{ fontWeight: 600, minHeight: 48 }}
          />
          <Tab
            label="Account"
            icon={<AccountCircleOutlined sx={{ fontSize: 18 }} />}
            iconPosition="start"
            sx={{ fontWeight: 600, minHeight: 48 }}
          />
        </Tabs>

        {/* ── My Trips ── */}
        {tab === 0 && (
          <Box>
            {cancelResult && (
              <Alert
                severity="success"
                sx={{ mb: 2 }}
                onClose={() => setCancelResult(null)}
              >
                {cancelResult}
              </Alert>
            )}

            {loadingTrips ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[1, 2].map((i) => (
                  <Skeleton key={i} variant="rounded" height={160} />
                ))}
              </Box>
            ) : tripsError ? (
              <Alert severity="error">{tripsError}</Alert>
            ) : bookings.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <HouseOutlined
                  sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
                />
                <Typography variant="h6" color="text.secondary">
                  No trips yet
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Your bookings will appear here
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => router.push("/stays/all")}
                >
                  Explore Properties
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Upcoming */}
                {upcoming.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{
                        textTransform: "uppercase",
                        mt: 1,
                      }}
                    >
                      Upcoming ({upcoming.length})
                    </Typography>
                    {upcoming.map((b) => (
                      <BookingCard
                        key={b.id}
                        booking={b}
                        onCancel={setCancelTarget}
                      />
                    ))}
                  </>
                )}

                {/* Past */}
                {pastBookings.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{
                        textTransform: "uppercase",
                        mt: 1,
                      }}
                    >
                      Past stays ({pastBookings.length})
                    </Typography>
                    {pastBookings.map((b) => (
                      <BookingCard
                        key={b.id}
                        booking={b}
                        onCancel={setCancelTarget}
                      />
                    ))}
                  </>
                )}

                {/* Cancelled */}
                {cancelledBookings.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{
                        textTransform: "uppercase",
                        mt: 1,
                      }}
                    >
                      Cancelled ({cancelledBookings.length})
                    </Typography>
                    {cancelledBookings.map((b) => (
                      <BookingCard
                        key={b.id}
                        booking={b}
                        onCancel={setCancelTarget}
                      />
                    ))}
                  </>
                )}
              </Box>
            )}
          </Box>
        )}

        {/* ── Account ── */}
        {tab === 1 && (
          <Box
            component="form"
            onSubmit={handleSubmit(handleSaveProfile)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              // maxWidth: 480,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              Personal Details
            </Typography>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="full_name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full name"
                    fullWidth
                    error={!!errors.full_name}
                    helperText={errors.full_name?.message}
                  />
                )}
              />

              <TextField
                label="Email"
                value={user.email ?? ""}
                fullWidth
                disabled
                helperText="Email cannot be changed"
              />

              <Controller
                name="phone"
                control={control}
                rules={{
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Valid 10-digit number required",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone number"
                    fullWidth
                    placeholder="10-digit mobile number"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    slotProps={{ input: { inputProps: { maxLength: 10 } } }}
                  />
                )}
              />
            </div>

            {saveSuccess && (
              <Alert severity="success" icon={<CheckCircleOutlined />}>
                Profile updated successfully
              </Alert>
            )}
            {saveError && <Alert severity="error">{saveError}</Alert>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={saving}
              startIcon={
                saving ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <LockOutlined />
                )
              }
              sx={{
                alignSelf: "flex-end",
                px: 4,
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>

            <Divider sx={{ my: 1 }} />

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Signed in with Google
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  component="img"
                  src="https://www.google.com/favicon.ico"
                  sx={{ width: 16, height: 16 }}
                />
                <Typography variant="body2">{user.email}</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* ── Cancel confirmation dialog ── */}
        <Dialog
          open={Boolean(cancelTarget)}
          onClose={() => !cancelling && setCancelTarget(null)}
          maxWidth="sm"
          fullWidth
          slotProps={{
            paper: { sx: { borderRadius: 2, backgroundImage: "none" } },
          }}
        >
          <DialogTitle>
            <Typography variant="h6" fontWeight={700}>
              Cancel Booking
            </Typography>
          </DialogTitle>
          <DialogContent>
            {cancelTarget && (
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Are you sure you want to cancel your stay at{" "}
                  <strong>{cancelTarget.property?.name}</strong>?
                </Typography>

                <Paper
                  elevation={0}
                  sx={{ p: 2, borderRadius: 2, bgcolor: "action.hover", mb: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Check-in
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {dayjs(cancelTarget.checkInDate).format("DD MMM YYYY")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Amount paid
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ₹{cancelTarget.amount.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" fontWeight={700}>
                      Refund amount
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={800}
                      color="primary"
                    >
                      ₹
                      {cancelTarget.cancellation.refundAmount.toLocaleString(
                        "en-IN",
                      )}{" "}
                      ({cancelTarget.cancellation.refundPercent}%)
                    </Typography>
                  </Box>
                </Paper>

                {cancelTarget.cancellation.refundPercent === 0 && (
                  <Alert severity="warning" sx={{ mb: 1 }}>
                    No refund applicable, cancellation is within 14 days of
                    check-in.
                  </Alert>
                )}

                <Typography variant="caption" color="text.secondary">
                  Refunds are processed within 5–7 business days to your
                  original payment method.
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
            <Button
              onClick={() => setCancelTarget(null)}
              disabled={cancelling}
              sx={{ borderRadius: 2 }}
            >
              Keep Booking
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmCancel}
              disabled={cancelling}
              startIcon={
                cancelling ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <CancelOutlined />
                )
              }
              sx={{ borderRadius: 2, fontWeight: 700 }}
            >
              {cancelling ? "Cancelling..." : "Yes, Cancel"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
};

export default ProfilePage;
