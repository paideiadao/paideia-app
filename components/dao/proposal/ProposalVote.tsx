import { Header } from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { IObj } from "@lib/Interfaces";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Selector from "./vote/Selector";
import YesNo from "./vote/YesNo/YesNo";
import AddIcon from "@mui/icons-material/Add";
import { deviceWrapper } from "@components/utilities/Style";
import Options from "./vote/Options/Options";

interface IVoteChoice {
  title: string;
  icon: JSX.Element;
  subtitle: string;
  change: () => void;
  disabled?: boolean;
}

export const VoteChoice: React.FC<IVoteChoice> = (props) => {
  return (
    <Box
      onClick={props.change}
      sx={{
        backgroundColor: "fileInput.outer",
        width: deviceWrapper("100%", "50%"),
        p: ".5rem",
        mt: deviceWrapper("1rem", "0"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: ".3rem",
        cursor: props.disabled ? "default " : "pointer",
        border: 1,
        borderColor: "border.main",
        flexDirection: "column",
        textAlign: "center",
        ":hover": {
          borderColor: "primary.main",
        },
        opacity: props.disabled ? 0.5 : 1,
      }}
    >
      {props.icon}
      <Header title={props.title} large subtitle={props.subtitle} />
    </Box>
  );
};

const ProposalVote: React.FC = () => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const content: IObj<JSX.Element> = {
    unselected: <Selector />,
    "yes/no": <YesNo />,
    options: <Options />,
  };
  const voting_system = context.api.value.voting_system;
  return (
    <>
      <Typography
        sx={{
          mt: "20px",
          mb: "12px",
          fontSize: "1.1rem",
        }}
      >
        Voting System
      </Typography>
      {content[voting_system]}
      {context.api.value.actions.filter(
        (i: IProposalAction) => i.name === undefined
      ).length === 0 &&
        context.api.value.voting_system === "yes/no" && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: ".5rem",
            }}
          >
            <Button
              disabled={context?.api?.value?.actions?.length >= 1}
              endIcon={<AddIcon />}
              onClick={() => {
                const temp = [...context.api.value.actions];
                temp.push({
                  name: undefined,
                  data: undefined,
                });
                context.api.setValue({
                  ...context.api.value,
                  actions: temp,
                });
              }}
            >
              Add Another Action
            </Button>
          </Box>
        )}
      {context.api.errors.voting && (
        <FormHelperText sx={{ mt: 1 }} error>
          Voting or Action not configured
        </FormHelperText>
      )}
    </>
  );
};

export default ProposalVote;
