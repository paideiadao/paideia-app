import { Box } from "@mui/material";
import * as React from "react";
import { Header } from "@components/creation/utilities/HeaderComponents";
// import ChartBase from "./ChartBase";

interface IChartProps {
  tokenId: string;
}

const Chart: React.FC<IChartProps> = ({ tokenId }) => {

  return (
    <Box
      sx={{
        width: "100%",
        fontSize: "1.1rem",
        mt: "1rem",
        mb: "1rem",
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Header title="Price chart" />
      </Box>
      <Box sx={{
        borderRadius: ".4rem",
        border: 1,
        borderColor: "border.main",
        lineHeight: 0
      }}>
        <iframe
          src={`https://cruxfinance.io/embedded-charts/${tokenId}`}
          style={{
            width: '100%',
            border: 'none',
            minHeight: '600px',
            borderRadius: ".4rem"
          }}
        />
      </Box>
    </Box>
  );
};

export default Chart;
