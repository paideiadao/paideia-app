import { addDays } from "@lib/utilities";
import * as React from "react";
import { ResponsiveLine } from "@nivo/line";
import dateFormat from "dateformat";
import { compactCurrencyFormatter } from "@components/utilities/currency";
import { Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";
import { LightTheme } from "@theme/theme";

let fiveAgo = dateFormat(addDays(-5), "yyyy-m-d");
let fourAgo = dateFormat(addDays(-4), "yyyy-m-d");
let threeAgo = dateFormat(addDays(-3), "yyyy-m-d");
let twoAgo = dateFormat(addDays(-2), "yyyy-m-d");
let oneAgo = dateFormat(addDays(-1), "yyyy-m-d");
let ago = dateFormat(addDays(0), "yyyy-m-d");
const data = [
  {
    id: "ERG",
    color: "#987284",
    data: [
      {
        x: fiveAgo,
        y: 4100,
      },
      {
        x: fourAgo,
        y: 4500,
      },
      {
        x: threeAgo,
        y: 4800,
      },
      {
        x: twoAgo,
        y: 5500,
      },
      {
        x: oneAgo,
        y: 5800,
      },
      {
        x: ago,
        y: 6500,
      },
    ],
  },
  {
    id: "SigUSD",
    color: "#987284",
    data: [
      {
        x: fiveAgo,
        y: 820,
      },
      {
        x: fourAgo,
        y: 320,
      },
      {
        x: threeAgo,
        y: 1220,
      },
      {
        x: twoAgo,
        y: 780,
      },
      {
        x: oneAgo,
        y: 2980,
      },
      {
        x: ago,
        y: 2120,
      },
    ],
  },
  {
    id: "PAI",
    color: "#987284",
    data: [
      {
        x: fiveAgo,
        y: 820,
      },
      {
        x: fourAgo,
        y: 320,
      },
      {
        x: threeAgo,
        y: 1220,
      },
      {
        x: twoAgo,
        y: 780,
      },
      {
        x: oneAgo,
        y: 2980,
      },
      {
        x: ago,
        y: 2120,
      },
    ],
  },

  {
    id: "BTC",
    color: "#987284",
    data: [
      {
        x: fiveAgo,
        y: 820,
      },
      {
        x: fourAgo,
        y: 320,
      },
      {
        x: threeAgo,
        y: 1220,
      },
      {
        x: twoAgo,
        y: 780,
      },
      {
        x: oneAgo,
        y: 2980,
      },
      {
        x: ago,
        y: 2120,
      },
    ],
  },
  {
    id: "ETH",
    color: "#987284",
    data: [
      {
        x: fiveAgo,
        y: 82,
      },
      {
        x: fourAgo,
        y: 32,
      },
      {
        x: threeAgo,
        y: 122,
      },
      {
        x: twoAgo,
        y: 78,
      },
      {
        x: oneAgo,
        y: 298,
      },
      {
        x: ago,
        y: 212,
      },
    ],
  },
  {
    id: "ADA",
    color: "#987284",
    data: [
      {
        x: fiveAgo,
        y: 82,
      },
      {
        x: fourAgo,
        y: 32,
      },
      {
        x: threeAgo,
        y: 122,
      },
      {
        x: twoAgo,
        y: 78,
      },
      {
        x: oneAgo,
        y: 298,
      },
      {
        x: ago,
        y: 212,
      },
    ],
  },
  {
    id: "UST",
    color: "#987284",
    data: [
      {
        x: fiveAgo,
        y: 82,
      },
      {
        x: fourAgo,
        y: 32,
      },
      {
        x: threeAgo,
        y: 122,
      },
      {
        x: twoAgo,
        y: 78,
      },
      {
        x: oneAgo,
        y: 298,
      },
      {
        x: ago,
        y: 212,
      },
    ],
  },
].reverse();

const StackedAreaChart: React.FC = () => {
  const themeContext = React.useContext<IThemeContext>(ThemeContext);

  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
    setLoaded(true);
  }, []);
  return !loaded ? (
    <></>
  ) : (
    <ResponsiveLine
      data={data}
      margin={{ top: 25, right: 90, bottom: 25, left: 35 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        useUTC: false,
        precision: "day",
      }}
      colors={{ scheme: "dark2" }}
      areaOpacity={0.5}
      enablePoints={false}
      xFormat="time:%Y-%m-%d"
      curve="linear"
      // tooltip={(point) => {
      //   return (
      //     <Box
      //       sx={{
      //         backgroundColor: 'white',
      //         borderRadius: '.1rem',
      //         textAlign: 'center',
      //         fontSize: '.8rem',
      //         p: 1,
      //         m: 1
      //       }}
      //     >
      //       {data.map((i: any, c: number) => {
      //         return <Box sx={{display: 'flex', width: '8rem'}}>
      //           <Box sx={{width: '30%', textAlign: 'left'}}>
      //             <CircleIcon style={{fill: i.color}}/>
      //             {i.id}
      //           </Box>
      //         </Box>
      //       })}
      //       {point.point.data.y}

      //     </Box>
      //   );
      // }}
      yScale={{
        type: "linear",
        stacked: true,
      }}
      enableArea
      axisLeft={{
        legendOffset: 12,
        format: (value) => `${compactCurrencyFormatter(value, 1)}`,
      }}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 1 days",
        legend: "Last 5 days",
        legendOffset: -12,
      }}
      enableSlices={"x"}
      theme={{
        textColor:
          themeContext.theme === LightTheme
            ? "rgba(0, 0, 0, 0.6)"
            : "rgba(255, 255, 255, 0.7)",
      }}
      useMesh={true}
      // tooltip={point => {
      //   return <Box>
      //     Here
      //   </Box>
      // }}
      legends={[
        {
          onClick: (d: any) => {},
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
        },
      ]}
    />
  );
};

export default StackedAreaChart;
