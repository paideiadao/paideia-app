import { Header } from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, Button } from "@mui/material";
import * as React from "react";

interface IVotingChoice {
  title: string;
  subtitle: string;
  icon: JSX.Element;
}

export const VotingChoice: React.FC<IVotingChoice> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: ".3rem",
        border: 1,
        borderColor: "primary.main",
        p: ".5rem",
        display: "flex",
        alignItems: "center",
        backgroundColor: "primary.lightOpacity",
      }}
    >
      <Box
        sx={{
          width: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "primary.main",
        }}
      >
        {props.icon}
      </Box>
      <Box sx={{ width: "80%", display: "flex", alignItems: "center" }}>
        <Header title={props.title} subtitle={props.subtitle} mb="0" />
      </Box>
      <Button
        size="small"
        onClick={() =>
          context.api.setValue({
            ...context.api.value,
            voting_system: "unselected",
          })
        }
      >
        Change
      </Button>
    </Box>
  );
};

export default VotingChoice;
