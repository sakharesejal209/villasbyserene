import ImageDTO from "./ImageDTO";

export default interface PropertyImageDTO {
  image_id: string;
  property_id: string;
  display_order: number;
  is_banner_image: boolean;
  is_carousel_image: boolean;
  image: ImageDTO | null;
}
