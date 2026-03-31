"use client";

import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Popover,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  AddOutlined,
  CheckCircleOutlined,
  PeopleAltOutlined,
  RemoveOutlined,
  WhatsApp,
} from "@mui/icons-material";
import {propertiesService, bookingService} from "@/app/@services/";
import GuestDetailsModal, { type GuestDetails } from "./GuestDetailsModal";
import { useRazorpay }  from "@/hooks/useRazorpay";
import { useRouter }    from "next/navigation";
import type { BookingQuoteDTO, UnitGroupDTO } from "@/app/@types";
import { BookingType } from "@/app/@types";

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────

interface FormValues {
  checkIn:  Dayjs | null;
  checkOut: Dayjs | null;
  adults:   number;
  children: number;
  infants:  number;
}

interface BookingWidgetProps {
  propertyId:       string;
  propertyName:     string;
  unitGroups:       UnitGroupDTO[];
  bookingType:      BookingType;
  userId?:          string;
  defaultCheckIn?:  string;
  defaultCheckOut?: string;
}

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(n);

function getCheckinRate(checkIn: Dayjs, group: UnitGroupDTO) {
  if (group.seasonal_rate) {
    const s = dayjs(group.seasonal_rate.start_date);
    const e = dayjs(group.seasonal_rate.end_date);
    if (!checkIn.isBefore(s, "day") && !checkIn.isAfter(e, "day"))
      return { price: group.seasonal_rate.price_per_night, label: group.seasonal_rate.label, type: "seasonal" as const };
  }
  if (!group.pricing) return null;
  const isWeekend = [0, 5, 6].includes(checkIn.day());
  return isWeekend
    ? { price: group.pricing.weekend_price, label: "Weekend rate", type: "weekend"  as const }
    : { price: group.pricing.weekday_price, label: "Weekday rate", type: "weekday"  as const };
}

// ─────────────────────────────────────────────────────────────────
// GuestRow — stable sub-component, no closure bugs
// ─────────────────────────────────────────────────────────────────

const GuestRow: FC<{
  label: string; sub: string;
  value: number; min: number; max: number;
  onChange: (v: number) => void;
}> = ({ label, sub, value, min, max, onChange }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1.25 }}>
    <Box>
      <Typography variant="body2" fontWeight={600}>{label}</Typography>
      <Typography variant="caption" color="text.secondary">{sub}</Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton size="small" disabled={value <= min} onClick={() => onChange(value - 1)}
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, width: 28, height: 28 }}>
        <RemoveOutlined sx={{ fontSize: 14 }} />
      </IconButton>
      <Typography fontWeight={700} sx={{ minWidth: 20, textAlign: "center" }}>{value}</Typography>
      <IconButton size="small" disabled={value >= max} onClick={() => onChange(value + 1)}
        sx={{
          border: "1px solid",
          borderColor: value < max ? "primary.main" : "divider",
          borderRadius: 1, width: 28, height: 28,
          bgcolor: value < max ? "primary.main" : "transparent",
          color:   value < max ? "#fff" : "text.disabled",
          "&:hover": { bgcolor: value < max ? "primary.dark" : "transparent" },
        }}>
        <AddOutlined sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  </Box>
);

// ─────────────────────────────────────────────────────────────────
// BookingWidget
// ─────────────────────────────────────────────────────────────────

