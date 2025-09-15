import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();

  const newImage = await prisma.image.createMany({
    data: body.map((item: any) => ({
      image_url: item.image_url,
      image_category: item.image_category,
      image_alt: item.image_alt,
    })),
  });

  return NextResponse.json(newImage);
}
