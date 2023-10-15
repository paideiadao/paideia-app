import * as React from "react";
import { ThemeContext, IThemeContext } from "../../lib/ThemeContext";
import { DarkTheme, LightTheme } from "../../theme/theme";
import { IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const DarkSwitch: React.FC = () => {
  const theme = useTheme();
  const globalContext = React.useContext<IThemeContext>(ThemeContext);
  return (
    <IconButton
      onClick={() =>
        globalContext.theme === DarkTheme
          ? globalContext.setTheme(LightTheme)
          : globalContext.setTheme(DarkTheme)
      }
      sx={{
        color: theme.palette.text.secondary,
      }}
    >
      {theme === DarkTheme ? (
        <Brightness7Icon sx={{ fontSize: "18px" }} />
      ) : (
        <Brightness4Icon sx={{ fontSize: "18px" }} />
      )}
    </IconButton>
  );
};

export default DarkSwitch;
