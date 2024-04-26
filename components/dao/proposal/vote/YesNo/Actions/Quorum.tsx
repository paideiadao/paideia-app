import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, Slider, TextField } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Quorum from "../../Options/Actions/Quorum";
import Layout from "./Layout";

export interface IQuorum {
  quorum: number;
  activation_time: number;
}

const QuorumAction: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [value, setValue] = React.useState<IQuorum>({
    quorum: 4,
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
        title="Quorum"
        large
        mb="0"
        subtitle="Change the minimum quorum needed for a proposal to pass."
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
      <Quorum set={(val: IQuorum) => setValue(val)} {...value} />
    </Layout>
  );
};

export default QuorumAction;
