"use client";
import { useEffect, useState } from "react";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import { IoClose as CloseIcon } from "react-icons/io5";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const PROMO_STORAGE_KEY = "vbs_diwali_promo_nov7_seen";
const OFFER_EXPIRY = "2026-11-10";

const sparkles = [
  {
    left: "12%",
    top: "20%",
    size: "5px",
    dur: "2.4s",
    delay: "0s",
    color: "#ffd060",
  },
  {
    left: "25%",
    top: "60%",
    size: "3px",
    dur: "3.1s",
    delay: "0.4s",
    color: "#e05a0a",
  },
  {
    left: "40%",
    top: "15%",
    size: "6px",
    dur: "2.7s",
    delay: "0.8s",
    color: "#ffd060",
  },
  {
    left: "55%",
    top: "70%",
    size: "4px",
    dur: "3.4s",
    delay: "0.2s",
    color: "#f0b429",
  },
  {
    left: "68%",
    top: "30%",
    size: "3px",
    dur: "2.2s",
    delay: "1.1s",
    color: "#e05a0a",
  },
  {
    left: "80%",
    top: "55%",
    size: "5px",
    dur: "2.9s",
    delay: "0.6s",
    color: "#ffd060",
  },
  {
    left: "88%",
    top: "18%",
    size: "4px",
    dur: "3.2s",
    delay: "0.3s",
    color: "#f0b429",
  },
  {
    left: "20%",
    top: "80%",
    size: "3px",
    dur: "2.6s",
    delay: "1.4s",
    color: "#ffd060",
  },
  {
    left: "72%",
    top: "78%",
    size: "5px",
    dur: "2.0s",
    delay: "0.9s",
    color: "#e05a0a",
  },
  {
    left: "48%",
    top: "45%",
    size: "3px",
    dur: "3.6s",
    delay: "0.5s",
    color: "#ffd060",
  },
];

interface PromoPopupProps {
  /** Pass true when rendered on a property/booking page — hides the "Browse Villas" nav and just closes the popup instead */
  onPropertyPage?: boolean;
}

