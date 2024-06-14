import * as React from "react";
import { Box, Divider } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export const steps = [
  {
    title: "Basic Information",
    label: "Pick your name and url",
  },
  {
    title: "Tokenomics",
    label: "Mint and configure your token",
  },
  {
    title: "Governance",
    label: "Manage how voting will work",
  },
  {
    title: "Design",
    label: "Make it your own!",
  },
  {
    title: "Review",
    label: "Make sure everything is correct",
  },
];

export default function StepSelector(props: any) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Stepper
        activeStep={props.value}
        alternativeLabel
        orientation="vertical"
        connector={
          <Box
            sx={{ display: "flex", height: ".75rem", justifyContent: "center" }}
          >
            <Divider
              orientation="vertical"
              flexItem
              style={{ background: "border.main" }}
            />
          </Box>
        }
      >
        {steps.map((i: any, c: number) => (
          <Step key={i.title} sx={{ width: "100%", textAlign: "center" }}>
            <StepLabel classes={{ alternativeLabel: "", labelContainer: "" }}>
              <Box sx={{ fontWeight: 440, fontSize: ".7rem" }}>{i.title}</Box>
              {c === props.value && (
                <Box
                  sx={{
                    fontSize: ".6rem",
                    fontWeight: 300,
                    color: "text.secondary",
                  }}
                >
                  {i.label}
                </Box>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
