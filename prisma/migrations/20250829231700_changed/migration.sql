/*
  Warnings:

  - The primary key for the `PropertyTheme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Theme` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."PropertyTheme" DROP CONSTRAINT "PropertyTheme_theme_id_fkey";

-- AlterTable
ALTER TABLE "public"."PropertyTheme" DROP CONSTRAINT "PropertyTheme_pkey",
ALTER COLUMN "theme_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PropertyTheme_pkey" PRIMARY KEY ("property_id", "theme_id");

-- AlterTable
ALTER TABLE "public"."Theme" DROP CONSTRAINT "Theme_pkey",
ALTER COLUMN "theme_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Theme_pkey" PRIMARY KEY ("theme_id");

-- AddForeignKey
ALTER TABLE "public"."PropertyTheme" ADD CONSTRAINT "PropertyTheme_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "public"."Theme"("theme_id") ON DELETE RESTRICT ON UPDATE CASCADE;
