import { TokenomicsRow } from "@components/creation/tokenomics/AdvancedTokenomics/TokenomicSummary";
import { Header } from "@components/creation/utilities/HeaderComponents";
import BurnForm from "@components/dao/financials/token/BurnForm";
import Layout from "@components/dao/Layout";
import BackLink from "@components/utilities/BackLink";
import { Box } from "@mui/material";
import * as React from "react";

const Burn: React.FC = () => {
  return (
    <Layout>
      <BackLink />
      <Box sx={{ mt: "1rem" }} />
      <Header
        title="Token burn"
        large
        subtitle="Burning tokens is a good deflationary method and you can easily do this by simply selecting the amount of tokens you want to burn and when. Keep in mind that not every token in the treasury can be burned. In order to burn tokens, you will have to create a proposal first."
      />
      <TokenomicsRow
        title="Tokens available for burning"
        balance={2500000}
        percentage={25}
      />
      <Box sx={{ mt: "1rem" }} />
      <BurnForm />
    </Layout>
  );
};

export default Burn;
