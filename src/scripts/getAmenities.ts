import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function getAllAmenities() {
  const amenities = await prisma.amenity.findMany();
  return amenities;
}
