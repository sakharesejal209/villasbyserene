"use client";

import { useMemo, useState } from "react";

import {
  Button,
  Drawer,
  Paper,
  Slide,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";

import { usePropertyStore } from "@/context/PropertyContext";
import Stays from "@/app/components/stays/stays";
import StaysSearchBox from "@/app/components/stays/staysSearchBox";
import { TuneOutlined } from "@mui/icons-material";

export default function StaysClientPage() {
  const { properties } = usePropertyStore();
  const searchParams = useSearchParams();
  const params = useParams<{ slug: string }>();
  const [openFilters, setopenFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    location: params.slug || "all",
    guests: Number(searchParams.get("guests")) || 1,
    bedrooms: Number(searchParams.get("bedrooms")) || null,
    amenities: searchParams.get("amenities")?.split(",") || [],
    accommodationType: searchParams.get("accommodationType") || "",
  });

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) =>
        filters.location && filters.location.toLowerCase() !== "all"
          ? p.area.toLowerCase().includes(filters.location.toLowerCase())
          : true
      )
      .filter((p) => p.maxcapacity >= filters.guests)
      .filter((p) =>
        filters.bedrooms ? p.bedroomcount >= filters.bedrooms : true
      )
      .filter((p) =>
        filters.amenities.length > 0
          ? filters.amenities.every((a) =>
              p.PropertyAmenity.some((pa) => pa.amenity_id === a)
            )
          : true
      )
      .filter((p) =>
        filters.accommodationType && filters.accommodationType !== "ALL"
          ? p.accommodationType == filters.accommodationType
          : true
      );
  }, [filters, properties]);

  const trigger = useScrollTrigger();

  console.log("properties:", properties);

  return (
    <section>
      <section className="hidden h-full w-full md:grid grid-cols-12  relative">
        <StaysSearchBox
          filters={filters}
          setFilters={setFilters}
          setopenFilters={setopenFilters}
        />
        <Stays propertiesData={filteredProperties} location={params.slug} />
      </section>
      <section className="md:hidden h-full w-full grid relative">
        <div className="p-4">
          <Stays propertiesData={filteredProperties} location={params.slug} />
        </div>

        <Slide appear={false} direction="up" in={!trigger}>
          <Paper className="md:hidden fixed bottom-5 left-5 h-fit w-[90%] px-4 py-3 z-50 rounded-3xl">
            <Button
              size="small"
              onClick={() => setopenFilters(true)}
              startIcon={<TuneOutlined />}
              className=" w-full gap-3"
            >
              <div>
                <Typography className="!mb-0.5 !text-xl" variant="button">
                  Filters
                </Typography>
              </div>

              {/* <Button variant="contained" onClick={() => setOpenForm(true)}>
                Book Now
              </Button> */}
            </Button>
          </Paper>
        </Slide>
      </section>

      <Drawer
        anchor="bottom"
        open={openFilters}
        onClose={() => setopenFilters(false)}
        slotProps={{
          paper: {
            sx: {
              height: "70vh",
            },
          },
        }}
      >
        <StaysSearchBox
          filters={filters}
          setFilters={setFilters}
          setopenFilters={setopenFilters}
        />
      </Drawer>
    </section>
  );
}
