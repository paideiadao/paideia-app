import {
  Typography,
  Grid,
  Box,
  Button,
  Container,
  Divider,
  Chip,
  useMediaQuery,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DarkTheme, LightTheme } from "@theme/theme";
import { useTheme } from "@mui/material/styles";
import SectionTitle from "@components/SectionTitle";
import StarIcon from "@mui/icons-material/Star";
import CardSlider from "@components/CardSlider";

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

const sponsoredSecondary = {
  fontSize: "34px",
  fontFamily: '"Viga", sans-serif',
  lineHeight: "41px",
};

const paragraphStyle = {
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.15px",
};

const seconaryFeaturedDaos = [
  {
    title: "Ergo-Lend",
    subtitle: "P2P Lending Platform",
    body: "A person-to-person (P2P) lending platform with easy to use tools to borrow and lend money",
    members: 550,
    link: "/",
  },
  {
    title: "Azorus",
    subtitle: "Data Analysis dApp",
    body: "A web3 data intelligence suite for all UTXO blockchains.",
    members: 320,
    link: "/",
  },
  {
    title: "Swamp Audio",
    subtitle: "DRM Management & Music Label",
    body: "An open-source framework to replace existing legacy media monetization & management platforms.",
    members: 440,
    link: "/",
  },
];

const FeaturedCard = ({
  dao,
}: {
  dao: {
    title: string;
    subtitle: string;
    body: string;
    members: number;
    link: string;
  };
}) => {
  return (
    <Box
      sx={{
        // background: "linear-gradient(130.4deg, rgba(0, 0, 0, 0.4) 14.89%, rgba(0, 0, 0, 0.1) 87.67%)",
        // backdropFilter: "blur(5px)",
        // border: "1px solid",
        // borderImageSlice: "1",
        // borderWidth: "1px",
        // borderImageSource: "linear-gradient(140deg, rgba(224, 104, 4, 0) 34.23%, rgba(224, 104, 4, 0.5) 72.7%)",
        height: "100%",
      }}
      className="border-grad"
    >
      <Grid
        container
        sx={{ height: "100%", p: "24px" }}
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item>
          <Chip
            icon={<StarIcon color="secondary" />}
            label="Sponsored"
            sx={{
              color: DarkTheme.palette.secondary.main,
              background: "#fff",
              fontSize: "16px",
              mb: "24px",
            }}
          />
          <Typography sx={{ ...titleStyle, mb: "0px", fontSize: "24px" }}>
            {dao.title}
          </Typography>
          <Typography sx={{ fontSize: "14px", mb: "16px" }}>
            {dao.subtitle}
          </Typography>
          <Typography
            sx={{
              ...secondaryTitleStyle,
              lineHeight: "23px",
              textTransform: "none",
              fontSize: "16px",
              mb: "16px",
            }}
          >
            {dao.body}
          </Typography>
        </Grid>
        <Grid item>
          <Typography sx={{ ...sponsoredSecondary }}>{dao.members}</Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: '"Space Grotesk", sans-serif',
              textTransform: "uppercase",
              mb: "16px",
            }}
          >
            DAO Members
          </Typography>
          <Button endIcon={<ArrowForwardIcon />} href={dao.link}>
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function Featured() {
  const theme = useTheme();
  return (
    <>
      <Container
        sx={{
          px: "24px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-300px",
            left: "50%",
            width: "2160px",
            transform: "translate(-50%, -60px)",
            zIndex: "-8",
            ml: "-24px",
            maxHeight: "calc(100% + 400px)",
            overflow: "hidden",
          }}
        >
          <img src="/featured-bg.png" width={2039} height={2116} />
        </Box>
        <Grid container sx={{ mt: { xs: "120px", md: "0" } }}>
          <Grid item md={6}>
            <SectionTitle sx={{ mb: "24px" }}>Sponsored DAOs</SectionTitle>
            <Typography sx={{ ...titleStyle, mb: "64px" }}>
              Don&apos;t miss out on these projects
            </Typography>
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
        <Grid container sx={{ pb: "100px" }} spacing={3}>
          <Grid item md={6}>
            <Grid container wrap="nowrap" spacing={2}>
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
                  If you want to learn more about some of the best projects in
                  our platform, you can click here to see all. Find something
                  you like!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}></Grid>
          <Grid item md={12}>
            <Button href="/projects" variant="contained" sx={{}}>
              All Projects
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          sx={
            useMediaQuery(theme.breakpoints.down("md"))
              ? { display: "none" }
              : null
          }
        >
          <Grid item xs={1} lg={2}></Grid>
          <Grid item xs={12} lg={10}>
            <Grid
              container
              alignItems="stretch"
              spacing={5}
              sx={{ pt: "32px", pb: "72px" }}
            >
              {seconaryFeaturedDaos.map((dao, i) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <FeaturedCard dao={dao} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {useMediaQuery(theme.breakpoints.down("md")) ? (
          <Box sx={{ mx: "-24px" }}>
            <CardSlider uniqueId="featured" addMargin={24}>
              {seconaryFeaturedDaos.map((dao, i) => (
                <Box
                  key={i}
                  sx={{
                    maxWidth: "calc(100vw - 48px)",
                    display: "inline-flex",
                    whiteSpace: "normal",
                    minWidth: "300px",
                  }}
                >
                  <FeaturedCard dao={dao} />
                </Box>
              ))}
            </CardSlider>
          </Box>
        ) : null}
      </Container>
    </>
  );
}
