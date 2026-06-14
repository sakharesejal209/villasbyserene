// src/app/home/components/HeroSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "@mui/material";
import SearchBox from "../searchBox";

// Trust stats shown below search
const TRUST_STATS = [
  { value: "200+", label: "Happy Guests" },
  { value: "4.7★", label: "Avg Rating" },
  { value: "₹0", label: "Hidden Fees" },
];

export const HeroSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax — video moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.8;
  }, []);

  return (
    // <section className="flex justify-center items-center w-screen h-screen">
    //   <div className="absolute inset-0">
    //     <video
    //       ref={videoRef}
    //       autoPlay
    //       loop
    //       muted
    //       playsInline
    //       style={{
    //         position: "absolute",
    //         width: "100%",
    //         height: "100%",
    //         objectFit: "cover",
    //         filter: isDark ? "brightness(0.47)" : "brightness(0.60)",
    //         top: 0,
    //         left: 0,
    //         zIndex: -1,
    //       }}
    //     >
    //       <source src="/assets/herovideo.webm" type="video/webm" />
    //     </video>
    //   </div>
    //   <div className="p-4 md:p-0 slide-bottom w-full md:w-[70%] mx-auto">
    //     <div className="text-white">
    //       <Typography variant="h2">PLAN YOUR</Typography>
    //       <Typography variant="h2">PERFECT GETAWAY!</Typography>
    //     </div>
    //     <SearchBox />

    //     {/* Trust bar */}
    //     <div
    //       style={{
    //         display: "flex",
    //         gap: "8px",
    //         marginTop: "16px",
    //         paddingLeft: "8px",
    //         paddingRight: "8px",
    //       }}
    //     >
    //       {TRUST_STATS.map((stat, i) => (
    //         <div
    //           key={stat.label}
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //             gap: "6px",
    //             background: "rgba(255,255,255,0.12)",
    //             backdropFilter: "blur(8px)",
    //             border: "1px solid rgba(255,255,255,0.2)",
    //             borderRadius: "999px",
    //             padding: "4px 12px",
    //           }}
    //         >
    //           <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>
    //             {stat.value}
    //           </span>
    //           <span
    //             style={{
    //               color: "rgba(255,255,255,0.75)",
    //               fontSize: 12,
    //             }}
    //           >
    //             {stat.label}
    //           </span>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
    <section
      ref={heroRef}
      style={{ position: "relative", height: "100svh", overflow: "hidden" }}
    >
      {/* Parallax video layer */}
      <div style={{ position: "absolute", inset: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "115%",
            objectFit: "cover",
            filter: isDark ? "brightness(0.4)" : "brightness(0.5)",
            top: 0,
            left: 0,
          }}
        >
          <source src="/assets/herovideo.webm" type="video/webm" />
        </video>
      </div>

      {/* Content — parallax + fade on scroll */}
      <motion.div
        style={{
          y: contentY,
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div style={{ width: "100%", padding: "0 16px" }}>
          <div className="w-full md:w-[70%] mx-auto">
            {/* Headline — staggered entrance */}
            <motion.div
              initial={{ opacity: 1, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <Typography
                variant="h2"
                sx={{ color: "#fff", lineHeight: 1.1, mb: 0.5 }}
              >
                PLAN YOUR
              </Typography>
              <Typography
                variant="h2"
                sx={{ color: "#fff", lineHeight: 1.1, mb: 3 }}
              >
                PERFECT GETAWAY!
              </Typography>
            </motion.div>

            {/* Search box */}
            <motion.div
              initial={{ opacity: 1, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35,
              }}
            >
              <SearchBox />
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "16px",
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
            >
              {TRUST_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 1, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "999px",
                    padding: "4px 12px",
                  }}
                >
                  <span
                    style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 12,
                    }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
