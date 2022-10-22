import { Header } from "@components/creation/utilities/HeaderComponents";
import { Box, Button } from "@mui/material";
import * as React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import AddAction from "./AddAction";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import VotingChoice from "../VotingChoice";

const YesNo: React.FC = () => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const actions = context.api.value.actions;
  return (
    <>
      <VotingChoice
        title="Yes or no"
        subtitle="Vote to pass or decline the proposal. This type of proposal allows for multiple actions."
        icon={<CheckIcon />}
      />
      <Box sx={{ mt: "1rem" }} />
      <Header
        title="What should happen in the proposal is approved?"
        small
        mb=".25rem"
        subtitle="Yes or no proposals allow you to create a chain of actions to be executed if the proposal passes. To add an action, simply click below, decide the type of action you want to create, and fill up the relevant information."
      />
      {actions.map((i: IProposalAction, c: number) => (
        <AddAction
          name={i.name}
          close={() => {
            let temp = [...actions];
            temp.splice(c, 1);
            context.api.setValue({
              ...context.api.value,
              actions: temp,
            });
          }}
          c={c}
          data={undefined}
        />
      ))}
    </>
  );
};

export default YesNo;
