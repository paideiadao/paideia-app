import { deviceWrapper } from "@components/utilities/Style";
import { Box } from "@mui/material";
import * as React from "react";

const Layout: React.FC<{ width?: string | any }> = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        pt: { xs: ".75rem", sm: ".75rem", md: ".5rem", lg: "1rem" },
        pb: "1.5rem",
        minHeight: "calc(100vh - 6rem)",
      }}
    >
      <Box
        sx={{
          width:
            props.width === undefined
              ? deviceWrapper("92%", "70%")
              : props.width,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
