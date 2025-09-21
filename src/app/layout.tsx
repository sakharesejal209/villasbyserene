import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import {
  IBM_Plex_Serif,
  Roboto,
} from "next/font/google";
import Navbar from "./components/home/navbar";
import Footer from "./components/home/footer";
import { fetchAllData } from "@/scripts/getProperties";
import ClientProviders from "./components/client-providers/ClientProviders";

const roboto = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ['latin'],
  variable: "--font-roboto",
});

const ibmPlex = IBM_Plex_Serif({
  weight: ["400", "500", "600", "700"],
  subsets: ['latin'],
  variable: "--font-ibmPlex",
});

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const propertiesData = await fetchAllData();

  console.log('propertiesData:', propertiesData);
  

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
