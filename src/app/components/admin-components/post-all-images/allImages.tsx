// "use client";

// import { createManyImages } from "@/scripts/postImages";
// import { Button, TextField } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { fetchFirebaseImages } from "./fetchFromFirebase";
// import Image from "next/image";

// export type ImagesType = {
//   image_url: string;
//   image_alt: string;
//   image_category_id: number;
// };

// const AllImages = () => {
//   const logout = async () => {
//     await fetch("/api/logout");
//     window.location.href = "/login";
//   };

//   const [firebaseImages, setFirebaseImages] = useState<
//     ({ url: string; name: string } | null)[]
//   >([]);

//   useEffect(() => {
//     const loadImages = async () => {
//       try {
//         const imgs: ({
//           url: string;
//           name: string;
//         } | null)[] = await fetchFirebaseImages();
//         setFirebaseImages(imgs);
//       } catch (err) {
//         console.error("Error fetching firebase images:", err);
//       } finally {
//         console.log("done");
//       }
//     };

//     loadImages();
//   }, []);

//   const [images, setImages] = useState<ImagesType[]>([
//     {
//       image_url: "",
//       image_alt: "",
//       image_category_id: 0,
//     },
//   ]);

//   useEffect(() => {
//     const temp: ImagesType[] = firebaseImages.map((item) => ({
//       image_url: item != null ? item.url : "",
//       image_alt: "",
//       image_category_id: 0,
//     }));
//     setImages(temp);
//   }, [firebaseImages]);

//   const handleSubmit = async () => {
//     const res = await createManyImages(images);
//     if (res.success) {
//       alert("Images saved!");
//     } else {
//       alert(res.message || "Error saving images");
//     }
//   };

//   const handleChange = (
//     img: string,
//     field: "image_alt" | "image_category_id",
//     value: string | number
//   ) => {
//     setImages((prev) =>
//       prev.map((i) => (i.image_url === img ? { ...i, [field]: value } : i))
//     );
//   };

//   return (
//     <div>
//       <Button onClick={() => logout()} className="text-sm underline">
//         Logout
//       </Button>

//       <div>
//         <div className="grid grid-cols-3 gap-3 my-4">
//           {firebaseImages.map((img, index) => (
//             <div key={img?.url} className="border rounded p-2">
//               <Image
//                 width={200}
//                 height={170}
//                 src={img?.url || ""}
//                 alt=""
//                 className="rounded mb-2"
//               />

//               <div className="space-y-2">
//                 <TextField
//                   type="text"
//                   placeholder="Alt text"
//                   onChange={(e) =>
//                     handleChange(img?.url || "", "image_alt", e.target.value)
//                   }
//                   className="border p-1 rounded w-full"
//                 />
//                 <TextField
//                   type="number"
//                   placeholder="Category ID"
//                   onChange={(e) =>
//                     handleChange(
//                       img?.url || "",
//                       "image_category_id",
//                       Number(e.target.value)
//                     )
//                   }
//                   className="border p-1 rounded w-full"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//         <Button onClick={handleSubmit}>Submit</Button>
//       </div>

//       {/* {send && <UploadFuncCom images={images} />} */}
//     </div>
//   );
// };

// export default AllImages;

"use client";

import { createManyImages } from "@/scripts/postImages";
import { Button, Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchFirebaseImages } from "./fetchFromFirebase";
import Image from "next/image";

export type ImagesType = {
  image_url: string;
  image_alt: string;
  image_category_id: number;
  selected?: boolean; // ✅ new field
};

const AllImages = () => {
  const logout = async () => {
    await fetch("/api/logout");
    window.location.href = "/login";
  };

  const [firebaseImages, setFirebaseImages] = useState<
    ({ url: string; name: string } | null)[]
  >([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imgs: ({
          url: string;
          name: string;
        } | null)[] = await fetchFirebaseImages();
        setFirebaseImages(imgs);
      } catch (err) {
        console.error("Error fetching firebase images:", err);
      } finally {
        console.log("done");
      }
    };

    loadImages();
  }, []);

  const [images, setImages] = useState<ImagesType[]>([]);

  useEffect(() => {
    const temp: ImagesType[] = firebaseImages.map((item) => ({
      image_url: item?.url || "",
      image_alt: "",
      image_category_id: 0,
      selected: false,
    }));
    setImages(temp);
  }, [firebaseImages]);

  const handleChange = (
    img: string,
    field: keyof ImagesType,
    value: string | number | boolean
  ) => {
    setImages((prev) =>
      prev.map((i) => (i.image_url === img ? { ...i, [field]: value } : i))
    );
  };

  const handleSubmit = async () => {
    const selectedImages = images.filter((i) => i.selected);
    if (selectedImages.length === 0) {
      alert("Please select at least one image to submit.");
      return;
    }

    const data = selectedImages.map((item) => ({
      image_url: item.image_url,
      image_alt: item.image_alt,
      image_category_id: item.image_category_id,
    }));
    const res = await createManyImages(data);
    console.log("selectedImages:", data);

    if (res.success) {
      alert("Selected images saved!");
    } else {
      alert(res.message || "Error saving selected images");
    }
  };

  return (
    <div>
      <Button onClick={() => logout()} className="text-sm underline">
        Logout
      </Button>

      <div>
        <div className="grid grid-cols-3 gap-3 my-4">
          {images.map((img, index) => (
            <div key={img.image_url} className="border rounded p-2">
              <div className="flex items-center justify-between mb-2">
                <Checkbox
                  checked={img.selected || false}
                  onChange={(e) =>
                    handleChange(img.image_url, "selected", e.target.checked)
                  }
                />
                <span className="text-xs text-gray-600">{index + 1}</span>
              </div>

              <Image
                width={200}
                height={170}
                src={img.image_url || ""}
                alt=""
                className="rounded mb-2"
              />

              <div className="space-y-2">
                <TextField
                  type="text"
                  placeholder="Alt text"
                  value={img.image_alt}
                  onChange={(e) =>
                    handleChange(img.image_url, "image_alt", e.target.value)
                  }
                  className="border p-1 rounded w-full"
                />
                <TextField
                  type="number"
                  placeholder="Category ID"
                  value={img.image_category_id || ""}
                  onChange={(e) =>
                    handleChange(
                      img.image_url,
                      "image_category_id",
                      Number(e.target.value)
                    )
                  }
                  className="border p-1 rounded w-full"
                />
              </div>
            </div>
          ))}
        </div>

        <Button variant="contained" onClick={handleSubmit}>
          Submit Selected
        </Button>
      </div>
    </div>
  );
};

export default AllImages;
