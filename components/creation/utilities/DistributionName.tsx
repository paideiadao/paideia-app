import { Box, InputAdornment, TextField } from "@mui/material";
import * as React from "react";

const DistributionName: React.FC<{
  c: number;
  set: Function;
  value: string;
}> = (props) => {
  return (
    <TextField
      value={props.value}
      sx={{ width: "50%", mr: ".5rem" }}
      onChange={(e: any) => {
        props.set(e.target.value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box sx={{ color: "text.primary", mt: ".1rem" }}>
              {props.c + 1}.
            </Box>
          </InputAdornment>
        ),
      }}
      label="Distribution Name"
    />
  );
};

export default DistributionName;
