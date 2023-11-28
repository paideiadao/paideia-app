import React, { useEffect, useState, useMemo } from "react";
import "@styles/global.css";
import { AppProps } from "next/app";
import { DarkTheme, LightTheme } from "@theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "@lib/ThemeContext";
import { AppApi } from "@lib/AppApi";
import { MetaDataHandler } from "@lib/MetaDataHandler";
import { GlobalContext } from "@lib/AppContext";
import CssBaseline from "@mui/material/CssBaseline";
import Creation from "@pages/creation";
import DaoTemplate from "@components/dao/DaoTemplate";
import Head from "next/head";
import { useRouter } from "next/router";
import { WalletProvider } from "@components/wallet/WalletContext";
import { AddWalletProvider } from "@components/wallet/AddWalletContext";
import { AnimatePresence, motion } from "framer-motion";
import AbstractAlert, { IAlerts } from "@components/utilities/Alert";
import { IDaoUserData } from "@lib/Interfaces";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import { SlugContext } from "contexts/SlugContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { IUserStakeData } from "@components/dao/staking/YourStaking";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const daoVariants = {
  hidden: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState(LightTheme);
  const [daoData, setDaoData] = useState(undefined);
  const [daoUserData, setDaoUserData] = useState<IDaoUserData>(undefined);
  const [userStakeData, setUserStakeData] = useState<IUserStakeData>(undefined);
  const [metaData, setMetaData] = useState<any>({});
  const [loading, setLoading] = useState(0);
  const [alert, setAlert] = useState<IAlerts[]>([]);
  const router = useRouter();

  useEffect(() => {
    setTheme(localStorage.getItem("theme") === "dark" ? DarkTheme : LightTheme);
  }, []);

  useEffect(() => {
    let temp = theme === LightTheme ? "light" : "dark";
    localStorage.setItem("theme", temp);
  }, [theme]);

  const { daoSlugsObject, daoSlugsIsLoading, daoTokensObject } = useDaoSlugs();
  const [daoSlugs, setDaoSlugs] = useState({});
  const [daoTokens, setDaoTokens] = useState([]);
  useEffect(() => {
    setDaoSlugs(daoSlugsObject);
  }, [daoSlugsObject]);
  useEffect(() => {
    setDaoTokens(daoTokensObject);
  }, [daoTokensObject]);

  const api = new AppApi(
    alert,
    setAlert,
    theme,
    setTheme,
    daoData,
    setDaoData,
    daoUserData,
    setDaoUserData,
    userStakeData,
    setUserStakeData,
    loading,
    setLoading
  );

  const metadata = new MetaDataHandler(metaData, setMetaData);

  return (
    <>
      <Head>
        <title>Paideia | DAO Toolkit</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"
        />
      </Head>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading > 0 ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <AddWalletProvider>
          <WalletProvider>
            <SlugContext.Provider
              value={{ daoSlugs, setDaoSlugs, daoSlugsIsLoading, daoTokens }}
            >
              <GlobalContext.Provider value={{ api, metadata }}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {Component !== Creation ? (
                    <>
                      <DaoTemplate>
                        <AnimatePresence exitBeforeEnter>
                          <motion.main
                            variants={daoVariants}
                            initial="hidden"
                            animate="enter"
                            exit="exit"
                            transition={{ type: "linear" }}
                            className=""
                            key={router.route}
                          >
                            <Component {...pageProps} />
                          </motion.main>
                        </AnimatePresence>
                      </DaoTemplate>
                    </>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </ThemeProvider>
                <AbstractAlert
                  alerts={alert}
                  // set={(val: IAlerts[]) => setAlert(val)}
                  close={(i: number) => {
                    setAlert((prevState) =>
                      prevState.filter((_item, idx) => idx !== i)
                    );
                  }}
                />
              </GlobalContext.Provider>
            </SlugContext.Provider>
          </WalletProvider>
        </AddWalletProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
