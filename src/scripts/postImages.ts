// import { PrismaClient } from "../../generated/prisma";

// const prisma = new PrismaClient();

// export async function uploadAllImages(
//   images: {
//     image_url: string;
//     image_category: number;
//     image_alt: string;
//   }[]
// ) {
//   console.log('images insode func:', images);
  
//   await prisma.image.createMany({
//     data: images.map((item) => ({
//       image_url: item.image_url,
//       image_category: item.image_category,
//       image_alt: item.image_alt,
//     })),
//   });
// }



"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

type ImageInput = {
  image_url: string;
  image_alt: string;
  image_category_id: number;
};

export async function createManyImages(images: ImageInput[]) {
  if (!images || images.length === 0) return { success: false, message: "No images provided" };

  try {
    await prisma.image.createMany({
      data: images,
      skipDuplicates: true, // optional: avoids duplicate inserts
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating images:", error);
    return { success: false, message: "Failed to create images" };
  }
}
