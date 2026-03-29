export enum UnitType {
  VILLA = "VILLA",
  CHALET = "CHALET",
  COTTAGE = "COTTAGE",
  ROOM = "ROOM",
  APARTMENT = "APARTMENT",
}

export enum AccommodationType {
  ENTIRE_HOME = "ENTIRE_HOME",
  SEPARATE_ROOMS = "SEPARATE_ROOMS",
  ENTIRE_HOME_AND_SEPARATE_ROOMS = "ENTIRE_HOME_AND_SEPARATE_ROOMS",
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export enum BookingType {
  DIRECT = "DIRECT",
  ENQUIRY = "ENQUIRY",
}

export interface ImageDTO {
  image_id: string;
  image_url: string;
  image_alt: string | null;
  image_category_id: number | null;
  category_name: string | null;
}

export interface PropertyImageDTO {
  image_id: string;
  property_id: string;
  display_order: number;
  is_banner_image: boolean;
  is_carousel_image: boolean;
  image: ImageDTO | null;
}

export interface UnitImageDTO {
  image_id: string;
  unit_id: string;
  display_order: number;
  is_banner_image: boolean;
  image: ImageDTO | null;
}

export interface UnitPricingDTO {
  weekday_price: number;
  weekend_price: number;
  cleaning_fee: number;
  security_deposit: number;
  tax_percent: number;
  min_nights: number;
}

export interface SeasonalRateDTO {
  label: string;
  price_per_night: number;
  start_date: string;
  end_date: string;
}

export interface UnitDTO {
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
}

export interface UnitGroupDTO {
  unit_type: UnitType;
  type_label: string;
  total_count: number;
  available_count: number;
  display_unit: UnitDTO;
  pricing: UnitPricingDTO | null;
  seasonal_rate: SeasonalRateDTO | null;
}

export interface AmenityDTO {
  amenity_id: string;
  name: string;
  display_order: number;
}

export interface HouseRuleDTO {
  rule_id: string;
  description: string | null;
  display_order: number;
}

export interface NearByAttractionDTO {
  attraction_id: string;
  title: string;
  description: string;
  image_url: string;
  distance: string;
}

export interface FoodMenuDTO {
  menu_id: string;
  description: string;
  is_veg: boolean;
  is_non_veg: boolean;
  is_jain: boolean;
  menu_url: string;
  breakfast_time: string;
  lunch_time: string;
  dinner_time: string;
  hightea_time: string;
}

export interface ThemeDTO {
  theme_id: string;
  name: string;
  property_name: string | null;
}

export interface PropertyListItemDTO {
  property_id: string;
  name: string;
  description: string;
  address: string;
  area: string;
  city: string;
  state: string;
  country: string;
  accommodation_type: AccommodationType;
  checkin_time: string;
  checkout_time: string;
  max_capacity: number;
  bedroom_count: number;
  meals_available: boolean;
  booking_type: BookingType;
  created_at: string;
  themes: ThemeDTO[];
  banner_image: ImageDTO | null;
  carousel_images: ImageDTO[];
  starting_price: number | null;
  amenities: AmenityDTO[];
}

export interface PropertyDetailDTO extends PropertyListItemDTO {
  map_location: string | null;
  all_images: PropertyImageDTO[];
  unit_groups: UnitGroupDTO[];
  house_rules: HouseRuleDTO[];
  nearby_attractions: NearByAttractionDTO[];
  food_menus: FoodMenuDTO[];
}

export interface QuoteRequestDTO {
  unitId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  hasPet: boolean;
}

export interface NightlyBreakdownDTO {
  date: string;
  type: "weekday" | "weekend" | "seasonal";
  label?: string;
  price: number;
}

export interface BookingQuoteDTO {
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
}

export interface PropertyFiltersDTO {
  city?: string;
  area?: string;
  state?: string;
  theme?: string;
  accommodationType?: AccommodationType;
  guests?: number;
  checkIn?: string;
  checkOut?: string;
  bedrooms?: number;
  amenities?: string[];
  priceMin?: number;
  priceMax?: number;
}
