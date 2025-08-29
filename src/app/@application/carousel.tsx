"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import { Box, Card, Typography, useTheme } from "@mui/material";
import NearByAttractions from "../@types/near-by-attractions-dto";
import ReadMore from "./readMore";
import { SwiperOptions } from "swiper/types";

type ImageType = {
  src: string;
  alt: string;
};

type CarouselPropType = {
  images?: ImageType[];
  nearByAttractions?: NearByAttractions[];
  initialSlide?: number;
  slidesPerView: number;
  breakpoints?: SwiperOptions["breakpoints"];
};

const Carousel: React.FC<CarouselPropType> = (props) => {
  const {
    images,
    initialSlide = 0,
    slidesPerView,
    nearByAttractions,
    breakpoints,
  } = props;
  const theme = useTheme();

  const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});

  const handleImageLoad = (idx: number, img: HTMLImageElement) => {
    const ratio = img.naturalWidth / img.naturalHeight;
    setFits((prev) => ({
      ...prev,
      [idx]: ratio < 1 ? "contain" : "cover",
    }));
  };

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
          color: "#ffffff",
          transition: "opacity 0.3s ease",
          width: 32,
          height: 32,
          "&::after": {
            fontSize: "32px",
          },
          [theme.breakpoints.down("md")]: {
            width: 24,
            height: 24,
            "&::after": {
              fontSize: "24px",
            },
          },
        },
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        spaceBetween={15}
        freeMode
        pagination={{
          clickable: true,
        }}
        navigation
        keyboard
        loop
        initialSlide={initialSlide}
      >
        {images ? (
          <>
            {images.map(({ src, alt }, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
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
                </div>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {nearByAttractions?.map((item) => (
              <SwiperSlide key={item.attraction_id}>
                <Card>
                  <div className="h-[300px] md:h-[400px]">
                    <div className="relative flex h-[50%]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                    <div className="m-4 overflow-y-auto h-[43%] wrap-break-word">
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2">
                        <span className="font-bold">Distance:</span>{" "}
                        {item.distance}
                      </Typography>
                      <ReadMore
                        textVariant="body2"
                        text={item.description}
                        maxLength={80}
                      />
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
    </Box>
  );
};

export default Carousel;
