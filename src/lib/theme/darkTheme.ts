import { createTheme, Theme } from "@mui/material";

const commonColors = {
  gold: "#f4b400",
  coral: "#D64E5E",
  sand: "#161A1D",
  white: "#ffffff",
  black: "#000000",
  textPrimary: "#ffffff",
  textSecondary: "#d4d4d4",
  divider: "#444444",
  success: "#3CB37B",
  error: "#f2a394",
  warning: "#f2d48e",
  info: "#8ad5ea",
};

const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: commonColors.coral,
      contrastText: commonColors.black,
    },
    secondary: {
      main: commonColors.gold,
    },
    background: {
      default: commonColors.sand,
      paper: "#1e1e1e",
    },
    text: {
      primary: commonColors.textPrimary,
      secondary: commonColors.textSecondary,
    },
    divider: commonColors.divider,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', sans-serif`,
    button: { textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(255,255,255,0.05)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: commonColors.black,
          height: 4,
          borderRadius: 2,
          borderRight: `2px solid ${commonColors.coral}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: "#2e7d32",
        },
        standardError: {
          backgroundColor: "#c62828",
        },
      },
    },
  },
});

export default darkTheme;
