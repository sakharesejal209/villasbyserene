"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Box,
  Drawer,
  IconButton,
  Theme,
  Typography,
} from "@mui/material";
import { IoCloseOutline as CloseIcon } from "react-icons/io5";
import SearchBox from "../searchBox";
import petFriendly from "../../../../../public/assets/pet-friendly.webp";
import family from "../../../../../public/assets/family.webp";
import bonfire from "../../../../../public/assets/bonfire.webp";
import elara from "../../../../../public/assets/elara.webp";
import poonam from "../../../../../public/assets/poonam.webp";

const HERO_SLIDES = [
  {
    img: poonam,
    name: "Navi Mumbai",
    heading: "Wake Up to the Sound of the River",
    subheading:
      "Feel the cool morning air before you even open your eyes, just the water moving past and nowhere you need to be.",
  },
  {
    img: elara,
    name: "Karjat",
    heading: "Where the Only Plan Is Bare Feet on Grass",
    subheading:
      "Feel the grass underfoot and that easy kind of laughter that only shows up when old friends have nowhere to be.",
  },
  // {
  //   img: "https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/coram8-villa%2Fcoram8-exterior5.webp?alt=media",
  //   name: "Udaipur",
  //   heading: "Salt air, sea light, and a pool all to yourself.",
  //   subheading:
  //     "Steps from the coast in Alibaug — a villa that trades noise for long, unhurried mornings.",
  // },
  // {
  //   img: petFriendly,
  //   name: "Pet Friendly",
  //   heading: "Salt air, sea light, and a pool all to yourself.",
  //   subheading:
  //     "Steps from the coast in Alibaug — a villa that trades noise for long, unhurried mornings.",
  // },
  {
    img: family,
    name: "Family",
    heading: "The View That Makes Everyone Go Quiet",
    subheading:
      "That pause in conversation when someone glances at the mountains and the whole family just sits with it, coffee in hand, in no rush to speak again.",
  },
  {
    img: bonfire,
    name: "Bonfire",
    heading: "Gather Round, Stay a While",
    subheading:
      "Feel the warmth on your face, someone hands you the guitar, and for once nobody's checking the time.",
  },
];

const HERO_LABEL = ["Karjat", "Panvel", "Navi Mumbai", "Udaipur"];

const SLIDE_INTERVAL = 6500;

export default function HeroSection({
  theme,
  isMobile,
}: Readonly<{
  theme: Theme;
  isMobile: boolean;
}>) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const CITIES = [
    "Karjat",
    "Alibaug",
    "Panvel",
    "Navi Mumbai",
    "Udaipur",
    "Lonavala",
  ];
  const [cityIndex, setCityIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const current = CITIES[cityIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 80);
      } else {
        // Pause at full word then start erasing
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, 45);
      } else {
        // Move to next city
        setCityIndex((prev) => (prev + 1) % CITIES.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, cityIndex, isMobile, CITIES]);

  return (
    <section ref={heroRef} className="p-0!">
      <div
        className={`relative h-[80vh] flex flex-col overflow-hidden`}
      >
        {/* Slide images */}
        <motion.div className="absolute inset-0 z-1" style={{ y: heroY }}>
          {HERO_SLIDES.map((slide, i) => (
            <Image
              key={slide.name}
              src={slide.img}
              alt={slide.name}
              fill
              priority={i === 0}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                opacity: i === activeSlide ? 1 : 0,
                transform: i === activeSlide ? "scale(1.06)" : "scale(1)",
                transition: "opacity 900ms ease-out, transform 8000ms ease-out",
                zIndex: i === activeSlide ? 1 : 0,
              }}
              sizes="100vw"
            />
          ))}

          {/* Gradient overlays — matching the design exactly */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(4,32,24,0.4) 0%, rgba(4,32,24,0.2) 46%, rgba(4,32,24,0.18) 100%)",
              zIndex: 2,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(4,32,24,0.6) 0%, rgba(4,32,24,0.1) 42%)",
              zIndex: 2,
            }}
          />
        </motion.div>

        <div
          className={`container flex h-full justify-center ${isMobile ? "text-center" : "text-left"}`}
        >
          {/* Hero content */}
          <motion.div
            className={`relative px-4 flex-col w-full h-full flex justify-center ${isMobile ? "items-center" : "items-start"}`}
            style={{ zIndex: 3 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
              }}
            >
              <motion.div
                key={`label-${activeSlide}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "secondary.main",
                  }}
                >
                  Handpicked villas ·{" "}
                  {HERO_LABEL[activeSlide % HERO_LABEL.length]}
                </Typography>
              </motion.div>
            </Box>

            {/* Heading — changes per slide */}
            <motion.div
              key={`heading-${activeSlide}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 32, sm: 48, md: 60 },
                  lineHeight: 1.05,
                  fontWeight: 500,
                  color: "#FFFDF7",
                  maxWidth: "18ch",
                  textWrap: "balance",
                  mb: 0,
                }}
              >
                {HERO_SLIDES[activeSlide].heading}
              </Typography>
            </motion.div>

            {/* Subheading — changes per slide */}
            <motion.div
              key={`sub-${activeSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 15, md: 17 },
                  lineHeight: 1.62,
                  color: "white",
                  maxWidth: "46ch",
                  mt: 2.5,
                }}
              >
                {HERO_SLIDES[activeSlide].subheading}
              </Typography>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="m-auto relative w-full flex justify-center z-10">
        {isMobile ? (
          <>
            {/* Animated pill */}
            <Box
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: theme.palette.background.paper,
                borderRadius: 999,
                px: 1.5,
                py: 2,
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
                width: "90%",
                height: "62px",
                marginTop: "-30px",
                transition: "transform 0.15s ease",
                "&:active": { transform: "scale(0.97)" },
              }}
            >
              {/* Search icon */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </Box>

              {/* Animated text */}
              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <Typography
                  sx={{
                    fontSize: 13.5,
                    color: "text.secondary",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Search for a property in{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      borderRight: "2px solid",
                      borderColor: "primary.main",
                      pr: 0.25,
                      animation: "blink 0.8s step-end infinite",
                      "@keyframes blink": {
                        "0%, 100%": { borderColor: "primary.main" },
                        "50%": { borderColor: "transparent" },
                      },
                    }}
                  >
                    {displayed}
                  </Box>
                </Typography>
              </Box>
            </Box>

            {/* Bottom sheet drawer */}
            <Drawer
              anchor="bottom"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: "20px 20px 0 0",
                    px: 2,
                    pt: 1,
                    pb: 1,
                    maxHeight: "90vh",
                  },
                },
              }}
            >
              {/* Drag handle */}
              <Box
                sx={{
                  width: 40,
                  height: 4,
                  bgcolor: "divider",
                  borderRadius: 999,
                  mx: "auto",
                  mb: 2,
                  mt: 1,
                }}
              />

              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Find your villa
                </Typography>
                <IconButton size="small" onClick={() => setDrawerOpen(false)}>
                  <CloseIcon size={20} />
                </IconButton>
              </Box>

              <SearchBox isMobile={isMobile} />
            </Drawer>
          </>
        ) : (
          <SearchBox isMobile={isMobile} />
        )}
      </div>
    </section>
  );
}
