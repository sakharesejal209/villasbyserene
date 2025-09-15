"use client";

import { createManyUnitImages } from "@/scripts/createUnitImages";
import { useState } from "react";

type Image = {
  image_id: string;
  image_url: string;
  image_alt: string | null;
};

type UnitImageInput = {
  image_id: string;
  unit_id: string;
  display_order: number;
  is_banner_image: string | null;
};

type Props = {
  images: Image[];
};

export default function UnitImagesForm({ images }: Props) {
  const [selectedImages, setSelectedImages] = useState<UnitImageInput[]>([]);

  const handleSelect = (img: Image) => {
    setSelectedImages((prev) => {
      const exists = prev.find((i) => i.image_id === img.image_id);
      if (exists) {
        return prev.filter((i) => i.image_id !== img.image_id);
      }
      return [
        ...prev,
        {
          image_id: img.image_id,
          unit_id: "",
          display_order: 0,
          is_banner_image: "",
        },
      ];
    });
  };

  const handleChange = (
    image_id: string,
    field: keyof UnitImageInput,
    value: string | number | null
  ) => {
    setSelectedImages((prev) =>
      prev.map((item) =>
        item.image_id === image_id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async () => {
    if (selectedImages.length === 0) return;

    const res = await createManyUnitImages(selectedImages);

    if (res.success) {
      alert("Unit images saved!");
      setSelectedImages([]);
    } else {
      alert(res.error || "Failed to save");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Assign Images to Units</h2>

      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => {
          const selected = selectedImages.find(
            (i) => i.image_id === img.image_id
          );

          return (
            <div
              key={img.image_id}
              className={`border rounded p-2 ${
                selected ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <img
                src={img.image_url}
                alt={img.image_alt || ''}
                className="rounded mb-2 cursor-pointer"
                onClick={() => handleSelect(img)}
              />

              {selected && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Unit ID"
                    value={selected.unit_id}
                    onChange={(e) =>
                      handleChange(img.image_id, "unit_id", e.target.value)
                    }
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

                  {/* <select
                    value={selected.is_banner_image}
                    onChange={(e) =>
                      handleChange(img.image_id, "is_banner_image", e.target.value)
                    }
                    className="border p-1 rounded w-full"
                  >
                    <option value={null}>-- Banner? --</option>
                    <option value="true">Yes</option>
                  </select> */}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedImages.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Unit Images
        </button>
      )}
    </div>
  );
}
