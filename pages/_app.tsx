import React, { useEffect, useState, useMemo } from "react";
import "@styles/global.css";
import { AppProps } from "next/app";
import { DarkTheme, LightTheme } from "@theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "@lib/ThemeContext";
import { AppApi } from "@lib/AppApi";
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
import useSWR from 'swr';
import { useDaoSlugs } from '@hooks/useDaoSlugs'
import { SlugContext } from "contexts/SlugContext";

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

  const [alert, setAlert] = useState<IAlerts[]>([]);
  const router = useRouter();

  useEffect(() => {
    setTheme(localStorage.getItem("theme") === "dark" ? DarkTheme : LightTheme);
  }, []);

  useEffect(() => {
    let temp = theme === LightTheme ? "light" : "dark";
    localStorage.setItem("theme", temp);
  }, [theme]);
  
  const { daoSlugsObject, daoSlugsIsLoading } = useDaoSlugs();
  const [daoSlugs, setDaoSlugs] = useState({})
  useEffect(() => {
    setDaoSlugs(daoSlugsObject)
  }, [daoSlugsObject])

const api = new AppApi(
  alert,
  setAlert,
  theme,
  setTheme,
  daoData,
  setDaoData,
  daoUserData,
  setDaoUserData
);

return (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"
      />
    </Head>
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AddWalletProvider>
        <WalletProvider>
          <SlugContext.Provider value={{ daoSlugs, setDaoSlugs, daoSlugsIsLoading }}>
            <GlobalContext.Provider value={{ api }}>
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
                set={(val: IAlerts[]) => setAlert(val)}
                close={(c: number) => {
                  let temp = [...alert];
                  temp.splice(c, 1);
                  setAlert(temp);
                }}
              />
            </GlobalContext.Provider>
          </SlugContext.Provider>
        </WalletProvider>
      </AddWalletProvider>
    </ThemeContext.Provider>
  </>
);
}

export default App;