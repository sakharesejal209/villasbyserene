"use client";

import { Box, Button, Typography, useTheme } from "@mui/material";

import { LuCircleCheckBig as CheckCircleIcon } from "react-icons/lu";
import {
  IoTrendingUpOutline as LineUpIcon,
  IoSettingsOutline as SettingsIcon,
  IoHomeOutline as HomeIcon,
} from "react-icons/io5";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FadeInSection } from "../home";

const FEATURES = [
  {
    icon: CheckCircleIcon,
    text: "Complete Management: From bookings, payments, and toiletries to property visits and staff management",
  },
  {
    icon: LineUpIcon,
    text: "Revenue Optimization: We suggest trendy upgrades and handle marketing to maximize your property's profitability",
  },
  {
    icon: SettingsIcon,
    text: "Always Guest-Ready: Your villa stays in perfect condition with our comprehensive maintenance and preparation services",
  },
];

export const ListPropertySection = () => {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <section className="overflow-x-hidden">
      <div className="container">
        <FadeInSection>
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Image — slides in from left */}
            <div className="relative aspect-video md:aspect-4/3 overflow-hidden rounded-sm">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/house-of-mars%2Fhouse-of-mars-swimming-pool5.webp?alt=media&token=1076deb0-cd52-4cb9-86be-324d7a43ff8d"
                alt="Villa management services"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
                loading="lazy"
              />
            </div>

            {/* Content — slides in from right */}
            <div>
              <Typography variant="h4" sx={{ mb: 1.5 }}>
                Unlock The True Potential of Your Property
              </Typography>
              <Typography color="text.secondary">
                We know managing a property is more than just opening doors —
                it&apos;s staff training, marketing, guest communication, and a
                hundred little details.
              </Typography>
              <Typography fontWeight={600} sx={{ my: 2 }}>
                That&apos;s where we come in!
              </Typography>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}
              >
                {FEATURES.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <Box
                      sx={{
                        color: isDark ? "secondary.main" : "primary.main",
                        mt: 0.25,
                        flexShrink: 0,
                        fontSize: 20,
                      }}
                    >
                      <item.icon />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.text}
                    </Typography>
                  </div>
                ))}
              </Box>

              <Typography variant="h6" sx={{ mb: 1.5 }}>
                You relax. We manage. You earn.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<HomeIcon />}
                onClick={() => router.push("/list")}
              >
                List Your Home Today
              </Button>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
