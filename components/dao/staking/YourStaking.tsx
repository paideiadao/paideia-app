import { Subheader } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import { Box } from "@mui/material";
import * as React from "react";
import { InfoCard } from "./GeneralInfo";

const YourStaking: React.FC = () => {
  const ticker = "PAI";
  return (
    <Box>
      <Subheader title="Your staking" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexWrap: deviceWrapper("wrap", "nowrap"),
        }}
      >
        <InfoCard value="32,661" title={`${ticker} tokens staked`} c={0} />
        <InfoCard value="2,567" title={`${ticker} tokens earned`} c={1} />
        <InfoCard
          c={2}
          full
          value={`≈3,661`}
          title={`Earned tokens`}
          dropdown
          last
        />
      </Box>
    </Box>
  );
};

export default YourStaking;
