import {
  LearnMore,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import { deviceStruct } from "@components/utilities/Style";
import {
  ConfigContext,
  IConfigContext,
} from "@lib/dao/dao-config/ConfigContext";
import { Box, Slider, TextField } from "@mui/material";
import * as React from "react";

const Support: React.FC = () => {
  const context = React.useContext<IConfigContext>(ConfigContext);
  const data = context.api.data.governance;
  return (
    <>
      <LearnMore
        small
        title="Support needed on single choice voting"
        //tooltipTitle="Title Here"
        tooltipText="Allows you to require more votes in favor to pass proposals. For example, if you set this to 60%, and 100 votes are cast, 60 votes in favor would be required for a proposal to pass. "
        //tooltipLink="/here"
      />
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          mt: "1rem",
          mb: ".5rem",
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
            value={data.supportNeeded}
            min={0}
            max={100}
            onChange={(event, newValue) =>
              context.api.setData({
                ...context.api.data,
                governance: {
                  ...data,
                  supportNeeded: newValue,
                },
              })
            }
          />
        </Box>
        <Box
          sx={{
            width: deviceStruct("30%", "30%", "13%", "13%", "13%"),
            ml: "1.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            label="Value"
            type="number"
            value={data.supportNeeded}
            onChange={(e) =>
              context.api.setData({
                ...context.api.data,
                governance: {
                  ...data,
                  supportNeeded: e.target.value,
                },
              })
            }
            InputProps={{
              inputProps: { min: 0, max: 100 },
              endAdornment: <Box>%</Box>,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Support;
