import { ImageDTO } from "../../property";

export default interface AdminUnitImageDTO {
  image_id: string;
  unit_id: string;
  display_order: number;
  is_banner_image: string | null;
  image: ImageDTO | null;
}
