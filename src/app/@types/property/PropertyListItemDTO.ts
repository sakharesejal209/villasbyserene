import { AccommodationType } from "./enums/AccommodationType";
import AmenityDTO from "./AmenityDTO";
import { BookingType } from "./enums/BookingType";
import ImageDTO from "./ImageDTO";
import ThemeDTO from "./ThemeDTO";

export default interface PropertyListItemDTO {
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
