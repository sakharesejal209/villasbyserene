"use client";

import React, { useRef, useState } from "react";

import {
  IoSettingsOutline as Settings,
  IoCameraOutline as Camera,
  IoTrendingUpOutline as TrendingUp,
  IoArrowForwardOutline as ArrowRight,
  IoCheckmarkCircleOutline as CheckCircle,
  IoAddOutline as PlusIcon,
  IoChatbubbleOutline as ChatIcon,
  IoGlobeOutline as GlobeIcon,
  IoPersonOutline as PersonIcon,
  IoClipboardOutline as ClipboardIcon,
  IoCashOutline as CashIcon,
  IoLeafOutline as LeafIcon,
  IoLogoWhatsapp,
} from "react-icons/io5";

import { PiTargetLight as Target } from "react-icons/pi";
import {
  MdOutlinePhone as Phone,
  MdOutlineGroups as Users,
} from "react-icons/md";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

import { FadeInSection } from "../home/home";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

// ════════════════════════════════════════════════════════════════
// Static content
// ════════════════════════════════════════════════════════════════

const services = [
  {
    icon: Camera,
    title: "Listings & Photography",
    description:
      "Professional photography and listing copy that converts browsers into bookings.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Instagram, Meta Ads, and our guest network working together to fill your calendar.",
  },
  {
    icon: PersonIcon,
    title: "Guest Vetting",
    description:
      "Every guest is screened before they step through your door. No exceptions.",
  },
  {
    icon: ClipboardIcon,
    title: "Booking Management",
    description:
      "Inquiries, confirmations, payments - all managed end to end by our team.",
  },
  {
    icon: CashIcon,
    title: "Price Optimisation",
    description:
      "Dynamic pricing across peak weekends, long weekends, and off-season periods.",
  },
  {
    icon: Users,
    title: "Staff Management",
    description:
      "Caretaker briefing, check-in coordination, and on-ground oversight for every stay.",
  },
  {
    icon: Settings,
    title: "Maintenance Coordination",
    description:
      "We flag issues, coordinate repairs, and keep your property in top condition.",
  },
  {
    icon: TrendingUp,
    title: "Owner Reports",
    description:
      "Clear monthly statements - bookings, earnings, occupancy. Nothing hidden.",
  },
];

const problemItems = [
  "High commissions eating into your earnings every booking",
  "Guests who weren't vetted and damage that followed",
  "You managing calls, complaints and coordination yourself",
  "A platform that treats your villa like just another listing",
  "Weekends still going to waste despite being \u201clisted\u201d",
];

const howSteps = [
  {
    title: "Property Visit",
    description:
      "We walk through your villa. No commitment needed at this point.",
  },
  {
    title: "Onboarding",
    description:
      "Professional photography, listing creation, pricing strategy.",
  },
  {
    title: "Marketing",
    description:
      "Your villa goes live across our platform, Instagram, and ads.",
  },
  {
    title: "Bookings",
    description: "We handle every inquiry, guest, check-in, and checkout.",
  },
  {
    title: "You Get Paid",
    description:
      "Revenue transferred to you after every booking. Clean and transparent.",
  },
];

const earningData = {
  karjat: {
    property: "2–3 BHK Villa",
    location: "Karjat · Maharashtra",
    range: "₹80K–₹1.2L",
    ef1: "₹12,000–₹18,000",
    ef2: "6–8 nights",
    ef3: "Up to 2x rate",
    ef4: "Private pool",
    label: "2–3 BHK Villa",
    sub: "Karjat · Private Pool",
    amount: "₹80K+",
  },
  alibaug: {
    property: "3–4 BHK Villa",
    location: "Alibaug · Maharashtra",
    range: "₹1.2L–₹2L",
    ef1: "₹18,000–₹28,000",
    ef2: "7–9 nights",
    ef3: "Up to 2.5x rate",
    ef4: "Beach proximity",
    label: "3–4 BHK Villa",
    sub: "Alibaug · Beachside",
    amount: "₹1.2L+",
  },
  maha: {
    property: "4–5 BHK Villa",
    location: "Mahabaleshwar · Maharashtra",
    range: "₹1.8L–₹2.8L",
    ef1: "₹22,000–₹35,000",
    ef2: "8–10 nights",
    ef3: "Up to 3x rate",
    ef4: "Valley views",
    label: "4–5 BHK Villa",
    sub: "Mahabaleshwar · View",
    amount: "₹1.8L+",
  },
  premium: {
    property: "5 BHK+ Luxury Villa",
    location: "Premium Location",
    range: "₹3L–₹5L+",
    ef1: "₹40,000–₹80,000",
    ef2: "8–12 nights",
    ef3: "Up to 4x rate",
    ef4: "Luxury amenities",
    label: "5 BHK+ Luxury",
    sub: "Any Location · Premium",
    amount: "₹3L+",
  },
} as const;

type EarningKey = keyof typeof earningData;

