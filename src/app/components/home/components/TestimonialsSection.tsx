// src/app/home/components/TestimonialsSection.tsx
// "use client";

import { Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { motion } from "motion/react";
import { Carousel } from "@/application/default";
import { FadeInSection } from "../home";
import testimonials from "../data/testimonials.json";

export const TestimonialsSection = () => (
  <section>
    <div className="container">
      <FadeInSection>
        <div className="text-center mb-8">
          <Typography variant="h4" sx={{ mb: 1 }}>
            What Our Guests Say
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
            Hospitality that goes beyond expectations - through the words of our
            delighted guests.
          </Typography>
        </div>
        <Carousel
          spaceBetween={12}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 8 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 12 },
          }}
          showDots={false}
          autoplay={{ delay: 3200, disableOnInteraction: true }}
          arrowVisibility="hidden"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-sm shadow-md">
                  {t.mediaType === "video" ? (
                    <video
                      src={t.src}
                      controls
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      poster={t.poster}
                    />
                  ) : (
                    <Image
                      src={t.src}
                      alt={t.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <Typography variant="caption" sx={{ mt: 1, opacity: 0.65 }}>
                  {t.name}
                </Typography>
                <Typography variant="h6" >
                  {t.property}
                </Typography>
              </motion.div>
            </SwiperSlide>
          ))}
        </Carousel>
      </FadeInSection>
    </div>
  </section>
);
