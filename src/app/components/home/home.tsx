"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  alpha,
  Box,
  Button,
  Drawer,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CloseOutlined as CloseIcon,
  PeopleAltOutlined as PeopleIcon,
  BedOutlined as BedIcon,
  HouseOutlined as HouseIcon,
  StarBorderRounded as Star,
  GppGoodOutlined as Shield,
  QueryBuilderOutlined as Clock,
  WhatsApp,
} from "@mui/icons-material";

import { SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { usePropertyStore } from "@/context/PropertyContext";
import { Carousel, EmptyState } from "@/app/@application";
import propertyThemeMap from "@/lib/propert-theme-config/propertyThemeConfig";
import SearchBox from "./searchBox";
import { getAccomodation } from "../stays/stays";

import type PropertyDTO from "@/app/@types/property-dto";
import type ThemesDTO from "@/app/@types/themes-dto";

const Home = () => {
  const theme = useTheme();
  const router = useRouter();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openPropTheme, setOpenPropTheme] = useState<boolean>(false);
  const [filteredProperties, setFilteredProperties] = useState<PropertyDTO[]>();
  const [selectedPropTheme, setSelectedPropTheme] = useState<string>();
  const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const { properties } = usePropertyStore();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const propertythemes = Object.keys(propertyThemeMap);

  const handleThemeSelection = (proptheme: string) => {
    const filteredProperties = properties.filter((p) =>
      p.themes.some((t: ThemesDTO) => t.theme_id === proptheme)
    );
    setSelectedPropTheme(proptheme);
    setFilteredProperties(filteredProperties);
    setOpenPropTheme(true);
  };

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

  const handleWhatsAppContact = () => {
    const message =
      "Hi! I'd like to learn more about your holiday rental properties.";
    const whatsappUrl = `https://wa.me/9594377736?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <section className="flex justify-center items-center w-[100vw] h-[100vh]">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.55)",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src="/assets/herovideo1.mp4" type="video/mp4" />
        </video>

        <div className="p-4 md:p-0">
          <div className="text-white">
            <Typography variant="h2">PLAN YOUR</Typography>
            <Typography variant="h2">PERFECT GETAWAY!</Typography>
          </div>
          <SearchBox />
        </div>
      </section>

      <section className="animated-section">
        <div className="container">
          <div className="text-center mb-10 md:mb-12">
            <Typography variant="h4" className="!mb-2">
              Select your sanctuary of comfort and calm
            </Typography>
            <Typography className="!text-lg text-center block">
              Explore handpicked homes for every kind of getaway.
            </Typography>
          </div>
          <Carousel
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 0 },
              480: { slidesPerView: 3, spaceBetween: 0 },
              900: { slidesPerView: 4 },
            }}
            slidesPerView={4}
            spaceBetween={0}
            showDots={false}
            inverseControlsColor
          >
            <>
              {propertythemes.map((proptheme) => (
                <SwiperSlide key={propertyThemeMap[proptheme].label}>
                  <button
                    onClick={() => handleThemeSelection(proptheme)}
                    className="w-full flex flex-col items-center justify-center gap-3 relative hover:cursor-pointer"
                  >
                    <Box
                      className="w-15 md:w-22 h-15 md:h-22"
                      sx={{
                        backgroundColor: theme.palette.grey[100],
                        // backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        padding: "1.5rem",
                        borderRadius: "9999px",
                        display: "relative",
                      }}
                    >
                      <Image
                        src={propertyThemeMap[proptheme].image}
                        alt={propertyThemeMap[proptheme].label}
                        width={90}
                        height={90}
                      />
                    </Box>
                    <Typography variant="h6">
                      {propertyThemeMap[proptheme].label}
                    </Typography>
                  </button>
                </SwiperSlide>
              ))}
            </>
          </Carousel>
        </div>
      </section>

      <section className="!pb-0">
        <Paper
          className={`py-10 ${
            theme.palette.mode == "light" ? "!bg-[#F2F2F2]" : "inherit"
          }  !rounded-none !shadow-none`}
        >
          <div className="container">
            <div className="flex flex-col items-center justify-center mb-8">
              <Typography variant="h4" className="!mb-4 block text-center">
                Why Choose Villas By Serene?
              </Typography>
              <Typography className="w-full md:w-[75%] !text-lg text-center">
                We provide exceptional vacation rental experiences with
                personalized service and premium properties because your holiday
                deserves more than just a stay
              </Typography>
            </div>

            <div className="grid md:grid-cols-3 gap-2 md:gap-8">
              <div className="text-center p-2 md:p-6">
                <Box
                  // style={{
                  //   backgroundColor:
                  //     theme.palette.mode == "light"
                  //       ? theme.palette.background.paper
                  //       : theme.palette.grey[100],
                  // }}
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Star
                    sx={{ fontSize: "32px", color: theme.palette.primary.main }}
                  />
                </Box>
                <Typography variant="h6" className="text-xl font-semibold mb-3">
                  Premium Properties
                </Typography>
                <Typography className="text-muted-foreground">
                  Hand-selected vacation rentals that meet our high standards
                  for comfort and luxury
                </Typography>
              </div>

              <div className="text-center p-2 md:p-6">
                <Box
                  // style={{
                  //   backgroundColor:
                  //     theme.palette.mode == "light"
                  //       ? theme.palette.background.paper
                  //       : theme.palette.grey[100],
                  // }}
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Shield
                    sx={{ fontSize: "32px", color: theme.palette.primary.main }}
                  />
                </Box>
                <Typography variant="h6" className="text-xl font-semibold mb-3">
                  Trusted & Secure
                </Typography>
                <Typography className="text-muted-foreground">
                  All our properties are verified and we provide secure booking
                  with full support
                </Typography>
              </div>

              <div className="text-center p-2 md:p-6">
                <Box
                  // style={{
                  //   backgroundColor:
                  //     theme.palette.mode == "light"
                  //       ? theme.palette.background.paper
                  //       : theme.palette.grey[100],
                  // }}
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Clock sx={{ fontSize: "32px", color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h6" className="text-xl font-semibold mb-3">
                  24/7 Support
                </Typography>
                <Typography className="text-muted-foreground">
                  Our dedicated team is always available to ensure your vacation
                  is perfect
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
      </section>

      {/* optional  */}

      {/* <section className="animated-section">
        <Paper
          className={`py-10 ${
            theme.palette.mode == "light" ? "!bg-[#F2F2F2]" : "inherit"
          }  !rounded-none !shadow-none`}
        >
          <div className="container">
            <div className="flex flex-col items-center gap-6">
              <Typography variant="h3">Escape. Relax. Belong.</Typography>
              <Typography
                sx={{ textWrap: "balance" }}
                variant="h5"
                color="textSecondary"
                className="leading-relaxed mb-8 text-center italic"
              >
                At <span className="font-semibold">Villas By Serene</span>, we
                believe hospitality goes beyond providing a place to stay. Every
                detail is designed to create comfort, warmth, and memories that
                last long after your journey ends. Your experience is our first
                priority. Always!
              </Typography>
              <Button
                onClick={() => {
                  router.push("/stays/all");
                }}
                variant="contained"
                size="large"
              >
                Plan Your Stay !
              </Button>
            </div>
          </div>
        </Paper>
      </section> */}

      <section>
        <div className="container">
          <Typography className="text-center block" variant="h4">
            What Our Guests Say
          </Typography>
          <Typography className="text-center block !text-lg">
            Hospitality that goes beyond expectations. Discover what makes each
            stay a truly refined experience through the words of our delighted
            guests.
          </Typography>
        </div>
      </section>

      <section
        className={`text-white p-6
        ${
          theme.palette.mode == "light"
            ? "bg-gradient-to-r from-[color:var(--cta-light)] to-[color:color-mix(in_oklab,var(--cta-light)_80%,transparent)]"
            : "bg-gradient-to-r from-[color:var(--cta-dark)] to-[color:color-mix(in_oklab,var(--cta-dark)_80%,transparent)]"
        }
        `}
      >
        <div className="container px-4 text-center">
          <Typography variant="h5" className="!mb-1">
            Ready to Book Your Dream Vacation?
          </Typography>
          <Typography className="!text-lg !mb-8 opacity-90">
            Contact us directly via WhatsApp for personalized assistance and
            instant booking
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="large"
              variant="contained"
              className="text-lg px-8 py-3"
              onClick={() => handleWhatsAppContact()}
            >
              Contact on WhatsApp <WhatsApp className="ml-1" />
            </Button>
            <Button
              size="large"
              variant="outlined"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => {
                router.push("/stays/all");
              }}
            >
              Browse Properties
            </Button>
          </div>
        </div>
      </section>

      {selectedPropTheme && (
        <Drawer
          open={openPropTheme}
          onClose={() => setOpenPropTheme(false)}
          anchor={isSmallScreen ? "bottom" : "left"}
          sx={{
            "& .MuiDrawer-paper": {
              width: isSmallScreen ? "100vw" : "80vw",
              height: isSmallScreen ? "85vh" : "100vh",
            },
          }}
        >
          <>
            <Box
              sx={{
                borderBottom: `2px solid ${theme.palette.divider}`,
              }}
              className={`flex justify-between items-center p-3`}
            >
              <Typography variant="h6">
                Curated Just for You:{" "}
                {propertyThemeMap[selectedPropTheme].label}
              </Typography>
              <IconButton onClick={() => setOpenPropTheme(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <div className="p-4">
              {filteredProperties?.length ? (
                <>
                  {filteredProperties.map((item) => (
                    <div
                      key={item.property_id}
                      className="w-full grid grid-cols-1 gap-2 md:grid-cols-12 md:gap-8 mb-6"
                    >
                      <div className="md:col-span-5">
                        <Carousel slidesPerView={1}>
                          <button>
                            {item.PropertyImage.filter(
                              (img) => img.is_carousel_image === "true"
                            ).map((e, idx) => (
                              <SwiperSlide
                                className="hover:cursor-pointer"
                                onClick={() => handleSelect(item)}
                                key={idx}
                              >
                                <div className="relative w-full aspect-[5/3] md:aspect-[16/9] overflow-hidden">
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
                          </button>
                        </Carousel>
                      </div>
                      <div className="md:col-span-7 flex flex-col justify-center md:gap-2">
                        <Typography
                          className="hover:cursor-pointer"
                          onClick={() => handleSelect(item)}
                          variant="h5"
                        >
                          {item.name}
                        </Typography>
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
          </>
        </Drawer>
      )}
    </div>
  );
};

export default Home;
