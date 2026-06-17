// src/app/admin/ical/page.tsx
"use client";

import { useEffect, useState } from "react";
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
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import {
  IoAddOutline as AddIcon,
  IoTrashOutline as TrashIcon,
  IoSyncOutline as SyncIcon,
  IoLinkOutline as LinkIcon,
  IoCheckmarkCircleOutline as CheckIcon,
  IoCopyOutline as CopyIcon,
  IoHomeOutline as HomeIcon,
} from "react-icons/io5";

import { httpService } from "@/app/@services";
import type { AdminPropertyRowDTO } from "@/app/@types";
import dayjs from "dayjs";

const PROPERTIES_API = "/admin/properties";
const CALENDAR_API = "/calendar";

// ── Types ─────────────────────────────────────────────────────────

interface UnitOption {
  unit_id: string;
  title: string | null;
  unit_type: string;
}

interface FeedSource {
  id: string;
  unit_id: string;
  source_name: string;
  ical_url: string;
  last_synced_at: string | null;
}

const PLATFORM_OPTIONS = ["Airbnb", "MakeMyTrip", "Booking.com", "Other"];

const PLATFORM_COLORS: Record<string, string> = {
  Airbnb: "#FF5A5F",
  MakeMyTrip: "#E74C3C",
  "Booking.com": "#003580",
  Other: "#7C7670",
};

// ── Add feed dialog ──────────────────────────────────────────────

