import {
  Box,
  Button,
  InputAdornment,
  TextField,
  AlertTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import * as React from "react";
import { ITokenomics } from "@lib/creation/Interfaces";
import { IData } from "@lib/Interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import { CapsInfo, Header } from "../../utilities/HeaderComponents";
import BalanceInput from "../../utilities/BalanceInput";
import PercentageInput from "../../utilities/PercentageInput";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Alert from "@mui/material/Alert";
import AbstractDate from "../../utilities/AbstractDate";
import useDidMountEffect from "../../../utilities/hooks";
import DistributionName from "../../utilities/DistributionName";
import TokenPrice from "@components/creation/utilities/TokenPrice";
import TradingPairs from "@components/creation/utilities/TradingPairs";
import DexSelector from "@components/creation/utilities/DexSelector";

export interface ILiquidityInfo {
  distributionName: string;
  balance: number;
  percentage: number;
  tokenPrice: number;
  tradingPair: string;
  dex: string;
  liquidityStartDate: Date;
  contingency: {
    percentage: number;
    balance: number;
  };
  id: string;
}

const Liquidity: React.FC<{
  data: IData<ITokenomics>;
  close: Function;
  c: number;
}> = (props) => {
  let data = props.data.data;
  let start = new Date();
  let temp: any = data.distributions[props.c];

  const [value, setValue] = React.useState<ILiquidityInfo>({
    distributionName:
      data.distributions[props.c] === undefined
        ? `Liquidity`
        : temp.distributionName,
    balance: data.distributions[props.c] === undefined ? 0 : temp.balance,
    percentage: data.distributions[props.c] === undefined ? 0 : temp.percentage,
    tokenPrice: data.distributions[props.c] === undefined ? 0 : temp.tokenPrice,
    tradingPair:
      data.distributions[props.c] === undefined
        ? `${data.tokenTicker.toLowerCase()}/erg`
        : temp.tradingPair,
    dex: data.distributions[props.c] === undefined ? "spectrum" : temp.dex,
    liquidityStartDate:
      data.distributions[props.c] === undefined
        ? start
        : temp.liquidityStartDate,
    contingency: {
      percentage:
        data.distributions[props.c] === undefined ? 0 : temp.percentage,
      balance: data.distributions[props.c] === undefined ? 0 : temp.balance,
    },
    id: "Liquidity",
  });

  React.useEffect(() => {
    /// add data to global context...
    let temp = [...data.distributions];
    temp[props.c] = { ...value };
    props.data.setData({
      ...data,
      distributions: temp,
    });
  }, [value]);

  useDidMountEffect(() => {
    setValue({
      ...value,
      balance: props.data.data.distributions[props.c].balance,
    });
  }, [props.data.data.distributions]);

  return (
    <>
      <DeleteIcon
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
        }}
        color="error"
        onClick={() => props.close()}
      />

      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid",
          borderColor: "border.main",
          mb: "1rem",
          pl: "1rem",
        }}
      >
        <Header
          title="Liquidity"
          subtitle="Set aside tokens to provide liquidity to a specific trading pair inside a selected DEX."
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          pl: "1rem",
          pr: "1rem",
          borderBottom: "1px solid",
          borderColor: "border.main",
          mb: "1rem",
          pb: "1rem",
        }}
      >
        <CapsInfo title="General Information" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: ".5rem",
            mb: ".5rem",
          }}
        >
          <DistributionName
            c={props.c}
            value={value.distributionName}
            set={(e: any) => {
              setValue({ ...value, distributionName: e });
            }}
          />
          <BalanceInput
            total={data.tokenAmount}
            remaining={data.tokenRemaining}
            balance={value.balance}
            value={value}
            set={setValue}
          />
          <PercentageInput
            total={data.tokenAmount}
            remaining={data.tokenRemaining}
            percentage={value.percentage}
            value={value}
            set={setValue}
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", pl: "1rem", pr: "1rem" }}>
        <CapsInfo title="Configuration" />
        <TokenPrice
          price={value.tokenPrice}
          set={(val: number) => setValue({ ...value, tokenPrice: val })}
          ticker="USD"
        />
        <TradingPairs
          tradingPair={value.tradingPair}
          tokenTicker={data.tokenTicker}
          set={(val: string) => setValue({ ...value, tradingPair: val })}
          c={props.c}
        />
        <DexSelector
          c={props.c}
          dex={value.dex}
          set={(val: string) => setValue({ ...value, dex: val })}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          pl: "1rem",
          mt: "1rem",
          mb: "1rem",
          pb: "1rem",
        }}
      >
        <AbstractDate
          value={value.liquidityStartDate}
          setValue={(newValue: Date) =>
            setValue({ ...value, liquidityStartDate: newValue })
          }
          width="31.75%"
          label="Start date"
          mr=".5rem"
        />
      </Box>
      <Alert
        severity="warning"
        color="warning"
        sx={{
          mr: "1rem",
          ml: "1rem",
          mb: "1rem",
          width: "100%",
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
      <Box sx={{ width: "100%", pl: "1rem", pb: "1rem" }}>
        <PercentageInput
          label="Contingency fund"
          width="31.75%"
          total={data.tokenAmount}
          remaining={data.tokenRemaining}
          percentage={value.contingency.percentage}
          value={value.contingency}
          set={(temp: any) => setValue({ ...value, contingency: { ...temp } })}
        />
      </Box>
    </>
  );
};

export default Liquidity;
