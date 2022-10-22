import { Header } from "@components/creation/utilities/HeaderComponents";
import { Box, Button } from "@mui/material";
import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import { deviceWrapper } from "@components/utilities/Style";

const FundCard: React.FC<{
  width: string | any;
  value: string;
  ticker: string;
  percentage: string;
  usd: string;
}> = (props) => {
  return (
    <Box
      sx={{
        width: props.width,
        textAlign: deviceWrapper("left", "center"),
        backgroundColor: "fileInput.outer",
        m: ".3rem",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".3rem",
        p: ".5rem",
      }}
    >
      <Box sx={{ color: "text.primary", fontSize: "1.1rem", fontWeight: 550 }}>
        {props.value}
        <Box
          sx={{
            display: "inline",
            ml: ".5rem",
            color: "text.secondary",
            fontSize: ".9rem",
          }}
        >
          {props.ticker}
        </Box>
      </Box>
      <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
        {props.percentage}% (${props.usd} USD)
      </Box>
    </Box>
  );
};

interface IFundCard {
  value: string;
  ticker: string;
  percentage: string;
  usd: string;
}

const summaryCards: IFundCard[] = [
  {
    value: "5,482",
    ticker: "SigUSD",
    percentage: "54",
    usd: "5,482",
  },
  {
    value: "1,750",
    ticker: "PAI",
    percentage: "27",
    usd: "2,698",
  },
  {
    value: "5,482",
    ticker: "ERG",
    percentage: "54",
    usd: "1,107",
  },
  {
    value: "5,482",
    ticker: "Other (4)",
    percentage: "7",
    usd: "713",
  },
];

const allCards: IFundCard[] = [
  {
    value: "5,482",
    ticker: "SigUSD",
    percentage: "54",
    usd: "5,482",
  },
  {
    value: "1,750",
    ticker: "PAI",
    percentage: "27",
    usd: "2,698",
  },
  {
    value: "5,482",
    ticker: "ERG",
    percentage: "54",
    usd: "1,107",
  },
  {
    value: "0.01",
    ticker: "BTC",
    percentage: "2.5",
    usd: "210",
  },
  {
    value: "0.038",
    ticker: "ETH",
    percentage: "2.5",
    usd: "202",
  },
  {
    value: "87",
    ticker: "ADA",
    percentage: "1",
    usd: "105",
  },
  {
    value: "95",
    ticker: "UST",
    percentage: "1",
    usd: "95",
  },
];

const Funds: React.FC = () => {
  const [show, setShow] = React.useState<boolean>(false);
  return (
    <Box sx={{ mt: "1.25rem", width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mb: ".5rem",
        }}
      >
        <Header title="Funds" />
        <Box
          sx={{
            backgroundColor: "fileInput.main",
            color: "text.primary",
            borderRadius: ".2rem",
            ml: "auto",
            p: ".25rem",
            border: "1px solid",
            borderColor: "border.main",
            pt: ".1rem",
            pb: ".1rem",
            fontSize: deviceWrapper(".7rem", ".9rem"),
            fontWeight: 500,
          }}
        >
          Total $10,045 USD
        </Box>
      </Box>
      <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
        {!show
          ? summaryCards.map((i: IFundCard, c: number) => (
              <FundCard
                {...i}
                width={deviceWrapper("46%", "23.3%")}
                key={`summary-financial-card-${c}`}
              />
            ))
          : allCards.map((i: IFundCard, c: number) => (
              <FundCard
                {...i}
                width={deviceWrapper("46%", "23.3%")}
                key={`all-financial-card-${c}`}
              />
            ))}
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => setShow(!show)}
          size="small"
          endIcon={!show ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        >
          {!show ? (
            <>Show other fund sources </>
          ) : (
            <>Hide other fund sources </>
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Funds;
