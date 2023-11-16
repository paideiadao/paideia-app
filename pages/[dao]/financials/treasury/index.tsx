import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import { Box, Button, Link } from "@mui/material";
import * as React from "react";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Funds from "@components/dao/financials/treasury/Funds";
// import Chart from "@components/dao/financials/treasury/Chart";
import Transactions from "@components/dao/financials/treasury/Transactions";
import { deviceWrapper } from "@components/utilities/Style";
import TokenStats from "@components/dao/dashboard/widgets/TokenStats";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import useSWR from "swr";
import { fetcher } from "@lib/utilities";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";

const TreasuryHeader: React.FC<{ address: string }> = ({ address }) => {
  const router = useRouter();
  const { dao } = router.query;
  return (
    <Box sx={{ width: "100%", alignItems: "center", display: "flex" }}>
      <Header title="Treasury" large />
      <Link
        href={`https://explorer.ergoplatform.com/en/addresses/${address}`}
        target="_blank"
        rel="noreferrer"
        sx={{ ml: 0.5 }}
      >
        <ArrowOutwardIcon sx={{ fontSize: "inherit" }} />
      </Link>
      <NextLink
        href={
          dao === undefined ? "/dao/proposal/create" : `/${dao}/proposal/create`
        }
      >
        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          endIcon={<PaymentsIcon />}
          size="small"
        >
          <Box sx={{ display: deviceWrapper("none", "block") }}>Send Funds</Box>
          <Box sx={{ display: deviceWrapper("block", "none") }}>Send</Box>
        </Button>
      </NextLink>
    </Box>
  );
};

const ValueLabel: React.FC<{
  label: string;
  value: string;
  small?: boolean;
}> = (props) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          fontSize: props.small ? ".6rem" : ".8rem",
          color: "text.secondary",
        }}
      >
        {props.label}
      </Box>
      <Box
        sx={{
          fontSize: props.small ? ".9rem" : "1.3rem",
          color: "text.primary",
        }}
      >
        {props.value}
      </Box>
    </Box>
  );
};

const Treasury: React.FC = () => {
  const context = React.useContext<IGlobalContext>(GlobalContext);
  const daoId = context.api.daoData?.id;
  const { data: treasuryData, error: error } = useSWR(
    daoId && `/dao/treasury/${daoId}`,
    fetcher
  );
  return (
    <Layout width={deviceWrapper("92%", "96%")}>
      <Box sx={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
        <Box sx={{ width: deviceWrapper("100%", "72%") }}>
          <TreasuryHeader address={treasuryData?.address} />
          <Funds treasuryData={treasuryData} />
          {/* <Chart /> */}
          <Transactions />
          <Box
            sx={{
              width: "100%",
              display: deviceWrapper("block", "none"),
              mt: "1rem",
            }}
          >
            <TokenStats />
          </Box>
        </Box>
        <Box
          sx={{
            width: "28%",
            position: "sticky",
            display: deviceWrapper("none", "block"),
            ml: "1.5rem",
          }}
        >
          <TokenStats />
        </Box>
      </Box>
    </Layout>
  );
};

export default Treasury;
