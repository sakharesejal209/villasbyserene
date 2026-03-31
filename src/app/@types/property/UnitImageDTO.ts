import ImageDTO from "./ImageDTO";

export default interface UnitImageDTO {
  image_id: string;
  unit_id: string;
  display_order: number;
  is_banner_image: boolean;
  image: ImageDTO | null;
}
