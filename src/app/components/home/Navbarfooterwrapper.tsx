"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/home/navbar";
import Footer from "@/app/components/home/footer";

export default function NavbarFooterWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
