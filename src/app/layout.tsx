"use client";

import React from "react";

import { ThemeContextProvider } from "@/context/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { IBM_Plex_Serif, Nunito, Playfair_Display } from "next/font/google";
import Navbar from "./components/home/navbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "My App",
//   description: "Next.js with MUI theme toggle",
// };

const nunito = IBM_Plex_Serif({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <ThemeContextProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Navbar />
            <main>{children}</main>
          </LocalizationProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
};

export default layout;
