"use client";

import { useCallback, useState } from "react";
import { Fab, useMediaQuery, useTheme } from "@mui/material";
import { IoLogoWhatsapp as WhatsApp } from "react-icons/io5";

import { motion } from "motion/react";
import { usePropertyStore } from "@/context/PropertyContext";
import { PropertyListItemDTO, ThemeDTO } from "@/app/@types";

import { FeaturedVillas } from "./components/FeaturedVillas";
import dynamic from "next/dynamic";
import HeroSection from "./components/HeroSection";

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
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, ease: "linear" }}
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      <HeroSection theme={theme} isMobile={isMobile} />

      {/* 2. Featured Villas — highest conversion section (NEW) */}
      <FeaturedVillas />

      {/* 4. Browse by Theme */}
      <ThemeSection onThemeSelect={handleThemeSelection} />

      {/* 3. Top Locations */}
      <TopLocations />

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
