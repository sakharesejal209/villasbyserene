"use client";

import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel, EmptyState } from "@/application/default";
import { PropertyListItemDTO } from "@/app/@types";
import propertyThemeMap from "@/lib/property-theme-config/propertyThemeConfig";

import {
  IoCloseOutline as CloseIcon,
  IoPeopleOutline as PeopleIcon,
  IoBedOutline as BedIcon,
  IoHomeOutline as HouseIcon,
} from "react-icons/io5";

import { getAccomodation } from "../../stays/stays";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedPropTheme: string;
  filteredProperties: PropertyListItemDTO[];
}

export const ThemeDrawer = ({
  open,
  onClose,
  selectedPropTheme,
  filteredProperties,
}: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});

  function toPropertySlug(name: string, id: string): string {
    return `${name
      .toLowerCase()
      .replaceAll(/[^a-z0-9\s]/g, "")
      .replaceAll(/\s+/g, "-")
      .replaceAll(/-+/g, "-")
      .trim()}-${id.slice(0, 8)}`;
  }

  const handleSelect = useCallback(
    (name: string, id: string) =>
      router.push(`/property/${toPropertySlug(name, id)}`),
    [router],
  );

  const handleImageLoad = useCallback(
    (idx: number, img: HTMLImageElement) =>
      setFits((prev) => ({
        ...prev,
        [idx]: img.naturalWidth / img.naturalHeight < 1 ? "contain" : "cover",
      })),
    [],
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={isSmallScreen ? "bottom" : "left"}
      sx={{
        "& .MuiDrawer-paper": {
          width: isSmallScreen ? "100vw" : "55vw",
          height: isSmallScreen ? "85vh" : "100vh",
        },
      }}
    >
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Curated Just for You:{" "}
          {selectedPropTheme ? propertyThemeMap[selectedPropTheme]?.label : ""}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 2, overflowY: "auto" }}>
        {filteredProperties.length ? (
          filteredProperties.map((item) => (
            <div
              key={item.property_id}
              className="w-full grid grid-cols-1 gap-2 md:grid-cols-12 md:gap-8 mb-6"
            >
              <div className="md:col-span-5">
                <Carousel slidesPerView={1}>
                  <button>
                    {item.carousel_images.map((e, idx) => (
                      <SwiperSlide
                        key={idx}
                        className="cursor-pointer"
                        onClick={() =>
                          handleSelect(item.name, item.property_id)
                        }
                      >
                        <div className="relative w-full aspect-[5/3] md:aspect-[16/9] overflow-hidden">
                          <Image
                            src={e.image_url}
                            alt={e.image_alt ?? "Property image"}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{
                              objectFit: fits?.[idx] ?? "cover",
                              objectPosition: "center",
                            }}
                            onLoadingComplete={(img) =>
                              handleImageLoad(idx, img)
                            }
                            priority={idx === 0}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </button>
                </Carousel>
              </div>
              <div className="md:col-span-7 flex flex-col justify-center gap-2">
                <Typography
                  variant="h5"
                  className="cursor-pointer"
                  onClick={() => handleSelect(item.name, item.property_id)}
                >
                  {item.name}
                </Typography>
                <Typography color="text.secondary">
                  {item.area}, {item.state}, {item.country}
                </Typography>
                <div className="flex items-center gap-3">
                  {[
                    { icon: <PeopleIcon />, value: item.max_capacity },
                    { icon: <BedIcon />, value: item.bedroom_count },
                    {
                      icon: <HouseIcon />,
                      value: getAccomodation(item.accommodation_type),
                    },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-1">
                      {stat.icon}
                      <Typography variant="body2">{stat.value}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            message="No properties"
            description="Couldn't find properties for your search"
          />
        )}
      </Box>
    </Drawer>
  );
};
