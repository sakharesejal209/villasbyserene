export default interface CreateBookingResponse {
  bookingId: string;
  orderId: string; // Razorpay order ID
  amount: number; // in paise
  currency: string;
}
