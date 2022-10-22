import VoteDurationSelector from "@components/creation/utilities/VoteDurationSelector";
import { Box } from "@mui/material";
import * as React from "react";
import { IVoteDuration } from "../../YesNo/Actions/VoteDuration";

interface IwVoteDuration extends IVoteDuration {
  set: (val: IVoteDuration) => void;
}

const VoteDuration: React.FC<IwVoteDuration> = (props) => {
  const set = (val: any) => {
    props.set({
      voteDuration: props.voteDuration,
      voteDurationUnits: props.voteDurationUnits,
      ...val,
    });
  };
  return (
    <Box sx={{ width: "100%" }}>
      <VoteDurationSelector
        voteDuration={props.voteDuration}
        set={(val: number) => set({ voteDuration: val })}
        voteDurationUnits={props.voteDurationUnits}
        setUnits={(val: string) => set({ voteDurationUnits: val })}
      />
    </Box>
  );
};

export default VoteDuration;
