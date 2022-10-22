import React, { FC } from "react";
import Box from "@mui/material/Box";

interface BoxProps {
  styles?: Object;
}

const Featured: FC<BoxProps> = ({ children, styles }) => {
  return (
    <Box
      sx={{
        ...styles,
        background:
          "linear-gradient(130.4deg, rgba(0, 0, 0, 0.4) 14.89%, rgba(0, 0, 0, 0.1) 87.67%)",
        backdropFilter: "blur(5px)",
        //borderRadius: '20px',
        // border: '1px solid rgba(224, 104, 4, 0.6)',
        border: "1px solid",
        borderImageSlice: "1",
        borderWidth: "1px",
        borderImageSource:
          "linear-gradient(140deg, rgba(224, 104, 4, 0) 34.23%, rgba(224, 104, 4, 0.5) 72.7%)",
      }}
    >
      {children}
    </Box>
  );
};

export default Featured;
