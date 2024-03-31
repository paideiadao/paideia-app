import { Theme } from "@mui/material";
import * as React from "react";
import { LightTheme } from "../theme/theme";

export interface IThemeContext {
  theme: Theme;
  setTheme: Function;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: LightTheme,
  setTheme: () => {},
});
