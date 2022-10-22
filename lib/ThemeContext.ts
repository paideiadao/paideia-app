import { Theme } from "@mui/material";
import * as React from "react";
import { DarkTheme, LightTheme } from "../theme/theme";

export interface IThemeContext {
  theme: Theme;
  setTheme: Function;
}

export const ThemeContext = React.createContext({
  theme: LightTheme,
  setTheme: undefined,
});
