import React, { FC } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { SxProps } from "@mui/material";

interface IProps {
  sx?: SxProps;
}

const Paideia: FC<IProps> = ({ sx }) => {
  return (
    <SvgIcon sx={sx}>
      <rect width="3.56138" height="16.1036" rx="0.5" />
      <rect x="12.6965" y="7.89648" width="3.56138" height="16.1036" rx="0.5" />
      <rect x="6.34839" width="3.56138" height="9.75509" rx="0.5" />
      <rect x="6.34839" y="14.2446" width="3.56138" height="9.75509" rx="0.5" />
    </SvgIcon>
  );
};

export default Paideia;
