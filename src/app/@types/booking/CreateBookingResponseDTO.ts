export default interface CreateBookingResponse {
  bookingId: string;
  orderId:   string;
  amount:    number;
  currency:  string;
  rooms?:    number;
  unitIds?:  string[];
}