const AddFeedDialog = ({
  open,
  unitId,
  onClose,
  onAdded,
}: {
  open: boolean;
  unitId: string;
  onClose: () => void;
  onAdded: () => void;
}) => {
  const [sourceName, setSourceName] = useState("Airbnb");
  const [icalUrl, setIcalUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!icalUrl.trim()) {
      setError("Paste the iCal URL from the platform first");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await httpService().post(`${CALENDAR_API}/sources`, {
        unit_id: unitId,
        source_name: sourceName,
        ical_url: icalUrl.trim(),
      });
      setIcalUrl("");
      setSourceName("Airbnb");
      onAdded();
      onClose();
    } catch {
      setError("Failed to add feed. Check the URL and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: { sx: { borderRadius: 0.5, backgroundImage: "none" } },
      }}
    >
      <DialogTitle>
        <Typography fontWeight={700}>Connect a calendar feed</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <FormControl size="small" fullWidth>
            <InputLabel>Platform</InputLabel>
            <Select
              value={sourceName}
              label="Platform"
              onChange={(e) => setSourceName(e.target.value)}
            >
              {PLATFORM_OPTIONS.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="iCal URL"
            placeholder="https://www.airbnb.com/calendar/ical/..."
            size="small"
            fullWidth
            value={icalUrl}
            onChange={(e) => setIcalUrl(e.target.value)}
          />

          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 0.5,
              bgcolor: "action.hover",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              On Airbnb: go to your listing → Availability → Sync calendars →
              Export calendar, then copy the link shown. On MakeMyTrip, request
              the iCal export link from your account manager.
            </Typography>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          startIcon={
            saving ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <AddIcon />
            )
          }
          sx={{ borderRadius: 0.2, fontWeight: 700 }}
        >
          {saving ? "Connecting..." : "Connect"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ── Export feed copy row ─────────────────────────────────────────

const ExportUrlRow = ({ unitId }: { unitId: string }) => {
  const [copied, setCopied] = useState(false);
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://vbs-be.onrender.com";
  const exportUrl = `${baseUrl}/calendar/feed/${unitId}/calendar.ics`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 0.5,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        bgcolor: "background.paper",
      }}
    >
      <LinkIcon fontSize={16} color="text.secondary" />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary" display="block">
          Export this property&apos;s bookings to Airbnb / MakeMyTrip
        </Typography>
        <Typography
          variant="caption"
          fontFamily="monospace"
          noWrap
          display="block"
          sx={{ color: "text.primary" }}
        >
          {exportUrl}
        </Typography>
      </Box>
      <Tooltip title={copied ? "Copied!" : "Copy link"}>
        <IconButton size="small" onClick={handleCopy}>
          {copied ? (
            <CheckIcon fontSize={16} color="success" />
          ) : (
            <CopyIcon fontSize={16} />
          )}
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

// ── Feed row ──────────────────────────────────────────────────────

const FeedRow = ({
  feed,
  onDelete,
  onSync,
  syncing,
}: {
  feed: FeedSource;
  onDelete: () => void;
  onSync: () => void;
  syncing: boolean;
}) => {
  const color = PLATFORM_COLORS[feed.source_name] ?? PLATFORM_COLORS.Other;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 0.5,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: color,
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {feed.source_name[0]}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" fontWeight={700}>
          {feed.source_name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          noWrap
          display="block"
          sx={{ maxWidth: 420 }}
        >
          {feed.ical_url}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {feed.last_synced_at
            ? `Last synced ${dayjs(feed.last_synced_at).fromNow()}`
            : "Not synced yet"}
        </Typography>
      </Box>

      <Tooltip title="Sync now">
        <IconButton size="small" onClick={onSync} disabled={syncing}>
          {syncing ? (
            <CircularProgress size={16} />
          ) : (
            <SyncIcon fontSize={16} />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove feed">
        <IconButton size="small" color="error" onClick={onDelete}>
          <TrashIcon fontSize={16} />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

// ── Main page ─────────────────────────────────────────────────────

export default function ICalSyncPage() {
  const theme = useTheme();

  const [properties, setProperties] = useState<AdminPropertyRowDTO[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [units, setUnits] = useState<UnitOption[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState("");

  const [feeds, setFeeds] = useState<FeedSource[]>([]);
  const [loadingFeeds, setLoadingFeeds] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ── Load properties on mount ──────────────────────────────────
  useEffect(() => {
    httpService<AdminPropertyRowDTO[]>()
      .get(PROPERTIES_API)
      .then((res) => {
        setProperties(res);
        if (res.length) setSelectedPropertyId(res[0].property_id);
      })
      .catch(() => setError("Failed to load properties"));
  }, []);

  // ── Load units when property changes ────────────────────────
  useEffect(() => {
    if (!selectedPropertyId) return;
    httpService<{ units: UnitOption[] }>()
      .get(`${PROPERTIES_API}/${selectedPropertyId}`)
      .then((res) => {
        const unitList = res.units ?? [];
        setUnits(unitList);
        if (unitList.length) setSelectedUnitId(unitList[0].unit_id);
        else setSelectedUnitId("");
      })
      .catch(() => setError("Failed to load units for this property"));
  }, [selectedPropertyId]);

  // ── Load feeds when unit changes ────────────────────────────
  const loadFeeds = () => {
    if (!selectedUnitId) {
      setFeeds([]);
      return;
    }
    setLoadingFeeds(true);
    httpService<FeedSource[]>()
      .get(`${CALENDAR_API}/sources/${selectedUnitId}`)
      .then(setFeeds)
      .catch(() => setError("Failed to load connected feeds"))
      .finally(() => setLoadingFeeds(false));
  };

  useEffect(() => {
    loadFeeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitId]);

  const handleDelete = async (id: string) => {
    try {
      await httpService().delete(`${CALENDAR_API}/sources/${id}`);
      setSuccess("Feed removed");
      loadFeeds();
    } catch {
      setError("Failed to remove feed");
    }
  };

  const handleSync = async (unitId: string) => {
    setSyncingId(unitId);
    try {
      await httpService().post(`${CALENDAR_API}/sources/sync/${unitId}`, {});
      setSuccess("Sync complete");
      loadFeeds();
    } catch {
      setError("Sync failed — check the feed URL is still valid");
    } finally {
      setSyncingId(null);
    }
  };

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(null), 2500);
    return () => clearTimeout(t);
  }, [success]);

  const selectedUnit = units.find((u) => u.unit_id === selectedUnitId);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={800}>
          iCal Sync
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Connect Airbnb and MakeMyTrip calendars so bookings stay in sync and
          double-bookings are prevented
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}

      {/* Property + unit selector */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 0.5,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <FormControl size="small" fullWidth>
            <InputLabel>Property</InputLabel>
            <Select
              value={selectedPropertyId}
              label="Property"
              onChange={(e) => setSelectedPropertyId(e.target.value)}
            >
              {properties.map((p) => (
                <MenuItem key={p.property_id} value={p.property_id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth disabled={!units.length}>
            <InputLabel>Unit</InputLabel>
            <Select
              value={selectedUnitId}
              label="Unit"
              onChange={(e) => setSelectedUnitId(e.target.value)}
            >
              {units.map((u) => (
                <MenuItem key={u.unit_id} value={u.unit_id}>
                  {u.title ?? u.unit_type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {!selectedUnitId ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 0.5,
            border: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <HomeIcon fontSize={32} color={theme.palette.text.disabled} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Select a property and unit to manage its calendar feeds
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Export URL */}
          <Box sx={{ mb: 3 }}>
            <ExportUrlRow unitId={selectedUnitId} />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Connected feeds */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle2" fontWeight={700}>
              Connected calendars for {selectedUnit?.title ?? "this unit"}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setAddOpen(true)}
              sx={{ borderRadius: 0.2, fontWeight: 700 }}
            >
              Connect calendar
            </Button>
          </Box>

          {loadingFeeds ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={24} />
            </Box>
          ) : feeds.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 0.5,
                border: "1px dashed",
                borderColor: "divider",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No calendars connected yet. Bookings made on Airbnb or
                MakeMyTrip won&apos;t block these dates on your website until you
                connect a feed.
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {feeds.map((feed) => (
                <FeedRow
                  key={feed.id}
                  feed={feed}
                  syncing={syncingId === selectedUnitId}
                  onSync={() => handleSync(selectedUnitId)}
                  onDelete={() => handleDelete(feed.id)}
                />
              ))}
            </Box>
          )}

          <Paper
            elevation={0}
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 0.5,
              bgcolor: "action.hover",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Calendars auto-sync every hour. Use &quot;Sync now&quot; to pull the latest
              bookings immediately after making a change on Airbnb or
              MakeMyTrip.
            </Typography>
          </Paper>
        </>
      )}

      <AddFeedDialog
        open={addOpen}
        unitId={selectedUnitId}
        onClose={() => setAddOpen(false)}
        onAdded={() => {
          setSuccess("Calendar connected");
          loadFeeds();
        }}
      />
    </Box>
  );
}
