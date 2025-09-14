import { ImageCategoryDTO } from "./image-dto";

export interface UnitDTO {
  unit_id: string;
  property_id: string;
  unit_type: string;
  title?: string | null;
  description: string | null;
  max_capacity: number | null;
  no_of_bedrooms?: number | null;
  no_of_restrooms?: number | null;
  is_pool_available: boolean;
  is_available: boolean;
  created_at: Date;
  unitImages: UnitImagesType[];
}

export type UnitImagesType = {
  image_id: string;
  unit_id: string;
  display_order: number;
  is_banner_image: string;
  image: UnitImageType;
};

interface UnitImageType {
  image_id: string;
  image_url: string;
  image_alt: string;
  image_category_id: number;
  imageCategory: ImageCategoryDTO;
}
