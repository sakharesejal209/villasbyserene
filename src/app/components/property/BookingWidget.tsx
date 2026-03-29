"use client";

import { FC, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  AddOutlined,
  CalendarMonthOutlined,
  CheckCircleOutlined,
  ExpandMoreOutlined,
  InfoOutlined,
  PeopleAltOutlined,
  ReceiptOutlined,
  RemoveOutlined,
  WhatsApp,
} from "@mui/icons-material";
import type {
  BookingQuoteDTO,
  NightlyBreakdownDTO,
  UnitGroupDTO,
} from "@/app/@types/property/property.type";
import { BookingType } from "@/app/@types/property/property.type";
import { propertiesService } from "@/app/@services";

// ── Types ─────────────────────────────────────────────────────────

interface BookingFormValues {
  checkIn: Dayjs | null;
  checkOut: Dayjs | null;
  adults: number;
  children: number;
}

interface BookingWidgetProps {
  propertyId: string;
  propertyName: string;
  unitGroups: UnitGroupDTO[];
  bookingType: BookingType;
  defaultCheckIn?: string; // YYYY-MM-DD from URL
  defaultCheckOut?: string; // YYYY-MM-DD from URL
}

// ── Helpers ───────────────────────────────────────────────────────

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getDayOfWeek(date: Dayjs): "weekday" | "weekend" {
  const dow = date.day(); // 0=Sun, 5=Fri, 6=Sat
  return dow === 0 || dow === 5 || dow === 6 ? "weekend" : "weekday";
}

// Get effective price for a specific date considering seasonal rates
function getPriceForDate(
  date: Dayjs,
  group: UnitGroupDTO,
): { price: number; label: string; type: "seasonal" | "weekend" | "weekday" } {
  // Check seasonal rate first
  if (group.seasonal_rate) {
    const start = dayjs(group.seasonal_rate.start_date);
    const end = dayjs(group.seasonal_rate.end_date);
    if (
      (date.isAfter(start) || date.isSame(start, "day")) &&
      (date.isBefore(end) || date.isSame(end, "day"))
    ) {
      return {
        price: group.seasonal_rate.price_per_night,
        label: group.seasonal_rate.label,
        type: "seasonal",
      };
    }
  }

  if (!group.pricing) return { price: 0, label: "", type: "weekday" };

  const type = getDayOfWeek(date);
  return {
    price:
      type === "weekend"
        ? group.pricing.weekend_price
        : group.pricing.weekday_price,
    label: type === "weekend" ? "Weekend rate" : "Weekday rate",
    type,
  };
}

// ── Component ─────────────────────────────────────────────────────

