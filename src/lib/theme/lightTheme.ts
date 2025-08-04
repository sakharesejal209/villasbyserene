import {
  createTheme,
  outlinedInputClasses,
  responsiveFontSizes,
  Theme,
} from "@mui/material";

const commonColors = {
  gold: "#f4b400",
  coral: "#D64E5E",
  sand: "#ffffff",
  white: "#ffffff",
  black: "#000000",
  textPrimary: "#10162F",
  textSecondary: "rgba(16,22,47,0.6)",
  divider: "#cccccc",
  success: "#3CB37B",
  error: "#EF5136",
  warning: "#EEB329",
  info: "#1DB8D7",
  border: "#E0E3E7",
  borderHover: "#B2BAC2",
  borderFocused: "#7e8c9a",
};

let lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: commonColors.coral,
      contrastText: commonColors.white,
    },
    secondary: {
      main: commonColors.gold,
    },
    warning: {
      main: commonColors.warning,
    },
    error: {
      main: commonColors.error,
    },
    success: {
      main: commonColors.success,
    },
    info: {
      main: commonColors.info,
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
    fontFamily: `'Nunito', sans-serif`,
    button: { textTransform: "none" },
    h1: {
      fontWeight: "700",
    },
    h2: {
      fontWeight: "700",
    },
    h3: {
      fontWeight: "700",
    },
    h4: {
      fontWeight: "600",
    },
    h5: {
      fontWeight: "500",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: commonColors.borderFocused,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: commonColors.border,
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: commonColors.borderHover,
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: commonColors.borderFocused,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "none",
          transition: "all 0.1s ease-in-out",
          "&:hover": {
            backgroundColor: "#D13647",
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: "#AA2736",
          },
          "&:focus": {
            boxShadow: "none",
          },
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
          borderRight: `2px solid ${commonColors.coral}`,
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

lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
