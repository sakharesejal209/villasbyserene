import {
  createTheme,
  outlinedInputClasses,
  responsiveFontSizes,
  Theme,
} from "@mui/material";

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
      contrastText: commonColors.black,
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
      paper: "#252525",
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
    fontFamily: "var(--font-playfair), serif",
    button: { textTransform: "none" },
    h1: {
      fontWeight: "700",
    },
    h2: {
      fontWeight: "600",
    },
    h3: {
      fontWeight: "600",
    },
    h4: {
      fontWeight: "400",
    },
    h5: {
      fontWeight: "500",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
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
          "&:hover": {
            backgroundColor: "#D13647",
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
            backgroundColor: "#AA2736",
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
          border: `2px solid ${commonColors.border}`,
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
