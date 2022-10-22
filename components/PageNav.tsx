import React, { FC, useEffect, useState, useRef, useContext } from "react";
import { DarkTheme, LightTheme } from "@theme/theme";
import {
  Box,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Icon,
  Grid,
  useMediaQuery,
  Fab,
  Zoom,
  useScrollTrigger,
  Fade,
  Typography,
} from "@mui/material";
import { PageNavContext } from "@components/Layout";

const listItemSx = {
  "&:hover": {
    "& .MuiTypography-root": {
      fontWeight: "700",
      textDecoration: "underline",
    },
  },
};

export interface INavLink {
  name: string;
  icon?: string;
  link: string;
  position: number | undefined;
}

interface IPageNav {
  navLinks: INavLink[];
  children: React.ReactNode;
}

function NavPopup(props: { children: React.ReactNode; navOpen: boolean }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: props.navOpen ? "61" : "5",
        }}
      >
        {props.children}
      </Box>
    </Zoom>
  );
}

const PageNav: FC<IPageNav> = ({ navLinks, children }) => {
  const [sliderSx, setSliderSx] = useState({
    mt: undefined,
    height: undefined,
  });
  const sliderSxRef = useRef({
    mt: undefined,
    height: undefined,
  });
  sliderSxRef.current = sliderSx;

  // This is the top of the area which contains content. This is defined rather than using the top
  // and bottom of the page, because we don't want the scroll animation to start moving until after
  // the header, and it should reach the bottom once it hits the top of the footer.
  const [topAndBottom, setTopAndBottom] = useState({
    top: 0,
    bottom: 0,
  });
  const topAndBottomRef = useRef({
    top: 0,
    bottom: 0,
  });
  topAndBottomRef.current = topAndBottom;

  const handleResize = () => {
    const navContainer = document.getElementById("navContainer");
    // @ts-ignore
    const topPosition = navContainer.offsetTop;
    // @ts-ignore
    const totalHeight = navContainer.getBoundingClientRect().height;
    const thisBottom = topPosition + totalHeight;

    navLinks.forEach((link: { link: string; position: number }) => {
      const linkElement = document.getElementById(link.link);
      // @ts-ignore
      const thisTop = linkElement.offsetTop - 85;
      link.position = thisTop;
    });

    const visibleHeight = window.innerHeight;
    const barElement = document.getElementById("navPositionBar");
    const barHeight = barElement?.getBoundingClientRect().height;
    // @ts-ignore
    const sliderHeight = (visibleHeight / totalHeight) * barHeight;

    setSliderSx({
      ...sliderSx,
      // @ts-ignore
      height: sliderHeight < barHeight ? sliderHeight : barHeight, // number
    });

    setTopAndBottom((prevState) => ({
      ...prevState,
      top: topPosition,
      bottom: thisBottom,
    }));
    handleScroll();
  };

  const handleScroll = () => {
    const position = window.scrollY;

    const barElement = document.getElementById("navPositionBar");
    const barHeight = barElement?.getBoundingClientRect().height;

    if (position <= topAndBottomRef.current.top) {
      // @ts-ignore
      setSliderSx((prevState) => ({ ...prevState, mt: 0 }));
    }
    if (
      position > topAndBottomRef.current.top && // position is below the first element top
      position < topAndBottomRef.current.bottom - window.innerHeight // above the bottom element bottom
    ) {
      const pageHeight =
        topAndBottomRef.current.bottom - topAndBottomRef.current.top;
      const distanceDown =
        // @ts-ignore
        ((position - topAndBottomRef.current.top) / pageHeight) * barHeight - 2;

      // @ts-ignore

      setSliderSx((prevState) => ({
        ...prevState,
        mt: distanceDown.toString() + "px",
      }));
    }
    if (position > topAndBottomRef.current.bottom - window.innerHeight) {
      // @ts-ignore

      const distanceDown = barHeight - sliderSxRef.current.height;
      // @ts-ignore

      setSliderSx((prevState) => ({
        ...prevState,
        mt: distanceDown.toString() + "px",
      }));
    }
  };

  const scrollToHeading = (position: number): void => {
    scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleResize();
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const { setInPageNav } = useContext(PageNavContext);

  useEffect(() => {
    setInPageNav(true);
  }, []);

  const [pageNavOpen, setPageNavOpen] = useState(false);

  const openPageNav = () => {
    setPageNavOpen(!pageNavOpen);
  };

  const navBarList = (
    <List sx={{ p: 0 }}>
      {navLinks.map(({ icon, name, position }, i: number) => (
        <ListItem
          key={i}
          button
          sx={listItemSx}
          onClick={() => {
            scrollToHeading(position);
          }}
        >
          {icon && (
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
          )}
          <ListItemText
            primary={name}
            sx={{
              "& .MuiTypography-root": {
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: "400",
                fontSize: "20px",
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  const navBarListSmall = (
    <List sx={{ p: 0, position: "absolute", bottom: 80, right: 16 }}>
      {navLinks.map(({ icon, name, position }, i: number) => (
        <ListItem
          key={i}
          button
          sx={{ ...listItemSx }}
          onClick={() => {
            scrollToHeading(position);
            setPageNavOpen(!pageNavOpen);
          }}
        >
          <ListItemText
            primary={name}
            sx={{
              "& .MuiTypography-root": {
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: "400",
                fontSize: "20px",
              },
            }}
          />
          {icon && (
            <ListItemIcon sx={{ justifyContent: "flex-end" }}>
              <Icon>{icon}</Icon>
            </ListItemIcon>
          )}
        </ListItem>
      ))}
    </List>
  );

  if (useMediaQuery("(min-width:1100px)")) {
    return (
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Box
            sx={{
              position: "sticky",
              top: 100,
              background:
                "linear-gradient(130.4deg, rgba(7, 10, 17, 0.4) 14.89%, rgba(7, 10, 17, 0.2) 87.67%)",
              backdropFilter: "blur(5px)",
              borderRadius: "12px",
              zIndex: 3,
              p: "12px",
            }}
          >
            <Grid container>
              <Grid
                item
                sx={{ width: "3px", background: "#F8F8F8" }}
                id="navPositionBar"
              >
                <Box
                  sx={{ background: "#ED7E21", zIndex: "2", ...sliderSx }}
                ></Box>
              </Grid>
              <Grid item sx={{ maxWidth: "calc(100% - 3px)", flexGrow: 1 }}>
                {navBarList}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={9}>
          {children}
        </Grid>
      </Grid>
    );
  } else {
    return (
      <>
        {children}
        <Fade in={pageNavOpen} style={{ transitionDuration: "400ms" }}>
          <Box
            sx={{
              height: "100vh",
              width: "100vw",
              position: "fixed",
              bottom: 0,
              right: 0,
              zIndex: pageNavOpen ? "60" : "15",
              background: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(55px)",
              p: "24px",
            }}
          >
            {navBarListSmall}

            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                height: "45vh",
                width: "100vw",
                zIndex: "-1",
                background:
                  "linear-gradient(359.63deg, #ED7E21 10.26%, rgba(237, 126, 33, 0) 76.79%)",
              }}
            ></Box>
          </Box>
        </Fade>
        <NavPopup navOpen={pageNavOpen}>
          <Fab
            sx={{
              bgcolor: !pageNavOpen ? "#ED7E21" : "#FFFFFF",
              "&:hover:focus": {
                background: !pageNavOpen ? "#ED7E21" : "#fff",
              },
            }}
            aria-label="open in page navigation"
            onClick={() => openPageNav()}
          >
            <Box
              sx={{
                position: "absolute",
                width: "6px",
                height: "6px",
                borderRadius: "20px",
                backgroundColor: "#fff",
                transform: "rotate(270deg)",
                cursor: "pointer",
                "&::before, &::after": {
                  position: "absolute",
                  width: "6px",
                  height: "6px",
                  borderRadius: "20px",
                  backgroundColor: "#fff",
                  transform: "rotate(270deg)",
                  cursor: "pointer",
                  content: '""',
                  transition:
                    "transform 100ms ease-in-out, background-color 100ms ease-in-out",
                },
                "&::before": {
                  right: "10px",
                  ...(pageNavOpen && {
                    right: "-12px",
                    width: "30px",
                    backgroundColor: "#ED7E21",
                    transform: "rotate(225deg)",
                  }),
                },
                "&::after": {
                  left: "10px",
                  ...(pageNavOpen && {
                    left: "-12px",
                    width: "30px",
                    backgroundColor: "#ED7E21",
                    transform: "rotate(135deg)",
                  }),
                },
              }}
            ></Box>
          </Fab>
        </NavPopup>
      </>
    );
  }
};

export default PageNav;
