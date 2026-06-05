"use client";

import { useCallback, useState } from "react";
import { Fab } from "@mui/material";
import { IoLogoWhatsapp as WhatsApp } from "react-icons/io5";

import { motion } from "motion/react";
import { usePropertyStore } from "@/context/PropertyContext";
import { PropertyListItemDTO, ThemeDTO } from "@/app/@types";

import { HeroSection } from "./components/HeroSection";
import { FeaturedVillas } from "./components/FeaturedVillas";
import dynamic from "next/dynamic";
// import { TopLocations } from "./components/TopLocations";
// import { ThemeSection } from "./components/ThemeSection";
// import { TrustSection } from "./components/TrustSection";
// import { TestimonialsSection } from "./components/TestimonialsSection";
// import { ListPropertySection } from "./components/ListPropertySection";
// import { CtaSection } from "./components/CtaSection";
// import { ThemeDrawer } from "./components/ThemeDrawer";

const TopLocations = dynamic(() =>
  import("./components/TopLocations").then((m) => ({
    default: m.TopLocations,
  })),
);
const ThemeSection = dynamic(() =>
  import("./components/ThemeSection").then((m) => ({
    default: m.ThemeSection,
  })),
);
const TestimonialsSection = dynamic(() =>
  import("./components/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const TrustSection = dynamic(() =>
  import("./components/TrustSection").then((m) => ({
    default: m.TrustSection,
  })),
);
const ListPropertySection = dynamic(() =>
  import("./components/ListPropertySection").then((m) => ({
    default: m.ListPropertySection,
  })),
);
const CtaSection = dynamic(() =>
  import("./components/CtaSection").then((m) => ({ default: m.CtaSection })),
);
const ThemeDrawer = dynamic(() =>
  import("./components/ThemeDrawer").then((m) => ({ default: m.ThemeDrawer })),
);

export const FadeInSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const { properties } = usePropertyStore();

  const [openPropTheme, setOpenPropTheme] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<
    PropertyListItemDTO[]
  >([]);
  const [selectedPropTheme, setSelectedPropTheme] = useState<string>("");

  const handleThemeSelection = useCallback(
    (proptheme: string) => {
      setFilteredProperties(
        properties.filter((p) =>
          p.themes.some((t: ThemeDTO) => t.theme_id === proptheme),
        ),
      );
      setSelectedPropTheme(proptheme);
      setOpenPropTheme(true);
    },
    [properties],
  );

  const handleWhatsAppContact = useCallback(
    () =>
      window.open(
        `https://wa.me/9594377736?text=${encodeURIComponent(
          "Hi, I'd like to know more about your villas and availability",
        )}`,
        "_blank",
      ),
    [],
  );

  return (
    <div>
      {/* 1. Hero — video parallax + search + trust bar */}
      <HeroSection />

      {/* 2. Featured Villas — highest conversion section (NEW) */}
      <FeaturedVillas />

      {/* 3. Top Locations */}
      <TopLocations />

      {/* 4. Browse by Theme */}
      <ThemeSection onThemeSelect={handleThemeSelection} />

      {/* 5. Testimonials — peer validation before brand claims */}
      <TestimonialsSection />

      {/* 6. Why VBS — trust cards (now with Instant Confirmation) */}
      <TrustSection />

      {/* 7. List Your Property — for owners */}
      <ListPropertySection />

      {/* 8. Final CTA — brand green, urgency */}
      <CtaSection onWhatsApp={handleWhatsAppContact} />

      {/* Floating WhatsApp */}
      <Fab
        color="success"
        aria-label="whatsapp"
        onClick={handleWhatsAppContact}
        sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
      >
        <WhatsApp fontSize={28} />
      </Fab>

      {/* Theme Drawer */}
      {selectedPropTheme && (
        <ThemeDrawer
          open={openPropTheme}
          onClose={() => setOpenPropTheme(false)}
          selectedPropTheme={selectedPropTheme}
          filteredProperties={filteredProperties}
        />
      )}
    </div>
  );
};

export default Home;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   alpha,
//   Box,
//   Button,
//   Drawer,
//   Fab,
//   IconButton,
//   Paper,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";


