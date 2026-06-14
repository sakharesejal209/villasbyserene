export default interface SeasonalPricingDTO {
  label: string;
  price_per_night: number;
  start_date: string;
  end_date: string;
  isActive: boolean;
  id: string;
}
