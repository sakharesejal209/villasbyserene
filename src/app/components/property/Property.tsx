"use client";

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { IoCloseOutline as CloseIcon } from "react-icons/io5";

import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Paper,
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
  IoArrowBackOutline,
} from "react-icons/io5";
import {
  PiBathtub as ShowerIcon,
  PiSwimmingPool as PoolIcon,
} from "react-icons/pi";

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
import DraggableWhatsApp from "./DraggableWhatsApp";
import { track } from "@/lib/metaPixel";

// ── Types ──────────────────────────────────────────────────────────

type PropertyPropType = {
  propertyDetails: PropertyDetailDTO;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

type UnitImagesMap = {
  [unitType: string]: { src: string; alt: string; category: string | null }[];
};

// ── Constants ──────────────────────────────────────────────────────

// Match your AppBar: py-2 + logo/text ≈ 56px mobile, 64px desktop
const NAVBAR_H = { xs: 56, md: 64 };

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "accommodation", label: "Accommodation" },
  { id: "amenities", label: "Amenities" },
  { id: "food-menu", label: "Food Menu" },
  { id: "house-rules", label: "House Rules" },
  { id: "cancellation", label: "Cancellation" },
  { id: "nearby", label: "Nearby" },
  { id: "location", label: "Location" },
] as const;

// ── Helpers ────────────────────────────────────────────────────────

function getLatLngFromEmbed(
  src: string | null,
): { lat: string; lng: string } | null {
  if (!src) return null;
  const latMatch = /!3d([-.\d]+)/.exec(src);
  const lngMatch = /!2d([-.\d]+)/.exec(src);
  if (latMatch && lngMatch) return { lat: latMatch[1], lng: lngMatch[1] };
  return null;
}

// ── Sub-components ─────────────────────────────────────────────────

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="h5" className="mb-4!">
    {children}
  </Typography>
);

// ── Component ──────────────────────────────────────────────────────

