import * as React from "react";
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";
import {
  compactCurrencyFormatter,
  currencyFormatter,
} from "@components/utilities/currency";
import { LightTheme } from "../../../../theme/theme";
import { Box } from "@mui/material";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";
import { deviceWrapper } from "@components/utilities/Style";

const data = [
  {
    value: "5,482",
    ticker: "SigUSD",
    percentage: "54",
    usd: 5482,
  },
  {
    value: "1,750",
    ticker: "PAI",
    percentage: "27",
    usd: 2698,
  },
  {
    value: "5,482",
    ticker: "ERG",
    percentage: "54",
    usd: 1107,
  },
  {
    value: "0.01",
    ticker: "BTC",
    percentage: "2.5",
    usd: 210,
  },
  {
    value: "0.038",
    ticker: "ETH",
    percentage: "2.5",
    usd: 202,
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
    usd: 95,
  },
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart: React.FC = () => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    setLoaded(true);
  }, []);
  const themeContext = React.useContext<IThemeContext>(ThemeContext);
  return !loaded ? (
    <></>
  ) : (
    <ResponsiveBar
      data={data}
      keys={["usd"]}
      indexBy="ticker"
      margin={{
        top: 10,
        right: 15,
        bottom: 50,
        left: 35,
      }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colorBy="indexValue"
      colors={{ scheme: "dark2" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Asset",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        format: (value) => `${compactCurrencyFormatter(value, 1)}`,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "$ Amount",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      valueFormat={(value) => `${compactCurrencyFormatter(+value, 1)}`}
      labelTextColor="#ffffff"
      labelSkipWidth={12}
      labelSkipHeight={12}
      tooltip={(bar: any) => {
        return (
          <Box
            sx={{
              backgroundColor: "fileInput.main",
              color: "text.primary",
              borderRadius: ".1rem",
              textAlign: "center",
              p: 1,
              m: 1,
              fontSize: deviceWrapper(".5rem", ".8rem"),
            }}
          >
            {bar.data.value + " "}
            {bar.data.ticker} ~ {`${compactCurrencyFormatter(bar.data.usd, 1)}`}
          </Box>
        );
      }}
      theme={{
        textColor:
          themeContext.theme === LightTheme
            ? "rgba(0, 0, 0, 0.6)"
            : "rgba(255, 255, 255, 0.7)",
      }}
      role="application"
      ariaLabel="Nivo bar chart demo"
    />
  );
};

export default BarChart;
