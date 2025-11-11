import * as React from "react";
import { PrismaClient } from "../../../../generated/prisma";
import Property from "@/app/components/property/Property";
import { propertiesService } from "@/app/@services";

const prisma = new PrismaClient();

export default async function Page({
  params,
}: {
  params: Promise<{ slugAndId: string }>;
}) {
  const { slugAndId } = await params;

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

  const uniqueProperty = await propertiesService.fetchPropertyDetails(id);

  if (!property) return <div>Property not found</div>;

  return <Property propertyDetails={property} />;
}
