"use client";

import { useState } from "react";
import { updatePropertyImages } from "@/scripts/updatePropertyImages";
import { PropertyImageDTO } from "@/app/@types/property-image-dto";
import { Typography } from "@mui/material";


export default function UpdatePropertyImagesForm({
  propertyId,
  propertyImages,
}: Readonly<{
  propertyId: string;
  propertyImages: PropertyImageDTO[];
}>) {
  const [images, setImages] = useState(propertyImages);

  const handleChange = (
    imageId: string,
    field: keyof PropertyImageDTO,
    value: string | number | null
  ) => {
    setImages((prev) =>
      prev.map((img) =>
        img.image_id === imageId ? { ...img, [field]: value } : img
      )
    );
  };

  const handleSubmit = async () => {
    const updates = images.map((img: PropertyImageDTO) => ({
      image_id: img.image_id,
      display_order: img.display_order,
      is_banner_image: img.is_banner_image,
      is_carousel_image: img.is_carousel_image,
    }));

    const res = await updatePropertyImages(propertyId, updates);
    if (res?.success) {
      alert("Images updated successfully!");
    } else {
      alert("Failed to update");
    }
  };

  return (
    <section>
      <Typography className="!my-4" variant="h5">Property images</Typography>
      <div className="grid grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.image_id} className="border rounded p-3">
            <img
              src={img.image?.image_url || ""}
              alt={img.image?.image_alt || ""}
            />

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

            <label className="flex items-center gap-2">
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

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={img.is_carousel_image === "true"}
                onChange={(e) =>
                  handleChange(
                    img.image_id,
                    "is_carousel_image",
                    e.target.checked ? "true" : null
                  )
                }
              />
              Carousel
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update property images
      </button>
    </section>
  );
}
