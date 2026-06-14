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
}

export default function PropertyContainer({ slug, checkIn, checkOut }: Readonly<Props>) {
  const router = useRouter();
  const [property, setProperty] = useState<PropertyDetailDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertiesService
      .getPropertyBySlug(slug, checkIn, checkOut)
      .then(setProperty)
      .catch(() => router.replace("/404"))
      .finally(() => setLoading(false));
  }, [slug, checkIn, checkOut, router]);

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
    />
  );
}
