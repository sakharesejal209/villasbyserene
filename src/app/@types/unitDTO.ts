import { ImageDTO } from "./imageDTO";

export interface UnitDTO {
  unit_id: string;
  property_id: string;
  unit_type: string;
  title?: string;
  description: string;
  max_capacity: number;
  no_of_bedrooms?: number;
  is_available: boolean;
  created_at: string;
  unitImages: UnitImagesType;
  unitRules: {
    unit_id: string;
    rule_id: string;
    display_order: number;
    houseRule: {
      rule_id: string;
      description: string;
    };
  };
}

export type UnitImagesType = {
  imageId: string;
  unit_id: string;
  displayOrder: number;
  is_banner_image: boolean | null;
  image: UnitImageType;
};

interface UnitImageType extends ImageDTO {
  category_id: number;
  name: string;
}
