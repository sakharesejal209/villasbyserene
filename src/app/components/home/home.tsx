"use client";

import React from "react";
import { Button, Paper, Typography, useTheme } from "@mui/material";

import Navbar from "./navbar";
import SearchBox from "./searchBox";

const Home = () => {
  const theme = useTheme();

  return (
    <div>
      <Navbar />
      <section className="flex justify-center items-center w-[100vw] h-[100vh]">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.6)",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src="/assets/herovideo1.mp4" type="video/mp4" />
        </video>

        <div className="p-4 md:p-0">
          <div className="text-white">
            <Typography variant="h2">PLAN YOUR</Typography>
            <Typography variant="h2">PERFECT GETAWAY!</Typography>
          </div>
          <SearchBox />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="text-center">
            <Typography variant="h3" className="!mb-4">
              Find Stays That Match Your Style
            </Typography>
            <Typography variant="h6">
              Explore handpicked homes for every kind of getaway.
            </Typography>
          </div>
          <div></div>
        </div>
      </section>

      <section>
        <Paper
          className={`py-10 ${
            theme.palette.mode == "light" ? "!bg-[#F2F2F2]" : "inherit"
          }  !rounded-none !shadow-none`}
        >
          <div className="container">
            <div className="flex flex-col items-center gap-6">
              <Typography variant="h3">Escape. Relax. Belong.</Typography>
              <Typography
                sx={{ textWrap: "balance" }}
                variant="h5"
                color="textSecondary"
                className="leading-relaxed mb-8 text-center italic"
              >
                At <span className="font-semibold">Villas By Serene</span>, we
                believe hospitality goes beyond providing a place to stay. Every
                detail is designed to create comfort, warmth, and memories that
                last long after your journey ends. Your experience is our first
                priority. Always!
              </Typography>
              <Button variant="contained" size="large">
                Plan Your Stay !
              </Button>
            </div>
          </div>
        </Paper>
      </section>
    </div>
  );
};

export default Home;
