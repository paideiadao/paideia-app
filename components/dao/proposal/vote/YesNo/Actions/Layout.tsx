import { Box } from "@mui/material";
import * as React from "react";

const Layout: React.FC = (props) => {
  return (
    <Box sx={{ pl: ".65rem", pr: ".65rem", width: "100%", pb: ".25rem" }}>
      {props.children}
    </Box>
  );
};

export default Layout;
