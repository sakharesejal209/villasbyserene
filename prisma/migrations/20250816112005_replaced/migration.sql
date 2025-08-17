/*
  Warnings:

  - You are about to drop the `UnitRule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UnitRule" DROP CONSTRAINT "UnitRule_rule_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UnitRule" DROP CONSTRAINT "UnitRule_unit_id_fkey";

-- DropTable
DROP TABLE "public"."UnitRule";

-- CreateTable
CREATE TABLE "public"."PropertyRule" (
    "property_id" UUID NOT NULL,
    "rule_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PropertyRule_pkey" PRIMARY KEY ("property_id","rule_id")
);

-- AddForeignKey
ALTER TABLE "public"."PropertyRule" ADD CONSTRAINT "PropertyRule_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyRule" ADD CONSTRAINT "PropertyRule_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "public"."HouseRule"("rule_id") ON DELETE RESTRICT ON UPDATE CASCADE;
