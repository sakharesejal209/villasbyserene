import { FC, useState } from "react";
import { Masonry } from "@mui/lab";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import { Carousel } from "@/app/@application";

type ImageGalleryPropType = {
  images: {
    src: string;
    alt: string;
  }[];
};

const ImageGallery: FC<ImageGalleryPropType> = (props) => {
  const { images } = props;

  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const handleOpen = (index: number) => {
    setStartIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Masonry columns={{ xs: 2, md: 3 }} spacing={1.5}>
        {images.map((item, index) => (
          <button key={index} onClick={() => handleOpen(index)}>
            <img
              src={item.src}
              alt={item.alt}
              className={`cursor-pointer rounded-lg object-cover w-full h-auto`}
            />
          </button>
        ))}
      </Masonry>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "black",
              boxShadow: "none",
              borderRadius: 1,
              padding: 0,
            },
          },
          backdrop: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.75)",
            },
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white",
            zIndex: 1000,
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <DialogContent
          sx={{
            width: "100%",
            padding: "0",
            paddingRight: "0px",
            overflow: "hidden",
          }}
        >
          <Carousel initialSlide={startIndex} images={images} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
