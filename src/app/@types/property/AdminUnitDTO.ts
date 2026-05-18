import AdminUnitImageDTO from "./AdminUnitImageDTO";
import AdminUnitPricingDTO from "./AdminUnitPricingDTO";
import SeasonalPricingDTO from "./SeasonalPricingDTO";

export default interface AdminUnitDTO {
  unit_id: string;
  property_id: string;
  unit_type: string;
  title: string | null;
  description: string | null;
  max_capacity: number | null;
  minOccupancy: number;
  no_of_bedrooms: number | null;
  no_of_restrooms: number | null;
  is_pool_available: boolean;
  is_available: boolean;
  is_display_unit: boolean;
  extraGuestCharge: number | null;
  petCharge: number | null;
  childAgeFree: number | null;
  childCharge: number | null;
  vbs_commission: number;
  created_at: string;
  pricing: AdminUnitPricingDTO | null;
  seasonal: SeasonalPricingDTO[];
  images: AdminUnitImageDTO[];
  maxPets?: number | null;
}
