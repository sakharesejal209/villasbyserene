import ImageDTO from "./ImageDTO";

export default interface AdminUnitImageDTO {
  image_id:        string;
  unit_id:         string;
  display_order:   number;
  is_banner_image: string | null; // stored as string 'true'/'false' in DB
  image:           ImageDTO | null;
}