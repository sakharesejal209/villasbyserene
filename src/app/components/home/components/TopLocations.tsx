// src/app/home/components/TopLocations.tsx
"use client";

import { Button, Typography, useTheme } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import { Carousel } from "@/application/default";
import { FadeInSection } from "../home";
import topLocations from "../data/topLocations.json";

export const TopLocations = () => {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <section>
      <div className="container">
        <FadeInSection>
          <div className="text-center mb-10 md:mb-12">
            <Typography variant="h4" sx={{ mb: 1 }}>
              Discover Our Top Locations
            </Typography>
            <Typography color="text.secondary">
              From serene beaches to mountain retreats, explore our handpicked
              destinations
            </Typography>
          </div>
          <Carousel
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 8 },
              480: { slidesPerView: 3, spaceBetween: 12 },
              900: { slidesPerView: 4, spaceBetween: 16 },
            }}
            slidesPerView={4}
            spaceBetween={16}
            showDots={false}
            arrowVisibility="hover"
            variant={isDark ? "dark" : "light"}
            arrowPosition="outside"
          >
            <>
              {topLocations.map((item) => (
                <SwiperSlide key={item.locationId}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="relative group overflow-hidden cursor-pointer"
                    style={{ borderRadius: 8 }}
                    onClick={() =>
                      router.push(`/stays/${item.locationId}?guests=2`)
                    }
                  >
                    <div className="relative aspect-4/5 overflow-hidden">
                      <Image
                        src={item.locationImg}
                        alt={item.locationId}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                        <Typography
                          variant="h6"
                          sx={{ color: "#fff", mb: { xs: 0, md: 0.5 } }}
                        >
                          {item.locationId}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.85)",
                            display: { xs: "none", md: "block" },
                          }}
                        >
                          {item.description}
                        </Typography>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </>
          </Carousel>
          <div className="flex justify-center mt-8">
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/stays/all")}
            >
              Explore All Locations
            </Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