// import {
//   IoStarOutline as Star,
//   IoShieldCheckmarkOutline as Shield,
//   IoFlashOutline as Flash,
//   IoCloseOutline as CloseIcon,
//   IoPeopleOutline as PeopleIcon,
//   IoBedOutline as BedIcon,
//   IoHomeOutline as HouseIcon,
//   IoTrendingUpOutline as LineUpIcon,
//   IoSettingsOutline as SettingsIcon,
//   IoHomeOutline as HomeIcon,
//   IoLogoWhatsapp as WhatsApp,
//   IoArrowForward as ArrowForwardIcon,
// } from "react-icons/io5";
// import { AiOutlineClockCircle as Clock } from "react-icons/ai";
// import { LuCircleCheckBig as CheckCircleIcon } from "react-icons/lu";

// import { SwiperSlide } from "swiper/react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion } from "motion/react";
// import { usePropertyStore } from "@/context/PropertyContext";
// import { Carousel, EmptyState } from "@/application/default";
// import propertyThemeMap from "@/lib/property-theme-config/propertyThemeConfig";
// import SearchBox from "./searchBox";
// import { getAccomodation } from "../stays/stays";
// import testimonials from "./data/testimonials.json";
// import topLocations from "./data/topLocations.json";
// import { PropertyListItemDTO, ThemeDTO } from "@/app/@types";

// // ── Shared fade-in animation ──────────────────────────────────────
// export const FadeInSection = ({ children }: { children: React.ReactNode }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true, margin: "-80px" }}
//     transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//   >
//     {children}
//   </motion.div>
// );

// // ── Why VBS trust card ────────────────────────────────────────────
// const TrustCard = ({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) => {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === "dark";
//   return (
//     <div className="text-center p-2 md:p-6">
//       <Box
//         sx={{
//           width: 64,
//           height: 64,
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           mx: "auto",
//           mb: 2,
//           bgcolor: isDark
//             ? alpha(theme.palette.secondary.main, 0.1)
//             : alpha(theme.palette.primary.main, 0.1),
//         }}
//       >
//         {icon}
//       </Box>
//       <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
//         {title}
//       </Typography>
//       <Typography color="text.secondary">{description}</Typography>
//     </div>
//   );
// };

// // ═════════════════════════════════════════════════════════════════
// // HOME
// // ═════════════════════════════════════════════════════════════════
// const Home = () => {
//   const theme = useTheme();
//   const router = useRouter();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
//   const isDark = theme.palette.mode === "dark";

//   const [openPropTheme, setOpenPropTheme] = useState(false);
//   const [filteredProperties, setFilteredProperties] =
//     useState<PropertyListItemDTO[]>();
//   const [selectedPropTheme, setSelectedPropTheme] = useState<string>();
//   const [fits, setFits] = useState<Record<number, "cover" | "contain">>({});

//   const { properties } = usePropertyStore();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const propertythemes = Object.keys(propertyThemeMap);

//   useEffect(() => {
//     if (videoRef.current) videoRef.current.playbackRate = 0.85;
//   }, []);

//   const handleThemeSelection = useCallback(
//     (proptheme: string) => {
//       setFilteredProperties(
//         properties.filter((p) =>
//           p.themes.some((t: ThemeDTO) => t.theme_id === proptheme),
//         ),
//       );
//       setSelectedPropTheme(proptheme);
//       setOpenPropTheme(true);
//     },
//     [properties],
//   );

//   const handleSelect = useCallback(
//     (name: string, propertyId: string) =>
//       router.push(`/property/${name}-${propertyId}`),
//     [router],
//   );

//   const handleImageLoad = useCallback(
//     (idx: number, img: HTMLImageElement) =>
//       setFits((prev) => ({
//         ...prev,
//         [idx]: img.naturalWidth / img.naturalHeight < 1 ? "contain" : "cover",
//       })),
//     [],
//   );

//   const handleWhatsAppContact = useCallback(
//     () =>
//       window.open(
//         `https://wa.me/9594377736?text=${encodeURIComponent(
//           "Hi, I'd like to know more about your villas and availability",
//         )}`,
//         "_blank",
//       ),
//     [],
//   );

