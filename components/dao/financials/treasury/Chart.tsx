import { deviceWrapper } from "@components/utilities/Style";
import { IObj } from "@lib/Interfaces";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import * as React from "react";
import BarChart from "./BarChart";
import StackedAreaChart from "./StackedAreaChart";

const Chart: React.FC = () => {
  const [view, setView] = React.useState("Current");

  const handleView = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const content: IObj<JSX.Element> = {
    Historic: <StackedAreaChart />,
    Current: <BarChart />,
  };
  return (
    <Box
      sx={{
        width: "100%",
        fontSize: "1.1rem",
        textAlign: "center",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Box sx={{ ml: "auto" }}>
          <ToggleButtonGroup
            size="small"
            value={view}
            exclusive
            color="primary"
            onChange={handleView}
          >
            <ToggleButton value="Current">Current</ToggleButton>
            <ToggleButton value="Historic">Historic</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={{ height: deviceWrapper("15rem", "21rem") }}>
        {content[view]}
      </Box>
    </Box>
  );
};

export default Chart;
