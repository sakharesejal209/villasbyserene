import ImageDTO from "./ImageDTO";

export default interface AdminPropertyImageDTO {
  image_id:          string;
  property_id:       string;
  display_order:     number;
  is_banner_image:   string | null; // stored as 'true'/'false' in DB
  is_carousel_image: string | null;
  image:             ImageDTO | null;
}
