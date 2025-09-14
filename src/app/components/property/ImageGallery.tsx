import { FC, useState } from "react";
import { Masonry } from "@mui/lab";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Carousel } from "@/app/@application";
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
    <div>
      <Masonry
        columns={{ xs: 2, md: 3 }}
        spacing={{ xs: 0.5, md: 1.5}}
      >
        {images.map((item, index) => (
          <button
            key={index}
            onClick={() => handleOpen(index)}
            className="relative"
          >
            <img
              src={item.src}
              alt={item.alt}
              className={`cursor-pointer object-cover w-full h-auto`}
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
              borderRadius: 0,
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
          <Carousel
            slidesPerView={1}
            initialSlide={startIndex}
            showDots={false}
          >
            {images.map((e, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden">
                  <Image
                    src={e.src}
                    alt={e.alt}
                    fill
                    style={{
                      objectFit: fits?.[idx] || "contain",
                      objectPosition: "top center",
                    }}
                    onLoadingComplete={(img) => handleImageLoad(idx, img)}
                    // sizes="100vw"
                    priority={idx === 0}
                  />
                </div>

                {"category" in e && e.hasOwnProperty("category") && (
                  <div className="absolute bottom-5 left-5 bg-black/70 text-white text-md px-2 py-1 rounded-md">
                    {
                      (e as { src: string; alt: string; category: string })
                        .category
                    }
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