const revenueScenarios = {
  standard: {
    label: "Standard Kitchen",
    net: "₹85,700 – ₹1,21,800",
    foodCostMin: "₹43,200",
    foodCostMax: "₹62,400",
    ohMin: "₹68,200",
    ohMax: "₹1,07,400",
    netMin: "₹85,700",
    netMax: "₹1,21,800",
    showNote: false,
  },
  inhouse: {
    label: "Inhouse Kitchen ✦",
    net: "₹1,01,828 – ₹1,45,800",
    foodCostMin: "₹27,072",
    foodCostMax: "₹38,400",
    ohMin: "₹52,072",
    ohMax: "₹83,400",
    netMin: "₹1,01,828",
    netMax: "₹1,45,800",
    showNote: true,
  },
} as const;

type RevenueKey = keyof typeof revenueScenarios;

const tableRows: {
  type: "section" | "row" | "total" | "highlight" | "net";
  label: string;
  min?: string;
  max?: string;
}[] = [
  { type: "section", label: "Gross Revenue" },
  {
    type: "row",
    label: "Accommodation (6–8 nights)",
    min: "₹1,08,000",
    max: "₹1,76,000",
  },
  {
    type: "row",
    label: "Food (12 guests × nights)",
    min: "₹97,200",
    max: "₹1,29,600",
  },
  { type: "total", label: "Total Gross", min: "₹2,05,200", max: "₹3,05,600" },
  { type: "section", label: "Revenue Share" },
  { type: "row", label: "VBS - 25%", min: "₹51,300", max: "₹76,400" },
  {
    type: "highlight",
    label: "Owner - 75%",
    min: "₹1,53,900",
    max: "₹2,29,200",
  },
  { type: "section", label: "Owner Overheads" },
  { type: "row", label: "Caretaker salary", min: "₹15,000", max: "₹20,000" },
  {
    type: "row",
    label: "Food supplier cost",
    min: "foodCostMin",
    max: "foodCostMax",
  },
  { type: "row", label: "Electricity", min: "₹5,000", max: "₹12,000" },
  { type: "row", label: "Genset diesel", min: "₹3,000", max: "₹8,000" },
  { type: "row", label: "Misc maintenance", min: "₹2,000", max: "₹5,000" },
  { type: "total", label: "Total Overheads", min: "ohMin", max: "ohMax" },
  { type: "section", label: "Net In Hand" },
  { type: "net", label: "Owner net take-home", min: "netMin", max: "netMax" },
];

const modelPoints = [
  {
    icon: CashIcon,
    title: "You earn on every booking",
    description:
      "Every time a guest checks in, you receive your share of the booking amount. Direct to your account. Clean statement every month.",
  },
  {
    icon: Target,
    title: "We earn when you earn",
    description:
      "Our revenue comes from the same booking as yours. If your villa sits empty, we earn nothing. Our only incentive is to fill your calendar.",
  },
  {
    icon: ClipboardIcon,
    title: "No lock-in contracts",
    description:
      "You're not tied to us. Stay because the results speak for themselves, not because a contract says you have to.",
  },
  {
    icon: LeafIcon,
    title: "Full transparency",
    description:
      "You see every booking, every amount, every deduction. Nothing is hidden. Nothing is vague.",
  },
];

const orbitLabels = [
  "No Fixed Rent",
  "No Lock-In",
  "No Upfront Cost",
  "No Hidden Cuts",
  "No Surprises",
];

const faqs = [
  {
    q: "What is the revenue share percentage?",
    a: "We discuss the split transparently during our first conversation, it depends on the property, location, and what we're managing. We'd rather have that conversation directly than publish a number that doesn't apply to every situation.",
  },
  {
    q: "Can I use my villa personally during the year?",
    a: "Yes. Your villa stays yours. You can block dates for personal use anytime, we simply work around your availability. Most owners block a few weekends every quarter for family use.",
  },
  {
    q: "What if a guest damages something?",
    a: "We collect a security deposit from every guest. Any damage is documented, deducted from the deposit, and reported to you. We also vet every guest before arrival specifically to minimise this risk.",
  },
  {
    q: "Do I need to be available for guest calls?",
    a: "No. That's our job. All guest communication before, during, and after the stay, goes through our team. You don't manage a single call unless you want to.",
  },
  {
    q: "Can I list with you and another platform simultaneously?",
    a: "Yes, in some cases. We handle calendar synchronisation to prevent double bookings. Many owners start by listing with us alongside their existing platform and transition fully once they see the difference.",
  },
  {
    q: "How long before my villa starts getting bookings?",
    a: "Most properties get their first booking within 2–4 weeks of going live, depending on the season and location. Karjat and Alibaug tend to move faster given consistently strong weekend demand from Mumbai.",
  },
  {
    q: "Is there any upfront cost to get started?",
    a: "No upfront fees. We invest in your property's listing and marketing - and recover that through our share of bookings. You don't pay anything to get started.",
  },
];

const benefits = [
  "Transparent revenue-sharing model",
  "Proven expertise in hospitality & marketing",
  "Regular on-site visits & staff supervision",
  "Personalized service tailored to your property",
];

// ════════════════════════════════════════════════════════════════
// Sub-components
// ════════════════════════════════════════════════════════════════

