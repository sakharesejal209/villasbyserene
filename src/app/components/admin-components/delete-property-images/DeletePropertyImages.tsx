"use client";

import { PropertyImageDTO } from "@/app/@types/property-image-dto";
import { UnitDTO } from "@/app/@types/unit-dto";
import deletePropertyImages from "@/scripts/deletePropertyImages";
import { deleteUnitImages } from "@/scripts/deleteUnitImages";
import { fetchAssignedPropertyImages } from "@/scripts/fetchAssignedPropertyImages";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function DeletePropertyImages({
  propertyId,
}: Readonly<{
  propertyId: string;
}>) {
  const [propimages, setPropImages] = useState<PropertyImageDTO[]>([]);
  const [units, setUnits] = useState<UnitDTO[]>([]);
  const [selectedPropImages, setSelectedPropImages] = useState<string[]>([]);
  const [selectedUnitImages, setSelectedUnitImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const imgs = await fetchAssignedPropertyImages(propertyId);
      if (imgs) {
        setPropImages(imgs.PropertyImage);
        setUnits(imgs.Unit);
      }
    }
    fetchImages();
  }, [propertyId]);

  useEffect(() => {
    console.log("selectedUnitImages:", selectedUnitImages);
  }, [selectedUnitImages]);

  const handleDelete = async () => {
    await deletePropertyImages(propertyId, selectedPropImages);
    setPropImages((prev) =>
      prev.filter((img) => !selectedPropImages.includes(img.image_id))
    );
    setSelectedPropImages([]);
  };

  const handleDeleteUnitImages = async (unitId: string) => {
    await deleteUnitImages(unitId, selectedUnitImages);
    setUnits((prev) =>
      prev.map((unit) => ({
        ...unit,
        unitImages: unit.unitImages.filter(
          (item) => !selectedUnitImages.includes(item.image_id)
        ),
      }))
    );
    setSelectedPropImages([]);
  };

  useEffect(() => {
    console.log("selected:", selectedPropImages);
  }, [selectedPropImages]);

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Delete Propetry Images</h2>
        <div className="grid grid-cols-3 gap-4">
          {propimages.map((img) => (
            <div
              key={img.image_id}
              onClick={() =>
                setSelectedPropImages((prev) =>
                  prev.includes(img.image_id)
                    ? prev.filter((id) => id !== img.image_id)
                    : [...prev, img.image_id]
                )
              }
              className={`cursor-pointer border rounded-lg overflow-hidden ${
                selectedPropImages.includes(img.image_id)
                  ? "ring-4 ring-red-500"
                  : ""
              }`}
            >
              <img
                src={img.image?.image_url}
                alt={img.image?.image_alt || ""}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
        {selectedPropImages.length > 0 && (
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Selected ({selectedPropImages.length})
          </button>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Delete unit Images</h2>
        <div>
          {units.map((unit) => (
            <div key={unit.unit_id}>
              <Typography>{unit.unit_type}</Typography>
              <div className="grid grid-cols-4 gap-2">
                {unit.unitImages.map((unitimgs) => (
                  <div
                    key={unitimgs.image_id}
                    onClick={() =>
                      setSelectedUnitImages((prev) =>
                        prev.includes(unitimgs.image_id)
                          ? prev.filter((id) => id !== unitimgs.image_id)
                          : [...prev, unitimgs.image_id]
                      )
                    }
                    className={`cursor-pointer border rounded-lg overflow-hidden ${
                      selectedUnitImages.includes(unitimgs.image_id)
                        ? "ring-4 ring-red-500"
                        : ""
                    }`}
                  >
                    <img
                      src={unitimgs.image?.image_url}
                      alt={unitimgs.image?.image_url || ""}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
              {selectedUnitImages.length > 0 && (
                <button
                  onClick={() => handleDeleteUnitImages(unit.unit_id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete Selected ({selectedUnitImages.length})
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
