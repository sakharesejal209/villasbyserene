import * as React from "react";
import { PrismaClient } from "../../../../generated/prisma";
import Property from "@/app/components/property/Property";

const prisma = new PrismaClient();

export default async function Page({
  params,
}: {
  params: { slugAndId: string };
}) {
  const { slugAndId } = params;

  const id = slugAndId.slice(-36);
  const property = await prisma.property.findUnique({
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
      PropertyAmenity: {
        include: {
          amenity: {
            select: {
              name: true,
              propertyAmenities: true,
            },
          },
        },
      },
      FoodMenu: true,
      NearByAttractions: true,
      propertyRules: {
        include: {
          houseRule: {
            select: {
              propertyRules: true,
              description: true,
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

  console.log("property:", property);

  if (!property) return <div>Property not found</div>;

  return <Property propertyDetails={property} />;
}
