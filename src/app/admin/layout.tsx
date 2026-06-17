// src/app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  AppBar,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";

import {
  IoMenu as MenuIcon,
  IoMoonOutline as MoonIcon,
  IoSunnyOutline as SunIcon,
} from "react-icons/io5";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import logoLight from "../../../public/assets/villasbyserene-dark.png";
import logoDark from "../../../public/assets/villasbyserene-light.png";
import { useThemeContext } from "@/context/ThemeContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Bookings", path: "/admin/bookings" },
  {
    label: "Calendar",

    path: "/admin/calendar",
  },
  { label: "iCal Sync", path: "/admin/ical" },
  { label: "Properties", path: "/admin/properties" },
  { label: "Quotation", path: "/admin/quotation" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleTheme } = useThemeContext();

  // ── Route guard ───────────────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/");
      return;
    }
    if (!user.is_admin) {
      router.replace("/");
      return;
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!user?.is_admin) return null;

  const DrawerContent = () => (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Brand + theme toggle */}
      <Box
        sx={{
          px: 2,
          py: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div className="w-full">
          <Link href="/admin">
            <Image
              className="max-sm:w-32.5 sm:w-37.5 md:w-42.5"
              alt="VillasBySerene: Your boutique getaway!"
              src={mode === "light" ? logoLight : logoDark}
            />
          </Link>

          <div className="flex justify-between items-center w-full">
            <Typography variant="caption" color="text.secondary">
              Admin Panel
            </Typography>
            <IconButton size="small" onClick={toggleTheme}>
              {mode === "dark" ? (
                <SunIcon fontSize={18} />
              ) : (
                <MoonIcon fontSize={18} />
              )}
            </IconButton>
          </div>
        </div>
      </Box>

      <Divider />

      {/* Nav */}
      <List sx={{ flex: 1, px: 1, pt: 1 }}>
        {navItems.map((item) => {
          const active = pathname.startsWith(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  setMobileOpen(false);
                }}
                selected={active}
                sx={{
                  borderRadius: 0.2,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "#fff",
                    "&:hover": { bgcolor: "primary.dark" },
                    "& .MuiListItemIcon-root": { color: "#fff" },
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      variant: "body2",
                      fontWeight: active ? 700 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* User */}
      <Box
        sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}
      >
        <Avatar
          src={user.profile_image ?? undefined}
          sx={{ width: 32, height: 32, fontSize: 14 }}
        >
          {user.full_name?.[0]}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" fontWeight={700} noWrap display="block">
            {user.full_name}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            noWrap
            display="block"
          >
            Admin
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
            <Typography variant="subtitle1" fontWeight={800} color="primary">
              Admin Panel
            </Typography>
            {/* Theme toggle in mobile appbar */}
            <div className="flex gap-1 items-center">
              <IconButton
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton onClick={toggleTheme} sx={{ ml: "auto" }}>
                {mode === "dark" ? (
                  <SunIcon fontSize={20} />
                ) : (
                  <MoonIcon fontSize={20} />
                )}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            border: "none",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <DrawerContent />
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          bgcolor: "background.default",
          pt: isMobile ? 8 : 0,
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