const BookingWidget: FC<BookingWidgetProps> = ({
  propertyId,
  propertyName,
  unitGroups,
  bookingType,
  defaultCheckIn,
  defaultCheckOut,
}) => {
  const theme = useTheme();
  const isDirect = bookingType === BookingType.DIRECT;

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const selectedGroup = unitGroups[selectedGroupIndex];
  const hasPricing = isDirect && !!selectedGroup?.pricing;
  const isVilla = selectedGroup?.unit_type === "VILLA";
  const maxRooms = selectedGroup?.available_count ?? 1;

  const [quote, setQuote] = useState<BookingQuoteDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"dates" | "quote">("dates");
  const [roomCount, setRoomCount] = useState(1);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const { control, watch, getValues, setValue } = useForm<BookingFormValues>({
    defaultValues: {
      checkIn: defaultCheckIn ? dayjs(defaultCheckIn) : null,
      checkOut: defaultCheckOut ? dayjs(defaultCheckOut) : null,
      adults: 2,
      children: 0,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const nights = checkIn && checkOut ? checkOut.diff(checkIn, "day") : 0;

  // Dynamic price for selected check-in date
  const checkinPricing = useMemo(() => {
    if (!checkIn || !selectedGroup || !hasPricing) return null;
    return getPriceForDate(checkIn, selectedGroup);
  }, [checkIn, selectedGroup, hasPricing]);

  // Estimated total before quote
  const estimatedTotal = useMemo(() => {
    if (!checkIn || !checkOut || !selectedGroup || nights < 1 || !hasPricing)
      return null;
    let total = 0;
    for (let i = 0; i < nights; i++) {
      const date = checkIn.add(i, "day");
      total += getPriceForDate(date, selectedGroup).price;
    }
    return total * (isVilla ? 1 : roomCount);
  }, [
    checkIn,
    checkOut,
    selectedGroup,
    nights,
    isVilla,
    roomCount,
    hasPricing,
  ]);

  const handleSelectGroup = (idx: number) => {
    setSelectedGroupIndex(idx);
    setQuote(null);
    setStep("dates");
    setError(null);
    setRoomCount(1);
  };

  const handleWhatsApp = () => {
    const values = getValues();
    const unitLabel =
      selectedGroup?.display_unit.title ?? selectedGroup?.type_label ?? "";
    const roomInfo = !isVilla && roomCount > 1 ? ` (${roomCount} units)` : "";
    const dateInfo =
      values.checkIn && values.checkOut && nights > 0
        ? `\n\nCheck-in: ${values.checkIn.format("DD MMM YYYY")}\nCheck-out: ${values.checkOut.format("DD MMM YYYY")}\nGuests: ${values.adults} adults${values.children > 0 ? `, ${values.children} children` : ""}`
        : "";
    const msg = `Hi! I'd like to enquire about *${propertyName}* — ${unitLabel}${roomInfo}.${dateInfo}`;
    window.open(
      `https://wa.me/9594377736?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const fetchQuote = async () => {
    if (!selectedGroup?.display_unit || !checkIn || !checkOut) return;
    setLoading(true);
    setError(null);
    try {
      const values = getValues();
      const result = await propertiesService.getBookingQuote({
        unitId: selectedGroup.display_unit.unit_id,
        checkIn: checkIn.format("YYYY-MM-DD"),
        checkOut: checkOut.format("YYYY-MM-DD"),
        adults: values.adults,
        children: values.children,
        hasPet: false,
      });
      setQuote(result);
      setStep("quote");
      setShowBreakdown(false);
    } catch {
      setError("Unable to fetch pricing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────

  return (
    <Box sx={{ p: 2.5 }}>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
          Select accommodation
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {unitGroups.map((group, idx) => {
            const isSelected = idx === selectedGroupIndex;
            // Show starting price on card — lowest possible rate
            const cardPrice = isDirect
              ? (group.pricing?.weekday_price ?? null)
              : null;

            return (
              <Box
                key={group.unit_type}
                onClick={() => handleSelectGroup(idx)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  border: "1.5px solid",
                  borderColor: isSelected ? "primary.main" : "divider",
                  bgcolor: isSelected
                    ? theme.palette.mode === "dark"
                      ? "primary.900"
                      : "primary.50"
                    : "background.paper",
                  cursor:
                    group.available_count === 0 ? "not-allowed" : "pointer",
                  opacity: group.available_count === 0 ? 0.5 : 1,
                  transition: "all 0.15s",
                  boxShadow: isSelected
                    ? `0 0 0 3px ${theme.palette.primary.main}22`
                    : "none",
                  "&:hover":
                    group.available_count > 0
                      ? { borderColor: "primary.main" }
                      : {},
                }}
              >
                {group.display_unit.images[0]?.image?.image_url && (
                  <Box
                    component="img"
                    src={group.display_unit.images[0].image.image_url}
                    alt={group.display_unit.title ?? group.type_label}
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 1.5,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                )}

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {group.display_unit.title ?? group.type_label}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={
                      group.available_count > 0 ? "success.main" : "error.main"
                    }
                  >
                    {group.available_count > 0
                      ? `${group.available_count} available`
                      : "Sold out"}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                  {cardPrice !== null ? (
                    <>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        color="primary"
                        lineHeight={1.2}
                      >
                        {formatINR(cardPrice)}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        /night
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      Enquire
                    </Typography>
                  )}
                </Box>

                {isSelected && (
                  <CheckCircleOutlined
                    sx={{ color: "primary.main", fontSize: 18, flexShrink: 0 }}
                  />
                )}
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
            bgcolor: "background.secondary",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Contact us for pricing
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Fill in your dates and we&apos;ll get back to you with availability
          </Typography>
        </Box>
      )}

      {step === "dates" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {hasPricing && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {checkinPricing ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={800}
                      color="primary"
                      lineHeight={1}
                    >
                      {formatINR(checkinPricing.price)}
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                        sx={{ ml: 0.5 }}
                      >
                        / night
                      </Typography>
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.25,
                      }}
                    >
                      {checkinPricing.type === "seasonal" ? (
                        <Chip
                          label={checkinPricing.label}
                          size="small"
                          color="warning"
                          sx={{ height: 18, fontSize: 10 }}
                        />
                      ) : (
                        <Typography variant="caption" color="textSecondary">
                          {checkinPricing.label}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  {estimatedTotal && nights > 0 && (
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="caption" color="textSecondary">
                        {nights} night
                      </Typography>
                      <Typography variant="body1" fontWeight={700}>
                        {formatINR(estimatedTotal)}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    color="primary"
                    lineHeight={1}
                  >
                    {formatINR(selectedGroup?.pricing?.weekday_price ?? 0)}
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                      sx={{ ml: 0.5 }}
                    >
                      / night
                    </Typography>
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Select dates to see exact pricing
                  </Typography>
                </Box>
              )}
            </Box>
          )}

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
                  minDate={dayjs()}
                  onChange={(val) => {
                    field.onChange(val);
                    const currentCheckOut = getValues("checkOut");
                    if (
                      val &&
                      currentCheckOut &&
                      !val.isBefore(currentCheckOut)
                    ) {
                      setValue("checkOut", val.add(1, "day"));
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      label: "Check-in",
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
                  onChange={(val) => field.onChange(val)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      label: "Check-out",
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Controller
              name="adults"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Adults"
                  type="number"
                  size="small"
                  fullWidth
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  slotProps={{
                    input: {
                      inputProps: { min: 1, max: 70 },
                      startAdornment: (
                        <PeopleAltOutlined
                          sx={{
                            mr: 0.5,
                            color: "textSecondary",
                            fontSize: 16,
                          }}
                        />
                      ),
                    },
                  }}
                />
              )}
            />
            <Controller
              name="children"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Children"
                  type="number"
                  size="small"
                  fullWidth
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  slotProps={{
                    input: { inputProps: { min: 0, max: 20 } },
                  }}
                />
              )}
            />
          </Box>

          {!isVilla && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  No. of {selectedGroup?.type_label ?? "Room"}s
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {maxRooms} available
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => setRoomCount((c) => Math.max(1, c - 1))}
                  disabled={roomCount <= 1}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    width: 28,
                    height: 28,
                  }}
                >
                  <RemoveOutlined sx={{ fontSize: 14 }} />
                </IconButton>
                <Typography
                  fontWeight={700}
                  sx={{ minWidth: 20, textAlign: "center" }}
                >
                  {roomCount}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setRoomCount((c) => Math.min(maxRooms, c + 1))}
                  disabled={roomCount >= maxRooms}
                  sx={{
                    border: "1px solid",
                    borderColor:
                      roomCount < maxRooms ? "primary.main" : "divider",
                    borderRadius: 1,
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
                  <AddOutlined sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ py: 0.5 }}>
              {error}
            </Alert>
          )}

          {hasPricing && (
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={fetchQuote}
              disabled={loading || nights < 1}
              sx={{ borderRadius: 2, fontWeight: 700, py: 1.25 }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : nights > 0 ? (
                `Check Price for ${nights} Night${nights !== 1 ? "s" : ""}`
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
              !hasPricing
                ? {
                    borderRadius: 2,
                    fontWeight: 700,
                    py: 1.25,
                    bgcolor: "#25D366",
                    "&:hover": { bgcolor: "#1ebe5d" },
                    color: "#fff",
                    border: "none",
                  }
                : { borderRadius: 2, fontWeight: 600, py: 1 }
            }
          >
            {hasPricing ? "Enquire on WhatsApp" : "Send Enquiry on WhatsApp"}
          </Button>

          {hasPricing && (
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ textAlign: "center" }}
            >
              Prices shown exclude taxes · Final price shown before payment
            </Typography>
          )}
        </Box>
      )}

      {step === "quote" && quote && (
        <Box>
          <Box
            sx={{
              p: 1.5,
              mb: 1.5,
              borderRadius: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {selectedGroup?.display_unit.title ??
                    selectedGroup?.type_label}
                  {!isVilla && roomCount > 1 && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="textSecondary"
                      sx={{ ml: 0.5 }}
                    >
                      × {roomCount}
                    </Typography>
                  )}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {checkIn?.format("DD MMM")} →{" "}
                  {checkOut?.format("DD MMM YYYY")} · {nights} night
                  {nights !== 1 ? "s" : ""}
                </Typography>
              </Box>
              <Button
                size="small"
                onClick={() => setStep("dates")}
                sx={{ minWidth: "auto", px: 1 }}
              >
                Edit
              </Button>
            </Box>
          </Box>

          <Box
            onClick={() => setShowBreakdown((v) => !v)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              mb: 1,
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <CalendarMonthOutlined sx={{ fontSize: 14 }} />
              Nightly breakdown
            </Typography>
            <ExpandMoreOutlined
              sx={{
                fontSize: 16,
                color: "textSecondary",
                transition: "transform 0.2s",
                transform: showBreakdown ? "rotate(180deg)" : "none",
              }}
            />
          </Box>

          <Collapse in={showBreakdown}>
            <Box
              sx={{
                mb: 1.5,
                p: 1.5,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                maxHeight: 160,
                overflowY: "auto",
              }}
            >
              {quote.nightly_breakdown.map(
                (night: NightlyBreakdownDTO, idx: number) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 0.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="caption" color="textSecondary">
                        {dayjs(night.date).format("ddd, DD MMM")}
                      </Typography>
                      {night.type === "seasonal" && (
                        <Chip
                          label={night.label}
                          size="small"
                          color="warning"
                          sx={{ height: 16, fontSize: 9 }}
                        />
                      )}
                      {night.type === "weekend" && (
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ fontStyle: "italic" }}
                        >
                          weekend
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="caption" fontWeight={600}>
                      {formatINR(night.price)}
                    </Typography>
                  </Box>
                ),
              )}
            </Box>
          </Collapse>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.75,
              mb: 1.5,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="textSecondary">
                {nights} night{nights !== 1 ? "s" : ""}
                {!isVilla && roomCount > 1 && ` × ${roomCount} units`}
              </Typography>
              <Typography variant="body2">
                {formatINR(quote.subtotal * (isVilla ? 1 : roomCount))}
              </Typography>
            </Box>

            {quote.extra_guest_charge > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="textSecondary">
                  Extra guest charge
                </Typography>
                <Typography variant="body2">
                  {formatINR(quote.extra_guest_charge)}
                </Typography>
              </Box>
            )}
            {quote.child_charge > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="textSecondary">
                  Child charge
                </Typography>
                <Typography variant="body2">
                  {formatINR(quote.child_charge)}
                </Typography>
              </Box>
            )}
            {quote.cleaning_fee > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="textSecondary">
                  Cleaning fee
                </Typography>
                <Typography variant="body2">
                  {formatINR(quote.cleaning_fee * (isVilla ? 1 : roomCount))}
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography variant="body2" color="textSecondary">
                  GST ({quote.tax_percent}%)
                </Typography>
                <Tooltip title="Goods and Services Tax as applicable">
                  <InfoOutlined sx={{ fontSize: 13, color: "text.disabled" }} />
                </Tooltip>
              </Box>
              <Typography variant="body2">
                {formatINR(quote.tax_amount)}
              </Typography>
            </Box>
            {quote.security_deposit > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="body2" color="textSecondary">
                    Security deposit
                  </Typography>
                  <Tooltip title="Fully refundable after checkout">
                    <InfoOutlined
                      sx={{ fontSize: 13, color: "text.disabled" }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="body2">
                  {formatINR(quote.security_deposit)}
                </Typography>
              </Box>
            )}
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 1.5,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700}>
              Total payable
            </Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="h6"
                fontWeight={800}
                color="primary"
                lineHeight={1.2}
              >
                {formatINR(quote.total * (isVilla ? 1 : roomCount))}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                incl. all taxes
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() =>
              console.log("Proceed:", {
                quote,
                unitGroup: selectedGroup,
                roomCount,
              })
            }
            startIcon={<ReceiptOutlined />}
            sx={{ borderRadius: 2, fontWeight: 700, py: 1.25 }}
          >
            Proceed to Book
          </Button>

          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: "block", textAlign: "center", mt: 1 }}
          >
            You won&apos;t be charged yet
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookingWidget;
