"use client";

import React from "react";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Box, useTheme } from "@mui/material";
import { SwiperOptions } from "swiper/types";

type CarouselPropType = {
  children: React.ReactNode;
  navigation?: boolean;
  initialSlide?: number;
  slidesPerView: number;
  showDots?: boolean;
  breakpoints?: SwiperOptions["breakpoints"];
  autoplay?: { delay: number; disableOnInteraction: boolean };
  inverseControlsColor?: boolean;
  spaceBetween?: number;
};

const Carousel: React.FC<CarouselPropType> = (props) => {
  const {
    initialSlide = 0,
    navigation = true,
    showDots = true,
    slidesPerView,
    breakpoints,
    children,
    autoplay = false,
    inverseControlsColor = false,
    spaceBetween = 15
  } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "auto",
        "& .swiper-pagination-bullet": { 
          backgroundColor: "rgba(255,255,255,0.5)",
          opacity: 1,
          width: 10,
          height: 10,
          [theme.breakpoints.down("md")]: {
            width: 7,
            height: 7,
            "&::after": {
              fontSize: "7px",
            },
          },
        },
        "& .swiper-pagination-bullet-active": {
          backgroundColor: "#ffffff",
        },
        "& .swiper-button-next, & .swiper-button-prev": {
          transition: "opacity 0.3s ease",
          zIndex: 800,
          ...(inverseControlsColor
            ? {
                color: "inherit",
                borderRadius: "50%",
                width: 32,
                height: 32,
                "&::after": {
                  fontSize: "20px",
                  fontWeight: "600",
                  zIndex: "800",
                },
              }
            : {
                color: "#ffffff",
                width: 32,
                height: 32,
                "&::after": {
                  fontSize: "20px",
                  fontWeight: "600",
                  zIndex: "800",
                },
              }),

          [theme.breakpoints.down("md")]: {
            width: 18,
            height: 18,
            "&::after": {
              fontSize: "18px",
            },
          },
        },
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Autoplay]}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        spaceBetween={spaceBetween}
        freeMode
        pagination={
          showDots
            ? {
                clickable: true,
              }
            : false
        }
        navigation={navigation}
        keyboard
        loop
        initialSlide={initialSlide}
        autoplay={autoplay}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default Carousel;
