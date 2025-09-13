"use client";

import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { PhoneOutlined as Phone } from "@mui/icons-material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import logoLight from "../../../../public/assets/logo-colored-light-orientation.png";
import logoDark from "../../../../public/assets/logo-colored-dark-orientation.png";
import Link from "next/link";
import { env } from "process";

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [anchorElNav, setAnchorElNav] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

   const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar color="default" component="header">
        <div className="container px-2">
          <div className="p-1 flex justify-between items-center w-full">
            {/* Brand (desktop) */}
            <Link href="/">
              <Image
                className="max-sm:w-[130px] sm:w-[140px] md:w-[200px]"
                alt="villasbyserene logo"
                src={mode === "light" ? logoLight : logoDark}
              />
            </Link>

            {/* Desktop */}
            <div className="flex items-center justify-between gap-6">
              {/* <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton component="a" href="tel:+919876543210">
                <Phone />
              </IconButton>
              <Link href="tel:+919876543210" className="hover:underline">
                <Typography>{process.env.NEXT_PUBLIC_PHONE_NUMBER}</Typography>
              </Link>
            </Box> */}
              <div className="hidden md:flex justify-end items-center gap-4">
                <Typography
                  // color="primary"
                  className="hover:underline cursor-pointer"
                >
                  List your home
                </Typography>
                <IconButton onClick={toggleTheme}>
                  {mode === "light" ? (
                    <DarkModeOutlinedIcon />
                  ) : (
                    <LightModeOutlinedIcon />
                  )}
                </IconButton>
              </div>
            </div>

            {/* mobile */}
            <div className="flex md:hidden justify-end items-center">
              <IconButton onClick={toggleTheme}>
                {mode === "light" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
              <IconButton
                size="large"
                aria-label="open navigation"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuItem>List your home</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
