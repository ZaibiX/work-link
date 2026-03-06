'use client';
import { createTheme } from "@mui/material/styles";

export const getTheme = createTheme({

  cssVariables: {
    colorSchemeSelector: 'data',
  },
  // defaultColorScheme: "system",

  colorSchemes: {

    light: {
      palette: {
        mode: "light",

        primary: {
          main: "#6367FF",
          light: "#8494FF",
          dark: "#4B4ECA",
          contrastText: "#FFFFFF",
        },

        secondary: {
          main: "#C9BEFF",
          light: "#FFDBFD",
          dark: "#9D91D1",
          contrastText: "#1A1A1A",
        },

        background: {
          default: "#FDFDFF",
          // default: "#1eb45d",

          // default: "#8686eb",

          paper: "#FFFFFF",
          // paper:"#FF67FF"
        },

        text: {
          primary: "#1A1B25",
          secondary: "#626477",
        },

        divider: "rgba(201, 190, 255, 0.4)",
      },
    },

    dark: {
      palette: {
        mode: "dark",

        primary: {
          main: "#6367FF",
          light: "#8494FF",
          dark: "#4B4ECA",
          contrastText: "#FFFFFF",
        },

        secondary: {
          main: "#C9BEFF",
          light: "#FFDBFD",
          dark: "#9D91D1",
          contrastText: "#1A1A1A",
        },

        background: {
          default: "#0A0B10",
          

          paper: "#14161F",
          // paper: "yellow",

        },

        text: {
          primary: "#F0F0F7",
          secondary: "#A0A3BD",
        },

        divider: "rgba(201, 190, 255, 0.12)",
      },
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h6: { fontWeight: 700 },
    button: {
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
  },

  // components: {
  //   MuiPaper: {
  //     styleOverrides: {
  //       root: ({ theme }) => ({
  //         backgroundImage: "none",
  //         boxShadow:
  //           theme.palette.mode === "light"
  //             ? "0px 4px 20px rgba(0,0,0,0.04)"
  //             : "0px 4px 25px rgba(0,0,0,0.2)",
  //       }),
  //     },
  //   },
  // },
});