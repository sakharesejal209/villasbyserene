import { ImageCategoryDTO, ImageDTO } from "./image-dto";

export interface PropertyImageDTO {
  image_id: string;
  property_id: string;
  display_order: number;
  is_banner_image: string | null;
  is_carousel_image: string | null;
  image: ImageDTO | null;
  // imageCategory: ImageCategoryDTO | null;
}