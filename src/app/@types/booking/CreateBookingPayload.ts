export default interface CreateBookingPayload {
  unitId: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  userId: string;
  currency?: "INR";
  adultCount: number;
  kidsCount: number;
  petCount: number;
}
