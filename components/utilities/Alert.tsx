import { Close, Delete } from "@mui/icons-material";
import { Alert, Box, Button, IconButton, Modal, Collapse } from "@mui/material";
import React, { useEffect, FC } from "react";
import { deviceWrapper } from "./Style";
import CloseIcon from '@mui/icons-material/Close';
import { TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

interface IAbstractAlert {
  // set: (val: IAlerts[]) => void;
  alerts: IAlerts[];
  close: (i: number) => void;
}

export interface IAlerts {
  severity: ValidAlert;
  content: string;
  id: string;
}

export type ValidAlert = "error" | "warning" | "info" | "success";

const AbstractAlert: FC<IAbstractAlert> = (props) => {
  useEffect(() => {
    setTimeout(() => props.close(0), 15000);
  }, [])
  return (

    <Box
      sx={{
        position: "fixed",
        top: "4rem",
        right: deviceWrapper(".5rem", "1rem"),
        zIndex: 100000,
      }}
    >
      <TransitionGroup>
        {props.alerts.map((alert: IAlerts, i: number) => {


          return (
            <Collapse key={alert.id}>
              <CustomAlert alert={alert} i={i} close={props.close} />
            </Collapse>
          )
        })}
      </TransitionGroup>
    </Box>
  )
};

const CustomAlert: FC<{ alert: IAlerts, i: number, close: Function }> = ({alert, i, close}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      close(0);
    }, 5000);
    return () => clearTimeout(timer);
  }, [])
  return (
    <Alert
      severity={alert.severity}
      variant="filled"
      key={`alert-${i}`}
      sx={{ position: "relative", minWidth: "250px", mb: ".5rem" }}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            close(i);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {alert.content}
    </Alert>
  )
}




export default AbstractAlert;
