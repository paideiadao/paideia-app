import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    sm2: true;
    sm3: true;
    md: true;
    md2: true;
    lg: true;
    xl: true;
  }
}

export const mainTheme = createTheme({
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
    body2: {
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.0225em",
      marginBottom: "32px",
      display: "block",
    },
    h1: {
      fontSize: "3rem",
      fontWeight: "400",
      lineHeight: 1.167,
      letterSpacing: "0em",
      marginBottom: "1rem",
      textTransform: "uppercase",
      fontFamily: '"Viga", sans-serif',
      textShadow: "0px 2px 2px rgba(0, 0, 0, 0.6)",
      overflowWrap: "break-word",
      hyphens: "manual",
    },
    h2: {
      fontSize: "2.125rem",
      fontWeight: "700",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
      marginBottom: "1rem",
      fontFamily: '"Space Grotesk", sans-serif',
      overflowWrap: "break-word",
      hyphens: "manual",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "700",
      lineHeight: 1.334,
      letterSpacing: "0em",
      marginBottom: "1rem",
      fontFamily: '"Space Grotesk", sans-serif',
      overflowWrap: "break-word",
      hyphens: "manual",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: "700",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
      marginBottom: "1rem",
      fontFamily: '"Space Grotesk", sans-serif',
      overflowWrap: "break-word",
      hyphens: "manual",
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: "700",
      lineHeight: 1.8,
      letterSpacing: "0.0075em",
      marginBottom: "1rem",
      fontFamily: '"Space Grotesk", sans-serif',
      overflowWrap: "break-word",
      hyphens: "manual",
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: "500",
      lineHeight: 1.8,
      letterSpacing: "0.0075em",
      marginBottom: "1rem",
      fontFamily: '"Space Grotesk", sans-serif',
      overflowWrap: "break-word",
      hyphens: "manual",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          body2: "p",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      sm2: 700,
      sm3: 800,
      md: 900,
      md2: 1000,
      lg: 1200,
      xl: 1600,
    },
  },
});

