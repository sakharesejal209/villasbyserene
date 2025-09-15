"use client";

import { uploadAllImages } from "@/scripts/postImages";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import UploadFuncCom from "./uploadFuncCom";
import { fetchFirebaseImages } from "./fetchFromFirebase";
import Image from "next/image";

export type ImagesType = {
  image_url: string;
  image_alt: string;
  image_category: number;
};

type FirebaseImage = {
  url: string;
  name: string;
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

  const [images, setImages] = useState<ImagesType[]>([
    {
      image_url: "",
      image_alt: "",
      image_category: 0,
    },
  ]);
  const [send, setSend] = useState<boolean>(false);

  useEffect(() => {
    const temp: ImagesType[] = firebaseImages.map((item) => ({
      image_url: item != null ? item.url : "",
      image_alt: "",
      image_category: 0,
    }));
    setImages(temp);
  }, [firebaseImages]);

  const handleSubmit = () => {
    setSend(true);
    uploadAllImages(images);
    console.log("images:", images);
  };

  const handleChange = (
    img: string,
    field: "image_alt" | "image_category",
    value: string | number
  ) => {
    setImages((prev) =>
      prev.map((i) => (i.image_url === img ? { ...i, [field]: value } : i))
    );
  };

  return (
    <div>
      <Button onClick={() => logout()} className="text-sm underline">
        Logout
      </Button>

      <div>
        <div className="grid grid-cols-3 gap-3 my-4">
          {firebaseImages.map((img, index) => (
            <div key={img?.url} className="border rounded p-2">
              <Image
                width={200}
                height={170}
                src={img?.url || ""}
                alt=""
                className="rounded mb-2"
              />

              <div className="space-y-2">
                <TextField
                  type="text"
                  placeholder="Alt text"
                  // value={images[index].image_alt}
                  onChange={(e) =>
                    handleChange(img?.url || "", "image_alt", e.target.value)
                  }
                  className="border p-1 rounded w-full"
                />
                <TextField
                  type="number"
                  placeholder="Category ID"
                  // value={images[index].image_category}
                  onChange={(e) =>
                    handleChange(
                      img?.url || "",
                      "image_category",
                      Number(e.target.value)
                    )
                  }
                  className="border p-1 rounded w-full"
                />
              </div>
            </div>
          ))}
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>

      {send && <UploadFuncCom images={images} />}
    </div>
  );
};

export default AllImages;