const RevenueDonut = ({
  ownerColor,
  vbsColor,
  trackColor,
}: {
  ownerColor: string;
  vbsColor: string;
  trackColor: string;
}) => {
  const circumference = 2 * Math.PI * 70;
  const ownerLen = circumference * 0.75;
  const vbsLen = circumference * 0.25;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2.5,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 200 200"
        sx={{ width: 160, height: 160 }}
      >
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke={trackColor}
          strokeWidth="28"
        />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke={ownerColor}
          strokeWidth="28"
          strokeDasharray={`${ownerLen} ${circumference}`}
          strokeDashoffset={circumference - vbsLen}
          transform="rotate(-90 100 100)"
        />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke={vbsColor}
          strokeWidth="28"
          strokeDasharray={`${vbsLen} ${circumference}`}
          strokeDashoffset="0"
          transform="rotate(-90 100 100)"
        />
        <text
          x="100"
          y="94"
          textAnchor="middle"
          fontSize="26"
          fontFamily="serif"
          fill={ownerColor}
          fontWeight={600}
        >
          75%
        </text>
        <text
          x="100"
          y="114"
          textAnchor="middle"
          fontSize="11"
          fill="rgba(255,255,255,0.5)"
        >
          yours
        </text>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: ownerColor,
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.55)" }}
          >
            You - 75%
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: vbsColor }}
          />
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.55)" }}
          >
            VBS - 25%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ════════════════════════════════════════════════════════════════
// Main page
// ════════════════════════════════════════════════════════════════

