import { Box } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import * as React from "react";
import { ITokenHolder, ITokenomics } from "@lib/creation/Interfaces";
import { percentage } from "../../../../lib/creation/Utilities";

import { LightTheme } from "../../../../theme/theme";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";

const PieChart: React.FC<ITokenomics> = (props) => {
  let themeContext = React.useContext<IThemeContext>(ThemeContext);
  let data = props;
  let tokenHolders = data.tokenHolders;
  return (
    <ResponsivePie
      data={[
        {
          id: "Unassigned Tokens",
          label: "Unassigned Tokens (Treasury)",
          value: data.tokenRemaining,
        },
      ].concat(
        data.distributions
          .filter((i: any) => i !== undefined)
          .map((i: any) => {
            return {
              id: i.distributionName,
              label: i.distributionName,
              value: i.balance,
            };
          })
      )}
      colors={{ scheme: "category10" }}
      valueFormat={(value) =>
        `${value} (${percentage(value / data.tokenAmount, 0, true)})`
      }
      sortByValue
      margin={{ top: 40, right: 70, bottom: 30, left: 70 }}
      innerRadius={0.5}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={
        themeContext.theme === LightTheme
          ? "rgba(0, 0, 0, 0.6)"
          : "rgba(255, 255, 255, 0.7)"
      }
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 3]],
      }}
    />
  );
};

export default PieChart;
