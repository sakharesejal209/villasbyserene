// src/app/home/components/CtaSection.tsx
"use client";

import { Box, Button, Typography } from "@mui/material";
import { WhatsApp, ArrowForwardOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { FadeInSection } from "../home";

interface Props {
  onWhatsApp: () => void;
}

export const CtaSection = ({ onWhatsApp }: Props) => {
  const router = useRouter();

  return (
    <section style={{ padding: 0 }}>
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: 2,
          background: "linear-gradient(135deg, #044231 0%, #066048 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative rings — pure CSS, no heavy animation */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.07)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />

        <FadeInSection>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "rgba(254,204,137,0.9)",
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                mb: 1.5,
                fontSize: 12,
              }}
            >
              Limited villas available
            </Typography>
            <Typography
              variant="h3"
              sx={{ color: "#fff", mb: 1.5, fontWeight: 700 }}
            >
              Ready to Book Your
              <br />
              Dream Vacation?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.72)",
                mb: 4,
                maxWidth: 440,
                mx: "auto",
              }}
            >
              Get instant confirmation and personalized assistance. Our team is
              available 24/7 to make your stay perfect.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<ArrowForwardOutlined />}
                onClick={() => router.push("/stays/all")}
                sx={{
                  bgcolor: "#fff",
                  color: "#044231",
                  fontWeight: 700,
                  px: 4,
                  "&:hover": { bgcolor: "#f0f0f0" },
                }}
              >
                Browse All Villas
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<WhatsApp />}
                onClick={onWhatsApp}
                sx={{
                  borderColor: "rgba(255,255,255,0.45)",
                  color: "#fff",
                  fontWeight: 600,
                  px: 4,
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Chat on WhatsApp
              </Button>
            </Box>
          </motion.div>
        </FadeInSection>
      </Box>
    </section>
  );
};
