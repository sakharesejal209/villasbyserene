"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function updatePropertyImages(
  propertyId: string,
  updates: {
    image_id: string;
    display_order?: number;
    is_banner_image?: string | null;
    is_carousel_image?: string | null;
  }[]
) {
  try {
    const promises = updates.map((u) =>
      prisma.propertyImage.update({
        where: {
          image_id_property_id: {
            image_id: u.image_id,
            property_id: propertyId,
          },
        },
        data: {
          display_order: u.display_order,
          is_banner_image: u.is_banner_image,
          is_carousel_image: u.is_carousel_image,
        },
      })
    );

    await Promise.all(promises);
    return { success: true };
  } catch (err) {
    console.error("Error updating PropertyImages:", err);
  }
}

// Update UnitImage
export async function updateUnitImages(
  unitId: string,
  updates: {
    image_id: string;
    display_order?: number;
    is_banner_image?: string | null;
  }[]
) {
  try {
    const promises = updates.map((u) =>
      prisma.unitImage.update({
        where: {
          image_id_unit_id: {
            image_id: u.image_id,
            unit_id: unitId,
          },
        },
        data: {
          display_order: u.display_order,
          is_banner_image: u.is_banner_image,
        },
      })
    );

    await Promise.all(promises);
    return { success: true };
  } catch (err) {
    console.error("Error updating UnitImages:", err);
  }
}
