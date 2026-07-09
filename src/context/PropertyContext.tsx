"use client";

import { PropertyListItemDTO } from "@/app/@types";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AvailabilityCache = {
  checkIn: string;
  checkOut: string;
  properties: PropertyListItemDTO[];
} | null;

type PropertyContextType = {
  properties: PropertyListItemDTO[];
  setProperties: (data: PropertyListItemDTO[]) => void;
  availabilityCache: AvailabilityCache;
  setAvailabilityCache: (data: AvailabilityCache) => void;
};

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined,
);

export const PropertyContextProvider = ({
  children,
  initialProperties = [],
}: {
  children: ReactNode;
  initialProperties?: PropertyListItemDTO[];
}) => {
  const [properties, setProperties] =
    useState<PropertyListItemDTO[]>(initialProperties);
  const [availabilityCache, setAvailabilityCache] =
    useState<AvailabilityCache>(null);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        setProperties,
        availabilityCache,
        setAvailabilityCache,
      }}
    >
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
