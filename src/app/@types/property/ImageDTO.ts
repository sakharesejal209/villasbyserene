export default interface ImageDTO {
  image_id: string;
  image_url: string;
  image_alt: string | null;
  image_category_id: number | null;
  category_name: string | null;
}
