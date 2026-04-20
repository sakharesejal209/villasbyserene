export default interface AdminBookingDTO {
  id: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  amount: number;
  createdAt: string;
  property: { name: string; area: string; state: string } | null;
  unit: { title: string } | null;
  guest: { name: string; email: string; phone: string } | null;
  cancellation: {
    refundPercent: number;
    refundAmount: number;
    daysToCheckin: number;
  };
}