const Property: FC<PropertyPropType> = ({
  propertyDetails,
  checkIn,
  checkOut,
  guests,
}) => {
  const searchParams = useSearchParams();
  const theme = useTheme();

  const [openGallery, setOpenGallery] = useState(false);
  const [openUnitGallery, setOpenUnitGallery] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string>();
  const [galleryImages, setGalleryImages] =
    useState<{ src: string; alt: string }[]>();
  const [unitGalleryImages, setUnitGalleryImages] = useState<UnitImagesMap>();
  const [openForm, setOpenForm] = useState(false);
  const [widgetState, setWidgetState] = useState<WidgetState | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isScrollingTo = useRef(false);

  const foodMenu = propertyDetails.food_menus[0];
  const propertyImages = propertyDetails.all_images;
  const amenities = propertyDetails.amenities;
  const houseRules = propertyDetails.house_rules;
  const nearby = propertyDetails.nearby_attractions;
  const isDirect = propertyDetails.booking_type === BookingType.DIRECT;

  const visibleTabs = TABS.filter((t) => {
    if (t.id === "food-menu")
      return propertyDetails.meals_available && !!foodMenu;
    if (t.id === "nearby") return nearby.length > 0;
    if (t.id === "location") return !!propertyDetails.map_location;
    return true;
  });

  // ── Build image maps ───────────────────────────────────────────
  useEffect(() => {
    setGalleryImages(
      [...propertyImages]
        .sort((a, b) => a.display_order - b.display_order)
        .map((e) => ({
          src: e.image?.image_url ?? "",
          alt: e.image?.image_alt ?? "property image",
        })),
    );
    setUnitGalleryImages(
      propertyDetails.unit_groups.reduce<UnitImagesMap>((acc, group) => {
        acc[group.unit_type] = [...group.display_unit.images]
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
          .map((img) => ({
            src: img.image?.image_url ?? "",
            alt: img.image?.image_alt ?? "unit image",
            category: img.image?.category_name ?? null,
          }));
        return acc;
      }, {}),
    );
  }, [propertyDetails, propertyImages]);

  // ── Scroll-spy via scroll event ────────────────────────────────
  // Uses scroll event (not IntersectionObserver) so the active tab
  // tracks the section whose top has most recently crossed the
  // combined navbar + tab bar threshold.
  useEffect(() => {
    const onScroll = () => {
      if (isScrollingTo.current) return;

      const navbarH = window.innerWidth >= 768 ? NAVBAR_H.md : NAVBAR_H.xs;
      const tabBarH = tabBarRef.current?.offsetHeight ?? 44;
      const threshold = navbarH + tabBarH + 1; // 1px buffer

      let current = visibleTabs[0].id;

      for (const tab of visibleTabs) {
        const el = sectionRefs.current[tab.id];
        if (!el) continue;
        // section top (relative to viewport) has scrolled at or above the threshold
        if (el.getBoundingClientRect().top <= threshold) {
          current = tab.id;
        }
      }

      setActiveTab(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial active tab on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [visibleTabs]);

  // ── Auto-scroll active tab chip into view ─────────────────────
  useEffect(() => {
    const bar = tabScrollRef.current;
    if (!bar) return;
    bar
      .querySelector<HTMLElement>(`[data-tab="${activeTab}"]`)
      ?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      });
  }, [activeTab]);

  // ── Click tab → scroll to section ─────────────────────────────
  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const navbarH = window.innerWidth >= 768 ? NAVBAR_H.md : NAVBAR_H.xs;
    const tabBarH = tabBarRef.current?.offsetHeight ?? 44;
    const top =
      el.getBoundingClientRect().top + window.scrollY - navbarH - tabBarH - 8;
    isScrollingTo.current = true;
    setActiveTab(id);
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => {
      isScrollingTo.current = false;
    }, 900);
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  // ── Misc ───────────────────────────────────────────────────────
  const coord = useMemo(
    () => getLatLngFromEmbed(propertyDetails.map_location),
    [propertyDetails.map_location],
  );

  const bannerUrl =
    (propertyImages.find((e) => e.is_banner_image) ?? propertyImages[0])?.image
      ?.image_url ?? "";

  useEffect(() => {
    if (searchParams.get("bookingIntent") === "true") {
      setOpenForm(true);
      const url = new URL(globalThis.location.href);
      url.searchParams.delete("bookingIntent");
      globalThis.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  const handleWhatsAppContact = useCallback(() => {
    track("Contact", {
      method: "whatsapp",
      location: "property-floating",
      content_ids: [propertyDetails.property_id],
      content_name: propertyDetails.name,
      checkin: widgetState?.checkIn,
      checkout: widgetState?.checkOut,
    });
    const parts = [
      `Hi, I'm interested in booking *${propertyDetails.name}*`,
      widgetState?.checkIn
        ? `Check-in: ${dayjs(widgetState.checkIn).format("DD MMM YYYY")}`
        : null,
      widgetState?.checkOut
        ? `Check-out: ${dayjs(widgetState.checkOut).format("DD MMM YYYY")}`
        : null,
      widgetState?.adults
        ? `Adults: ${widgetState.adults}${widgetState.children > 0 ? `, Children: ${widgetState.children}` : ""}`
        : null,
      "Please share availability and pricing.",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/9594377736?text=${encodeURIComponent(parts)}`,
      "_blank",
    );
  }, [propertyDetails.name, widgetState]);

  useEffect(() => {
    track("ViewPropertyPage", {
      content_ids: [propertyDetails.property_id],
      content_name: propertyDetails.name,
      content_type: "hotel",
    });
  }, [propertyDetails]);

  // ── Quick-fact chips ───────────────────────────────────────────
  const quickFacts = [
    {
      icon: <HouseIcon color="text.primary" />,
      label: getAccomodation(propertyDetails.accommodation_type),
    },
    {
      icon: <PeopleIcon color="text.primary" />,
      label: `${propertyDetails.max_capacity} Guests`,
    },
    {
      icon: <BedIcon color="text.primary" />,
      label: `${propertyDetails.bedroom_count} Bedroom${propertyDetails.bedroom_count === 1 ? "" : "s"}`,
    },
    ...(propertyDetails.meals_available
      ? [{ icon: <MealsIcon color="text.primary" />, label: "Meals Included" }]
      : []),
  ];

  // ── Render ─────────────────────────────────────────────────────
  return (
    <section>
      {/* ── Hero ── */}
      <div className="relative container mt-10">
        {/* Desktop 5-panel grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1.5 h-120 rounded-xl overflow-hidden">
          <button
            className="col-span-2 row-span-2 relative overflow-hidden group"
            onClick={() => setOpenGallery(true)}
          >
            <Image
              src={galleryImages?.[0]?.src ?? bannerUrl}
              alt={galleryImages?.[0]?.alt ?? propertyDetails.name}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
          {[1, 2, 3, 4].map((i) => {
            const img = galleryImages?.[i];
            const isLast = i === 4;
            const remaining = (galleryImages?.length ?? 0) - 5;
            return (
              <button
                key={i}
                className="relative overflow-hidden group"
                onClick={() => setOpenGallery(true)}
              >
                {img ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
                {isLast && remaining > 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="text-white font-medium text-sm">
                      +{remaining} more
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden rounded-lg overflow-hidden">
          <Carousel
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            arrowVisibility="hidden"
            showDots
            spaceBetween={0}
          >
            {(galleryImages ?? [{ src: bannerUrl, alt: propertyDetails.name }])
              .slice(0, 6)
              .map((img, idx) => (
                <SwiperSlide key={idx}>
                  <button
                    className="relative w-full block"
                    style={{ aspectRatio: "4/3" }}
                    onClick={() => setOpenGallery(true)}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority={idx === 0}
                      className="object-cover"
                    />
                  </button>
                </SwiperSlide>
              ))}
          </Carousel>
          {(galleryImages?.length ?? 0) > 0 && (
            <button
              className="absolute bottom-3 right-4 z-10 text-xs text-white px-2.5 py-1 font-medium bg-black/40 backdrop-blur-sm border border-white/20 rounded-full"
              onClick={() => setOpenGallery(true)}
            >
              View all photos
            </button>
          )}
        </div>
      </div>

      {/* ── Title + location ── */}
      <div className="container mt-4 mb-1">
        <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.2 }}>
          {propertyDetails.name}
        </Typography>
        <div className="flex items-center gap-1 mt-1">
          <PinIcon size={14} />
          <Typography>
            {propertyDetails.area}, {propertyDetails.city},{" "}
            {propertyDetails.state}
          </Typography>
        </div>
      </div>

      {/* ── Sticky tab bar ────────────────────────────────────────
           top = navbar height so it stacks flush below the navbar.
           Navbar is sticky itself, so from the scroll engine's
           perspective the page starts below it — but getBoundingClientRect
           still measures from the visual top including the navbar,
           hence we keep the same NAVBAR_H offset in scrollToSection.
      ── */}
      <Box
        ref={tabBarRef}
        sx={{
          position: "sticky",
          top: { xs: `${NAVBAR_H.xs}px`, md: `${NAVBAR_H.md}px` },
          zIndex: 40,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          marginTop: 3,
        }}
      >
        <div className="container">
          <Box
            ref={tabScrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {visibleTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  style={{
                    padding: "12px 16px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    background: "none",
                    border: "none",
                    borderBottom: `2px solid ${isActive ? theme.palette.primary.main : "transparent"}`,
                    cursor: "pointer",
                    transition: "color 0.15s, border-color 0.15s",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </Box>
        </div>
      </Box>

      {/* ── Main content + booking widget ── */}
      <div className="container grid grid-cols-12 md:gap-10 mt-6 pb-24 md:pb-8">
        <div className="col-span-12 md:col-span-8 flex flex-col gap-10">
          {/* Overview */}
          <div id="overview" ref={setRef("overview")}>
            <ReadMore maxLength={280} text={propertyDetails.description} />
            <div className="flex flex-wrap gap-2 mt-5">
              {quickFacts.map((fact, i) => (
                <Chip
                  key={i}
                  icon={fact.icon}
                  label={fact.label}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 0.8,
                    // fontSize: "0.8rem",
                    py: 2,
                    px: 0.5,
                  }}
                />
              ))}
            </div>
          </div>

          <Divider />

          {/* Accommodation */}
          <div id="accommodation" ref={setRef("accommodation")}>
            <SectionHeading>Accommodation</SectionHeading>
            <div className="flex flex-col gap-8">
              {propertyDetails.unit_groups.map((group) => (
                <div
                  key={group.unit_type}
                  className="grid grid-cols-12 gap-4 md:gap-6"
                >
                  <button
                    onClick={() => {
                      setSelectedUnit(group.unit_type);
                      setOpenUnitGallery(true);
                    }}
                    className="col-span-12 md:col-span-5 relative overflow-hidden rounded-lg group"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <Image
                      src={
                        group.display_unit.images.find((e) => e.is_banner_image)
                          ?.image?.image_url ??
                        group.display_unit.images[0]?.image?.image_url ??
                        ""
                      }
                      alt={
                        group.display_unit.images.find((e) => e.is_banner_image)
                          ?.image?.image_alt ?? "unit image"
                      }
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                      <span className="text-white text-xs font-medium flex items-center gap-1">
                        See all <ArrowRight size={12} />
                      </span>
                    </div>
                  </button>

                  <div className="col-span-12 md:col-span-7 flex flex-col justify-center gap-2">
                    <div className="flex items-baseline gap-2">
                      <Typography variant="subtitle1" fontWeight={600}>
                        {group.display_unit.title ?? group.type_label}
                      </Typography>
                      {group.total_count > 1 && (
                        <Typography variant="caption" color="text.secondary">
                          {group.total_count} units
                        </Typography>
                      )}
                    </div>
                    <ReadMore
                      text={group.display_unit.description ?? ""}
                      maxLength={200}
                    />
                    <div className="flex flex-wrap gap-3 mt-1">
                      {group.display_unit.no_of_bedrooms != null && (
                        <Typography className="flex items-center gap-1">
                          <BedIcon size={15} />
                          {group.display_unit.no_of_bedrooms} bed
                          {group.display_unit.no_of_bedrooms === 1 ? "" : "s"}
                        </Typography>
                      )}
                      {group.display_unit.no_of_restrooms != null && (
                        <Typography className="flex items-center gap-1">
                          <ShowerIcon size={15} />
                          {group.display_unit.no_of_restrooms} bath
                          {group.display_unit.no_of_restrooms === 1 ? "" : "s"}
                        </Typography>
                      )}
                      {group.display_unit.is_pool_available && (
                        <Typography className="flex items-center gap-1">
                          <PoolIcon size={20} /> Pool
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Amenities */}
          <div id="amenities" ref={setRef("amenities")}>
            <SectionHeading>Amenities</SectionHeading>
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(160px, 1fr))"
              // gap={1}
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
                      sx={{ py: 0.75 }}
                    >
                      {Icon && (
                        <Icon
                          size={item.amenity_id == "swimmingpool" ? 22 : 16}
                        />
                      )}
                      <Typography>{item.name}</Typography>
                    </Box>
                  );
                })}
            </Box>
          </div>

          <Divider />

          {/* Food Menu */}
          {propertyDetails.meals_available && foodMenu && (
            <>
              <div id="food-menu" ref={setRef("food-menu")}>
                <SectionHeading>Food Menu</SectionHeading>
                <ReadMore text={foodMenu.description ?? ""} maxLength={200} />
                <div className="flex gap-4 my-4">
                  {foodMenu.isVeg && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg
                        width="20"
                        height="20"
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
                    <div className="flex items-center gap-2 text-sm">
                      <svg
                        width="20"
                        height="20"
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
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-4 max-w-xs">
                  {[
                    ["Breakfast", foodMenu.breakfastTime],
                    ["Lunch", foodMenu.lunchTime],
                    ["High Tea", foodMenu.highteaTime],
                    ["Dinner", foodMenu.dinnerTime],
                  ].map(([label, time]) => (
                    <Typography
                      key={label}
                      variant="body2"
                      color="text.secondary"
                    >
                      <span className="font-medium text-foreground">
                        {label}
                      </span>
                      {time ? ` · ${time}` : ""}
                    </Typography>
                  ))}
                </div>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<ArrowRight size={14} />}
                  onClick={() => window.open(foodMenu.menuUrl)}
                >
                  View Full Menu
                </Button>
              </div>
              <Divider />
            </>
          )}

          {/* House Rules */}
          <div id="house-rules" ref={setRef("house-rules")}>
            <SectionHeading>House Rules</SectionHeading>
            <ul className="flex flex-col gap-2">
              {houseRules.map((item) => (
                <li key={item.rule_id} className="flex items-start gap-2">
                  <span className="mt-2 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                  <Typography>{item.description}</Typography>
                </li>
              ))}
            </ul>
          </div>

          <Divider />

          {/* Cancellation */}
          <div id="cancellation" ref={setRef("cancellation")}>
            <SectionHeading>Cancellation Policy</SectionHeading>
            <CancellationPolicy />
          </div>

          {/* Nearby */}
          {nearby.length > 0 && (
            <>
              <Divider />
              <div id="nearby" ref={setRef("nearby")}>
                <SectionHeading>Nearby Attractions</SectionHeading>
                <Carousel
                  spaceBetween={12}
                  slidesPerView={1.4}
                  breakpoints={{
                    480: { slidesPerView: 1.8 },
                    640: { slidesPerView: 2.2 },
                    900: { slidesPerView: 3 },
                  }}
                  showDots={false}
                  arrowPosition="outside"
                  arrowVisibility={nearby.length < 4 ? "hidden" : "hover"}
                >
                  <>
                    {nearby.map((item) => (
                      <SwiperSlide key={item.attraction_id}>
                        <Card className="overflow-hidden">
                          <div
                            className="relative"
                            style={{ aspectRatio: "4/3" }}
                          >
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <Typography variant="subtitle2" fontWeight={600}>
                              {item.title}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {item.distance} away
                            </Typography>
                            <ReadMore
                              textVariant="caption"
                              text={item.description}
                              maxLength={80}
                            />
                          </div>
                        </Card>
                      </SwiperSlide>
                    ))}
                  </>
                </Carousel>
              </div>
            </>
          )}

          {/* Location */}
          {propertyDetails.map_location && (
            <>
              <Divider />
              <div id="location" ref={setRef("location")} className="mb-6">
                <SectionHeading>Location</SectionHeading>
                <div
                  className="w-full overflow-hidden rounded-lg"
                  style={{ height: 320 }}
                >
                  <iframe
                    src={propertyDetails.map_location}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${propertyDetails.name} location`}
                  />
                </div>
                {coord && (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    endIcon={<ArrowRight size={14} />}
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${coord.lat},${coord.lng}`,
                        "_blank",
                      )
                    }
                  >
                    Get Directions
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── Sticky booking widget (desktop) ──
             top = navbar + tab bar + small gap.
             Tab bar is ~44px; this keeps the widget
             flush below both sticky bars.
        ── */}
        <div className="hidden md:block col-span-4">
          <div className="sticky" style={{ top: `${NAVBAR_H.md + 44 + 12}px` }}>
            <Typography variant="h6">Plan Your Exclusive Escape!</Typography>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <BookingWidget
                propertyId={propertyDetails.property_id}
                propertyName={propertyDetails.name}
                unitGroups={propertyDetails.unit_groups}
                bookingType={propertyDetails.booking_type}
                defaultCheckIn={checkIn}
                defaultCheckOut={checkOut}
                guests={guests ? Number(guests) : undefined}
                onStateChange={setWidgetState}
              />
            </Card>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky booking bar ── */}
      <Paper
        elevation={4}
        className="md:hidden fixed bottom-0 w-full z-50 rounded-none!"
        sx={{ px: 2, py: 1.5 }}
      >
        <div className="flex justify-between items-center gap-3">
          <button onClick={() => setOpenForm(true)} className="text-left">
            {isDirect && propertyDetails.unit_groups[0]?.pricing ? (
              <div>
                <Typography
                  variant="subtitle1"
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
                      ? ` · ${widgetState.nights}N`
                      : " / night"}
                  </Typography>
                </Typography>
                {widgetState?.checkIn && widgetState?.checkOut ? (
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {dayjs(widgetState.checkIn).format("DD MMM")} –{" "}
                    {dayjs(widgetState.checkOut).format("DD MMM")}
                    {` · ${+widgetState.adults + +widgetState.children} guest${widgetState.adults + widgetState.children === 1 ? "" : "s"}`}
                    {widgetState.infants > 0
                      ? `, ${widgetState.infants} infant${widgetState.infants === 1 ? "" : "s"}`
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
                    {dayjs(widgetState.checkIn).format("DD MMM")} –{" "}
                    {dayjs(widgetState.checkOut).format("DD MMM")}
                  </Typography>
                )}
              </div>
            )}
          </button>
          <Button
            variant="contained"
            onClick={() => setOpenForm(true)}
            sx={{ flexShrink: 0 }}
          >
            {isDirect ? "Book Now" : "Enquire Now"}
          </Button>
        </div>
      </Paper>

      {/* ── Gallery dialog ── */}
      <Dialog
        open={openGallery}
        onClose={() => setOpenGallery(false)}
        fullScreen
        slotProps={{
          paper: {
            sx: {
              width: { xs: "95vw", md: "80vw" },
              maxHeight: "96vh",
              borderRadius: 2,
              backgroundImage: "none",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            px: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Photos
          </Typography>
          <IconButton size="small" onClick={() => setOpenGallery(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 1 }}>
          {galleryImages && <ImageGallery images={galleryImages} />}
        </DialogContent>
      </Dialog>

      {/* ── Unit gallery dialog ── */}
      <Dialog
        open={openUnitGallery}
        onClose={() => setOpenUnitGallery(false)}
        fullScreen
        slotProps={{
          paper: {
            sx: {
              width: { xs: "95vw", md: "80vw" },
              maxHeight: "96vh",
              borderRadius: 2,
              backgroundImage: "none",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            px: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Photos
          </Typography>
          <IconButton size="small" onClick={() => setOpenUnitGallery(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 1 }}>
          {unitGalleryImages && selectedUnit && (
            <ImageGallery images={unitGalleryImages[selectedUnit]} />
          )}
        </DialogContent>
      </Dialog>

      {/* ── Mobile booking drawer ── */}
      <Drawer
        anchor="bottom"
        open={openForm}
        onClose={() => setOpenForm(false)}
      >
        <Box sx={{ p: 2 }}>
          <div className="flex items-center gap-3 mb-3">
            <IconButton size="small" onClick={() => setOpenForm(false)}>
              <IoArrowBackOutline size={16} />
            </IconButton>
            <Typography variant="subtitle1" fontWeight={600}>
              {isDirect ? "Lock in Your Dates" : "Send an Enquiry"}
            </Typography>
          </div>
          <BookingWidget
            propertyId={propertyDetails.property_id}
            propertyName={propertyDetails.name}
            unitGroups={propertyDetails.unit_groups}
            bookingType={propertyDetails.booking_type}
            defaultCheckIn={checkIn}
            defaultCheckOut={checkOut}
            guests={guests ? Number(guests) : undefined}
            onStateChange={setWidgetState}
          />
        </Box>
      </Drawer>

      <DraggableWhatsApp onClick={handleWhatsAppContact} />
    </section>
  );
};

export default Property;
