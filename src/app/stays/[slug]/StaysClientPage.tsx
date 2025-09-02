"use client";

import { usePropertyStore } from "@/context/PropertyContext";
import Stays from "@/app/components/stays/stays";
import StaysSearchBox from "@/app/components/stays/staysSearchBox";
import { useEffect } from "react";

export default function StaysClientPage({
  slug,
  guests,
}: Readonly<{
  slug: string;
  guests: number;
}>) {
  const { properties } = usePropertyStore();

  useEffect(() => {
    console.log("properties:", properties);
  }, [properties]);

  return (
    <section>
      <StaysSearchBox slug={slug} guests={guests} />
      <Stays propertiesData={properties} location={slug} guests={guests} />
    </section>
  );
}
