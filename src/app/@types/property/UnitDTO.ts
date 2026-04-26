import UnitImageDTO from "./UnitImageDTO";
import UnitPricingDTO from "./UnitPricingDTO";
import { UnitType } from "./enums/UnitType";

export default interface UnitDTO {
  unit_id: string;
  property_id: string;
  unit_type: UnitType;
  title: string | null;
  description: string | null;
  max_capacity: number | null;
  min_occupancy: number;
  no_of_bedrooms: number | null;
  no_of_restrooms: number | null;
  is_pool_available: boolean;
  is_available: boolean;
  is_display_unit: boolean;
  extra_guest_charge: number | null;
  pet_charge: number | null;
  child_age_free: number | null;
  child_charge: number | null;
  created_at: string;
  images: UnitImageDTO[];
  pricing: UnitPricingDTO | null;
  vbs_commission: number;
}