import { ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "@lib/ThemeContext";
import { GlobalContext } from "@lib/AppContext";
import { AddWalletProvider } from "@components/wallet/AddWalletContext";
import { SlugContext } from "contexts/SlugContext";
import { WalletProvider } from "@components/wallet/WalletContext";
import { useEffect, useState } from "react";
import { AppApi } from "@lib/AppApi";
import { IDaoUserData } from "@lib/Interfaces";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import AbstractAlert, { IAlerts } from "@components/utilities/Alert";
import { MetaDataHandler } from "@lib/MetaDataHandler";
import { DarkTheme, LightTheme } from "@theme/theme";

interface ProvidersProps {
  loadingState: AppApi["loadingState"];
  themeState: AppApi["themeState"];
}
const Providers: React.FC<ProvidersProps> = ({
  children,
  loadingState,
  themeState,
}) => {
  const daoState = useState(undefined);
  const daoUserState = useState<IDaoUserData>(undefined);
  const alertState = useState<IAlerts[]>([]);
  const [metaData, setMetaData] = useState<any>({});
  const [daoSlugs, setDaoSlugs] = useState({});
  const [daoTokens, setDaoTokens] = useState([]);

  const { daoSlugsObject, daoSlugsIsLoading, daoTokensObject } = useDaoSlugs();

  const [alert, setAlert] = alertState;
  const [theme, setTheme] = themeState;

  useEffect(() => {
    setDaoSlugs(daoSlugsObject);
  }, [daoSlugsObject]);

  useEffect(() => {
    setDaoTokens(daoTokensObject);
  }, [daoTokensObject]);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") === "dark" ? DarkTheme : LightTheme);

    // "setTheme" is a useState method, doesn't need to be in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let temp = theme === LightTheme ? "light" : "dark";
    localStorage.setItem("theme", temp);
  }, [theme]);

  const api = new AppApi({
    themeState,
    loadingState,
    daoState,
    daoUserState,
    alertState,
  });

  const metadata = new MetaDataHandler(metaData, setMetaData);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AddWalletProvider>
        <WalletProvider>
          <SlugContext.Provider
            value={{ daoSlugs, setDaoSlugs, daoSlugsIsLoading, daoTokens }}
          >
            <GlobalContext.Provider value={{ api, metadata }}>
              <ThemeProvider theme={theme}>
                {children}
                <AbstractAlert
                  alerts={alert}
                  // set={(val: IAlerts[]) => setAlert(val)}
                  close={(i: number) => {
                    setAlert((prevState) =>
                      prevState.filter((_item, idx) => idx !== i)
                    );
                  }}
                />
              </ThemeProvider>
            </GlobalContext.Provider>
          </SlugContext.Provider>
        </WalletProvider>
      </AddWalletProvider>
    </ThemeContext.Provider>
  );
};
export default Providers;
