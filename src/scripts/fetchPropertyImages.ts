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

export async function fetchPropertyImages(propertyId: string) {
  return prisma.propertyImage.findMany({
    where: { property_id: propertyId },
    include: { image: true },
    orderBy: { display_order: "asc" },
  });
}

export async function fetchUnitImages(unitId: string) {
  return prisma.unit.findUnique({
    where: { unit_id: unitId },
    include: {
      unitImages: {
        orderBy: { display_order: "asc" },
        include: {
          image: true,
        },
      },
    },
  });
}
