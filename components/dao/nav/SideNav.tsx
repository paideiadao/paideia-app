import { Box } from "@mui/material";
import * as React from "react";
import Contents from "./Contents";
import DaoBio from "./DaoBio";
import Footer from "./Footer";
import LightFooter from "@public/dao/light-footer.png";
import DarkFooter from "@public/dao/dark-footer.png";
import { ThemeContext, IThemeContext } from "@lib/ThemeContext";
import { DarkTheme } from "@theme/theme";
import { deviceStruct, deviceWrapper } from "@components/utilities/Style";
import { INav } from "./TopNav";

const Nav: React.FC<INav> = (props) => {
  const themeContext = React.useContext<IThemeContext>(ThemeContext);
  return (
    <Box
      sx={{
        width: "14.5rem",
        backgroundColor: "backgroundColor.main",
        borderRight: "1px solid",
        borderRightColor: "border.main",
        color: "text.primary",
        height: "100vh",
        borderBottomColor: "border.main",
        position: "sticky",
        top: 0,
        pt: '12px',
        display: deviceWrapper("none", "flex"),
        flexDirection: 'column'
      }}
    >
      <DaoBio setShowMobile={props.setShowMobile} />
      <Contents setShowMobile={props.setShowMobile} />
      {/* <Footer /> */}
    </Box>
  );
};

export default Nav;
