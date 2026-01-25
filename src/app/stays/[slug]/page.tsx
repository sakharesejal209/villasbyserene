import { Metadata } from "next";
import StaysClientPage from "./StaysClientPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: location } = await params;

  if (!location) {
    return {
      title: "Villas near me | Villas by Serene",
      description: "Near by villas found.",
    };
  }

  return {
    title: `Stays in ${location} | Villas in ${location} | Private villa in ${location} | Private Pool Villas in ${location} | Villas by Serene`,
    description: `Book a villa, a luxury stay in ${location}.`,
    openGraph: {
      title: `Private ${location} villa | Luxury Villa Stay`,
      description: `Book the best villas, resorts and homestays in ${location}. Perfect for families, couples & weekend getaways.`,
    },
  };
}

export default async function Page() {
  return <StaysClientPage />;
}
