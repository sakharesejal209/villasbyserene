import { Metadata } from "next";
import StaysClientPage from "./StaysClientPage";


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
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

export default async function Page() {

  return <StaysClientPage />;
}
