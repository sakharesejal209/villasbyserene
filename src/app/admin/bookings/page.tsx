// src/app/admin/bookings/page.tsx
"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { FileDownloadOutlined, SearchOutlined } from "@mui/icons-material";
import { AdminBookingDTO } from "@/app/@types";
import adminService from "@/app/@services/admin/admin-service";

const STATUS_COLORS: Record<
  string,
  "success" | "warning" | "error" | "default"
> = {
  CONFIRMED: "success",
  PENDING: "warning",
  CANCELLED: "error",
  FAILED: "error",
};

const STATUS_TABS = ["ALL", "CONFIRMED", "PENDING", "CANCELLED"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBookingDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [propFilter, setPropFilter] = useState("ALL");

  useEffect(() => {
    adminService
      .getAllBookings()
      .then(setBookings)
      .catch(() => setError("Failed to load bookings."))
      .finally(() => setLoading(false));
  }, []);

  const properties = [
    ...new Set(bookings.map((b) => b.property?.name).filter(Boolean)),
  ];

  const filtered = bookings.filter((b) => {
    const statusMatch =
      STATUS_TABS[tab] === "ALL" || b.status === STATUS_TABS[tab];
    const propMatch = propFilter === "ALL" || b.property?.name === propFilter;
    const q = search.toLowerCase();
    const searchMatch =
      !q ||
      b.id.toLowerCase().includes(q) ||
      b.guest?.name?.toLowerCase().includes(q) ||
      b.guest?.email?.toLowerCase().includes(q) ||
      b.property?.name?.toLowerCase().includes(q);
    return statusMatch && propMatch && searchMatch;
  });

  const totalRevenue = filtered
    .filter((b) => b.status === "CONFIRMED")
    .reduce((sum, b) => sum + b.amount, 0);

  const exportCSV = () => {
    const rows = [
      [
        "Booking ID",
        "Property",
        "Unit",
        "Guest",
        "Email",
        "Check-in",
        "Check-out",
        "Amount",
        "Status",
      ],
      ...filtered.map((b) => [
        b.id.slice(0, 8).toUpperCase(),
        b.property?.name ?? "",
        b.unit?.title ?? "",
        b.guest?.name ?? "",
        b.guest?.email ?? "",
        dayjs(b.checkInDate).format("DD/MM/YYYY"),
        dayjs(b.checkOutDate).format("DD/MM/YYYY"),
        b.amount,
        b.status,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${dayjs().format("YYYY-MM-DD")}.csv`;
    a.click();
  };

  const filteredForCounts = bookings.filter((b) => {
    const propMatch = propFilter === "ALL" || b.property?.name === propFilter;
    const q = search.toLowerCase();
    const searchMatch =
      !q ||
      b.id.toLowerCase().includes(q) ||
      b.guest?.name?.toLowerCase().includes(q) ||
      b.guest?.email?.toLowerCase().includes(q) ||
      b.property?.name?.toLowerCase().includes(q);
    return propMatch && searchMatch;
  });

  return (
    // <section>
    <div className="p-4">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Bookings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filtered.length} bookings · Revenue: ₹
            {totalRevenue.toLocaleString("en-IN")}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<FileDownloadOutlined />}
          onClick={exportCSV}
          size="small"
          sx={{ borderRadius: 0.2 }}
        >
          Export CSV
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          size="small"
          placeholder="Search by name, email, booking ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined
                    sx={{ fontSize: 18, color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Property</InputLabel>
          <Select
            value={propFilter}
            label="Property"
            onChange={(e) => setPropFilter(e.target.value)}
          >
            <MenuItem value="ALL">All Properties</MenuItem>
            {properties.map((p) => (
              <MenuItem key={p} value={p!}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Status tabs */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          "& .MuiTab-root.Mui-selected": {
            color: "primary.main",
            fontWeight: 700,
          },
        }}
      >
        {STATUS_TABS.map((s) => (
          <Tab
            key={s}
            label={
              s === "ALL"
                ? `All (${filteredForCounts.length})`
                : `${s.charAt(0) + s.slice(1).toLowerCase()} (${filteredForCounts.filter((b) => b.status === s).length})`
            }
          />
        ))}
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 0.2,
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "action.hover" }}>
                {[
                  "Booking ID",
                  "Property",
                  "Guest",
                  "Check-in",
                  "Check-out",
                  "Nights",
                  "Amount",
                  "Status",
                  "Booked on",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    align="center"
                    sx={{ py: 4, color: "text.secondary" }}
                  >
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((b) => {
                  const nights = dayjs(b.checkOutDate).diff(
                    dayjs(b.checkInDate),
                    "day",
                  );
                  return (
                    <TableRow key={b.id} hover>
                      <TableCell>
                        <Typography
                          variant="caption"
                          fontFamily="monospace"
                          fontWeight={700}
                        >
                          {b.id.slice(0, 8).toUpperCase()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          noWrap
                          sx={{ maxWidth: 150 }}
                        >
                          {b.property?.name ?? "—"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {b.unit?.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {b.guest?.name ?? "—"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {b.guest?.email}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {dayjs(b.checkInDate).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {dayjs(b.checkOutDate).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>{nights}N</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color="primary"
                        >
                          ₹{b.amount.toLocaleString("en-IN")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={b.status}
                          color={STATUS_COLORS[b.status] ?? "default"}
                          size="small"
                          sx={{ fontWeight: 700, fontSize: 11 }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                          color: "text.secondary",
                          fontSize: 12,
                        }}
                      >
                        {dayjs(b.createdAt).format("DD MMM, HH:mm")}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
    // </section>
  );
}
