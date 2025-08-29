export interface ImageDTO {
  image_id: string;
  image_url: string;
  image_alt: string;
  image_category_id: number;
}

export interface ImageCategoryDTO {
  category_id: string;
  name: string;
}
