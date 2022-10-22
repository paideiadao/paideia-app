import React, { FC } from "react";
import {
  Typography,
  Grid,
  Box,
  Button,
  Container,
  useMediaQuery,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DarkTheme, LightTheme } from "@theme/theme";
import SectionTitle from "@components/SectionTitle";
import Carousel from "react-material-ui-carousel";
import { useTheme } from "@mui/material/styles";

const titleStyle = {
  fontSize: "48px",
  fontWeight: "400",
  lineHeight: "116.7%",
  mb: "24px",
  color: DarkTheme.palette.text.primary,
  textTransform: "uppercase",
  fontFamily: '"Viga", sans-serif',
  textShadow: "0px 2px 2px rgba(0, 0, 0, 0.6)",
};

const secondaryTitleStyle = {
  fontSize: "34px",
  lineHeight: "41px",
  fontWeight: "700",
  color: DarkTheme.palette.text.primary,
  // textTransform: "uppercase",
  fontFamily: '"Space Grotesk", sans-serif',
  mb: "16px",
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
  mb: "16px",
};

interface IHighlightItem {
  title: string;
  content: string;
  link: string;
  image?: string;
}

interface IItemObject {
  item: IHighlightItem;
}

export const randomInteger = (min: number, max: number) => {
  return (min + Math.random() * (max - min)).toFixed();
};

const CarouselItem: FC<IItemObject> = ({ item }) => {
  const theme = useTheme();
  const sizeMd = useMediaQuery(theme.breakpoints.up("md"));
  const sizeLg = useMediaQuery(theme.breakpoints.up("lg"));
  const sizeXl = useMediaQuery(theme.breakpoints.up("xl"));

  const rand = randomInteger(1, 18);

  const image = item?.image ? item.image : `/images/placeholder/${rand}.jpg`;

  const Content = () => {
    return (
      <>
        <Typography sx={secondaryTitleStyle}>{item.title}</Typography>
        <Typography sx={paragraphStyle}>{item.content}</Typography>
        <Button href={item.link} endIcon={<ArrowForwardIcon />}>
          Check it out
        </Button>
      </>
    );
  };

  if (sizeXl) {
    return (
      <Grid
        container
        spacing={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          overflow: "hidden",
          mr: "96px",
          // px: '24px'
        }}
      >
        <Grid item md={6}>
          <Box sx={{ position: "relative", width: "100%", height: "558px" }}>
            <Box
              sx={{
                position: "absolute",
                right: "0",
                top: "0",
                overflow: "visible",
                zIndex: "1",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  width: "768px",
                  height: "558px",
                  zIndex: "2",
                }}
              >
                {/* <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background: "rgba(111,161,169,1)",
                    mixBlendMode: "hard-light",
                  }}
                ></Box> */}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box maxWidth="520px">
            <Content />
          </Box>
        </Grid>
      </Grid>
    );
  } else if (sizeLg) {
    return (
      <Grid
        container
        spacing={6}
        maxWidth="100vw"
        alignItems="center"
        sx={{
          overflow: "hidden",
          mx: "auto",
          px: "24px",
        }}
      >
        <Grid item md={6}>
          <Box sx={{ position: "relative", width: "100%", height: "558px" }}>
            <Box
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: "0",
                top: "0",
                overflow: "visible",
                zIndex: "1",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  width: "768px",
                  height: "558px",
                  zIndex: "2",
                }}
              >
                {/* <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background: "rgba(111,161,169,1)",
                    mixBlendMode: "hard-light",
                  }}
                ></Box> */}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box sx={{ maxWidth: "480px" }}>
            <Content />
          </Box>
        </Grid>
      </Grid>
    );
  } else if (sizeMd) {
    return (
      <Grid
        container
        spacing={6}
        maxWidth="lg"
        alignItems="center"
        sx={{
          overflow: "hidden",
        }}
      >
        <Grid item md={6}>
          <Box
            sx={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",

              height: "558px",
              zIndex: "2",
            }}
          >
            {/* <Box
              sx={{
                width: "100%",
                height: "100%",
                background: "rgba(111,161,169,1)",
                mixBlendMode: "hard-light",
              }}
            ></Box> */}
          </Box>
        </Grid>
        <Grid item md={6} sx={{ pr: "63px" }}>
          <Content />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Container sx={{ display: "block", positoin: "relative" }}>
        <Box
          sx={{
            height: "400px",
            top: "0",
            left: "0",
            width: "100vw",
            position: "absolute",
            zIndex: "-2",
            maskImage: "linear-gradient(black 40%, transparent 100%)",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              width: "100vw",
              height: "400px",
              zIndex: "2",
            }}
          >
            {/* <Box
              sx={{
                width: "100%",
                height: "100%",
                background: "rgba(111,161,169,1)",
                mixBlendMode: "hard-light",
              }}
            ></Box> */}
          </Box>
        </Box>
        <Box
          sx={{
            pt: "300px",
            position: "relative",
            display: "block",
            maxHeight: "258px",
          }}
        >
          <Content />
        </Box>
      </Container>
    );
  }
};

interface IHighlightCarouselProps {
  highlights: IHighlightItem[];
}

const HighlightCarousel: FC<IHighlightCarouselProps> = ({ highlights }) => {
  const theme = useTheme();

  return (
    <Carousel
      autoPlay={false}
      animation="slide"
      height={useMediaQuery(theme.breakpoints.up("md")) ? "558px" : "558px"}
      navButtonsAlwaysVisible={
        useMediaQuery(theme.breakpoints.up("md")) ? true : false
      }
      navButtonsProps={{
        style: {
          backgroundColor: LightTheme.palette.primary.main,
          // borderRadius: 0
        },
      }}
      sx={{
        zIndex: "2",
        maxWidth: "xl",
        mx: "auto",
      }}
    >
      {highlights.map((item: IHighlightItem, i: number) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
};

interface IHighlightProps {
  titleSmall?: string;
  title?: string;
  highlights: IHighlightItem[];
}

const Highlights: FC<IHighlightProps> = ({ titleSmall, title, highlights }) => {
  return (
    <>
      <Container
        sx={{
          flexGrow: 1,
          px: "24px",
          position: "relative",
        }}
      >
        <Grid container sx={{ mt: "120px" }}>
          <Grid item md={6}>
            <SectionTitle sx={{ mb: "24px" }}>
              {titleSmall ? titleSmall : "Featured"}
            </SectionTitle>
            <Typography sx={{ ...titleStyle, mb: "64px" }}>
              {title ? title : "You can't miss these highlights"}
            </Typography>
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
      </Container>
      <HighlightCarousel highlights={highlights} />
    </>
  );
};

export default Highlights;
