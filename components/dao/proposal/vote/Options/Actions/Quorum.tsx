import { deviceStruct } from "@components/utilities/Style";
import { Box, Slider, TextField } from "@mui/material";
import * as React from "react";
import { IQuorum } from "../../YesNo/Actions/Quorum";

interface IwQuorum extends IQuorum {
  set: (val: IQuorum) => void;
}

const Quorum: React.FC<IwQuorum> = (props) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "1rem",
        }}
      >
        <Slider
          value={props.quorum}
          min={1}
          max={100}
          // @ts-ignore
          onChange={(event: Event, newValue: number) =>
            props.set({
              quorum: newValue,
              activation_time: 0,
            })
          }
        />
        <TextField
          label="Value"
          type="number"
          value={props.quorum}
          onChange={(e) =>
            props.set({
              quorum: parseFloat(e.target.value),
              activation_time: 0,
            })
          }
          sx={{ width: "15%", ml: "1rem" }}
          InputProps={{
            inputProps: { min: 51, max: 100 },
            endAdornment: <Box>%</Box>,
          }}
        />
      </Box>
    </>
  );
};

export default Quorum;
