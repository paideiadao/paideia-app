import { Header } from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import { Box, Button } from "@mui/material";
import * as React from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import InfoGrid from "@components/dao/financials/token/InfoGrid";
import Chart from "@components/dao/financials/token/Chart/Chart";
import Statistics from "@components/dao/financials/token/Statistics";
import Markets from "@components/dao/financials/token/Markets";
import { useRouter } from "next/router";
import Link from "next/link";
import { deviceWrapper } from "@components/utilities/Style";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import useSWR from "swr";
import { fetcher } from "@lib/utilities";

const Token: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [daoData] = globalContext.api.daoState;
  const tokenomics = daoData?.tokenomics;

  const { data: tokenStats, error: error } = useSWR(
    tokenomics &&
      tokenomics.token_id &&
      `/assets/token_stats/${tokenomics.token_id}`,
    fetcher
  );

  return (
    <Layout width={deviceWrapper("94%", "97%")}>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Header title="Token Information" large />
        <Link
          href={
            dao === undefined
              ? "/dao/financials/token/burn"
              : `/${dao}/financials/token/burn`
          }
        >
          <Button
            disabled
            variant="contained"
            sx={{ ml: "auto" }}
            size="small"
            endIcon={<LocalFireDepartmentIcon />}
          >
            <Box sx={{ display: deviceWrapper("none", "block") }}>
              Burn Tokens
            </Box>
            <Box sx={{ display: deviceWrapper("block", "none") }}>Burn</Box>
          </Button>
        </Link>
      </Box>
      <InfoGrid data={tokenStats} />
      <Chart data={tokenStats} />
      <Statistics data={tokenStats} />
      <Markets data={tokenStats} />
    </Layout>
  );
};

export default Token;
