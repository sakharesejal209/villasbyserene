"use client";
import { useEffect, useState } from "react";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import { IoClose as CloseIcon } from "react-icons/io5";
import Image from "next/image";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";

const PROMO_STORAGE_KEY = "vbs_diwali_promo_nov7_seen";
const OFFER_EXPIRY = "2026-11-10";

const PROPERTY_ROUTES = [/^\/property\//, /^\/checkout\//];

export default function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const onPropertyPage = PROPERTY_ROUTES.some((r) => r.test(pathname));

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
      router.push("/stays/all?checkIn=2026-11-07&checkOut=2026-11-08");
    }
  };

  if (!open) return null;

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      disableAutoFocus
      disableEnforceFocus
      slotProps={{
        paper: {
          sx: {
            borderRadius: "12px",
            overflow: "hidden",
            backgroundImage: "none",
            m: { xs: 2, sm: 3 },
          },
        },
      }}
    >
      {/* Full-bleed background image with overlay */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: "url(/promo-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: 3.5,
          pt: 5,
          pb: 4,
          // Dark overlay so text stays readable
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,8,4,0.55) 0%, rgba(10,8,4,0.70) 60%, rgba(10,8,4,0.82) 100%)",
            pointerEvents: "none",
          },
        }}
      >
        {/* Close button */}
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "rgba(255,255,255,0.7)",
            bgcolor: "rgba(0,0,0,0.25)",
            zIndex: 20,
            "&:hover": { bgcolor: "rgba(0,0,0,0.45)", color: "#fff" },
          }}
        >
          <CloseIcon size={14} />
        </IconButton>

        {/* Diwali Special Offer label */}
        <Typography
          variant="body2"
          sx={{
            // fontSize: 10,
            // fontWeight: 600,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#f0b429",
            textAlign: "center",
            mb: 1.5,
            position: "relative",
            zIndex: 5,
          }}
        >
          🪔 Diwali Special Offer 🪔
        </Typography>

        {/* Thin gold divider */}
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
          }}
        >
          <Box
            sx={{ height: "1px", width: 32, bgcolor: "rgba(200,146,42,0.5)" }}
          />
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: "#c8922a",
              mx: 1,
            }}
          />
          <Box
            sx={{ height: "1px", width: 32, bgcolor: "rgba(200,146,42,0.5)" }}
          />
        </Box>

        {/* 20% OFF */}
        <Typography
          sx={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: { xs: 56, sm: 64 },
            fontWeight: 700,
            lineHeight: 1,
            color: "#fde68a",
            textAlign: "center",
            textShadow: "0 2px 32px rgba(240,180,41,0.4)",
            position: "relative",
            zIndex: 5,
          }}
        >
          20% OFF
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 17,
            fontStyle: "italic",
            color: "rgba(253,230,138,0.8)",
            textAlign: "center",
            mt: 0.5,
            mb: 3,
            position: "relative",
            zIndex: 5,
          }}
        >
          on your villa stay
        </Typography>

        {/* Thin gold divider */}
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{ height: "1px", width: 48, bgcolor: "rgba(200,146,42,0.4)" }}
          />
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: "#c8922a",
              mx: 1,
            }}
          />
          <Box
            sx={{ height: "1px", width: 48, bgcolor: "rgba(200,146,42,0.4)" }}
          />
        </Box>

        {/* Book for dates */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            color: "#fff",
            mb: 0.5,
            position: "relative",
            zIndex: 5,
          }}
        >
          Book for 7-10 November 2026
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            mb: 3,
            position: "relative",
            zIndex: 5,
          }}
        >
          One-time use per guest. Apply at checkout.
        </Typography>

        {/* Coupon code box */}
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1.5px dashed rgba(200,146,42,0.7)",
            borderRadius: "6px",
            px: { xs: 1.5, sm: 2.5 },
            py: 1.5,
            mb: 2,
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 13, sm: 16 },
              fontWeight: 700,
              letterSpacing: "3px",
              color: "#fde68a",
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
              minWidth: 64,
              fontWeight: 600,
              borderRadius: "4px",
              borderColor: copied ? "#4ade80" : "rgba(255,255,255,0.5)",
              color: copied ? "#4ade80" : "rgba(255,255,255,0.85)",
              "&:hover": {
                borderColor: copied ? "#4ade80" : "#fff",
                background: "rgba(255,255,255,0.08)",
              },
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </Box>

        {/* CTA */}
        <Box sx={{ position: "relative", zIndex: 5 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleCta}
            sx={{
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: 16,
              mb: 2,
              py: 1.5,
              background:
                "linear-gradient(135deg, #c8922a, #f0b429 50%, #c8922a)",
              color: "#1a0c00",
              boxShadow: "0 4px 20px rgba(200,146,42,0.4)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #b07c20, #d9a020 50%, #b07c20)",
                boxShadow: "0 4px 24px rgba(200,146,42,0.5)",
              },
            }}
          >
            {onPropertyPage ? "Got It, Apply at Checkout" : "Browse Villas"}
          </Button>

          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.45)",
              display: "block",
              textAlign: "center",
            }}
          >
            Valid check-in dates: 7-10 Nov 2026 only · 1 use per user
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
}
