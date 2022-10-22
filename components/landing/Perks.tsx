import { Grid, Container, Box, Typography, Button } from "@mui/material";
import SectionTitle from "@components/SectionTitle";
import { DarkTheme } from "@theme/theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const perkTitleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "133%",
  color: DarkTheme.palette.text.primary,
  textTransform: "uppercase",
  fontFamily: '"Space Grotesk", sans-serif',
  mt: "2px",
  mb: "16px",
};

const paragraphStyle = {
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.15px",
};

export default function Perks() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ position: "relative", height: "100%", minWidth: "1500px" }}
      >
        <Box
          sx={{
            zIndex: "-1",
            position: "absolute",
            top: "0",
            right: "0",
            height: "341px",
            width: "20px",
            background:
              "linear-gradient(161.68deg, #6FA1A9 19.58%, #ED7E21 84.97%)",
          }}
        ></Box>
      </Container>
      <Container sx={{ flexGrow: 1, px: "24px", position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            top: "200px",
            left: "35%",
            height: "730px",
            width: "1467px",
            transform: "translate(-50%, 0)",
            overflow: "visible",
            zIndex: "-1",
            ml: "-24px",
          }}
        >
          <img src="/perks-bg.png" />
        </Box>
        <Grid container sx={{ pt: "60px", pb: "120px" }}>
          <Grid item md={5}>
            <Grid container spacing={3}>
              <Grid item>
                <SectionTitle>Perks</SectionTitle>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: "48px",
                    fontWeight: "400",
                    lineHeight: "116.7%",
                    color: DarkTheme.palette.text.primary,
                    textTransform: "uppercase",
                    fontFamily: '"Viga", sans-serif',
                  }}
                >
                  Why create your DAO on Paideia?&lt;
                </Typography>
              </Grid>
              <Grid item>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Box
                      sx={{
                        mt: "3px",
                        width: "8px",
                        height: "90%",
                        background:
                          "linear-gradient(161.68deg, #6FA1A9 19.58%, #ED7E21 84.97%)",
                      }}
                    ></Box>
                  </Grid>
                  <Grid item zeroMinWidth>
                    <Typography component="p" sx={paragraphStyle}>
                      Blockchain provides several advantages over legacy
                      financial systems. Transparency, decentralization, and
                      fair access are some of the hallmarks of the technology.
                      DAOs are an extension of these features. Paideia can help
                      with that.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={7}></Grid>
        </Grid>
        <Grid
          container
          rowSpacing={12}
          columnSpacing={{ xs: "0", sm: 12, md: "0" }}
          sx={{ mb: "60px" }}
        >
          <Grid
            item
            xs={1}
            sm={1}
            md={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid item xs={12} sm={6} md={3}>
            <img src="/icons/StackIcon.svg" width={35} height={35} />
            <Typography sx={perkTitleStyle}>Simple to Use</Typography>
            <Typography component="p" sx={paragraphStyle}>
              The Paideia UX/UI was designed with ease-of-use in mind, removing
              the complexity so you can focus on what matters: participating in
              DAOs.
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid item xs={12} sm={6} md={3}>
            <img src="/icons/CubeIcon.svg" width={35} height={35} />
            <Typography sx={perkTitleStyle}>Secure</Typography>
            <Typography component="p" sx={paragraphStyle}>
              Smart contracts written in Ergoscript maintain secure, predictable
              voting structures, which ensures your treasury is spent according
              to fair voting.
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid item xs={12} sm={6} md={3}>
            <img src="/icons/PyramidIcon.svg" width={35} height={35} />
            <Typography sx={perkTitleStyle}>Flexible</Typography>
            <Typography component="p" sx={paragraphStyle}>
              Not all DAOs have the same needs. Paideia offers various
              governance structures and voting mechanisms, so you can get
              organized in the most productive way possible.
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid item xs={12} sm={6} md={3}>
            <img src="/icons/TokenIcon.svg" width={35} height={35} />
            <Typography sx={perkTitleStyle}>Inexpensive</Typography>
            <Typography component="p" sx={paragraphStyle}>
              Paideia is built on Ergo, so transaction fees are miniscule, and
              the platform fees will always remain low. You&apos;ll never pay
              hundreds in gas fees here.
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Button
              href="/education"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
            >
              Learn More
            </Button>
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={3}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          ></Grid>
        </Grid>
      </Container>
      <Box height="100px"></Box>
      <Container
        maxWidth="xl"
        sx={{ position: "relative", minWidth: "1500px" }}
      >
        <Box
          sx={{
            zIndex: "-1",
            position: "absolute",
            bottom: "0",
            left: "0",
            height: "341px",
            width: "20px",
            background:
              "linear-gradient(161.68deg, #6FA1A9 19.58%, #ED7E21 84.97%)",
            transform: "rotate(90deg)",
            transformOrigin: "bottom left",
          }}
        ></Box>
      </Container>
      <Box height="60px"></Box>
    </>
  );
}
