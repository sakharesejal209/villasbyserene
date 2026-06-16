"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import Property from "@/app/components/property/Property";
import { propertiesService } from "@/app/@services";
import type { PropertyDetailDTO } from "@/app/@types";

interface Props {
  slug: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export default function PropertyContainer({ slug, checkIn, checkOut, guests }: Readonly<Props>) {
  const router = useRouter();
  const [property, setProperty] = useState<PropertyDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertiesService
      .getPropertyBySlug(slug, checkIn, checkOut, guests)
      .then(setProperty)
      .catch(() => router.replace("/404"))
      .finally(() => setLoading(false));
  }, [slug, checkIn, checkOut, router, guests]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress />
      </Box>
    );

  if (!property) return null;

  return (
    <Property
      propertyDetails={property}
      checkIn={checkIn}
      checkOut={checkOut}
      guests={guests}
    />
  );
}
