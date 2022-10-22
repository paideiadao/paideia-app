import { Typography, Grid, Box, Button, Container, Link } from "@mui/material";

import { DarkTheme } from "@theme/theme";
import SectionTitle from "@components/SectionTitle";
import SocialGrid from "@components/SocialGrid";

export default function Hero() {
  return (
    <Container sx={{ flexGrow: 1, px: "24px", mt: "-64px", pt: "15px" }}>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          left: { xs: "40%", sm: "50%", md: "45%", lg: "50%" },
          height: { xs: "100vh", md: "1261px" },
          minHeight: "600px",
          width: { xs: "2160px", md: "2160px" },
          transform: {
            xs: "translate(-50%, 0)",
            sm: "translate(-50%, 0)",
            md: "translate(-50%, 0)",
          },
          // overflow: "hidden",
          zIndex: "-1",
          ml: "-24px",
        }}
      >
        <img src="/hero-bg.png" />
      </Box>
      <Grid
        container
        sx={{
          height: { xs: "100vh", md: "1000px" },
          minHeight: "600px",
          // mt: "-65px",
          maxHeight: { xs: "1000px", md: "1200px" },
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "flex-end", md: "space-between" },
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Grid item>
          <SectionTitle sx={{ mb: "80px" }}>
            A Web3 DAO Management Software Suite
          </SectionTitle>
          <Typography
            sx={{
              fontSize: { xs: "3.5rem", md: "5rem" },
              fontWeight: "500",
              color: "rgba(0,0,0,0.0)",
              lineHeight: 0.5,
              textTransform: "uppercase",
              fontFamily: '"Viga", sans-serif',
              // strokeWidth: "2px",
              // strokeColor: "#fff",
            }}
            className="outlineText"
          >
            &gt;&gt;Create
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "3.5rem", md: "5rem" },
              fontWeight: "500",
              color: "rgba(0,0,0,0.0)",
              textTransform: "uppercase",
              fontFamily: '"Viga", sans-serif',
            }}
            className="outlineText"
          >
            Your{" "}
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "3.5rem", md: "5rem" },
                fontWeight: "500",
                color: DarkTheme.palette.text.primary,
                textTransform: "uppercase",
                fontFamily: '"Viga", sans-serif',
              }}
            >
              DAO
            </Typography>
          </Typography>
          {/* <Link href="/creation"> */}
          <Button variant="contained" disabled>
            Coming Soon
          </Button>
          {/* </Link> */}
        </Grid>
        <Grid item>
          <Typography
            sx={{
              transform: "rotate(-90deg)",
              textTransform: "uppercase",
              transformOrigin: "top left",
              position: "absolute",
              fontSize: "12px",
              width: "100%",
              display: { xs: "none", md: "inline-block" },
            }}
          >
            Keep up with our socials
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              mt: "64px",
              textTransform: "uppercase",
              display: { xs: "block", md: "none" },
            }}
          >
            Follow our socials
          </Typography>
          <Grid
            container
            spacing={{ xs: 4, md: 0.5 }}
            direction={{ xs: "row", md: "column" }}
            sx={{
              pt: 3,
              pb: { xs: 3, md: 0 },
              fontSize: { xs: "24px", md: "16px" },
            }}
          >
            <SocialGrid hoverColor="#FF8219" />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: "120px", mt: { xs: 6, md: 0 } }}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Box
                sx={{
                  width: "6px",
                  minHeight: "100%",
                  background:
                    "linear-gradient(161.68deg, #6FA1A9 19.58%, #ED7E21 84.97%)",
                }}
              ></Box>
            </Grid>
            <Grid item>
              <Typography sx={{ textTransform: "uppercase", fontSize: "12px" }}>
                Strategic
              </Typography>
              <Typography sx={{ textTransform: "uppercase", fontSize: "12px" }}>
                Partners
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="space-around"
            spacing={2}
            sx={{ color: "#777" }}
          >
            <Grid item>Ergo Foundation</Grid>
            <Grid item>ErgoDEX</Grid>
            <Grid item>Azorus</Grid>
            <Grid item>AnetaBTC</Grid>
            <Grid item>Ergo-Lend</Grid>
            <Grid item>ErgoGames.io</Grid>
            <Grid item>Swamp Audio</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
