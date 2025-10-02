"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

/**
 * Deletes property images for a given property_id and image_ids
 */
export async function deletePropertyImages(
  property_id: string,
  image_ids: string[]
) {
  try {
    await prisma.propertyImage.deleteMany({
      where: {
        property_id,
        image_id: { in: image_ids },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting property images:", error);
    return { success: false, error: "Failed to delete property images" };
  }
}

export default deletePropertyImages;
