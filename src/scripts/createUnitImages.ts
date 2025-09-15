// app/actions/unitImages.ts

"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function createManyUnitImages(data: {
  image_id: string;
  unit_id: string;
  display_order: number;
  is_banner_image: string | null;
}[]) {
  try {
    const formattedData = data.map((item) => ({
      image_id: item.image_id,
      unit_id: item.unit_id,
      display_order: Number(item.display_order) || 0,
      is_banner_image: item.is_banner_image === "true" ? "true" : null,
    }));

    await prisma.unitImage.createMany({
      data: formattedData,
      skipDuplicates: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating unit images:", error);
    return { success: false, error: "Failed to create unit images" };
  }
}
