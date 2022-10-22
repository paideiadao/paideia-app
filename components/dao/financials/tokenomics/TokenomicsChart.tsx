import { Header } from "@components/creation/utilities/HeaderComponents";
import { Box } from "@mui/material";
import * as React from "react";

const TokenomicsChart: React.FC = () => {
  return (
    <Box sx={{ mt: "1rem", width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Header title="Token distribution information" />
      </Box>
    </Box>
  );
};

export default TokenomicsChart;
