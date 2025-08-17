"use client";

import { PropertyDTO } from "@/app/@types/propertyDTO";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { FC, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Masonry } from "@mui/lab";
import ImageGallery from "./ImageGallery";

type PropertyPropType = {
  propertyDetails: PropertyDTO;
};

type CustomSectionProps = {
  background: string;
};

const Customsection = styled("section")<CustomSectionProps>(
  ({ background }) => ({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    width: "100vw",
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    "@media (min-width:768px)": {
      height: "75vh",
    },
  })
);

const Property: FC<PropertyPropType> = (props) => {
  const { propertyDetails } = props;

  const [openGallery, setOpenGallery] = useState<boolean>(false);

  const handleOpenGallery = () => {
    setOpenGallery(true);
  };

  console.log("propertydetails:", propertyDetails);

  return (
    <div>
      <Customsection
        background={
          propertyDetails.PropertyImage.filter(
            (e) => e.is_banner_image === "true"
          )[0].image.image_url
        }
      >
        <div className="container p-4 md:p-0">
          <div className="text-white">
            <Typography variant="h3">{propertyDetails.name}</Typography>
            <Typography className="mt-4" variant="h4">
              {propertyDetails.area}, {propertyDetails.state}
            </Typography>
          </div>
          <div className="flex h-full justify-end items-end">
            <button
              className={`hover:cursor-pointer z-50 text-white absolute top-[78%] md:top-[70%] right-[3%] px-4 py-5 md:px-8 md:py-10 font-bold bg-cover bg-center border-white border-[2px] border-solid rounded-md bg-black/50 bg-blend-overlay`}
              style={{
                backgroundImage: `url(${
                  propertyDetails.PropertyImage.find(
                    (e) => e.is_banner_image === "true"
                  )?.image.image_url
                })`,
              }}
              onClick={() => {
                setOpenGallery(true);
                console.log("clicked");
              }}
            >
              See all {propertyDetails.PropertyImage.length} images
            </button>
          </div>
        </div>
      </Customsection>

      <section>
        <div className="container">
          
        </div>
      </section>

      <Dialog
        open={openGallery}
        onClose={() => setOpenGallery(false)}
        fullScreen
        slotProps={{
          paper: {
            sx: {
              width: { xs: "90vw", sm: "90vw", md: "90vw" }, // custom responsive width
              maxHeight: "90vh", // scrollable area
              borderRadius: 1,
              backgroundImage: 'none'
            },
          },
        }}
      >
        <DialogTitle
        sx={{
          paddingY: '8px',
          paddingX: '12px'
        }}
        className="flex justify-between items-center">
          Photos
          <IconButton
            edge="start"
            onClick={() => setOpenGallery(false)}
            aria-label="close"
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            width: '100%',
            padding: '12px',
            paddingRight: "0px",
          }}
        >
          <ImageGallery
            images={propertyDetails.PropertyImage.map((e) => ({
              src: e.image.image_url,
              alt: e.image.image_alt,
            }))}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Property;
