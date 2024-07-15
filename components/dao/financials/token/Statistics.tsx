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
  const ticker = props.ticker ?? props.data?.token_ticker ?? "Token";
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
            <Box sx={{ mr: ".5rem" }}>
              {safeFormattedString(
                props.data?.token_price_history_summary.hour_24.close
              )}
            </Box>
            <PerformanceWidget
              value={
                props.data?.token_price_history_summary.hour_24
                  .change_percentage
              }
              invert
            />
          </Box>
        </StatisticsCard>
        <StatisticsCard
          c={3}
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: "0" }}>Price Change</Box>
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
            <Box sx={{ mr: ".5rem" }}>
              {safeFormattedString(
                props.data?.token_price_history_summary.hour_24.abs_change
              )}
            </Box>
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
              {`${safeFormattedString(
                props.data?.token_price_history_summary.hour_24.high,
                ""
              )} /
                ${safeFormattedString(
                  props.data?.token_price_history_summary.hour_24.low
                )}`}
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
            <Box sx={{ mr: ".5rem" }}>
              {safeFormattedString(
                props.data?.token_price_history_summary.hour_24.volume,
                ""
              )}
            </Box>
            <PerformanceWidget
              value={
                (props.data?.token_price_history_summary.hour_24.volume -
                  props.data?.token_price_history_summary.yesterday.volume) /
                props.data?.token_price_history_summary.yesterday.volume
              }
              invert
            />
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
            <Box sx={{ mr: ".5rem" }}>
              {safeFormattedString(props.data?.market_cap.market_cap, "$", 0)}
            </Box>
          </Box>
        </StatisticsCard>
        <StatisticsCard title="Volume / Market Cap" c={1}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ mr: ".5rem" }}>
              {safeFormattedString(
                props.data?.token_price_history_summary.hour_24.volume /
                  props.data?.market_cap.market_cap,
                ""
              )}
            </Box>
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
            <Box sx={{ mr: ".5rem" }}>
              {safeFormattedString(
                props.data?.market_cap.diluted_market_cap,
                "$",
                0
              )}
            </Box>
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
              {`${safeFormattedString(
                props.data?.token_price_history_summary.yesterday.high,
                ""
              )} /
                ${safeFormattedString(
                  props.data?.token_price_history_summary.yesterday.low
                )}`}
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
              {`${safeFormattedString(
                props.data?.token_price_history_summary.yesterday.open,
                ""
              )} /
                ${safeFormattedString(
                  props.data?.token_price_history_summary.yesterday.close
                )}`}
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
            <Box sx={{ mr: ".5rem" }}>
              {safeFormattedString(
                props.data?.token_price_history_summary.yesterday.abs_change
              )}
            </Box>
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
                {safeFormattedString(
                  props.data?.token_price_history_summary.all_time.high
                )}
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
                {safeFormattedString(
                  props.data?.token_price_history_summary.all_time.low
                )}
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
                      props.data?.token_price_history_summary.all_time.open -
                    1
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
              {`${safeFormattedString(
                props.data?.token_price_history_summary.day_7.high,
                ""
              )} /
                ${safeFormattedString(
                  props.data?.token_price_history_summary.day_7.low
                )}`}
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
              {`${safeFormattedString(
                props.data?.token_price_history_summary.day_30.high,
                ""
              )} /
                ${safeFormattedString(
                  props.data?.token_price_history_summary.day_30.low
                )}`}
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
              {`${safeFormattedString(
                props.data?.token_price_history_summary.day_90.high,
                ""
              )} /
                ${safeFormattedString(
                  props.data?.token_price_history_summary.day_90.low
                )}`}
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
              {`${safeFormattedString(
                props.data?.token_price_history_summary.week_52.high,
                ""
              )} /
                ${safeFormattedString(
                  props.data?.token_price_history_summary.week_52.low
                )}`}
            </Box>
          </Box>
        </StatisticsCard>
      </StatisticsRow>
      <StatisticsRow title={`${ticker} Supply`}>
        <StatisticsCard title="Total Supply" c={0}>
          <Box
            sx={{
              fontSize: deviceWrapper(".75rem", "1rem"),
              display: "flex",
              alignItems: "center",
            }}
          >
            {safeFormattedString(props.data?.token_supply.total_supply, "")}
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
            {safeFormattedString(props.data?.token_supply.max_supply, "")}
          </Box>
        </StatisticsCard>
      </StatisticsRow>
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
    return x;
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

export default Statistics;
