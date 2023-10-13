import React, { useEffect, useState } from "react";
import "@styles/global.css";
import { AppProps } from "next/app";
import { DarkTheme, LightTheme } from "@theme/theme";
import CssBaseline from "@mui/material/CssBaseline";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TemplateSelector from "@components/TemplateSelector";
import Head from "@components/Head";
import Providers from "@components/Providers";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const App = ({ Component, pageProps }: AppProps) => {
  const themeState = useState(LightTheme);
  const loadingState = useState(0);
  const [loading] = loadingState;

  return (
    <>
      <Head title="Paideia | DAO Toolkit" />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading > 0 ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Providers loadingState={loadingState} themeState={themeState}>
        <CssBaseline />
        {
          // The content for the page goes through the Template Selector
          // So we can have a consistent layout for all pages
        }
        <TemplateSelector Component={Component} pageProps={pageProps} />
      </Providers>
    </>
  );
};

export default App;
