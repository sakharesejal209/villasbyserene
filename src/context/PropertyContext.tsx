"use client";

import PropertyDTO from "@/app/@types/property-dto";
import React, { createContext, useContext, useState, ReactNode } from "react";

type PropertyContextType = {
  properties: PropertyDTO[];
  setProperties: (data: PropertyDTO[]) => void;
};

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

export const PropertyContextProvider = ({
  children,
  initialProperties = [],
}: {
  children: ReactNode;
  initialProperties?: PropertyDTO[];
}) => {
  const [properties, setProperties] =
    useState<PropertyDTO[]>(initialProperties);

  return (
    <PropertyContext.Provider value={{ properties, setProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyStore = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("usePropertyStore must be used within PropertyProvider");
  }
  return context;
};
