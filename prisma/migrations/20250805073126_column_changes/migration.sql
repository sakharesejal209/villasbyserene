-- CreateEnum
CREATE TYPE "public"."UnityType" AS ENUM ('VILLA', 'CHALET', 'COTTAGE', 'ROOM', 'APARTMENT');

-- CreateTable
CREATE TABLE "public"."Property" (
    "property_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "map_location" TEXT,
    "address" TEXT,
    "area" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "checkin_time" TEXT NOT NULL,
    "checkout_time" TEXT NOT NULL,
    "maxcapacity" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "public"."Unit" (
    "unit_id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "unit_type" "public"."UnityType" NOT NULL DEFAULT 'VILLA',
    "title" TEXT,
    "description" TEXT,
    "no_of_bedrooms" INTEGER,
    "max_capacity" INTEGER,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("unit_id")
);

-- CreateTable
CREATE TABLE "public"."HouseRule" (
    "rule_id" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "HouseRule_pkey" PRIMARY KEY ("rule_id")
);

-- CreateTable
CREATE TABLE "public"."UnitRule" (
    "unit_id" UUID NOT NULL,
    "rule_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UnitRule_pkey" PRIMARY KEY ("unit_id","rule_id")
);

-- CreateTable
CREATE TABLE "public"."Amenity" (
    "amenity_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("amenity_id")
);

-- CreateTable
CREATE TABLE "public"."UnitAmenity" (
    "unit_id" UUID NOT NULL,
    "amenity_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UnitAmenity_pkey" PRIMARY KEY ("unit_id","amenity_id")
);

-- CreateTable
CREATE TABLE "public"."ImageCategory" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ImageCategory_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "public"."Image" (
    "image_id" UUID NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_category_id" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "public"."PropertyImage" (
    "image_id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_banner_image" TEXT,

    CONSTRAINT "PropertyImage_pkey" PRIMARY KEY ("image_id","property_id")
);

-- CreateTable
CREATE TABLE "public"."UnitImage" (
    "image_id" UUID NOT NULL,
    "unit_id" UUID NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_banner_image" TEXT,

    CONSTRAINT "UnitImage_pkey" PRIMARY KEY ("image_id","unit_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnitAmenity_amenity_id_key" ON "public"."UnitAmenity"("amenity_id");

-- CreateIndex
CREATE UNIQUE INDEX "ImageCategory_name_key" ON "public"."ImageCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_image_url_key" ON "public"."Image"("image_url");

-- AddForeignKey
ALTER TABLE "public"."Unit" ADD CONSTRAINT "Unit_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UnitRule" ADD CONSTRAINT "UnitRule_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."Unit"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UnitRule" ADD CONSTRAINT "UnitRule_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "public"."HouseRule"("rule_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UnitAmenity" ADD CONSTRAINT "UnitAmenity_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."Unit"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UnitAmenity" ADD CONSTRAINT "UnitAmenity_amenity_id_fkey" FOREIGN KEY ("amenity_id") REFERENCES "public"."Amenity"("amenity_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_image_category_id_fkey" FOREIGN KEY ("image_category_id") REFERENCES "public"."ImageCategory"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyImage" ADD CONSTRAINT "PropertyImage_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyImage" ADD CONSTRAINT "PropertyImage_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."Image"("image_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UnitImage" ADD CONSTRAINT "UnitImage_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."Unit"("unit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UnitImage" ADD CONSTRAINT "UnitImage_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."Image"("image_id") ON DELETE RESTRICT ON UPDATE CASCADE;
