import { BookingStatusType } from "../property/enums/BookingStatusType";

export default interface UserBookingDTO {
  id:           string;
  status:       BookingStatusType;
  checkInDate:  string;
  checkOutDate: string;
  amount:       number;
  currency:     string;
  createdAt:    string;
  rooms:        number;
  property:     { name: string; area: string; state: string } | null;
  unit:         { title: string | null; type: string } | null;
  payment:      { paymentId: string; status: string } | null;
  cancellation: {
    canCancel:      boolean;
    daysToCheckin:  number;
    refundPercent:  number;
    refundAmount:   number;
  };
}