import React from "react";
import AllImages from "../components/admin-components/post-all-images/allImages";
import PropertyImageForm from "../components/admin-components/post-property-images/postPropertyImages";
import {
  fetchCliffViewImages,
  fetchPropertyImages,
  fetchUnitImages,
} from "@/scripts/fetchPropertyImages";
import UnitImagesForm from "../components/admin-components/post-unit-images/PostUnitImages";
import DeletePropertyImages from "../components/admin-components/delete-property-images/DeletePropertyImages";
import UpdateImagesForm from "../components/admin-components/update-property-images/UpdatePropertyImages";
import UpdateUnitImagesForm from "../components/admin-components/update-property-images/UpdateUnitImages";

export default async function Page() {
  const propertyId ="f7131619-5e74-457b-8924-9b03c340f0fd";
  const unitId = "494be685-1a34-4aca-91be-ddd1e2a4d1b7";
  const cliffImages = await fetchCliffViewImages();
  const propertyImages = await fetchPropertyImages(propertyId);
  const unitImages = await fetchUnitImages(unitId);
  
  return (
    <div>
      {/* <AllImages /> */}
      {/* <PropertyImageForm cliffImages={cliffImages} /> */}
      {/* <UnitImagesForm images={cliffImages} /> */}
      {/* <UpdateImagesForm propertyId={propertyId} propertyImages={propertyImages} /> */}
      {/* <UpdateUnitImagesForm unitImages={unitImages} /> */}
      {/* <DeletePropertyImages propertyId="1cf56e86-e0ce-424c-81dd-301e29b3d624" /> */}
    </div>
  );
}
