import React, { FC } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { SxProps } from "@mui/material";

const paragraphStyle = {
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.15px",
};

const blockquoteStyle = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: "600",
  fontSize: "20px",
  lineHeight: "28px",
};

interface BlockquoteProps {
  small?: boolean;
  noIndent?: boolean;
  sx?: SxProps;
}

const Blockquote: FC<BlockquoteProps> = ({ small, noIndent, sx, children }) => {
  return (
    <Box sx={sx ? sx : { mb: "32px" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Box
            sx={{
              mt: "3px",
              ml: noIndent ? "0" : "36px",
              width: "8px",
              height: "95%",
              background:
                "linear-gradient(161.68deg, #6FA1A9 19.58%, #ED7E21 84.97%)",
            }}
          ></Box>
        </Grid>
        <Grid item zeroMinWidth>
          <Typography sx={small ? paragraphStyle : blockquoteStyle}>
            {children}
          </Typography>
        </Grid>
      </Grid>
      <Grid item zeroMinWidth>
        <Typography sx={small ? {} : blockquoteStyle} variant="body1">
          {children}
        </Typography>
      </Grid>
    </Box>
  );
};

export default Blockquote;
