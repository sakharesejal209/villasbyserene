// src/app/booking/page.tsx

import { Metadata } from "next";
import { Suspense } from "react";
import BookingPage from "@/app/components/booking/BookingPage";

export const metadata: Metadata = {
  title: "Complete Your Booking | Villas by Serene",
};

export default function Page() {
  return (
    <Suspense>
      <BookingPage />
    </Suspense>
  );
}
