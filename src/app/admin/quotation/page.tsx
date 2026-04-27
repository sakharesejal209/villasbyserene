"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Popover,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PeopleAltOutlined,
  RemoveOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { httpService } from "@/app/@services";
import {
  AdminPropertyRowDTO,
  AdminUnitDTO,
  AdminUnitPricingDTO,
  BookingQuoteDTO,
} from "@/app/@types";

// ── Types ──────────────────────────────────────────────────────────
interface ExtraItem {
  id: string;
  label: string;
  amount: number;
}

interface QuoteForm {
  propertyId: string;
  unitId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  hasPet: boolean;
  rooms: number;
}

// ── Helpers ────────────────────────────────────────────────────────
const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtDt = (d: string) => dayjs(d).format("DD MMM YYYY");

// ── Guest counter row (same as BookingWidget) ──────────────────────
const GuestRow = ({
  label,
  sub,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  sub: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) => (
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
          borderRadius: 0.5,
          width: 28,
          height: 28,
        }}
      >
        <RemoveOutlined sx={{ fontSize: 14 }} />
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
          borderRadius: 0.5,
          width: 28,
          height: 28,
          bgcolor: value < max ? "primary.main" : "transparent",
          color: value < max ? "#fff" : "text.disabled",
          "&:hover": { bgcolor: value < max ? "primary.dark" : "transparent" },
        }}
      >
        <AddOutlined sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  </Box>
);

