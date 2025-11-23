import {
  createTheme,
  outlinedInputClasses,
  responsiveFontSizes,
  Theme,
} from "@mui/material";

const commonColors = {
  gold: "#fecc89",
  goldLight: "#fecc89",
  coral: "#044231",
  coralLight: "#1d5546",
  sand: "#ffffff",
  white: "#ffffff",
  black: "#000000",
  textPrimary: "#10162F",
  textSecondary: "rgba(16,22,47,0.6)",
  divider: "#cccccc",
  success: "#329868",
  error: "#EF5136",
  warning: "#EEB329",
  info: "#1DB8D7",
  border: "#E0E3E7",
  borderHover: "#B2BAC2",
  borderFocused: "#7e8c9a",
  textBtnHover: "#FAFAFA",
  textBtnFocus: "#F2F2F2",
};

let lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: commonColors.coral,
      light: commonColors.coralLight,
      contrastText: commonColors.white,
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
      "100": "#969696",
      "200": "#ADADAD",
      "300": "#C6C6C6",
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
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: commonColors.border,
          },
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: commonColors.borderHover,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: `${commonColors.borderFocused} !important`,
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
          "&:hover": {
            backgroundColor: "#066048",
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: "#07785a",
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `1px solid ${commonColors.border}`,
          boxShadow: "none",
        },
      },
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
