import { Metadata } from "next";
import StaysClientPage from "./StaysClientPage";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const villa = params.slug;

  if (!villa) {
    return {
      title: "Villas near me | Villas by Serene",
      description: "Near by villas found.",
    };
  }

  return {
    title: `Villas in ${villa} | Private Pool Villa in ${villa} | Villas by Serene`,
    description: `Book a villa, a luxury stay in ${villa}.`,
    openGraph: {
      title: `Private ${villa} villa | Luxury Villa Stay`,
      description: `Priavte pool ${villa} villa`,
    },
  };
}

export default async function Page({ params }: Readonly<PageProps>) {
  const villa = params.slug;

  if (!villa) {
    return <div className="p-6 text-center text-gray-600">Villa not found</div>;
  }

  return <StaysClientPage />;
}