//   const iconSx = {
//     fontSize: "28px",
//     color: isDark ? theme.palette.secondary.main : theme.palette.primary.main,
//   };

//   return (
//     <div>
//       {/* ── HERO ──────────────────────────────────────────────── */}
//       <section className="flex justify-center items-center w-screen h-screen">
//         <div className="absolute inset-0">
//           <video
//             ref={videoRef}
//             autoPlay
//             loop
//             muted
//             playsInline
//             style={{
//               position: "absolute",
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               filter: isDark ? "brightness(0.47)" : "brightness(0.60)",
//               top: 0,
//               left: 0,
//               zIndex: -1,
//             }}
//           >
//             <source src="/assets/herovideo.webm" type="video/webm" />
//           </video>
//         </div>
//         <div className="p-4 md:p-0 slide-bottom w-full md:w-[70%] mx-auto">
//           <div className="text-white">
//             <Typography variant="h2">PLAN YOUR</Typography>
//             <Typography variant="h2">PERFECT GETAWAY!</Typography>
//           </div>
//           <SearchBox />
//         </div>
//       </section>

//       {/* ── TOP LOCATIONS ─────────────────────────────────────── */}
//       <section>
//         <div className="container">
//           <FadeInSection>
//             <div className="text-center mb-10 md:mb-12">
//               <Typography variant="h4" sx={{ mb: 1 }}>
//                 Discover Our Top Locations
//               </Typography>
//               <Typography color="text.secondary">
//                 From serene beaches to mountain retreats, explore our handpicked
//                 destinations
//               </Typography>
//             </div>
//             <Carousel
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               breakpoints={{
//                 320: { slidesPerView: 2, spaceBetween: 8 },
//                 480: { slidesPerView: 3, spaceBetween: 8 },
//                 900: { slidesPerView: 4 },
//               }}
//               slidesPerView={4}
//               spaceBetween={15}
//               showDots={false}
//               arrowVisibility="hover"
//               variant={isDark ? "dark" : "light"}
//               arrowPosition="outside"
//             >
//               <>
//                 {topLocations.map((item) => (
//                   <SwiperSlide key={item.locationId}>
//                     <div
//                       className="relative group overflow-hidden cursor-pointer"
//                       onClick={() =>
//                         router.push(`/stays/${item.locationId}?guests=2`)
//                       }
//                     >
//                       <div className="relative aspect-4/5 overflow-hidden">
//                         <Image
//                           src={item.locationImg}
//                           alt={item.locationId}
//                           fill
//                           sizes="(max-width: 768px) 50vw, 25vw"
//                           className="object-cover transition-transform duration-300 group-hover:scale-105"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
//                         <div className="absolute bottom-0 left-0 right-0 p-2 md:p-5">
//                           <Typography
//                             variant="h6"
//                             sx={{ color: "#fff", mb: { xs: 0, md: 0.5 } }}
//                           >
//                             {item.locationId}
//                           </Typography>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               color: "rgba(255,255,255,0.85)",
//                               display: { xs: "none", md: "block" },
//                             }}
//                           >
//                             {item.description}
//                           </Typography>
//                         </div>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </>
//             </Carousel>
//             <div className="flex justify-center mt-8">
//               <Button
//                 variant="contained"
//                 size="large"
//                 onClick={() => router.push("/stays/all")}
//               >
//                 Explore All Locations
//               </Button>
//             </div>
//           </FadeInSection>
//         </div>
//       </section>

//       {/* ── THEMES ────────────────────────────────────────────── */}
//       <section>
//         <div className="container">
//           <FadeInSection>
//             <div className="text-center mb-10 md:mb-12">
//               <Typography variant="h4" sx={{ mb: 1 }}>
//                 Select your sanctuary of comfort and calm
//               </Typography>
//               <Typography color="text.secondary">
//                 Explore handpicked homes for every kind of getaway.
//               </Typography>
//             </div>
//             <Carousel
//               autoplay={{ delay: 2000, disableOnInteraction: false }}
//               breakpoints={{
//                 240: { slidesPerView: 2 },
//                 480: { slidesPerView: 3 },
//                 900: { slidesPerView: 5 },
//               }}
//               slidesPerView={5}
//               spaceBetween={0}
//               showDots={false}
//               arrowVisibility="hidden"
//             >
//               <>
//                 {propertythemes.map((proptheme) => (
//                   <SwiperSlide key={propertyThemeMap[proptheme].label}>
//                     <button
//                       onClick={() => handleThemeSelection(proptheme)}
//                       className="w-full flex flex-col items-center justify-center gap-3 cursor-pointer"
//                     >
//                       <Box
//                         className="w-13 md:w-20 h-13 md:h-20"
//                         sx={{
//                           bgcolor: theme.palette.grey[600],
//                           p: "1.25rem",
//                           borderRadius: "50%",
//                         }}
//                       >
//                         <Image
//                           src={
//                             isDark
//                               ? propertyThemeMap[proptheme].darkImg
//                               : propertyThemeMap[proptheme].lightImg
//                           }
//                           alt={propertyThemeMap[proptheme].label}
//                           width={90}
//                           height={90}
//                         />
//                       </Box>
//                       <Typography variant="h6">
//                         {propertyThemeMap[proptheme].label}
//                       </Typography>
//                     </button>
//                   </SwiperSlide>
//                 ))}
//               </>
//             </Carousel>
//           </FadeInSection>
//         </div>
//       </section>

//       {/* ── WHY VBS ───────────────────────────────────────────── */}
//       <section style={{ paddingBottom: 0 }}>
//         <Paper
//           elevation={0}
//           sx={{
//             py: { xs: 5, md: 8 },
//             borderRadius: 0,
//             bgcolor: isDark ? "background.paper" : "#F2F1ED",
//           }}
//         >
//           <div className="container">
//             <FadeInSection>
//               <div className="text-center mb-8">
//                 <Typography variant="h4" sx={{ mb: 1 }}>
//                   Why Choose Villas By Serene?
//                 </Typography>
//                 <Typography
//                   color="text.secondary"
//                   sx={{ maxWidth: 560, mx: "auto" }}
//                 >
//                   We provide exceptional vacation rental experiences with
//                   personalized service and premium properties because your
//                   holiday deserves more than just a stay
//                 </Typography>
//               </div>
//               <div className="grid md:grid-cols-3 gap-2 md:gap-8">
//                 <TrustCard
//                   icon={<Star style={iconSx} />}
//                   title="Premium Properties"
//                   description="Hand-selected vacation rentals that meet our high standards for comfort and luxury"
//                 />
//                 <TrustCard
//                   icon={<Shield style={iconSx} />}
//                   title="Trusted & Secure"
//                   description="All our properties are verified and we provide secure booking with full support"
//                 />
//                 <TrustCard
//                   icon={<Clock style={iconSx} />}
//                   title="24/7 Support"
//                   description="Our dedicated team is always available to ensure your vacation is perfect"
//                 />
//               </div>
//             </FadeInSection>
//           </div>
//         </Paper>
//       </section>

//       {/* ── TESTIMONIALS ──────────────────────────────────────── */}
//       <section>
//         <div className="container">
//           <FadeInSection>
//             <div className="text-center mb-8">
//               <Typography variant="h4" sx={{ mb: 1 }}>
//                 What Our Guests Say
//               </Typography>
//               <Typography
//                 color="text.secondary"
//                 sx={{ maxWidth: 520, mx: "auto" }}
//               >
//                 Hospitality that goes beyond expectations. Discover what makes
//                 each stay a truly refined experience through the words of our
//                 delighted guests.
//               </Typography>
//             </div>
//             <Carousel
//               spaceBetween={12}
//               slidesPerView={4}
//               breakpoints={{
//                 320: { slidesPerView: 2, spaceBetween: 8 },
//                 768: { slidesPerView: 3, spaceBetween: 8 },
//                 1024: { slidesPerView: 4 },
//               }}
//               showDots={false}
//               autoplay={{ delay: 3000, disableOnInteraction: true }}
//               arrowVisibility="hidden"
//             >
//               {testimonials.map((t) => (
//                 <SwiperSlide key={t.id}>
//                   <div className="flex flex-col items-center">
//                     <div className="relative w-full aspect-square overflow-hidden shadow-md">
//                       {t.mediaType === "video" ? (
//                         <video
//                           src={t.src}
//                           controls
//                           playsInline
//                           className="absolute top-0 left-0 w-full h-full object-cover"
//                           poster={t.poster}
//                         />
//                       ) : (
//                         <Image
//                           src={t.src}
//                           alt={t.name}
//                           fill
//                           sizes="(max-width: 768px) 50vw, 25vw"
//                           style={{ objectFit: "cover" }}
//                         />
//                       )}
//                     </div>
//                     <Typography variant="caption" sx={{ mt: 1 }}>
//                       {t.name}
//                     </Typography>
//                     <Typography variant="h6">{t.property}</Typography>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Carousel>
//           </FadeInSection>
//         </div>
//       </section>

//       {/* ── LIST PROPERTY ─────────────────────────────────────── */}
//       <section>
//         <div className="container">
//           <FadeInSection>
//             <div className="grid lg:grid-cols-2 gap-8 items-center">
//               <div className="relative md:aspect-4/3 aspect-video">
//                 <Image
//                   src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fswimmingpool9.webp?alt=media&token=4d4e883c-4172-44e3-986d-471816051039"
//                   alt="Villa management services"
//                   fill
//                   sizes="(max-width: 1024px) 100vw, 50vw"
//                   style={{ objectFit: "cover", objectPosition: "center" }}
//                   priority
//                 />
//               </div>
//               <div>
//                 <Typography variant="h4" sx={{ mb: 1.5 }}>
//                   Unlock The True Potential of Your Property
//                 </Typography>
//                 <Typography color="text.secondary">
//                   We know managing a property is more than just opening doors.
//                   It&apos;s staff training, marketing, guest communication,
//                   upkeep, and a hundred little details.
//                 </Typography>
//                 <Typography fontWeight={600} sx={{ my: 2 }}>
//                   That&apos;s where we come in!
//                 </Typography>

//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 2,
//                     mb: 3,
//                   }}
//                 >
//                   {[
//                     {
//                       icon: <CheckCircleIcon />,
//                       text: "Complete Management: From bookings, payments, and toiletries to property visits and staff management",
//                     },
//                     {
//                       icon: <LineUpIcon />,
//                       text: "Revenue Optimization: We suggest trendy upgrades and handle marketing to maximize your property's profitability",
//                     },
//                     {
//                       icon: <SettingsIcon />,
//                       text: "Always Guest-Ready: Your villa stays in perfect condition with our comprehensive maintenance and preparation services",
//                     },
//                   ].map((item, idx) => (
//                     <div key={idx} className="flex items-start gap-3">
//                       <Box
//                         sx={{
//                           color: isDark ? "secondary.main" : "primary.main",
//                           mt: 0.25,
//                           flexShrink: 0,
//                         }}
//                       >
//                         {item.icon}
//                       </Box>
//                       <Typography color="text.secondary">
//                         {item.text}
//                       </Typography>
//                     </div>
//                   ))}
//                 </Box>

//                 <Typography variant="h6" sx={{ mb: 1.5 }}>
//                   You relax. We manage. You earn.
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   startIcon={<HomeIcon />}
//                   onClick={() => router.push("/list")}
//                 >
//                   List Your Home Today
//                 </Button>
//               </div>
//             </div>
//           </FadeInSection>
//         </div>
//       </section>

//       {/* ── READY TO BOOK CTA ─────────────────────────────────── */}
//       <section className="text-white p-6 bg-[#3b3a3b]">
//         <div className="container text-center">
//           <Typography variant="h5" sx={{ mb: 1 }}>
//             Ready to Book Your Dream Vacation?
//           </Typography>
//           <Typography sx={{ mb: 4, opacity: 0.85 }}>
//             Contact us directly via WhatsApp for personalized assistance and
//             instant booking
//           </Typography>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button
//               variant="contained"
//               size="large"
//               startIcon={<WhatsApp />}
//               onClick={handleWhatsAppContact}
//             >
//               Contact on WhatsApp
//             </Button>
//             <Button
//               variant="outlined"
//               color="secondary"
//               size="large"
//               sx={{ borderColor: "white", color: "white" }}
//               onClick={() => router.push("/stays/all")}
//             >
//               Browse Properties
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* ── FLOATING WHATSAPP ─────────────────────────────────── */}
//       <Fab
//         color="success"
//         aria-label="whatsapp"
//         onClick={handleWhatsAppContact}
//         sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
//       >
//         <WhatsApp />
//       </Fab>

//       {/* ── THEME DRAWER ──────────────────────────────────────── */}
//       {selectedPropTheme && (
//         <Drawer
//           open={openPropTheme}
//           onClose={() => setOpenPropTheme(false)}
//           anchor={isSmallScreen ? "bottom" : "left"}
//           sx={{
//             "& .MuiDrawer-paper": {
//               width: isSmallScreen ? "100vw" : "80vw",
//               height: isSmallScreen ? "85vh" : "100vh",
//             },
//           }}
//         >
//           <Box
//             sx={{
//               borderBottom: `1px solid ${theme.palette.divider}`,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               p: 2,
//             }}
//           >
//             <Typography variant="h6">
//               Curated Just for You: {propertyThemeMap[selectedPropTheme].label}
//             </Typography>
//             <IconButton onClick={() => setOpenPropTheme(false)}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <Box sx={{ p: 2, overflowY: "auto" }}>
//             {filteredProperties?.length ? (
//               filteredProperties.map((item) => (
//                 <div
//                   key={item.property_id}
//                   className="w-full grid grid-cols-1 gap-2 md:grid-cols-12 md:gap-8 mb-6"
//                 >
//                   <div className="md:col-span-5">
//                     <Carousel slidesPerView={1}>
//                       <button>
//                         {item.carousel_images.map((e, idx) => (
//                           <SwiperSlide
//                             key={idx}
//                             className="cursor-pointer"
//                             onClick={() =>
//                               handleSelect(item.name, item.property_id)
//                             }
//                           >
//                             <div className="relative w-full aspect-[5/3] md:aspect-[16/9] overflow-hidden">
//                               <Image
//                                 src={e.image_url}
//                                 alt={e.image_alt ?? "Property image"}
//                                 fill
//                                 sizes="(max-width: 768px) 100vw, 50vw"
//                                 style={{
//                                   objectFit: fits?.[idx] ?? "cover",
//                                   objectPosition: "center",
//                                 }}
//                                 onLoadingComplete={(img) =>
//                                   handleImageLoad(idx, img)
//                                 }
//                                 priority={idx === 0}
//                               />
//                             </div>
//                           </SwiperSlide>
//                         ))}
//                       </button>
//                     </Carousel>
//                   </div>
//                   <div className="md:col-span-7 flex flex-col justify-center gap-2">
//                     <Typography
//                       variant="h5"
//                       className="cursor-pointer"
//                       onClick={() => handleSelect(item.name, item.property_id)}
//                     >
//                       {item.name}
//                     </Typography>
//                     <Typography color="text.secondary">
//                       {item.area}, {item.state}, {item.country}
//                     </Typography>
//                     <div className="flex items-center gap-3">
//                       {[
//                         { icon: <PeopleIcon />, value: item.max_capacity },
//                         { icon: <BedIcon />, value: item.bedroom_count },
//                         {
//                           icon: <HouseIcon />,
//                           value: getAccomodation(item.accommodation_type),
//                         },
//                       ].map((stat, i) => (
//                         <div key={i} className="flex items-center gap-1">
//                           {stat.icon}
//                           <Typography variant="body2">{stat.value}</Typography>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <EmptyState
//                 message="No properties"
//                 description="Couldn't find properties for your search"
//               />
//             )}
//           </Box>
//         </Drawer>
//       )}
//     </div>
//   );
// };

// export default Home;
