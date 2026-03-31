import NightlyBreakdownDTO from "./NightlyBreakdownDTO";

export default interface BookingQuoteDTO {
  unitId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  nightly_breakdown: NightlyBreakdownDTO[];
  subtotal: number;
  extra_guest_charge: number;
  child_charge: number;
  pet_charge: number;
  cleaning_fee: number;
  security_deposit: number;
  tax_amount: number;
  tax_percent: number;
  total: number;
  extra_adult_count: number;
  extra_child_count: number;
  min_occupancy: number;
}
