// src/app/admin/calendar/page.tsx
"use client";

import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  IoAddOutline as AddOutlined,
  IoLinkOutline as LinkOutlined,
  IoRefresh as RefreshOutlined,
  IoSync as SyncOutlined,
} from "react-icons/io5";
import {
  HiOutlineChevronLeft as ChevronLeftOutlined,
  HiOutlineChevronRight as ChevronRightOutlined,
} from "react-icons/hi";
import { MdDeleteOutline as DeleteOutlined } from "react-icons/md";

import { calendarService, propertiesService } from "@/app/@services";
import {
  BlockedRangeDTO,
  FeedSourceDTO,
  PropertyListItemDTO,
  UnitCalendarDTO,
} from "@/app/@types";
import { usePropertyStore } from "@/context/PropertyContext";

dayjs.extend(isBetween);

const LEGEND = [
  { type: "booking", color: "#1B4332", label: "Online Booking" },
  { type: "manual", color: "#ed6c02", label: "Manual Block" },
  { type: "external", color: "#7b1fa2", label: "iCal (Airbnb etc)" },
];

function getBlockColor(type: BlockedRangeDTO["type"]) {
  return LEGEND.find((l) => l.type === type)?.color ?? "#666";
}

// ── Mini calendar ─────────────────────────────────────────────────

