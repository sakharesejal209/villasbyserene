import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { Montserrat, EB_Garamond } from "next/font/google";
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
    "luxury villas near me",
    "private villa near me",
    "private pool villa near me",
    "villas with swimming pool",
    "resorts near me",
    "villas in Karjat",
    "villas in Navi mumbai",
    "villas in Panvel",
    "villas in Alibaug",
    "villas in Lonavala",
    "villas in Rajasthan",
    "villas in Udaipur",
    "luxury villas in Maharashtra",
    "luxury villas in India",
    "private pool villa near Mumbai",
    "Villas by Serene",

    "book luxury villas in India",
    "private villas for rent",
    "holiday villas with pool",
    "exclusive villa stays",
    "eco stays and private retreats",
    "luxury stays for couples and families",
    "villa resorts with private pool",
    "weekend getaway villas",

    // Location based (Pan India)
    "villas in Goa",
    "villas in Udaipur",
    "villas in Rajasthan",
    "villas in Maharashtra",
    "villas in Karjat",
    "villas in Lonavala",
    "villas in Alibaug",
    "villas near Mumbai",
    "beachfront villas in Goa",
    "beachfront villas in Alibaug",
    "hill view villas in Lonavala",
    "heritage villas in Udaipur",

    // Experience based
    "romantic villa stays",
    "family villa getaways",
    "pool villas for group stays",
    "boutique luxury villas",
    "eco-friendly villa stays",
    "private villas for destination weddings",
    "corporate retreat villas",

    // Brand & recall
    "Villas by Serene",
    "Serene Villas India",
    "Serene luxury stays",
    "Serene private retreats",
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
        url: "/assets/villasbyserene-dark.png",
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
    images: ["https://www.villasbyserene.com/assets/villasbyserene-dark.png"],
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

const roboto = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const ibmPlex = EB_Garamond({
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
