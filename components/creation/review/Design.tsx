import * as React from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Accordion, Box, Button, Typography } from "@mui/material";
import { Value, ImageWrapper } from "./ReviewDrawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { bytesToSize } from "@lib/creation/Utilities";
import { ITheme, themes } from "../design/Design";
import CircleIcon from "@mui/icons-material/Circle";
import { IFile, ISocialLink } from "@lib/creation/Interfaces";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import GitHubIcon from "@mui/icons-material/GitHub";
import DiscordIcon from "@components/svgs/DiscordIcon";
import MediumIcon from "@components/svgs/MediumIcon";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";
import { LightTheme } from "@theme/theme";

const ThemeIndicator: React.FC<{ theme: ITheme }> = (props) => {
  const themeContext = React.useContext<IThemeContext>(ThemeContext);
  return (
    <>
      <Box
        sx={{
          width: "2rem",
          height: "2rem",
          backgroundColor:
            themeContext.theme === LightTheme
              ? props.theme.secondary
              : props.theme.secondaryDark,
          borderRadius: "50%",
          position: "relative",
          mr: ".5rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor:
              themeContext.theme === LightTheme
                ? props.theme.primary
                : props.theme.primaryDark,
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
            borderRadius: "50%",
          }}
        ></Box>
      </Box>
      {props.theme.label}
    </>
  );
};

const BannerPreview: React.FC<{ data: IFile }> = (props) => {
  return props.data.file !== null ? (
    <Box sx={{ width: "100%" }}>
      <img
        src={props.data.url}
        alt="Picture of the author"
        style={{
          borderRadius: ".2rem",
        }}
        width="1200rem"
        height="410rem"
      />
      <Box
        sx={{
          height: "3rem",
          pl: "0rem",
          pr: "1rem",
          display: "flex",
          width: "100%",
        }}
      >
        <Box sx={{ mt: ".2rem" }}>
          {props.data.file.name}
          <Box sx={{ color: "text.secondary", fontSize: ".9rem" }}>
            {props.data.file === undefined || props.data.file === -1
              ? "File Max size 1Mb. Dimensions 48px by 48px."
              : bytesToSize(props.data.file.size)}
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

export const ShowHide: React.FC<{ value: boolean }> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: props.value ? "text.secondarySuccess" : "error.main",
        fontSize: ".9rem",
        fontWeight: 550,
      }}
    >
      <CircleIcon
        // @ts-ignore
        color={props.value ? "success" : "error.main"}
        sx={{ fontSize: ".9rem", mr: ".5rem" }}
      />
      {props.value ? "Show" : "Hide"}
    </Box>
  );
};

export const getIcon = (network: string) => {
  let fontSize = { fontSize: "2rem" };
  switch (network) {
    case "reddit": {
      return <RedditIcon sx={fontSize} />;
    }
    case "youtube": {
      return <YouTubeIcon sx={fontSize} />;
    }
    case "telegram": {
      return <TelegramIcon sx={fontSize} />;
    }
    case "twitter": {
      return <TwitterIcon sx={fontSize} />;
    }
    case "discord": {
      return <DiscordIcon sx={fontSize} />;
    }
    case "medium": {
      return <MediumIcon sx={fontSize} />;
    }
    case "github": {
      return <GitHubIcon sx={fontSize} />;
    }
    case "facebook": {
      return <FacebookIcon sx={fontSize} />;
    }
    case "instagram": {
      return <InstagramIcon sx={fontSize} />;
    }
  }
};

export const SocialLinksPreview: React.FC<{ links: ISocialLink[] }> = (
  props
) => {
  return (
    <Box sx={{ width: "75%" }}>
      {props.links.map((i: ISocialLink, c: number) => {
        return (
          <Box
            key={`distribution-id-${c}`}
            sx={{
              borderRadius: ".2rem",
              border: ".1rem solid",
              borderColor: "border.main",
              mb: ".5rem",
              p: ".5rem",
              pl: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "15%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {getIcon(i.socialNetwork)}
            </Box>
            <Box>
              <Box sx={{ fontSize: ".9rem" }}>{i.address}</Box>
              <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
                {i.socialNetwork.charAt(0).toUpperCase() +
                  i.socialNetwork.slice(1)}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

const Design: React.FC<{
  data: any;
  expanded: string | boolean;
  handleChange: Function;
  edit: Function;
}> = (props) => {
  let data = props.data;
  return (
    <Accordion
      elevation={0}
      disableGutters
      expanded={props.expanded === "design"}
      onChange={props.handleChange("design")}
      sx={{
        backgroundColor: "fileInput.outer",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="design-header">
        <CheckCircleIcon color="success" sx={{ mr: "1rem" }} />
        <Typography sx={{ width: "100%", flexShrink: 0, fontSize: "1.1rem" }}>
          4. DAO Design
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: "100%" }}>
          <Value
            labelWidth="26%"
            title="Theme"
            component={
              <ThemeIndicator
                theme={
                  themes.filter((i: any) => i.id === props.data.design.theme)[0]
                }
              />
            }
          />
          <Value
            labelWidth="26%"
            title="Logo"
            component={
              data.design.logo.file !== null ? (
                <ImageWrapper
                  size={bytesToSize(data.design.logo.file.size)}
                  img={data.design.logo.url}
                  name={data.design.logo.file.name}
                />
              ) : (
                <></>
              )
            }
          />
          <Value
            labelWidth="26%"
            title="Banner"
            component={<ShowHide value={data.design.banner.show} />}
          />
          {data.design.banner.show && (
            <Value
              labelWidth="35%"
              title="Banner media"
              component={<BannerPreview data={data.design.banner.data} />}
            />
          )}
          <Value
            labelWidth="26%"
            title="Footer"
            component={<ShowHide value={data.design.footer.show} />}
          />
          {data.design.footer.show && (
            <>
              <Value
                labelWidth="26%"
                title="Footer main text"
                value={data.design.footer.mainText}
              />
              {data.design.footer.links.length > 0 && (
                <Value
                  labelWidth="26%"
                  title="Footer social links"
                  component={
                    <SocialLinksPreview links={data.design.footer.links} />
                  }
                />
              )}
            </>
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: ".5rem",
          }}
        >
          <Button onClick={() => props.edit(3)}>
            Edit Section
            <EditIcon sx={{ ml: ".5rem" }} />
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Design;
