import { AccommodationType } from "./enums/AccommodationType";

export default interface PropertyFiltersDTO {
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
