import { useEffect, useCallback } from "react";

import Banner from "@components/creation/design/Banner";
import { ITheme, ThemeCard, themes } from "@components/creation/design/Design";
import Footer from "@components/creation/design/Footer";
import Logo from "@components/creation/design/Logo";
import {
  Header,
  LearnMore,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import { IDesign } from "@lib/creation/Interfaces";
import {
  ConfigContext,
  IConfigContext,
} from "@lib/dao/dao-config/ConfigContext";
import { Box } from "@mui/material";
import * as React from "react";

const Design: React.FC = () => {
  let context = React.useContext<IConfigContext>(ConfigContext);

  const [themeNumber, setThemeNumber] = React.useState<number>(1);

  let design = context.api.data.design;

  let setData = useCallback(
    (data: IDesign) => {
      context.api.setData({
        ...context.api.data,
        design: data,
      });
    },
    [context.api]
  );

  useEffect(() => {
    setData({
      ...design,
      theme: themeNumber,
    });
  }, [design, setData, themeNumber]);

  return (
    <>
      <Header
        title="DAO design"
        subtitle="Choose the perfect theme for your DAO, add a logo, upload a banner, and create you're own personalilzed footer"
      />
      <LearnMore
        title="Theme"
        // tooltipTitle="Title Here"
        tooltipText="Choose the color scheme that will appear on your DAO's dashboard for all users"
        // tooltipLink="/here"
      />
      <Subtitle subtitle="In order to best match your DAO design, you can select between four different theme colors and choose if you want a light or dark theme." />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
        }}
      >
        {themes.map((theme: ITheme) => {
          return (
            <ThemeCard
              key={theme.id}
              set={setThemeNumber}
              theme={themeNumber}
              i={theme}
            />
          );
        })}
      </Box>
      <Logo context={context} />
      <Banner context={context} />
      <Footer context={context} />
    </>
  );
};

export default Design;
