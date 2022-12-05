import { Header } from "@components/creation/utilities/HeaderComponents";
import {
  PerformanceWidget,
  TimeWidget,
} from "@components/dao/dashboard/FinancialSummary";
import { Box } from "@mui/material";
import * as React from "react";
import dateFormat from "dateformat";
import { deviceWrapper } from "@components/utilities/Style";

const StatisticsRow: React.FC<{ title: string; secondRow?: JSX.Element }> = (
  props
) => {
  return (
    <Box sx={{ mt: "1rem" }}>
      {props.title}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: ".5rem",
          flexWrap: deviceWrapper("wrap", "nowrap"),
        }}
      >
        {props.children}
      </Box>
      {props.secondRow}
    </Box>
  );
};

const StatisticsCard: React.FC<{ title: string | JSX.Element; c: number }> = (
  props
) => {
  return (
    <Box
      sx={{
        width: deviceWrapper("47.5%", "23.2%"),
        pl: deviceWrapper(".5rem", "1rem"),
        pt: ".5rem",
        pb: ".5rem",
        pr: deviceWrapper(".5rem", "1rem"),
        backgroundColor: "fileInput.outer",
        border: 1,
        borderColor: "border.main",
        borderRadius: ".4rem",
        mr: deviceWrapper(props.c % 2 === 0 ? ".75rem" : "0rem", "1rem"),
        mt: deviceWrapper(props.c > 1 ? ".75rem" : "0rem", "1rem"),

        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {props.children}
      <Box
        sx={{
          fontSize: deviceWrapper(".6rem", ".8rem"),
          color: "text.secondary",
        }}
      >
        {props.title}
      </Box>
    </Box>
  );
};

const Statistics: React.FC<any> = (props) => {
  const ticker = props.data?.token_name;
  return (
    <Box>
      <Header title={`${ticker} Statistics`} />
      <StatisticsRow title={`${ticker} Price`}>
        <StatisticsCard title={`Price`} c={0}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ mr: ".5rem" }}
            >{`${props.data?.token_price_history_summary.hour_24.close.toLocaleString(
              window.navigator.language,
              {
                maximumFractionDigits: 4,
              }
            )} ERG`}</Box>
            <PerformanceWidget
              value={
                props.data?.token_price_history_summary.hour_24
                  .change_percentage
              }
              invert
            />
          </Box>
        </StatisticsCard>
        <StatisticsCard title="Price Change" c={1}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>
              {`${props.data?.token_price_history_summary.hour_24.abs_change.toLocaleString(
                window.navigator.language,
                {
                  maximumFractionDigits: 4,
                }
              )} ERG`}
            </Box>
            <PerformanceWidget
              value={
                props.data?.token_price_history_summary.hour_24
                  .percentage_change
              }
              invert
            />
          </Box>
        </StatisticsCard>
        <StatisticsCard title="24hr High / 24hr Low" c={2}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>
              {`${props.data?.token_price_history_summary.hour_24.high.toLocaleString(
                window.navigator.language,
                {
                  maximumFractionDigits: 4,
                }
              )} /
                ${props.data?.token_price_history_summary.hour_24.low.toLocaleString(
                  window.navigator.language,
                  {
                    maximumFractionDigits: 4,
                  }
                )} ERG`}
            </Box>
          </Box>
        </StatisticsCard>
        <StatisticsCard
          c={3}
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: "0" }}>Trading Volume</Box>
              <TimeWidget amount={24} unit="hrs" small />
            </Box>
          }
        >
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>N/A</Box>
            {/* <PerformanceWidget value={0.21} invert /> */}
          </Box>
        </StatisticsCard>
      </StatisticsRow>
      <StatisticsRow title={`${ticker} Market Cap`}>
        <StatisticsCard title={`Market Cap`} c={0}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>N/A</Box>
            {/* <PerformanceWidget value={data.marketCapPercentage} invert /> */}
          </Box>
        </StatisticsCard>
        <StatisticsCard title="Volume / Market cap" c={1}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>N/A</Box>
          </Box>
        </StatisticsCard>
        <StatisticsCard title="Fully Diluted Market Cap" c={2}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ mr: ".5rem" }}
            >{`$${props.data?.market_cap.diluted_market_cap.toLocaleString(
              window.navigator.language,
              {
                maximumFractionDigits: 0,
              }
            )}`}</Box>
            <PerformanceWidget
              value={
                props.data?.token_price_history_summary.hour_24
                  .change_percentage
              }
              invert
            />
          </Box>
        </StatisticsCard>
      </StatisticsRow>
      <StatisticsRow title={`${ticker} Price Yesterday`}>
        <StatisticsCard title="Y High / Y Low" c={0}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>
              {`${props.data?.token_price_history_summary.yesterday.high.toLocaleString(
                window.navigator.language,
                {
                  maximumFractionDigits: 4,
                }
              )} /
                ${props.data?.token_price_history_summary.yesterday.low.toLocaleString(
                  window.navigator.language,
                  {
                    maximumFractionDigits: 4,
                  }
                )} ERG`}
            </Box>
          </Box>
        </StatisticsCard>
        <StatisticsCard title="Y Open / Y Close" c={1}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>
              {`${props.data?.token_price_history_summary.hour_24.open.toLocaleString(
                window.navigator.language,
                {
                  maximumFractionDigits: 4,
                }
              )} /
                ${props.data?.token_price_history_summary.hour_24.close.toLocaleString(
                  window.navigator.language,
                  {
                    maximumFractionDigits: 4,
                  }
                )} ERG`}
            </Box>
          </Box>
        </StatisticsCard>
        <StatisticsCard title="Price Change" c={2}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ mr: ".5rem" }}
            >{`${props.data?.token_price_history_summary.yesterday.abs_change.toLocaleString(
              window.navigator.language,
              {
                maximumFractionDigits: 4,
              }
            )} ERG`}</Box>
            <PerformanceWidget
              value={
                props.data?.token_price_history_summary.yesterday
                  .percentage_change
              }
              invert
              places={2}
            />
          </Box>
        </StatisticsCard>
      </StatisticsRow>
      <StatisticsRow
        title={`${ticker} Price History`}
        secondRow={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              mt: ".75rem",
              flexWrap: deviceWrapper("wrap", "nowrap"),
            }}
          >
            <StatisticsCard title="Alll time high" c={0}>
              <Box
                sx={{
                  fontSize: deviceWrapper(".75rem", "1rem"),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {`${props.data?.token_price_history_summary.all_time.high.toLocaleString(
                  window.navigator.language,
                  {
                    maximumFractionDigits: 4,
                  }
                )} ERG`}
                <Box
                  sx={{
                    ml: ".5rem",
                    fontSize: deviceWrapper(".65rem", ".9rem"),
                    color: "text.secondary",
                    fontWeight: 500,
                  }}
                >
                  {/* {dateFormat(data.allTimeHighDate, "mm/dd/yyyy")} */}
                </Box>
              </Box>
            </StatisticsCard>
            <StatisticsCard title="All time low" c={1}>
              <Box
                sx={{
                  fontSize: deviceWrapper(".75rem", "1rem"),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {`${props.data?.token_price_history_summary.all_time.low.toLocaleString(
                  window.navigator.language,
                  {
                    maximumFractionDigits: 4,
                  }
                )} ERG`}
                <Box
                  sx={{
                    ml: ".5rem",
                    fontSize: deviceWrapper(".65rem", ".9rem"),
                    color: "text.secondary",
                    fontWeight: 500,
                  }}
                >
                  {/* {dateFormat(data.allTimeLowDate, "mm/dd/yyyy")} */}
                </Box>
              </Box>
            </StatisticsCard>
            <StatisticsCard title="ROI" c={2}>
              <Box
                sx={{
                  fontSize: deviceWrapper(".75rem", "1rem"),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PerformanceWidget
                  value={
                    props.data?.token_price_history_summary.all_time.close /
                    props.data?.token_price_history_summary.all_time.open
                  }
                  invert
                  places={2}
                  large
                />
              </Box>
            </StatisticsCard>
          </Box>
        }
      >
        <StatisticsCard title="7d High / 7d Low" c={0}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>
              {`${props.data?.token_price_history_summary.day_7.high.toLocaleString(
                window.navigator.language,
                {
                  maximumFractionDigits: 4,
                }
              )} /
                ${props.data?.token_price_history_summary.day_7.low.toLocaleString(
                  window.navigator.language,
                  {
                    maximumFractionDigits: 4,
                  }
                )} ERG`}
            </Box>
          </Box>
        </StatisticsCard>
        <StatisticsCard title="30d High / 30d Low" c={1}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>
              {`${props.data?.token_price_history_summary.day_30.high.toLocaleString(
                window.navigator.language,
                {
                  maximumFractionDigits: 4,
                }
              )} /
                ${props.data?.token_price_history_summary.day_30.low.toLocaleString(
                  window.navigator.language,
                  {
                    maximumFractionDigits: 4,
                  }
                )} ERG`}
            </Box>
          </Box>
        </StatisticsCard>
        <StatisticsCard title="90d High / 90d Low" c={2}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>
              {`${props.data?.token_price_history_summary.day_90.high.toLocaleString(
                window.navigator.language,
                {
                  maximumFractionDigits: 4,
                }
              )} /
                ${props.data?.token_price_history_summary.day_90.low.toLocaleString(
                  window.navigator.language,
                  {
                    maximumFractionDigits: 4,
                  }
                )} ERG`}
            </Box>
          </Box>
        </StatisticsCard>
        <StatisticsCard title="52w High / 52w Low" c={3}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>
              {`${props.data?.token_price_history_summary.week_52.high.toLocaleString(
                window.navigator.language,
                {
                  maximumFractionDigits: 4,
                }
              )} /
                ${props.data?.token_price_history_summary.week_52.low.toLocaleString(
                  window.navigator.language,
                  {
                    maximumFractionDigits: 4,
                  }
                )} ERG`}
            </Box>
          </Box>
        </StatisticsCard>
      </StatisticsRow>
      <StatisticsRow title={`${ticker} supply`}>
        <StatisticsCard title="Total Supply" c={0}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            N/A
          </Box>
        </StatisticsCard>
        <StatisticsCard title="Max Supply" c={1}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            {props.data?.token_supply.max_supply.toLocaleString(
              window.navigator.language,
              {
                maximumFractionDigits: 0,
              }
            )}
          </Box>
        </StatisticsCard>
      </StatisticsRow>
    </Box>
  );
};

export default Statistics;
