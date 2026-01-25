import * as React from "react";
import { PrismaClient } from "../../../../generated/prisma";
import Property from "@/app/components/property/Property";
import { Metadata } from "next";

const prisma = new PrismaClient();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: location } = await params;

  if (!location) {
    return {
      title: "Villas near me | Villas by Serene",
      description: "Near by villas found.",
    };
  }

  return {
    title: `Villa in ${location} | Private Villa in ${location} | Private Pool Villa in ${location} | Villas by Serene`,
    description: `Book a villa, a luxury stay in ${location}.`,
    openGraph: {
      title: `Private ${location} villa | Luxury Villa Stay`,
      description: `Priavte pool ${location} villa`,
    },
  };
}

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

  if (!property) return <div>Property not found</div>;

  return <Property propertyDetails={property} />;
}