const ListYourProperty = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const theme = useTheme();
  const router = useRouter();
  const contactNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  const isDark = theme.palette.mode === "dark";
  const emerald = theme.palette.primary.main;
  const gold = theme.palette.secondary?.main ?? "#FECC89";
  const bronze = "#CBAD8A";
  const stone = "#7C7670";
  const marble = "#EEEAE8";

  const [activeStep, setActiveStep] = useState(0);
  const [activeEarning, setActiveEarning] = useState<EarningKey>("karjat");
  const [revScenario, setRevScenario] = useState<RevenueKey>("standard");
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const earning = earningData[activeEarning];
  const revenue = revenueScenarios[revScenario];

  const resolveCell = (val?: string) => {
    if (!val) return "";
    if (val === "foodCostMin") return revenue.foodCostMin;
    if (val === "foodCostMax") return revenue.foodCostMax;
    if (val === "ohMin") return revenue.ohMin;
    if (val === "ohMax") return revenue.ohMax;
    if (val === "netMin") return revenue.netMin;
    if (val === "netMax") return revenue.netMax;
    return val;
  };

  return (
    <section className="p-0!">
      {/* ════════════════ HERO ════════════════ */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/air-eco%2Fexterior8.webp?alt=media&token=78b017f2-6406-4668-8844-036ce45df3d5"
            alt="Luxury villa property"
            fill
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/50 to-black/50"></div>
        </motion.div>

        <motion.div className="relative text-center px-4 text-white flex justify-center flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: gold,
                letterSpacing: "0.18em",
                opacity: 0.75,
                mb: 2,
                display: "block",
              }}
            >
              For Villa Owners
            </Typography>
            <Typography variant="h3" className="mb-2!">
              Your villa deserves to{" "}
              <em style={{ color: gold, fontStyle: "italic" }}>earn.</em>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-center md:w-[70%] m-auto">
              <Typography className="md:text-lg! my-4!">
                Most beautiful properties near Mumbai sit empty on weekends. Not
                because guests aren&apos;t looking, but because no one is
                managing them right. That&apos;s what we fix.
              </Typography>
            </div>
          </motion.div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 inline-block my-4">
            <Typography variant="subtitle1">You earn. We manage.</Typography>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 flex-wrap justify-center">
            <a
              href="https://wa.me/919594377736"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="contained" size="large">
                WhatsApp Us
              </Button>
            </a>
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              onClick={() =>
                document
                  .getElementById("how")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See how it works →
            </Button>
          </div>
        </motion.div>
      </div>

      {/* ════════════════ PROBLEM ════════════════ */}
      <div className="my-14" id="problem">
        <div className="container mx-auto md:px-16!">
          <FadeInSection>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 5, md: 10 },
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: bronze,
                    letterSpacing: "0.18em",
                    display: "block",
                    mb: 1.5,
                  }}
                >
                  The Reality
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Is your villa{" "}
                  <em style={{ fontStyle: "italic", color: stone }}>really</em>{" "}
                  working for you?
                </Typography>
                <Typography color="text.secondary">
                  Every empty weekend is a booking that didn&apos;t happen. And
                  every booking that didn&apos;t happen is money you don&apos;t
                  get back. Most owners know this, they just haven&apos;t found
                  a solution that actually works.
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 0.5,
                  borderLeft: `3px solid ${emerald}`,
                  boxShadow: isDark
                    ? "0 24px 80px rgba(0,0,0,0.3)"
                    : `0 24px 80px ${emerald}14`,
                }}
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontSize: { xs: 20, md: 24 },
                    fontWeight: 300,
                    mb: 3,
                    lineHeight: 1.4,
                  }}
                >
                  &quot;I thought listing on a big platform would solve
                  everything. It didn&apos;t.&quot;
                </Typography>
                <Box>
                  {problemItems.map((item, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        py: 1.75,
                        borderBottom:
                          i < problemItems.length - 1 ? "1px solid" : "none",
                        borderColor: "divider",
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: bronze,
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography color="text.secondary">{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </FadeInSection>
        </div>
      </div>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <div className="my-14" id="how">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 4, md: 10 },
                alignItems: "end",
                mb: 6,
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: bronze,
                    letterSpacing: "0.18em",
                    display: "block",
                    mb: 1.5,
                  }}
                >
                  The Process
                </Typography>
                <Typography variant="h4">
                  Five steps. <br /> Then{" "}
                  <em style={{ fontStyle: "italic", color: stone }}>
                    hands off.
                  </em>
                </Typography>
              </Box>
              <Typography color="text.secondary">
                From the day you reach out to the first booking, here&apos;s
                exactly what happens. No surprises, no hidden steps.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(5, 1fr)" },
                gap: "2px",
              }}
            >
              {howSteps.map((step, idx) => {
                const active = activeStep === idx;
                return (
                  <Box
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    sx={{
                      bgcolor: active ? emerald : "action.hover",
                      p: { xs: 2.5, md: 3.5 },
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      borderTop: active
                        ? `3px solid ${gold}`
                        : "3px solid transparent",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 28, sm: 40 },
                        fontWeight: 300,
                        lineHeight: 1,
                        mb: 2,
                        color: active ? gold : "text.disabled",
                        transition: "color 0.3s",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{ mb: 1, color: active ? marble : "text.primary" }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: active
                          ? "rgba(238,234,232,0.75)"
                          : "text.secondary",
                        lineHeight: 1.6,
                        display: "block",
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </FadeInSection>
        </div>
      </div>

      {/* ════════════════ WHAT WE OFFER ════════════════ */}
      <div className="my-14" id="offer">
        <Box sx={{ bgcolor: emerald, py: { xs: 7, md: 10 } }}>
          <div className="container mx-auto px-4">
            <FadeInSection>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: { xs: 4, md: 10 },
                  alignItems: "end",
                  mb: 6,
                }}
              >
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: gold,
                      opacity: 0.7,
                      letterSpacing: "0.18em",
                      display: "block",
                      mb: 1.5,
                    }}
                  >
                    Our Services
                  </Typography>
                  <Typography variant="h4" sx={{ color: marble }}>
                    Everything. <br />{" "}
                    <em style={{ fontStyle: "italic", color: gold }}>
                      Handled.
                    </em>
                  </Typography>
                </Box>
                <Typography sx={{ color: "rgba(238,234,232,0.6)" }}>
                  You stay completely hands-off. We manage every part of your
                  property&apos;s rental operation. From the first Instagram
                  impression to the final payout.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                  gap: "2px",
                }}
              >
                {services.map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <Box
                      key={i}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(254,204,137,0.08)",
                        p: { xs: 2.5, md: 3.5 },
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "rgba(254,204,137,0.06)",
                          borderColor: "rgba(254,204,137,0.2)",
                        },
                      }}
                    >
                      <Icon
                        size={26}
                        color={gold}
                        style={{ marginBottom: 16 }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{ color: gold, mb: 1 }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(238,234,232,0.5)",
                          lineHeight: 1.6,
                          display: "block",
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </FadeInSection>
          </div>
        </Box>
      </div>

      {/* ════════════════ EARNINGS ════════════════ */}
      <div className="my-14" id="earnings">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <Typography
              variant="overline"
              sx={{
                color: bronze,
                letterSpacing: "0.18em",
                display: "block",
                mb: 1.5,
              }}
            >
              Potential Earnings
            </Typography>
            <Typography variant="h4" sx={{ mb: 5 }}>
              What could your <br />{" "}
              <em style={{ fontStyle: "italic", color: stone }}>villa earn?</em>
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr" },
                gap: { xs: 4, md: 8 },
                alignItems: "start",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {(Object.keys(earningData) as EarningKey[]).map((key) => {
                  const d = earningData[key];
                  const active = activeEarning === key;
                  return (
                    <Paper
                      key={key}
                      elevation={0}
                      onClick={() => setActiveEarning(key)}
                      sx={{
                        p: { xs: 2.5, md: 3.5 },
                        borderRadius: 0.5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        border: "2px solid",
                        borderColor: active ? emerald : "transparent",
                        bgcolor: active ? emerald : "background.paper",
                        transform: active ? "translateX(8px)" : "none",
                        transition: "all 0.25s ease",
                        boxShadow: isDark ? "none" : `0 4px 24px ${emerald}0d`,
                        "&:hover": { borderColor: emerald },
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: active
                              ? "rgba(238,234,232,0.8)"
                              : "text.primary",
                            mb: 0.5,
                          }}
                        >
                          {d.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: active
                              ? "rgba(238,234,232,0.6)"
                              : "text.secondary",
                          }}
                        >
                          {d.sub}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h4"
                        className="text-2xl"
                        sx={{
                          fontSize: 26,
                          fontWeight: 400,
                          color: active ? gold : emerald,
                        }}
                      >
                        {d.amount}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 6 },
                  borderRadius: 0.5,
                  minHeight: 360,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isDark ? "none" : `0 24px 80px ${emerald}14`,
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      // fontFamily: "Cormorant Garamond, serif",
                      // fontSize: 32,
                      // fontWeight: 400,
                      color: emerald,
                      mb: 0.5,
                    }}
                  >
                    {earning.property}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      display: "block",
                      mb: 4.5,
                    }}
                  >
                    {earning.location}
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 300,
                      color: emerald,
                      lineHeight: 1,
                      mb: 1,
                      fontSize: { xs: 34, sm: 44, md: 52 },
                    }}
                  >
                    {earning.range}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 4.5 }}
                  >
                    estimated monthly earnings
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  {[
                    ["Avg. Nightly Rate", earning.ef1],
                    ["Weekend Bookings/Month", earning.ef2],
                    ["Peak Season Premium", earning.ef3],
                    ["Key Driver", earning.ef4],
                  ].map(([label, value]) => (
                    <Box
                      key={label}
                      sx={{ p: 2, bgcolor: "action.hover", borderRadius: 0.3 }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "text.secondary",
                          display: "block",
                          mb: 0.5,
                        }}
                      >
                        {label}
                      </Typography>
                      <Typography variant="body2" fontWeight={700}>
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Box>
          </FadeInSection>
        </div>
      </div>

      {/* ════════════════ REVENUE MODEL ════════════════ */}
      <Box
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#2a2a28",
          py: { xs: 7, md: 10 },
        }}
        id="revenue"
      >
        <div className="container mx-auto px-4">
          <FadeInSection>
            <Box sx={{ maxWidth: 640, mb: 6 }}>
              <Typography
                variant="overline"
                sx={{
                  color: bronze,
                  letterSpacing: "0.18em",
                  display: "block",
                  mb: 1.5,
                }}
              >
                The Numbers
              </Typography>
              <Typography variant="h4" sx={{ color: marble, mb: 2 }}>
                What lands in <br /> your account.{" "}
                <em style={{ fontStyle: "italic", color: gold }}>
                  Every month.
                </em>
              </Typography>
              <Typography sx={{ color: "rgba(238,234,232,0.55)" }}>
                Based on actual averages across our properties. No fixed rent
                paid to us. No upfront cost. Just your villa earning.
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                bgcolor: emerald,
                borderRadius: 0.5,
                borderTop: `3px solid ${gold}`,
                p: { xs: 3.5, md: 6.5 },
                mb: 5,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(254,204,137,0.6)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  display: "block",
                  mb: 2,
                }}
              >
                Owner net take-home / month
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 300,
                  color: gold,
                  lineHeight: 1,
                  mb: 2,
                  fontSize: { xs: 26, sm: 36, md: "auto" },
                }}
              >
                {revenue.net}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(238,234,232,0.45)",
                  maxWidth: 520,
                  fontSize: 13,
                  lineHeight: 1.7,
                  mb: 3.5,
                }}
              >
                After all property overheads. Based on 6–8 booked nights/month
                at ₹18K–₹22K/night with 12 guests.
              </Typography>
              <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}>
                {(Object.keys(revenueScenarios) as RevenueKey[]).map((key) => {
                  const active = revScenario === key;
                  return (
                    <Box
                      key={key}
                      component="button"
                      onClick={() => setRevScenario(key)}
                      sx={{
                        bgcolor: active ? gold : "rgba(255,255,255,0.06)",
                        border: "1px solid",
                        borderColor: active ? gold : "rgba(238,234,232,0.15)",
                        color: active ? emerald : "rgba(238,234,232,0.55)",
                        px: 2.75,
                        py: 1.25,
                        fontSize: 12,
                        fontWeight: active ? 700 : 400,
                        letterSpacing: "0.06em",
                        borderRadius: 0.3,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                    >
                      {revenueScenarios[key].label}
                    </Box>
                  );
                })}
              </Box>
            </Paper>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr 1.4fr" },
                gap: 2,
                mb: 5,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(238,234,232,0.08)",
                  borderRadius: 0.5,
                  p: { xs: 3, md: 4 },
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: marble, mb: 0.5 }}
                >
                  Revenue Split
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(238,234,232,0.35)",
                    display: "block",
                    mb: 3,
                  }}
                >
                  Every booking. Gross revenue shared.
                </Typography>
                <RevenueDonut
                  ownerColor={emerald}
                  vbsColor={gold}
                  trackColor="rgba(238,234,232,0.12)"
                />
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(238,234,232,0.08)",
                  borderRadius: 0.5,
                  p: { xs: 3, md: 4 },
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: marble, mb: 0.5 }}
                >
                  Monthly Revenue Breakdown
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(238,234,232,0.35)",
                    display: "block",
                    mb: 3,
                  }}
                >
                  Accommodation + food. Conservative vs strong month.
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  {[
                    {
                      label: "Conservative",
                      accom: 52.6,
                      food: 47.4,
                      total: "₹2,05,200",
                    },
                    {
                      label: "Strong",
                      accom: 57.6,
                      food: 42.4,
                      total: "₹3,05,600",
                    },
                  ].map((row) => (
                    <Box
                      key={row.label}
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(238,234,232,0.45)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {row.label}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          height: 32,
                          borderRadius: 0.3,
                          overflow: "hidden",
                          bgcolor: "rgba(255,255,255,0.04)",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${row.accom}%`,
                            bgcolor: emerald,
                            transition: "width 1s",
                          }}
                        />
                        <Box
                          sx={{
                            width: `${row.food}%`,
                            bgcolor: bronze,
                            transition: "width 1s",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{ color: marble }}
                      >
                        {row.total}
                      </Typography>
                    </Box>
                  ))}
                  <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: emerald,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(238,234,232,0.5)" }}
                      >
                        Accommodation
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: bronze,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(238,234,232,0.5)" }}
                      >
                        Food
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(238,234,232,0.08)",
                  borderRadius: 0.5,
                  p: { xs: 3, md: 4 },
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: marble, mb: 0.5 }}
                >
                  Food Margin / Person
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(238,234,232,0.35)",
                    display: "block",
                    mb: 3,
                  }}
                >
                  What the owner keeps after food cost.
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  {[
                    {
                      label: "External Supplier",
                      costW: 59,
                      costLabel: "Cost ₹625",
                      marginW: 38,
                      marginLabel: "Keep ₹387",
                      highlight: false,
                    },
                    {
                      label: "Inhouse Kitchen ✦",
                      costW: 38,
                      costLabel: "Cost ₹388",
                      marginW: 61,
                      marginLabel: "Keep ₹624",
                      highlight: true,
                    },
                  ].map((row) => (
                    <Box
                      key={row.label}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        opacity:
                          revScenario === "inhouse"
                            ? row.highlight
                              ? 1
                              : 0.55
                            : row.highlight
                              ? 0.55
                              : 1,
                        transition: "opacity 0.3s",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(238,234,232,0.45)",
                          width: { xs: 48, sm: 64 },
                          flexShrink: 0,
                          lineHeight: 1.4,
                          textAlign: "right",
                          fontSize: { xs: 10, sm: 12 },
                        }}
                      >
                        {row.label}
                      </Typography>
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          height: 36,
                          borderRadius: 0.3,
                          overflow: "hidden",
                          gap: "2px",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${row.costW}%`,
                            bgcolor: row.highlight
                              ? "rgba(238,234,232,0.07)"
                              : "rgba(238,234,232,0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: "rgba(255,255,255,0.7)",
                              fontSize: 10,
                              px: 1,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {row.costLabel}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: `${row.marginW}%`,
                            bgcolor: row.highlight ? gold : emerald,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: row.highlight
                                ? emerald
                                : "rgba(255,255,255,0.85)",
                              fontSize: 10,
                              px: 1,
                              whiteSpace: "nowrap",
                              fontWeight: row.highlight ? 700 : 400,
                            }}
                          >
                            {row.marginLabel}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: row.highlight ? gold : "rgba(238,234,232,0.3)",
                          width: 40,
                          flexShrink: 0,
                        }}
                      >
                        ₹1,012
                      </Typography>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      flexWrap: "wrap",
                      mt: 0.5,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "rgba(238,234,232,0.2)",
                          border: "1px solid rgba(238,234,232,0.4)",
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(238,234,232,0.5)" }}
                      >
                        Food cost
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: emerald,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(238,234,232,0.5)" }}
                      >
                        Owner margin
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: gold,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(238,234,232,0.5)" }}
                      >
                        Inhouse margin
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>

            <Paper
              elevation={0}
              sx={{
                border: "1px solid rgba(238,234,232,0.1)",
                borderRadius: 0.5,
                overflow: "hidden",
                background: "transparent",
              }}
            >
              <Box
                component="button"
                onClick={() => setAccordionOpen((v) => !v)}
                sx={{
                  width: "100%",
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "none",
                  p: { xs: 2.25, md: 2.75 },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  color: "rgba(238,234,232,0.6)",
                  letterSpacing: "0.04em",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.07)",
                    color: marble,
                  },
                }}
              >
                <span>View full monthly breakdown</span>
                <PlusIcon
                  size={20}
                  color={bronze}
                  style={{
                    transform: accordionOpen ? "rotate(45deg)" : "none",
                    transition: "transform 0.3s",
                  }}
                />
              </Box>

              <Box
                sx={{
                  maxHeight: accordionOpen ? 1000 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.5s ease",
                }}
              >
                <Box sx={{ p: { xs: 2, md: 3.5 } }}>
                  <Box
                    sx={{
                      fontSize: 12,
                      color: "rgba(238,234,232,0.35)",
                      lineHeight: 1.6,
                      mb: 2.5,
                      p: 1.75,
                      borderLeft: `2px solid ${bronze}`,
                      bgcolor: "rgba(203,173,138,0.06)",
                    }}
                  >
                    These figures are illustrative estimates based on actual
                    averages - not guarantees. Your property&apos;s earnings
                    depend on location, size, amenities, and season.
                  </Box>

                  <Box sx={{ overflowX: "auto" }}>
                    <Box
                      component="table"
                      sx={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: 13,
                        minWidth: 420,
                      }}
                    >
                      <Box component="thead">
                        <Box component="tr">
                          {["Line Item", "Min", "Max"].map((h, i) => (
                            <Box
                              key={h}
                              component="th"
                              sx={{
                                textAlign: i === 0 ? "left" : "right",
                                p: "10px 12px",
                                bgcolor: emerald,
                                color: marble,
                                fontSize: 11,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                fontWeight: 500,
                              }}
                            >
                              {h}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                      <Box component="tbody">
                        {tableRows.map((row, i) => {
                          if (row.type === "section") {
                            return (
                              <Box component="tr" key={i}>
                                <Box
                                  component="td"
                                  colSpan={3}
                                  sx={{
                                    bgcolor: "rgba(255,255,255,0.03)",
                                    color: bronze,
                                    fontSize: 10,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    p: "8px 12px",
                                  }}
                                >
                                  {row.label}
                                </Box>
                              </Box>
                            );
                          }
                          const textColor =
                            row.type === "net"
                              ? gold
                              : row.type === "highlight"
                                ? gold
                                : row.type === "total"
                                  ? marble
                                  : "rgba(238,234,232,0.6)";
                          return (
                            <Box
                              component="tr"
                              key={i}
                              sx={{
                                borderTop:
                                  row.type === "total"
                                    ? "1px solid rgba(238,234,232,0.1)"
                                    : row.type === "net"
                                      ? `2px solid ${gold}`
                                      : "none",
                              }}
                            >
                              <Box
                                component="td"
                                sx={{
                                  p: "10px 12px",
                                  color: textColor,
                                  fontWeight:
                                    row.type === "net"
                                      ? 600
                                      : row.type === "total" ||
                                          row.type === "highlight"
                                        ? 500
                                        : 400,
                                  fontSize: row.type === "net" ? 14 : 13,
                                  borderBottom:
                                    row.type === "row"
                                      ? "1px solid rgba(238,234,232,0.05)"
                                      : "none",
                                }}
                              >
                                {row.label}
                              </Box>
                              <Box
                                component="td"
                                sx={{
                                  p: "10px 12px",
                                  textAlign: "right",
                                  color: textColor,
                                  fontWeight:
                                    row.type === "net"
                                      ? 600
                                      : row.type === "total" ||
                                          row.type === "highlight"
                                        ? 500
                                        : 400,
                                  fontSize: row.type === "net" ? 14 : 13,
                                  borderBottom:
                                    row.type === "row"
                                      ? "1px solid rgba(238,234,232,0.05)"
                                      : "none",
                                }}
                              >
                                {resolveCell(row.min)}
                              </Box>
                              <Box
                                component="td"
                                sx={{
                                  p: "10px 12px",
                                  textAlign: "right",
                                  color: textColor,
                                  fontWeight:
                                    row.type === "net"
                                      ? 600
                                      : row.type === "total" ||
                                          row.type === "highlight"
                                        ? 500
                                        : 400,
                                  fontSize: row.type === "net" ? 14 : 13,
                                  borderBottom:
                                    row.type === "row"
                                      ? "1px solid rgba(238,234,232,0.05)"
                                      : "none",
                                }}
                              >
                                {resolveCell(row.max)}
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>

                  {revenue.showNote && (
                    <Box
                      sx={{
                        mt: 2,
                        fontSize: 12,
                        color: gold,
                        opacity: 0.8,
                        p: "10px 14px",
                        bgcolor: "rgba(254,204,137,0.06)",
                        borderRadius: 0.3,
                      }}
                    >
                      ✦ Inhouse kitchen figures shown. Food cost reduced to
                      ₹376–400/person, increasing monthly food margin by approx.
                      ₹29,000–₹30,000.
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>
          </FadeInSection>
        </div>
      </Box>

      {/* ════════════════ BUSINESS MODEL ════════════════ */}
      <div className="my-14" id="model">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: bronze,
                  letterSpacing: "0.18em",
                  display: "block",
                  mb: 1.5,
                }}
              >
                Our Model
              </Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Simple. Fair.{" "}
                <em style={{ fontStyle: "italic", color: stone }}>Aligned.</em>
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ maxWidth: 560, mx: "auto" }}
              >
                We only make money when you make money. That&apos;s not a
                tagline - it&apos;s how the model is built.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: { xs: 6, md: 10 },
                alignItems: "center",
                mt: 4,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    width: { xs: 280, md: 380 },
                    height: { xs: 280, md: 380 },
                    borderRadius: "50%",
                    border: `1px solid ${emerald}1a`,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 20,
                      borderRadius: "50%",
                      border: `1px dashed ${emerald}14`,
                    }}
                  />
                  {orbitLabels.map((label, i) => {
                    const positions = [
                      { top: "12%", left: "50%" },
                      { top: "50%", left: "88%" },
                      { top: "88%", left: "65%" },
                      { top: "88%", left: "35%" },
                      { top: "50%", left: "12%" },
                    ];
                    return (
                      <Box
                        key={label}
                        sx={{
                          position: "absolute",
                          top: positions[i].top,
                          left: positions[i].left,
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: gold,
                            mx: "auto",
                            mb: 1,
                          }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: 9, sm: 12 },
                          }}
                        >
                          {label}
                        </Typography>
                      </Box>
                    );
                  })}
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: { xs: 30, sm: 44, md: 60 },
                        fontWeight: 300,
                        color: emerald,
                        lineHeight: 1,
                      }}
                    >
                      Revenue
                      <br />
                      Share
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "text.secondary",
                        display: "block",
                        mt: 1,
                      }}
                    >
                      Per Booking
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                {modelPoints.map((point, i) => {
                  const Icon = point.icon;
                  return (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        gap: 2.5,
                        py: 3,
                        borderBottom:
                          i < modelPoints.length - 1 ? "1px solid" : "none",
                        borderColor: "divider",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          bgcolor: "action.hover",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} color={emerald} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight={700}
                          sx={{ mb: 0.5 }}
                        >
                          {point.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {point.description}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </FadeInSection>
        </div>
      </div>

      {/* ════════════════ FAQ ════════════════ */}
      <Box sx={{ bgcolor: "action.hover", py: { xs: 7, md: 10 } }} id="faq">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <Typography
              variant="overline"
              sx={{
                color: bronze,
                letterSpacing: "0.18em",
                display: "block",
                mb: 1.5,
              }}
            >
              Common Questions
            </Typography>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Things owners <br />{" "}
              <em style={{ fontStyle: "italic", color: stone }}>
                always ask us.
              </em>
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1.6fr" },
                gap: { xs: 5, md: 8 },
              }}
            >
              <Box>
                {faqs.map((faq, i) => {
                  const open = openFaq === i;
                  return (
                    <Box
                      key={i}
                      sx={{
                        borderBottom: "1px solid",
                        borderColor: emerald + "1a",
                      }}
                    >
                      <Box
                        component="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        sx={{
                          width: "100%",
                          bgcolor: "transparent",
                          border: "none",
                          textAlign: "left",
                          py: 2.75,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                          gap: { xs: 1.5, sm: 3 },
                          fontFamily: "inherit",
                          fontSize: { xs: 13.5, sm: 15 },
                          color: "text.primary",
                          "&:hover": { color: emerald },
                        }}
                      >
                        <span style={{ minWidth: 0 }}>{faq.q}</span>
                        <PlusIcon
                          size={18}
                          color={bronze}
                          style={{
                            transform: open ? "rotate(45deg)" : "none",
                            transition: "transform 0.3s",
                            flexShrink: 0,
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          maxHeight: open ? 300 : 0,
                          overflow: "hidden",
                          transition: "max-height 0.4s ease",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ pb: 3, lineHeight: 1.8 }}
                        >
                          {faq.a}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Paper
                elevation={0}
                sx={{
                  bgcolor: emerald,
                  borderRadius: 0.5,
                  p: { xs: 3.5, md: 6 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 380,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 24, sm: 30, md: 36 },
                      fontWeight: 300,
                      color: marble,
                      lineHeight: 1.2,
                      mb: 2,
                    }}
                  >
                    Still have <br /> questions?{" "}
                    <em style={{ fontStyle: "italic", color: gold }}>Good.</em>
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(238,234,232,0.6)",
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    The best conversations we have are with owners who&apos;ve
                    done their thinking. Reach out directly - no sales pitch, no
                    pressure. Just an honest conversation about your property.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    mt: 4,
                  }}
                >
                  <a
                    href="https://wa.me/919594377736"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        bgcolor: "#25D366",
                        color: "#fff",
                        px: 3,
                        py: 2,
                        borderRadius: 0.3,
                        fontSize: 14,
                        fontWeight: 600,
                        transition: "all 0.2s",
                        "&:hover": { bgcolor: "#1ebe5d" },
                      }}
                    >
                      <IoLogoWhatsapp size={18} /> WhatsApp Us: 9594377736
                    </Box>
                  </a>
                  <a
                    href="https://villasbyserene.com"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        bgcolor: "rgba(255,255,255,0.08)",
                        color: "rgba(238,234,232,0.7)",
                        px: 3,
                        py: 2,
                        borderRadius: 0.3,
                        fontSize: 14,
                        border: "1px solid rgba(238,234,232,0.12)",
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.12)",
                          color: marble,
                        },
                      }}
                    >
                      <GlobeIcon size={18} /> Visit villasbyserene.com
                    </Box>
                  </a>
                </Box>
              </Paper>
            </Box>
          </FadeInSection>
        </div>
      </Box>
    </section>
  );
};

export default ListYourProperty;
