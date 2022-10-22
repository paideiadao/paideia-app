import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";

interface IOptionSystemSelector {
  selected: string;
  set: (val: OptionType) => void;
}

export type OptionType = "one-option" | "ranked-option" | "weighted-option";

const OptionSystemSelector: React.FC<IOptionSystemSelector> = (props) => {
  return (
    <FormControl sx={{ width: "100%", mt: ".75rem" }}>
      <InputLabel htmlFor={`option-system-selector-label}`} shrink>
        Option system
      </InputLabel>
      <Select
        labelId={`option-system-selector-label}`}
        id={`option-system-selector}`}
        variant="outlined"
        label="Option system"
        value={props.selected}
        sx={{ height: "100%", color: "text.primary" }}
        onChange={(e: any) => props.set(e.target.value as OptionType)}
      >
        <MenuItem value={`one-option`}>
          Allow users to only select one option
        </MenuItem>
        <MenuItem value={`ranked-option`}>
          Allow users to rank all available options & aggregate an option
        </MenuItem>
        <MenuItem value={`weighted-option`}>
          Allow users to select multiple options with custom voting power
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default OptionSystemSelector;
