import { Metadata } from "next";
import BookingConfirmed from "@/app/components/booking/BookingConfirmed";

export const metadata: Metadata = {
  title: "Booking Confirmed | Villas by Serene",
};

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ bookingId: string }>;
}>) {
  const { bookingId } = await params;
  return <BookingConfirmed bookingId={bookingId} />;
}
