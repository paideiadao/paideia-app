import * as React from "react";
import Alert from "@mui/material/Alert";
import { AlertTitle, Box } from "@mui/material";
import { deviceWrapper } from "./Style";

interface IWarning {
  title: string;
  subtitle: string;
}

const Warning: React.FC<IWarning> = (props) => {
  return (
    <Alert
      severity="warning"
      color="warning"
      sx={{ fontSize: deviceWrapper(".7rem", ".8rem") }}
    >
      <AlertTitle sx={{ fontSize: deviceWrapper(".8rem", ".9rem") }}>
        {props.title}
      </AlertTitle>
      <Box sx={{ ml: "-2rem", zIndex: 101 }}>{props.subtitle}</Box>
    </Alert>
  );
};

export default Warning;
