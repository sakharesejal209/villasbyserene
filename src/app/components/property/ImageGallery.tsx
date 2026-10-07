import { FC, useState } from "react";
import { Masonry } from "@mui/lab";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { IoClose as CloseIcon } from "react-icons/io5";

import { Carousel } from "@/application/default";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

type ImageGalleryPropType = {
  images:
    | {
        src: string;
        alt: string;
      }[]
    | {
        src: string;
        alt: string;
        category: string;
      }[];
};

const ImageGallery: FC<ImageGalleryPropType> = (props) => {
  const { images } = props;
  const [open, setOpen] = useState(false);
  const [fits, setFits] = useState<Record<number, "fill" | "contain">>({});
  const [startIndex, setStartIndex] = useState(0);

  const handleOpen = (index: number) => {
    setStartIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageLoad = (idx: number, img: HTMLImageElement) => {
    const ratio = img.naturalWidth / img.naturalHeight;
    setFits((prev) => ({
      ...prev,
      [idx]: ratio < 1 ? "contain" : "fill",
    }));
  };

  return (
    <div className="flex justify-center overflow-hidden">
      <Masonry
        sx={{ width: "100%", height: "110%" }}
        columns={{ xs: 1, md: 1 }}
        spacing={{ xs: 1, md: 1 }}
      >
        {images.map((item, index) => (
          <button
            key={index}
            onClick={() => handleOpen(index)}
            className="relative aspect-video overflow-hidden"
          >
            <Image
              src={item.src}
              alt={item.alt}
              className={`cursor-pointer`}
              fill
              style={{
                objectFit: fits?.[index],
                objectPosition: "top center",
              }}
            />
          </button>
        ))}
      </Masonry>

      <Dialog
        open={open}
        onClose={handleClose}
        
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "black",
              boxShadow: "none",
              borderRadius: 0,
              padding: 0,
              maxWidth: '992px',
              height: 'auto'
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
            top: 0,
            right: 0,
            color: "white",
            zIndex: 1000,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            width: "100%",
            height: "100%",
            padding: "0",
            paddingRight: "0px",
            overflow: "hidden",
          }}
        >
          <Carousel
            slidesPerView={1}
            initialSlide={startIndex}
            showDots={false}
            variant="light"
          >
            {images.map((e, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={e.src}
                    alt={e.alt}
                    fill
                    // style={{
                    //   objectFit: fits?.[idx] || "contain",
                    //   objectPosition: "top center",
                    // }}
                    onLoadingComplete={(img) => handleImageLoad(idx, img)}
                    priority={idx === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
