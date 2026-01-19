"use client";

import { FC, useEffect, useMemo, useState } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PeopleAltOutlined as PeopleIcon,
  BedOutlined as BedIcon,
  HouseOutlined as HouseIcon,
  RestaurantOutlined as MealsIcon,
  BathtubOutlined as ShowerIcon,
  PoolOutlined as PoolIcon,
  ArrowRightOutlined as ArrowRight,
  ExpandMoreOutlined as ExpandMoreIcon,
  EventAvailableOutlined as Available,
} from "@mui/icons-material";

import { motion } from "motion/react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

import { Carousel, ReadMore } from "@/application/default";
import amenityIconMap from "@/lib/amenity-icon-config/amenityIconConfig";
import { getAccomodation } from "../stays/stays";
import ImageGallery from "./ImageGallery";
import CancellationPolicy from "../cancellation-policy/CancellationPolicy";
import PropertyDTO from "@/types/property-dto";
import EnquiryForm from "./enquiry";

type PropertyPropType = {
  propertyDetails: PropertyDTO;
};

type CustomSectionProps = {
  background: string;
};

type UnitImagesMap = {
  [unitId: string]: {
    src: string;
    alt: string;
    category: string;
  }[];
};

const Customsection = styled("section")<CustomSectionProps>(
  ({ background }) => ({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "@media (min-width:768px)": {
      height: "80vh",
    },
  }),
);

