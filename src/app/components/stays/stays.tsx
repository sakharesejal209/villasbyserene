"use client";

import { useEffect, useState } from "react";

import { Box, Card, Divider, keyframes, Typography, useTheme } from "@mui/material";
import {
  PeopleAltOutlined as PeopleIcon,
  BedOutlined as BedIcon,
  HouseOutlined as HouseIcon,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import { startCase, camelCase } from "lodash";

import { Carousel, EmptyState } from "@/app/@application";

import { useRouter } from "next/navigation";
import PropertyDTO from "@/app/@types/property-dto";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import propertyThemeMap from "@/lib/propert-theme-config/propertyThemeConfig";
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
  const theme= useTheme();

  const toPascalCase = (str: string) =>
    startCase(camelCase(str)).replace(/ /g, "");

  function slugify(str: string) {
    return str.toLowerCase().replace(/\s+/g, "-");
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
    <div className="col-span-12 md:col-span-9 w-full md:px-4">
      <div className="flex items-center md:px-4 gap-1">
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
          <Typography variant="h4" className="!my-4 md:!my-6 md:px-4">
            {location === "all"
              ? "All Properties"
              : `Properties in ${toPascalCase(location)}`}
          </Typography>
          {propertiesData.map((item) => (
            <Card
              key={item.property_id}
              className="w-full grid grid-cols-1 my-2 md:my-4 gap-2 md:grid-cols-12"
            >
              <div className="md:col-span-5">
                <Carousel slidesPerView={1}>
                  <>
                    {item.PropertyImage.filter(
                      (img) => img.is_carousel_image === "true"
                    ).map((e, idx) => (
                      <SwiperSlide
                        key={idx}
                        className="hover:cursor-pointer"
                        onClick={() => handleSelect(item)}
                      >
                        <div className="relative w-full h-full md:aspect-[5.5/3] aspect-[16/9]">
                          <Image
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
              <div className="md:col-span-7 flex flex-col justify-center md:gap-2 p-3 md:p-7">
                <Typography
                  className="hover:cursor-pointer"
                  onClick={() => handleSelect(item)}
                  variant="h6"
                >
                  {item.name}
                </Typography>
                <Typography>
                  {item.area}, {item.state}, {item.country}
                </Typography>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <PeopleIcon />
                    <Typography>{item.maxcapacity}</Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <BedIcon />
                    <Typography>{item.bedroomcount}</Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <HouseIcon />
                    <Typography>
                      {getAccomodation(item.accommodationType)}
                    </Typography>
                  </div>
                </div>
                <Divider />
                <div className="mt-3 grid grid-cols-2 lg:grid-cols-3 w-max gap-4">
                  {item.themes
                    .filter((item) => item.theme.theme_id != "entireHome")
                    .map((item) => (
                      <Box
                        key={item.theme_id}
                        sx={{
                          background: theme.palette.grey[200],
                            // "linear-gradient(90deg, #403f3f, #433f3f, #575253)",
                          //  background:
                          //    "linear-gradient(90deg, rgb(216, 95, 109), rgb(255, 122, 140), rgb(250, 167, 176))",
                          backgroundSize: "200% 200%",
                          // color: "#fff",
                          borderRadius: "999px",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                        className="flex md:grid-cols-3 gap-3 px-2 py-0.5 !rounded-2xl reltive"
                      >
                        {/* <Image
                              src={propertyThemeMap[item.theme.theme_id].image}
                              alt={propertyThemeMap[item.theme.theme_id].label}
                              width={24}
                              height={24}
                            /> */}
                        <Typography variant="button" className="!font-[400]">
                          {propertyThemeMap[item.theme.theme_id].label}
                        </Typography>
                      </Box>
                    ))}
                </div>
              </div>
            </Card>
          ))}
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
