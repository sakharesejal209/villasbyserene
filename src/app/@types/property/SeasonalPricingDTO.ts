export default interface SeasonalPricingDTO {
  label: string;
  pricePerNight: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  id: string;
}
