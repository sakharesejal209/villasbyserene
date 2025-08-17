/*
  Warnings:

  - You are about to drop the `UnitAmenity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UnitAmenity" DROP CONSTRAINT "UnitAmenity_amenity_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UnitAmenity" DROP CONSTRAINT "UnitAmenity_unit_id_fkey";

-- DropTable
DROP TABLE "public"."UnitAmenity";

-- CreateTable
CREATE TABLE "public"."PropertyAmenity" (
    "property_id" UUID NOT NULL,
    "amenity_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PropertyAmenity_pkey" PRIMARY KEY ("property_id","amenity_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyAmenity_amenity_id_key" ON "public"."PropertyAmenity"("amenity_id");

-- AddForeignKey
ALTER TABLE "public"."PropertyAmenity" ADD CONSTRAINT "PropertyAmenity_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyAmenity" ADD CONSTRAINT "PropertyAmenity_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "public"."Amenity"("amenity_id") ON DELETE RESTRICT ON UPDATE CASCADE;
