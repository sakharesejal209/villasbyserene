"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function fetchAssignedPropertyImages(id: string) {
  return prisma.property.findUnique({
    where: { property_id: id },
    include: {
      Unit: {
        include: {
          unitImages: {
            include: {
              image: {
                include: {
                  imageCategory: true,
                },
              },
            },
          },
        },
      },
      PropertyImage: {
        include: {
          image: {
            include: {
              imageCategory: true,
            },
          },
        },
      },
    },
  });
}