// ── Quote display ──────────────────────────────────────────────────
const QuoteDisplay = ({
  quote,
  extras,
  propertyName,
  unitName,
  customerName,
}: {
  quote: BookingQuoteDTO;
  extras: ExtraItem[];
  propertyName: string;
  unitName: string;
  customerName: string;
}) => {
  const extraTotal = extras.reduce((s, e) => s + e.amount, 0);
  const grandTotal = quote.total + extraTotal;
  const nights = quote.nights;

  const chargeRows: { label: string; value: number; muted?: boolean }[] = [
    {
      label: `Stay charges (${nights} night${nights > 1 ? "s" : ""}) + Property charges`,
      value: quote.stay_charges + quote.commission_amount,
    },
    ...(quote.extra_adult_count > 0
      ? [
          {
            label: `Extra adults (${quote.extra_adult_count} × ${nights} nights)`,
            value: quote.extra_guest_charge,
            muted: true,
          },
        ]
      : []),
    ...(quote.extra_child_count > 0
      ? [
          {
            label: `Extra children (${quote.extra_child_count} × ${nights} nights)`,
            value: quote.child_charge,
            muted: true,
          },
        ]
      : []),
    ...(quote.pet_charge > 0
      ? [{ label: "Pet charge", value: quote.pet_charge, muted: true }]
      : []),
    { label: "GST on property charges (18%)", value: quote.commission_gst },
    ...(quote.cleaning_fee > 0
      ? [{ label: "Cleaning fee", value: quote.cleaning_fee }]
      : []),
    ...extras.map((e) => ({ label: e.label, value: e.amount })),
  ];

  return (
    <Box>
      {customerName && (
        <Box sx={{ mb: 2, p: 1.25, bgcolor: "action.hover", borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Prepared for
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            {customerName}
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={800}>
          {propertyName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {unitName}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            size="small"
            label={`${fmtDt(quote.checkIn)} → ${fmtDt(quote.checkOut)}`}
          />
          <Chip size="small" label={`${nights} nights`} variant="outlined" />
        </Box>
      </Box>

      {/* Nightly breakdown */}
      <Typography
        variant="caption"
        fontWeight={700}
        color="text.secondary"
        sx={{
          textTransform: "uppercase",
          letterSpacing: 0.8,
          display: "block",
          mb: 1,
        }}
      >
        Nightly Breakdown
      </Typography>
      <Box sx={{ mb: 2 }}>
        {quote.nightly_breakdown.map((n) => (
          <Box
            key={n.date}
            sx={{ display: "flex", justifyContent: "space-between", py: 0.3 }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              {fmtDt(n.date)}
              <Chip
                label={n.label ?? n.type}
                size="small"
                sx={{
                  fontSize: 9,
                  height: 14,
                  bgcolor:
                    n.type === "seasonal"
                      ? "warning.main"
                      : n.type === "weekend"
                        ? "secondary.main"
                        : "action.selected",
                  color:
                    n.type === "seasonal" || n.type === "weekend"
                      ? "#fff"
                      : "text.primary",
                }}
              />
            </Typography>
            <Typography variant="caption" fontWeight={600}>
              {fmt(n.price)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Charges */}
      <Typography
        variant="caption"
        fontWeight={700}
        color="text.secondary"
        sx={{
          textTransform: "uppercase",
          letterSpacing: 0.8,
          display: "block",
          mb: 1,
        }}
      >
        Charges
      </Typography>
      {chargeRows.map((r, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 0.5,
            pl: r.muted ? 2 : 0,
          }}
        >
          <Typography
            variant="body2"
            color={r.muted ? "text.secondary" : "text.primary"}
          >
            {r.muted ? "↳ " : ""}
            {r.label}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {fmt(r.value)}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 1.5 }} />

      {quote.security_deposit > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 0.5,
            opacity: 0.65,
          }}
        >
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Security deposit (collected at property)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {fmt(quote.security_deposit)}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 1,
          p: 1.5,
          bgcolor: "primary.main",
          borderRadius: 1,
          color: "#fff",
        }}
      >
        <Typography fontWeight={800} fontSize={16}>
          Total Payable
        </Typography>
        <Typography fontWeight={800} fontSize={16}>
          {fmt(grandTotal)}
        </Typography>
      </Box>

      {extraTotal > 0 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 0.75, textAlign: "right" }}
        >
          Includes {fmt(extraTotal)} in additional items
        </Typography>
      )}
    </Box>
  );
};

// ── Print HTML builder ─────────────────────────────────────────────
const buildPrintHTML = (
  quote: BookingQuoteDTO,
  extras: ExtraItem[],
  propertyName: string,
  unitName: string,
  customerName: string,
  logoUrl: string,
  note: string,
  guestSummary: {
    adults: number;
    children: number;
    infants: number;
    hasPet: boolean;
    petCharge: number;
  },
) => {
  const extraTotal = extras.reduce((s, e) => s + e.amount, 0);
  const grandTotal = quote.total + extraTotal;
  const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
  const dt = (d: string) => dayjs(d).format("DD MMM YYYY");
  const n = quote.nights;

  const guestLine = [
    `${guestSummary.adults} adult${guestSummary.adults > 1 ? "s" : ""}`,
    guestSummary.children > 0
      ? `${guestSummary.children} child${guestSummary.children > 1 ? "ren" : ""}`
      : "",
    guestSummary.infants > 0
      ? `${guestSummary.infants} infant${guestSummary.infants > 1 ? "s" : ""}`
      : "",
    guestSummary.hasPet
      ? `1 pet (₹${guestSummary.petCharge.toLocaleString("en-IN")} charge)`
      : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const nightRows = quote.nightly_breakdown
    .map(
      (r) => `
    <tr><td>${dt(r.date)}</td><td style="color:#888">${r.label ?? r.type}</td><td style="text-align:right">${inr(r.price)}</td></tr>`,
    )
    .join("");

  const chargeData: [string, number][] = [
    [
      `Stay charges (${n} night${n > 1 ? "s" : ""}) + Property charges`,
      quote.stay_charges + quote.commission_amount,
    ],
    ...(quote.extra_adult_count > 0
      ? [
          [
            `Extra adults (${quote.extra_adult_count} × ${n} nights)`,
            quote.extra_guest_charge,
          ] as [string, number],
        ]
      : []),
    ...(quote.extra_child_count > 0
      ? [
          [
            `Extra children (${quote.extra_child_count} × ${n} nights)`,
            quote.child_charge,
          ] as [string, number],
        ]
      : []),
    ...(quote.pet_charge > 0
      ? [["Pet charge", quote.pet_charge] as [string, number]]
      : []),
    ["GST on property charges (18%)", quote.commission_gst],
    ...(quote.cleaning_fee > 0
      ? [["Cleaning fee", quote.cleaning_fee] as [string, number]]
      : []),
    ...extras.map((e) => [e.label, e.amount] as [string, number]),
  ];

  const chargeRows = chargeData
    .map(
      ([l, v]) => `
    <tr><td>${l}</td><td style="text-align:right">${inr(v)}</td></tr>`,
    )
    .join("");

  const safeNote = note
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${customerName ? `Quotation_${customerName.trim().replace(/\s+/g, "_")}` : `Quotation_${propertyName.trim().replace(/\s+/g, "_")}`}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;padding:44px;font-size:13px;background:#fff}

  /* Header */
  .hdr{display:flex;justify-content:space-between;align-items:flex-start;
       margin-bottom:28px;padding-bottom:20px;border-bottom:2.5px solid #044231}
  .hdr-left{display:flex;flex-direction:column;gap:6px}
  .logo{height:44px;object-fit:contain;display:block}
  .brand-sub{font-size:10px;color:#7C7670;letter-spacing:0.8px;text-transform:uppercase}
  .hdr-right{text-align:right}
  .quote-label{font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#044231;font-weight:normal}
  .contact{font-size:13px;color:#333;margin-top:4px;font-weight:600}
  .gen-date{font-size:10px;color:#aaa;margin-top:3px}

  /* Customer */
  .for-box{background:#faf6f0;border-left:3px solid #FECC89;padding:9px 13px;border-radius:3px;margin-bottom:18px}
  .for-label{font-size:9px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px}
  .for-name{font-size:14px;font-weight:700;color:#1a1a1a}

  /* Info block */
  .info-block{border:1px solid #ede9e3;border-radius:5px;overflow:hidden;margin-bottom:20px}
  .info-row{display:flex;align-items:baseline;padding:7px 14px;border-bottom:1px solid #f4f0ea}
  .info-row:last-child{border-bottom:none}
  .info-key{font-size:10px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;
            color:#7C7670;width:90px;flex-shrink:0}
  .info-val{font-size:13px;color:#1a1a1a;font-weight:500}
  .badge{display:inline-block;background:#FECC89;color:#414042;padding:2px 8px;
         border-radius:3px;font-size:11px;font-weight:700;margin-right:4px}

  /* Section headings */
  .sec{font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;
       color:#7C7670;margin:18px 0 6px;padding-bottom:3px;border-bottom:1px solid #eee}

  /* Tables */
  table{width:100%;border-collapse:collapse}
  td{padding:5px 0;vertical-align:top;font-size:13px}
  tr+tr td{border-top:1px solid #f2eeea}

  /* Total */
  .total{background:#044231;color:#fff;padding:12px 15px;border-radius:5px;
         display:flex;justify-content:space-between;margin-top:14px}
  .total span{font-weight:800;font-size:15px}
  .dep{font-size:11px;margin-top:6px;font-style:italic}

  /* Note */
  .note-box{margin-top:24px;padding:12px 14px;border:1px solid #e8e4de;
            border-radius:4px;background:#fdfcfa}
  .note-label{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
              color:#7C7670;margin-bottom:6px}
  .note-text{font-size:12px;color:#444;line-height:1.65;white-space:pre-wrap}

  @media print{body{padding:28px}}
</style></head><body>

<div class="hdr">
  <div class="hdr-left">
    <img class="logo" src="${logoUrl}" alt="Villas By Serene" onerror="this.style.display='none'"/>
    <span class="brand-sub">Holiday Rental Management</span>
  </div>
  <div class="hdr-right">
    <div class="quote-label">Quotation</div>
    <div class="contact">+91 95943 77736</div>
    <div class="gen-date">Generated ${dayjs().format("DD MMM YYYY")}</div>
  </div>
</div>

${customerName ? `<div class="for-box"><div class="for-label">Prepared for</div><div class="for-name">${customerName}</div></div>` : ""}

<div class="info-block">
  <div class="info-row"><span class="info-key">Property</span><span class="info-val">${propertyName}</span></div>
  <div class="info-row"><span class="info-key">Unit</span><span class="info-val">${unitName}</span></div>
  <div class="info-row">
    <span class="info-key">Check-in</span>
    <span class="info-val"><span class="badge">${dt(quote.checkIn)}</span></span>
  </div>
  <div class="info-row">
    <span class="info-key">Check-out</span>
    <span class="info-val">
      <span class="badge">${dt(quote.checkOut)}</span>
      <span style="font-size:11px;color:#888">&nbsp;${n} night${n > 1 ? "s" : ""}</span>
    </span>
  </div>
  <div class="info-row"><span class="info-key">Guests</span><span class="info-val">${guestLine}</span></div>
</div>

<div class="sec">Charges</div>
<table><tbody>
${chargeRows}
${quote.security_deposit > 0 ? `<tr style="color:#999;font-style:italic"><td>Security deposit (collected at property)</td><td style="text-align:right">${inr(quote.security_deposit)}</td></tr>` : ""}
</tbody></table>

<div class="total"><span>Total Payable</span><span>${inr(grandTotal)}</span></div>
${quote.security_deposit > 0 ? `<div class="dep">* Security deposit of ${inr(quote.security_deposit)} collected at the property</div>` : ""}

${safeNote ? `<div class="note-box"><div class="note-label">Note</div><div class="note-text">${safeNote}</div></div>` : ""}

</body></html>`;
};

// ════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════════════
export default function AdminPricingPage() {
  const [properties, setProperties] = useState<AdminPropertyRowDTO[]>([]);
  const [units, setUnits] = useState<AdminUnitDTO[]>([]);
  const [loadingProps, setLoadingProps] = useState(true);
  const [loadingUnits, setLoadingUnits] = useState(false);

  const [form, setForm] = useState<QuoteForm>({
    propertyId: "",
    unitId: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    infants: 0,
    hasPet: false,
    rooms: 1,
  });

  const [quote, setQuote] = useState<BookingQuoteDTO | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [extras, setExtras] = useState<ExtraItem[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");
  const [guestAnchor, setGuestAnchor] = useState<HTMLElement | null>(null);

  const printRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [logoBase64, setLogoBase64] = useState("");

  // Derived from selected unit
  const selectedUnit = units.find((u) => u.unit_id === form.unitId);
  const selectedProp = properties.find(
    (p) => p.property_id === form.propertyId,
  );
  const pricing = selectedUnit?.pricing as
    | AdminUnitPricingDTO
    | null
    | undefined;

  const isVilla = selectedUnit?.unit_type === "VILLA";
  const baseCapacity = selectedUnit?.max_capacity ?? 99;
  const maxCapacity = isVilla ? baseCapacity : baseCapacity * form.rooms;
  const allowPet = !!(
    selectedUnit?.petCharge && Number(selectedUnit.petCharge) > 0
  );
  const totalPax = form.adults + form.children;
  const nights =
    form.checkIn && form.checkOut
      ? dayjs(form.checkOut).diff(dayjs(form.checkIn), "day")
      : 0;

  // Load properties + convert logo to base64 for print
  useEffect(() => {
    httpService<AdminPropertyRowDTO[]>()
      .get("/admin/properties")
      .then(setProperties)
      .catch(() => setError("Failed to load properties"))
      .finally(() => setLoadingProps(false));

    // Fetch logo once and convert to base64 — embeds directly in print iframe
    fetch("/inline-logo.png")
      .then((r) => r.blob())
      .then(
        (blob) =>
          new Promise<string>((res, rej) => {
            const reader = new FileReader();
            reader.onload = () => res(reader.result as string);
            reader.onerror = rej;
            reader.readAsDataURL(blob);
          }),
      )
      .then(setLogoBase64)
      .catch(() => {}); // silently fail — onerror on img hides it
  }, []);

  // Load units when property changes
  useEffect(() => {
    if (!form.propertyId) {
      setUnits([]);
      return;
    }
    setLoadingUnits(true);
    setForm((f) => ({ ...f, unitId: "", rooms: 1 }));
    setQuote(null);
    httpService<{ units: AdminUnitDTO[] }>()
      .get(`/admin/properties/${form.propertyId}`)
      .then((d) => setUnits(d.units))
      .catch(() => setError("Failed to load units"))
      .finally(() => setLoadingUnits(false));
  }, [form.propertyId]);

  // Reset rooms to 1 when villa selected; fix guest capacity
  useEffect(() => {
    if (!selectedUnit) return;
    setForm((f) => {
      const rooms = isVilla ? 1 : f.rooms;
      const maxCap = isVilla
        ? (selectedUnit.max_capacity ?? 99)
        : (selectedUnit.max_capacity ?? 99) * rooms;
      const adults = Math.min(f.adults, maxCap);
      const children = Math.min(f.children, Math.max(0, maxCap - adults));
      return { ...f, rooms, adults, children, hasPet: false };
    });
    setQuote(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.unitId]);

  // Keep form in a ref so getQuote never goes stale without being recreated
  const formRef = useRef(form);
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const getQuote = useCallback(async () => {
    const f = formRef.current;
    const n =
      f.checkIn && f.checkOut
        ? dayjs(f.checkOut).diff(dayjs(f.checkIn), "day")
        : 0;
    if (!f.unitId || !f.checkIn || !f.checkOut || n < 1) return;
    setQuoteLoading(true);
    setError(null);
    try {
      const data = await httpService<BookingQuoteDTO>().post("/pricing/quote", {
        unitId: f.unitId,
        checkIn: f.checkIn,
        checkOut: f.checkOut,
        adults: f.adults,
        children: f.children,
        hasPet: f.hasPet,
        rooms: f.rooms,
      });
      setQuote(data);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Failed to get quote");
      setQuote(null);
    } finally {
      setQuoteLoading(false);
    }
  }, []); // stable — reads from formRef

  // Stable debounced fetch — only fires if quote already exists (auto-refresh on guest/room change)
  const debouncedFetch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(getQuote, 500);
  }, [getQuote]); // getQuote is now stable

  const prevParamsRef = useRef({
    adults: 0,
    children: 0,
    hasPet: false,
    rooms: 1,
  });
  useEffect(() => {
    const prev = prevParamsRef.current;
    const changed =
      prev.adults !== form.adults ||
      prev.children !== form.children ||
      prev.hasPet !== form.hasPet ||
      prev.rooms !== form.rooms;
    prevParamsRef.current = {
      adults: form.adults,
      children: form.children,
      hasPet: form.hasPet,
      rooms: form.rooms,
    };
    if (changed && quote) debouncedFetch();
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [
    form.adults,
    form.children,
    form.hasPet,
    form.rooms,
    quote,
    debouncedFetch,
  ]);

  const setGuests = (patch: Partial<QuoteForm>) =>
    setForm((f) => ({ ...f, ...patch }));

  const addExtra = () => {
    if (!newLabel || !newAmount) return;
    setExtras((p) => [
      ...p,
      { id: crypto.randomUUID(), label: newLabel, amount: +newAmount },
    ]);
    setNewLabel("");
    setNewAmount("");
  };

  const removeExtra = (id: string) =>
    setExtras((p) => p.filter((e) => e.id !== id));

  // Pre-build HTML into iframe as soon as quote/extras/customerName change
  // so Download PDF is instant — no rebuild on click
  const printHtmlRef = useRef<string>("");
  useEffect(() => {
    if (!quote) return;
    printHtmlRef.current = buildPrintHTML(
      quote,
      extras,
      selectedProp?.name ?? "",
      selectedUnit?.title ?? selectedUnit?.unit_type ?? "",
      customerName,
      logoBase64,
      note,
      {
        adults: form.adults,
        children: form.children,
        infants: form.infants,
        hasPet: form.hasPet,
        petCharge: Number(selectedUnit?.petCharge ?? 0),
      },
    );
    const iframe = printRef.current;
    if (iframe) iframe.srcdoc = printHtmlRef.current;
  }, [
    quote,
    extras,
    customerName,
    note,
    logoBase64,
    selectedProp,
    selectedUnit,
    form,
  ]);

  const downloadQuote = useCallback(() => {
    const iframe = printRef.current;
    if (!iframe || !printHtmlRef.current) return;
    // If srcdoc already loaded, print immediately; otherwise wait for onload
    const tryPrint = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    };
    if (iframe.contentDocument?.readyState === "complete") {
      tryPrint();
    } else {
      iframe.onload = tryPrint;
    }
  }, []);

  const canFetch =
    !!form.unitId && !!form.checkIn && !!form.checkOut && nights > 0;

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100, mx: "auto" }}>
      <iframe ref={printRef} style={{ display: "none" }} title="quote-print" />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={800}>
          Quote Generator
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Generate and download pricing quotes for guests
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "400px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* ── Left: Form ── */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 2.5,
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight={700}
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.8, mb: 2 }}
          >
            Quote Details
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Customer name */}
            <TextField
              label="Customer Name (optional)"
              size="small"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              fullWidth
            />

            {/* Property */}
            <FormControl size="small" fullWidth disabled={loadingProps}>
              <InputLabel>
                {loadingProps ? "Loading..." : "Property"}
              </InputLabel>
              <Select
                value={form.propertyId}
                label={loadingProps ? "Loading..." : "Property"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, propertyId: e.target.value }))
                }
              >
                {properties.map((p) => (
                  <MenuItem key={p.property_id} value={p.property_id}>
                    {p.name}
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {p.area}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Unit */}
            <FormControl
              size="small"
              fullWidth
              disabled={!form.propertyId || loadingUnits}
            >
              <InputLabel>
                {loadingUnits ? "Loading units..." : "Unit"}
              </InputLabel>
              <Select
                value={form.unitId}
                label={loadingUnits ? "Loading units..." : "Unit"}
                onChange={(e) =>
                  setForm((f) => ({ ...f, unitId: e.target.value }))
                }
              >
                {units.map((u) => (
                  <MenuItem key={u.unit_id} value={u.unit_id}>
                    <Box>
                      <Typography variant="body2">
                        {u.title || u.unit_type}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {u.unit_type} · Max {u.max_capacity} guests
                        {u.pricing
                          ? ` · ₹${Number(u.pricing.weekdayPrice).toLocaleString("en-IN")}/night`
                          : " · No pricing"}
                        {u.petCharge && Number(u.petCharge) > 0
                          ? " · Pets allowed"
                          : ""}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Unit info chips */}
            {selectedUnit && (
              <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                <Chip size="small" label={selectedUnit.unit_type} />
                <Chip
                  size="small"
                  label={`Max ${baseCapacity} guests`}
                  variant="outlined"
                />
                {selectedUnit.no_of_bedrooms && (
                  <Chip
                    size="small"
                    label={`${selectedUnit.no_of_bedrooms} bed`}
                    variant="outlined"
                  />
                )}
                {allowPet && (
                  <Chip
                    size="small"
                    label="Pets allowed"
                    color="success"
                    variant="outlined"
                  />
                )}
                {!allowPet && (
                  <Chip
                    size="small"
                    label="No pets"
                    color="default"
                    variant="outlined"
                  />
                )}
                {isVilla && (
                  <Chip
                    size="small"
                    label="Villa — 1 unit"
                    color="info"
                    variant="outlined"
                  />
                )}
              </Box>
            )}

            {/* Dates */}
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              <TextField
                label="Check-in"
                type="date"
                size="small"
                value={form.checkIn}
                onChange={(e) => {
                  const ci = e.target.value;
                  setForm((f) => ({
                    ...f,
                    checkIn: ci,
                    checkOut:
                      f.checkOut && f.checkOut <= ci
                        ? dayjs(ci).add(1, "day").format("YYYY-MM-DD")
                        : f.checkOut,
                  }));
                  setQuote(null);
                }}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
                inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
              />
              <TextField
                label="Check-out"
                type="date"
                size="small"
                value={form.checkOut}
                onChange={(e) => {
                  setForm((f) => ({ ...f, checkOut: e.target.value }));
                  setQuote(null);
                }}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
                inputProps={{
                  min:
                    form.checkIn || dayjs().add(1, "day").format("YYYY-MM-DD"),
                }}
              />
            </Box>

            {nights > 0 && (
              <Typography
                variant="caption"
                color="primary"
                fontWeight={600}
                sx={{ mt: -1 }}
              >
                {nights} night{nights > 1 ? "s" : ""}
                {pricing &&
                  ` · from ₹${Number(pricing.weekdayPrice).toLocaleString("en-IN")}/night`}
              </Typography>
            )}

            {/* Guests — popover same as BookingWidget */}
            <TextField
              size="small"
              fullWidth
              label="Guests"
              value={`${totalPax} guest${totalPax === 1 ? "" : "s"}${form.infants > 0 ? `, ${form.infants} infant${form.infants === 1 ? "" : "s"}` : ""}`}
              onClick={(e) => setGuestAnchor(e.currentTarget)}
              slotProps={{
                input: {
                  readOnly: true,
                  style: { cursor: "pointer" },
                  startAdornment: (
                    <PeopleAltOutlined
                      sx={{ mr: 0.5, color: "text.secondary", fontSize: 16 }}
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
              slotProps={{
                paper: { sx: { width: 290, p: 2, borderRadius: 1 } },
              }}
            >
              <GuestRow
                label="Adults"
                sub="Age 13+"
                value={form.adults}
                min={1}
                max={maxCapacity - form.children}
                onChange={(v) => setGuests({ adults: v })}
              />
              <Divider />
              <GuestRow
                label="Children"
                sub="Age 2–12"
                value={form.children}
                min={0}
                max={Math.max(0, maxCapacity - form.adults)}
                onChange={(v) => setGuests({ children: v })}
              />
              <Divider />
              <GuestRow
                label="Infants"
                sub="Under 2 · Free · Don't count toward capacity"
                value={form.infants}
                min={0}
                max={99}
                onChange={(v) => setGuests({ infants: v })}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1 }}
              >
                Max {maxCapacity} guests
                {!isVilla &&
                  form.rooms > 1 &&
                  ` (${form.rooms} units × ${baseCapacity} per unit)`}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={() => {
                  setGuestAnchor(null);
                  if (quote) debouncedFetch();
                }}
                sx={{ mt: 1.5, borderRadius: 1 }}
              >
                Done
              </Button>
            </Popover>

            {/* Room count — resort only (not villa) */}
            {selectedUnit && !isVilla && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    Number of units
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {baseCapacity} guest{baseCapacity === 1 ? "" : "s"} per unit
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="small"
                    disabled={form.rooms <= 1}
                    onClick={() =>
                      setForm((f) => ({ ...f, rooms: f.rooms - 1 }))
                    }
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 0.5,
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
                    {form.rooms}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() =>
                      setForm((f) => ({ ...f, rooms: f.rooms + 1 }))
                    }
                    sx={{
                      border: "1px solid",
                      borderColor: "primary.main",
                      borderRadius: 0.5,
                      width: 28,
                      height: 28,
                      bgcolor: "primary.main",
                      color: "#fff",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    <AddOutlined sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              </Box>
            )}

            {/* Pet toggle — only if unit allows pets */}
            {allowPet && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  border: "1px solid",
                  borderColor: form.hasPet ? "success.main" : "divider",
                  borderRadius: 1,
                }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    Bringing a pet?
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Pet charge: ₹
                    {Number(selectedUnit?.petCharge ?? 0).toLocaleString(
                      "en-IN",
                    )}
                  </Typography>
                </Box>
                <Chip
                  label={form.hasPet ? "Yes" : "No"}
                  clickable
                  size="small"
                  color={form.hasPet ? "success" : "default"}
                  onClick={() => setForm((f) => ({ ...f, hasPet: !f.hasPet }))}
                />
              </Box>
            )}

            {/* Pricing check */}
            {selectedUnit && !pricing && (
              <Alert severity="warning" sx={{ py: 0.5 }}>
                No pricing configured for this unit
              </Alert>
            )}

            <Button
              variant="contained"
              size="large"
              onClick={getQuote}
              disabled={quoteLoading || !canFetch || !pricing}
              startIcon={
                quoteLoading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <SearchOutlined />
                )
              }
              sx={{ borderRadius: 1, fontWeight: 700 }}
            >
              {quoteLoading ? "Calculating..." : "Get Quote"}
            </Button>
          </Box>

          {/* Note */}
          <Divider sx={{ my: 2.5 }} />
          <Typography
            variant="subtitle2"
            fontWeight={700}
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.8, mb: 1 }}
          >
            Note
          </Typography>
          <TextField
            size="small"
            fullWidth
            multiline
            rows={3}
            placeholder="Additional notes, cancellation policy, special requests…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* Additional items */}
          <Divider sx={{ my: 2.5 }} />
          <Typography
            variant="subtitle2"
            fontWeight={700}
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.8, mb: 0.5 }}
          >
            Additional Items
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 1.5 }}
          >
            Decorations, transfers, early check-in, etc.
          </Typography>

          {extras.map((e) => (
            <Box
              key={e.id}
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
            >
              <Typography variant="body2" sx={{ flex: 1 }} noWrap>
                {e.label}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ minWidth: 80, textAlign: "right" }}
              >
                ₹{e.amount.toLocaleString("en-IN")}
              </Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => removeExtra(e.id)}
              >
                <DeleteOutlined sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          ))}
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TextField
              size="small"
              placeholder="Label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addExtra()}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              placeholder="Amount"
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addExtra()}
              sx={{ width: 110 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={addExtra}
              disabled={!newLabel || !newAmount}
              sx={{
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 1,
              }}
            >
              <AddOutlined />
            </IconButton>
          </Box>
        </Paper>

        {/* ── Right: Quote result ── */}
        <Box>
          {!quote && !quoteLoading && (
            <Paper
              elevation={0}
              sx={{
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 2,
                p: 6,
                textAlign: "center",
              }}
            >
              {!selectedUnit ? (
                <Typography color="text.disabled" variant="body2">
                  Select a property and unit to begin
                </Typography>
              ) : !pricing ? (
                <Typography color="warning.main" variant="body2">
                  Unit has no pricing configured
                </Typography>
              ) : !canFetch ? (
                <Typography color="text.disabled" variant="body2">
                  Select dates to get a quote
                </Typography>
              ) : (
                <Typography color="text.disabled" variant="body2">
                  Click Get Quote to calculate
                </Typography>
              )}
            </Paper>
          )}

          {quoteLoading && (
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2.5,
              }}
            >
              <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" />
              <Skeleton
                variant="rectangular"
                height={160}
                sx={{ mt: 2, borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                height={80}
                sx={{ mt: 1.5, borderRadius: 1 }}
              />
            </Paper>
          )}

          {quote && !quoteLoading && (
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2.5,
              }}
            >
              <QuoteDisplay
                quote={quote}
                extras={extras}
                propertyName={selectedProp?.name ?? ""}
                unitName={selectedUnit?.title ?? selectedUnit?.unit_type ?? ""}
                customerName={customerName}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2.5,
                  gap: 1.5,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={getQuote}
                  disabled={quoteLoading}
                  sx={{ borderRadius: 1 }}
                >
                  Recalculate
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DownloadOutlined />}
                  onClick={downloadQuote}
                  disabled={!logoBase64 && !quote}
                  sx={{ borderRadius: 1, fontWeight: 700 }}
                >
                  Download PDF
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
}
