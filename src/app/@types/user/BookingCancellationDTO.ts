export default interface BookingCancellationDTO {
  canCancel: boolean;
  daysToCheckin: number;
  refundPercent: number;
  refundAmount: number;
}
