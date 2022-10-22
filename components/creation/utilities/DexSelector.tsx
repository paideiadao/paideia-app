import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import * as React from "react";

interface IDexSelector {
  c: number;
  dex: string;
  set: (val: string) => void;
}

const DexSelector: React.FC<IDexSelector> = (props) => {
  return (
    <FormControl sx={{ width: "32%" }}>
      <InputLabel htmlFor={`dex-label-${props.c}`} shrink>
        DEX
      </InputLabel>
      <Select
        labelId={`dex-label-${props.c}`}
        id={`dex-${props.c}`}
        variant="outlined"
        label="DEX"
        value={props.dex}
        sx={{ height: "100%", color: "text.primary" }}
        onChange={(e: any) => props.set(e.target.value)}
      >
        <MenuItem value="spectrum">Spectrum</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DexSelector;
