"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FavoriteBorderOutlined as Heart,
  HomeOutlined as Home,
  PublicOutlined as Globe,
  GroupOutlined as Users,
  LocationOnOutlined as MapPin,
} from "@mui/icons-material";
import Image from "next/image";
import { Box, Button, Card, Paper, Typography, useTheme } from "@mui/material";
import { animate, useMotionValue, useTransform, motion } from "motion/react";
import { FadeInSection } from "./home";

function Counter({
  target,
  suffix = "",
}: Readonly<{ target: number; suffix?: string }>) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    target % 1 === 0 ? Math.round(latest) : latest.toFixed(1)
  );

  useEffect(() => {
    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, target]);

  return (
    <span>
      <motion.span>{rounded as unknown as number}</motion.span>
      {suffix}
    </span>
  );
}

export const AboutPage = () => {
  const router = useRouter();
  const theme = useTheme();

  const values = [
    {
      icon: Heart,
      title: "Personal Touch",
      description:
        "Every stay is crafted with love and attention to detail, ensuring you feel truly welcomed.",
    },
    {
      icon: Home,
      title: "Home Away from Home",
      description:
        "We create spaces that feel familiar, warm, and genuinely your own during your stay.",
    },
    {
      icon: Globe,
      title: "Hidden Gems",
      description:
        "We carefully curate unique properties in serene locations, often unexplored by mainstream tourism.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building connections and creating memories that last a lifetime, wherever you are.",
    },
  ];

  const stats = [
    { number: "10+", label: "Curated Properties" },
    { number: "100+", label: "Happy Guests" },
    { number: "4.5", label: "Average Rating" },
  ];

  return (
    <div className="mt-[40px] md:mt-[70px]">
      {/* Hero Section */}
      <section>
        <div className="container">
          <FadeInSection>
            <div className="grid lg:grid-cols-2 gap-2 md:gap-10 items-center">
              <div className="md:pl-10 md:py-10">
                <Typography variant="h3">
                  Welcome to
                  <Typography
                    variant="h3"
                    color={
                      theme.palette.mode == "light" ? "primary" : "secondary"
                    }
                    className="!inline-block !ml-2"
                  >
                    Villas by Serene
                  </Typography>
                </Typography>
                <Typography className="!text-xl !my-4">
                  Where every stay feels like home, and every moment is crafted
                  with care.
                </Typography>
                <div className="flex items-center my-4">
                  <MapPin
                    color={
                      theme.palette.mode == "light" ? "primary" : "secondary"
                    }
                    className="w-5 h-5"
                  />
                  <Typography
                    color={
                      theme.palette.mode == "light" ? "primary" : "secondary"
                    }
                  >
                    Curating serene escapes worldwide
                  </Typography>
                </div>
              </div>

              <div className="relative h-[200px] md:h-[350px]">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/deena-villa%2Fdeena-swimmingpool1.webp?alt=media&token=6b522cd1-cb79-4a5d-825b-a8d67e76a0ac"
                  alt="Villa with pool"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                  sizes="100vw"
                  priority={true}
                />
                <div className="absolute inset-0" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="md:!py-4 !py-0">
        <Paper
          className={`py-10 ${
            theme.palette.mode == "light"
              ? "!bg-[#F2F1ED]"
              : theme.palette.primary.light
          }  !rounded-none !shadow-none`}
        >
          <div className="container">
            <FadeInSection>
              <div className="md:p-10 p-0 grid grid-cols-3 lg:grid-cols-3 md:gap-8 gap-2 text-center">
                {stats.map((stat, index) => {
                  const match = stat.number.match(/^([\d.]+)(\D*)$/);
                  const value = match ? parseFloat(match[1]) : 0;
                  const suffix = match ? match[2] : "";
                  return (
                    <div key={index}>
                      <Typography
                        color="primary"
                        variant="h3"
                        className="!mb-2"
                      >
                        <Counter target={value} suffix={suffix} />
                      </Typography>
                      <Typography variant="h6">{stat.label}</Typography>
                    </div>
                  );
                })}
              </div>
            </FadeInSection>
          </div>
        </Paper>
      </section>

      {/* Our Story Section */}
      <section>
        <div className="container">
          <FadeInSection>
            <div className="mb-0 md:mb-6">
              <Typography variant="h4" className="!mb-3 text-center">
                Our Story
              </Typography>
              <div className="w-20 h-1 bg-[#044231] mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-6 gap-4 md:gap-12 items-center mb-4 md:mb-10">
              <div className="col-span-6 md:col-span-4">
                <Typography className="!block !my-4 !text-lg">
                  At Villas by Serene, our purpose is simple, to serve people
                  and offer them unforgettable stays in serene, unexplored
                  villas that are often hidden from the mainstream. We believe
                  that a stay should feel like home, not a commercial
                  transaction.
                </Typography>
                <Typography className="!block !my-4 !text-lg">
                  Our journey began from a very personal space. I have always
                  loved traveling, but one thing was always missing. A place
                  that felt personal, warm, and truly my own, a place I could
                  call home away from home!
                </Typography>
                <Typography className="!block !my-4 !text-lg">
                  That&apos;s when the thought struck: why not build something
                  where our guests could feel the same? With the right people,
                  the right mindset, and some truly{" "}
                  <span className="italic">khubsurat</span> properties, Villas
                  by Serene was born.
                </Typography>
                <Typography className="!block !my-4 !text-lg">
                  We carefully curate boutique and homely properties, each
                  thoughtfully designed to offer a hint of luxury while
                  remaining approachable and affordable. Every property comes
                  equipped with a private pool, ensuring that relaxation and
                  privacy are always within reach.
                </Typography>
              </div>
              <div className="relative col-span-6 md:col-span-2 aspect-square">
                <div className="absolute bottom-0 w-full z-50 bg-black/40 backdrop-blur-xs">
                  <Typography className="text-center text-white" variant="h6">
                    Abhijeet Mhatre
                  </Typography>
                  <Typography className="text-center text-white">
                    Founder
                  </Typography>
                </div>
                <div className="flex justify-end w-full">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/our-story%2FWhatsAppimage.webp?alt=media&token=a38e5fd2-2973-4854-bb5b-cdd9317537a4"
                    alt="Owner Abhijeet Mhatre Image"
                    fill
                  />
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <div className="container">
          <FadeInSection>
            <Typography variant="h4" className="!mb-3 text-center">
              What Drives Us
            </Typography>
            <Typography className="text-xl w-full text-center">
              Our values guide every decision we make and every experience we
              create
            </Typography>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {values.map((value, index) => (
                <div key={index}>
                  <Card className="h-full">
                    <div className="p-6 flex justify-center items-center flex-col">
                      <Box
                        sx={{
                          background: theme.palette.primary.light,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "100%",
                          width: "60px",
                          height: "60px",
                        }}
                      >
                        <value.icon color="secondary" fontSize="large" />
                      </Box>
                      <Typography variant="h6" className="!my-3">
                        {value.title}
                      </Typography>
                      <Typography className="text-center">
                        {value.description}
                      </Typography>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Vision Section */}
      <section>
        <div className="container">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center">
              <Typography variant="h4">Our Vision</Typography>
              <Typography className="!text-xl !mt-4">
                Our vision is to take this experience global, to connect people
                with hidden gems, bring a sense of belonging, and make luxurious
                escapes accessible to everyone. At Villas by Serene, we invite
                you to create memories, relax in comfort, and enjoy a stay that
                feels just like home, wherever you are.
              </Typography>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`text-white p-6
        bg-[#3b3a3b]
        `}
      >
        <div className="container">
          <Typography variant="h5" className="text-center !mb-1">
            Ready to Experience Serenity?
          </Typography>
          <Typography className="!text-xl !mb-8 opacity-90 text-center">
            Discover our carefully curated collection of villas and find your
            perfect home away from home.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="large"
              variant="contained"
              onClick={() => router.push("/stays/all?guests=1")}
            >
              Explore Our Villas
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => router.push("/contact")}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
