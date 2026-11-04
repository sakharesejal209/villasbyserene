"use client";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";

const PARTNERS = [
  {
    name: "Airbnb",
    dark: "/logos/airbnb.webp",
    light: "/logos/airbnb.webp",
  },
  {
    name: "MakeMyTrip",
    dark: "/logos/makemytrip-light.webp",
    light: "/logos/makemytrip-dark.webp",
  },
  {
    name: "Agoda",
    dark: "/logos/agoda-light.webp",
    light: "/logos/agoda-dark.webp",
  },
  {
    name: "Frill Hospitality",
    dark: "/logos/frill-light.webp",
    light: "/logos/frill-dark.webp",
  },
  {
    name: "Kimrica",
    dark: "/logos/kimirica-light.webp",
    light: "/logos/kimirica-dark.webp",
  },
];
// Duplicate for seamless infinite scroll
const ITEMS = [...PARTNERS, ...PARTNERS];

export function PartnerBand() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <section>
      <Box
        sx={{
          py: 2,
          overflow: "hidden",
          position: "relative",
          width: "100%",
          background: theme.palette.mode === "dark" ? "#1A1F1A" : "#FAF8F5",
        }}
      >
        {/* <div className="text-center mb-10 md:mb-12">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Also listed on
        </Typography>
      </div> */}

        {/* Scrolling track */}
        <Box sx={{ overflow: "hidden", position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              gap: 6,
              width: "max-content",
              animation: "vbs-marquee 28s linear infinite",
              "&:hover": { animationPlayState: "paused" },
              "@keyframes vbs-marquee": {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-50%)" },
              },
            }}
          >
            {ITEMS.map((p, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  width: 180,
                  height: 60,
                  // opacity: 0.7,
                  transition: "opacity 0.2s",
                  "&:hover": { cursor: "pointer" },
                }}
              >
                <Image
                  src={isDark ? p.light : p.dark}
                  alt={p.name}
                  width={180}
                  height={60}
                  style={{ objectFit: "contain", maxHeight: 60 }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </section>
  );
}
