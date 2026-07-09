"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Drawer,
  Paper,
  Slide,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import { IoFunnelOutline as TuneOutlined } from "react-icons/io5";

import StaysSearchBox from "@/app/components/stays/staysSearchBox";
import { usePropertyStore } from "@/context/PropertyContext";
import { PropertyListItemDTO } from "@/app/@types";
import Stays from "./stays";
import { propertiesService } from "@/app/@services";

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

function readFiltersFromUrl(
  slug: string,
  searchParams: ReturnType<typeof useSearchParams>,
): StayFilters {
  return {
    location: slug,
    guests: searchParams.get("guests") ? Number(searchParams.get("guests")) : 1,
    bedrooms: searchParams.get("bedrooms")
      ? Number(searchParams.get("bedrooms"))
      : 0,
    amenities: searchParams.get("amenities")?.split(",").filter(Boolean) ?? [],
    accommodationType: searchParams.get("accommodationType") ?? "ALL",
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
    priceMin: searchParams.get("priceMin")
      ? Number(searchParams.get("priceMin"))
      : 0,
    priceMax: searchParams.get("priceMax")
      ? Number(searchParams.get("priceMax"))
      : PRICE_MAX,
  };
}

const StaysMainContainer: FC = () => {
  const { properties: storeProperties, availabilityCache } = usePropertyStore();

  const searchParams = useSearchParams();

  const params = useParams<{ slug: string }>();

  const slug = decodeURIComponent(params.slug || "all");

  const filters = useMemo(
    () => readFiltersFromUrl(slug, searchParams),
    [slug, searchParams],
  );

  const cacheHit =
    availabilityCache &&
    availabilityCache.checkIn === filters.checkIn &&
    availabilityCache.checkOut === filters.checkOut;

  const [availabilityFiltered, setAvailabilityFiltered] = useState<
    PropertyListItemDTO[] | null
  >(cacheHit ? availabilityCache.properties : null);
  const [loading, setLoading] = useState(false);

  const trigger = useScrollTrigger();
  const theme = useTheme();

  const [openFilters, setopenFilters] = useState(false);

  const lastFetchedDates = useRef<{ checkIn: string; checkOut: string } | null>(
    cacheHit
      ? {
          checkIn: availabilityCache.checkIn,
          checkOut: availabilityCache.checkOut,
        }
      : null,
  );

  useEffect(() => {
    if (!filters.checkIn || !filters.checkOut) {
      setAvailabilityFiltered(null);
      setLoading(false);
      lastFetchedDates.current = null;
      return;
    }

    if (
      lastFetchedDates.current?.checkIn === filters.checkIn &&
      lastFetchedDates.current?.checkOut === filters.checkOut
    ) {
      return;
    }
    lastFetchedDates.current = {
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
    };

    let cancelled = false;

    setLoading(true);
    propertiesService
      .getProperties({ checkIn: filters.checkIn, checkOut: filters.checkOut })
      .then((res) => {
        if (cancelled) return;
        setAvailabilityFiltered(res);
        lastFetchedDates.current = {
          checkIn: filters.checkIn as string,
          checkOut: filters.checkOut as string,
        };
      })
      .catch(() => {
        if (!cancelled) setAvailabilityFiltered(null);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filters.checkIn, filters.checkOut]);

  const properties = availabilityFiltered ?? storeProperties;

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (filters.location && filters.location.toLowerCase() !== "all") {
        const loc = filters.location.toLowerCase();
        if (
          !p.city.toLowerCase().includes(loc) &&
          !p.area.toLowerCase().includes(loc)
        )
          return false;
      }
      if (filters.guests > 1 && p.max_capacity < filters.guests) return false;
      if (filters.bedrooms > 0 && p.bedroom_count < filters.bedrooms)
        return false;

      if (
        filters.accommodationType !== "ALL" &&
        p.accommodation_type !== filters.accommodationType
      )
        return false;

      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((id) =>
          p.amenities.some((a) => a.amenity_id === id),
        )
      )
        return false;

      if (p.starting_price !== null) {
        if (filters.priceMin > 0 && p.starting_price < filters.priceMin)
          return false;
        if (filters.priceMax < PRICE_MAX && p.starting_price > filters.priceMax)
          return false;
      }
      return true;
    });
  }, [properties, filters]);

  // StaysSearchBox no longer needs to mutate filters directly —
  // it writes to the URL via syncUrl, and `filters` above re-derives
  // from the URL on the next render. This is intentionally a no-op;
  // see StaysSearchBox's syncUrl for the actual state write.
  const noopSetFilters: React.Dispatch<
    React.SetStateAction<StayFilters>
  > = () => {};

  return (
    <div className="mt-2">
      {/* Desktop */}
      <section className="hidden h-full w-full md:grid grid-cols-12 relative">
        <StaysSearchBox
          filters={filters}
          setFilters={noopSetFilters}
          setopenFilters={setopenFilters}
        />
        <Stays
          propertiesData={filteredProperties}
          location={filters.location}
          loading={loading}
        />
      </section>

      {/* Mobile */}
      <section className="md:hidden h-full w-full grid relative">
        <Stays
          propertiesData={filteredProperties}
          location={filters.location}
          loading={loading}
        />

        <Slide appear={false} direction="up" in={!trigger}>
          <Paper className="md:hidden fixed bottom-5 left-5 h-fit w-[90%] px-4 py-3 z-50 rounded-3xl">
            <Button
              size="small"
              onClick={() => setopenFilters(true)}
              startIcon={<TuneOutlined />}
              className="w-full"
              color={theme.palette.mode == "light" ? "primary" : "secondary"}
            >
              <Typography
                color={theme.palette.mode == "light" ? "primary" : "secondary"}
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
          setFilters={noopSetFilters}
          setopenFilters={setopenFilters}
        />
      </Drawer>
    </div>
  );
};

export default StaysMainContainer;
