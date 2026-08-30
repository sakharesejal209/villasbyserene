"use client";

import { useRef } from "react";
import { alpha, Box, Paper, Typography, useTheme } from "@mui/material";

import {
  IoStarOutline as Star,
  IoShieldCheckmarkOutline as Shield,
  IoFlashOutline as Flash,
} from "react-icons/io5";
import { AiOutlineClockCircle as Clock } from "react-icons/ai";

import { motion, useInView } from "motion/react";
import { FadeInSection } from "../home";

const cards = [
  {
    icon: Star,
    title: "Premium Properties",
    description:
      "Hand-selected vacation rentals that meet our high standards for comfort and luxury",
  },
  {
    icon: Shield,
    title: "Trusted & Secure",
    description:
      "All our properties are verified and we provide secure booking with full support",
  },
  {
    icon: Flash,
    title: "Instant Confirmation",
    description:
      "Book online and get instant confirmation — no waiting, no back and forth",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Our dedicated team is always available to ensure your vacation is perfect",
  },
];

const TrustCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          height: "100%",
          transition: "box-shadow 0.25s, transform 0.25s",
          "&:hover": {
            boxShadow: isDark
              ? "0 8px 32px rgba(0,0,0,0.4)"
              : "0 8px 32px rgba(4,66,49,0.08)",
            transform: "translateY(-4px)",
          },
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
            fontSize: 24,
            bgcolor: isDark
              ? alpha(theme.palette.secondary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.09),
          }}
        >
          <Icon />
        </Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          {description}
        </Typography>
      </Box>
    </div>
  );
};

export const TrustSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <section style={{ paddingBottom: 0 }}>
      <Paper
        elevation={0}
        sx={{
          py: { xs: 6, md: 9 },
          borderRadius: 0,
          bgcolor: isDark ? "background.paper" : "#F5F3EF",
        }}
      >
        <div className="container">
          <FadeInSection>
            <div className="text-center mb-10 md:mb-12">
              <Typography variant="h4" sx={{ mb: 1 }}>
                Why Choose Villas By Serene?
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ maxWidth: 520, mx: "auto" }}
              >
                Exceptional vacation rentals with personalized service — because
                your holiday deserves more than just a stay
              </Typography>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {cards.map((card, idx) => (
                <TrustCard key={card.title} {...card} delay={idx * 0.08} />
              ))}
            </div>
          </FadeInSection>
        </div>
      </Paper>
    </section>
  );
};
