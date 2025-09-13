import * as React from "react";
import { PrismaClient } from "../../../../generated/prisma";
import Property from "@/app/components/property/Property";

type ParamsType = {
  params: { slugAndId: string };
};

const prisma = new PrismaClient();

export default async function Page({ params }: ParamsType) {
  const slugAndId = params.slugAndId;

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

  console.log("property:", property);

  if (!property) return <div>Property not found</div>;

  return <Property propertyDetails={property} />;
}
