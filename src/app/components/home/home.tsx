"use client";

import React from "react";
import { Typography } from "@mui/material";

import Navbar from "./navbar";
import SearchBox from "./searchBox";

const Home = () => {
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
        <Typography variant="h5" className="text-center">
          Search by Property Type
        </Typography>
        <div></div>
      </section>
    </div>
  );
};

export default Home;
