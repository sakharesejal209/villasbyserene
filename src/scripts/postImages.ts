import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function uploadAllImages(
  images: {
    image_url: string;
    image_category: number;
    image_alt: string;
  }[]
) {
  console.log('images insode func:', images);
  
  await prisma.image.createMany({
    data: images.map((item) => ({
      image_url: item.image_url,
      image_category: item.image_category,
      image_alt: item.image_alt,
    })),
  });
}
