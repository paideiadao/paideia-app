import * as React from "react";
import LightFooter from "../../../public/dao/light-footer.png";
import DarkFooter from "../../../public/dao/dark-footer.png";
import { ThemeContext, IThemeContext } from "@lib/ThemeContext";
import { DarkTheme } from "@theme/theme";

const Footer: React.FC = () => {
  const globalContext = React.useContext<IThemeContext>(ThemeContext);
  return (
    <img
      style={{
        marginTop: ".5rem",
        paddingTop: ".5rem",
        width: "13.5rem",
        marginBottom: "0rem",
        position: "absolute",
        bottom: "0",
      }}
      src={globalContext.theme === DarkTheme ? DarkFooter.src : LightFooter.src}
    />
  );
};

export default Footer;
