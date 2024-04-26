import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import MultiWalletSelector from "@components/utilities/MultiWalletSelector";
import { IWallet } from "@lib/creation/Interfaces";

import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, TextField } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";

export interface IOptimisticGovernance {
  activated: boolean;
  wallets: IWallet[];
  activation_time: number;
}

export const defaultOptimisticGovernanceData = {
  activated: true,
  wallets: [{ alias: "", address: "", img: "" }],
  activation_time: 0,
};

const OptimisticGovernance: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [value, setValue] = React.useState<IOptimisticGovernance>(
    defaultOptimisticGovernanceData
  );

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
        title="Optimistic governance"
        large
        mb="0"
        subtitle="Turn on or off optimistic governance and or edit the whitelisted members."
      />
      <Box
        sx={{
          width: "calc(100% + 1rem)",
          ml: "-.5rem",
          borderBottom: 1,
          borderColor: "border.main",
          mt: "rem",
          mb: "1rem",
        }}
      />
      <CapsInfo title="Information" mb="0rem" />
      <TextField
        sx={{ width: "100%", mt: "1rem" }}
        label="Action name"
        value={"Optimistic governance"}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        sx={{ width: "100%", mt: "1rem" }}
        label="Action descriptions"
        value={
          "Turn on or off optimistic governance and or edit the whitelisted members"
        }
        InputProps={{
          readOnly: true,
        }}
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
      <CapsInfo title="Configuration" mb="-1rem" />
    </Layout>
  );
};

export default OptimisticGovernance;
