"use client";

import { PropertyListItemDTO } from "@/app/@types";
import React, { createContext, useContext, useState, ReactNode } from "react";

type PropertyContextType = {
  properties: PropertyListItemDTO[];
  setProperties: (data: PropertyListItemDTO[]) => void;
};

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
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
