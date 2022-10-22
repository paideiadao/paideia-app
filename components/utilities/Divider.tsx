import { Box } from "@mui/material";
import * as React from "react";

const Divider: React.FC<{ m?: string | any }> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderTop: 1,
        borderTopColor: "border.main",
        mt: props.m ? props.m : "1.5rem",
        mb: props.m ? props.m : "1.5rem",
      }}
    ></Box>
  );
};

export default Divider;
