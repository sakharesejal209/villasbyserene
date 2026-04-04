"use client";

import { FC, useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  AccessTimeOutlined,
  ArrowBackOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  ExpandMoreOutlined,
  LockOutlined,
  WarningAmberOutlined,
  WhatsApp,
} from "@mui/icons-material";
import { useAuth } from "@/hooks/useAuth";
import { useRazorpay } from "@/hooks/useRazorpay";
import { formatINR } from "@/app/components/property/BookingWidget";
import { decryptCheckout } from "@/lib/crypto/checkout-crypto";
import { PropertyDetailDTO } from "@/app/@types";
import { BookingQuoteDTO } from "@/app/@types/booking/BookingQuoteDTO";
import {
  bookingService,
  httpService,
  propertiesService,
} from "@/app/@services";

interface GuestForm {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

type AvailabilityStatus = "checking" | "available" | "unavailable" | "error";

// ── Section accordion ─────────────────────────────────────────────

const Section: FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        mb: 2,
      }}
    >
      <Box
        onClick={() => setOpen((v) => !v)}
        sx={{
          px: 2.5,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        <ExpandMoreOutlined
          sx={{
            fontSize: 20,
            color: "text.secondary",
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "none",
          }}
        />
      </Box>
      <Collapse in={open}>
        <Box
          sx={{
            px: 2.5,
            py: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

// ── Price row ─────────────────────────────────────────────────────

const PriceRow: FC<{
  label: string;
  amount: number;
  bold?: boolean;
  large?: boolean;
}> = ({ label, amount, bold, large }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography
      variant={large ? "subtitle1" : "body2"}
      fontWeight={bold ? 700 : 400}
      color={bold ? "text.primary" : "text.secondary"}
    >
      {label}
    </Typography>
    <Typography
      variant={large ? "h6" : "body2"}
      fontWeight={bold ? 800 : 400}
      color={bold ? "primary.main" : "text.secondary"}
    >
      {formatINR(amount)}
    </Typography>
  </Box>
);

// ── Main ──────────────────────────────────────────────────────────

const BookingPage: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { openCheckout } = useRazorpay();
  const { user, loading: authLoading, login } = useAuth();

  // ── Decrypt booking state from URL param ─────────────────────
  // URL looks like /checkout?b=U2FsdGVkX1... (encrypted, shareable)
  const token = searchParams.get("b") ?? "";
  const stored = token ? decryptCheckout(token) : null;

  const propertyId = stored?.propertyId ?? "";
  const unitId = stored?.unitId ?? "";
  const checkIn = stored?.checkIn ?? "";
  const checkOut = stored?.checkOut ?? "";
  const adults = Number(stored?.adults ?? 2);
  const children = Number(stored?.children ?? 0);
  const infants = Number(stored?.infants ?? 0);
  const rooms = Number(stored?.rooms ?? 1);
  const nights = dayjs(checkOut).diff(dayjs(checkIn), "day");
  const units = rooms;
  const totalPax = adults + children;

  // ── State ─────────────────────────────────────────────────────
  const [property, setProperty] = useState<PropertyDetailDTO | null>(null);
  const [quote, setQuote] = useState<BookingQuoteDTO | null>(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [availability, setAvailability] =
    useState<AvailabilityStatus>("checking");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [houseRulesOpen, setHouseRulesOpen] = useState(false);

  // ── Check availability ────────────────────────────────────────
  const checkAvailability = async (
    currentUserId?: string,
  ): Promise<boolean> => {
    if (!unitId || !checkIn || !checkOut) return false;
    try {
      const userParam = currentUserId ? `&userId=${currentUserId}` : "";
      const res = await httpService<{ available: boolean }>().get(
        `/booking/check-availability/${unitId}?checkIn=${checkIn}&checkOut=${checkOut}${userParam}`,
      );
      setAvailability(res.available ? "available" : "unavailable");
      return res.available;
    } catch {
      setAvailability("error");
      return false;
    }
  };

  // ── Load page data ────────────────────────────────────────────
  useEffect(() => {
    if (!propertyId || !unitId || !checkIn || !checkOut) {
      router.replace("/");
      return;
    }

    Promise.all([
      propertiesService.getProperty(propertyId),
      propertiesService.getBookingQuote({
        unitId,
        checkIn,
        checkOut,
        adults,
        children,
        hasPet: false,
      }),
    ])
      .then(([prop, q]) => {
        setProperty(prop);
        setQuote(q);
      })
      .catch(() => setPayError("Failed to load booking details."))
      .finally(() => setLoadingPage(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check availability only after auth resolves — so we can pass userId
  // to exclude their own PENDING bookings from the conflict check
  useEffect(() => {
    if (authLoading) return; // wait for auth to resolve
    checkAvailability(user?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  // ── Form ──────────────────────────────────────────────────────
  const {
    control,
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useForm<GuestForm>({
    defaultValues: { name: "", email: "", phone: "", specialRequests: "" },
  });

  useEffect(() => {
    if (user) {
      if (user.full_name) setFormValue("name", user.full_name);
      if (user.email) setFormValue("email", user.email);
    }
  }, [user, setFormValue]);

  // ── Pay handler ───────────────────────────────────────────────
  const handlePay = async (formData: GuestForm) => {
    if (!quote) return;
    setPaying(true);
    setPayError(null);

    try {
      // ── Final availability check before Razorpay ──────────────
      const available = await checkAvailability(user?.id);
      if (!available) {
        setPayError(
          "Sorry — these dates are no longer available. Please go back and select new dates.",
        );
        setPaying(false);
        return;
      }

      const idempotencyKey = `${unitId}-${checkIn}-${checkOut}-${Date.now()}`;
      const totalPayable = quote.total * units;

      const booking = await bookingService.createBooking(
        {
          unitId,
          propertyId,
          checkIn,
          checkOut,
          amount: totalPayable,
          userId: user?.id ?? "",
          currency: "INR",
          adultCount: adults,
          kidsCount: children,
          petCount: 0,
        },
        idempotencyKey,
      );

      const unitGroup = property?.unit_groups.find(
        (g) => g.display_unit.unit_id === unitId,
      );
      const unitName =
        unitGroup?.display_unit.title ?? unitGroup?.type_label ?? "";

      openCheckout({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount: booking.amount,
        currency: booking.currency,
        order_id: booking.orderId,
        name: "Villas by Serene",
        description: `${property?.name ?? ""} — ${unitName}`,
        image: "/logo.png",
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          bookingId: booking.bookingId,
          specialRequests: formData.specialRequests,
        },
        theme: { color: "#1B4332" },
        handler: async (response) => {
          try {
            await bookingService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.bookingId,
              guestName: formData.name,
              guestEmail: formData.email,
              guestPhone: formData.phone,
              propertyName: property?.name ?? "",
              unitName,
              adults,
              children,
            });
            router.push(`/booking/confirmed/${booking.bookingId}`);
          } catch {
            setPayError("Payment verification failed. Please contact support.");
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => {
            setPaying(false);
            document.body.style.overflow = "";
            document.body.style.pointerEvents = "";
            const backdrop = document.querySelector(".razorpay-backdrop");
            if (backdrop) backdrop.remove();
          },
        },
      });
    } catch (err: any) {
      setPayError(
        err?.response?.data?.message ?? err.message ?? "Something went wrong.",
      );
      setPaying(false);
    }
  };

  // ── Loading ───────────────────────────────────────────────────
  if (loadingPage)
    return (
      <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 2, md: 4 }, py: 4 }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "1fr 380px" },
            gap: 3,
          }}
        >
          <Box>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rounded" height={80} sx={{ mb: 2 }} />
            ))}
          </Box>
          <Skeleton variant="rounded" height={420} />
        </Box>
      </Box>
    );

  const foodMenu = property?.food_menus?.[0];
  const houseRules = property?.house_rules ?? [];
  const totalPayable = quote ? quote.total * units : 0;

  // Selected unit details
  const selectedUnitGroup = property?.unit_groups?.find(
    (g) => g.display_unit.unit_id === unitId,
  );
  const unitImage =
    selectedUnitGroup?.display_unit.images?.find((img) => img.is_banner_image)
      ?.image?.image_url ??
    selectedUnitGroup?.display_unit.images?.[0]?.image?.image_url ??
    null;
  const unitTitle =
    selectedUnitGroup?.display_unit.title ??
    selectedUnitGroup?.type_label ??
    "";

  // ── Render ────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
      }}
    >
      {/* Back */}
      <Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => router.back()}
        sx={{ mb: 2.5, color: "text.secondary", fontWeight: 600 }}
      >
        Back to property
      </Button>

      {/* Availability banner */}
      {availability === "checking" && (
        <Alert
          severity="info"
          icon={<CircularProgress size={16} />}
          sx={{ mb: 2 }}
        >
          Checking availability...
        </Alert>
      )}
      {availability === "unavailable" && (
        <Alert severity="error" icon={<WarningAmberOutlined />} sx={{ mb: 2 }}>
          These dates are no longer available. Please go back and select
          different dates.
        </Alert>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 380px" },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* ── LEFT ──────────────────────────────────────────────── */}
        <Box sx={{ order: { xs: 2, md: 1 } }}>
          {/* Summary card with unit image */}
          <Paper
            elevation={0}
            sx={{
              mb: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            {/* Unit image */}
            {unitImage && (
              <Box
                component="img"
                src={unitImage}
                alt={unitTitle}
                sx={{
                  width: "100%",
                  height: { xs: 180, md: 240 },
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}

            <Box sx={{ p: 2.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 0.25,
                }}
              >
                <Typography variant="h5" fontWeight={800}>
                  {property?.name}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {property?.area}, {property?.state}
              </Typography>
              {unitTitle && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  {unitTitle}
                  {units > 1 ? ` × ${units}` : ""}
                </Typography>
              )}

              <Divider sx={{ mb: 2 }} />

              {/* Check-in / out */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
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
                      letterSpacing: 0.8,
                      display: "block",
                      mb: 0.25,
                    }}
                  >
                    Check-in
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    {dayjs(checkIn).format("ddd, DD MMM YYYY")}
                  </Typography>
                  {property?.checkin_time && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.25,
                      }}
                    >
                      <AccessTimeOutlined sx={{ fontSize: 13 }} />
                      From {property.checkin_time}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                      display: "block",
                      mb: 0.25,
                    }}
                  >
                    Check-out
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    {dayjs(checkOut).format("ddd, DD MMM YYYY")}
                  </Typography>
                  {property?.checkout_time && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.25,
                      }}
                    >
                      <AccessTimeOutlined sx={{ fontSize: 13 }} />
                      By {property.checkout_time}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Chips */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  size="small"
                  label={`${nights} night${nights !== 1 ? "s" : ""}`}
                />
                <Chip
                  size="small"
                  label={`${totalPax} guest${totalPax !== 1 ? "s" : ""}`}
                />
                {infants > 0 && (
                  <Chip
                    size="small"
                    label={`${infants} infant${infants !== 1 ? "s" : ""}`}
                  />
                )}
                {units > 1 && <Chip size="small" label={`${units} units`} />}
              </Box>
            </Box>
          </Paper>

          {/* Meals — flat card, no accordion */}
          {foodMenu && (
            <Paper
              elevation={0}
              sx={{
                mb: 2,
                p: 2.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
                Meals
              </Typography>
              {foodMenu.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  {foodMenu.description}
                </Typography>
              )}
              <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                {foodMenu.is_veg && (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "1.5px solid #11BF0E",
                        borderRadius: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor: "#11BF0E",
                        }}
                      />
                    </Box>
                    <Typography variant="body2">Veg</Typography>
                  </Box>
                )}
                {foodMenu.is_non_veg && (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        border: "1.5px solid #FA4B4B",
                        borderRadius: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          bgcolor: "#FA4B4B",
                        }}
                      />
                    </Box>
                    <Typography variant="body2">Non-Veg</Typography>
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 0.75,
                  mb: 1.5,
                }}
              >
                {foodMenu.breakfast_time && (
                  <Typography variant="body2" color="text.secondary">
                    🍳 Breakfast · {foodMenu.breakfast_time}
                  </Typography>
                )}
                {foodMenu.lunch_time && (
                  <Typography variant="body2" color="text.secondary">
                    🍽 Lunch · {foodMenu.lunch_time}
                  </Typography>
                )}
                {foodMenu.hightea_time && (
                  <Typography variant="body2" color="text.secondary">
                    ☕ High Tea · {foodMenu.hightea_time}
                  </Typography>
                )}
                {foodMenu.dinner_time && (
                  <Typography variant="body2" color="text.secondary">
                    🌙 Dinner · {foodMenu.dinner_time}
                  </Typography>
                )}
              </Box>
              {foodMenu.menu_url && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => window.open(foodMenu.menu_url)}
                >
                  View Full Menu
                </Button>
              )}
            </Paper>
          )}

          {/* Cancellation Policy — with actual dates */}
          {(() => {
            const today = dayjs();
            const ci = dayjs(checkIn);
            const fullRefundBy = ci.subtract(21, "day");
            const halfRefundBy = ci.subtract(14, "day");
            const showFull = today.isBefore(fullRefundBy);
            const showHalf = today.isBefore(halfRefundBy);

            // Build only the dots still relevant
            const dots = [
              showFull && {
                color: "#1B4332",
                icon: (
                  <CheckCircleOutlined sx={{ fontSize: 18, color: "#fff" }} />
                ),
                label: "100% Refund",
                labelColor: "success.main",
                sub: `Cancel before
${fullRefundBy.format("DD MMM YYYY")}`,
              },
              showHalf && {
                color: "#ed6c02",
                icon: (
                  <Typography variant="caption" fontWeight={800} color="#fff">
                    50%
                  </Typography>
                ),
                label: "50% Refund",
                labelColor: "warning.main",
                sub: `Cancel before
${halfRefundBy.format("DD MMM YYYY")}`,
              },
              {
                color: "#d32f2f",
                icon: (
                  <WarningAmberOutlined sx={{ fontSize: 18, color: "#fff" }} />
                ),
                label: "No Refund",
                labelColor: "error.main",
                sub: `Cancel after
${halfRefundBy.format("DD MMM YYYY")}`,
              },
            ].filter(Boolean) as {
              color: string;
              icon: React.ReactNode;
              label: string;
              labelColor: string;
              sub: string;
            }[];

            return (
              <Paper
                elevation={0}
                sx={{
                  mb: 2,
                  p: 2.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                  Booking & Cancellation Policy
                </Typography>

                {/* Visual timeline — only shows dots still applicable */}
                <Box sx={{ position: "relative", mb: 2.5 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: "10%",
                      right: "10%",
                      height: 3,
                      background:
                        dots.length === 1
                          ? "#d32f2f"
                          : dots.length === 2
                            ? "linear-gradient(to right, #ed6c02 50%, #d32f2f 50%)"
                            : "linear-gradient(to right, #1B4332 40%, #ed6c02 40% 70%, #d32f2f 70%)",
                      zIndex: 0,
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      position: "relative",
                      zIndex: 1,
                      px: { xs: 0, sm: 2 },
                    }}
                  >
                    {dots.map((dot) => (
                      <Box
                        key={dot.label}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 0.75,
                          maxWidth: 110,
                        }}
                      >
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            bgcolor: dot.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {dot.icon}
                        </Box>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          color={dot.labelColor}
                          textAlign="center"
                        >
                          {dot.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          textAlign="center"
                          sx={{ fontSize: 10, whiteSpace: "pre-line" }}
                        >
                          {dot.sub}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ mb: 1.5 }} />

                {/* House rules button */}
                {houseRules.length > 0 && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setHouseRulesOpen(true)}
                    sx={{ mr: 1.5, mb: 1.5, borderRadius: 2, fontWeight: 600 }}
                  >
                    House Rules & Policy
                  </Button>
                )}

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  • Check-in:{" "}
                  <strong>{property?.checkin_time ?? "2:00 PM"}</strong> ·
                  Check-out:{" "}
                  <strong>{property?.checkout_time ?? "11:00 AM"}</strong>
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  • Cancellations 21+ days before check-in: 100% refund
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  • Cancellations 14–21 days before check-in: 50% refund
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  • Cancellations within 14 days of check-in: No refund · No
                  Show: No refund
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  • Early check-in and late check-out subject to availability at
                  additional charge.
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  • No Partial Payments are eligible for refund.
                </Typography>
              </Paper>
            );
          })()}

          {/* House Rules Modal */}
          <Dialog
            open={houseRulesOpen}
            onClose={() => setHouseRulesOpen(false)}
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
                  House Rules
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setHouseRulesOpen(false)}
                >
                  <CloseOutlined fontSize="small" />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <ul className="list-disc ml-5">
                {houseRules.map((rule) => (
                  <li key={rule.rule_id}>{rule.description}</li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>

          {/* Any issue section */}
          <Paper
            elevation={0}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 1.5,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Any issue to complete your booking?
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<WhatsApp sx={{ color: "#25D366" }} />}
              onClick={() =>
                window.open(
                  `https://wa.me/919594377736?text=${encodeURIComponent("Hi! I need help completing my booking.")}`,
                  "_blank",
                )
              }
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                flexShrink: 0,
                alignSelf: { xs: "stretch", sm: "auto" },
              }}
            >
              Chat with us
            </Button>
          </Paper>
        </Box>

        {/* ── RIGHT — sticky price + form ───────────────────────── */}
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            position: { md: "sticky" },
            top: { md: 16 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            {/* Price summary */}
            <Box sx={{ p: 2.5, bgcolor: "action.hover" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  display: "block",
                  mb: 1.5,
                }}
              >
                Price summary
              </Typography>

              {quote ? (
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}
                >
                  <PriceRow
                    label="Stay charges"
                    amount={quote.total_base * units}
                  />
                  {quote.commission_amount > 0 && (
                    <PriceRow
                      label="Property charges"
                      amount={quote.commission_amount * units}
                    />
                  )}
                  {quote.commission_gst > 0 && (
                    <PriceRow
                      label="GST on property charges"
                      amount={quote.commission_gst * units}
                    />
                  )}
                  {quote.cleaning_fee > 0 && (
                    <PriceRow
                      label="Convenience fee"
                      amount={quote.cleaning_fee * units}
                    />
                  )}

                  {/* Breakdown toggle — same style as GuestDetailsModal */}
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
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography variant="caption" fontWeight={600}>
                        Rental cost for {nights} night{nights === 1 ? "" : "s"}
                      </Typography>
                      {[
                        {
                          label: `Upto ${quote.min_occupancy} Guest${quote.min_occupancy === 1 ? "" : "s"}`,
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
                          amount: quote.cleaning_fee * units,
                          show: quote.cleaning_fee > 0,
                        },
                      ]
                        .filter((r) => r.show)
                        .map((row) => (
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="caption" fontWeight={700}>
                          Total
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          color="primary"
                        >
                          {formatINR(totalPayable)}
                        </Typography>
                      </Box>
                      {quote.security_deposit > 0 && (
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
                            {formatINR(quote.security_deposit)} · at property
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Collapse>

                  <Divider sx={{ my: 0.5 }} />
                  <PriceRow
                    label="Total payable now"
                    amount={totalPayable}
                    bold
                    large
                  />
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {[80, 60, 40].map((w) => (
                    <Skeleton key={w} variant="text" width={`${w}%`} />
                  ))}
                </Box>
              )}
            </Box>

            {/* Guest form */}
            <Box sx={{ p: 2.5 }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                Guest details
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit(handlePay)}
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

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 1,
                  }}
                >
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
                        message: "Valid 10-digit",
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

                {payError && (
                  <Alert severity="error" sx={{ py: 0.5 }}>
                    {payError}
                  </Alert>
                )}

                {/* Auth gate or Pay button */}
                {!authLoading && !user ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Alert severity="info" sx={{ py: 0.5 }}>
                      Please log in to complete your booking
                    </Alert>
                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      onClick={() =>
                        login(window.location.pathname + window.location.search)
                      }
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
                  </Box>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={
                      paying ||
                      authLoading ||
                      availability === "unavailable" ||
                      !quote
                    }
                    startIcon={
                      paying ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <LockOutlined />
                      )
                    }
                    sx={{ borderRadius: 2, fontWeight: 700, py: 1.5, mt: 0.5 }}
                  >
                    {paying
                      ? "Processing..."
                      : `Pay ${formatINR(totalPayable)}`}
                  </Button>
                )}

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  100% secure · powered by Razorpay
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingPage;
