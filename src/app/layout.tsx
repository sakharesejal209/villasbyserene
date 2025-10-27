import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { IBM_Plex_Serif, Roboto } from "next/font/google";
import Navbar from "./components/home/navbar";
import Footer from "./components/home/footer";
import { fetchAllData } from "@/scripts/getProperties";
import ClientProviders from "./components/client-providers/ClientProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.villasbyserene.com"),
  title: {
    default: "Villas by Serene | Handpicked Luxury Villas",
    template: "%s | Villas by Serene",
  },
  description:
    "Escape to nature with Villas by Serene. Handpicked luxury villas and retreats in India. Perfect for families, couples, and groups seeking private stays with pools and scenic views.",
  keywords: [
    "villas near me",
    "luxury near me",
    "private villa near me",
    "private pool villa near me",
    "villas with swimming pool",
    "resorts near me",
    "villas in Karjat",
    "villas in Panvel",
    "villas in Alibaug",
    "villas in Lonavala",
    "villas in Rajasthan",
    "villas in Udaipur",
    "luxury villas Maharashtra",
    "luxury villas India",
    "private pool villa near Mumbai",
    "Villas by Serene",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.villasbyserene.com",
    title: "Villas by Serene | Handpicked Luxury Villas",
    description:
      "Book stunning villas across India. Handpicked by Villas by Serene for unforgettable getaways surrounded by nature.",
    siteName: "VillasBySerene",
    images: [
      {
        url: "/public/villasbyserene-dark.png",
        width: 1200,
        height: 630,
        alt: "Villas by Serene",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villas by Serene | Luxury Villas & Nature Retreats",
    description:
      "Experience the serenity of luxury villas with pools, scenic hill views, and curated hospitality.",
    images: ["https://www.villasbyserene.com/og-image.jpg"],
    creator: "@villasbyserene",
  },
  alternates: {
    canonical: "https://www.villasbyserene.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "Villas by Serene" }],
  category: "Holiday Rentals & Hospitality",
};

const roboto = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const ibmPlex = IBM_Plex_Serif({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibmPlex",
});

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const propertiesData = await fetchAllData();

  return (
    <html lang="en" className={roboto.className + " " + ibmPlex.className}>
      <body className="flex flex-col min-h-screen">
        <ClientProviders propertiesData={propertiesData}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
