import React from "react";

import { ThemeContextProvider } from "@/context/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/home/navbar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js with MUI theme toggle",
};

const nunito = Nunito({
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-nunito",
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
          <Navbar />
          <main>{children}</main>
        </ThemeContextProvider>
      </body>
    </html>
  );
};

export default layout;
