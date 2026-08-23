// src/app/home/components/FeaturedVillas.tsx
// NEW SECTION — highest conversion impact
// Shows bookable villa cards directly on homepage
"use client";

import { useCallback } from "react";
import { Box, Button, Chip, Typography, useTheme } from "@mui/material";

import {
  IoBedOutline as BedIcon,
  IoPeopleOutline as PeopleIcon,
  IoArrowForwardOutline as ArrowForwardIcon,
} from "react-icons/io5";
import { PiSwimmingPoolLight as PoolIcon } from "react-icons/pi";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { usePropertyStore } from "@/context/PropertyContext";
import { formatINR } from "@/app/components/property/BookingWidget";
import { FadeInSection } from "../home";
import Carousel from "@/application/carousel";
import { SwiperSlide } from "swiper/react";
import ReadMore from "@/application/readMore";

export const FeaturedVillas = () => {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { properties } = usePropertyStore();

  // Show first 4 properties that have direct booking enabled
  const featured = properties.filter((p) => p.booking_type === "DIRECT");

  // Fallback to any properties if none are direct
  // const display = featured.length > 0 ? featured : properties.slice(0, 4);

  function toPropertySlug(name: string, id: string): string {
    return `${name
      .toLowerCase()
      .replaceAll(/[^a-z0-9\s]/g, "")
      .replaceAll(/\s+/g, "-")
      .replaceAll(/-+/g, "-")
      .trim()}-${id.slice(0, 8)}`;
  }

  const handleNavigate = useCallback(
    (name: string, id: string) =>
      router.push(`/property/${toPropertySlug(name, id)}`),
    [router],
  );

  if (!featured.length) return null;

  return (
    <section>
      <div className="container">
        <FadeInSection>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              mb: { xs: 4, md: 5 },
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ mb: 0.75 }}>
                Our Handpicked Villas
              </Typography>
              <Typography color="text.secondary">
                Premium stays curated for unforgettable experiences
              </Typography>
            </Box>
            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push("/stays/all")}
              sx={{ flexShrink: 0 }}
            >
              View all villas
            </Button>
          </Box>
        </FadeInSection>

        <Carousel
          // autoplay={{ delay: 3200, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 8 },
            480: { slidesPerView: 3, spaceBetween: 12 },
            900: { slidesPerView: 4, spaceBetween: 16 },
          }}
          slidesPerView={4}
          spaceBetween={16}
          showDots={false}
          arrowVisibility="hover"
          // variant={"dark"}
          arrowPosition="outside"
        >
          {featured.map((property, idx) => {
            const bannerImg =
              property.carousel_images?.[0]?.image_url ??
              property.banner_image?.image_url ??
              null;
            const weekdayPrice = property.starting_price ?? null;

            return (
              <SwiperSlide key={property.property_id}>
                <motion.div
                  key={property.property_id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: idx * 0.08,
                  }}
                  whileHover={{ y: -6 }}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleNavigate(property.name, property.property_id)
                  }
                >
                  <Box
                    sx={{
                      borderRadius: 0.2,
                      border: "1px solid",
                      borderColor: "divider",
                      overflow: "hidden",
                      bgcolor: "background.paper",
                      transition: "box-shadow 0.25s",
                      "&:hover": {
                        boxShadow: isDark
                          ? "0 12px 40px rgba(0,0,0,0.5)"
                          : "0 12px 40px rgba(4,66,49,0.1)",
                      },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Image */}
                    <Box
                      sx={{
                        position: "relative",
                        aspectRatio: "4/3",
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      {bannerImg ? (
                        <Image
                          src={bannerImg}
                          alt={property.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            bgcolor: "action.hover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PoolIcon
                            fontSize={14}
                            color={theme.palette.text.disabled}
                          />
                        </Box>
                      )}

                      {/* Direct booking badge */}
                      {property.booking_type === "DIRECT" && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            bgcolor: "primary.light",
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: 700,
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            letterSpacing: 0.5,
                          }}
                        >
                          INSTANT BOOK
                        </Box>
                      )}
                    </Box>

                    {/* Details */}
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        flex: 1,
                      }}
                    >
                      <Typography variant="body1" fontWeight={700} noWrap>
                        {property.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: -0.5 }}
                      >
                        {property.city}, {property.state}
                      </Typography>

                      {/* Chips */}
                      <Box
                        sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}
                      >
                        {!!property.max_capacity && (
                          <Chip
                            icon={<PeopleIcon fontSize={10} />}
                            label={`${property.max_capacity} guests`}
                            size="small"
                            sx={{ fontSize: 11, height: 22 }}
                          />
                        )}
                        {!!property.bedroom_count && (
                          <Chip
                            icon={<BedIcon fontSize={10} />}
                            label={`${property.bedroom_count} BHK`}
                            size="small"
                            sx={{ fontSize: 11, height: 22 }}
                          />
                        )}
                      </Box>

                      {/* Price + CTA */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: "auto",
                          pt: 1,
                          borderTop: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Box sx={{ width: "100%" }}>
                          {weekdayPrice && (
                            <div className="">
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: 11 }}
                              >
                                from
                              </Typography>
                              <Typography
                                variant="body1"
                                fontWeight={800}
                                color="primary"
                                lineHeight={1.2}
                              >
                                {formatINR(weekdayPrice)}
                                <Typography
                                  component="span"
                                  variant="caption"
                                  color="text.secondary"
                                  fontWeight={400}
                                >
                                  /night
                                </Typography>
                              </Typography>
                            </div>
                          )}

                          {/* // : (
                          //   <Typography variant="body2" color="text.secondary">
                          //     Contact for pricing
                          //   </Typography>
                          // )} */}
                        </Box>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigate(property.name, property.property_id);
                          }}
                          sx={{ width: "100%", mt: "4px" }}
                        >
                          {property.booking_type === "DIRECT"
                            ? "Book Now"
                            : "Enquire"}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
};
