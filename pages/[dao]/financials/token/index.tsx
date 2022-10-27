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

const Token: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;
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
      <InfoGrid />
      <Chart />
      <Statistics />
      <Markets />
    </Layout>
  );
};

export default Token;
