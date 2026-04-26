"use client";

import { FC, useMemo, useState } from "react";
import {
  Button,
  Drawer,
  Paper,
  Slide,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import { TuneOutlined } from "@mui/icons-material";

import StaysSearchBox from "@/app/components/stays/staysSearchBox";
import { usePropertyStore } from "@/context/PropertyContext";
import Stays from "./stays";

export interface StayFilters {
  location: string;
  guests: number;
  bedrooms: number;
  amenities: string[];
  accommodationType: string;
  checkIn: string | null;
  checkOut: string | null;
  priceMin: number;
  priceMax: number;
}

const PRICE_MAX = 50000;

const StaysClientPage: FC = () => {
  const { properties } = usePropertyStore();

  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const trigger = useScrollTrigger();
  const slug = decodeURIComponent(params.slug || "all");

  const [openFilters, setopenFilters] = useState(false);

  const [filters, setFilters] = useState<StayFilters>({
    location: slug,
    guests: searchParams.get("guests") ? Number(searchParams.get("guests")) : 1,
    bedrooms: searchParams.get("bedrooms")
      ? Number(searchParams.get("bedrooms"))
      : 0,
    amenities: searchParams.get("amenities")
      ? searchParams.get("amenities")!.split(",").filter(Boolean)
      : [],
    accommodationType: searchParams.get("accommodationType") ?? "ALL",
    checkIn: searchParams.get("checkIn") ?? null,
    checkOut: searchParams.get("checkOut") ?? null,
    priceMin: searchParams.get("priceMin")
      ? Number(searchParams.get("priceMin"))
      : 0,
    priceMax: searchParams.get("priceMax")
      ? Number(searchParams.get("priceMax"))
      : PRICE_MAX,
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (filters.location && filters.location.toLowerCase() !== "all") {
        const loc = filters.location.toLowerCase();
        const matches =
          p.city.toLowerCase().includes(loc) ||
          p.area.toLowerCase().includes(loc);
        if (!matches) return false;
      }
      if (filters.guests > 1 && p.max_capacity < filters.guests) return false;
      if (filters.bedrooms > 0 && p.bedroom_count < filters.bedrooms)
        return false;

      if (
        filters.accommodationType &&
        filters.accommodationType !== "ALL" &&
        p.accommodation_type !== filters.accommodationType
      )
        return false;

      if (filters.amenities.length > 0) {
        const hasAll = filters.amenities.every((id) =>
          p.amenities.some((a) => a.amenity_id === id),
        );
        if (!hasAll) return false;
      }

      if (p.starting_price !== null) {
        if (filters.priceMin > 0 && p.starting_price < filters.priceMin)
          return false;
        if (filters.priceMax < PRICE_MAX && p.starting_price > filters.priceMax)
          return false;
      }
      return true;
    });
  }, [properties, filters]);

  return (
    <div className="mt-10">
      {/* Desktop─ */}
      <section className="hidden h-full w-full md:grid grid-cols-12 relative">
        <StaysSearchBox
          filters={filters}
          setFilters={setFilters}
          setopenFilters={setopenFilters}
        />
        <Stays
          propertiesData={filteredProperties}
          location={filters.location}
        />
      </section>

      {/* Mobile */}
      <section className="md:hidden h-full w-full grid relative">
        <Stays
          propertiesData={filteredProperties}
          location={filters.location}
        />

        <Slide appear={false} direction="up" in={!trigger}>
          <Paper className="md:hidden fixed bottom-5 left-5 h-fit w-[90%] px-4 py-3 z-50 rounded-3xl">
            <Button
              size="small"
              onClick={() => setopenFilters(true)}
              startIcon={<TuneOutlined color="secondary" />}
              className="w-full"
            >
              <Typography
                color="secondary"
                className="mb-0.5!"
                variant="subtitle1"
              >
                Filters
              </Typography>
            </Button>
          </Paper>
        </Slide>
      </section>

      {/* Mobile filter drawer */}
      <Drawer
        anchor="bottom"
        open={openFilters}
        onClose={() => setopenFilters(false)}
        slotProps={{ paper: { sx: { height: "70vh" } } }}
      >
        <StaysSearchBox
          filters={filters}
          setFilters={setFilters}
          setopenFilters={setopenFilters}
        />
      </Drawer>
    </div>
  );
};

export default StaysClientPage;
