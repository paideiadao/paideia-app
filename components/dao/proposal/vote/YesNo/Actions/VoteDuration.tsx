import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import VoteDurationSelector from "@components/creation/utilities/VoteDurationSelector";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposals/create";
import * as React from "react";
import Layout from "./Layout";

export interface IVoteDuration {
  voteDuration: number;
  voteDurationUnits: string;
}

const VoteDuration: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [value, setValue] = React.useState<IVoteDuration>({
    voteDuration: 0,
    voteDurationUnits: "days",
  });

  React.useEffect(() => {
    const temp = [...context.api.value.actions];
    temp[props.c].data = value;
    context.api.setValue({
      ...context.api.value,
      actions: temp,
    });
  }, [value]);

  return (
    <Layout>
      <Header
        title="Vote Duration"
        large
        subtitle="How long does the voting period last for?"
        mb="0"
      />
      <Box
        sx={{
          width: "calc(100% + 1rem)",
          ml: "-.5rem",
          borderBottom: 1,
          borderColor: "border.main",
          mt: ".5rem",
          mb: "1rem",
        }}
      />
      <CapsInfo title="Configuration" mb=".5rem" />
      <VoteDurationSelector
        voteDuration={value.voteDuration}
        set={(val: number) => setValue({ ...value, voteDuration: val })}
        voteDurationUnits={value.voteDurationUnits}
        setUnits={(val: string) =>
          setValue({ ...value, voteDurationUnits: val })
        }
      />
    </Layout>
  );
};

export default VoteDuration;
