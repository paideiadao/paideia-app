import { Box, Switch } from "@mui/material";
import * as React from "react";
import { Header, Subheader } from "./HeaderComponents";

const LabeledSwitch: React.FC<{
  title: string;
  value: boolean;
  onChange: Function;
  subtitle?: string;
  small?: boolean;
  disabled?: boolean;
}> = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: "1rem", mb: "1rem" }}>
      <Box>
        {props.subtitle === undefined ? (
          <Subheader title={props.title} small={props.small} />
        ) : (
          <Header
            title={props.title}
            subtitle={props.subtitle}
            small={props.small}
          />
        )}
      </Box>
      <Box sx={{ ml: "auto" }}>
        <Switch
          disabled={props.disabled}
          checked={props.value}
          onChange={() => props.onChange(!props.value)}
        />
      </Box>
    </Box>
  );
};

export default LabeledSwitch;
