import { Header } from "@components/creation/utilities/HeaderComponents";
import BasicInformation from "@components/dao/dao-config/BasicInformation";
import Design from "@components/dao/dao-config/Design";
import Governance from "@components/dao/dao-config/Governance";
import Termination from "@components/dao/dao-config/Termination";
import Layout from "@components/dao/Layout";
import CancelLink from "@components/utilities/CancelLink";
import Divider from "@components/utilities/Divider";
import { deviceWrapper } from "@components/utilities/Style";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import ConfigApi, { IConfigData } from "@lib/dao/dao-config/ConfigApi";
import { ConfigContext } from "@lib/dao/dao-config/ConfigContext";
import { Box, Button } from "@mui/material";
import * as React from "react";

const DaoConfig: React.FC = () => {
  const [data, setData] = React.useState<IConfigData>({
    basicInformation: {
      daoName: "Paideia",
      daoUrl: "paideia.im/dao",
      shortDescription:
        "This is an example description for my example DAO called 'Paideia DAO Test'. Can you guess how many times I said example, without counting the last example?",
    },
    governance: {
      optimisticGovernance: false,
      quadraticVoting: false,
      timeToChallenge: 0,
      timeToChallengeUnits: "days",
      quorum: 4,
      voteDuration: 0,
      voteDurationUnits: "days",
      whitelist: [
        {
          alias: "",
          address: "",
          img: "",
        },
      ],
      amount: "",
      currency: "",
      supportNeeded: 50,
    },
    design: {
      logo: {
        url: "",
        file: undefined,
      },
      theme: 1,
      banner: {
        show: false,
        data: { url: "", file: undefined },
      },
      footer: {
        show: false,
        mainText: "",
        links: [],
      },
    },
  });

  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const api = new ConfigApi(globalContext.api, data, setData);
  React.useEffect(() => {
    if (globalContext.api !== undefined) {
      api.alert = globalContext.api.alert;
      api.setAlert = globalContext.api.setAlert;
    }
  }, [globalContext.api]);
  return (
    <ConfigContext.Provider
      value={{
        api,
      }}
    >
      <Layout>
        <Header title="DAO Config" large />
        <BasicInformation />
        <Divider />
        <Governance />
        <Divider />
        <Design />
        <Divider />
        <Termination />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: "1.5rem",
          }}
        >
          <CancelLink>
            <Button
              sx={{ width: "50%", mr: "1rem" }}
              size="small"
              variant="outlined"
            >
              Cancel
            </Button>
          </CancelLink>
          <Button
            sx={{ width: "50%" }}
            size="small"
            variant="contained"
            disabled
          >
            <Box sx={{ display: deviceWrapper("none", "block") }}>
              Submit Proposal
            </Box>
            <Box sx={{ display: deviceWrapper("block", "none") }}>Submit</Box>
          </Button>
        </Box>
      </Layout>
    </ConfigContext.Provider>
  );
};

export default DaoConfig;
