import {
  PerformanceWidget,
  TimeWidget,
} from "@components/dao/dashboard/FinancialSummary";
import { Box, Grid, CircularProgress } from "@mui/material";
import * as React from "react";
import { deviceWrapper } from "@components/utilities/Style";

interface IInfoCard {
  value: string;
  widget: JSX.Element;
  title: string;
  c?: number;
}

const InfoCard: React.FC<IInfoCard> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        p: ".5rem",
        display: "flex",
        alignItems: deviceWrapper("flex-start", "center"),
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "fileInput.outer",
        borderRadius: ".4rem",
        border: 1,
        borderColor: "border.main",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            fontSize: deviceWrapper(".95rem", "1.5rem"),
            fontWeight: 500,
            mr: deviceWrapper(".25rem", ".5rem"),
          }}
        >
          {props.value}
          {/* {props.value ?? <CircularProgress sx={{ mt: 1 }} />} */}
        </Box>
        {props.value ? props.widget : null}
      </Box>
      <Box
        sx={{
          fontSize: deviceWrapper(".7rem", ".9rem"),
          color: "text.secondary",
          mt: deviceWrapper(".05rem", "0"),
        }}
      >
        {props.title}
      </Box>
    </Box>
  );
};

const InfoGrid: React.FC<any> = (props) => {
  const ticker = props.ticker ?? props.data?.token_name ?? "Token";
  const tempDate = new Date();
  const infoCards: IInfoCard[] = [
    {
      value: safeFormattedString(
        props.data?.token_price_history_summary.hour_24.close
      ),
      widget: (
        <PerformanceWidget
          value={
            props.data?.token_price_history_summary.hour_24.change_percentage
          }
        />
      ),
      title: `${ticker} Price`,
    },
    {
      value: safeFormattedString(
        props.data?.token_price_history_summary.hour_24.high
      ),
      widget: <TimeWidget amount={24} unit="hrs" />,
      title: `High`,
    },
    {
      value: safeFormattedString(
        props.data?.token_price_history_summary.hour_24.low
      ),
      widget: <TimeWidget amount={24} unit="hrs" />,
      title: `Low`,
    },
    {
      value: safeFormattedString(
        props.data?.token_price_history_summary.all_time.high
      ),
      widget: <></>,
      title: `All Time High`,
    },
    {
      value: "N/A",
      widget: <></>,
      title: `Market Cap`,
    },
    {
      value: safeFormattedString(
        props.data?.market_cap.diluted_market_cap,
        "$",
        0
      ),
      widget: (
        <PerformanceWidget
          value={
            props.data?.token_price_history_summary.hour_24.change_percentage
          }
        />
      ),
      title: `Fully Diluted Market Cap`,
    },
    {
      value: "N/A",
      widget: <></>,
      title: `Volume (24hrs)`,
    },
    {
      value: safeFormattedString(
        props.data?.token_price_history_summary.all_time.low
      ),
      widget: <></>,
      title: `All Time Low`,
    },
  ];
  return (
    <Box sx={{ width: "100%", mt: ".5rem" }}>
      <Grid container spacing={1} alignItems="stretch">
        {infoCards.map((i: IInfoCard, c: number) => {
          return (
            <Grid key={`info-card-grid-${c}`} item xs={6} sm={4} md={6} lg={3}>
              <InfoCard {...i} key={`info-card-${c}`} c={c} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const safeFormattedString = (
  x: any,
  currency: string = "ERG",
  format: number = 4
) => {
  if (x === null) {
    return "-";
  }
  if (x === undefined) {
    return "";
  }
  const pre = currency === "$" ? currency : "";
  const post = currency === "ERG" ? " ERG" : "";
  return (
    pre +
    x.toLocaleString(window.navigator.language, {
      maximumFractionDigits: format,
    }) +
    post
  );
};

export default InfoGrid;
