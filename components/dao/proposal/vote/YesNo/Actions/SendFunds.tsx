import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import MultiTokenHolders from "@components/utilities/MultiTokenHolders";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, FormHelperText, TextField } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";
import AbstractDate from "@components/creation/utilities/AbstractDate";
import { ITokenAmountDetails } from "@components/utilities/MultiTokenAmountSelector";
import VoteDurationSelector from "@components/creation/utilities/VoteDurationSelector";

export interface ISendFundsRecipient {
  address: string;
  ergs: number;
  tokens: ITokenAmountDetails[];
}

export interface ISendFunds {
  recipients: ISendFundsRecipient[];
  recurring: boolean;
  voting_duration: string;
  activation_time: number;
}

const SendFunds: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [value, setValue] = React.useState<ISendFunds>({
    recipients: [{ address: "", ergs: 0, tokens: [] }],
    recurring: false,
    voting_duration: (24 * 60 * 60).toString(),
    activation_time: Date.now() + 2 * 24 * 60 * 60 * 1000,
  });
  const [votingDuration, setVotingDuration] = React.useState<any>({
    duration: 1,
    unit: "days",
  });

  React.useEffect(() => {
    const temp = [...context.api.value.actions];
    temp[props.c].data = value;
    context.api.setValue({
      ...context.api.value,
      actions: temp,
    });
  }, [value]);

  React.useEffect(() => {
    const multiplier_map = {
      seconds: 1,
      minutes: 60,
      hours: 60 * 60,
      days: 60 * 60 * 24,
      weeks: 60 * 60 * 24 * 7,
    };
    // @ts-ignore
    const multiplier = multiplier_map[votingDuration.unit];
    const voting_duration = votingDuration.duration * multiplier;
    setValue({ ...value, voting_duration: voting_duration.toString() });
  }, [votingDuration]);

  return (
    <Layout>
      <Header
        title="Send Funds from Treasury"
        large
        subtitle="Send funds from the DAO treasury, to any wallet or collection of wallets."
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
      <CapsInfo title="Receiving Wallets" mb=".5rem" />
      <MultiTokenHolders
        recipients={value.recipients}
        treasuryAmount={0}
        set={(newRecipients: ISendFundsRecipient[]) =>
          setValue({
            ...value,
            recipients: [...newRecipients],
          })
        }
      />
      {context.api.errors.actionConfig && (
        <FormHelperText error>
          Validation failed for receiving wallet
        </FormHelperText>
      )}
      <Box
        sx={{
          width: "calc(100% + 1rem)",
          ml: "-.5rem",
          borderBottom: 1,
          borderColor: "border.main",
          mt: "1rem",
          mb: "1rem",
        }}
      />
      <CapsInfo title="Configuration" mb="-1rem" />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "1rem",
          pt: "1rem",
        }}
      >
        <Header
          title="Voting Duration"
          subtitle="Set how long the voting window should be open"
        />
        <FormHelperText error={context.api.errors.votingDuration}>
          {context.api.errors.votingDuration
            ? "Voting duration cannot be less than minimum in Dao Config"
            : `Voting Ends at ${new Date(
                new Date().getTime() +
                  Number(value.voting_duration) * 1000 +
                  900 * 1000
              ).toUTCString()}`}
        </FormHelperText>
        <VoteDurationSelector
          voteDuration={votingDuration.duration}
          set={(val: number) =>
            setVotingDuration({ ...votingDuration, duration: val })
          }
          voteDurationUnits={votingDuration.unit}
          setUnits={(val: string) =>
            setVotingDuration({ ...votingDuration, unit: val })
          }
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "1rem",
          pt: "1rem",
        }}
      >
        <Header
          title="Activation Time"
          subtitle="Set time when the action will be executed"
        />
        {context.api.errors.activationTime && (
          <FormHelperText error>
            Activation time cannot be before voting ends
          </FormHelperText>
        )}
        <AbstractDate
          value={new Date(value.activation_time)}
          setValue={(newValue: Date) =>
            setValue({ ...value, activation_time: newValue.getTime() })
          }
          width="50%"
          label="Activation Time"
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: ".25rem",
        }}
      >
        <LabeledSwitch
          disabled={true}
          title="Set as Recurring"
          subtitle="Set and schedule this payment to be done for a determined amount of time, in any frequency you wish."
          value={value.recurring}
          onChange={() => setValue({ ...value, recurring: !value.recurring })}
        />
      </Box>
      <Box sx={{ mb: ".5rem" }} />
    </Layout>
  );
};

export default SendFunds;
