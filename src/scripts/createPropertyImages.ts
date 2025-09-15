"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

type PropertyImageInput = {
  image_id: string;
  property_id: string;
  display_order: number;
  is_banner_image?: string | null;
  is_carousel_image?: string | null;
};

export async function createManyPropertyImages(data: PropertyImageInput[]) {
  if (!data.length) {
    return { success: false, message: "No images provided" };
  }

  try {
    await prisma.propertyImage.createMany({
      data,
      skipDuplicates: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating property images:", error);
    return { success: false, message: "Failed to create property images" };
  }
}
