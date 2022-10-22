import useDidMountEffect from "@components/utilities/hooks";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";
import { Box, Paper } from "@mui/material";
import { DarkTheme, LightTheme } from "@theme/theme";
import * as React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness2Icon from "@mui/icons-material/Brightness2";

const ThemeToggle: React.FC = () => {
  const themeContext = React.useContext<IThemeContext>(ThemeContext);
  const theme = themeContext.theme;
  const [animate, setAnimate] = React.useState<boolean>(false);
  useDidMountEffect(() => {
    setAnimate(true);
  }, [theme]);
  return (
    <>
      <Box sx={{ position: "relative", height: "2rem" }}>
        <Box
          sx={{
            position: "absolute",
            top: "0",
            right: "5%",
            width: "96%",
            display: "flex",
            alignItems: "center",
            borderRadius: "1rem",
            border: 1,
            borderColor: "border.main",
            fontSize: ".8rem",
            backgroundColor: "primary.lightOpacity",
            color: "text.main",
            p: ".25rem",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{ width: "50%", textAlign: "center" }}
            onClick={() => themeContext.setTheme(LightTheme)}
          >
            Light
          </Box>
          <Box
            sx={{ width: "50%", textAlign: "center" }}
            onClick={() => themeContext.setTheme(DarkTheme)}
          >
            Dark
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Paper
            elevation={4}
            sx={{
              height: "2rem",
              fontSize: ".9rem",
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "backgroundColor.main",
              borderRadius: "1rem",
              zIndex: 111,
              border: 1,

              borderColor: "border.main",
              ml: theme === LightTheme ? "-.25rem" : "auto",
              mr: theme === LightTheme ? "auto" : ".5rem",
            }}
            className={
              animate
                ? `w3-animate-${theme === LightTheme ? "right" : "left"}`
                : ""
            }
          >
            {theme === LightTheme ? "Light" : "Dark"}
            {theme === LightTheme ? (
              <WbSunnyIcon
                sx={{ ml: ".5rem", fontSize: "1rem" }}
                className={animate ? "theme-icon" : ""}
              />
            ) : (
              <Brightness2Icon
                sx={{ ml: ".5rem", fontSize: "1rem", transform: "rotate(0)" }}
                className={animate ? "theme-icon" : ""}
              />
            )}
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ThemeToggle;
