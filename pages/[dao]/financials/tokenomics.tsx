import { Header } from "@components/creation/utilities/HeaderComponents";
import TokenomicsHeader from "@components/dao/financials/tokenomics/Header";
import TokenomicsChart from "@components/dao/financials/tokenomics/TokenomicsChart";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";
import { Box, Button } from "@mui/material";
import * as React from "react";
// import { TreasuryInfo } from "./treasury";

const Tokenomics: React.FC = () => {
  return (
    <Layout width="95%">
      <Box sx={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
        <Box sx={{ width: deviceWrapper("100%", "72%") }}>
          <TokenomicsHeader />
          <TokenomicsChart />
          <Box
            sx={{
              width: "100%",
              display: deviceWrapper("block", "none"),
              mt: "1rem",
            }}
          >
            {/* <TreasuryInfo /> */}
          </Box>
        </Box>
        <Box
          sx={{
            width: "28%",
            position: "sticky",
            top: deviceWrapper("0", "4.8rem"),
            ml: "1.5rem",
            display: deviceWrapper("none", "block"),
          }}
        >
          {/* <TreasuryInfo /> */}
        </Box>
      </Box>
    </Layout>
  );
};

export default Tokenomics;
