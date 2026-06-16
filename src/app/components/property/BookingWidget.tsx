"use client";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  IoAdd as AddIcon,
  IoPeopleOutline as PeopleIcon,
  IoRemove as RemoveIcon,
  IoLogoWhatsapp as WhatsApp,
} from "react-icons/io5";

import { PiConfetti } from "react-icons/pi";
import { propertiesService, calendarService } from "@/app/@services/";
import { useRouter } from "next/navigation";
import { BookingQuoteDTO, BookingType, UnitGroupDTO } from "@/app/@types";
import { encryptCheckout } from "@/lib/crypto/checkout-crypto";

interface FormValues {
  checkIn: Dayjs | null;
  checkOut: Dayjs | null;
  adults: number;
  children: number;
  infants: number;
  petCount: number;
}

export interface WidgetState {
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  infants: number;
  nights: number;
  totalPrice: number | null;
}

interface BookingWidgetProps {
  propertyId: string;
  propertyName: string;
  unitGroups: UnitGroupDTO[];
  bookingType: BookingType;
  userId?: string;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  guests?: number;
  onStateChange?: (state: WidgetState) => void;
}

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

function getCheckinRate(checkIn: Dayjs, group: UnitGroupDTO) {
  if (group.seasonal_rate) {
    const s = dayjs(group.seasonal_rate.startDate);
    const e = dayjs(group.seasonal_rate.endDate);
    if (!checkIn.isBefore(s, "day") && !checkIn.isAfter(e, "day"))
      return {
        price: group.seasonal_rate.pricePerNight,
        label: group.seasonal_rate.label,
        type: "seasonal" as const,
      };
  }
  if (!group.pricing) return null;
  const isWeekend = [0, 5, 6].includes(checkIn.day());
  return isWeekend
    ? {
        price: group.pricing.weekend_price,
        label: "Weekend rate",
        type: "weekend" as const,
      }
    : {
        price: group.pricing.weekday_price,
        label: "Weekday rate",
        type: "weekday" as const,
      };
}

const GuestRow: FC<{
  label: string;
  sub: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}> = ({ label, sub, value, min, max, onChange }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 1.25,
    }}
  >
    <Box>
      <Typography variant="body2" fontWeight={600}>
        {label}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {sub}
      </Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton
        size="small"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 0.2,
          width: 28,
          height: 28,
        }}
      >
        <RemoveIcon fontSize={14} />
      </IconButton>
      <Typography fontWeight={700} sx={{ minWidth: 20, textAlign: "center" }}>
        {value}
      </Typography>
      <IconButton
        size="small"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        sx={{
          border: "1px solid",
          borderColor: value < max ? "primary.main" : "divider",
          borderRadius: 0.2,
          width: 28,
          height: 28,
          bgcolor: value < max ? "primary.main" : "transparent",
          color: value < max ? "#fff" : "text.disabled",
          "&:hover": { bgcolor: value < max ? "primary.dark" : "transparent" },
        }}
      >
        <AddIcon fontSize={14} />
      </IconButton>
    </Box>
  </Box>
);

