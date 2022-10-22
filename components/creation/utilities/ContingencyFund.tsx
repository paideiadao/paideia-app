import { IContingency } from "@components/dao/proposal/vote/YesNo/Actions/LiquidityPool";
import { Alert, AlertTitle, Box } from "@mui/material";
import * as React from "react";
import PercentageInput from "./PercentageInput";

interface IContingencyFund {
  tokenAmount: number;
  tokenRemaining: number;
  set: (val: IContingency) => void;
  contingency: IContingency;
}

const ContingencyFund: React.FC<IContingencyFund> = (props) => {
  return (
    <>
      <Alert
        severity="warning"
        color="warning"
        sx={{
          width: "calc(100%)",
          fontSize: ".8rem",
        }}
      >
        <AlertTitle sx={{ fontSize: ".9rem" }}>
          Contingency fund needed
        </AlertTitle>
        By choosing a different denomication to value the trading pair, you must
        set a contingency fund in case the token price goes down. Choose a
        percentage to put aside, and any remainder will be returned to the
        treasury after liquidity is added to the dex. If the price falls too far
        and over-draws the contingency fund, fewer tokens will be added as
        liquidity than you set here.
      </Alert>
      <Box sx={{ width: "100%", pt: "1rem", pb: ".75rem" }}>
        <PercentageInput
          label="Contingency fund"
          width="31.75%"
          total={props.tokenAmount}
          remaining={props.tokenRemaining}
          percentage={props.contingency.percentage}
          value={props.contingency}
          set={(contingency: IContingency) => props.set(contingency)}
        />
      </Box>
    </>
  );
};

export default ContingencyFund;
