import SeasonalRateDTO from "./SeasonalPricingDTO";
import UnitDTO from "./UnitDTO";
import UnitPricingDTO from "./UnitPricingDTO";
import { UnitType } from "./enums/UnitType";

export default interface UnitGroupDTO {
  unit_type: UnitType;
  type_label: string;
  total_count: number;
  available_count: number;
  display_unit: UnitDTO;
  pricing: UnitPricingDTO | null;
  seasonal_rate: SeasonalRateDTO | null;
}
