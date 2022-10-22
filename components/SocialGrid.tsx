import React, { FC } from "react";
import { Grid, Link } from "@mui/material";
import TelegramIcon from "@components/svgs/TelegramIcon";
import YoutubeIcon from "@components/svgs/YoutubeIcon";
import MediumIcon from "@components/svgs/MediumIcon";
import TwitterIcon from "@components/svgs/TwitterIcon";
import DiscordIcon from "@components/svgs/DiscordIcon";
import { DarkTheme } from "@theme/theme";

interface Props {
  hoverColor?: string;
}

const SocialGrid: FC<Props> = ({ hoverColor }) => {
  const iconLinkStyles = {
    color: DarkTheme.palette.text.primary,
    fontSize: "inherit",
    "&:hover": {
      color: hoverColor ? hoverColor : DarkTheme.palette.primary.main,
    },
  };

  return (
    <>
      <Grid item>
        <Link
          href="https://t.me/paideiaDAO"
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <TelegramIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>
      <Grid item>
        <Link
          href="https://discord.gg/J3KDrtCFEn"
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <DiscordIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>
      <Grid item>
        <Link
          href="https://twitter.com/PaideiaDAO"
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <TwitterIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>
      <Grid item>
        <Link
          href="https://www.youtube.com/channel/UC4SUgJTznlIg6masMVX1hXA"
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        >
          <YoutubeIcon sx={{ fontSize: "inherit" }} />
        </Link>
      </Grid>
      <Grid item>
        {/* <Link
          href="/"
          target="_blank"
          sx={iconLinkStyles}
          rel="noreferrer"
        > */}
        <MediumIcon sx={{ color: "#aaa", fontSize: "inherit" }} />
        {/*  </Link> */}
      </Grid>
    </>
  );
};

export default SocialGrid;
