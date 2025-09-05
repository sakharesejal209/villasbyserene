"use client";

import { usePropertyStore } from "@/context/PropertyContext";
import Stays from "@/app/components/stays/stays";
import StaysSearchBox from "@/app/components/stays/staysSearchBox";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function StaysClientPage({
  slug,
  guests,
}: Readonly<{
  slug: string;
  guests: number;
}>) {
  const { properties } = usePropertyStore();
  const searchParams = useSearchParams();
  const params = useParams<{ slug: string }>();
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
      );
  }, [filters, properties]);

  console.log("properties:", properties);

  return (
    <section>
      <div className="h-full w-full grid grid-cols-12 gap-10 mt-[40px] px-4">
        <StaysSearchBox filters={filters} setFilters={setFilters} />

        <Stays
          propertiesData={filteredProperties}
          location={slug}
          guests={guests}
        />
      </div>
    </section>
    // <section>
    //   <StaysSearchBox slug={slug} guests={guests} />
    //   <Stays propertiesData={properties} location={slug} guests={guests} />
    // </section>
  );
}
