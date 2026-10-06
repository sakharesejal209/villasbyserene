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
    return { title: "Property Not Found | Villas by Serene" };
  }

  const {
    name,
    area,
    state,
    bedroom_count: beds,
    max_capacity: guests,
    starting_price: price,
  } = property;

  const imageUrl =
    property.banner_image?.image_url ??
    property.carousel_images?.[0]?.image_url ??
    "https://www.villasbyserene.in/assets/villasbyserene-dark.png";

  const canonicalUrl = `https://www.villasbyserene.in/property/${slug}`;

  // Under 60 chars — location-first for search intent match
  const title = `${name} | Private Villa in ${area}`;

  // Under 155 chars — answers: what, where, who for, CTA
  const description = price
    ? `${beds} BHK private pool villa in ${area}, ${state}. Sleeps ${guests}. From ₹${price.toLocaleString("en-IN")}/night. Instant booking on Villas by Serene.`
    : `${beds} BHK private pool villa in ${area}, ${state}. Sleeps ${guests}. Verified premium listing — book instantly on Villas by Serene.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${name}`,
      `villa in ${area}`,
      `private pool villa ${area}`,
      `${beds} BHK villa ${area}`,
      `luxury villa ${state}`,
      `weekend villa near Mumbai`,
      `villa rental ${area} ${state}`,
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
      creator: "@villasbyserene",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { checkIn, checkOut, guests } = await searchParams;

  let property;
  try {
    property = await propertiesService.getPropertyBySlug(slug);
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: `${property.bedroom_count} BHK private villa in ${property.area}, ${property.state}`,
    url: `https://www.villasbyserene.in/property/${slug}`,
    image:
      property.banner_image?.image_url ??
      property.carousel_images?.[0]?.image_url,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.area,
      addressRegion: property.state,
      addressCountry: "IN",
    },
    telephone: "+919594377736",
    numberOfRooms: property.bedroom_count,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: property.max_capacity,
    },
    priceRange: property.starting_price
      ? `₹${property.starting_price.toLocaleString("en-IN")} per night`
      : undefined,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Private Pool",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Instant Booking",
        value: true,
      },
    ],
    brand: { "@type": "Brand", name: "Villas by Serene" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyContainer
        slug={slug}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
      />
    </>
  );
}
