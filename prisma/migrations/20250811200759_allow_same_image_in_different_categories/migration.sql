/*
  Warnings:

  - A unique constraint covering the columns `[image_category_id,image_url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Image_image_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "Image_image_category_id_image_url_key" ON "public"."Image"("image_category_id", "image_url");
