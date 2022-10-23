/*
 Each section of the tokenomics that has a vesting schedule attached needs to be included as an object
 within each vesting object, the emission data needs to be calculated for dates & displayed.
*/
import * as React from "react";
import { ITokenomics } from "@lib/creation/Interfaces";
import dateFormat from "dateformat";
import { LightTheme } from "../../../../theme/theme";
import {
  CreationContext,
  ICreationContext,
} from "../../../../lib/creation/Context";
import { Box } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";

const getEmissionLengthInDays = (length: number, units: string) => {
  switch (units) {
    case "days": {
      return length;
    }
    case "weeks": {
      return length * 7;
    }
    case "months": {
      return length * 30;
    }
    case "years": {
      return length * 365;
    }
  }
};

const frequencyLookup: { [key: string]: number } = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  yearly: 365,
};

const getLongestEmission = (data: any) => {
  let temp = data.map((i: any) =>
    getEmissionLengthInDays(i.emissionLength, i.emissionLengthUnits)
  );
  temp = temp.sort((a: any, b: any) => a - b);
  let max = Math.max(...temp);

  return temp[temp.indexOf(max)];
};

const getHighestFrequency = (data: any) => {
  let frequencies = ["yearly", "monthly", "weekly", "daily"];
  let maxIndex = 0;
  data
    .map((i: any) => i.frequency)
    .forEach((i: string) => {
      maxIndex =
        frequencies.indexOf(i) > maxIndex ? frequencies.indexOf(i) : maxIndex;
    });

  return frequencies[maxIndex];
};

const getDistributedTokens = (
  data: any,
  initial: number,
  bufferDays: number,
  currDay: number,
  totalDays: number
) => {
  // how long the current period is in days...
  let lengthInDays = getEmissionLengthInDays(
    data.emissionStartDate,
    data.emissionStartDateUnits
  );

  if (lengthInDays > bufferDays) {
    return 0;
  }
  if (lengthInDays > currDay || bufferDays > currDay) {
    return 0;
  }
  let temp = frequencyLookup[data.frequency];

  let conversion =
    data.frequency === "daily"
      ? (lengthInDays + currDay) / (totalDays + lengthInDays)
      : Math.round((lengthInDays + currDay) / temp) /
        Math.round((totalDays + lengthInDays) / temp);
  return conversion >= 1
    ? data.balance
    : initial + (data.balance - initial) * conversion;
};

const getChartData = (data: any) => {
  let longestEmission = getLongestEmission(
    data
      .filter((i: any) => i.vesting)
      .filter((i: any) => i.emissionStartDate > 0)
  );
  let highestFrequency = getHighestFrequency(
    data.filter((i: any) => i.vesting)
  );
  let colorLookup = ["red", "blue", "green", "orange", "brown"];
  let frequencyLookup = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };

  let minDate = Math.max(
    ...data
      .filter((i: any) => i.vesting)
      .filter((i: any) => i.emissionStartDate > 0)
      .map((i: any) => {
        return getEmissionLengthInDays(
          i.emissionStartDate,
          i.emissionStartDateUnits
        );
      })
  );
  let vestingData = data
    .filter((i: any) => i.vesting)
    .filter((i: any) => i.emissionStartDate > 0)
    .filter((i: any) => i.emissionLength > 0)
    .sort(
      (a: any, b: any) =>
        getEmissionLengthInDays(b.emissionLengthUnits, b.emissionLength) -
        getEmissionLengthInDays(a.emissionLengthUnits, a.emissionLength)
    )
    .map((i: any, c: number) => {
      let totalDays = getLongestEmission([i]);
      let initialAmt = (i.initialDistribution / 100) * i.balance;
      return {
        id: i.distributionName,
        color: colorLookup[c],
        label: i.distributionName,
        data:
          longestEmission === undefined
            ? []
            : [...Array.from(Array(longestEmission + minDate + 1).keys())]
                .filter(
                  (z: number) =>
                    z %
                      frequencyLookup[
                        highestFrequency as keyof typeof frequencyLookup
                      ] ===
                    0
                )
                .map((j: any, c: number) => {
                  let temp = new Date();
                  temp.setDate(temp.getDate() + j);
                  return {
                    x: new Date(temp),
                    y: getDistributedTokens(
                      i,
                      initialAmt,
                      minDate,
                      j,
                      totalDays
                    ),
                  };
                }),
      };
    });

  let nonVestingData =
    data.length === 0
      ? []
      : data
          .filter((i: any) => i.vesting === undefined || !i.vesting)
          .map((i: any, c: number) => {
            let longestPeriod =
              vestingData.length === 0 ? 10 : longestEmission + minDate;

            return {
              id: i.distributionName,
              color: colorLookup[c + vestingData.length],
              label: i.distributionName,
              data: [...Array.from(Array(longestPeriod + 1).keys())]
                .filter(
                  (z: number) =>
                    z %
                      frequencyLookup[
                        highestFrequency as keyof typeof frequencyLookup
                      ] ===
                    0
                )
                .map((j: any, c: number) => {
                  let temp = new Date();
                  temp.setDate(temp.getDate() + j);
                  return {
                    x: new Date(temp),
                    y: i.balance,
                  };
                }),
            };
          });

  return nonVestingData.concat(vestingData);
};

const Emissions: React.FC<ITokenomics> = (props) => {
  let creationContext = React.useContext<ICreationContext>(CreationContext);
  // sort by longest vesting data in the getChartData function
  const themeContext = React.useContext<IThemeContext>(ThemeContext);
  const [chartData, setChartData] = React.useState<any>(
    getChartData(props.distributions.filter((i: any) => i !== undefined))
  );

  React.useEffect(() => {
    setChartData(
      getChartData(props.distributions.filter((i: any) => i !== undefined))
    );
  }, [props.distributions]);

  return (
    <ResponsiveLine
      colors={(d: any) => d.color}
      margin={{ top: 50, right: 140, bottom: 50, left: 50 }}
      data={chartData}
      enableArea
      enablePoints={false}
      theme={{
        textColor:
          themeContext.theme === LightTheme
            ? "rgba(0, 0, 0, 0.6)"
            : "rgba(255, 255, 255, 0.7)",
      }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        useUTC: true,
        precision: "day",
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: "linear",
        stacked: true,
      }}
      curve="monotoneX"
      axisLeft={{
        legend: "Tokens",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: "middle",
        tickValues: 5,
      }}
      axisBottom={{
        format: "%b %y",
        //tickValues: `every 2 month`,
        legend: "Date",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      areaOpacity={1}
      pointSize={5}
      pointBorderWidth={1}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      useMesh={true}
      enableSlices={false}
      lineWidth={1}
      tooltip={(point: any) => {
        return (
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: ".1rem",
              textAlign: "center",
              p: 1,
              m: 1,
            }}
          >
            <Box sx={{ fontSize: "1.1rem" }}>
              {dateFormat(point.point.data.x, "mmmm dS, yyyy")}
            </Box>
            <Box sx={{ fontSize: "1rem" }}>{point.point.data.y.toFixed(2)}</Box>
          </Box>
        );
      }}
      legends={[
        {
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
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Emissions;
