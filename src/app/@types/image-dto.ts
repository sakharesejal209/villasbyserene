export interface ImageDTO {
  image_id: string;
  image_url: string;
  image_alt: string | null;
  imageCategory: {
    name: string;
    category_id: number;
  } | null;
}

export interface ImageCategoryDTO {
  category_id: number;
  name: string;
}
