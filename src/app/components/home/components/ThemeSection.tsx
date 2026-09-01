// src/app/home/components/ThemeSection.tsx
"use client";

import { useCallback } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { motion } from "motion/react";
import { Carousel } from "@/application/default";
import { FadeInSection } from "../home";
import propertyThemeMap from "@/lib/property-theme-config/propertyThemeConfig";
import { usePropertyStore } from "@/context/PropertyContext";
import { ThemeDTO } from "@/app/@types";

interface Props {
  onThemeSelect: (proptheme: string) => void;
}

export const ThemeSection = ({ onThemeSelect }: Props) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const propertythemes = Object.keys(propertyThemeMap);

  return (
    <section>
      <div className="container">
        <FadeInSection>
          <div className="text-center mb-10 md:mb-12">
            <Typography variant="h4" sx={{ mb: 1 }}>
              Select your sanctuary of comfort and calm
            </Typography>
            <Typography color="text.secondary">
              Explore handpicked homes for every kind of getaway.
            </Typography>
          </div>
          <Carousel
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            breakpoints={{
              240: { slidesPerView: 2 },
              480: { slidesPerView: 3 },
              900: { slidesPerView: 5 },
            }}
            slidesPerView={5}
            spaceBetween={0}
            showDots={false}
            arrowVisibility="hidden"
          >
            <>
              {propertythemes.map((proptheme) => (
                <SwiperSlide key={propertyThemeMap[proptheme].label}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => onThemeSelect(proptheme)}
                    className="w-full flex flex-col items-center justify-center gap-0 py-2"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 52, md: 80 },
                        height: { xs: 52, md: 80 },
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={
                          isDark
                            ? propertyThemeMap[proptheme].darkImg
                            : propertyThemeMap[proptheme].lightImg
                        }
                        alt={propertyThemeMap[proptheme].label}
                        width={72}
                        height={72}
                      />
                    </Box>
                    <Typography variant="subtitle1" fontWeight={600} textAlign="center">
                      {propertyThemeMap[proptheme].label}
                    </Typography>
                    <Typography variant="body2" textAlign="center">
                      {propertyThemeMap[proptheme].subLabel}
                    </Typography>
                  </motion.button>
                </SwiperSlide>
              ))}
            </>
          </Carousel>
        </FadeInSection>
      </div>
    </section>
  );
};
