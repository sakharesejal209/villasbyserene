"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PeopleAltOutlined as PeopleIcon,
  BedOutlined as BedIcon,
  ArrowForwardIosRounded,
  CalendarMonthOutlined,
  WhatsApp,
} from "@mui/icons-material";
import { startCase, camelCase } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Carousel, EmptyState } from "@/application/default";
import { SwiperSlide } from "swiper/react";
import propertyThemeMap from "@/lib/property-theme-config/propertyThemeConfig";
import { getCardPrice } from "@/lib/pricing.utils.ts";
import { BookingType, PropertyListItemDTO } from "@/app/@types";
import dayjs from "dayjs";

type StaysPropType = {
  location: string;
  propertiesData: PropertyListItemDTO[];
};

export const getAccomodation = (type: string) => {
  switch (type) {
    case "ENTIRE_HOME":
      return "Entire Home";
    case "SEPARATE_ROOMS":
      return "Separate Rooms";
    case "ENTIRE_HOME_AND_SEPARATE_ROOMS":
      return "Entire Home & Separate Rooms";
    default:
      return type;
  }
};

function toPropertySlug(name: string, id: string): string {
  return `${name
    .toLowerCase()
    .replaceAll(/[^a-z0-9\s]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-")
    .trim()}-${id.slice(0, 8)}`;
}

const Stays = ({ location, propertiesData }: StaysPropType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const [fits, setFits] = useState<Record<string, "cover" | "contain">>({});

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const nights =
    checkIn && checkOut ? dayjs(checkOut).diff(dayjs(checkIn), "day") : null;

  const buildUrl = (property: PropertyListItemDTO) => {
    const slug = toPropertySlug(property.name, property.property_id);
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    return `/property/${slug}${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const toPascalCase = (str: string) =>
    startCase(camelCase(str)).replaceAll(" ", "");

  const dateLabel =
    checkIn && checkOut
      ? `${dayjs(checkIn).format("DD MMM")} – ${dayjs(checkOut).format("DD MMM")}`
      : null;

  return (
    <div className="col-span-12 md:col-span-9 w-full px-4 min-h-screen">
      {/* Breadcrumb + heading */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 2,
          mt: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="caption" color="text.secondary">
          <Link href="/">Home</Link>
        </Typography>
        <ArrowForwardIosRounded sx={{ fontSize: 10, color: "text.disabled" }} />
        <Typography variant="caption" color="text.secondary">
          {location === "all"
            ? "All Properties"
            : `Properties in ${toPascalCase(location)}`}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            {location === "all"
              ? "All Properties"
              : `Properties in ${toPascalCase(location)}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
            {propertiesData.length} propert
            {propertiesData.length === 1 ? "y" : "ies"} found
          </Typography>
        </Box>
        {dateLabel && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              px: 1.5,
              py: 0.75,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "action.hover",
            }}
          >
            <CalendarMonthOutlined
              sx={{ fontSize: 15, color: "primary.main" }}
            />
            <Typography variant="body2" fontWeight={600}>
              {dateLabel}
              {nights && ` · ${nights} night${nights !== 1 ? "s" : ""}`}
            </Typography>
          </Box>
        )}
      </Box>

      {propertiesData.length ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
            gap: 3,
          }}
        >
          {propertiesData.map((item) => {
            const isDirect = item.booking_type === BookingType.DIRECT;
            const priceResult = isDirect ? getCardPrice(item, checkIn) : null;
            const url = buildUrl(item);

            return (
              <Card
                key={item.property_id}
                elevation={0}
                onClick={() => router.push(url)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 0.2,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: `0 8px 32px ${theme.palette.primary.main}22`,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    position: "relative",
                    aspectRatio: "16/9",
                    overflow: "hidden",
                  }}
                >
                  <Carousel slidesPerView={1}>
                    <>
                      {item.carousel_images.map((e, idx) => (
                        <SwiperSlide key={idx}>
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              aspectRatio: "16/9",
                            }}
                          >
                            <Image
                              src={e?.image_url ?? ""}
                              alt={e?.image_alt ?? item.name}
                              fill
                              style={{
                                objectFit:
                                  fits[`${item.property_id}-${idx}`] ?? "cover",
                                objectPosition: "center",
                                transition: "transform 0.3s ease",
                              }}
                              onLoadingComplete={(img) => {
                                const ratio =
                                  img.naturalWidth / img.naturalHeight;
                                setFits((prev) => ({
                                  ...prev,
                                  [`${item.property_id}-${idx}`]:
                                    ratio < 1 ? "contain" : "cover",
                                }));
                              }}
                              sizes="(max-width: 600px) 100vw, 50vw"
                              priority={idx === 0}
                            />
                          </Box>
                        </SwiperSlide>
                      ))}
                    </>
                  </Carousel>
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    p: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  {/* Name + location */}
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 0.25, lineHeight: 1.3 }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5 }}
                  >
                    {item.area}, {item.state}
                  </Typography>

                  {/* Stats */}
                  <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PeopleIcon
                        sx={{ fontSize: 15, color: "text.secondary" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {item.max_capacity} guests
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <BedIcon sx={{ fontSize: 15, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        {item.bedroom_count} bedroom
                        {item.bedroom_count !== 1 ? "s" : ""}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Themes */}
                  {!!item.themes.filter((t) => t.theme_id !== "entireHome")
                    .length && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.75,
                        flexWrap: "wrap",
                        mb: 1.5,
                      }}
                    >
                      {item.themes
                        .filter((t) => t.theme_id !== "entireHome")
                        .slice(0, 3)
                        .map((t) => (
                          <Chip
                            key={t.theme_id}
                            label={
                              propertyThemeMap[t.theme_id]?.label ?? t.theme_id
                            }
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: 11, height: 22, borderRadius: 1 }}
                          />
                        ))}
                    </Box>
                  )}

                  <Box sx={{ flex: 1 }} />
                  <Divider sx={{ mb: 1.5 }} />

                  {/* Price + CTA */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    {/* Price */}
                    <Box>
                      {!isDirect ? (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={500}
                        >
                          Enquire for pricing
                        </Typography>
                      ) : priceResult ? (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 0.5,
                            }}
                          >
                            {priceResult.type === "starting" && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                From
                              </Typography>
                            )}
                            <Typography
                              variant="h6"
                              fontWeight={800}
                              color="primary"
                              lineHeight={1}
                            >
                              ₹{priceResult.price.toLocaleString("en-IN")}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              /night
                            </Typography>
                          </Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            {priceResult.label}
                          </Typography>
                        </>
                      ) : null}
                    </Box>

                    {/* CTA */}
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(url);
                      }}
                      startIcon={
                        !isDirect ? (
                          <WhatsApp sx={{ fontSize: "14px !important" }} />
                        ) : undefined
                      }
                    >
                      {isDirect ? "Book Now" : "Enquire Now"}
                    </Button>
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>
      ) : (
        <EmptyState
          message="No properties found"
          description="Try adjusting your filters or dates"
        />
      )}
    </div>
  );
};

export default Stays;
