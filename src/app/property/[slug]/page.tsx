import { Metadata } from "next";
import { notFound } from "next/navigation";
import Property from "@/app/components/property/Property";
import { propertiesService } from "@/app/@services";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Convert slug to readable name for metadata
  // "elara-villa-by-serene-8c73c8ea" → "Elara Villa By Serene"
  const parts = slug.split("-");
  const readableName = parts
    .slice(0, -1) // remove short ID at end
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${readableName} | Villas by Serene`,
    description: `Book ${readableName} — a luxury private villa stay with Villas by Serene. Perfect for families, couples and groups.`,
    openGraph: {
      title: `${readableName} | Luxury Villa Stay`,
      description: `Book ${readableName} with Villas by Serene.`,
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { checkIn, checkOut } = await searchParams;

  let property;
  try {
    property = await propertiesService.getPropertyBySlug(
      slug,
      checkIn,
      checkOut,
    );
  } catch {
    notFound();
  }

  return (
    <Property
      propertyDetails={property}
      checkIn={checkIn}
      checkOut={checkOut}
    />
  );
}
