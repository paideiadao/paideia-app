import {
  PerformanceWidget,
  TimeWidget,
} from "@components/dao/dashboard/FinancialSummary";
import { Box, Grid } from "@mui/material";
import * as React from "react";
import dateFormat from "dateformat";
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
        </Box>
        {props.widget}
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
  const ticker = props.data?.token_name;
  const tempDate = new Date();
  const infoCards: IInfoCard[] = [
    {
      value: `${props.data?.token_price_history_summary.hour_24.close.toLocaleString(
        window.navigator.language,
        {
          maximumFractionDigits: 4,
        }
      )} ERG`,
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
      value: `${props.data?.token_price_history_summary.hour_24.high.toLocaleString(
        window.navigator.language,
        {
          maximumFractionDigits: 4,
        }
      )} ERG`,
      widget: <TimeWidget amount={24} unit="hrs" />,
      title: `High`,
    },
    {
      value: `${props.data?.token_price_history_summary.hour_24.low.toLocaleString(
        window.navigator.language,
        {
          maximumFractionDigits: 4,
        }
      )} ERG`,
      widget: <TimeWidget amount={24} unit="hrs" />,
      title: `Low`,
    },
    {
      value: `${props.data?.token_price_history_summary.all_time.high.toLocaleString(
        window.navigator.language,
        {
          maximumFractionDigits: 4,
        }
      )} ERG`,
      widget: <></>,
      title: `All Time High`,
    },
    {
      value: "N/A",
      widget: <></>,
      title: `Market Cap`,
    },
    {
      value: `$${props.data?.market_cap.diluted_market_cap.toLocaleString(
        window.navigator.language,
        {
          maximumFractionDigits: 0,
        }
      )}`,
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
      value: `${props.data?.token_price_history_summary.all_time.low.toLocaleString(
        window.navigator.language,
        {
          maximumFractionDigits: 4,
        }
      )} ERG`,
      widget: <></>,
      title: `All Time Low`,
    },
  ];
  return (
    <Box sx={{ width: "100%", mt: ".5rem" }}>
      <Grid container spacing={1} alignItems="stretch">
        {infoCards.map((i: IInfoCard, c: number) => {
          return (
            <Grid item xs={6} sm={4} md={6} lg={3}>
              <InfoCard {...i} key={`info-card-${c}`} c={c} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default InfoGrid;
