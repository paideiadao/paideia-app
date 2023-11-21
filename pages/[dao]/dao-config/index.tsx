import { Header } from "@components/creation/utilities/HeaderComponents";
import BasicInformation from "@components/dao/dao-config/BasicInformation";
import Design from "@components/dao/dao-config/Design";
import Governance from "@components/dao/dao-config/Governance";
import Termination from "@components/dao/dao-config/Termination";
import Layout from "@components/dao/Layout";
import VoteDuration from "@components/dao/proposal/vote/YesNo/Actions/VoteDuration";
import CancelLink from "@components/utilities/CancelLink";
import Divider from "@components/utilities/Divider";
import { deviceWrapper } from "@components/utilities/Style";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import ConfigApi, { IConfigData } from "@lib/dao/dao-config/ConfigApi";
import { ConfigContext } from "@lib/dao/dao-config/ConfigContext";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const defaultState: IConfigData = {
  basicInformation: {
    daoName: "",
    daoUrl: "",
    shortDescription: "",
  },
  governance: {
    optimisticGovernance: false,
    quadraticVoting: false,
    timeToChallenge: 0,
    timeToChallengeUnits: "days",
    quorum: 0,
    voteDuration: 0,
    voteDurationUnits: "days",
    whitelist: [],
    amount: "",
    currency: "",
    supportNeeded: 0,
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
};

const DaoConfig: React.FC = () => {
  const [data, setData] = useState<IConfigData>(defaultState);
  const [diff, setDiff] = useState<IConfigData>(defaultState);

  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const api = new ConfigApi(globalContext.api, data, setData);
  const daoData = globalContext.api.daoData;
  const router = useRouter();
  const { dao } = router.query

  useEffect(() => {
    if (daoData) {
      setData({
        ...data,
        basicInformation: {
          daoName: daoData.dao_name,
          daoUrl: daoData.dao_url,
          shortDescription: daoData.dao_short_description,
        },
        governance: {
          ...data.governance,
          supportNeeded: daoData.governance.support_needed / 10,
          quorum: daoData.governance.quorum / 10,
          voteDuration: daoData.governance.vote_duration__sec / 60,
          voteDurationUnits: "minutes",
        },
      });
      setDiff({
        ...defaultState,
        basicInformation: {
          daoName: daoData.dao_name,
          daoUrl: daoData.dao_url,
          shortDescription: daoData.dao_short_description,
        },
      });
    }
  }, [daoData]);

  const submit = () => {
    const d = generateDiff(diff, data)
    const params = generateRedirectUrl(d)
    router.push(`/${dao}/proposal/create?auto_update_config=true&${params}`)
  }

  return (
    <ConfigContext.Provider value={{ api }}>
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
            onClick={submit}
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

const generateDiff = ( initState: IConfigData, currentState: IConfigData) => {
  return {
    "im.paideia.dao.name": initState.basicInformation.daoName === currentState.basicInformation.daoName ? null : currentState.basicInformation.daoName,
    "im.paideia.dao.url": initState.basicInformation.daoUrl === currentState.basicInformation.daoUrl ? null : currentState.basicInformation.daoUrl,
    "im.paideia.dao.desc": initState.basicInformation.shortDescription === currentState.basicInformation.shortDescription ? null : currentState.basicInformation.shortDescription,
  };
};

const generateRedirectUrl = (diff: any) => {
  const url: any = {}
  Object.keys(diff).forEach(key => {
    if (diff[key] !== null) {
      url[key] = diff[key]
    }
  })
  const params = new URLSearchParams(url)
  return params.toString()
}

export default DaoConfig;
