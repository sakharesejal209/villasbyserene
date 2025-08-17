-- CreateEnum
CREATE TYPE "public"."AccommodationType" AS ENUM ('ENTIRE_HOME', 'SEPARATE_ROOMS', 'ENTIRE_HOME_AND_SEPARATE_ROOMS');

-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "accommodationType" "public"."AccommodationType" NOT NULL DEFAULT 'ENTIRE_HOME';
