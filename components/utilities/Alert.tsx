import { Close, Delete } from "@mui/icons-material";
import { Alert, Box, Button, IconButton, Modal } from "@mui/material";
import * as React from "react";
import { deviceWrapper } from "./Style";

interface IAbstractAlert {
  set: (val: IAlerts[]) => void;
  alerts: IAlerts[];
  close: (c: number) => void;
}

export interface IAlerts {
  severity: ValidAlert;
  content: string;
}

export type ValidAlert = "error" | "warning" | "info" | "success";

const AbstractAlert: React.FC<IAbstractAlert> = (props) => {
  // setTimeout(() => props.close(), 5000);
  return (
    props.alerts.length > 0 && (
      <Box
        sx={{
          position: "fixed",
          top: "4rem",
          right: deviceWrapper(".5rem", "1rem"),
          zIndex: 100000,
        }}
      >
        {props.alerts.map((alert: IAlerts, c: number) => (
          <Alert
            severity={alert.severity}
            key={`alert-${c}`}
            sx={{ position: "relative", minWidth: "250px", mb: ".5rem" }}
          >
            {alert.content}
            <IconButton
              size="small"
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => props.close(c)}
            >
              <Close sx={{ fontSize: ".9rem" }} />
            </IconButton>
          </Alert>
        ))}
      </Box>
    )
  );
};

export default AbstractAlert;
