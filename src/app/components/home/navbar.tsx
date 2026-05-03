"use client";

import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { FiUser } from "react-icons/fi";

import { useThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import logoLight from "../../../../public/assets/villasbyserene-dark.png";
import logoDark from "../../../../public/assets/villasbyserene-light.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Instagram } from "@mui/icons-material";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [anchorElNav, setAnchorElNav] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const router = useRouter();

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const trigger = useScrollTrigger();
  const theme = useTheme();
  const { user, loading: authLoading, login } = useAuth();

  // ── Auth button — shows spinner while loading, avatar if logged in, login btn if not ──
  const AuthControl = () => {
    if (authLoading) return null;

    if (user) {
      return (
        <IconButton
          onClick={() => router.push("/profile")}
          size="small"
          sx={{ p: 0 }}
        >
          <Avatar
            src={user.profile_image ?? undefined}
            alt={user.full_name}
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {/* Fallback: first letter of name if no profile image */}
            {!user.profile_image && user.full_name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      );
    }

    return (
      <Button
        onClick={() =>
          login(globalThis.location.pathname + globalThis.location.search)
        }
        startIcon={<FiUser />}
        variant="contained"
      >
        Login
      </Button>
    );
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        sx={{ background: theme.palette.mode === "light" ? "#fff" : "#1A1A1A" }}
        color="default"
        component="header"
      >
        <div className="container px-2">
          <div className="p-2 flex justify-between items-center w-full">
            {/* Brand */}
            <Link href="/">
              <Image
                className="max-sm:w-32.5 sm:w-37.5 md:w-42.5"
                alt="VillasBySerene: Your boutique getaway!"
                src={mode === "light" ? logoLight : logoDark}
              />
            </Link>

            {/* Desktop */}
            <div className="flex items-center justify-between gap-6">
              <div className="hidden md:flex justify-end items-center gap-4">
                <button onClick={() => router.push("/list")}>
                  <Typography
                    color="textPrimary"
                    className="hover:underline cursor-pointer"
                  >
                    List your home
                  </Typography>
                </button>
                <button>
                  <Link href="https://www.instagram.com/villasbyserene/">
                    <Typography
                      color="textPrimary"
                      className="hover:underline cursor-pointer flex gap-1"
                    >
                      <Instagram />
                      <span>villasbyserene</span>
                    </Typography>
                  </Link>
                </button>

                <AuthControl />

                <IconButton onClick={toggleTheme}>
                  {mode === "light" ? (
                    <DarkModeOutlinedIcon />
                  ) : (
                    <LightModeOutlinedIcon />
                  )}
                </IconButton>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex md:hidden justify-end items-center">
              <IconButton onClick={toggleTheme}>
                {mode === "light" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>

              {/* Mobile auth — avatar or login icon */}
              {!authLoading &&
                (user ? (
                  <IconButton
                    onClick={() => router.push("/profile")}
                    size="small"
                    sx={{ mx: 0.5 }}
                  >
                    <Avatar
                      src={user.profile_image ?? undefined}
                      alt={user.full_name}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "primary.main",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {!user.profile_image &&
                        user.full_name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    sx={{ mx: 0.5 }}
                    onClick={() =>
                      login(
                        globalThis.location.pathname +
                          globalThis.location.search,
                      )
                    }
                  >
                    <FiUser size={20} />
                  </IconButton>
                ))}

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
                <MenuItem
                  onClick={() => {
                    router.push("/list");
                    handleCloseNavMenu();
                  }}
                >
                  List your home
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="https://www.instagram.com/villasbyserene/">
                    <Typography className="hover:underline cursor-pointer flex gap-1">
                      <Instagram />
                      <span>villasbyserene</span>
                    </Typography>
                  </Link>
                </MenuItem>
                {user && (
                  <MenuItem
                    onClick={() => {
                      router.push("/profile");
                      handleCloseNavMenu();
                    }}
                  >
                    My Profile
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
