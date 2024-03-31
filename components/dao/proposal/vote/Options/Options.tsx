import { Box } from "@mui/material";
import * as React from "react";
import ListIcon from "@mui/icons-material/List";
import VotingChoice from "../VotingChoice";
import { Header } from "@components/creation/utilities/HeaderComponents";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import DraggableContext from "./DraggableContext";
import AddAction from "../YesNo/AddAction";
import OptionSystemSelector, { OptionType } from "./OptionSystemSelector";

const Options: React.FC = () => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const actions = context.api?.value.actions ?? [];
  const optionType = context.api?.value.optionType;

  return (
    <>
      <VotingChoice
        title="Provide options"
        subtitle="Provide multiple options for users to choose from. type of proposal only allows for a single action to be decided on."
        icon={<ListIcon />}
      />
      <Header
        title="What should happen if the proposal is approved?"
        small
        mb=".25rem"
        subtitle="Yes or No proposals allow you to create a chain of actions to be executed if the proposal passes. To add an action, simply click below, decide the type of action you want to create, and fill up the relevant information."
      />
      <OptionSystemSelector
        selected={optionType ?? ""}
        set={(val: OptionType) =>
          context.api?.setValue({
            ...context.api.value,
            optionType: val,
          })
        }
      />
      {actions.length > 0 && (
        <>
          <AddAction
            name={actions[0].name}
            icon={actions[0].icon}
            description={actions[0].description}
            close={() => {
              context.api?.setValue({
                ...context.api.value,
                actions: [
                  {
                    name: undefined,
                    data: undefined,
                  },
                ],
              });
            }}
            options={actions[0].options}
            c={0}
            data={undefined}
          />
          <DraggableContext name={actions[0].name ?? ""} />
        </>
      )}
    </>
  );
};

export default Options;
