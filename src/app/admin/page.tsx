import React from "react";
import AllImages from "../components/admin-components/post-all-images/allImages";
import PropertyImageForm from "../components/admin-components/post-property-images/postPropertyImages";
import { fetchCliffViewImages } from "@/scripts/fetchPropertyImages";
import UnitImagesForm from "../components/admin-components/post-unit-images/PostUnitImages";

export default async function Page() {
  const cliffImages = await fetchCliffViewImages();  

  return (
    <div>
      <AllImages />
      <PropertyImageForm cliffImages={cliffImages} />
      <UnitImagesForm images={cliffImages} />
    </div>
  );
}
