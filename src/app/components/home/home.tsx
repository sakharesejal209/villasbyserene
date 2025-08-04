import React, { useRef, useState } from "react";
import Navbar from "./navbar";
import {
  Autocomplete,
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  InputAdornment,
  Paper,
  Popper,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import landingiamge from "/assets/heroImage2.gif";
import Image from "next/image";

const BannerImage = styled("div")(({ theme }) => ({
  height: "100vh",
  backgroundImage: 'url("/assets/heroimage2.gif")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const locations = ["Lonavala", "Gadeshwar", "Karjat", "Alibaug", "Uran"];

const Home = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSubmit = () => {
    console.log("Submitted:", { location, guests });
    setOpen(false);
    // You can redirect or trigger search here
  };

  return (
    <div>
      <Navbar />
      {/* <BannerImage> */}
      <section className="flex justify-center items-center w-[100vw] h-[100vh]">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.6)",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src="/assets/herovideo1.mp4" type="video/mp4" />
        </video>

        <div className="p-4 md:p-0">
          <div className="text-white">
            <Typography variant="h2">PLAN YOUR</Typography>
            <Typography variant="h2">PERFECT GETAWAY!</Typography>
          </div>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div className="mt-3 relative">
              <Box
                ref={anchorRef}
                onClick={() => setOpen((prev) => !prev)}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 1,
                  padding: "15px",
                  display: open ? "none" : "block",
                  color: "#ffffff",
                }}
              >
                <SearchIcon /> search for location, guest count...
              </Box>

              <Collapse in={open} timeout={300} unmountOnExit>
                <Box className="mt-1 p-2 rounded-lg w-full flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-2">
                    <Autocomplete
                      options={locations}
                      value={location}
                      onChange={(e, val) => setLocation(val || "")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Location"
                          fullWidth
                          sx={{
                            "& label": {
                              color: "#ffffff",
                            },
                            "& label.Mui-focused": {
                              color: "white",
                            },
                            borderRadius: 1,
                            input: {
                              color: "white",
                              "&::label": {
                                color: "white",
                              },
                              "&::placeholder": {
                                color: "white",
                                opacity: 1,
                              },
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },
                          }}
                        />
                      )}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      type="number"
                      label="Guests"
                      fullWidth
                      value={guests}
                      onChange={(e) =>
                        setGuests(Math.max(1, parseInt(e.target.value)))
                      }
                      sx={{
                        "& label": {
                          color: "#ffffff",
                        },
                        "& label.Mui-focused": {
                          color: "white",
                        },
                        borderRadius: 1,
                        input: {
                          color: "white",
                          "&::label": {
                            color: "white",
                          },
                          "&::placeholder": {
                            color: "white",
                            opacity: 1,
                          },
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                      }}
                    />
                  </div>
                  <Button variant="contained" fullWidth onClick={handleSubmit}>
                    Search
                  </Button>
                </Box>
              </Collapse>
            </div>
          </ClickAwayListener>
        </div>
      </section>

      <section>
        <Typography variant="h5" className="text-center">
          Search by Property Type
        </Typography>
        <div></div>
      </section>
    </div>
  );
};

export default Home;
