"use client";

import React from "react";
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import logoLight from "../../../../public/assets/logoLight.png";
import logoDark from "../../../../public/assets/logoDark.png";

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [anchorElNav, setAnchorElNav] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar className="h-[55px]" color="default" position="fixed" elevation={1} component="header">
      <Container maxWidth="xl" className="px-2">
        <div className="p-1 flex justify-between items-center w-full">
          {/* Brand (desktop) */}
          <a href="">
            <Image
              className="sm:w-[90px] 2xl:w-[100px]"
              width={100}
              alt="villasbyserene logo"
              src={mode === "light" ? logoDark : logoLight}
            />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex justify-end items-center gap-4">
            <Typography
              color="text.primary"
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
      </Container>
    </AppBar>
  );
};

export default Navbar;
