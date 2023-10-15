import { Button } from "@mui/material";
import * as React from "react";

const Chip: React.FC<{
  set?: Function;
  c: number;
  variant: string;
  icon: JSX.Element;
  label: string;
  mt?: string;
}> = (props) => {
  return (
    <Button
      size="small"
      startIcon={props.icon}
      sx={{
        alignItems: "center",
        display: "flex",
        borderRadius: "5rem",
        fontWeight: 500,
        mr: ".5rem",
        mt: props.mt === undefined ? 0 : props.mt,
      }}
      onClick={props.set}
      key={`filter-chip-${props.label}-key-${props.c}`}
      // @ts-ignore
      variant={props.variant}
    >
      {props.label}
    </Button>
  );
};

export default Chip;
