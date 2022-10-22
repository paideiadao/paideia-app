import { Box } from "@mui/material";
import * as React from "react";
import { ITokenomics } from "@lib/creation/Interfaces";
import { CreationContext } from "../../../../lib/creation/Context";
import { IData } from "@lib/Interfaces";
import { LearnMore, Subtitle } from "../../utilities/HeaderComponents";
import TokenomicSummary from "./TokenomicSummary";
import { deviceStruct } from "@components/utilities/Style";

const AdvancedTokenomics: React.FC<IData<ITokenomics>> = (props) => {
  let creationContext = React.useContext(CreationContext);
  let data = props.data;
  let globalData = creationContext.api.data;
  return (
    <Box sx={{ mt: ".5rem" }}>
      <Box
        sx={{
          display: deviceStruct("none", "none", "block", "block", "block"),
        }}
      >
        <LearnMore
          title="Set advanced tokenomics"
          tooltipTitle="Title Here"
          tooltipText="Content here."
          tooltipLink="/here"
        />
      </Box>
      <Box
        sx={{ display: deviceStruct("block", "block", "none", "none", "none") }}
      >
        <LearnMore
          title="Advanced tokenomics"
          tooltipTitle="Title Here"
          tooltipText="Content here."
          tooltipLink="/here"
        />
      </Box>

      <Subtitle subtitle="Here you can create public & private sales, airdrops, stacking pools, provide liquidity, distribute and divide your treasury into different pockets, and set aside tokens for team & partners." />
      {data.activateTokenomics && (
        <>
          <TokenomicSummary {...props} />
        </>
      )}
    </Box>
  );
};

export default AdvancedTokenomics;
