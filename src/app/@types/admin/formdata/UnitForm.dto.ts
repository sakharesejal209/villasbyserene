export default interface UnitForm {
  unit_type: string;
  title: string;
  description: string;
  max_capacity: number;
  minOccupancy: number;
  no_of_bedrooms: number;
  no_of_restrooms: number;
  is_pool_available: boolean;
  is_display_unit: boolean;
  extraGuestCharge: number;
  petCharge: number;
  maxPets: number;
  childCharge: number;
  childAgeFree: number;
  vbs_commission: number;
}
