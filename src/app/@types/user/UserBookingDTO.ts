import BookingCancellationDTO from "./BookingCancellationDTO";

export default interface UserBookingDTO {
  id: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  amount: number;
  currency: string;
  createdAt: string;
  property: { name: string; area: string; state: string } | null;
  unit: { title: string; type: string } | null;
  payment: { paymentId: string; status: string } | null;
  cancellation: BookingCancellationDTO;
}
