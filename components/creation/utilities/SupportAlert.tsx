import { Alert, AlertTitle, Box } from "@mui/material";
import * as React from "react";

const SupportAlert: React.FC = () => {
  return (
    <Alert severity="warning" color="warning" sx={{ fontSize: ".8rem" }}>
      <AlertTitle sx={{ fontSize: ".9rem" }}>
        Only for single-choice voting
      </AlertTitle>
      <Box sx={{ ml: "-1.75rem" }}>
        Support will only apply to single-choice voting. It determines the
        percentage of users that need to agree for a proposal to be approved.
        Can&apos;t be set to less than 51%
      </Box>
    </Alert>
  );
};

export default SupportAlert;
