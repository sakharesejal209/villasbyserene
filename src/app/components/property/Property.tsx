"use client";

import { FC, useEffect, useMemo, useState } from "react";

import { IoCloseOutline as CloseIcon } from "react-icons/io5";
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
  IoPeopleOutline as PeopleIcon,
  IoBedOutline as BedIcon,
  IoHomeOutline as HouseIcon,
  IoRestaurantOutline as MealsIcon,
  IoArrowForwardOutline as ArrowRight,
  IoLocationOutline as PinIcon,
} from "react-icons/io5";
import {
  PiBathtub as ShowerIcon,
  PiSwimmingPool as PoolIcon,
} from "react-icons/pi";

import { IoIosArrowUp as ExpandMoreIcon } from "react-icons/io";

import { motion } from "motion/react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";

import { Carousel, ReadMore } from "@/application/default";
import amenityIconMap from "@/lib/amenity-icon-config/amenityIconConfig";
import { getAccomodation } from "../stays/stays";
import ImageGallery from "./ImageGallery";
import CancellationPolicy from "../cancellation-policy/CancellationPolicy";
import BookingWidget, { WidgetState } from "./BookingWidget";
import dayjs from "dayjs";
import { BookingType, PropertyDetailDTO } from "@/app/@types";
import { useSearchParams } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

// ── Types ─────────────────────────────────────────────────────────

type PropertyPropType = {
  propertyDetails: PropertyDetailDTO;
  checkIn?: string; // YYYY-MM-DD from URL
  checkOut?: string; // YYYY-MM-DD from URL
};

type CustomSectionProps = { background: string };

type UnitImagesMap = {
  [unitType: string]: { src: string; alt: string; category: string | null }[];
};

// ── Styled ────────────────────────────────────────────────────────

const Customsection = styled("div")<CustomSectionProps>(({ background }) => ({
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
  "@media (min-width:768px)": { height: "80vh" },
}));

