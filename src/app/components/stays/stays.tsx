"use client";

import { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import {
  PeopleAltOutlined as PeopleIcon,
  BedOutlined as BedIcon,
  HouseOutlined as HouseIcon,
} from "@mui/icons-material";
import { startCase, camelCase } from "lodash";

import { Carousel, EmptyState } from "@/app/@application";

import type { PropertyDTO } from "@/app/@types/propertyDTO";
import { useRouter } from "next/navigation";

type StaysPropType = {
  location: string;
  guests: number;
  propertiesData: PropertyDTO[];
};

const Stays = (props: StaysPropType) => {
  const { location, guests, propertiesData } = props;

  console.log("propertiesData:", propertiesData);

  const [filteredProperties, setFilteredProperties] = useState<PropertyDTO[]>();
  const router = useRouter();

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

  const getAccomodation = (type: string) => {
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

  function slugify(str: string) {
    return str.toLowerCase().replace(/\s+/g, "-");
  }
  const handleSelect = (property: PropertyDTO) => {
    const slug = slugify(property.name);
    router.push(`/property/${slug}-${property.property_id}`);
  };

  return (
    <>
      <section>
        <div className="container">
          {filteredProperties?.length ? (
            <>
              <Typography variant="h4" className="py-4 md:px-4 pt-0">
                {location === "all"
                  ? "All Properties"
                  : `Properties in ${toPascalCase(location)}`}
              </Typography>
              {filteredProperties.map((item) => (
                <div
                  key={item.property_id}
                  className="w-full grid grid-cols-1 mb-8 gap-2 md:mb-4 md:grid-cols-12 md:gap-10  md:p-4"
                >
                  <div className="md:col-span-5">
                    <Carousel
                      images={item.PropertyImage.filter(
                        (img) => img.is_carousel_image === "true"
                      ).map((e) => ({
                        src: e.image.image_url,
                        alt: e.image.image_alt,
                      }))}
                    />
                  </div>
                  <div
                  role="button"
                    onClick={() => handleSelect(item)}
                    className="md:col-span-7 flex flex-col justify-center md:gap-2 hover:cursor-pointer"
                  >
                    <Typography variant="h5">{item.name}</Typography>
                    <Typography>
                      {item.area}, {item.state}, {item.country}
                    </Typography>
                    <div className="flex items-center gap-3">
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
