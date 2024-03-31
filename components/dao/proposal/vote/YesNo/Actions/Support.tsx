import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import SupportAlert from "@components/creation/utilities/SupportAlert";
import { deviceStruct } from "@components/utilities/Style";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, Slider, TextField } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";

export interface ISupport {
  supportNeeded: number;
}

const Support: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [value, setValue] = React.useState<ISupport>({
    supportNeeded: 51,
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
        title="Support"
        large
        subtitle="Configure vote support requirements for proposals."
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
      <CapsInfo title="Configuration" mb=".5rem" />
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          mt: ".4rem",
          pl: ".5rem",
        }}
      >
        <Box
          sx={{
            width: deviceStruct("70%", "70%", "87%", "87%", "87%"),
            display: "flex",
            alignItems: "center",
          }}
        >
          <Slider
            value={value.supportNeeded}
            min={51}
            max={100}
            onChange={(event, newValue) =>
              //@ts-ignore
              setValue({ supportNeeded: newValue })
            }
          />
        </Box>
        <Box
          sx={{
            width: deviceStruct("30%", "30%", "13%", "13%", "13%"),
            ml: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            label="Value"
            type="number"
            value={value.supportNeeded}
            onChange={(e) =>
              setValue({ supportNeeded: parseFloat(e.target.value) })
            }
            InputProps={{
              inputProps: { min: 51, max: 100 },
              endAdornment: <Box>%</Box>,
            }}
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", my: ".75rem" }}>
        <SupportAlert />
      </Box>
    </Layout>
  );
};

export default Support;
