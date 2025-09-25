"use client";

import React, { useRef } from "react";

import {
  SettingsOutlined as Settings,
  CameraOutlined as Camera,
  CalendarMonthOutlined as Calendar,
  FavoriteBorderOutlined as Heart,
  TrendingUpOutlined as TrendingUp,
  HomeOutlined as Home,
  FlagCircleOutlined as Target,
  ArrowRightAltOutlined as ArrowRight,
  CheckCircleOutlineOutlined as CheckCircle,
  PeopleAltOutlined as Users,
  PhoneOutlined as Phone,
} from "@mui/icons-material";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

import { FadeInSection } from "../home/home";
import {
  Box,
  Button,
  Card,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";

const services = [
  {
    icon: Settings,
    title: "Property Management",
    description:
      "Regular inspections, upkeep, and ensuring your villa is always in pristine condition.",
  },
  {
    icon: Users,
    title: "Staff Hiring & Training",
    description:
      "From housekeeping to service staff—we hire, train, and supervise so your guests get a 5-star experience.",
  },
  {
    icon: Camera,
    title: "Marketing & Visibility",
    description:
      "Professional photos, compelling listings, social media promotions, and exposure on top booking platforms.",
  },
  {
    icon: Calendar,
    title: "Guest Bookings & Payments",
    description:
      "We handle inquiries, reservations, calendar blocking, and secure payments—no stress, no confusion.",
  },
  {
    icon: Heart,
    title: "Guest Experience",
    description:
      "Warm welcomes, toiletries, amenities, and thoughtful touches to keep guests coming back.",
  },
  {
    icon: TrendingUp,
    title: "Property Enhancements",
    description:
      "Expert advice on trendy upgrades and improvements to boost ratings and maximize revenue.",
  },
];

const steps = [
  {
    number: "01",
    title: "List Your Property",
    description:
      "Share your villa details with us and schedule a quick walkthrough.",
    icon: Home,
  },
  {
    number: "02",
    title: "We Set It Up",
    description:
      "Professional photoshoot, staff training, and listing creation—we prepare your villa for success.",
    icon: Settings,
  },
  {
    number: "03",
    title: "You Earn, We Manage",
    description:
      "Relax while we handle guests, operations, and everything in between.",
    icon: Target,
  },
];

const benefits = [
  "Transparent revenue-sharing model",
  "Proven expertise in hospitality & marketing",
  "Regular on-site visits & staff supervision",
  "Personalized service tailored to your property",
];

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

  const StyledKPI = styled("div")(({ theme }) => ({
    background: theme.palette.grey[100],
  }));

  const StyledKPICircle = styled("div")(({ theme }) => ({
    background: theme.palette.primary.main,
  }));

  return (
    <div>
      <section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2Fexterior1.webp?alt=media&token=64cf6a47-c420-491e-9178-e82ded54f785"
            alt="Luxury villa property"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-black/55"></div>
        </motion.div>

        <motion.div className="relative text-center px-4 text-white flex justify-center flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" className="!mb-2">
              List Your Home With Us
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography className="!text-lg">
              Turn Your Villa Into a Hassle-Free Income Source
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ width: "70%", textAlign: "center" }}
          >
            <Typography className="!text-lg">
              Owning a beautiful property shouldn&apos;t feel like a full-time
              job. We take care of the day-to-day operations, marketing, and
              guest management so you can enjoy steady returns without the
              stress.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 mt-4 p-4 inline-block">
              <Typography variant="subtitle1">You earn. We manage.</Typography>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button variant="contained" size="large">
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Partner Section */}
      <section>
        <div className="container mx-auto md:!px-16">
          <FadeInSection>
            <div className="flex flex-col items-center justify-center mb-6 text-center">
              <Typography variant="h4" className="!mb-2">
                Managing a villa can be overwhelming
              </Typography>
              <Typography className="w-full block md:w-[75%] !text-lg text-center">
                Staffing, guest communication, marketing, upkeep… the list never
                ends. That&apos;s where we step in.
              </Typography>
            </div>

            <div className="relative grid md:grid-cols-2 md:gap-12 items-center">
              {/* <FadeInSection> */}
              <div className="md:p-10 order-2 md:order-1 ">
                <Typography variant="h5">
                  We specialize in end-to-end property management for owners who
                  don&apos;t have the time to handle everything themselves.
                </Typography>
                <Typography className="!text-lg !mt-2">
                  With us, your property is always guest-ready and performing at
                  its best.
                </Typography>
                <StyledKPI className="flex items-center rounded-md gap-2 md:gap-4 p-2 md:p-6 mt-4">
                  <StyledKPICircle className="w-8 md:w-12 md:h-12 h-8 rounded-full flex items-center justify-center">
                    <CheckCircle className="md:w-6 w-3 md:h-6 h-3 !text-white" />
                  </StyledKPICircle>
                  <div>
                    <Typography className="!font-medium">
                      Property always guest-ready
                    </Typography>
                    <Typography variant="body2">
                      Maximum performance, minimum effort
                    </Typography>
                  </div>
                </StyledKPI>
              </div>
              {/* </FadeInSection> */}
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/skapa-alibaug%2Fskapa-alibaug-livingroom.webp?alt=media&token=82832501-11c9-44af-a9fd-1e0b5e518ea4"
                  alt="Professional property management"
                  style={{
                    height: "350px",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />
                {/* <Image
                src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/ocean-breeze%2F6.webp?alt=media&token=2daf15d8-9e5a-4970-81dc-5203b4646433"
                alt="Professional property management"
                // className="w-full"
                width={400}
                height={350}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
                sizes="100vw"
                priority={true}
              /> */}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-8">
              <Typography variant="h4" className="!mb-2">
                Complete Property Management
              </Typography>
              <Typography>
                From maintenance to marketing, we handle every aspect of your
                property&apos;s success
              </Typography>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <>
                    <Card className="h-full">
                      <div className="p-4 md:p-8">
                        <Box
                          sx={{
                            backgroundColor: theme.palette.grey[100],
                          }}
                          className={`w-14 h-14 rounded-md flex items-center justify-center mb-6`}
                        >
                          {/* {service.icon} */}
                          <IconComponent color="primary" />
                        </Box>
                        <Typography variant="h5" className="!mb-4">
                          {service.title}
                        </Typography>
                        <Typography>{service.description}</Typography>
                      </div>
                    </Card>
                  </>
                );
              })}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 3 steps */}
      <section>
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="text-center mb-10 md:mb-12">
              <Typography variant="h4" className="!mb-2">
                Simple 3-Step Process
              </Typography>
              <Typography className="!text-lg text-center block">
                Getting started is easy. We&apos;ll handle the complex stuff so
                you can focus on earning.
              </Typography>
            </div>

            <div>
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <>
                      <div className="text-center">
                        <div className="relative md:mb-8">
                          <Box
                            sx={{
                              background: theme.palette.grey[100],
                              //  backdropFilter: 'blur(8px)',
                            }}
                            className="w-20 h-20 flex items-center rounded-md justify-center mx-auto mb-4"
                          >
                            <IconComponent fontSize="large" />
                            {/* {step.icon} */}
                          </Box>
                          <Box
                            sx={{
                              border: `2px solid ${theme.palette.primary.main}`,
                              position: "absolute",
                              right: "-8px",
                              top: "-8px",
                              borderRadius: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            className={`w-6 md:w-8 h-6 md:h-8 shadow-lg`}
                          >
                            <Box
                              sx={{ color: theme.palette.primary.main }}
                              className="text-sm font-bold text-primary"
                            >
                              {step.number}
                            </Box>
                          </Box>
                        </div>
                        <Typography variant="h5" className="mb-4 ">
                          {step.title}
                        </Typography>
                        <Typography>{step.description}</Typography>
                      </div>

                      {index < steps.length - 1 && (
                        <Box className="hidden md:block absolute top-10 -right-6 w-12 h-0.5"></Box>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Success priority */}
      <section>
        <div className="container">
          <FadeInSection>
            <div className="grid md:grid-cols-2 lg:px-[150px]">
              <div className="flex justify-center items-left flex-col">
                <Typography variant="h4" className="md:!mb-6 text-center md:text-left">
                  Your Success Is Our Priority
                </Typography>
                <div className="">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center my-4 gap-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <CheckCircle color="primary" />
                      </div>
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/deena-villa%2Fdeena-sitout.webp?alt=media&token=37ef993a-5404-424d-8bcf-13eec9dbc38f"
                  alt="Premium hospitality service"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center center",
                    height: "300px",
                    width: "100%",
                  }}
                />
                {/* <Image
                  src="https://firebasestorage.googleapis.com/v0/b/villasbyserene-6a7c7.firebasestorage.app/o/sarthak-villa%2FIMG-20250816-WA0005.webp?alt=media&token=157fe785-388f-4ee9-b342-9cc992e956c2"
                  alt="Premium hospitality service"
                  className="w-full rounded-2xl shadow-2xl"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                  sizes="100vw"
                  priority={true}
                /> */}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`text-white p-6
        ${
          theme.palette.mode == "light"
            ? "bg-gradient-to-r from-[color:var(--cta-light)] to-[color:color-mix(in_oklab,var(--cta-light)_80%,transparent)]"
            : "bg-gradient-to-r from-[color:var(--cta-dark)] to-[color:color-mix(in_oklab,var(--cta-dark)_80%,transparent)]"
        }
        `}
      >
        <div className="container px-4 text-center">
          <FadeInSection>
            <div className="max-w-4xl mx-auto">
              <Typography variant="h5" className="!mb-">
                Ready to Unlock Your Villa&apos;s Potential?
              </Typography>
              <Typography className="!text-lg !mb-8 opacity-90">
                Let us handle the hard work while you enjoy the returns.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outlined"
                  className="text-xl px-10 py-4"
                  onClick={() => router.push("/contact")}
                >
                  <Home className="w-6 h-6 mr-3" />
                  List Your Property Today
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>

                <a href={`tel:${contactNumber}`}>
                  <Button
                    variant="outlined"
                    className="text-xl px-10 py-4 border-white text-white hover:bg-white hover:text-primary"
                  >
                    <Phone className="w-6 h-6 mr-3" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default ListYourProperty;
