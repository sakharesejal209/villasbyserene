-- CreateTable
CREATE TABLE "public"."NearByAttractions" (
    "attraction_id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "locationUrl" TEXT NOT NULL,

    CONSTRAINT "NearByAttractions_pkey" PRIMARY KEY ("attraction_id")
);

-- CreateTable
CREATE TABLE "public"."FoodMenu" (
    "menuId" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "isVeg" BOOLEAN NOT NULL,
    "isNonVeg" BOOLEAN NOT NULL,
    "menuUrl" TEXT NOT NULL,
    "breakfastTime" TEXT NOT NULL,
    "lunchTime" TEXT NOT NULL,
    "dinnerTime" TEXT NOT NULL,

    CONSTRAINT "FoodMenu_pkey" PRIMARY KEY ("menuId")
);

-- AddForeignKey
ALTER TABLE "public"."NearByAttractions" ADD CONSTRAINT "NearByAttractions_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodMenu" ADD CONSTRAINT "FoodMenu_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;
