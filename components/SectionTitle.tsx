import React, { FC } from "react";
import { Grid, Typography } from "@mui/material";
import SquareIcon from "@mui/icons-material/Square";
import { SxProps } from "@mui/material";

interface SectionTitleProps {
  sx?: SxProps;
}

const SectionTitle: FC<SectionTitleProps> = ({ children, sx }) => {
  return (
    <Grid container spacing={1} direction="row" alignItems="flex-start" sx={sx}>
      <Grid item sx={{ fontSize: "13px" }}>
        <SquareIcon fontSize="inherit" />
      </Grid>
      <Grid item>
        <Typography sx={{ textTransform: "uppercase", fontSize: "12px" }}>
          {children}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SectionTitle;
