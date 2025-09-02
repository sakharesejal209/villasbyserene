"use client";

import { useEffect, useState } from "react";

import { Card, Divider, Typography, useTheme } from "@mui/material";
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
import { badScript } from "../property/Property";
import Link from "next/link";

type StaysPropType = {
  location: string;
  guests: number;
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
  const { location, guests, propertiesData } = props;

  const [filteredProperties, setFilteredProperties] = useState<PropertyDTO[]>();
  const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (location === "all") {
      const filteredProperties = propertiesData.filter(
        (property) => guests < property.maxcapacity
      );
      setFilteredProperties(filteredProperties);
    } else {
      const filteredProperties: PropertyDTO[] = propertiesData.filter(
        (property) =>
          property.area.toLowerCase() === location &&
          guests < property.maxcapacity
      );
      setFilteredProperties(filteredProperties);
    }
  }, [guests, location, propertiesData]);

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
    <>
      <section>
        <div className="container">
          {filteredProperties?.length ? (
            <>
              <div className="flex items-center px-4 gap-1">
                <Typography variant="subtitle2" color="textSecondary">
                  <Link href={"/"}>Home</Link>
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  <ArrowForwardIosRounded sx={{fontSize: '16px'}} />
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Properties in {toPascalCase(location)}
                </Typography>
              </div>
              <Typography variant="h4" className="my-4 md:px-4 pt-4">
                {location === "all"
                  ? "All Properties"
                  : `Properties in ${toPascalCase(location)}`}
              </Typography>
              {filteredProperties.map((item) => (
                <div
                  key={item.property_id}
                  className="w-full grid grid-cols-1 mb-8 gap-2 md:mb-4 md:grid-cols-12 md:gap-10 md:p-4"
                >
                  <div className="md:col-span-6">
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
                            <div className="relative w-full aspect-[5/3.5] sm:aspect-[16/9] overflow-hidden">
                              <Image
                                src={e.image.image_url}
                                alt={e.image.image_alt}
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
                  <div className="md:col-span-6 flex flex-col justify-center md:gap-2">
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
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {item.themes
                        .filter((item) => item.theme.theme_id != "entireHome")
                        .map((item) => (
                          <Card
                            key={item.theme_id}
                            sx={{
                              backgroundColor: theme.palette.secondary.light,
                            }}
                            className="flex items-center gap-3 p-2 !rounded-lg reltive"
                          >
                            <Image
                              src={propertyThemeMap[item.theme.theme_id].image}
                              alt={propertyThemeMap[item.theme.theme_id].label}
                              width={24}
                              height={24}
                            />
                            <Typography className="!font-semibold !text-[#10162F]">
                              {propertyThemeMap[item.theme.theme_id].label}
                            </Typography>
                          </Card>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <EmptyState
              message="No properties"
              description="Couldn't find properties for your search"
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Stays;
