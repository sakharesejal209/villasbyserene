// src/app/home/Home.tsx
"use client";

import { useCallback, useState } from "react";
import { Fab } from "@mui/material";
import { WhatsApp } from "@mui/icons-material";
import { motion } from "motion/react";
import { usePropertyStore } from "@/context/PropertyContext";
import { PropertyListItemDTO, ThemeDTO } from "@/app/@types";

// ── Section components ────────────────────────────────────────────
import { HeroSection } from "./components/HeroSection";
import { FeaturedVillas } from "./components/FeaturedVillas";
import { TopLocations } from "./components/TopLocations";
import { ThemeSection } from "./components/ThemeSection";
import { TrustSection } from "./components/TrustSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ListPropertySection } from "./components/ListPropertySection";
import { CtaSection } from "./components/CtaSection";
import { ThemeDrawer } from "./components/ThemeDrawer";

// ── Shared fade-in — exported so section components can import it ─
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

// ═════════════════════════════════════════════════════════════════
// HOME
// ═════════════════════════════════════════════════════════════════
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
        <WhatsApp />
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
