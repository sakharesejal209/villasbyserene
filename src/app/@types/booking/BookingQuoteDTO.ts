import NightlyBreakdownDTO from "../property/NightlyBreakdownDTO";

export default interface BookingQuoteDTO {
  unitId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  nightly_breakdown: NightlyBreakdownDTO[];

  // Charges
  subtotal: number; // nightly total for 1 unit
  stay_charges: number; // subtotal×rooms + extra charges (shown in UI)
  extra_adult_count: number;
  extra_child_count: number;
  extra_guest_charge: number;
  child_charge: number;
  pet_charge: number;
  total_base: number; // internal — base for commission calc

  // VBS Commission
  commission_percent: number;
  commission_amount: number; // shown as "Property charges"
  commission_gst: number; // shown as "GST on property charges"

  // Fees
  cleaning_fee: number;
  security_deposit: number;
  min_occupancy: number;

  // Final
  total: number; // stay_charges + commission + gst + cleaning_fee
}
