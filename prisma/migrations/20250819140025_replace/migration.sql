/*
  Warnings:

  - You are about to drop the column `locationUrl` on the `NearByAttractions` table. All the data in the column will be lost.
  - Added the required column `distance` to the `NearByAttractions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."NearByAttractions" DROP COLUMN "locationUrl",
ADD COLUMN     "distance" TEXT NOT NULL;