export default function PromoPopup({
  onPropertyPage = false,
}: PromoPopupProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (dayjs().isAfter(dayjs(OFFER_EXPIRY).endOf("day"))) return;

    const t = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("SERENEDIWALI20").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCta = () => {
    handleClose();
    if (!onPropertyPage) {
      router.push("/stays/all?&checkIn=2026-11-07&checkOut=2026-11-08");
    }
    // on property page: just close — user already has a property selected
  };

  if (!open) return null;

  return (
    <>
      {/* CSS keyframes injected once */}
      <style>{`
        @keyframes vbs-sparkle {
          0%   { opacity: 0; transform: scale(0) translate(0, 0); }
          25%  { opacity: 1; transform: scale(1) translate(0, 0); }
          75%  { opacity: 0.5; transform: scale(0.7) translate(var(--tx), var(--ty)); }
          100% { opacity: 0; transform: scale(0) translate(var(--tx), var(--ty)); }
        }
        @keyframes vbs-diya-glow {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(240,140,20,0.5)); }
          40%       { filter: drop-shadow(0 0 16px rgba(255,180,30,0.9)); }
          60%       { filter: drop-shadow(0 0 4px rgba(220,100,10,0.4)); }
        }
      `}</style>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        disableAutoFocus
        disableEnforceFocus
        slotProps={{
          paper: {
            sx: {
              borderRadius: "4px",
              overflow: "hidden",
              backgroundImage: "none",
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "relative",
            bgcolor: "#1c0808",
            px: 3.5,
            pt: 4,
            pb: 3.5,
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background: `
                radial-gradient(ellipse 120% 60% at 50% -10%, rgba(200,146,42,0.18) 0%, transparent 70%),
                radial-gradient(circle at 10% 90%, rgba(180,30,30,0.25) 0%, transparent 50%),
                radial-gradient(circle at 90% 90%, rgba(180,30,30,0.25) 0%, transparent 50%)
              `,
              pointerEvents: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background:
                "linear-gradient(90deg, #c8922a, #f0b429, #e05a0a, #f0b429, #c8922a)",
            },
          }}
        >
          {/* Sparkle dots — pure CSS animation */}
          {sparkles.map((s, i) => (
            <Box
              key={i}
              sx={
                {
                  position: "absolute",
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  borderRadius: "50%",
                  background: s.color,
                  pointerEvents: "none",
                  opacity: "0",
                  "--tx": `${(Math.random() - 0.5) * 20}px`,
                  "--ty": `-${10 + Math.random() * 20}px`,
                  animation: `vbs-sparkle ${s.dur} ${s.delay} ease-in-out infinite`,
                } as React.CSSProperties & Record<string, string>
              }
            />
          ))}

          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "rgba(240,210,150,0.6)",
              bgcolor: "rgba(255,255,255,0.07)",
              zIndex: 20,
              "&:hover": { bgcolor: "rgba(255,255,255,0.14)", color: "#fff" },
            }}
          >
            <CloseIcon size={14} />
          </IconButton>

          <Typography
            sx={{
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(240,180,41,0.7)",
              textAlign: "center",
              mb: 1.5,
              position: "relative",
              zIndex: 5,
            }}
            variant="body2"
          >
            🪔 Diwali Special Offer 🪔
          </Typography>

          <Typography
            component="div"
            sx={{
              textAlign: "center",
              fontSize: 28,
              lineHeight: 1,
              mb: 1,
              position: "relative",
              zIndex: 5,
              animation: "vbs-diya-glow 2.8s ease-in-out infinite",
            }}
          >
            🪔
          </Typography>

          <Typography
            sx={{
              color: "#ffd060",
              textAlign: "center",
              textShadow: "0 2px 24px rgba(240,180,41,0.35)",
              position: "relative",
              zIndex: 5,
            }}
            variant="h1"
          >
            20% OFF
          </Typography>

          <Typography
            sx={{
              fontStyle: "italic",
              color: "rgba(240,210,150,0.7)",
              textAlign: "center",
              mt: 0.5,
              position: "relative",
              zIndex: 5,
            }}
            variant="h5"
          >
            on your villa stay
          </Typography>
        </Box>

        {/* Body */}
        <Box sx={{ px: 3.5, pt: 3, pb: 3.5, bgcolor: "background.paper" }}>
          <Typography variant="h6" fontWeight={700} textAlign="center" mb={0.5}>
            Book for 7-10 November 2026
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={2.5}
          >
            One-time use per user. Apply at checkout.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "2px dashed #c8922a",
              borderRadius: "3px",
              px: { xs: 1, md: 1.5, lg: 2.5 },
              py: { xs: 1.5, md: 1.75 },
              mb: 2.5,
              background: "rgba(200,146,42,0.10) !important",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 12, md: 16, lg: 18 },
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#c8922a",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              SERENEDIWALI20
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={handleCopy}
              sx={{
                borderColor: copied ? "#16a34a" : "#c8922a",
                color: copied ? "#16a34a" : "#c8922a",
                "&:hover": {
                  borderColor: copied ? "#16a34a" : "#c8922a",
                  background: "rgba(200,146,42,0.08)",
                },
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleCta}
            sx={{
              borderRadius: "3px",
              fontWeight: 700,
              mb: 2,
              background:
                "linear-gradient(135deg, #c8922a, #f0b429 50%, #c8922a)",
              color: "#1a0c00",
              boxShadow: "none",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #b07c20, #d9a020 50%, #b07c20)",
                boxShadow: "none",
              },
            }}
          >
            {onPropertyPage ? "Got It, Apply at Checkout" : "Browse Villas"}
          </Button>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
          >
            Valid check-in dates: 7-10 Nov 2026 only · 1 use per user
          </Typography>
        </Box>
      </Dialog>
    </>
  );
}
