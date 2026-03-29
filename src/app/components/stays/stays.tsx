"use client";

import { useEffect, useState } from "react";
import { Box, Card, Divider, Typography, useTheme } from "@mui/material";
import {
  PeopleAltOutlined as PeopleIcon,
  BedOutlined as BedIcon,
  HouseOutlined as HouseIcon,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { startCase, camelCase } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Carousel, EmptyState } from "@/application/default";
import { SwiperSlide } from "swiper/react";
import propertyThemeMap from "@/lib/property-theme-config/propertyThemeConfig";
import type { PropertyListItemDTO } from "@/app/@types/property/property.type";
import { BookingType } from "@/app/@types/property/property.type";
import { getCardPrice } from "@/lib/pricing.utils.ts";

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
      return "Unknown Type";
  }
};

function toPropertySlug(name: string, id: string): string {
  const cleanName = name
    .toLowerCase()
    .replaceAll(/[^a-z0-9\s]/g, "") // remove special chars
    .replaceAll(/\s+/g, "-") // spaces to hyphens
    .replaceAll(/-+/g, "-") // collapse multiple hyphens
    .trim();
  const shortId = id.slice(0, 8); // first 8 chars of UUID
  return `${cleanName}-${shortId}`;
}

const Stays = (props: StaysPropType) => {
  const { location, propertiesData } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();

  const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});

  const toPascalCase = (str: string) =>
    startCase(camelCase(str)).replaceAll(" ", "");

  const handleSelect = (property: PropertyListItemDTO) => {
    // Build clean slug URL
    const slug = toPropertySlug(property.name, property.property_id);

    // Carry checkIn/checkOut from current URL if present
    const params = new URLSearchParams();
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);

    const qs = params.toString() ? `?${params.toString()}` : "";
    router.push(`/property/${slug}${qs}`);
  };

  const handleImageLoad = (idx: number, img: HTMLImageElement) => {
    const ratio = img.naturalWidth / img.naturalHeight;
    setFits((prev) => ({ ...prev, [idx]: ratio < 1 ? "contain" : "cover" }));
  };

  return (
    <div className="col-span-12 md:col-span-9 w-full px-4 min-h-screen">
      <div className="flex items-center gap-1">
        <Typography variant="subtitle2" color="textSecondary">
          <Link href={"/"}>Home</Link>
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          <ArrowForwardIosRounded sx={{ fontSize: "16px" }} />
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {location === "all"
            ? "All Properties"
            : `Properties in ${toPascalCase(location)}`}
        </Typography>
      </div>

      {propertiesData?.length ? (
        <>
          <Typography variant="h4" className="my-4! md:my-6!">
            {location === "all"
              ? "All Properties"
              : `Properties in ${toPascalCase(location)}`}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {propertiesData.map((item) => (
              <Card
                key={item.property_id}
                sx={{
                  "&:hover": {
                    border: `1px solid ${theme.palette.primary.main}`,
                    transition: "0.25s linear",
                    cursor: "pointer",
                  },
                }}
                className="w-full flex flex-col group"
                onClick={() => handleSelect(item)}
              >
                {/* Images */}
                <div>
                  <Carousel slidesPerView={1}>
                    <>
                      {item.carousel_images.map((e, idx) => (
                        <SwiperSlide key={idx} className="hover:cursor-pointer">
                          <div className="relative w-full h-full md:aspect-[5.5/3] aspect-video">
                            <Image
                              className="transition-transform duration-250 group-hover:scale-105"
                              src={e == null ? "" : e.image_url}
                              alt={e == null ? "alt text" : e.image_alt || ""}
                              fill
                              style={{
                                objectFit: fits?.[idx] || "cover",
                                objectPosition: "center",
                              }}
                              onLoadingComplete={(img) =>
                                handleImageLoad(idx, img)
                              }
                              sizes="100vw"
                              priority={idx === 0}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </>
                  </Carousel>
                </div>

                {/* Card content */}
                <div className="flex flex-col justify-center p-4">
                  <Typography
                    color={
                      theme.palette.mode === "light" ? "primary" : "secondary"
                    }
                    variant="h6"
                    className="hover:cursor-pointer select-none"
                  >
                    {item.name}
                  </Typography>
                  <Typography>
                    {item.area}, {item.state}, {item.country}
                  </Typography>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mt-4 mb-1 flex-wrap-reverse">
                    <div className="flex items-center gap-1">
                      <PeopleIcon sx={{ color: theme.palette.grey[100] }} />
                      <Typography sx={{ color: theme.palette.grey[100] }}>
                        {item.max_capacity}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-1">
                      <BedIcon sx={{ color: theme.palette.grey[100] }} />
                      <Typography sx={{ color: theme.palette.grey[100] }}>
                        {item.bedroom_count}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-1">
                      <HouseIcon sx={{ color: theme.palette.grey[100] }} />
                      <Typography sx={{ color: theme.palette.grey[100] }}>
                        {getAccomodation(item.accommodation_type)}
                      </Typography>
                    </div>
                  </div>

                  <Divider />

                  {/* Themes */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.themes
                      .filter((t) => t.theme_id !== "entireHome")
                      .map((t) => (
                        <Box
                          key={t.theme_id}
                          sx={{ fontWeight: "600", textAlign: "center" }}
                          className="flex gap-3"
                        >
                          <Typography
                            sx={{
                              background: theme.palette.grey[500],
                              paddingX: "8px",
                              borderRadius: "999px",
                            }}
                            variant="caption"
                            className="font-normal!"
                          >
                            {propertyThemeMap[t.theme_id].label}
                          </Typography>
                        </Box>
                      ))}
                  </div>

                  {/* Price */}
                  <Divider sx={{ mt: 1.5, mb: 1 }} />
                  {(() => {
                    if (item.booking_type !== BookingType.DIRECT) {
                      return (
                        <Typography variant="body2" color="text.secondary">
                          Enquire for pricing
                        </Typography>
                      );
                    }
                    const checkIn = searchParams.get("checkIn");
                    const priceResult = getCardPrice(item, checkIn);
                    if (!priceResult) return null;
                    return (
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 0.5,
                          }}
                        >
                          {priceResult.type !== "starting" && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              From
                            </Typography>
                          )}
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            color="primary"
                          >
                            ₹{priceResult.price.toLocaleString("en-IN")}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            /night
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", lineHeight: 1.3 }}
                        >
                          {priceResult.label}
                        </Typography>
                      </Box>
                    );
                  })()}
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          message="No properties"
          description="Couldn't find properties for your search"
        />
      )}
    </div>
  );
};

export default Stays;
