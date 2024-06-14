import { ThemeContext } from "@lib/ThemeContext";
import { Box, CircularProgress } from "@mui/material";
import * as React from "react";
import DarkLogo from "../../../public/logos/dark_logo.svg";
import LightLogo from "../../../public/logos/light_logo.svg";
import { DarkTheme } from "@theme/theme";
import { CreationContext } from "@lib/creation/Context";
import { useRouter } from "next/router";

const CreationLoading: React.FC = (props) => {
  const router = useRouter();
  const themeContext = React.useContext(ThemeContext);
  const creationContext = React.useContext(CreationContext);
  const data = creationContext.api.data;
  const api = creationContext.api.api;
  const [logo, setLogo] = React.useState(
    themeContext.theme === DarkTheme ? LightLogo : DarkLogo
  );

  React.useEffect(() => {
    setLogo(themeContext.theme === DarkTheme ? LightLogo : DarkLogo);
  }, [themeContext.theme]);

  const getDAOCreationStatus = async () => {
    try {
      if (api) {
        const daos = (await api.get<any>("/dao/")).data;
        const dao = daos.filter(
          (dao: { dao_url: string }) =>
            dao.dao_url ===
            data.basicInformation.daoUrl.replace("app.paideia.im/", "")
        )[0];
        if (dao) {
          return true;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  };

  React.useEffect(() => {
    const pollStatus = async () => {
      const created = await getDAOCreationStatus();
      if (created) {
        router.push(
          `/${data.basicInformation.daoUrl.replace("app.paideia.im/", "")}`
        );
      }
    };

    const interval = setInterval(pollStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box
        sx={{
          color: "text.primary",
          position: "fixed",
          top: 0,
          left: 0,
          height: "3.5rem",
          display: "flex",
          width: " 100%",
          alignItems: "center",
          backgroundColor: "fileInput.outer",
          borderBottom: "1px solid",
          borderBottomColor: "border.main",
          pl: 2,
          img: {
            width: "7rem",
          },
        }}
      >
        <img src={logo.src} />
      </Box>
      <Box
        sx={{
          mt: "3.5rem",
          height: "calc(100vh - 13.5rem)",
          color: "text.primary",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          pl: "1rem",
          pr: "1rem",
        }}
      >
        <CircularProgress size="5rem" thickness={5} />
        <Box sx={{ textAlign: "center", fontSize: "1.2rem", mt: "1rem" }}>
          Please wait while we create your DAO
        </Box>
        <Box
          sx={{
            textAlign: "center",
            fontSize: "1rem",
            mt: ".2rem",
            color: "text.secondary",
          }}
        >
          Setting your DAOs governance structure, minting the token, making it
          look awesome! It might take upto an hour to complete.
        </Box>
      </Box>
    </>
  );
};

export default CreationLoading;
