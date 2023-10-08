import { Header } from "@components/creation/utilities/HeaderComponents";
import { Box, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { deviceWrapper } from "@components/utilities/Style";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@lib/utilities";

const FundCard: React.FC<{
  width: string | any;
  value: string;
  ticker: string;
  percentage?: string;
  usd?: string;
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
        {props.percentage}
        {props.percentage !== undefined ? "%" : null} (${props.usd} USD)
      </Box>
    </Box>
  );
};

interface IFundCard {
  value: string;
  ticker: string;
  percentage?: string;
  usd?: string;
}

const defaultCards: IFundCard[] = [
  {
    value: "",
    ticker: "Loading...",
  },
];

const Funds: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [funds, setFunds] = useState<IFundCard[]>(defaultCards);
  const context = useContext<IGlobalContext>(GlobalContext);
  const daoId = context.api.daoData?.id;

  const { data: treasuryData, error: error } = useSWR(
    daoId && `/dao/treasury/${daoId}`,
    fetcher
  );

  useEffect(() => {
    const getData = async () => {
      const ergs =
        treasuryData.balance.confirmed.nanoErgs / (1000 * 1000 * 1000);
      const price = (
        await context.api.get<any>("https://api.ergopad.io/asset/price/ergo")
      ).data.price;
      setFunds([
        {
          value: ergs.toString(),
          ticker: "ERG",
          usd: (price * ergs).toFixed(2).toString(),
        },
        ...[
          ...treasuryData.balance.confirmed.tokens.map(
            (token: { amount: number; decimals: number; name: string }) => {
              return {
                value: token.amount / Math.pow(10, token.decimals),
                ticker: token.name.toUpperCase().slice(0, 3),
              };
            }
          ),
        ],
      ]);
    };

    if (treasuryData) {
      getData();
    }
  }, [treasuryData]);

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
          Total $N/A USD
        </Box>
      </Box>
      <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
        {!show
          ? funds
              .slice(0, 4)
              .map((i: IFundCard, c: number) => (
                <FundCard
                  {...i}
                  width={deviceWrapper("46%", "23.3%")}
                  key={`summary-financial-card-${c}`}
                />
              ))
          : funds.map((i: IFundCard, c: number) => (
              <FundCard
                {...i}
                width={deviceWrapper("46%", "23.3%")}
                key={`all-financial-card-${c}`}
              />
            ))}
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", my: "1rem" }}>
        <Button
          disabled={funds.length <= 4}
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
