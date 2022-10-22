import React, { FC } from "react";
import { Grid, Container, Box, Typography, Button } from "@mui/material";
import { DarkTheme } from "@theme/theme";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForward";

interface PerkProps {
  sx?: object;
}

const Perks: FC<PerkProps> = ({ sx }) => {
  return (
    <Box sx={sx}>
      <Container
        sx={{
          position: "relative",
          px: "24px",
          pl: { xs: "60px", md: "24px" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "730px",
            width: "1467px",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            zIndex: "-1",
            ml: "-24px",
            display: { xs: "none", sm: "block" },
          }}
        >
          <img src="/quote-bg.png" />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "730px",
            width: "1467px",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            zIndex: "-1",
            ml: "-24px",
            display: { xs: "block", sm: "none" },
          }}
        >
          <img src="/quote-small.png" />
        </Box>
        <Grid container sx={{ pt: "120px", pb: "40px" }}>
          <Grid item md={3}></Grid>
          <Grid item md={7}>
            <Typography
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: "400",
                fontSize: { xs: "24px", md: "33px" },
                lineHeight: { xs: "24px", md: "36px" },
              }}
            >
              Using our tools, individuals who don&apos;t have fair access to
              financial systems may take control and compete in a society that
              is imbalanced and stacked against them, without needing the
              approval of the wealthy or elite.
            </Typography>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
        <Grid container sx={{ pb: "120px" }}>
          <Grid item md={4}></Grid>
          <Grid item md={6}>
            <Grid
              container
              justifyContent="flex-end"
              rowSpacing={2}
              sx={{ borderTop: "1px solid white" }}
            >
              <Grid item md={6}>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "10px",
                    fontWeight: "400",
                    lineHeight: "12px",
                    letterSpacing: "0.17px",
                  }}
                >
                  Through Paideia, DAOs can distribute governance tokens, raise
                  funds, manage their treasury, create proposals on expenditures
                  or governance, have a forum for stakeholders to discuss all
                  ideas and proposals, and easily deploy their funds to achieve
                  their goals.
                </Typography>
              </Grid>
              <Grid item md={6} sx={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16px",
                    letterSpacing: "0.17px",
                    textTransform: "uppercase",
                    mb: "12px",
                  }}
                >
                  Paideia Whitepaper
                </Typography>
                <Button
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{ color: "#FC9E4F" }}
                  href="https://docs.paideia.im"
                  target="_blank"
                >
                  Read More
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Perks;
