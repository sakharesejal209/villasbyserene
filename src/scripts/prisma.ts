import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

async function fetchAllData() {
  const allProperties = await prisma.property.findMany({
    include: {
      Unit: {
        include: {
          unitAmenities: {
            include: { amenity: true },
          },
          unitRules: {
            include: { houseRule: true },
          },
          unitImages: true,
        },
      },
      PropertyImage: true,
    },
  });

  console.dir(allProperties, { depth: null });
}

fetchAllData()
  .catch((e) => {
    console.error('❌ Error fetching data:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
