import {
  Header,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import { Box, Button } from "@mui/material";
import * as React from "react";
import { IActionType } from "./AddAction";

const ActionSelection: React.FC<IActionType> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        display: "flex",
        mt: ".75rem",
        mb: ".75rem",
      }}
    >
      <Box
        sx={{
          width: deviceWrapper("20%", "8%"),
          alignItems: "center",
          justifyContent: "center",
          color: "primary.main",
          display: "flex",
        }}
      >
        {props.icon}
      </Box>
      <Box sx={{ width: "80%", alignItems: "center" }}>
        <Header title={props.title ?? ""} small mb="0" />
        <Subtitle subtitle={props.subtitle} small />
      </Box>
      <Button sx={{ ml: "auto" }} onClick={props.select}>
        Select
      </Button>
    </Box>
  );
};

export default ActionSelection;
