import React from "react";
import AllImages from "../components/admin-components/post-all-images/allImages";
import PropertyImageForm from "../components/admin-components/post-property-images/postPropertyImages";
import { fetchCliffViewImages } from "@/scripts/fetchPropertyImages";
import UnitImagesForm from "../components/admin-components/post-unit-images/PostUnitImages";
import DeletePropertyImages from "../components/admin-components/delete-property-images/DeletePropertyImages";

export default async function Page() {
  const cliffImages = await fetchCliffViewImages();  

  return (
    <div>
      {/* <AllImages /> */}
      <PropertyImageForm cliffImages={cliffImages} />
      <UnitImagesForm images={cliffImages} />
      {/* <DeletePropertyImages propertyId="8c73c8ea-6cce-4cfa-8550-74ce566205b4" /> */}
    </div>
  );
}
