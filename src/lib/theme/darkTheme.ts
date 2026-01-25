import {
  createTheme,
  outlinedInputClasses,
  responsiveFontSizes,
  Theme,
} from "@mui/material";

const commonColors = {
  gold: "#fecc89",
  goldLight: "#fecc89",
  coral: "#099A73",
  coralLight: "#099A73",
  sand: "#1a1a1a",
  white: "#ffffff",
  black: "#000000",
  textPrimary: "#ffffff",
  textSecondary: "#d4d4d4",
  divider: "#444444",
  success: "#3CB37B",
  error: "#f2a394",
  warning: "#f2d48e",
  info: "#8ad5ea",
  border: "#E0E3E7",
  borderHover: "#B2BAC2",
  borderFocused: "#7e8c9a",
  textBtnHover: "#25282E",
  textBtnFocus: "#1C1F24",
};

let darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: commonColors.coral,
      light: commonColors.coralLight,
      contrastText: commonColors.black,
    },
    secondary: {
      main: commonColors.gold,
      light: commonColors.goldLight,
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
    grey: {
      "100": "#666B69",
      "200": "#585959",
      "300": "#393b3a",
    },
    background: {
      default: commonColors.sand,
      paper: "#212021",
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
    fontSize: 13,
    fontFamily: "var(--font-montserrat), serif !important",
    button: { textTransform: "none" },
    h1: {
      fontWeight: "700",
      fontFamily: "var(--font-eb-garamond), serif",
    },
    h2: {
      fontWeight: "600",
      fontFamily: "var(--font-eb-garamond), serif",
    },
    h3: {
      fontWeight: "600",
      fontFamily: "var(--font-eb-garamond), serif",
    },
    h4: {
      fontWeight: "500",
      fontFamily: "var(--font-eb-garamond), serif",
    },
    h5: {
      fontWeight: "500",
      fontFamily: "var(--font-eb-garamond), serif",
    },
    h6: {
      fontWeight: "500",
      fontFamily: "var(--font-eb-garamond), serif",
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#161A1D",
        },
      },
    },
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
          "& fieldset": {
            borderColor: "#E0E3E7",
          },
          "&:hover fieldset": {
            borderColor: "#B2BAC2",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#6F7E8C",
          },
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
          "&:focus": {
            boxShadow: "none",
          },
        },
        contained: {
          color: "#fff",
          "&:hover": {
            backgroundColor: "#07785a",
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: "#066048",
          },
        },
        text: {
          "&:hover": {
            backgroundColor: commonColors.textBtnHover,
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: commonColors.textBtnFocus,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          border: `1px solid ${commonColors.border}`,
          boxShadow: "none",
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

darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
