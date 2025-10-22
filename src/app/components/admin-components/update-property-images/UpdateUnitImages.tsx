"use client";

import { useState } from "react";
import { updateUnitImages } from "@/scripts/updateUnitImages";
import { UnitDTO } from "@/app/@types/unit-dto";
import { Typography } from "@mui/material";

type UnitImageType = {
  image_id: string;
  unit_id: string;
  display_order: number;
  is_banner_image: string | null;
  image: {
    image_url: string;
    image_alt: string | null;
  } | null;
};

export default function UpdateUnitImagesForm({
  unitId,
  unitImages,
}: Readonly<{
  unitId: string;
  unitImages: UnitDTO;
}>) {
  const [images, setImages] = useState(unitImages.unitImages);

  console.log("insider unitImages:", unitImages);

  const handleChange = (
    imageId: string,
    field: keyof UnitImageType,
    value: string | number | null
  ) => {
    setImages((prev) =>
      prev.map((img) =>
        img.image_id === imageId ? { ...img, [field]: value } : img
      )
    );
  };

  const handleAltChange = (imageId: string, value: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.image_id === imageId && img.image
          ? { ...img, image: { ...img.image, image_alt: value } }
          : img
      )
    );
  };

  const handleSubmit = async () => {
    const updates = images.map((img) => ({
      unit_id: img.unit_id,
      image_id: img.image_id,
      display_order: img.display_order,
      is_banner_image: img.is_banner_image,
      image_alt: img.image?.image_alt || "",
    }));

    const res = await updateUnitImages(updates);

    if (res.success) {
      alert("Unit images updated successfully!");
    } else {
      alert(res.error || "Failed to update images");
    }
  };

  return (
    <section>
      <Typography className="!my-4" variant="h5">
        Unit images
      </Typography>
      <div className="grid grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.image_id} className="border rounded p-3">
            {img.image && (
              <img
                src={img.image.image_url}
                alt={img.image.image_alt || ""}
                className="rounded mb-2"
              />
            )}

            <input
              type="number"
              value={img.display_order}
              onChange={(e) =>
                handleChange(
                  img.image_id,
                  "display_order",
                  Number(e.target.value)
                )
              }
              className="border p-1 rounded w-full mb-2"
            />

            <label className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={img.is_banner_image === "true"}
                onChange={(e) =>
                  handleChange(
                    img.image_id,
                    "is_banner_image",
                    e.target.checked ? "true" : null
                  )
                }
              />
              Banner
            </label>

            <input
              type="text"
              value={img.image?.image_alt || ""}
              onChange={(e) => handleAltChange(img.image_id, e.target.value)}
              placeholder="Alt text"
              className="border p-1 rounded w-full"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update unit images
      </button>
    </section>
  );
}
