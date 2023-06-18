import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import { Box, Button } from "@mui/material";
import * as React from "react";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useRouter } from "next/router";
import Link from "next/link";
import Funds from "@components/dao/financials/treasury/Funds";
// import Chart from "@components/dao/financials/treasury/Chart";
import Transactions from "@components/dao/financials/treasury/Transactions";
import { deviceWrapper } from "@components/utilities/Style";

const TreasuryHeader: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;
  return (
    <Box sx={{ width: "100%", alignItems: "center", display: "flex" }}>
      <Header title="Treasury" large />
      <Link
        href={
          dao === undefined
            ? "/dao/financials/treasury/send"
            : `/${dao}/financials/treasury/send`
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
      </Link>
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

export const TreasuryInfo: React.FC = () => {
  const dao = "Paideia";
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "border.main",
        backgroundColor: "fileInput.outer",
        p: ".5rem",
        borderRadius: ".3rem",
        pb: 0,
      }}
    >
      <CapsInfo title={`${dao} Tokens`} />
      <Box sx={{ width: "100%", display: "flex" }}>
        <Box
          sx={{
            width: "50%",
            borderRight: "1px solid",
            borderColor: "border.main",
          }}
        >
          <ValueLabel label="Ticker" value="PAI" />
        </Box>
        <Box sx={{ width: "50%" }}>
          <ValueLabel label="Price" value="$0.1342" />
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", mt: "1rem" }}>
        <Box
          sx={{
            width: "50%",
            borderRight: "1px solid",
            borderColor: "border.main",
          }}
        >
          <ValueLabel label="High (24hrs)" value="$0.2199" small />
        </Box>
        <Box sx={{ width: "50%" }}>
          <ValueLabel label="Low (24hrs)" value="$0.0119" small />
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", mt: "1rem" }}>
        <Box
          sx={{
            width: "50%",
            borderRight: "1px solid",
            borderColor: "border.main",
          }}
        >
          <ValueLabel label="Market Cap" value="$10,467,400" small />
        </Box>
        <Box sx={{ width: "50%" }}>
          <ValueLabel label="Circulating Supply" value="11,759,754" small />
        </Box>
      </Box>

      <Box
        sx={{
          width: "calc(100% + 1rem)",
          display: "flex",
          justifyContent: "center",
          ml: "-.5rem",
          borderTop: 1,
          mt: "1rem",
          borderColor: "border.main",
        }}
      >
        <Link
          href={
            id === undefined
              ? "/dao/financials/token"
              : `/dao/${id}/financials/token`
          }
        >
          <Button
            variant="text"
            sx={{
              width: "100%",
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
            size="small"
          >
            Learn More
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

const Treasury: React.FC = () => {
  return (
    <Layout width={deviceWrapper("92%", "96%")}>
      <Box sx={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
        <Box sx={{ width: deviceWrapper("100%", "72%") }}>
          <TreasuryHeader />
          <Funds />
          {/* <Chart /> */}
          <Transactions />
          <Box
            sx={{
              width: "100%",
              display: deviceWrapper("block", "none"),
              mt: "1rem",
            }}
          >
            <TreasuryInfo />
          </Box>
        </Box>
        <Box
          sx={{
            width: "28%",
            position: "sticky",
            top: deviceWrapper("0", "4.8rem"),
            display: deviceWrapper("none", "block"),
            ml: "1.5rem",
          }}
        >
          <TreasuryInfo />
        </Box>
      </Box>
    </Layout>
  );
};

export default Treasury;
