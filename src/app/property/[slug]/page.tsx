import { Metadata } from "next";
import { notFound } from "next/navigation";
import { propertiesService } from "@/app/@services";
import PropertyContainer from "@/app/components/property/PropertyContainer";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  let property;
  try {
    property = await propertiesService.getPropertyBySlug(slug);
  } catch {
    return {
      title: "Property Not Found | Villas by Serene",
    };
  }

  const name = property.name;
  const area = property.area;
  const state = property.state;
  const bedrooms = property.bedroom_count;
  const guests = property.max_capacity;
  const startingPrice = property.starting_price;

  const imageUrl =
    property.banner_image?.image_url ??
    property.carousel_images?.[0]?.image_url ??
    "https://www.villasbyserene.com/logo.png";

  // Title: name + location + key selling point, front-loaded for search + social
  const title = `${name} | ${bedrooms} BHK Private Villa in ${area}, ${state}`;

  // Description: specific, factual, includes price anchor — improves CTR from search
  const description = startingPrice
    ? `Book ${name}, a ${bedrooms} BHK private villa in ${area} with space for up to ${guests} guests. Starting from ₹${startingPrice.toLocaleString("en-IN")}/night. Private pool, instant booking, verified by Villas by Serene.`
    : `Book ${name}, a ${bedrooms} BHK private villa in ${area} with space for up to ${guests} guests. Verified listing by Villas by Serene — premium villa rentals in Maharashtra.`;

  const canonicalUrl = `https://www.villasbyserene.com/property/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      `${name}`,
      `villa in ${area}`,
      `${area} villa rental`,
      `private pool villa ${area}`,
      `${bedrooms} BHK villa ${state}`,
      `villa rental ${state}`,
    ],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Villas by Serene",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${name} — ${area}, ${state}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { checkIn, checkOut, guests } = await searchParams;

  return (
    <PropertyContainer
      slug={slug}
      checkIn={checkIn}
      checkOut={checkOut}
      guests={guests}
    />
  );
}
