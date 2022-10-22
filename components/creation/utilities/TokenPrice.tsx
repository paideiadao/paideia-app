import { Box, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";

interface ITokenPrice {
  price: number;
  set: (val: number) => void;
  ticker: string;
}

const TokenPrice: React.FC<ITokenPrice> = (props) => {
  return (
    <TextField
      value={props.price === undefined ? "" : props.price}
      type="number"
      sx={{ width: "32%", mr: ".5rem" }}
      onChange={(e: any) => {
        props.set(parseFloat(e.target.value));
      }}
      label="Token Price"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Box sx={{ color: "text.secondary" }}>{props.ticker}</Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TokenPrice;