export const SlideTopSection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ y: 60 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Property: FC<PropertyPropType> = (props) => {
  const { propertyDetails } = props;

  const [openGallery, setOpenGallery] = useState<boolean>(false);
  const [openUnitGallery, setOpenUnitGallery] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<string>();
  const [galleryImages, setGalleryImages] =
    useState<{ src: string; alt: string }[]>();
  const [unitGalleryImages, setunitGalleryImages] = useState<UnitImagesMap>();
  const [openForm, setOpenForm] = useState<boolean>(false);

  const foodMenu = propertyDetails.FoodMenu[0];
  const propertyImages = propertyDetails.PropertyImage;
  const amenities = propertyDetails.PropertyAmenity;
  const houseRules = propertyDetails.propertyRules;
  const nearby = propertyDetails.NearByAttractions;

  useEffect(() => {
    const _galleryImages = propertyImages
      .slice()
      .sort((a, b) => a.display_order - b.display_order)
      .map((e) => ({
        src: e.image ? e.image.image_url : "",
        alt: e.image ? e.image.image_alt || "" : "alt text",
      }));

    setGalleryImages(_galleryImages);

    const _unitGalleryImages = propertyDetails.Unit.reduce<UnitImagesMap>(
      (acc, unit) => {
        acc[unit.unit_id] = unit.unitImages
          .sort((a, b) => (a.display_order || 0) - (b.display_order || 0)) // sort by display_order ascending
          .map((img) => ({
            src: img.image ? img.image.image_url : "",
            alt: img.image ? img.image.image_alt || "" : "alt text",
            category:
              img.image && img.image.imageCategory
                ? img.image.imageCategory.name
                : "",
          }));
        return acc;
      },
      {},
    );

    setunitGalleryImages(_unitGalleryImages);
  }, [propertyDetails, propertyImages]);

  const handleOpenGallery = (unitId: string) => {
    setSelectedUnit(unitId);
    setOpenUnitGallery(true);
  };

  function getLatLngFromEmbed(src: string) {
    const latMatch = src.match(/!3d([-.\d]+)/);
    const lngMatch = src.match(/!2d([-.\d]+)/);
    if (latMatch && lngMatch) {
      return { lat: latMatch[1], lng: lngMatch[1] };
    }
    return null;
  }

  const coord = useMemo(() => {
    return getLatLngFromEmbed(propertyDetails.map_location as string);
  }, [propertyDetails]);

  const bannerimage = propertyImages.filter(
    (e) => e.is_banner_image === "true",
  )[0];

  const theme = useTheme();

  return (
    <div>
      <Customsection
        background={
          bannerimage.image == null ? "" : bannerimage.image.image_url
        }
      >
        <div className="container p-4 md:p-0">
          <div className="text-white slide-bottom">
            <Typography variant="h3">{propertyDetails.name}</Typography>
            <Typography className="mt-4" variant="h4">
              {propertyDetails.area}, {propertyDetails.state}
            </Typography>
          </div>
          <div className="flex h-full justify-end items-end">
            <button
              className={`hover:cursor-pointer z-50 text-white absolute top-[87%] md:top-[73%] xs:right-[5%] right-[3.5%] px-2 py-3 md:px-8 md:py-10 font-bold bg-cover bg-center border-white border-[2px] border-solid rounded-md bg-black/50 bg-blend-overlay`}
              style={{
                backgroundImage: `url(${
                  bannerimage == null ? "" : bannerimage.image?.image_url
                })`,
              }}
              onClick={() => {
                setOpenGallery(true);
              }}
            >
              See all {propertyImages.length} images
            </button>
          </div>
        </div>
      </Customsection>

      <section>
        <div className="container w-full grid grid-cols-12 md:gap-12 p-0">
          <div className="col-span-12 md:col-span-8">
            <div>
              <ReadMore
                maxLength={250}
                text={propertyDetails.description}
                className="italic!"
              />

              {/* desktop view */}
              <div className="hidden md:grid grid-cols-4 items-center gap-4 my-6">
                <Card className="p-2 rounded-lg!">
                  <HouseIcon />{" "}
                  {getAccomodation(propertyDetails.accommodationType)}
                </Card>
                <Card className="p-2 rounded-lg!">
                  <PeopleIcon /> {propertyDetails.maxcapacity} Guests
                </Card>
                <Card className="p-2 rounded-lg!">
                  <BedIcon /> {propertyDetails.bedroomcount} Bedrooms
                </Card>
                {propertyDetails.mealsAvailable && (
                  <Card className="p-2 rounded-lg!">
                    <MealsIcon /> Meals Available
                  </Card>
                )}
              </div>

              {/* mobile vew */}
              <div className="grid max-sm:grid-cols-1 min-[370px]:grid-cols-2 max-md:grid-cols-2 md:hidden items-start gap-3">
                <Card className="p-2 rounded-lg!">
                  <HouseIcon />{" "}
                  {getAccomodation(propertyDetails.accommodationType)}
                </Card>
                <Card className="p-2 rounded-lg!">
                  <PeopleIcon /> {propertyDetails.maxcapacity} Guests
                </Card>
                <Card className="p-2 rounded-lg!">
                  <BedIcon /> {propertyDetails.bedroomcount} Bedrooms
                </Card>
                {propertyDetails.mealsAvailable && (
                  <Card className="p-2 rounded-lg!">
                    <MealsIcon /> Meals Available
                  </Card>
                )}
              </div>

              <div className="my-6">
                <Typography variant="h5">Accomodation</Typography>
                {propertyDetails.Unit.map((category) => (
                  <div key={category.unit_id} className="mt-3">
                    <Typography className="text-lg!" variant="inherit">
                      {category.title}
                    </Typography>

                    <div className="w-full grid grid-cols-12 mb-8 gap-2 md:mb-4 md:grid-cols-12 md:gap-8 md:p-4 mt-2">
                      <button
                        onClick={() => handleOpenGallery(category.unit_id)}
                        className="col-span-12 md:col-span-5"
                      >
                        <div className="relative">
                          <img
                            className="max-w-full h-auto"
                            src={
                              category.unitImages.find(
                                (e) => e.is_banner_image === "true",
                              )?.image?.image_url ?? ""
                            }
                            alt={
                              category.unitImages.find(
                                (e) => e.is_banner_image === "true",
                              )?.image?.image_alt ?? "image alt text"
                            }
                          />
                          <div className="absolute bottom-0 right-0 cursor-pointer flex items-center text-white">
                            <Typography
                              variant="subtitle1"
                              className="hover:underline"
                            >
                              See all
                            </Typography>
                            <ArrowRight />
                          </div>
                        </div>
                      </button>
                      <div className="col-span-12 flex md:col-span-7 flex-col justify-center md:gap-2">
                        <ReadMore
                          text={category.description || ""}
                          maxLength={300}
                        />
                        <div className="grid max-sm:grid-cols-1 min-[370px]:grid-cols-2 max-md:grid-cols-3 items-center gap-3 mt-3">
                          <Typography>
                            <BedIcon /> {category.no_of_bedrooms} beds
                          </Typography>
                          <Typography>
                            <ShowerIcon /> {category.no_of_restrooms} Bathroom
                          </Typography>
                          {category.is_pool_available && (
                            <Typography>
                              <PoolIcon /> {category.is_pool_available} Swimming
                              Pool
                            </Typography>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-6">
                <Accordion defaultExpanded className="mb-3">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="amenities-content"
                    id="amenities-header"
                  >
                    <Typography className="font-bold!" component="span">
                      Amenities
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(auto-fill, minmax(160px, 1fr))"
                      gap={2}
                    >
                      {amenities
                        .toSorted((a, b) => a.display_order - b.display_order)
                        .map((item) => {
                          const Icon = amenityIconMap[item.amenity_id];
                          return (
                            <Box
                              key={item.amenity_id}
                              display="flex"
                              alignItems="center"
                              gap={1}
                            >
                              {Icon && <Icon size={20} />}
                              <Typography>{item.amenity.name}</Typography>
                            </Box>
                          );
                        })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                {propertyDetails.mealsAvailable && foodMenu && (
                  <Accordion className="mb-3">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="foodmenu-content"
                      id="foodmenu-header"
                    >
                      <Typography className="font-bold!" component="span">
                        Food Menu
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ReadMore
                        text={foodMenu.description || ""}
                        maxLength={200}
                      />

                      <div className="flex gap-6 my-6">
                        {foodMenu.isVeg && (
                          <div className="flex items-center gap-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.5"
                                y="0.5"
                                width="23"
                                height="23"
                                rx="1.5"
                                fill="white"
                                stroke="#11BF0E"
                              ></rect>
                              <rect
                                x="5"
                                y="5"
                                width="14"
                                height="14"
                                rx="7"
                                fill="#11BF0E"
                              ></rect>
                            </svg>
                            Veg
                          </div>
                        )}
                        {foodMenu.isNonVeg && (
                          <div className="flex items-center gap-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.5"
                                y="0.5"
                                width="23"
                                height="23"
                                rx="1.5"
                                fill="white"
                                stroke="#FA4B4B"
                              ></rect>
                              <rect
                                x="5"
                                y="5"
                                width="14"
                                height="14"
                                rx="7"
                                fill="#FA4B4B"
                              ></rect>
                            </svg>
                            Non-Veg
                          </div>
                        )}
                      </div>
                      <div className="mb-4">
                        <Typography className="my-2!">
                          Breakfast Time: {foodMenu.breakfastTime}
                        </Typography>
                        <Typography className="my-2!">
                          Lunch Time: {foodMenu.lunchTime}
                        </Typography>
                        <Typography className="my-2!">
                          Hightea Time: {foodMenu.highteaTime}
                        </Typography>
                        <Typography className="my-2!">
                          Dinner Time: {foodMenu.dinnerTime}
                        </Typography>
                      </div>
                      <Button
                        variant="outlined"
                        color={
                          theme.palette.mode == "light"
                            ? "primary"
                            : "secondary"
                        }
                        onClick={() => window.open(foodMenu.menuUrl)}
                      >
                        View Menu
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                )}
                <Accordion className="mb-3">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="houserules-content"
                    id="houserules-header"
                  >
                    <Typography className="font-bold!" component="span">
                      House Rules
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="mb-2">
                      <Typography className="font-bold!">
                        Check-in Time: {propertyDetails.checkin_time}
                      </Typography>
                      <Typography className="font-bold!">
                        Check-out Time: {propertyDetails.checkout_time}
                      </Typography>
                    </div>
                    <div>
                      <ul className="list-disc pl-5">
                        {houseRules.map((item) => (
                          <li key={item.rule_id}>
                            {item.houseRule.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="mb-3">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="cancellation-content"
                    id="cancellation-header"
                  >
                    <Typography className="font-bold!" component="span">
                      Cancellation Policy
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CancellationPolicy />
                  </AccordionDetails>
                </Accordion>
              </div>

              {nearby.length !== 0 && (
                <div className="my-6">
                  <Typography className="mb-4!" variant="h6">
                    Nearby Attractions
                  </Typography>
                  <Carousel
                    spaceBetween={15}
                    slidesPerView={2}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      900: { slidesPerView: 3 },
                    }}
                    showDots={false}
                  >
                    <>
                      {propertyDetails.NearByAttractions?.map((item) => (
                        <SwiperSlide key={item.attraction_id}>
                          <div>
                            <div className="h-75 md:h-100">
                              <div className="relative flex h-[50%]">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.title}
                                  fill
                                  style={{
                                    objectFit: "cover",
                                    objectPosition: "center",
                                  }}
                                />
                              </div>
                              <div
                                className={`m-2 overflow-y-auto h-[50%] wrap-break-word`}
                              >
                                <Typography variant="h6">
                                  {item.title}
                                </Typography>
                                <Typography variant="body2">
                                  <span className="font-bold">Distance: </span>
                                  {item.distance}
                                </Typography>
                                <ReadMore
                                  textVariant="subtitle2"
                                  text={item.description}
                                  maxLength={100}
                                />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </>
                  </Carousel>
                </div>
              )}

              {propertyDetails.map_location !== null && (
                <div>
                  <Typography variant="h5">Location</Typography>
                  <div className="w-full h-50 md:h-87.5 mt-3 mb-3 overflow-hidden shadow">
                    {/* {coord && (
                      <MapContainer
                        // bounds={}
                        center={[coord?.lat, coord?.lng]}
                      >
                        <TileLayer
                          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[coord?.lat || 0, coord?.lng || 0]}>
                          <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                          </Popup>
                        </Marker>
                      </MapContainer>
                    )} */}
                    <iframe
                      src={propertyDetails.map_location}
                      width="100%"
                      height="100%"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Cliff view villa location"
                      aria-label="Cliff view villa location"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${coord?.lat},${coord?.lng}`,
                        "_blank",
                      );
                    }}
                    variant="outlined"
                    color={
                      theme.palette.mode == "light" ? "primary" : "secondary"
                    }
                  >
                    Get Directions <ArrowRight />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:block col-span-4 sticky top-22.5 h-fit">
            <Typography className="mb-2!" variant="h6">
              Plan Your Exclusive Escape!
            </Typography>
            <Card className="shadow-lg!">
              <EnquiryForm
                propertyName={propertyDetails.name}
                whatsappNumber="9594377736"
              />
            </Card>
          </div>
        </div>
      </section>

      <Paper className="md:hidden fixed bottom-0 h-fit w-full px-2 md:px-4 py-1.5 md:py-3 rounded-none! z-50">
        <Typography className="mb-1 md:mb-3!" color="success">
          <Available /> Add dates to check the availability
        </Typography>
        <div className="flex justify-between items-center w-full gap-3">
          <div>
            <Typography
              className="mb-0.5! text-[18px]! md:text-[25px]!"
              variant="h4"
            >
              Escape to Comfort!
            </Typography>
            <Typography className="hidden md:block" variant="subtitle1">
              Reserve Your Stay in Just One Tap
            </Typography>
          </div>

          <Button variant="contained" onClick={() => setOpenForm(true)}>
            Book Now
          </Button>
        </div>
      </Paper>

      <Dialog
        open={openGallery}
        onClose={() => setOpenGallery(false)}
        fullScreen
        slotProps={{
          paper: {
            sx: {
              width: { xs: "90vw", sm: "90vw", md: "90vw" },
              maxHeight: "90vh",
              borderRadius: 1,
              backgroundImage: "none",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            paddingY: "8px",
            paddingX: "12px",
          }}
          className="flex justify-between items-center"
        >
          Photos
          <IconButton
            edge="start"
            onClick={() => setOpenGallery(false)}
            aria-label="close"
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            width: "100%",
            padding: "12px",
            paddingRight: "0px",
          }}
        >
          {galleryImages && <ImageGallery images={galleryImages} />}
        </DialogContent>
      </Dialog>

      <Dialog
        open={openUnitGallery}
        onClose={() => setOpenUnitGallery(false)}
        fullScreen
        slotProps={{
          paper: {
            sx: {
              width: { xs: "90vw", sm: "90vw", md: "90vw" },
              maxHeight: "90vh",
              borderRadius: 1,
              backgroundImage: "none",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            paddingY: "8px",
            paddingX: "12px",
          }}
          className="flex justify-between items-center"
        >
          Photos
          <IconButton
            edge="start"
            onClick={() => setOpenUnitGallery(false)}
            aria-label="close"
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            width: "100%",
            padding: "12px",
            paddingRight: "0px",
          }}
        >
          {unitGalleryImages && selectedUnit && (
            <ImageGallery images={unitGalleryImages[selectedUnit]} />
          )}
        </DialogContent>
      </Dialog>

      <Drawer
        anchor="bottom"
        open={openForm}
        onClose={() => setOpenForm(false)}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{ textWrap: "pretty", textAlign: "center" }}
            className=""
            variant="h5"
          >
            Lock in Your Dates Before They&apos;re Gone!
          </Typography>
          <EnquiryForm
            propertyName={propertyDetails.name}
            whatsappNumber="9594377736"
          />
        </Box>
      </Drawer>
    </div>
  );
};

export default Property;
