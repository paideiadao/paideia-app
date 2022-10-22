import React, { FC, useEffect, useState, useRef } from "react";
import { Button, Container, Box, Fab } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { deviceWrapper } from "./utilities/Style";

interface SliderProps {
  buttonTop?: boolean;
  uniqueId: string;
  addMargin?: number;
  contained?: boolean;
  header?: JSX.Element;
}

const CardSlider: FC<SliderProps> = ({
  children,
  buttonTop,
  uniqueId,
  addMargin,
  contained,
  header,
}) => {
  const [marginLeftCalc, setMarginLeftCalc] = useState({ px: "0px" });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [leftDisabled, setLeftDisabled] = useState(false);
  const [rightDisabled, setRightDisabled] = useState(false);
  const [slideDistance, setSlideDistance] = useState(460);

  const handleScroll = () => {
    const scroll: HTMLElement | null = document.getElementById(
      uniqueId + "pnProductNav"
    );
    scroll && setScrollPosition(scroll.scrollLeft);
  };

  const determineOverflow = (content: any, container: any) => {
    const containerMetrics = container.getBoundingClientRect();

    const containerMetricsRight = Math.floor(containerMetrics.right);
    const containerMetricsLeft = Math.floor(containerMetrics.left);
    const contentMetrics = content.getBoundingClientRect();
    const contentMetricsRight = Math.floor(contentMetrics.right);
    const contentMetricsLeft = Math.floor(contentMetrics.left);

    if (
      containerMetricsLeft > contentMetricsLeft &&
      containerMetricsRight < contentMetricsRight
    ) {
      setLeftDisabled(false);
      setRightDisabled(false);
    } else if (contentMetricsLeft < containerMetricsLeft) {
      setRightDisabled(true);
    } else if (contentMetricsRight > containerMetricsRight) {
      setLeftDisabled(true);
    } else {
      setLeftDisabled(true);
      setRightDisabled(true);
    }
  };

  const marginFunction = () => {
    const pnArrowContainer = document.getElementById(
      uniqueId + "pnArrowContainer"
    );
    let margin = 24;
    if (!contained && pnArrowContainer) {
      margin =
        pnArrowContainer.getBoundingClientRect().left +
        (addMargin ? addMargin : 0);
    }
    setMarginLeftCalc({ ...marginLeftCalc, px: margin.toString() + "px" });
    const containerWidth = document.getElementById("setWidth");
    containerWidth && setSlideDistance(containerWidth.offsetWidth - margin);
  };

  useEffect(() => {
    const pnProductNav = document.getElementById(uniqueId + "pnProductNav");
    if (pnProductNav) {
      pnProductNav.addEventListener("scroll", handleScroll);
      return () => {
        pnProductNav.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    const pnProductNav = document.getElementById(uniqueId + "pnProductNav");
    const pnProductNavContents = document.getElementById(
      uniqueId + "pnProductNavContents"
    );
    determineOverflow(pnProductNavContents, pnProductNav);
  }, [scrollPosition]);

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", marginFunction);
    // Call handler right away so state gets updated with initial window size
    marginFunction();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", marginFunction);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      marginFunction();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  interface IPos {
    left: number | undefined;
    x: number | undefined;
  }

  const [pos, setPos] = useState<IPos>({
    left: undefined,
    x: undefined,
  });

  const posRef = useRef<IPos>({
    left: undefined,
    x: undefined,
  });
  posRef.current = pos;

  const handleMouseDown = (e: any) => {
    const pnProductNav = document.getElementById(uniqueId + "pnProductNav");
    if (pnProductNav) {
      pnProductNav.style.cursor = "grabbing";
      pnProductNav.style.userSelect = "none";

      const mouseMoveHandler = (e: any) => {
        pnProductNav.scrollLeft =
          posRef.current.left - (e.clientX - posRef.current.x);
      };

      const mouseUpHandler = (e: any) => {
        pnProductNav.style.cursor = "grab";
        pnProductNav.style.userSelect = "none";
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    }
    setPos({
      // The current scroll
      left: scrollPosition,
      // Get the current mouse position
      x: e.clientX,
    });
  };

  const clickLeft = () => {
    const pnProductNav = document.getElementById(uniqueId + "pnProductNav");
    pnProductNav &&
      pnProductNav.scrollTo({
        left: scrollPosition - slideDistance,
        behavior: "smooth",
      });
  };

  const clickRight = () => {
    const pnProductNav = document.getElementById(uniqueId + "pnProductNav");
    pnProductNav &&
      pnProductNav.scrollTo({
        left: scrollPosition + slideDistance,
        behavior: "smooth",
      });
  };

  const ButtonBox = () => {
    return (
      <Container
        id={uniqueId + "pnArrowContainer"}
        // maxWidth="lg"
        sx={{
          my: buttonTop ? "0" : "32px",
          p: 0,
        }}
      >
        <Box
          sx={
            buttonTop
              ? {
                  display: "flex",
                  alignItems: "center",
                  mt: ".75rem",
                  mb: ".25rem",
                  ml: deviceWrapper("0", "-1rem"),
                  mr: deviceWrapper("0", "-1rem"),
                }
              : {
                  mx: { xs: "24px", sm: "0px" },
                }
          }
        >
          {header}
          {/* design change here */}
          <Fab
            onClick={clickLeft}
            disabled={leftDisabled}
            color="primary"
            sx={{ mr: ".5rem", zIndex: 1 }}
            size="small"
          >
            <ArrowBackIosIcon sx={{ mr: "-.5rem" }} />
          </Fab>
          <Fab
            onClick={clickRight}
            disabled={rightDisabled}
            color="primary"
            size="small"
            sx={{ zIndex: 1 }}
          >
            <ArrowForwardIosIcon />
          </Fab>
        </Box>
      </Container>
    );
  };
  const temp = buttonTop ? { pl: "0rem" } : {};

  return (
    <>
      <Container
        maxWidth="lg"
        id="setWidth"
        sx={{ zIndex: "1", width: "100vw" }}
      ></Container>
      {buttonTop && <ButtonBox />}
      <Box
        sx={{
          /* Make this scrollable when needed */
          overflowX: "auto",
          /* We don't want vertical scrolling */
          overflowY: "hidden",
          cursor: "grab",
          /* Make an auto-hiding scroller for the 3 people using a IE */
          msOverflowStyle: "-ms-autohiding-scrollbar",
          /* For WebKit implementations, provide inertia scrolling */
          WebkitOverflowScrolling: "touch",
          /* We don't want internal inline elements to wrap */
          whiteSpace: "nowrap",
          /* Remove the default scrollbar for WebKit implementations */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          maxWidth: buttonTop ? "100%" : "100vw",
          ml: contained ? "-24px" : "0",
        }}
        id={uniqueId + "pnProductNav"}
        onMouseDown={(e) => handleMouseDown(e)}
      >
        <Box
          id={uniqueId + "pnProductNavContents"}
          display="flex"
          sx={{
            width: "min-content",
            gap: "24px",
            ...marginLeftCalc,
            ...temp,
          }}
        >
          {children}
        </Box>
      </Box>
      {!buttonTop && <ButtonBox />}
    </>
  );
};

export default CardSlider;
