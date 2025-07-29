import { createTheme, Theme } from "@mui/material";

const commonColors = {
  gold: "#f4b400",
  coral: "#D64E5E",
  sand: "#F6F8F9",
  white: "#ffffff",
  black: "#000000",
  textPrimary: "#10162F",
  textSecondary: 'rgba(16,22,47,0.6)',
  divider: "#cccccc",
  success: '#3CB37B',
  error: '#EF5136',
  warning: '#EEB329',
  info: '#1DB8D7'
};

const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: commonColors.coral,
      contrastText: commonColors.white,
    },
    secondary: {
      main: commonColors.gold,
    },
    background: {
      default: commonColors.sand,
      paper: commonColors.white,
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
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: commonColors.white,
          height: 4,
          borderRadius: 2,
          borderRight: `2px solid ${commonColors.coral}`
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: "#dff0d8",
        },
        standardError: {
          backgroundColor: "#f8d7da",
        },
      },
    },
  },
});

export default lightTheme;
