import {
  Typography,
  Grid,
  Box,
  Button,
  Link,
  Container,
  Divider,
} from "@mui/material";

import { DarkTheme } from "@theme/theme";
import SectionTitle from "@components/SectionTitle";

const titleStyle = {
  fontSize: "48px",
  fontWeight: "400",
  lineHeight: "116.7%",
  mb: "24px",
  color: DarkTheme.palette.text.primary,
  textTransform: "uppercase",
  fontFamily: '"Viga", sans-serif',
};

const secondaryTitleStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: DarkTheme.palette.text.primary,
  textTransform: "uppercase",
  fontFamily: '"Space Grotesk", sans-serif',
};

const paragraphStyle = {
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.15px",
};

const statList = [
  {
    title: "DAOs initiated on Paideia",
    value: "0",
    subTitle: "Organizations",
  },
  {
    title: "Participants in DAOs",
    value: "0",
    subTitle: "Unique wallets",
  },
  {
    title: "TVL on Paideia",
    value: "$0",
    subTitle: "SigUSD Locked",
  },
  {
    title: "Paideia Token Price",
    value: "$0.0169",
    subTitle: "SigUSD",
  },
];

export default function Stats() {
  return (
    <Container
      sx={{
        flexGrow: 1,
        px: "24px",
        pt: { xs: "0", md: "240px" },
        mt: { xs: "120px", md: "-60px" },
        minHeight: "2200px",
        position: "relative",
        zIndex: "-1",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: "-160px", sm: "-400px", md: "-160px" },
          left: { sm: "27%", md: "42%" },
          width: "2160px",
          transform: "translate(-50%, -60px)",
          overflow: "visible",
          zIndex: "-5",
          ml: "-24px",
          display: { xs: "none", sm: "block" },
        }}
      >
        <img src="/stats-bg.png" width={2299} height={2687} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "-160px",
          right: "-15%",
          height: "100%",
          width: "900px",
          overflow: "visible",
          zIndex: "-5",
          ml: "-24px",
          display: { xs: "block", sm: "none" },
        }}
      >
        <img src="/stats-small.png" width={900} height={2484} />
      </Box>
      <Grid container>
        <Grid item md={4}>
          <SectionTitle sx={{ mb: "24px" }}>Statistics</SectionTitle>
          <Typography sx={titleStyle}>Some Numbers to Look At &lt;</Typography>
        </Grid>
        <Grid item md={3}></Grid>
        <Grid item md={4}>
          <Grid container wrap="nowrap" spacing={2} sx={{ mb: "120px" }}>
            <Grid item>
              <Box
                sx={{
                  width: "8px",
                  height: "100%",
                  background:
                    "linear-gradient(161.68deg, #6FA1A9 19.58%, #ED7E21 84.97%)",
                }}
              ></Box>
            </Grid>
            <Grid item zeroMinWidth>
              <Typography component="p" sx={paragraphStyle}>
                Many projects use NFTs as the analogical equivalent of a key
                being and open a door to a home. We strive to bring utility to
                our NFTs through exclusive access to a blockchain related game,
                along with offering other smaller utilities within our social
                media platforms, including Discord
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={12}
            sx={{ maxWidth: "500px", float: "right", mb: "240px" }}
          >
            {statList.map((stat, i: number) => (
              <Grid item key={i}>
                <Grid container spacing={2} direction="row">
                  <Grid item>
                    <img src={`/stats/${i + 1}.svg`} width={25} height={25} />
                  </Grid>
                  <Grid item>
                    <Typography sx={secondaryTitleStyle}>
                      {stat.title}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  sx={{
                    fontFamily: '"Viga", sans-serif',
                    fontSize: "100px",
                    lineHeight: "100px",
                  }}
                >
                  {stat.value}
                </Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                >
                  <Grid
                    item
                    flexGrow={1}
                    sx={{
                      position: "relative",
                      maxWidth: "100%",
                      minHeight: "100%",
                    }}
                  >
                    <Grid
                      container
                      direction="column"
                      sx={{ height: "100%", pr: "12px" }}
                    >
                      <Grid
                        item
                        xs={6}
                        sx={{ borderBottom: "1px solid white" }}
                      ></Grid>
                      <Grid item xs={6}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs="auto">
                    <Typography
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "16px",
                        textTransform: "uppercase",
                      }}
                    >
                      {stat.subTitle}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Box>
            <SectionTitle sx={{ mb: "24px" }}>How to begin</SectionTitle>
            <Grid container wrap="nowrap" spacing={2} sx={{ mb: "24px" }}>
              <Grid item>
                <Box
                  sx={{
                    width: "8px",
                    height: "100%",
                    background: "#fff",
                  }}
                ></Box>
              </Grid>
              <Grid item zeroMinWidth>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: '"Viga", sans-serif',
                    fontSize: { xs: "48px", md: "56px" },
                    lineHeight: "120%",
                    letterSpacing: "-0.5px",
                    textTransform: "uppercase",
                    textShadow: "0px 2px 2px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  Ready to try Paideia?
                </Typography>
              </Grid>
            </Grid>
            <Button disabled variant="contained">
              Create Your DAO
            </Button>
          </Box>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    </Container>
  );
}
