import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box } from "@mui/material";
import * as React from "react";

const OptionsWidget: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".3rem",
        width: "100%",
        mb: "1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid",
          borderBottomColor: "border.main",
          p: ".5rem",
        }}
      >
        <CapsInfo title="Votes | 206" />
      </Box>
    </Box>
  );
};

export default OptionsWidget;
