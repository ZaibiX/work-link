"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import { useThemeStore } from "@/store/themeStore";
import { getTheme } from "@/theme/theme";

interface AppThemeProviderProps extends React.PropsWithChildren {}

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  // const mode = useThemeStore((state) => state.mode);
  const theme = getTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}