export const SlideTopSection = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ y: 60 }}
    whileInView={{ y: 0 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function getLatLngFromEmbed(
  src: string | null,
): { lat: string; lng: string } | null {
  if (!src) return null;
  const latMatch = new RegExp(/!3d([-.\d]+)/).exec(src);
  const lngMatch = new RegExp(/!2d([-.\d]+)/).exec(src);
  if (latMatch && lngMatch) return { lat: latMatch[1], lng: lngMatch[1] };
  return null;
}

// ── Component ─────────────────────────────────────────────────────

const Property: FC<PropertyPropType> = ({
  propertyDetails,
  checkIn,
  checkOut,
}) => {
  const searchParams = useSearchParams();

  const [openGallery, setOpenGallery] = useState(false);
  const [openUnitGallery, setOpenUnitGallery] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string>();
  const [galleryImages, setGalleryImages] =
    useState<{ src: string; alt: string }[]>();
  const [unitGalleryImages, setUnitGalleryImages] = useState<UnitImagesMap>();
  const [openForm, setOpenForm] = useState(false);
  const [widgetState, setWidgetState] = useState<WidgetState | null>(null);

  const foodMenu = propertyDetails.food_menus[0];
  const propertyImages = propertyDetails.all_images;
  const amenities = propertyDetails.amenities;
  const houseRules = propertyDetails.house_rules;
  const nearby = propertyDetails.nearby_attractions;
  const isDirect = propertyDetails.booking_type === BookingType.DIRECT;

  useEffect(() => {
    const _galleryImages = [...propertyImages]
      .sort((a, b) => a.display_order - b.display_order)
      .map((e) => ({
        src: e.image?.image_url ?? "",
        alt: e.image?.image_alt ?? "property image",
      }));
    setGalleryImages(_galleryImages);

    const _unitGalleryImages =
      propertyDetails.unit_groups.reduce<UnitImagesMap>((acc, group) => {
        acc[group.unit_type] = [...group.display_unit.images]
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
          .map((img) => ({
            src: img.image?.image_url ?? "",
            alt: img.image?.image_alt ?? "unit image",
            category: img.image?.category_name ?? null,
          }));
        return acc;
      }, {});
    setUnitGalleryImages(_unitGalleryImages);
  }, [propertyDetails, propertyImages]);

  const handleOpenGallery = (unitType: string) => {
    setSelectedUnit(unitType);
    setOpenUnitGallery(true);
  };

  const coord = useMemo(
    () => getLatLngFromEmbed(propertyDetails.map_location),
    [propertyDetails.map_location],
  );

  const bannerImage =
    propertyImages.find((e) => e.is_banner_image === true) ?? propertyImages[0];
  const bannerUrl = bannerImage?.image?.image_url ?? "";
  const theme = useTheme();

  useEffect(() => {
    // Auto-open booking form after Google login redirect
    if (searchParams.get("bookingIntent") === "true") {
      setOpenForm(true);
      // Clean URL without reload
      const url = new URL(globalThis.location.href);
      url.searchParams.delete("bookingIntent");
      globalThis.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  console.log('nearby.length < 3:', nearby.length < 3);
  

  return (
    <section>
      <Customsection background={bannerUrl}>
        <div className="container p-4 md:p-0">
          <div className="text-white slide-bottom">
            <Typography variant="h3">{propertyDetails.name}</Typography>
            <div className="flex items-center gap-1">
              <PinIcon className="inline-block mt-0" size={22} />
              <Typography className="mt-4 text-2xl!" variant="h5">
                {propertyDetails.area}, {propertyDetails.city},{" "}
                {propertyDetails.state}
              </Typography>
            </div>
          </div>
          {propertyImages.length > 0 && (
            <div className="flex h-full justify-end items-end">
              <button
                className="hover:cursor-pointer z-50 text-white absolute top-[87%] md:top-[73%] xs:right-[5%] right-[3.5%] px-2 py-3 md:px-8 md:py-10 font-bold bg-cover bg-center border-white border-[2px] border-solid rounded-sm bg-black/50 bg-blend-overlay"
                style={{ backgroundImage: `url(${bannerUrl})` }}
                onClick={() => setOpenGallery(true)}
              >
                See all {propertyImages.length} images
              </button>
            </div>
          )}
        </div>
      </Customsection>

      <section>
        <div className="container w-full grid grid-cols-12 md:gap-8 p-0">
          <div className="col-span-12 md:col-span-8">
            <ReadMore
              maxLength={250}
              text={propertyDetails.description}
              className="italic!"
            />

            <div className="hidden md:grid grid-cols-4 items-center gap-4 my-6">
              <Card className="p-2 rounded-sm! flex items-center gap-2">
                <HouseIcon fontSize={18} />{" "}
                {getAccomodation(propertyDetails.accommodation_type)}
              </Card>
              <Card className="p-2 rounded-sm! flex items-center gap-2">
                <PeopleIcon fontSize={18} /> {propertyDetails.max_capacity}{" "}
                Guests
              </Card>
              <Card className="p-2 rounded-sm! flex items-center gap-2">
                <BedIcon fontSize={18} /> {propertyDetails.bedroom_count}{" "}
                Bedrooms
              </Card>
              {propertyDetails.meals_available && (
                <Card className="p-2 rounded-sm! flex items-center gap-2">
                  <MealsIcon fontSize={18} /> Meals Available
                </Card>
              )}
            </div>

            <div className="grid max-sm:grid-cols-1 min-[370px]:grid-cols-2 max-md:grid-cols-2 md:hidden items-start gap-3">
              <Card className="p-2 rounded-sm! flex items-center gap-2">
                <HouseIcon />{" "}
                {getAccomodation(propertyDetails.accommodation_type)}
              </Card>
              <Card className="p-2 rounded-sm! flex items-center gap-2">
                <PeopleIcon /> {propertyDetails.max_capacity} Guests
              </Card>
              <Card className="p-2 rounded-sm! flex items-center gap-2">
                <BedIcon /> {propertyDetails.bedroom_count} Bedrooms
              </Card>
              {propertyDetails.meals_available && (
                <Card className="p-2 rounded-sm! flex items-center gap-2">
                  <MealsIcon /> Meals Available
                </Card>
              )}
            </div>

            <div className="my-8">
              <Typography variant="h5" className="font-bold!">
                Accommodation
              </Typography>
              {propertyDetails.unit_groups.map((group) => (
                <div key={group.unit_type} className="mt-3">
                  <div className="w-full grid grid-cols-12 mb-8 gap-2 md:mb-4 md:grid-cols-12 md:gap-8">
                    <button
                      onClick={() => handleOpenGallery(group.unit_type)}
                      className="col-span-12 md:col-span-5"
                    >
                      <div className="relative">
                        <img
                          className="max-w-full h-auto"
                          src={
                            group.display_unit.images.find(
                              (e) => e.is_banner_image === true,
                            )?.image?.image_url ??
                            group.display_unit.images[0]?.image?.image_url ??
                            ""
                          }
                          alt={
                            group.display_unit.images.find(
                              (e) => e.is_banner_image === true,
                            )?.image?.image_alt ?? "unit image"
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
                      <div className="flex items-center">
                        <Typography variant="h5" className="font-bold!">
                          {group.display_unit.title ?? group.type_label}
                        </Typography>
                        {group.total_count > 1 && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ ml: 1 }}
                          >
                            ({group.total_count} units available)
                          </Typography>
                        )}
                      </div>
                      <ReadMore
                        text={group.display_unit.description ?? ""}
                        maxLength={300}
                      />
                      <div className="grid max-sm:grid-cols-1 min-[370px]:grid-cols-2 max-md:grid-cols-3 items-center gap-3 mt-3">
                        {group.display_unit.no_of_bedrooms !== null && (
                          <Typography className="flex items-center gap-1">
                            <BedIcon /> {group.display_unit.no_of_bedrooms}{" "}
                            bedroom
                            {group.display_unit.no_of_bedrooms === 1 ? "" : "s"}
                          </Typography>
                        )}
                        {group.display_unit.no_of_restrooms !== null && (
                          <Typography className="flex items-center gap-1">
                            <ShowerIcon /> {group.display_unit.no_of_restrooms}{" "}
                            bathroom
                            {group.display_unit.no_of_restrooms === 1
                              ? ""
                              : "s"}
                          </Typography>
                        )}
                        {group.display_unit.is_pool_available && (
                          <Typography className="flex items-center gap-1">
                            <PoolIcon /> Swimming Pool
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-8">
              <Accordion defaultExpanded className="mb-3">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="h5"
                    className="font-bold!"
                    component="span"
                  >
                    Amenities
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="pt-0!">
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(160px, 1fr))"
                    gap={2}
                  >
                    {[...amenities]
                      .sort((a, b) => a.display_order - b.display_order)
                      .map((item) => {
                        const Icon = amenityIconMap[item.amenity_id];
                        return (
                          <Box
                            key={item.amenity_id}
                            display="flex"
                            alignItems="center"
                            gap={1}
                          >
                            {Icon && <Icon size={18} />}
                            <Typography>{item.name}</Typography>
                          </Box>
                        );
                      })}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {propertyDetails.meals_available && foodMenu && (
                <Accordion className="mb-3">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                      variant="h5"
                      className="font-bold!"
                      component="span"
                    >
                      Food Menu
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="pt-0!">
                    <ReadMore
                      text={foodMenu.description ?? ""}
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
                          >
                            <rect
                              x="0.5"
                              y="0.5"
                              width="23"
                              height="23"
                              rx="1.5"
                              fill="white"
                              stroke="#11BF0E"
                            />
                            <rect
                              x="5"
                              y="5"
                              width="14"
                              height="14"
                              rx="7"
                              fill="#11BF0E"
                            />
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
                          >
                            <rect
                              x="0.5"
                              y="0.5"
                              width="23"
                              height="23"
                              rx="1.5"
                              fill="white"
                              stroke="#FA4B4B"
                            />
                            <rect
                              x="5"
                              y="5"
                              width="14"
                              height="14"
                              rx="7"
                              fill="#FA4B4B"
                            />
                          </svg>
                          Non-Veg
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <Typography className="my-2!">
                        Breakfast: {foodMenu.breakfastTime}
                      </Typography>
                      <Typography className="my-2!">
                        Lunch: {foodMenu.lunchTime}
                      </Typography>
                      <Typography className="my-2!">
                        High Tea: {foodMenu.highteaTime}
                      </Typography>
                      <Typography className="my-2!">
                        Dinner: {foodMenu.dinnerTime}
                      </Typography>
                    </div>
                    <Button
                      variant="outlined"
                      color={
                        theme.palette.mode === "light" ? "primary" : "secondary"
                      }
                      onClick={() => window.open(foodMenu.menuUrl)}
                    >
                      View Menu
                    </Button>
                  </AccordionDetails>
                </Accordion>
              )}

              <Accordion className="mb-3">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="h5"
                    className="font-bold!"
                    component="span"
                  >
                    House Rules
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="pt-0!">
                  <ul className="list-disc pl-5">
                    {houseRules.map((item) => (
                      <li key={item.rule_id}>{item.description}</li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Accordion className="mb-3">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="h5"
                    className="font-bold!"
                    component="span"
                  >
                    Cancellation Policy
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="pt-0!">
                  <CancellationPolicy />
                </AccordionDetails>
              </Accordion>
            </div>

            {nearby.length > 0 && (
              <div className="my-6">
                <Typography className="mb-2! font-bold!" variant="h5">
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
                  arrowPosition="outside"
                  arrowVisibility={nearby.length < 4 ? 'hidden' : 'hover'}
                >
                  <>
                    {nearby.map((item) => (
                      <SwiperSlide key={item.attraction_id}>
                        <div className="h-75 md:h-100">
                          <div className="relative flex h-[50%]">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                            />
                          </div>
                          <div className="mt-2 overflow-y-auto h-[50%] wrap-break-word">
                            <Typography variant="h6">{item.title}</Typography>
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
                      </SwiperSlide>
                    ))}
                  </>
                </Carousel>
              </div>
            )}

            {propertyDetails.map_location && (
              <div className="mb-6">
                <Typography variant="h5" className="font-bold!">
                  Location
                </Typography>
                <div className="w-full h-50 md:h-87.5 mt-3 mb-3 overflow-hidden shadow">
                  <iframe
                    src={propertyDetails.map_location}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${propertyDetails.name} location`}
                    aria-label={`${propertyDetails.name} location`}
                  />
                </div>
                {coord && (
                  <Button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${coord.lat},${coord.lng}`,
                        "_blank",
                      )
                    }
                    variant="outlined"
                    color={
                      theme.palette.mode === "light" ? "primary" : "secondary"
                    }
                    endIcon={<ArrowRight />}
                  >
                    Get Directions
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:block col-span-4 sticky top-2 h-fit">
            <Typography className="mb-2!" variant="h6">
              Plan Your Exclusive Escape!
            </Typography>
            <Card className="shadow-lg!">
              <BookingWidget
                propertyId={propertyDetails.property_id}
                propertyName={propertyDetails.name}
                unitGroups={propertyDetails.unit_groups}
                bookingType={propertyDetails.booking_type}
                defaultCheckIn={checkIn}
                defaultCheckOut={checkOut}
                onStateChange={setWidgetState} // ← add this
              />
            </Card>
          </div>
        </div>
      </section>

      <Paper className="md:hidden fixed bottom-0 h-fit w-full px-3 py-2 rounded-none! z-50">
        <div className="flex justify-between items-center w-full gap-3">
          <div className="flex-1 min-w-0">
            {isDirect && propertyDetails.unit_groups[0]?.pricing ? (
              <div>
                {/* Show actual quote total if available, else fall back to base rate */}
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight={700}
                  noWrap
                >
                  {widgetState?.totalPrice
                    ? `₹${widgetState.totalPrice.toLocaleString("en-IN")}`
                    : `From ₹${propertyDetails.unit_groups[0].pricing.weekday_price.toLocaleString("en-IN")}`}
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    {widgetState?.totalPrice && widgetState.nights > 0
                      ? ` · ${widgetState.nights} night${widgetState.nights !== 1 ? "s" : ""}`
                      : "/night"}
                  </Typography>
                </Typography>

                {/* Dates + guests if selected */}
                {widgetState?.checkIn && widgetState?.checkOut ? (
                  <Typography variant="caption" noWrap>
                    {dayjs(widgetState.checkIn).format("DD MMM")}-{" "}
                    {dayjs(widgetState.checkOut).format("DD MMM")}
                    {` · ${widgetState.adults + widgetState.children} guest${widgetState.adults + widgetState.children !== 1 ? "s" : ""}`}
                    {widgetState.infants > 0
                      ? `, ${widgetState.infants} infant${widgetState.infants !== 1 ? "s" : ""}`
                      : ""}
                  </Typography>
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    Select dates to see total
                  </Typography>
                )}
              </div>
            ) : (
              <div>
                <Typography variant="subtitle1" fontWeight={600}>
                  Enquire for pricing
                </Typography>
                {widgetState?.checkIn && widgetState?.checkOut && (
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {dayjs(widgetState.checkIn).format("DD MMM")} →{" "}
                    {dayjs(widgetState.checkOut).format("DD MMM")}
                  </Typography>
                )}
              </div>
            )}
          </div>
          <Button
            variant="contained"
            onClick={() => setOpenForm(true)}
            sx={{ flexShrink: 0 }}
          >
            {isDirect ? "Book Now" : "Enquire Now"}
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
              width: { xs: "80vw", md: "80vw" },
              maxHeight: "90vh",
              borderRadius: 1,
              backgroundImage: "none",
            },
          },
        }}
      >
        <DialogTitle
          // sx={{ py: "16px", px: "16px" }}
          className="flex justify-between items-center p-2! md:p-4!"
        >
          <Typography variant="h5" fontWeight={700}>
            Gallery
          </Typography>
          <IconButton onClick={() => setOpenGallery(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="p-1! md:p-4!">
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
              width: { xs: "90vw", md: "90vw" },
              maxHeight: "90vh",
              borderRadius: 1,
              backgroundImage: "none",
            },
          },
        }}
      >
        <DialogTitle
          sx={{ py: "8px", px: "12px" }}
          className="flex justify-between items-center"
        >
          Photos{" "}
          <IconButton onClick={() => setOpenUnitGallery(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ width: "100%", p: "12px", pr: 0 }}>
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
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{
              textWrap: "pretty",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "12px",
            }}
            variant="h5"
          >
            <IoArrowBackOutline size={16} onClick={() => setOpenForm(false)} />
            {isDirect ? "Lock in Your Dates!" : "Send Your Enquiry"}
          </Typography>
          <BookingWidget
            propertyId={propertyDetails.property_id}
            propertyName={propertyDetails.name}
            unitGroups={propertyDetails.unit_groups}
            bookingType={propertyDetails.booking_type}
            defaultCheckIn={checkIn}
            defaultCheckOut={checkOut}
            onStateChange={setWidgetState} // ← add this
          />
        </Box>
      </Drawer>
    </section>
  );
};

export default Property;
