import { Box } from "@mui/material";
import * as React from "react";
import { VoteChoice } from "../ProposalVote";
import CheckIcon from "@mui/icons-material/Check";
import ListIcon from "@mui/icons-material/List";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { deviceWrapper } from "@components/utilities/Style";

const Selector: React.FC = () => {
  const context = React.useContext<IProposalContext>(ProposalContext);

  const wrapper = (value: "yes/no" | "options" | "unselected") => {
    let temp =
      value !== "unselected"
        ? {
            actions: [
              {
                name: undefined,
                data: undefined,
              },
            ],
          }
        : {};
    context.api.setValue({
      ...context.api.value,
      voting_system: value,
      ...temp,
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "stretch",
        display: "flex",
        justifyContent: "center",
        flexDirection: deviceWrapper("column", "row"),
      }}
    >
      <VoteChoice
        icon={<CheckIcon />}
        title="Yes or No"
        change={() => wrapper("yes/no")}
        subtitle="Vote to pass or decline the proposal. This type of proposal allows for multiple actions."
      />
      <Box sx={{ ml: "1rem" }} />
      <VoteChoice
        disabled={true}
        icon={<ListIcon />}
        change={() => {}}
        title="Provide options"
        subtitle="Provide multiple options for users to choose from. This type of proposal only allows for a single actions to be decided on."
      />
    </Box>
  );
};

export default Selector;
