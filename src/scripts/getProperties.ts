import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function fetchAllData() {
  return prisma.property.findMany({
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
      PropertyAmenity: {
        include: {
          amenity: {
            omit: {
              amenity_id: true,
            },
          },
        },
      },
      FoodMenu: true,
      NearByAttractions: true,
      propertyRules: {
        include: {
          houseRule: {
            omit: {
              rule_id: true,
            },
          },
        },
      },
      themes: {
        include: {
          theme: true,
        },
      },
    },
  });
}