const BookingWidget: FC<BookingWidgetProps> = ({
  propertyId,
  propertyName,
  unitGroups,
  bookingType,
  userId = "",
  defaultCheckIn,
  defaultCheckOut,
}) => {
  const theme          = useTheme();
  const router         = useRouter();
  const { openCheckout } = useRazorpay();
  const isDirect         = bookingType === BookingType.DIRECT;

  // unit
  const [selectedIdx, setSelectedIdx] = useState(0);
  const group       = unitGroups[selectedIdx];
  const hasPricing  = isDirect && !!group?.pricing;
  const isVilla     = group?.unit_type === "VILLA";
  const maxRooms    = group?.available_count ?? 1;
  const maxCapacity = group?.display_unit.max_capacity ?? 99;

  // room count (non-villa)
  const [roomCount, setRoomCount] = useState(1);
  const units = isVilla ? 1 : roomCount;

  // quote
  const [quote,        setQuote]        = useState<BookingQuoteDTO | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError,   setQuoteError]   = useState<string | null>(null);

  // ui
  const [guestAnchor,  setGuestAnchor]  = useState<HTMLElement | null>(null);
  const [modalOpen,    setModalOpen]    = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError,   setModalError]   = useState<string | null>(null);

  // form
  const { control, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      checkIn:  defaultCheckIn  ? dayjs(defaultCheckIn)  : null,
      checkOut: defaultCheckOut ? dayjs(defaultCheckOut)
              : defaultCheckIn  ? dayjs(defaultCheckIn).add(1, "day") : null,
      adults:   2,
      children: 0,
      infants:  0,
    },
  });

  const checkIn  = useWatch({ control, name: "checkIn" });
  const checkOut = useWatch({ control, name: "checkOut" });
  const adults   = useWatch({ control, name: "adults" });
  const children = useWatch({ control, name: "children" });
  const infants  = useWatch({ control, name: "infants" });

  const nights   = checkIn && checkOut ? checkOut.diff(checkIn, "day") : 0;
  const totalPax = adults + children;

  const checkinRate = checkIn && group && hasPricing
    ? getCheckinRate(checkIn, group) : null;

  // ── Auto-fetch quote on any input change (500ms debounce) ───
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // fetchQuote reads adults/children from ref to avoid stale closure
  // without making them part of the debounce dependency
  const adultsRef   = useRef(adults);
  const childrenRef = useRef(children);
  adultsRef.current   = adults;
  childrenRef.current = children;

  const fetchQuote = useCallback(async () => {
    if (!group?.display_unit || !checkIn || !checkOut || nights < 1 || !hasPricing) {
      setQuote(null);
      return;
    }
    setQuoteLoading(true);
    setQuoteError(null);
    try {
      const result = await propertiesService.getBookingQuote({
        unitId:   group.display_unit.unit_id,
        checkIn:  checkIn.format("YYYY-MM-DD"),
        checkOut: checkOut.format("YYYY-MM-DD"),
        adults:   adultsRef.current,
        children: childrenRef.current,
        hasPet:   false,
      });
      setQuote(result);
    } catch {
      setQuoteError("Unable to fetch pricing. Please try again.");
      setQuote(null);
    } finally {
      setQuoteLoading(false);
    }
  }, [group, checkIn, checkOut, nights, hasPricing]); // adults/children excluded — read via ref

  // Debounced fetch on date change only
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fetchQuote, 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [fetchQuote]);

  // reset on unit change
  const handleSelectUnit = (idx: number) => {
    setSelectedIdx(idx);
    setQuote(null);
    setQuoteError(null);
    setRoomCount(1);
  };

  // whatsapp enquiry
  const handleWhatsApp = () => {
    const unit    = group?.display_unit.title ?? group?.type_label ?? "";
    const rooms   = !isVilla && roomCount > 1 ? ` (${roomCount} units)` : "";
    const guests  = `${adults} adults${children > 0 ? `, ${children} children` : ""}${infants > 0 ? `, ${infants} infants` : ""}`;
    const dates   = checkIn && checkOut && nights > 0
      ? `\n\nCheck-in: ${checkIn.format("DD MMM YYYY")}\nCheck-out: ${checkOut.format("DD MMM YYYY")}\nGuests: ${guests}`
      : "";
    window.open(
      `https://wa.me/9594377736?text=${encodeURIComponent(`Hi! I'd like to enquire about *${propertyName}* — ${unit}${rooms}.${dates}`)}`,
      "_blank",
    );
  };

  // open modal
  const handleProceedToBook = () => {
    if (!quote || nights < 1) return;
    setModalError(null);
    setModalOpen(true);
  };

  // create booking → razorpay
  const handleGuestConfirm = async (guestDetails: GuestDetails) => {
    if (!group || !checkIn || !checkOut || !quote) return;
    setModalLoading(true);
    setModalError(null);
    try {
      const key          = `${group.display_unit.unit_id}-${checkIn.format("YYYY-MM-DD")}-${checkOut.format("YYYY-MM-DD")}-${Date.now()}`;
      const totalPayable = quote.total * units;

      const booking = await bookingService.createBooking(
        {
          unitId:     group.display_unit.unit_id,
          propertyId,
          checkIn:    checkIn.format("YYYY-MM-DD"),
          checkOut:   checkOut.format("YYYY-MM-DD"),
          amount:     totalPayable,
          userId,
          currency:   "INR",
          adultCount: adults,
          kidsCount:  children,
          petCount:   0,
        },
        key,
      );

      setModalOpen(false);

      openCheckout({
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount:      booking.amount,
        currency:    booking.currency,
        order_id:    booking.orderId,
        name:        "Villas by Serene",
        description: `${propertyName} — ${group.display_unit.title ?? group.type_label}`,
        image:       "/logo.png",
        prefill:     { name: guestDetails.name, email: guestDetails.email, contact: guestDetails.phone },
        notes:       { bookingId: booking.bookingId, specialRequests: guestDetails.specialRequests },
        theme:       { color: "#1B4332" },
        handler: async (response) => {
          try {
            await bookingService.verifyPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              bookingId:           booking.bookingId,
              guestName:    guestDetails.name,
              guestEmail:   guestDetails.email,
              guestPhone:   guestDetails.phone,
              propertyName,
              unitName:     group.display_unit.title ?? group.type_label ?? "",
              adults,
              children,
            });
            router.push(`/booking/confirmed/${booking.bookingId}`);
          } catch {
            setQuoteError("Payment verification failed. Please contact support.");
          }
        },
        modal: { ondismiss: () => setModalLoading(false) },
      });
    } catch (err: any) {
      setModalError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setModalLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────

  return (
    <Box sx={{ p: 2.5 }}>

      {/* ── 1. Unit selector ────────────────────────────────── */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Select accommodation
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {unitGroups.map((g, idx) => {
            const selected   = idx === selectedIdx;
            const rate       = isDirect && selected && checkinRate
              ? checkinRate.price
              : g.pricing?.weekday_price ?? null;
            const rateLabel  = isDirect && selected && checkinRate ? checkinRate : null;

            return (
              <Box key={g.unit_type}
                onClick={() => g.available_count > 0 && handleSelectUnit(idx)}
                sx={{
                  display: "flex", alignItems: "center", gap: 1.5, p: 1,
                  borderRadius: 2, border: "1.5px solid",
                  borderColor:  selected ? "primary.main" : "divider",
                  bgcolor:      selected
                    ? theme.palette.mode === "dark" ? "primary.900" : "primary.50"
                    : "background.paper",
                  cursor:    g.available_count === 0 ? "not-allowed" : "pointer",
                  opacity:   g.available_count === 0 ? 0.5 : 1,
                  transition: "all 0.15s",
                  boxShadow:  selected ? `0 0 0 3px ${theme.palette.primary.main}22` : "none",
                  "&:hover":  g.available_count > 0 ? { borderColor: "primary.main" } : {},
                }}
              >
                {g.display_unit.images[0]?.image?.image_url && (
                  <Box component="img"
                    src={g.display_unit.images[0].image.image_url}
                    alt={g.display_unit.title ?? g.type_label}
                    sx={{ width: 52, height: 52, borderRadius: 1.5, objectFit: "cover", flexShrink: 0 }}
                  />
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {g.display_unit.title ?? g.type_label}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
                    <Typography variant="caption" color={g.available_count > 0 ? "success.main" : "error.main"}>
                      {g.available_count > 0 ? `${g.available_count} available` : "Sold out"}
                    </Typography>
                    {selected && rateLabel && rateLabel.type === "seasonal" && (
                      <Chip label={rateLabel.label} size="small" color="warning" sx={{ height: 14, fontSize: 9 }} />
                    )}
                    {selected && rateLabel && rateLabel.type === "weekend" && (
                      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
                        · weekend
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                  {isDirect && rate !== null ? (
                    <>
                      <Typography variant="body1" fontWeight={800} color="primary" lineHeight={1.2}>
                        {formatINR(rate)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">/night</Typography>
                    </>
                  ) : (
                    <Typography variant="caption" color="text.secondary">Enquire</Typography>
                  )}
                </Box>
                {selected && <CheckCircleOutlined sx={{ color: "primary.main", fontSize: 18, flexShrink: 0 }} />}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── ENQUIRY notice ──────────────────────────────────── */}
      {!isDirect && (
        <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
          <Typography variant="body2" fontWeight={600}>Contact us for pricing</Typography>
          <Typography variant="caption" color="text.secondary">
            Fill in your dates and we'll get back to you with availability
          </Typography>
        </Box>
      )}

      {/* ── 2. Inputs ───────────────────────────────────────── */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>

        {/* Dates */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Controller name="checkIn" control={control} render={({ field }) => (
            <DatePicker label="Check-in" value={field.value} format="DD/MM/YYYY" disablePast
              onChange={(val) => {
                field.onChange(val);
                const co = getValues("checkOut");
                if (val && co && !val.isBefore(co)) setValue("checkOut", val.add(1, "day"));
              }}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          )} />
          <Controller name="checkOut" control={control} render={({ field }) => (
            <DatePicker label="Check-out" value={field.value} format="DD/MM/YYYY" disablePast
              minDate={checkIn ? checkIn.add(1, "day") : dayjs().add(1, "day")}
              onChange={(val) => field.onChange(val)}
              slotProps={{ textField: { fullWidth: true, size: "small" } }}
            />
          )} />
        </Box>

        {/* Guest trigger */}
        <TextField size="small" fullWidth label="Guests"
          value={`${totalPax} guest${totalPax !== 1 ? "s" : ""}${infants > 0 ? `, ${infants} infant${infants !== 1 ? "s" : ""}` : ""}`}
          onClick={(e) => setGuestAnchor(e.currentTarget)}
          slotProps={{
            input: {
              readOnly: true,
              style:    { cursor: "pointer" },
              startAdornment: <PeopleAltOutlined sx={{ mr: 0.5, color: "text.secondary", fontSize: 16 }} />,
            },
          }}
        />

        {/* Guest popover */}
        <Popover open={Boolean(guestAnchor)} anchorEl={guestAnchor}
          onClose={() => setGuestAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          slotProps={{ paper: { sx: { width: 280, p: 2, borderRadius: 2 } } }}
        >
          <GuestRow label="Adults"   sub="Age 13+"
            value={adults}   min={1} max={maxCapacity - children}
            onChange={(v) => setValue("adults", v)} />
          <Divider />
          <GuestRow label="Children" sub="Age 2–12"
            value={children} min={0} max={Math.max(0, maxCapacity - adults)}
            onChange={(v) => setValue("children", v)} />
          <Divider />
          <GuestRow label="Infants"  sub="Under 2 · Free · Don't count toward capacity"
            value={infants}  min={0} max={maxCapacity}
            onChange={(v) => setValue("infants", v)} />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
            Max {maxCapacity} guests (adults + children)
          </Typography>
          <Button fullWidth variant="contained" size="small"
            onClick={() => {
              setGuestAnchor(null);
              fetchQuote(); // fetch with latest guest counts
            }}
            sx={{ mt: 1.5, borderRadius: 1.5 }}>
            Done
          </Button>
        </Popover>

        {/* Room count — non-villa only */}
        {!isVilla && (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1.5, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
            <Box>
              <Typography variant="body2" fontWeight={500}>No. of {group?.type_label ?? "Room"}s</Typography>
              <Typography variant="caption" color="text.secondary">{maxRooms} available</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton size="small" disabled={roomCount <= 1} onClick={() => setRoomCount((c) => c - 1)}
                sx={{ border: "1px solid", borderColor: "divider", borderRadius: 1, width: 28, height: 28 }}>
                <RemoveOutlined sx={{ fontSize: 14 }} />
              </IconButton>
              <Typography fontWeight={700} sx={{ minWidth: 20, textAlign: "center" }}>{roomCount}</Typography>
              <IconButton size="small" disabled={roomCount >= maxRooms} onClick={() => setRoomCount((c) => c + 1)}
                sx={{
                  border: "1px solid",
                  borderColor: roomCount < maxRooms ? "primary.main" : "divider",
                  borderRadius: 1, width: 28, height: 28,
                  bgcolor: roomCount < maxRooms ? "primary.main" : "transparent",
                  color:   roomCount < maxRooms ? "#fff" : "text.disabled",
                  "&:hover": { bgcolor: roomCount < maxRooms ? "primary.dark" : "transparent" },
                }}>
                <AddOutlined sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          </Box>
        )}

        {/* ── 3. Billing summary ───────────────────────────── */}
        {hasPricing && (
          <Box sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
            <Box sx={{ px: 1.5, py: 1, bgcolor: "action.hover" }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Price summary
              </Typography>
            </Box>
            <Box sx={{ px: 1.5, py: 1.25, display: "flex", flexDirection: "column", gap: 0.75 }}>
              {quoteLoading ? (
                <>
                  <Skeleton variant="text" width="70%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="text" width="40%" height={20} />
                </>
              ) : quoteError ? (
                <Typography variant="caption" color="error">{quoteError}</Typography>
              ) : quote && nights > 0 ? (
                <>
                  {/* Stay charges (subtotal = nightly + min guest, all baked in) */}
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">Stay charges</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {formatINR((quote.subtotal + quote.extra_guest_charge + quote.child_charge) * units)}
                    </Typography>
                  </Box>

                  {/* Convenience fee */}
                  {quote.cleaning_fee > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">Convenience fee</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatINR(quote.cleaning_fee * units)}
                      </Typography>
                    </Box>
                  )}

                  {/* GST */}
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                      GST ({quote.tax_percent}%)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {quote.tax_percent === 0 ? "Nil" : formatINR(quote.tax_amount)}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 0.25 }} />

                  {/* Total */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" fontWeight={700}>Total payable now</Typography>
                    <Typography variant="body1" fontWeight={800} color="primary">
                      {formatINR(quote.total * units)}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box sx={{ py: 0.25 }}>
                  <Typography variant="body2" color="text.secondary">
                    Select dates to see price
                  </Typography>
                  {group?.pricing && (
                    <Typography variant="caption" color="text.secondary">
                      From {formatINR(group.pricing.weekday_price)}/night
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Security deposit note */}
        {hasPricing && group?.pricing && (
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
            💡 Security deposit ₹{Number(group.pricing.security_deposit).toLocaleString("en-IN")} payable at property · fully refundable
          </Typography>
        )}

        {/* CTA */}
        {hasPricing && (
          <Button variant="contained" fullWidth size="large"
            onClick={handleProceedToBook}
            disabled={!quote || nights < 1 || quoteLoading}
            sx={{ borderRadius: 2, fontWeight: 700, py: 1.25 }}
          >
            {quoteLoading
              ? <CircularProgress size={20} color="inherit" />
              : nights > 0 ? "Proceed to Book" : "Select Dates to Continue"
            }
          </Button>
        )}

        <Button
          variant={hasPricing ? "outlined" : "contained"}
          fullWidth size="large"
          onClick={handleWhatsApp}
          startIcon={<WhatsApp />}
          sx={!hasPricing
            ? { borderRadius: 2, fontWeight: 700, py: 1.25, bgcolor: "#25D366", "&:hover": { bgcolor: "#1ebe5d" }, color: "#fff", border: "none" }
            : { borderRadius: 2, fontWeight: 600, py: 1 }
          }
        >
          {hasPricing ? "Enquire on WhatsApp" : "Send Enquiry on WhatsApp"}
        </Button>
      </Box>

      {/* ── Modal ───────────────────────────────────────────── */}
      {quote && checkIn && checkOut && (
        <GuestDetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          loading={modalLoading}
          error={modalError}
          onConfirm={handleGuestConfirm}
          quote={quote}
          units={units}
          summary={{
            propertyName,
            unitName:  group?.display_unit.title ?? group?.type_label ?? "",
            checkIn:   checkIn.format("YYYY-MM-DD"),
            checkOut:  checkOut.format("YYYY-MM-DD"),
            nights,
            adults,
            children,
            infants,
            securityDeposit: group?.pricing?.security_deposit ?? 0,
          }}
        />
      )}
    </Box>
  );
};

export default BookingWidget;
