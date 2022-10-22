import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import * as React from "react";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Header } from "@components/creation/utilities/HeaderComponents";
import ChartBase from "./ChartBase";
import { deviceWrapper } from "@components/utilities/Style";
import { initialData } from "./data";

const Chart: React.FC = () => {
  const [view, setView] = React.useState<string>("Line");
  const [timeView, setTimeView] = React.useState<string>("90d");
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any[]>(initialData);
  const handleView = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };
  const handleTimeView = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    if (newView !== null) {
      setTimeView(newView);
    }
  };

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (initialData.length > 0) {
      let temp = [...initialData];
      let tempDate = new Date(temp[temp.length - 1].date);
      switch (timeView) {
        case "1h": {
          tempDate.setHours(tempDate.getHours() - 1);
          temp = temp.filter((i: any) => {
            return new Date(i.date) > tempDate;
          });
        }
        case "24h": {
          tempDate.setHours(tempDate.getHours() - 24);
          temp = temp.filter((i: any) => {
            return new Date(i.date) > tempDate;
          });
        }
        case "7d": {
          tempDate.setDate(tempDate.getDate() - 7);
          temp = temp.filter((i: any) => {
            return new Date(i.date) > tempDate;
          });
        }
        case "30d": {
          tempDate.setDate(tempDate.getDate() - 30);
          temp = temp.filter((i: any) => {
            return new Date(i.date) > tempDate;
          });
        }
        case "90d": {
          tempDate.setDate(tempDate.getDate() - 90);
          temp = temp.filter((i: any) => {
            return new Date(i.date) > tempDate;
          });
        }
        case "1yr": {
          tempDate.setDate(tempDate.getDate() - 365);
          temp = temp.filter((i: any) => {
            return new Date(i.date) > tempDate;
          });
        }
        default:
          {
            setData(initialData);
          }
          setData(temp);
      }
    }
  }, [timeView]);

  return (
    <Box
      sx={{
        width: "100%",
        fontSize: "1.1rem",
        textAlign: "center",
        mt: "1rem",
        mb: "1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: deviceWrapper("flex-start", "center"),
          flexDirection: deviceWrapper("column", "row"),
        }}
      >
        <Header title="Price chart" />
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            mt: deviceWrapper(".5rem", "0"),
          }}
        >
          <ToggleButtonGroup
            size="small"
            value={timeView}
            exclusive
            sx={{ mr: "1rem" }}
            color="primary"
            onChange={handleTimeView}
          >
            <ToggleButton value="1h" size="small">
              1h
            </ToggleButton>
            <ToggleButton value="24h" size="small">
              24h
            </ToggleButton>
            <ToggleButton value="7d" size="small">
              7d
            </ToggleButton>
            <ToggleButton value="30d" size="small">
              30d
            </ToggleButton>
            <ToggleButton value="90d" size="small">
              90d
            </ToggleButton>
            <ToggleButton value="1y" size="small">
              1y
            </ToggleButton>
            <ToggleButton value="All" size="small">
              All
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            size="small"
            value={view}
            exclusive
            color="primary"
            onChange={handleView}
          >
            <ToggleButton value="Line" size="small">
              <ShowChartIcon sx={{ fontSize: "1.3rem" }} />
            </ToggleButton>
            <ToggleButton value="Candle" size="small">
              <CandlestickChartIcon sx={{ fontSize: "1.3rem" }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        {loaded ? (
          <ChartBase view={view} timeView={timeView} data={data} />
        ) : (
          <>loading here...</>
        )}
      </Box>
    </Box>
  );
};

export default Chart;
