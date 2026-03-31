// app/components/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { PropertyContextProvider } from "@/context/PropertyContext";
import { PropertyListItemDTO } from "@/app/@types/property/PropertyFiltersDTO";

export default function ClientProviders({
  children,
  propertiesData,
}: Readonly<{
  children: ReactNode;
  propertiesData: PropertyListItemDTO[];
}>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <ThemeContextProvider>
        <PropertyContextProvider initialProperties={propertiesData}>
          {/* <ParallaxProvider> */}
          {children}
          {/* </ParallaxProvider> */}
        </PropertyContextProvider>
      </ThemeContextProvider>
    </LocalizationProvider>
  );
}
