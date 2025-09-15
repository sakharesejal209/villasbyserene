import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body: {
  image_url: string;
  image_alt: string;
  image_category_id: number;
}[] = await req.json();

  const newImage = await prisma.image.createMany({
    data: body.map((item) => ({
      image_url: item.image_url,
      image_category: item.image_category_id,
      image_alt: item.image_alt,
    })),
  });

  return NextResponse.json(newImage);
}
