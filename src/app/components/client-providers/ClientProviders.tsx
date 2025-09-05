// app/components/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { PropertyContextProvider } from "@/context/PropertyContext";

export default function ClientProviders({
  children,
  propertiesData,
}: {
  children: ReactNode;
  propertiesData: any; // you can type this properly
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeContextProvider>
        <PropertyContextProvider initialProperties={propertiesData}>
          {children}
        </PropertyContextProvider>
      </ThemeContextProvider>
    </LocalizationProvider>
  );
}
