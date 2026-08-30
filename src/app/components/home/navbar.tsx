"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";

import {
  IoMenuOutline as MenuIcon,
  IoMoonOutline as MoonIcon,
  IoSunnyOutline as SunIcon,
  IoLogoInstagram as Instagram,
} from "react-icons/io5";

import { FiUser } from "react-icons/fi";

import { useThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import logoLight from "../../../../public/assets/villasbyserene-dark.png";
import logoDark from "../../../../public/assets/villasbyserene-light.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [anchorElNav, setAnchorElNav] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isStaysPage = pathname.startsWith("/stays");
  console.log("pathname:", pathname);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenNavMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

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
    <AppBar
      sx={{
        background:
          theme.palette.mode === "light"
            ? scrolled || !isHomePage
              ? "rgba(255, 255, 255, 1)"
              : "rgba(255,255,255,0)"
            : scrolled || !isHomePage
              ? "rgba(26,26,26,1)"
              : "rgba(26,26,26,0)",
        transition: "background-color 0.3s ease",
      }}
      color="default"
      component="header"
      elevation={scrolled ? 1 : 0}
    >
      <div className={`${!isStaysPage && "container"}`}>
        <div className="py-2 px-4 flex justify-between items-center w-full">
          {/* Brand */}
          <Link href="/">
            <Image
              className="max-sm:w-40 sm:w-45 md:w-48 transition-opacity"
              alt="VillasBySerene: Your boutique getaway!"
              src={
                theme.palette.mode === "light"
                  ? scrolled || !isHomePage
                    ? logoLight
                    : logoDark
                  : logoDark
              }
            />
          </Link>

          {/* Desktop */}
          <div className="flex items-center justify-between gap-6">
            <div className="hidden md:flex justify-end items-center gap-4">
              <Button
                className="hover:bg-transparent! group"
                variant="text"
                onClick={() => router.push("/list")}
              >
                <Typography
                  className="group-hover:underline!"
                  color={scrolled || !isHomePage ? "textPrimary" : "white"}
                >
                  List your home
                </Typography>
              </Button>
              <Button className="hover:bg-transparent! group">
                <Link href="https://www.instagram.com/villasbyserene/">
                  <Typography
                    color={scrolled || !isHomePage ? "textPrimary" : "white"}
                    className="flex items-center gap-1 group-hover:underline!"
                  >
                    <Instagram fontSize={18} />
                    <span>villasbyserene</span>
                  </Typography>
                </Link>
              </Button>

              <AuthControl />

              <IconButton onClick={toggleTheme}>
                {mode === "light" ? (
                  <MoonIcon
                    color={scrolled || !isHomePage ? "inherit" : "white"}
                  />
                ) : (
                  <SunIcon
                    color={scrolled || !isHomePage ? "inherit" : "white"}
                  />
                )}
              </IconButton>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden justify-end items-center">
            <IconButton
              sx={{ paddingX: "4px" }}
              aria-label="open navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon
                color={scrolled || !isHomePage ? "inherit" : "white"}
                fontSize={18}
              />
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
                  <Typography className="hover:underline cursor-pointer flex items-center gap-1">
                    <Instagram fontSize={18} />
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

            <IconButton sx={{ paddingX: "4px" }} onClick={toggleTheme}>
              {mode === "light" ? (
                <MoonIcon
                  fontSize={18}
                  color={scrolled || !isHomePage ? "inherit" : "white"}
                />
              ) : (
                <SunIcon
                  fontSize={18}
                  color={scrolled || !isHomePage ? "inherit" : "white"}
                />
              )}
            </IconButton>

            {/* Mobile auth — avatar or login icon */}
            {!authLoading &&
              (user ? (
                <IconButton
                  onClick={() => router.push("/profile")}
                  size="small"
                  sx={{
                    mx: 0.5,
                    paddingX: "4px",
                  }}
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
                  sx={{
                    color: scrolled || !isHomePage ? "textSecondary" : "white",
                    paddingX: "4px",
                  }}
                  onClick={() =>
                    login(
                      globalThis.location.pathname + globalThis.location.search,
                    )
                  }
                >
                  <FiUser size={20} />
                </IconButton>
              ))}
          </div>
        </div>
      </div>
    </AppBar>
  );
};

export default Navbar;
