import NightlyBreakdownDTO from "./NightlyBreakdownDTO";

export interface BookingQuoteDTO {
  unitId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  nightly_breakdown: NightlyBreakdownDTO[];
  subtotal: number;
  stay_ex_commission: number; // "Stay charges"
  commission_amount: number; // "Property charges"
  commission_gst: number; // "GST on property charges"
  commission_percent: number;
  extra_adult_count: number;
  extra_child_count: number;
  extra_guest_charge: number;
  child_charge: number;
  pet_charge: number;
  cleaning_fee: number;
  security_deposit: number;
  min_occupancy: number;
  total: number;
}
