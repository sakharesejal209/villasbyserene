import {
  AdminPropertyDetailDTO,
  AdminUnitDTO,
  AdminPropertyImageDTO,
  AdminUnitImageDTO,
  PoolImage,
  ImageCategory,
  ImageSelection,
} from "@/app/@types";

export type {
  AdminPropertyDetailDTO,
  AdminUnitDTO,
  AdminPropertyImageDTO,
  AdminUnitImageDTO,
  PoolImage,
  ImageCategory,
  ImageSelection,
};

export type PropImageFlag = {
  is_banner_image: string;
  is_carousel_image: string | null;
};
export type UnitImageFlag = { is_banner_image: string };
