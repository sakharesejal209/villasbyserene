import * as React from "react";
import Stays from "@/app/components/stays/stays";
import StaysSearchBox from "@/app/components/stays/staysSearchBox";
import { fetchAllData } from "@/scripts/getProperties";


type ParamsType = { slug: string };

export default async function Page({
  params,
  searchParams,
}: Readonly<{
  params: ParamsType;
  searchParams: Promise<{ guests?: string }>;
}>) {
  const propertiesData = await fetchAllData(); // Direct DB call
  const { guests: guestsParam } = await searchParams;
  const { slug } = await params;
  const guests = parseInt(guestsParam || "0");

  return (
    <div>
      <StaysSearchBox slug={slug} guests={guests} />
      <Stays propertiesData={propertiesData} location={slug} guests={guests} />
    </div>
  );
}