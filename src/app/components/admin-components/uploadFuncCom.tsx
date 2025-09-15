import { uploadAllImages } from "@/scripts/postImages";
import React from "react";
import { ImagesType } from "./allImages";

type uploadImagesPropType = {
  images: ImagesType[];
};

const UploadFuncCom = (props: uploadImagesPropType) => {
  const { images } = props;

  uploadAllImages(images);

  return <div>UploadFuncCom</div>;
};

export default UploadFuncCom;
