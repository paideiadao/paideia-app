import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Grid,
  Skeleton,
} from "@mui/material";
import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Link from "next/link";
import { deviceStruct, deviceWrapper } from "@components/utilities/Style";

export const Header: React.FC<{
  title: string;
  subtitle?: string;
  small?: boolean;
  large?: boolean;
  mb?: string | any;
  bold?: boolean;
  mt?: string | any;
}> = (props) => {
  return props.subtitle === undefined ? (
    <Box
      sx={{
        fontSize:
          props.large === true
            ? "1.3rem"
            : props.small === undefined
            ? "1.1rem"
            : deviceWrapper(".9rem", "1.1rem"),
        fontWeight: props.bold ? 550 : 500,
        color: "text.primary",
      }}
    >
      {props.title === undefined ? (
        <Skeleton animation="wave" height="1.6rem" width="6rem" />
      ) : (
        props.title
      )}
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        mt: props.mt === undefined ? ".5rem" : props.mt,
        mb: ".5rem",
      }}
    >
      <Typography
        sx={{
          fontSize:
            props.large === true
              ? "1.3rem"
              : props.small === undefined
              ? "1.1rem"
              : deviceWrapper(".9rem", "1.1rem"),
          color: "text.primary",
          mb: props.mb === undefined ? ".5rem" : props.mb,
        }}
      >
        {props.title === undefined ? (
          <Skeleton animation="wave" height="1.6rem" width="5rem" />
        ) : (
          props.title
        )}
      </Typography>
      <Subtitle subtitle={props.subtitle} small={props.small} />
    </Box>
  );
};

export const CapsInfo: React.FC<{
  title: string;
  small?: boolean;
  mb?: string;
  fontSize?: string;
}> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        color: "text.primary",
        opacity: ".8",
        fontSize:
          props.fontSize === undefined
            ? props.small === undefined
              ? ".8rem"
              : ".7rem"
            : props.fontSize,
        fontWeight: 400,
        mb: props.mb === undefined ? "1rem" : props.mb,
      }}
    >
      {props.title.toUpperCase()}
    </Box>
  );
};

export const Subtitle: React.FC<{ subtitle: string; small?: boolean }> = (
  props
) => {
  return (
    <Box
      sx={{
        width: "100%",
        color: "text.secondary",
        fontSize: props.small
          ? deviceStruct(".7rem", ".7rem", ".8rem", ".8rem", ".8rem")
          : deviceStruct(".7rem", ".7rem", ".9rem", ".9rem", ".9rem"),
      }}
    >
      {props.subtitle}
    </Box>
  );
};

export const Subheader: React.FC<{
  title: string;
  small?: boolean;
  bold?: boolean;
  light?: boolean;
}> = (props) => {
  return (
    <Box
      sx={{
        color: "text.primary",
        fontSize: props.small
          ? deviceStruct(".8rem", ".8rem", ".9rem", ".9rem", ".9rem")
          : deviceStruct("1.05rem", "1.05rem", "1.1rem", "1.1rem", "1.1rem"),
        fontWeight: props.bold ? 500 : 400,
        display: "flex",
        alignItems: "center",
      }}
    >
      {props.title}
    </Box>
  );
};

export interface ITooltipSteps {
  id: number;
  text: string;
}

export const LearnMore: React.FC<{
  title: string;
  small?: boolean;
  light?: boolean;
  tooltipTitle?: string;
  tooltipText: string;
  toolTipSteps?: ITooltipSteps[];
  tooltipLink?: string;
}> = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const mdUp = useMediaQuery("(min-width:400px)");
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mt: "1rem",
          mb: ".5rem",
          position: "relative",
        }}
      >
        <Grid item>
          <Subheader
            title={props.title}
            small={props.small}
            light={props.light}
          />
        </Grid>
        <Grid item>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Box
              sx={{
                ml: "auto",
                minWidth: deviceStruct("40%", "40%", "", "", ""),
              }}
            >
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                placement="top-end"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "fileInput.main",
                      minWidth: "260px",
                      ...(mdUp && { maxWidth: "600px" }),
                      "& .MuiTooltip-arrow": {
                        color: "fileInput.main",
                        width: "126px",
                        fontSize: "1.5rem",
                        my: "-18px !important",
                      },
                    },
                  },
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <Box
                    sx={{
                      p: "6px",
                      m: 0,
                      color: "text.primary",
                      // minWidth: "25rem",
                      fontSize: "1rem",
                      fontWeight: 400,
                    }}
                  >
                    <Typography variant="h6">{props.tooltipTitle}</Typography>
                    <Typography
                      sx={{
                        fontSize: ".9rem",
                        color: "text.secondary",
                        // width: "100%",
                        mb: "12px",
                      }}
                    >
                      {props.tooltipText}
                    </Typography>
                    <Box sx={{ width: "100%", display: "flex" }}>
                      {props.tooltipLink && (
                        <Link href={props.tooltipLink} passHref>
                          <a target="_blank" style={{ textDecoration: "none" }}>
                            <Button size="small">Learn More</Button>
                          </a>
                        </Link>
                      )}
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ ml: "auto" }}
                        onClick={handleTooltipClose}
                      >
                        Got it
                      </Button>
                    </Box>
                  </Box>
                }
              >
                <Button
                  onClick={handleTooltipOpen}
                  size="small"
                  endIcon={<InfoIcon />}
                >
                  Learn More{" "}
                </Button>
              </Tooltip>
            </Box>
          </ClickAwayListener>
        </Grid>
      </Grid>
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1000,
            backgroundColor: "black",
            opacity: ".8",
          }}
        ></Box>
      )}
    </>
  );
};
