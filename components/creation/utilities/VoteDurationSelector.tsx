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
      sx={{ m: 1, width: deviceStruct("60%", "60%", "35%", "37%", "30%") }}
      variant="outlined"
    >
      <InputLabel htmlFor={`challenge-time-input`} shrink>
        Vote duration
      </InputLabel>
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
              width: "90%",
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
                <MenuItem value="minutes">Minutes</MenuItem>
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="days">Days</MenuItem>
                <MenuItem value="weeks">Weeks</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
        label="Vote duration"
      />
    </FormControl>
  );
};

export default VoteDurationSelector;
