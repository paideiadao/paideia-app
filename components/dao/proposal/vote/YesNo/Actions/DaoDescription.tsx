import { Header } from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, TextField } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";

export interface IDaoDescription {
  shortDescription: string;
  activation_time: number;
}

const DaoDescription: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);

  const [value, setValue] = React.useState<IDaoDescription>({
    shortDescription: "",
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
        title="DAO Description"
        large
        subtitle="Change the short description describing the dao."
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

      <TextField
        label="DAO short description"
        inputProps={{
          maxLength: 250,
        }}
        multiline
        value={value.shortDescription}
        onChange={(e) => setValue({ shortDescription: e.target.value, activation_time: 0 })}
        rows={5}
        sx={{ width: "100%" }}
        FormHelperTextProps={{ sx: { textAlign: "right" } }}
        helperText={`${value.shortDescription.length}/250`}
      />
    </Layout>
  );
};

export default DaoDescription;
