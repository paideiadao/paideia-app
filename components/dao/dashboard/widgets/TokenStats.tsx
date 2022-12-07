import * as React from "react";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box, Paper, Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import useSWR from "swr";
import { fetcher } from "@lib/utilities";

const TokenStats: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const tokenomics = globalContext.api.daoData.tokenomics;

  const { data: tokenStats, error: error } = useSWR(
    tokenomics &&
      tokenomics.token_id &&
      `/assets/token_stats/${tokenomics.token_id}`,
    fetcher
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: ".3rem",
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        p: ".5rem",
        pl: 0,
        pr: 0,
        pb: 0,
        mb: "1rem",
      }}
    >
      <Box sx={{ pl: ".5rem" }}>
        <CapsInfo title="Token Stats" small />
      </Box>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            fontSize: ".7rem",
            color: "text.secondary",
            borderRight: "1px solid",
            borderColor: "border.main",
          }}
        >
          Ticker
          <Box sx={{ fontSize: "1.2rem", color: "text.primary" }}>
            {tokenomics?.token_ticker ?? "-"}
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            fontSize: ".7rem",
            color: "text.secondary",
          }}
        >
          Price
          <Box sx={{ fontSize: "1.2rem", color: "text.primary" }}>
            $
            {tokenStats?.price.toLocaleString(window.navigator.language, {
              maximumFractionDigits: 4,
            })}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "1rem",
          mb: "1rem",
        }}
      >
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            fontSize: ".7rem",
            color: "text.secondary",
            borderRight: "1px solid",
            borderColor: "border.main",
          }}
        >
          Market cap
          <Box sx={{ fontSize: "1rem", color: "text.primary" }}>
            $
            {tokenStats?.market_cap.diluted_market_cap.toLocaleString(
              window.navigator.language,
              { maximumFractionDigits: 0 }
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            fontSize: ".7rem",
            color: "text.secondary",
          }}
        >
          Tokens
          <Box sx={{ fontSize: "1rem", color: "text.primary" }}>
            {tokenStats?.token_supply.max_supply.toLocaleString(
              window.navigator.language,
              { maximumFractionDigits: 0 }
            ) ?? "-"}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          fontSize: ".9rem",
          mt: ".5rem",
          color: "primary.main",
          textAlign: "center",
          borderTop: "1px solid",
          borderTopColor: "border.main",
        }}
      >
        <Link href={dao === undefined ? "" : `/${dao}/financials/token`}>
          <Button
            size="small"
            sx={{
              width: "100%",
              pt: ".25rem",
              pb: ".25rem",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            Learn More
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default TokenStats;
