import SupportAlert from "@components/creation/utilities/SupportAlert";
import { deviceStruct } from "@components/utilities/Style";
import { Box, Slider, TextField } from "@mui/material";
import * as React from "react";
import { ISupport } from "../../YesNo/Actions/Support";

interface IwSupport extends ISupport {
  set: (val: ISupport) => void;
}

const Support: React.FC<IwSupport> = (props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          mt: ".4rem",
          pl: ".5rem",
        }}
      >
        <Box
          sx={{
            width: deviceStruct("70%", "70%", "87%", "87%", "87%"),
            display: "flex",
            alignItems: "center",
          }}
        >
          <Slider
            value={props.supportNeeded}
            min={51}
            max={100}
            onChange={(event, newValue) =>
              //@ts-ignore
              props.set({ supportNeeded: newValue })
            }
          />
        </Box>
        <Box
          sx={{
            width: deviceStruct("30%", "30%", "13%", "13%", "13%"),
            ml: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            label="Value"
            type="number"
            value={props.supportNeeded}
            onChange={(e) =>
              props.set({
                supportNeeded: parseFloat(e.target.value),
                activation_time: 0,
              })
            }
            InputProps={{
              inputProps: { min: 51, max: 100 },
              endAdornment: <Box>%</Box>,
            }}
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", my: ".75rem" }}>
        <SupportAlert />
      </Box>
    </>
  );
};

export default Support;
