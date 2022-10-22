import { Alert } from "@mui/material";
import * as React from "react";

const Status: React.FC<{ value: string; action: string; current: string }> = (
  props
) => {
  return (
    props.value !== undefined && (
      <Alert
        variant="filled"
        //@ts-ignore
        severity={props.value}
        sx={{ position: "fixed", bottom: ".5rem", right: "1rem" }}
      >
        {props.value === "success"
          ? `Successfully ${props.action} ${props.current}`
          : props.value === "info"
          ? `Updating ${props.current}`
          : `Error ${props.action} ${props.current}`}
      </Alert>
    )
  );
};

export default Status;
