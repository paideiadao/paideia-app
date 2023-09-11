import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import MultiTokenHolders from "@components/utilities/MultiTokenHolders";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, TextField } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";
import AbstractDate from "@components/creation/utilities/AbstractDate";

export interface ISendFundsRecipient {
  address: string;
  ergs: number;
  token_id: string;
  tokens: number;
}

export interface ISendFunds {
  recipients: ISendFundsRecipient[];
  recurring: boolean;
  activation_time: number;
}

const SendFunds: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [value, setValue] = React.useState<ISendFunds>({
    recipients: [{ address: "", ergs: 0, tokens: 0, token_id: "" }],
    recurring: false,
    activation_time: Date.now() + 2 * 24 * 60 * 60 * 1000,
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
          title="Activation Time"
          subtitle="Set time when the action will be executed"
        />
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
