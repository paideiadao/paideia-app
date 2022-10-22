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

const InfoGrid: React.FC = () => {
  const ticker = "PAI";
  const tempDate = new Date();
  const infoCards: IInfoCard[] = [
    {
      value: "$0.1342",
      widget: <PerformanceWidget value={0.17} />,
      title: `${ticker} Price`,
    },
    {
      value: "$0.2199",
      widget: <TimeWidget amount={24} unit="hrs" />,
      title: `High`,
    },
    {
      value: "$0.0119",
      widget: <TimeWidget amount={24} unit="hrs" />,
      title: `Low`,
    },
    {
      value: "$0.3117",
      widget: (
        <Box
          sx={{
            color: "text.secondary",
            fontSize: deviceWrapper(".8rem", "1rem"),
            fontWeight: 500,
          }}
        >
          {dateFormat(tempDate, "mm/dd/yyyy")}
        </Box>
      ),
      title: `All Time High`,
    },

    {
      value: "$18,578,159",
      widget: <PerformanceWidget value={-0.01} />,
      title: `Market Cap`,
    },
    {
      value: "$31,009,812",
      widget: <PerformanceWidget value={0.03} />,
      title: `Fully Diluted Market Cap`,
    },
    {
      value: "$11,849",
      widget: <PerformanceWidget value={0.21} />,
      title: `Volume (24hrs)`,
    },
    {
      value: "$0.3117",
      widget: (
        <Box
          sx={{
            color: "text.secondary",
            fontSize: deviceWrapper(".8rem", "1rem"),
            fontWeight: 500,
          }}
        >
          {dateFormat(tempDate, "mm/dd/yyyy")}
        </Box>
      ),
      title: `All Time High`,
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
