import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import TokenPrice from "@components/creation/utilities/TokenPrice";
import TradingPairs from "@components/creation/utilities/TradingPairs";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, Button, ButtonGroup } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";
import { ISendFunds } from "./SendFunds";
import DexSelector from "@components/creation/utilities/DexSelector";
import AbstractDate from "@components/creation/utilities/AbstractDate";
import { deviceWrapper } from "@components/utilities/Style";
import BalanceInput from "@components/creation/utilities/BalanceInput";
import ContingencyFund from "@components/creation/utilities/ContingencyFund";
import LiquidityPool from "../../Options/Actions/LiqudityPool";

export interface ILiquidityPool {
  isNew: boolean;
  tokenPrice: number;
  tradingPair: string;
  dex: string;
  startDate: Date;
  treasuryAmount: number;
  balance: number;
  contingency: IContingency;
}

export interface IContingency {
  percentage: number;
  balance: number;
}

export const tokenTicker = "PAI";
export const tempDate = new Date();
tempDate.setDate(tempDate.getDate() + 10);

export const defaultLiquidityPoolData: ILiquidityPool = {
  isNew: true,
  tokenPrice: 0,
  tradingPair: tokenTicker.toLowerCase() + "/erg",
  dex: "spectrum",
  startDate: tempDate,
  treasuryAmount: 50000,
  balance: 0,
  contingency: {
    balance: 0,
    percentage: 0,
  },
};

const LiquidityPoolAction: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);

  const [value, setValue] = React.useState<ILiquidityPool>(
    defaultLiquidityPoolData
  );

  React.useEffect(() => {
    const temp = [...(context.api?.value.actions ?? [])];
    temp[props.c ?? 0].data = value;
    context.api?.setValue({
      ...context.api.value,
      actions: temp,
    });
  }, [value]);
  let isNew = value.isNew;
  return (
    <Layout>
      <Header
        title="Liquidity Pool"
        large
        subtitle="Create a liquidity pool or add to an existing pool."
        mb="0"
      />
      <Box
        sx={{
          width: "calc(100% + 1rem)",
          ml: "-.5rem",
          borderBottom: 1,
          borderColor: "border.main",
          mt: ".5rem",
          mb: "1rem",
        }}
      />
      <CapsInfo title="Configuration" mb=".5rem" />
      <LiquidityPool
        set={(val: ILiquidityPool) => {
          setValue(val);
        }}
        isNew={value.isNew}
        tokenPrice={value.tokenPrice}
        tradingPair={value.tradingPair}
        dex={value.dex}
        startDate={value.startDate}
        treasuryAmount={value.treasuryAmount}
        balance={value.balance}
        contingency={value.contingency}
      />
      <ButtonGroup variant="outlined" sx={{ width: "100%", mt: ".5rem" }}>
        <Button
          sx={{
            width: "50%",
            fontSize: ".8rem",
            backgroundColor: isNew ? "primary.selectedButton" : "",
          }}
          onClick={() =>
            setValue({
              ...value,
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
            backgroundColor: !isNew ? "primary.selectedButton" : "",
          }}
          onClick={() =>
            setValue({
              ...value,
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
          price={value.tokenPrice}
          set={(val: number) => setValue({ ...value, tokenPrice: val })}
          ticker="USD"
        />
        <TradingPairs
          tradingPair={value.tradingPair}
          tokenTicker={tokenTicker}
          set={(val: string) => setValue({ ...value, tradingPair: val })}
          c={props.c ?? 0}
        />
        <DexSelector
          c={props.c ?? 0}
          dex={value.dex}
          set={(val: string) => setValue({ ...value, dex: val })}
        />
      </Box>

      <BalanceInput
        width={deviceWrapper("47.25%", "32%")}
        total={value.treasuryAmount}
        remaining={value.treasuryAmount - value.balance}
        balance={value.balance}
        balanceOnly
        set={(newValue: any) => {
          setValue({ ...value, balance: newValue });
        }}
      />
      <AbstractDate
        value={value.startDate}
        setValue={(newValue: Date) =>
          setValue({ ...value, startDate: newValue })
        }
        width="31.75%"
        label="Start date"
        mr=".5rem"
      />
      <Box sx={{ pb: "1rem" }} />
      <ContingencyFund
        tokenAmount={value.balance}
        tokenRemaining={value.treasuryAmount - value.balance}
        set={(val: IContingency) => setValue({ ...value, contingency: val })}
        contingency={value.contingency}
      />
    </Layout>
  );
};

export default LiquidityPoolAction;
