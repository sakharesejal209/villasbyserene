/*
  Warnings:

  - Added the required column `highteaTime` to the `FoodMenu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."FoodMenu" ADD COLUMN     "highteaTime" TEXT NOT NULL;
