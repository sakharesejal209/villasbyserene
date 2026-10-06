import StaysMainContainer from "@/app/components/stays/StaysMainContainer";
import { Metadata } from "next";

function formatLocation(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function LocationJsonLd({ slug }: { slug: string }) {
  const location = formatLocation(slug);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Private Villas in ${location}`,
          url: `https://www.villasbyserene.in/stays/${slug}`,
        }),
      }}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = formatLocation(slug);
  const canonicalUrl = `https://www.villasbyserene.in/stays/${slug}`;
  const title = `Villas in ${location} | Private Pool Villas by Serene`;
  const description = `Browse handpicked private pool villas in ${location}. Perfect for family getaways, group stays & romantic weekends. Instant booking on Villas by Serene.`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `villas in ${location}`,
      `private pool villa ${location}`,
      `luxury villa ${location}`,
      `weekend villa near ${location}`,
      `villa rental ${location}`,
      `holiday villa ${location} Maharashtra`,
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
          url: "https://www.villasbyserene.in/assets/villasbyserene-dark.png",
          width: 1200,
          height: 630,
          alt: `Private Villas in ${location} — Villas by Serene`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@villasbyserene",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <LocationJsonLd slug={slug} />
      <StaysMainContainer />
    </>
  );
}
