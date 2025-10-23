"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

type UpdateUnitImageInput = {
  unit_id: string;
  image_id: string;
  display_order: number;
  is_banner_image: string | null;
  image_alt?: string;
};

export async function updateUnitImages(
  updates: UpdateUnitImageInput[]
) {
  try {
    for (const u of updates) {
      // Update UnitImage fields
      await prisma.unitImage.update({
        where: {
          image_id_unit_id: {
            image_id: u.image_id,
            unit_id: u.unit_id, // ✅ composite key
          },
        },
        data: {
          display_order: u.display_order,
          is_banner_image: u.is_banner_image,
        },
      });

      // Update Image alt text separately
      if (u.image_alt !== undefined) {
        await prisma.image.update({
          where: { image_id: u.image_id },
          data: { image_alt: u.image_alt },
        });
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Error updating unit images:", err);
  }
}
