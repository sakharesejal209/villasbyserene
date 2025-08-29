-- CreateTable
CREATE TABLE "public"."Theme" (
    "theme_id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("theme_id")
);

-- CreateTable
CREATE TABLE "public"."PropertyTheme" (
    "property_id" UUID NOT NULL,
    "theme_id" UUID NOT NULL,

    CONSTRAINT "PropertyTheme_pkey" PRIMARY KEY ("property_id","theme_id")
);

-- AddForeignKey
ALTER TABLE "public"."PropertyTheme" ADD CONSTRAINT "PropertyTheme_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyTheme" ADD CONSTRAINT "PropertyTheme_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "public"."Theme"("theme_id") ON DELETE RESTRICT ON UPDATE CASCADE;
