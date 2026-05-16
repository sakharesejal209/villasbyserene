"use client";

import React, { useRef, useState } from "react";
import { Swiper } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Box, IconButton, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ── Variant controls arrow/dot colors ────────────────────────────
// "light"  → dark arrows (use on light/white backgrounds)
// "dark"   → white arrows (use on dark/image backgrounds)
export type CarouselVariant = "light" | "dark";

// ── Arrow visibility modes ────────────────────────────────────────
// "always" → always visible
// "hover"  → fade in on container hover
// "hidden" → never show arrows
export type ArrowVisibility = "always" | "hover" | "hidden";

type CarouselPropType = {
  children: React.ReactNode;
  navigation?: boolean;
  initialSlide?: number;
  slidesPerView: number;
  showDots?: boolean;
  breakpoints?: SwiperOptions["breakpoints"];
  autoplay?: { delay: number; disableOnInteraction: boolean } | false;
  spaceBetween?: number;

  // ── New props ──────────────────────────────────────────────────
  variant?: CarouselVariant; // "light" | "dark"
  arrowVisibility?: ArrowVisibility; // "always" | "hover" | "hidden"

  // ── Arrow position ────────────────────────────────────────────
  // "inside"  → arrows overlap the slides (default)
  // "outside" → arrows sit outside left/right of the slides
  arrowPosition?: "inside" | "outside";

  // ── Legacy props (still supported) ────────────────────────────
  inverseControlsColor?: boolean; // legacy → maps to variant="dark"
  hideArrows?: boolean; // legacy → maps to arrowVisibility="hidden"
};

const Carousel: React.FC<CarouselPropType> = ({
  initialSlide = 0,
  navigation = true,
  showDots = true,
  slidesPerView,
  breakpoints,
  children,
  autoplay = false,
  spaceBetween = 15,
  variant,
  arrowVisibility,
  arrowPosition = "inside",
  // legacy
  inverseControlsColor = false,
  hideArrows = false,
}) => {
  const theme = useTheme();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  // ── Resolve legacy props to new system ───────────────────────
  const resolvedVariant: CarouselVariant =
    variant ?? (inverseControlsColor ? "dark" : "light");

  const resolvedArrowVisibility: ArrowVisibility =
    arrowVisibility ?? (hideArrows ? "hidden" : "always");

  // ── Colors based on variant ───────────────────────────────────
  const isDark = resolvedVariant === "dark";

  const arrowBg = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.07)";
  const arrowBgHover = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.15)";
  const arrowIconColor = isDark ? "#ffffff" : "#1a1a1a";
  const dotColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.2)";
  const dotActiveColor = isDark ? "#ffffff" : "#1a1a1a";

  // ── Arrow visibility logic ────────────────────────────────────
  const arrowsVisible =
    resolvedArrowVisibility === "hidden"
      ? false
      : resolvedArrowVisibility === "hover"
        ? hovered
        : true;

  const isOutside = arrowPosition === "outside";

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        width: "100%",
        position: "relative",
        // When outside, add horizontal padding to make room for arrows
        px:
          isOutside && navigation && resolvedArrowVisibility !== "hidden"
            ? { xs: "8px", md: "48px" }
            : 0,

        // ── Dots ────────────────────────────────────────────────
        "& .swiper-pagination": {
          bottom: showDots ? 8 : -999,
        },
        "& .swiper-pagination-bullet": {
          backgroundColor: dotColor,
          opacity: 1,
          width: 7,
          height: 7,
          transition: "background-color 0.25s, transform 0.25s",
        },
        "& .swiper-pagination-bullet-active": {
          backgroundColor: dotActiveColor,
          transform: "scale(1.3)",
        },

        // ── Hide default swiper arrows (we use custom ones) ─────
        "& .swiper-button-next, & .swiper-button-prev": {
          display: "none",
        },
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        spaceBetween={spaceBetween}
        pagination={showDots ? { clickable: true } : false}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Wire custom buttons to swiper
          if (typeof swiper.params.navigation === "object") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        keyboard
        loop
        freeMode
        initialSlide={initialSlide}
        autoplay={autoplay || false}
      >
        {children}
      </Swiper>

      {/* ── Custom prev arrow ───────────────────────────────── */}
      {navigation && resolvedArrowVisibility !== "hidden" && (
        <IconButton
          ref={prevRef}
          size="small"
          sx={{
            position: "absolute",
            left: isOutside ? { xs: 0, md: 2 } : { xs: 4, md: 8 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: arrowBg,
            backdropFilter: "blur(6px)",
            color: arrowIconColor,
            width: { xs: 32, md: 36 },
            height: { xs: 32, md: 36 },
            opacity: arrowsVisible ? 1 : 0,
            transition:
              "opacity 0.25s ease, background-color 0.2s ease, transform 0.2s ease",
            "&:hover": {
              bgcolor: arrowBgHover,
              transform: "translateY(-50%) scale(1.08)",
            },
            "& svg": {
              fontSize: { xs: 20, md: 24 },
            },
          }}
        >
          <ChevronLeft />
        </IconButton>
      )}

      {/* ── Custom next arrow ───────────────────────────────── */}
      {navigation && resolvedArrowVisibility !== "hidden" && (
        <IconButton
          ref={nextRef}
          size="small"
          sx={{
            position: "absolute",
            right: isOutside ? { xs: 0, md: 2 } : { xs: 4, md: 8 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: arrowBg,
            backdropFilter: "blur(6px)",
            color: arrowIconColor,
            width: { xs: 32, md: 36 },
            height: { xs: 32, md: 36 },
            opacity: arrowsVisible ? 1 : 0,
            transition:
              "opacity 0.25s ease, background-color 0.2s ease, transform 0.2s ease",
            "&:hover": {
              bgcolor: arrowBgHover,
              transform: "translateY(-50%) scale(1.08)",
            },
            "& svg": {
              fontSize: { xs: 20, md: 24 },
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      )}
    </Box>
  );
};

export default Carousel;
