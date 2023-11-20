import { deviceStruct } from "@components/utilities/Style";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { data } from "jquery";
import * as React from "react";

interface IVoteDurationSelector {
  voteDuration: number;
  set: (val: number) => void;
  voteDurationUnits: string;
  setUnits: (unit: string) => void;
}

const VoteDurationSelector: React.FC<IVoteDurationSelector> = (props) => {
  return (
    <FormControl
      sx={{ m: 1, width: deviceStruct("100%", "80%", "50%", "50%", "30%") }}
      variant="outlined"
    >
      <InputLabel htmlFor={`challenge-time-input`}>Vote Duration</InputLabel>
      <OutlinedInput
        notched
        id={`challenge-time-input`}
        type="number"
        value={props.voteDuration === 0 ? "" : props.voteDuration}
        onChange={(e) => props.set(parseFloat(e.target.value))}
        endAdornment={
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "backgroundColor.main",
              color: "text.primary",
              lineHeight: "350%",
              textAlign: "center",
              borderRadius: "0 .3rem .3rem 0",
              mr: "-.8rem",
              ml: ".5rem",
              display: "flex",
            }}
          >
            <FormControl fullWidth>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                variant="outlined"
                value={props.voteDurationUnits}
                sx={{ height: "100%", color: "text.primary" }}
                onChange={(e: SelectChangeEvent<string>) =>
                  props.setUnits(e.target.value)
                }
              >
                <MenuItem value="seconds">Seconds</MenuItem>
                <MenuItem value="minutes">Minutes</MenuItem>
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="days">Days</MenuItem>
                <MenuItem value="weeks">Weeks</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        label="Vote Duration"
      />
    </FormControl>
  );
};

export default VoteDurationSelector;
