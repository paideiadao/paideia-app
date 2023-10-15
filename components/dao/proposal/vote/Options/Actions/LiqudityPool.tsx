import AbstractDate from "@components/creation/utilities/AbstractDate";
import BalanceInput from "@components/creation/utilities/BalanceInput";
import ContingencyFund from "@components/creation/utilities/ContingencyFund";
import DexSelector from "@components/creation/utilities/DexSelector";
import TokenPrice from "@components/creation/utilities/TokenPrice";
import TradingPairs from "@components/creation/utilities/TradingPairs";
import { deviceWrapper } from "@components/utilities/Style";
import { Box, Button, ButtonGroup } from "@mui/material";
import * as React from "react";
import {
  IContingency,
  ILiquidityPool,
  tokenTicker,
} from "../../YesNo/Actions/LiquidityPool";

interface IwLiquidityPool extends ILiquidityPool {
  set: (val: ILiquidityPool) => void;
}

const LiquidityPool: React.FC<IwLiquidityPool> = (props) => {
  const set = (val: any) => {
    props.set({
      isNew: props.isNew,
      tokenPrice: props.tokenPrice,
      tradingPair: props.tradingPair,
      dex: props.dex,
      startDate: props.startDate,
      treasuryAmount: props.treasuryAmount,
      balance: props.balance,
      contingency: props.contingency,
      ...val,
    });
  };
  return (
    <>
      <ButtonGroup variant="outlined" sx={{ width: "100%", mt: ".5rem" }}>
        <Button
          sx={{
            width: "50%",
            fontSize: ".8rem",
            backgroundColor: props.isNew ? "primary.selectedButton" : "",
          }}
          onClick={() =>
            set({
              isNew: true,
            })
          }
        >
          Create a Pool
        </Button>
        <Button
          disabled
          sx={{
            width: "50%",
            fontSize: ".8rem",
            backgroundColor: !props.isNew ? "primary.selectedButton" : "",
          }}
          onClick={() =>
            set({
              isNew: false,
            })
          }
        >
          Existing Pool
        </Button>
      </ButtonGroup>
      <Box
        sx={{ display: "flex", alignItems: "center", mt: "1rem", mb: "1rem" }}
      >
        <TokenPrice
          price={props.tokenPrice}
          set={(val: number) => set({ tokenPrice: val })}
          ticker="USD"
        />
        <TradingPairs
          tradingPair={props.tradingPair}
          tokenTicker={tokenTicker}
          set={(val: string) => set({ tradingPair: val })}
          c={1}
        />
        <DexSelector
          c={1}
          dex={props.dex}
          set={(val: string) => set({ dex: val })}
        />
      </Box>

      <BalanceInput
        width={deviceWrapper("47.25%", "32%")}
        total={props.treasuryAmount}
        remaining={props.treasuryAmount - props.balance}
        balance={props.balance}
        balanceOnly
        set={(newValue: any) => {
          set({ balance: newValue });
        }}
      />
      <AbstractDate
        value={props.startDate}
        setValue={(newValue: Date) => set({ startDate: newValue })}
        width="31.75%"
        label="Start date"
        mr=".5rem"
      />
      <Box sx={{ pb: "1rem" }} />
      <ContingencyFund
        tokenAmount={props.balance}
        tokenRemaining={props.treasuryAmount - props.balance}
        set={(val: IContingency) => set({ contingency: val })}
        contingency={props.contingency}
      />
    </>
  );
};

export default LiquidityPool;
