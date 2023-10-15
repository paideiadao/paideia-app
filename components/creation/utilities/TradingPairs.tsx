import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import * as React from "react";

interface ITradingPairs {
  tradingPair: string;
  tokenTicker: string;
  set: (val: string) => void;
  c: number;
}

const TradingPairs: React.FC<ITradingPairs> = (props) => {
  return (
    <FormControl sx={{ width: "32%", mr: ".5rem" }}>
      <InputLabel htmlFor={`trading-pair-label-${props.c}`} shrink>
        Trading Pair
      </InputLabel>
      <Select
        labelId={`trading-pair-label-${props.c}`}
        id={`trading-pair-${props.c}`}
        variant="outlined"
        label="Trading pair"
        value={props.tradingPair}
        sx={{ height: "100%", color: "text.primary" }}
        onChange={(e: any) => props.set(e.target.value)}
      >
        <MenuItem value={`${props.tokenTicker.toLowerCase()}/erg`}>
          {props.tokenTicker.toUpperCase()}/ERG
        </MenuItem>
        <MenuItem value={`${props.tokenTicker.toLowerCase()}/sigusd`}>
          {props.tokenTicker.toUpperCase()}/SIGUSD
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default TradingPairs;