const MiniCalendar = ({
  month,
  year,
  blocked,
  onDateClick,
  selectedStart,
  selectedEnd,
}: {
  month: number;
  year: number;
  blocked: BlockedRangeDTO[];
  onDateClick: (date: Dayjs) => void;
  selectedStart: Dayjs | null;
  selectedEnd: Dayjs | null;
}) => {
  const firstDay = dayjs(new Date(year, month, 1));
  const daysInMonth = firstDay.daysInMonth();
  const startDow = firstDay.day(); // 0=Sun

  const cells: (Dayjs | null)[] = [
    ...new Array(startDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => firstDay.add(i, "day")),
  ];

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const getBlockForDate = (date: Dayjs): BlockedRangeDTO | undefined => {
    return blocked.find((b) =>
      date.isBetween(
        dayjs(b.start),
        dayjs(b.end).subtract(1, "day"),
        "day",
        "[]",
      ),
    );
  };

  const isSelected = (date: Dayjs) => {
    if (!selectedStart) return false;
    if (!selectedEnd) return date.isSame(selectedStart, "day");
    return date.isBetween(selectedStart, selectedEnd, "day", "[]");
  };

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <Box>
      {/* Day headers */}
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", mb: 0.5 }}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <Typography
            key={d}
            sx={{ textAlign: "center", fontWeight: 700, py: 0.5 }}
          >
            {d}
          </Typography>
        ))}
      </Box>

      {weeks.map((week, wi) => (
        <Box
          key={wi}
          sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
        >
          {week.map((date, di) => {
            if (!date) return <Box key={di} />;

            const block = getBlockForDate(date);
            const selected = isSelected(date);
            const isPast = date.isBefore(dayjs(), "day");
            const isToday = date.isSame(dayjs(), "day");

            return (
              <Tooltip
                key={di}
                title={block ? `${block.label} (${block.source})` : ""}
                placement="top"
                arrow
              >
                <Box
                  onClick={() => !isPast && onDateClick(date)}
                  sx={{
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 0.2,
                    cursor: isPast ? "default" : "pointer",
                    fontWeight: isToday ? 800 : 400,
                    color: selected
                      ? "#fff"
                      : block
                        ? "#fff"
                        : isPast
                          ? "text.disabled"
                          : "text.primary",
                    bgcolor: selected
                      ? "primary.main"
                      : block
                        ? getBlockColor(block.type)
                        : "transparent",
                    border:
                      isToday && !block && !selected ? "1.5px solid" : "none",
                    borderColor: "primary.main",
                    "&:hover":
                      !isPast && !block
                        ? {
                            bgcolor: "action.hover",
                          }
                        : {},
                  }}
                >
                  {date.date()}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

// ── Main page ─────────────────────────────────────────────────────

const AdminCalendarPage = () => {
  const [selectedProp, setSelectedProp] = useState<string>("");
  const [calendarData, setCalendarData] = useState<UnitCalendarDTO[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(dayjs().month());
  const [year, setYear] = useState(dayjs().year());

  // Block modal
  const [blockOpen, setBlockOpen] = useState(false);
  const [selStart, setSelStart] = useState<Dayjs | null>(null);
  const [selEnd, setSelEnd] = useState<Dayjs | null>(null);
  const [guestName, setGuestName] = useState("");
  const [notes, setNotes] = useState("");
  const [blocking, setBlocking] = useState(false);

  // iCal modal
  const [icalOpen, setIcalOpen] = useState(false);
  const [feedSources, setFeedSources] = useState<FeedSourceDTO[]>([]);
  const [newSourceName, setNewSourceName] = useState("");
  const [newSourceUrl, setNewSourceUrl] = useState("");
  const [addingSource, setAddingSource] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Error
  const [error, setError] = useState<string | null>(null);

  const { properties } = usePropertyStore();

  // Load calendar data when property changes
  useEffect(() => {
    if (!selectedProp) return;
    setLoading(true);
    setCalendarData([]);
    setSelectedUnit("");
    calendarService
      .getCalendarData(selectedProp)
      .then((data) => {
        setCalendarData(data);
        if (data.length > 0) setSelectedUnit(data[0].unit_id);
      })
      .catch(() => setError("Failed to load calendar"))
      .finally(() => setLoading(false));
  }, [selectedProp]);

  const refreshCalendar = () => {
    if (!selectedProp) return;
    setLoading(true);
    calendarService
      .getCalendarData(selectedProp)
      .then(setCalendarData)
      .catch(() => setError("Failed to refresh"))
      .finally(() => setLoading(false));
  };

  const currentUnit = calendarData.find((u) => u.unit_id === selectedUnit);

  // Date click — select range
  const handleDateClick = (date: Dayjs) => {
    if (!selStart || (selStart && selEnd)) {
      setSelStart(date);
      setSelEnd(null);
    } else {
      if (date.isBefore(selStart)) {
        setSelEnd(selStart);
        setSelStart(date);
      } else {
        setSelEnd(date);
      }
      setBlockOpen(true);
    }
  };

  // Create block
  const handleCreateBlock = async () => {
    if (!selStart || !selEnd || !selectedUnit) return;
    setBlocking(true);
    try {
      await calendarService.createBlock({
        unit_id: selectedUnit,
        property_id: selectedProp,
        start_date: selStart.format("YYYY-MM-DD"),
        end_date: selEnd.add(1, "day").format("YYYY-MM-DD"),
        guest_name: guestName || null,
        notes: notes || null,
      });
      setBlockOpen(false);
      setSelStart(null);
      setSelEnd(null);
      setGuestName("");
      setNotes("");
      refreshCalendar();
    } catch {
      setError("Failed to create block");
    } finally {
      setBlocking(false);
    }
  };

  // Delete block
  const handleDeleteBlock = async (id: string) => {
    try {
      await calendarService.deleteBlock(id);
      refreshCalendar();
    } catch {
      setError("Failed to delete block");
    }
  };

  // Load feed sources
  const loadFeedSources = async () => {
    if (!selectedUnit) return;
    calendarService.getSources(selectedUnit).then((res) => {
      setFeedSources(res);
    });
  };

  const handleOpenIcal = () => {
    loadFeedSources();
    setIcalOpen(true);
  };

  // Add feed source
  const handleAddSource = async () => {
    if (!newSourceName || !newSourceUrl || !selectedUnit) return;
    setAddingSource(true);
    try {
      await calendarService.addSource({
        unit_id: selectedUnit,
        source_name: newSourceName,
        ical_url: newSourceUrl,
      });
      setNewSourceName("");
      setNewSourceUrl("");
      loadFeedSources();
      refreshCalendar();
    } catch {
      setError("Failed to add source");
    } finally {
      setAddingSource(false);
    }
  };

  // Delete feed source
  const handleDeleteSource = async (id: string) => {
    await calendarService.deleteSource(id);
    loadFeedSources();
    refreshCalendar();
  };

  // Manual sync
  const handleSync = async () => {
    if (!selectedUnit) return;
    setSyncing(true);
    try {
      await calendarService.syncUnit(selectedUnit);
      loadFeedSources();
      refreshCalendar();
    } catch {
      setError("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  // Manual blocks for selected unit (for list view)
  const manualBlocks =
    currentUnit?.blocked.filter((b) => b.type === "manual") ?? [];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
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
            Calendar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage availability and sync external calendars
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshOutlined />}
            onClick={refreshCalendar}
            sx={{ borderRadius: 0.2 }}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<LinkOutlined />}
            onClick={handleOpenIcal}
            disabled={!selectedUnit}
            sx={{ borderRadius: 0.2 }}
          >
            iCal Sync
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Property + Unit selectors */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Property</InputLabel>
          <Select
            value={selectedProp}
            label="Property"
            onChange={(e) => setSelectedProp(e.target.value)}
          >
            {properties.map((p) => (
              <MenuItem key={p.property_id} value={p.property_id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Unit</InputLabel>
          <Select
            value={selectedUnit}
            label="Unit"
            onChange={(e) => setSelectedUnit(e.target.value)}
            disabled={calendarData.length === 0}
          >
            {calendarData.map((u) => (
              <MenuItem key={u.unit_id} value={u.unit_id}>
                {u.title} ({u.unit_type})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 320px" },
            gap: 3,
          }}
        >
          {/* Calendar */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 0.2,
            }}
          >
            {/* Month nav */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <IconButton size="small" onClick={prevMonth}>
                <ChevronLeftOutlined />
              </IconButton>
              <Typography variant="subtitle1" fontWeight={700}>
                {dayjs(new Date(year, month)).format("MMMM YYYY")}
              </Typography>
              <IconButton size="small" onClick={nextMonth}>
                <ChevronRightOutlined />
              </IconButton>
            </Box>

            {currentUnit ? (
              <MiniCalendar
                month={month}
                year={year}
                blocked={currentUnit.blocked}
                onDateClick={handleDateClick}
                selectedStart={selStart}
                selectedEnd={selEnd}
              />
            ) : (
              <Typography color="text.secondary" textAlign="center" py={4}>
                Select a unit to view calendar
              </Typography>
            )}

            {/* Selection hint */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1.5, textAlign: "center" }}
            >
              {!selStart
                ? "Click a date to start selecting a range to block"
                : !selEnd
                  ? `Start: ${selStart.format("DD MMM")} — click end date`
                  : `${selStart.format("DD MMM")} – ${selEnd.format("DD MMM")}`}
            </Typography>

            {/* Legend */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {LEGEND.map((l) => (
                <Box
                  key={l.type}
                  sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: 0.5,
                      bgcolor: l.color,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {l.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Right panel */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<AddOutlined />}
              onClick={() => {
                setSelStart(null);
                setSelEnd(null);
                setBlockOpen(true);
              }}
              disabled={!selectedUnit}
              sx={{ borderRadius: 0.2, fontWeight: 700 }}
            >
              Block Dates
            </Button>

            {selectedUnit && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 0.2,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={700}
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    display: "block",
                    mb: 1,
                  }}
                >
                  Your iCal Feed URL
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    wordBreak: "break-all",
                    bgcolor: "action.hover",
                    p: 1,
                    borderRadius: 0.2,
                    fontFamily: "monospace",
                  }}
                >
                  {`${process.env.NEXT_PUBLIC_API_BASE_URL}/calendar/feed/${selectedUnit}/calendar.ics`}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.75 }}
                >
                  Add this URL to Airbnb / MakeMyTrip / Booking.com to sync your
                  availability.
                </Typography>
              </Paper>
            )}

            {/* Manual blocks list */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0.2,
                flex: 1,
              }}
            >
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                Manual Blocks
              </Typography>
              {manualBlocks.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No manual blocks
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {manualBlocks.map((b, i) => (
                    <Box
                      key={b.id ?? i}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        p: 1.25,
                        borderRadius: 0.2,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {b.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {dayjs(b.start).format("DD MMM")} –{" "}
                          {dayjs(b.end)
                            .subtract(1, "day")
                            .format("DD MMM YYYY")}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => b.id && handleDeleteBlock(b.id)}
                      >
                        <DeleteOutlined sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      )}

      {/* ── Block date modal ── */}
      <Dialog
        open={blockOpen}
        onClose={() => !blocking && setBlockOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 0.2, backgroundImage: "none" } },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={700}>
            Block Dates
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <TextField
                label="Start date"
                type="date"
                size="small"
                fullWidth
                value={selStart?.format("YYYY-MM-DD") ?? ""}
                onChange={(e) => setSelStart(dayjs(e.target.value))}
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="End date"
                type="date"
                size="small"
                fullWidth
                value={selEnd?.format("YYYY-MM-DD") ?? ""}
                onChange={(e) => setSelEnd(dayjs(e.target.value))}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
            <TextField
              label="Guest name (optional)"
              size="small"
              fullWidth
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
            />
            <TextField
              label="Notes (optional)"
              size="small"
              fullWidth
              multiline
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Offline booking via phone, walk-in etc."
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => setBlockOpen(false)}
            disabled={blocking}
            sx={{ borderRadius: 0.2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateBlock}
            disabled={!selStart || !selEnd || blocking}
            startIcon={
              blocking ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <AddOutlined />
              )
            }
            sx={{ borderRadius: 0.2, fontWeight: 700 }}
          >
            {blocking ? "Blocking..." : "Block Dates"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── iCal sync modal ── */}
      <Dialog
        open={icalOpen}
        onClose={() => setIcalOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 0.2, backgroundImage: "none" } },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              iCal Sync
            </Typography>
            <Button
              size="small"
              startIcon={
                syncing ? <CircularProgress size={14} /> : <SyncOutlined />
              }
              onClick={handleSync}
              disabled={syncing}
            >
              {syncing ? "Syncing..." : "Sync Now"}
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {feedSources.length > 0 && (
              <Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                  Connected Feeds
                </Typography>
                {feedSources.map((s) => (
                  <Box
                    key={s.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.5,
                      mb: 1,
                      borderRadius: 0.2,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {s.source_name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ wordBreak: "break-all" }}
                      >
                        {s.ical_url.slice(0, 50)}...
                      </Typography>
                      {s.last_synced_at && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          Last synced:{" "}
                          {dayjs(s.last_synced_at).format("DD MMM, HH:mm")}
                        </Typography>
                      )}
                    </Box>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteSource(s.id)}
                    >
                      <DeleteOutlined sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            <Divider />

            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                Add iCal Feed
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <TextField
                  label="Source name"
                  size="small"
                  fullWidth
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  placeholder="e.g. Airbnb, MakeMyTrip, Booking.com"
                />
                <TextField
                  label="iCal URL"
                  size="small"
                  fullWidth
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                  placeholder="https://www.airbnb.com/calendar/ical/..."
                />
                <Button
                  variant="contained"
                  onClick={handleAddSource}
                  disabled={!newSourceName || !newSourceUrl || addingSource}
                  startIcon={
                    addingSource ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      <AddOutlined />
                    )
                  }
                  sx={{
                    borderRadius: 0.2,
                    fontWeight: 700,
                    alignSelf: "flex-start",
                  }}
                >
                  {addingSource ? "Adding..." : "Add & Sync"}
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setIcalOpen(false)} sx={{ borderRadius: 0.2 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCalendarPage;
