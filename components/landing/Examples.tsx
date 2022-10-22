import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { DarkTheme, LightTheme } from "@theme/theme";
import {
  Grid,
  Container,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  useMediaQuery,
} from "@mui/material";

import SectionTitle from "@components/SectionTitle";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const titleStyle = {
  fontSize: "48px",
  fontWeight: "400",
  lineHeight: "116.7%",
  mb: "24px",
  color: DarkTheme.palette.text.primary,
  textTransform: "uppercase",
  fontFamily: '"Viga", sans-serif',
};

const paragraphStyle = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "24px",
  letterSpacing: "-0.35px",
  mb: "16px",
};

const tabs = [
  {
    label: "Developers",
    title: "Blockchain Development Teams",
    content:
      "Crowdsource funding for a project, and launch a DAO to manage the treasury. Give contributors a say in the direction of project development. ",
    link: "/",
    image: "/examples/gaming-world2.png",
  },
  {
    label: "Charities",
    title: "Charitable Organizations",
    content:
      "If you'd like to distribute the governance behind a charity, and operate in the most transparent way possible, a DAO on Paideia may be the answer. ",
    link: "/",
    image: "/examples/gaming-world.png",
  },
  {
    label: "Investors",
    title: "Venture Capitalist Groups",
    content:
      "Using a DAO, groups of people can pool their funds and manage each members' stake in the overall investment. Eliminate the need to trust a specific individual with control of the funds. ",
    link: "/",
    image: "/examples/gaming-world.png",
  },
  {
    label: "Startups",
    title: "Entrepreneurial partnerships",
    content:
      "You and your co-founders can receive a large investment in a trustless way with DAO management software like Paideia. Vote on each person's salary, and make sure funds are put to work in a fair and equitable way. ",
    link: "/",
    image: "/examples/gaming-world2.png",
  },
  {
    label: "P2E Gaming Guilds",
    title: "Gaming Together as a Team",
    content:
      "P2E gaming guilds can split their earnings by sending them to a DAO treasury",
    link: "/",
    image: "/examples/gaming-world2.png",
  },
];

const StyledTabs = styled((props: any) => (
  <Tabs
    {...props}
    // TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTabs-indicatorSpan": {
    display: "none",
  },
});

const StyledTab = styled((props: any) => <Tab {...props} variant="outlined" />)(
  ({ theme }) => ({
    position: "relative",
    textTransform: "uppercase",
    fontSize: "13px",
    minHeight: "24px",
    height: "24px",
    borderRadius: "16px",
    marginRight: "12px",
    color: DarkTheme.palette.primary.dark,
    background: DarkTheme.palette.background.default,
    border: `1px solid ${DarkTheme.palette.primary.dark}`,
    "&.Mui-selected": {
      color: DarkTheme.palette.primary.contrastText,
      backgroundColor: DarkTheme.palette.primary.main,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#ccc",
    },
  })
);

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  sx: PropTypes.any,
};

export default function Examples() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const sizeLg = useMediaQuery(theme.breakpoints.up("lg"));
  const sizeMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {!sizeMd
        ? tabs.map(({ image }, i: number) => {
            return (
              <TabPanel
                value={value}
                index={i}
                key={i}
                sx={{ position: "relative", mt: "100px" }}
              >
                <Box
                  sx={{
                    position: { xs: "relative", md: "absolute" },
                    height: "100%",
                    zIndex: "-3",
                    top: "0",
                    right: "0",
                    maskImage: "linear-gradient(black 0%, transparent 70%)",
                  }}
                >
                  {sizeMd ? null : <img src={image} width={585} height={800} />}
                </Box>
              </TabPanel>
            );
          })
        : null}

      <Container
        sx={{
          position: "relative",
          flexGrow: 1,
          px: "24px",
          mt: { xs: "-550px", sm: "-1000px", md: "0" },
        }}
      >
        <Grid
          container
          spacing={12}
          alignItems="center"
          sx={{
            pt: "120px",
            pb: "40px",
            minHeight: "800px",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              minHeight: { xs: "0", md: "800px", lg: "976px" },
              overflow: "visible",
              position: "relative",
            }}
          >
            {tabs.map(({ image }, i: number) => {
              const height = sizeLg ? 976 : 800;
              const width = sizeLg ? 720 : 585;
              return (
                <TabPanel value={value} index={i} key={i}>
                  <Box
                    sx={{
                      position: { xs: "relative", md: "absolute" },
                      maxHeight: { xs: "240px", sm: "400px", md: "100%" },
                      zIndex: "-3",
                      top: "0",
                      right: "0",
                    }}
                  >
                    {sizeMd ? (
                      <img src={image} width={width} height={height} />
                    ) : null}
                  </Box>
                </TabPanel>
              );
            })}
          </Grid>
          <Grid item xs={12} md={6} sx={{ minHeight: "600px" }}>
            <Box sx={{ position: "relative" }}>
              <SectionTitle sx={{ mb: "64px" }}>Examples</SectionTitle>
              <Box sx={{ width: "100%", maxWidth: "500px" }}>
                <Box>
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="DAO Samples"
                    sx={{
                      ml: { xs: "-24px", md: "-62px" },
                      zIndex: "5",
                      width: { xs: "100vw", md: "calc(100% + 62px)" },
                      minHeight: "0",
                      mb: "24px",
                      ".MuiTabScrollButton-root": {
                        boxShadow: "0 0 12px 8px black",
                        zIndex: "3",
                      },
                    }}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                  >
                    {tabs.map(({ label }, i: number) => (
                      <StyledTab label={label} key={i} />
                    ))}
                  </StyledTabs>
                </Box>
                {tabs.map(({ title, content, link }, i: number) => (
                  <TabPanel value={value} index={i} key={i}>
                    <Typography sx={titleStyle}>{title}</Typography>
                    <Typography sx={paragraphStyle}>{content}</Typography>
                    <Button href={link} endIcon={<ArrowForwardIcon />}>
                      Learn More
                    </Button>
                  </TabPanel>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
