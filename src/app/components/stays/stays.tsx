"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Card,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PeopleAltOutlined as PeopleIcon,
  BedOutlined as BedIcon,
  HouseOutlined as HouseIcon,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { startCase, camelCase } from "lodash";

import { Carousel, EmptyState } from "@/application/default";

import { useRouter } from "next/navigation";
import PropertyDTO from "@/types/property-dto";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import propertyThemeMap from "@/lib/property-theme-config/propertyThemeConfig";
import Link from "next/link";

type StaysPropType = {
  location: string;
  propertiesData: PropertyDTO[];
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

const Stays = (props: StaysPropType) => {
  const { location, propertiesData } = props;

  useEffect(() => {
    console.log("propertiesData:", propertiesData);
  }, [propertiesData]);

  const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});
  const router = useRouter();
  const theme = useTheme();

  const toPascalCase = (str: string) =>
    startCase(camelCase(str)).replaceAll(' ', "");

  function slugify(str: string) {
    return str.toLowerCase().replaceAll(/\s+/g, "-");
  }
  const handleSelect = (property: PropertyDTO) => {
    const slug = slugify(property.name);
    router.push(`/property/${slug}-${property.property_id}`);
  };

  const handleImageLoad = (idx: number, img: HTMLImageElement) => {
    const ratio = img.naturalWidth / img.naturalHeight;
    setFits((prev) => ({
      ...prev,
      [idx]: ratio < 1 ? "contain" : "cover",
    }));
  };

  return (
    <div className="col-span-12 md:col-span-9 w-full px-4">
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
          <Typography variant="h4" className="!my-4 md:!my-6">
            {location === "all"
              ? "All Properties"
              : `Properties in ${toPascalCase(location)}`}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
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
                <div>
                  <Carousel slidesPerView={1}>
                    <>
                      {item.PropertyImage.filter(
                        (img) => img.is_carousel_image === "true"
                      )
                        .sort(
                          (a, b) =>
                            (a.display_order ?? 0) - (b.display_order ?? 0)
                        )
                        .map((e, idx) => (
                          <SwiperSlide
                            key={idx}
                            className="hover:cursor-pointer"
                          >
                            <div className="relative w-full h-full md:aspect-[5.5/3] aspect-[16/9]">
                              <Image
                                className="transition-transform duration-250 group-hover:scale-105"
                                src={e.image != null ? e.image.image_url : ""}
                                alt={
                                  e.image != null
                                    ? e.image.image_alt || ""
                                    : "alt text"
                                }
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
                <div className="flex flex-col justify-center p-4">
                  <Typography
                    color={
                      theme.palette.mode == "light" ? "primary" : "secondary"
                    }
                    variant="h6"
                    className="hover:cursor-pointer select-none"
                  >
                    {item.name}
                  </Typography>
                  <Typography color="">
                    {item.area}, {item.state}, {item.country}
                  </Typography>
                  <div className="flex items-center gap-3 mt-4 mb-1 flex-wrap-reverse">
                    <div className="flex items-center gap-1">
                      <PeopleIcon
                        sx={{
                          color: theme.palette.grey[100],
                        }}
                      />
                      <Typography
                        sx={{
                          color: theme.palette.grey[100],
                        }}
                      >
                        {item.maxcapacity}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-1">
                      <BedIcon
                        sx={{
                          color: theme.palette.grey[100],
                        }}
                      />
                      <Typography
                        sx={{
                          color: theme.palette.grey[100],
                        }}
                      >
                        {item.bedroomcount}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-1">
                      <HouseIcon
                        sx={{
                          color: theme.palette.grey[100],
                        }}
                      />
                      <Typography
                        sx={{
                          color: theme.palette.grey[100],
                        }}
                      >
                        {getAccomodation(item.accommodationType)}
                      </Typography>
                    </div>
                  </div>
                  <Divider />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.themes
                      .filter((item) => item.theme.theme_id != "entireHome")
                      .map((item) => (
                        <Box
                          key={item.theme_id}
                          sx={{
                            fontWeight: "600",
                            textAlign: "center",
                          }}
                          className="flex gap-3"
                        >
                          <Typography
                            sx={{
                              background: theme.palette.grey[300],
                              paddingX: "8px",
                              borderRadius: "999px",
                            }}
                            variant="caption"
                            className="!font-[400]"
                          >
                            {propertyThemeMap[item.theme.theme_id].label}
                          </Typography>
                        </Box>
                      ))}
                  </div>
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
