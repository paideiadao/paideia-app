import { Header } from "@components/creation/utilities/HeaderComponents";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import { deviceWrapper } from "@components/utilities/Style";

const TokenomicsHeader: React.FC = () => {
  return (
    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
      <Header title="Tokenomics" large />
      <Button
        endIcon={<EditIcon />}
        sx={{ ml: "auto" }}
        variant="contained"
        size="small"
      >
        <Box sx={{ display: deviceWrapper("none", "block") }}>
          Edit Distribution
        </Box>
        <Box sx={{ display: deviceWrapper("block", "none") }}>Edit</Box>
      </Button>
    </Box>
  );
};

export default TokenomicsHeader;
