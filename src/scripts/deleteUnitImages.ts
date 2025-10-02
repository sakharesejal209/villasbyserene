"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function deleteUnitImages(unit_id: string, image_ids: string[]) {
  try {
    await prisma.unitImage.deleteMany({
      where: {
        unit_id,
        image_id: { in: image_ids },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting unit images:", error);
    return { success: false, error: "Failed to delete unit images" };
  }
}
