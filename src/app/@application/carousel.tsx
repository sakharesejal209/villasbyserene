"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import { Box, useTheme } from "@mui/material";

type ImageType = {
  src: string;
  alt: string;
};

type CarouselPropType = {
  images: ImageType[];
  initialSlide?: number;
};

const Carousel: React.FC<CarouselPropType> = (props) => {
  const { images, initialSlide = 0 } = props;
  const theme = useTheme();

  const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});

  const handleImageLoad = (idx: number, img: HTMLImageElement) => {
    const ratio = img.naturalWidth / img.naturalHeight;
    setFits((prev) => ({
      ...prev,
      [idx]: ratio < 1 ? "contain" : "cover", // portrait => contain
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "16 / 9",
        "& .swiper-pagination-bullet": {
          backgroundColor: "rgba(255,255,255,0.5)",
          opacity: 1,
          width: 8,
          height: 8,
          [theme.breakpoints.down("md")]: {
            width: 5,
            height: 5,
            "&::after": {
              fontSize: "5px",
            },
          },
        },
        "& .swiper-pagination-bullet-active": {
          backgroundColor: "#ffffff",
        },
        "& .swiper-button-next, & .swiper-button-prev": {
          color: "#ffffff",
          opacity: 0.8,
          transition: "opacity 0.3s ease",
          width: 24,
          height: 24,
          "&::after": {
            fontSize: "24px",
          },
          [theme.breakpoints.down("md")]: {
            width: 12,
            height: 12,
            "&::after": {
              fontSize: "12px",
            },
          },
        },
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        slidesPerView={1}
        pagination={{
          clickable: true,
          // dynamicBullets: true,
          // dynamicMainBullets: 4,
        }}
        navigation
        keyboard
        loop
        initialSlide={initialSlide}
        style={{
          // width: "100%",
          aspectRatio: "16/9",
          borderRadius: "8px",
        }}
      >
        {images.map(({ src, alt }, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={src}
              alt={alt}
              fill
              style={{
                objectFit: fits[idx] || "cover",
                objectPosition: "center",
              }}
              onLoadingComplete={(img) => handleImageLoad(idx, img)}
              sizes="100vw"
              priority={idx === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Carousel;
