import React from 'react'
import { ThemeContextProvider } from "@/context/ThemeContext";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

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
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  )
}

export default layout;
