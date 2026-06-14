export default interface CreateBookingDTO {
  unitId: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  userId: string;
  currency: string;
  adultCount: number;
  kidsCount: number;
  petCount: number;
}