const BookingWidget: FC<BookingWidgetProps> = ({
  propertyId,
  propertyName,
  unitGroups,
  bookingType,
  defaultCheckIn,
  defaultCheckOut,
  guests,
  onStateChange,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const isDirect = bookingType === BookingType.DIRECT;

  const [selectedIdx, setSelectedIdx] = useState(0);
  const group = unitGroups[selectedIdx];
  const hasPricing = isDirect && !!group?.pricing;
  const isVilla = group?.unit_type === "VILLA";
  const maxRooms = group?.available_count ?? 1;

  const [roomCount, setRoomCount] = useState(1);
  const units = isVilla ? 1 : roomCount;

  const baseCapacity = group?.display_unit.max_capacity ?? 99;
  const maxCapacity = isVilla ? baseCapacity : baseCapacity * roomCount;

  const [quote, setQuote] = useState<BookingQuoteDTO | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const [blockedRanges, setBlockedRanges] = useState<
    { start: string; end: string }[]
  >([]);
  const [blockedLoading, setBlockedLoading] = useState(false);

  const [guestAnchor, setGuestAnchor] = useState<HTMLElement | null>(null);

  const { control, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      checkIn: defaultCheckIn ? dayjs(defaultCheckIn) : null,
      checkOut: defaultCheckOut
        ? dayjs(defaultCheckOut)
        : defaultCheckIn
          ? dayjs(defaultCheckIn).add(1, "day")
          : null,
      adults: guests || 6,
      children: 0,
      infants: 0,
      petCount: 0,
    },
  });  

  const checkIn = useWatch({ control, name: "checkIn" });
  const checkOut = useWatch({ control, name: "checkOut" });
  const adults = useWatch({ control, name: "adults" });
  const children = useWatch({ control, name: "children" });
  const infants = useWatch({ control, name: "infants" });

  const nights = checkIn && checkOut ? checkOut.diff(checkIn, "day") : 0;
  const totalPax = +adults + +children;

  console.log('totalPax:', totalPax);


  const checkinRate =
    checkIn && group && hasPricing ? getCheckinRate(checkIn, group) : null;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const adultsRef = useRef(adults);
  const childrenRef = useRef(children);
  const unitsRef = useRef(units);
  adultsRef.current = adults;
  childrenRef.current = children;
  unitsRef.current = units;

  const petCount = useWatch({ control, name: "petCount" });
  const petCountRef = useRef(petCount);
  petCountRef.current = petCount;

  // Derived pet values — uses quote.max_pets once loaded, else unit data
  const maxPets = quote?.max_pets ?? 0;
  const isPetFriendly = maxPets > 0;

  const fetchQuote = useCallback(async () => {
    if (
      !group?.display_unit ||
      !checkIn ||
      !checkOut ||
      nights < 1 ||
      !hasPricing
    ) {
      setQuote(null);
      return;
    }
    setQuoteLoading(true);
    setQuoteError(null);
    try {
      const result = await propertiesService.getBookingQuote({
        unitId: group.display_unit.unit_id,
        checkIn: checkIn.format("YYYY-MM-DD"),
        checkOut: checkOut.format("YYYY-MM-DD"),
        adults: adultsRef.current,
        children: childrenRef.current,
        petCount: petCountRef.current,
        rooms: unitsRef.current,
      });
      setQuote(result);
    } catch {
      setQuoteError("Unable to fetch pricing. Please try again.");
      setQuote(null);
    } finally {
      setQuoteLoading(false);
    }
  }, [group, checkIn, checkOut, nights, hasPricing]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fetchQuote, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetchQuote]);

  useEffect(() => {
    onStateChange?.({
      checkIn: checkIn ? checkIn.format("YYYY-MM-DD") : null,
      checkOut: checkOut ? checkOut.format("YYYY-MM-DD") : null,
      adults,
      children,
      infants,
      nights,
      totalPrice: quote?.total ?? null, // backend already multiplies by rooms
    });
  }, [checkIn, checkOut, adults, children, infants, nights, quote, units, onStateChange]);

  useEffect(() => {
    const unitId = group?.display_unit?.unit_id;
    if (!unitId) return;
    setBlockedLoading(true);
    calendarService
      .getBlockedDates(unitId)
      .then((ranges) => setBlockedRanges(Array.isArray(ranges) ? ranges : []))
      .catch(() => setBlockedRanges([]))
      .finally(() => setBlockedLoading(false));
  }, [group?.display_unit?.unit_id, roomCount]);

  // Memoize parsed blocked ranges to avoid re-parsing on every render
  const parsedBlockedRanges = useMemo(
    () =>
      blockedRanges.map((r) => ({
        start: dayjs(r.start),
        end: dayjs(r.end).subtract(1, "day"),
      })),
    [blockedRanges],
  );

  const isCheckinBlocked = useCallback(
    (date: Dayjs): boolean =>
      parsedBlockedRanges.some(
        (r) => !date.isBefore(r.start, "day") && !date.isAfter(r.end, "day"),
      ),
    [parsedBlockedRanges],
  );

  // Checkout can land ON the first day of a blocked range (guest is leaving)
  // but cannot land inside one or after check-in on a blocked night
  const isCheckoutBlocked = useCallback(
    (date: Dayjs): boolean =>
      parsedBlockedRanges.some(
        (r) => date.isAfter(r.start, "day") && !date.isAfter(r.end, "day"),
      ),
    [parsedBlockedRanges],
  );

  // Detects if any blocked night exists between check-in and check-out
  const hasBlockedNightBetween = useCallback(
    (ci: Dayjs, co: Dayjs): boolean =>
      parsedBlockedRanges.some(
        (r) => ci.isBefore(r.end, "day") && co.isAfter(r.start, "day"),
      ),
    [parsedBlockedRanges],
  );
  const isSelectedUnitSoldOut =
    group?.available_count === 0 ||
    (!!checkIn && isCheckinBlocked(checkIn)) ||
    (!!checkIn && !!checkOut && hasBlockedNightBetween(checkIn, checkOut));

  const handleSelectUnit = (idx: number) => {
    setSelectedIdx(idx);
    setQuote(null);
    setQuoteError(null);
    setRoomCount(1);
  };

  const handleRoomCountChange = (newCount: number) => {
    setRoomCount(newCount);
    const newMax = baseCapacity * newCount;
    const curAdults = adultsRef.current;
    const curChildren = childrenRef.current;
    if (curAdults + curChildren > newMax) {
      setValue("adults", Math.min(curAdults, newMax));
      setValue("children", Math.max(0, newMax - Math.min(curAdults, newMax)));
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fetchQuote, 300);
  };

  // ── WhatsApp enquiry ──────────────────────────────────────────
  const handleWhatsApp = () => {
    const unit = group?.display_unit.title ?? group?.type_label ?? "";
    const rooms = !isVilla && roomCount > 1 ? ` (${roomCount} units)` : "";
    const guests = `${adults} adults${children > 0 ? `, ${children} children` : ""}${infants > 0 ? `, ${infants} infants` : ""}`;
    const dates =
      checkIn && checkOut && nights > 0
        ? `\n\nCheck-in: ${checkIn.format("DD MMM YYYY")}\nCheck-out: ${checkOut.format("DD MMM YYYY")}\nGuests: ${guests}`
        : "";
    window.open(
      `https://wa.me/9594377736?text=${encodeURIComponent(`Hi! I'd like to enquire about *${propertyName}* — ${unit}${rooms}.${dates}`)}`,
      "_blank",
    );
  };

  const handleProceedToBook = () => {
    if (!quote || nights < 1 || !group) return;
    const token = encryptCheckout({
      propertyId,
      unitId: group.display_unit.unit_id,
      checkIn: checkIn!.format("YYYY-MM-DD"),
      checkOut: checkOut!.format("YYYY-MM-DD"),
      adults,
      children,
      infants,
      rooms: units,
      petCount,
    });
    router.push(`/checkout?b=${token}`);
  };

  return (
    <div className="md:p-5">
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Select accommodation
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {unitGroups.map((g, idx) => {
            const selected = idx === selectedIdx;
            
            const rateLabel =
              isDirect && selected && checkinRate ? checkinRate : null;
            const datesBlocked =
              selected && checkIn && checkOut
                ? isCheckinBlocked(checkIn) ||
                  hasBlockedNightBetween(checkIn, checkOut)
                : false;
            const isSoldOut = g.available_count === 0 || datesBlocked;

            return (
              <Box
                key={g.unit_type}
                onClick={() => !isSoldOut && handleSelectUnit(idx)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1,
                  borderRadius: 0.2,
                  border: "1.5px solid",
                  borderColor: selected ? "primary.main" : "divider",
                  bgcolor: selected
                    ? theme.palette.mode === "dark"
                      ? "primary.900"
                      : "primary.50"
                    : "background.paper",
                  cursor: isSoldOut ? "not-allowed" : "pointer", // ← use isSoldOut
                  opacity: 1,
                  transition: "all 0.15s",
                  boxShadow: selected
                    ? `0 0 0 3px ${theme.palette.primary.main}22`
                    : "none",
                  "&:hover": isSoldOut ? {} : { borderColor: "primary.main" },
                }}
              >
                {g.display_unit.images[0]?.image?.image_url && (
                  <Box
                    component="img"
                    src={g.display_unit.images[0].image.image_url}
                    alt={g.display_unit.title ?? g.type_label}
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 0.2,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                )}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {g.display_unit.title ?? g.type_label}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.25,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color={isSoldOut ? "error.main" : "success.main"}
                    >
                      {g.available_count === 0
                        ? "Sold out"
                        : datesBlocked
                          ? "Unavailable for selected dates"
                          : `${g.available_count} available`}
                    </Typography>
                    {selected && rateLabel?.type === "seasonal" && (
                      <Chip
                        label={rateLabel.label}
                        size="small"
                        color="warning"
                        sx={{ height: 14, fontSize: 9 }}
                      />
                    )}
                    {selected && rateLabel?.type === "weekend" && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        · weekend
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                  {isSoldOut ? (
                    <Chip
                      label="Sold out"
                      size="small"
                      color="error"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                    />
                  ) : isDirect && selected && quote ? (
                    <>
                      <Typography
                        variant="body1"
                        fontWeight={800}
                        color="primary"
                        lineHeight={1.2}
                      >
                        {formatINR(quote.stay_charges + quote.commission_amount)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        /night
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      Enquire
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {!isDirect && (
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            borderRadius: 0.2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Contact us for pricing
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Fill in your dates and we&apos;ll get back to you with availability
          </Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Controller
            name="checkIn"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Check-in"
                value={field.value}
                format="DD/MM/YYYY"
                disablePast
                shouldDisableDate={(date) => isCheckinBlocked(date)}
                onChange={(val) => {
                  field.onChange(val);
                  const co = getValues("checkOut");
                  if (val && co && !val.isBefore(co))
                    setValue("checkOut", val.add(1, "day"));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    InputProps: blockedLoading
                      ? {
                          endAdornment: (
                            <CircularProgress size={14} sx={{ mr: 1 }} />
                          ),
                        }
                      : undefined,
                  },
                }}
              />
            )}
          />
          <Controller
            name="checkOut"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Check-out"
                value={field.value}
                format="DD/MM/YYYY"
                disablePast
                minDate={
                  checkIn ? checkIn.add(1, "day") : dayjs().add(1, "day")
                }
                shouldDisableDate={(date) => isCheckoutBlocked(date)}
                onChange={(val) => field.onChange(val)}
                slotProps={{ textField: { fullWidth: true, size: "small" } }}
              />
            )}
          />
        </Box>

        <TextField
          size="small"
          fullWidth
          label="Guests"
          value={`${totalPax} guest${totalPax === 1 ? "" : "s"}${infants > 0 ? `, ${infants} infant${infants === 1 ? "" : "s"}` : ""}`}
          onClick={(e) => setGuestAnchor(e.currentTarget)}
          slotProps={{
            input: {
              readOnly: true,
              style: { cursor: "pointer" },
              startAdornment: (
                <PeopleIcon
                  fontSize={16}
                  color="text.secondary"
                  className={`mr-0.5 text-[${theme.palette.text.secondary}]`}
                />
              ),
            },
          }}
        />

        <Popover
          open={Boolean(guestAnchor)}
          anchorEl={guestAnchor}
          onClose={() => setGuestAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          slotProps={{ paper: { sx: { width: 280, p: 2, borderRadius: 0.2 } } }}
        >
          <GuestRow
            label="Adults"
            sub="Age 13+"
            value={adults}
            min={1}
            max={maxCapacity - children}
            onChange={(v) => setValue("adults", v)}
          />
          <Divider />
          <GuestRow
            label="Children"
            sub="Age 2–12"
            value={children}
            min={0}
            max={Math.max(0, maxCapacity - adults)}
            onChange={(v) => setValue("children", v)}
          />
          <Divider />
          <GuestRow
            label="Infants"
            sub="Under 2 · Free · Don't count toward capacity"
            value={infants}
            min={0}
            max={maxCapacity}
            onChange={(v) => setValue("infants", v)}
          />
          {isPetFriendly && (
            <>
              <Divider />
              <GuestRow
                label="Pets"
                sub={`₹${Number((group?.display_unit as any)?.petCharge ?? 0).toLocaleString("en-IN")} per pet · max ${maxPets}`}
                value={petCount}
                min={0}
                max={maxPets}
                onChange={(v) => setValue("petCount", v)}
              />
            </>
          )}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            Max {maxCapacity} guests total
            {!isVilla &&
              units > 1 &&
              ` (${units} units × ${baseCapacity} per unit)`}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            size="small"
            onClick={() => {
              setGuestAnchor(null);
              fetchQuote();
            }}
            sx={{ mt: 1.5, borderRadius: 0.2 }}
          >
            Done
          </Button>
        </Popover>

        {/* Room count — resort only */}
        {!isVilla && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1.5,
              borderRadius: 0.2,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={500}>
                No. of {group?.type_label ?? "Room"}s
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {maxRooms} available · {baseCapacity} guest
                {baseCapacity === 1 ? "" : "s"} per unit
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="small"
                disabled={roomCount <= 1}
                onClick={() => handleRoomCountChange(roomCount - 1)}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 0.2,
                  width: 28,
                  height: 28,
                }}
              >
                <RemoveIcon fontSize={14} />
              </IconButton>
              <Typography
                fontWeight={700}
                sx={{ minWidth: 20, textAlign: "center" }}
              >
                {roomCount}
              </Typography>
              <IconButton
                size="small"
                disabled={roomCount >= maxRooms}
                onClick={() => handleRoomCountChange(roomCount + 1)}
                sx={{
                  border: "1px solid",
                  borderColor:
                    roomCount < maxRooms ? "primary.main" : "divider",
                  borderRadius: 0.2,
                  width: 28,
                  height: 28,
                  bgcolor:
                    roomCount < maxRooms ? "primary.main" : "transparent",
                  color: roomCount < maxRooms ? "#fff" : "text.disabled",
                  "&:hover": {
                    bgcolor:
                      roomCount < maxRooms ? "primary.dark" : "transparent",
                  },
                }}
              >
                <AddIcon fontSize={14} />
              </IconButton>
            </Box>
          </Box>
        )}

        {hasPricing && (
          <Box
            sx={{
              borderRadius: 0.2,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            <Box sx={{ px: 1.5, py: 1, bgcolor: "action.hover" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                Price summary
              </Typography>
            </Box>
            <Box
              sx={{
                px: 1.5,
                py: 1.25,
                display: "flex",
                flexDirection: "column",
                gap: 0.75,
              }}
            >
              {quoteLoading ? (
                <>
                  <Skeleton variant="text" width="70%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="text" width="40%" height={20} />
                </>
              ) : quoteError ? (
                <Typography variant="caption" color="error">
                  {quoteError}
                </Typography>
              ) : quote && nights > 0 ? (
                <>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">
                      Stay charges + Property charges
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {formatINR(quote.stay_charges + quote.commission_amount)}
                    </Typography>
                  </Box>

                  {/* Property charges */}
                  {/* {quote.commission_amount > 0 && (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Property charges
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatINR(quote.commission_amount)}
                      </Typography>
                    </Box>
                  )} */}

                  {/* GST on property charges */}
                  {quote.commission_gst > 0 && (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2">
                        GST on property charges
                      </Typography>
                      <Typography variant="body2">
                        {formatINR(quote.commission_gst)}
                      </Typography>
                    </Box>
                  )}

                  {quote.cleaning_fee > 0 ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2">
                        GST on property charges
                      </Typography>
                      <Typography variant="body2">
                        {formatINR(quote.cleaning_fee)}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="body2"
                      color="success"
                      className="flex gap-1 items-center"
                    >
                      <PiConfetti size={12} /> Zero convenience fees on your
                      booking!
                    </Typography>
                  )}

                  <Divider sx={{ my: 0.25 }} />

                  {/* Total = stay + property charges + GST */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" fontWeight={700}>
                      Total payable now
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={800}
                      color="primary"
                    >
                      {formatINR(quote.total)}
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
                      From {formatINR(group.pricing.weekday_price)}/night per
                      unit{!isVilla && units > 1 ? ` × ${units} units` : ""}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Security deposit */}
        {hasPricing && group?.pricing && (
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            💡 Security deposit ₹
            {Number(group.pricing.security_deposit).toLocaleString("en-IN")}{" "}
            payable at property · fully refundable
          </Typography>
        )}

        {/* CTA */}
        {hasPricing && (
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleProceedToBook}
            disabled={
              !quote || nights < 1 || quoteLoading || isSelectedUnitSoldOut
            }
            sx={{ borderRadius: 0.2, fontWeight: 700, py: 1.25 }}
          >
            {quoteLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : isSelectedUnitSoldOut ? (
              "Unavailable for Selected Dates"
            ) : nights > 0 ? (
              "Proceed to Book"
            ) : (
              "Select Dates to Continue"
            )}
          </Button>
        )}

        <Button
          variant={hasPricing ? "outlined" : "contained"}
          fullWidth
          size="large"
          onClick={handleWhatsApp}
          startIcon={<WhatsApp />}
          sx={
            hasPricing
              ? { borderRadius: 0.2, fontWeight: 600, py: 1 }
              : {
                  borderRadius: 0.2,
                  fontWeight: 700,
                  py: 1.25,
                  bgcolor: "#25D366",
                  "&:hover": { bgcolor: "#1ebe5d" },
                  color: "#fff",
                  border: "none",
                }
          }
        >
          {hasPricing ? "Enquire on WhatsApp" : "Send Enquiry on WhatsApp"}
        </Button>
      </Box>
    </div>
  );
};

export default BookingWidget;
