import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";

export interface IQuadradicVoting {
  isActive: boolean;
  activation_time: 0;
}

const QuadraticVoting: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [value, setValue] = React.useState<IQuadradicVoting>({
    isActive: false,
    activation_time: 0,
  });

  React.useEffect(() => {
    const temp = [...(context.api?.value.actions ?? [])];
    temp[props.c ?? 0].data = value;
    context.api?.setValue({
      ...context.api.value,
      actions: temp,
    });
  }, [value]);

  return (
    <Layout>
      <Header
        title="Quadratic Voting"
        large
        subtitle="If active, voting power will not be determined only by the stakeholder investment, preventing whales from having too much influence over decisions"
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
      <LabeledSwitch
        small
        title={"Activate Quadratic Voting"}
        value={value.isActive}
        onChange={(val: boolean) =>
          setValue({ isActive: val, activation_time: 0 })
        }
      />
    </Layout>
  );
};

export default QuadraticVoting;
