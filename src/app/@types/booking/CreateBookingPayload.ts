export default interface CreateBookingPayload {
  unitId:      string;
  propertyId:  string;
  checkIn:     string;
  checkOut:    string;
  userId:      string;
  currency?:   string;
  adultCount:  number;
  kidsCount:   number;
  infantCount?: number;
  petCount:    number;
  rooms?:      number;
}
