"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function fetchCliffViewImages() {
  return prisma.image.findMany({
    where: {
      image_alt: {
        startsWith: "sparsh-villa-",
      },
    },
    select: {
      image_id: true,
      image_url: true,
      image_alt: true,
    },
  });
}
