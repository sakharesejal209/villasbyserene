"use client";

import { createManyPropertyImages } from "@/scripts/createPropertyImages";
import { useState } from "react";

type ImageType = {
  image_id: string;
  image_url: string;
  image_alt: string | null;
};

export default function PropertyImageForm({
  cliffImages,
}: {
  cliffImages: ImageType[];
}) {
  const [images, setImages] = useState<
    {
      image_id: string;
      property_id: string;
      display_order: number;
      is_banner_image: string | null;
      is_carousel_image: string | null;
    }[]
  >([]);

  const handleSelect = (img: ImageType) => {
    setImages((prev) => {
      const exists = prev.find((i) => i.image_id === img.image_id);
      if (exists) return prev.filter((i) => i.image_id !== img.image_id);
      return [
        ...prev,
        {
          image_id: img.image_id,
          property_id: "",
          display_order: 0,
          is_banner_image: null,
          is_carousel_image: null,
        },
      ];
    });
  };

  const handleChange = (
    id: string,
    field: keyof Omit<(typeof images)[0], "image_id">,
    value: string | number | null
  ) => {
    setImages((prev) =>
      prev.map((i) => (i.image_id === id ? { ...i, [field]: value } : i))
    );
  };

  const handleSubmit = async () => {
    console.log('iages', images);
    
    const res = await createManyPropertyImages(images);
    if (res.success) {
      alert("Property images created!");
    } else {
      alert(res.message || "Error saving property images");
    }
  };

  return (
    <div className="mt-[50px]">
      <h2 className="text-xl font-semibold">property Images</h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {cliffImages.map((img) => {
          const selected = images.find((i) => i.image_id === img.image_id);
          return (
            <div
              key={img.image_id}
              className={`border p-2 rounded cursor-pointer ${
                selected ? "ring-4 ring-blue-500" : ""
              }`}
              onClick={() => handleSelect(img)}
            >
              <img
                src={img.image_url}
                alt={img.image_alt || ""}
                className="rounded mb-2"
              />

              {selected && (
                <div
                  className="space-y-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="text"
                    placeholder="Property ID"
                    value={selected.property_id}
                    onChange={(e) =>
                      handleChange(img.image_id, "property_id", e.target.value)
                    }
                    name={img.image_id}
                    className="border p-1 rounded w-full"
                  />
                  <input
                    type="number"
                    placeholder="Display Order"
                    value={selected.display_order}
                    onChange={(e) =>
                      handleChange(
                        img.image_id,
                        "display_order",
                        Number(e.target.value)
                      )
                    }
                    className="border p-1 rounded w-full"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!selected.is_banner_image}
                      onChange={(e) =>
                        handleChange(
                          img.image_id,
                          "is_banner_image",
                          e.target.checked ? "true" : null
                        )
                      }
                    />
                    Banner Image
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!selected.is_carousel_image}
                      onChange={(e) =>
                        handleChange(
                          img.image_id,
                          "is_carousel_image",
                          e.target.checked ? "true" : null
                        )
                      }
                    />
                    Carousel Image
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Save Property Images
      </button>
    </div>
  );
}
