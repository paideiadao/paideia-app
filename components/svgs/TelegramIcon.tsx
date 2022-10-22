import React, { FC } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { SxProps } from "@mui/material";

const TelegramIcon: FC<{ sx?: SxProps }> = ({ sx }) => {
  return (
    <SvgIcon sx={sx}>
      <path d="M20.665 3.71706L2.93497 10.5541C1.72497 11.0401 1.73197 11.7151 2.71297 12.0161L7.26497 13.4361L17.797 6.79106C18.295 6.48806 18.75 6.65106 18.376 6.98306L9.84297 14.6841H9.84097L9.84297 14.6851L9.52897 19.3771C9.98897 19.3771 10.192 19.1661 10.45 18.9171L12.661 16.7671L17.26 20.1641C18.108 20.6311 18.717 20.3911 18.928 19.3791L21.947 5.15106C22.256 3.91206 21.474 3.35106 20.665 3.71706V3.71706Z" />
    </SvgIcon>
  );
};

export default TelegramIcon;