export const LightTheme = createTheme({
  ...mainTheme,
  palette: {
    circle: {
      main: "#00868F",
    },
    error: {
      main: "#ef5350",
      light: "#ef5350",
    },
    favoriteBackground: {
      main: "#FEE8E7",
    },
    text: {
      primary: "#000000",
      secondary: "rgb(56, 58, 66)",
    },
    // @ts-ignore
    linkHover: {
      main: "#EBF5F6",
    },
    tokenAlert: {
      main: "#ed6c02",
    },
    circleBackground: {
      main: "#EBF6F6",
    },
    border: {
      main: "#D6D6D6",
    },
    darkHover: {
      main: "#FFFFFF",
    },
    backgroundColor: {
      main: "#FFFFFF",
    },
    background: {
      paper: "rgb(229,229,229)",
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#00868F",
      light: "#50B6BF",
      dark: "#005962",
      contrastText: "#FFFFFF",
      // @ts-ignore
      selectedButton: "#E5F3F4",
      lightSuccess: "#00A300",
      lightOpacity: "#EBF6F6",
      lightText: "blue",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    success: {
      main: "#2E7D32",
    },
    secondary: {
      main: "#FF8219",
      light: "#FFB333",
      dark: "#E06804",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#FFFFFF",
    },
    fileInput: {
      main: "#F5F5F5",
      outer: "#FFFFFF",
      border: "FFFFFF",
      read: "#F0F5F6",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    // contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  components: {
    MuiChip: {
      styleOverrides: {
        icon: {
          color: "inherit",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#666666",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        labelContainer: {
          color: "#000000",
        },
        label: {
          fontWeight: 500,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& input:focus:focus-visible": {
            outline: 0,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& input:focus:focus-visible": {
            outline: 0,
          },
          "& textarea:focus:focus-visible": {
            outline: 0,
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-completed": {
            color: "#00A300",
          },
          "&.Mui-active": {
            color: "#00868F",
            "& text": {
              fill: "#FFFFFF",
            },
          },

          color: "#FFF5ED",
        },
        text: {
          fill: "#E16804",
          fontSize: ".8rem",
        },
      },
    },
  },
});

export const DarkTheme = createTheme({
  ...mainTheme,
  palette: {
    mode: "dark",
    background: {
      default: "#0E1421",
      paper: "rgb(40, 44, 52)",
    },
    error: {
      main: "#ef5350",
      light: "#ef5350",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgb(171, 178, 191)",
    },
    circle: {
      main: "#9FD2DB",
    },
    linkHover: {
      main: "rgba(159, 210, 219, 0.16)",
    },
    tokenAlert: {
      main: "rgba(255, 167, 38, 1)",
    },
    favoriteBackground: {
      main: "#FEE8E7",
    },
    circleBackground: {
      main: "rgba(159, 210, 219, 0.08)",
    },
    searchIcon: {
      main: "#9FD2DB",
    },
    alert: {
      main: "#FFA726",
    },
    darkHover: {
      main: "rgba(17, 24, 39, 0.08)",
      text: "rgba(0, 0, 0, 1)",
    },
    border: {
      main: "rgba(159, 210, 219, 0.2)",
    },
    fileInput: {
      main: "rgba(45, 51, 64, 1)",
      outer: "rgba(17, 24, 39, 1)",
      border: "rgba(255, 255, 255, 0.12)",
      read: "#1C2735",
    },
    backgroundColor: {
      main: "rgba(17, 24, 39, 1)",
    },
    color: {
      main: "#FFFFFF",
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#9FD2DB",
      light: "#D1FFFF",
      dark: "#6FA1A9",
      // @ts-ignore
      selectedButton: "rgba(2, 136, 209, 0.1)",
      lightSuccess: "#66BB6A",
      lightOpacity: "rgba(159, 210, 219, 0.08)",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    success: {
      main: "#66BB6A",
    },
    secondary: {
      light: "#FFCF7E",
      main: "#FC9E4F",
      dark: "ED7E21",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#000000",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    // contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  addButton: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    color: "primary",
    zIndex: 20,
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "#FFFF00",
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        icon: {
          color: "inherit",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        // @ts-ignore
        expandedIconWrapper: {
          backgroundColor: "#0000FF",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.3)",
            outline: 0,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9FD2DB",
          },
          color: "FFFFFF",
          outline: 0,
          "& input:focus:focus-visible": {
            outline: 0,
          },
          "& textarea:focus:focus-visible": {
            outline: 0,
          },
        },
      },
    },
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       "& input:focus:focus-visible": {
    //         outline: 0,
    //       },
    //     }
    //   }
    // },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "&-track": {
            color: "rgba(255, 255, 255, 0.7)",
          },
        },
        track: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
    // @ts-ignore
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(17, 24, 39, 1)",
          color: "#FFFFFF",
          "&Mui-Typography": {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#9FD2DB",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& input:focus:focus-visible": {
            outline: 0,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          warning: {
            backgroundColor: "#191207",
            color: "#FFE2B7",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "rgba(255, 255, 255, 0.3)",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.56)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "& .MuiAlert-Icon": {
            color: "#00A300",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          "&-label.Mui-completed": {
            color: "#FFFFFF",
          },
        },
        labelContainer: {
          color: "#FFFFFF",
        },
        label: {
          "&.Mui-completed": {
            color: "#FFFFFF",
          },
          "&.Mui-active": {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-completed": {
            color: "#66BB6A",
          },
          "&.Mui-active": {
            color: "#00868F",
            "& text": {
              fill: "#FFFFFF",
            },
          },
          color: "rgba(252, 158, 79, 0.08)",
        },
        text: {
          fill: "rgba(255, 207, 126, 1)",
        },
      },
    },
  },
});
