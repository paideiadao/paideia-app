import { Header } from "@components/creation/utilities/HeaderComponents";
import BasicInformation from "@components/dao/dao-config/BasicInformation";
import Design from "@components/dao/dao-config/Design";
import Governance from "@components/dao/dao-config/Governance";
import Termination from "@components/dao/dao-config/Termination";
import Tokenomics from "@components/dao/dao-config/Tokenomics";
import Layout from "@components/dao/Layout";
import CancelLink from "@components/utilities/CancelLink";
import Divider from "@components/utilities/Divider";
import { deviceWrapper } from "@components/utilities/Style";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import ConfigApi, { IConfigData } from "@lib/dao/dao-config/ConfigApi";
import { ConfigContext } from "@lib/dao/dao-config/ConfigContext";
import { fetcher } from "@lib/utilities";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

const defaultState: IConfigData = {
  basicInformation: {
    daoName: "",
    daoUrl: "",
    shortDescription: "",
  },
  tokenomics: {
    type: "",
    tokenName: "",
    tokenId: "",
    // check restrictions...
    tokenTicker: "",
    tokenAmount: 0,
    tokenImage: "",
    tokenImageUrl: "",
    tokenRemaining: 0,
    tokenHolders: [],
    activateTokenomics: false,
    distributions: [],
    // staking details
    stakingConfig: {
      stakePoolSize: 0,
      stakingEmissionAmount: 0,
      stakingEmissionDelay: 0,
      stakingCycleLength: 0,
      stakingProfitSharePct: 0,
    },
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
    pureParticipationWeight: 0,
    participationWeight: 0,
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
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IConfigData>(defaultState);
  const [diff, setDiff] = useState<IConfigData>(defaultState);

  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const api = new ConfigApi(globalContext.api, data, setData);
  const daoData = globalContext.api?.daoData;
  const router = useRouter();
  const { dao } = router.query;

  const { data: daoConfig, error: daoConfigError } = useSWR(
    dao && `/dao/${dao}/config`,
    fetcher
  );

  useEffect(() => {
    if (daoData && daoConfig && !daoConfigError) {
      setData({
        ...data,
        basicInformation: {
          daoName: daoData.dao_name,
          daoUrl: daoData.dao_url,
          shortDescription: daoData.dao_short_description,
        },
        tokenomics: {
          ...data.tokenomics,
          stakingConfig: {
            ...data.tokenomics.stakingConfig,
            stakingEmissionAmount: daoConfig
              ? Number(
                  daoConfig["im.paideia.staking.emission.amount"]?.value
                ) ?? 0
              : 0,
            stakingEmissionDelay: daoConfig
              ? Number(daoConfig["im.paideia.staking.emission.delay"]?.value) ??
                0
              : 0,
            stakingCycleLength: daoConfig
              ? Number(daoConfig["im.paideia.staking.cyclelength"]?.value) ?? 0
              : 0,
            stakingProfitSharePct: daoConfig
              ? Number(
                  daoConfig["im.paideia.staking.profit.sharepct"]?.value
                ) ?? 0
              : 0,
          },
        },
        governance: {
          ...data.governance,
          supportNeeded: daoData.governance.support_needed / 10,
          quorum: daoData.governance.quorum / 10,
          voteDuration: daoData.governance.vote_duration__sec / 60,
          voteDurationUnits: "minutes",
          participationWeight: daoConfig
            ? Number(
                daoConfig["im.paideia.staking.weight.participation"]?.value
              ) ?? 0
            : 0,
          pureParticipationWeight: daoConfig
            ? Number(
                daoConfig["im.paideia.staking.weight.pureparticipation"]?.value
              ) ?? 0
            : 0,
        },
        design: {
          ...data.design,
          banner: {
            ...data.design.banner,
            show: daoData.design.show_banner,
          },
          footer: {
            ...data.design.footer,
            show: daoData.design.show_footer,
            mainText: daoData.design.footer_text,
          },
        },
      });
      setDiff({
        ...defaultState,
        basicInformation: {
          daoName: daoData.dao_name,
          daoUrl: daoData.dao_url,
          shortDescription: daoData.dao_short_description,
        },
        tokenomics: {
          ...data.tokenomics,
          stakingConfig: {
            ...data.tokenomics.stakingConfig,
            stakingEmissionAmount: daoConfig
              ? Number(
                  daoConfig["im.paideia.staking.emission.amount"]?.value
                ) ?? 0
              : 0,
            stakingEmissionDelay: daoConfig
              ? Number(daoConfig["im.paideia.staking.emission.delay"]?.value) ??
                0
              : 0,
            stakingCycleLength: daoConfig
              ? Number(daoConfig["im.paideia.staking.cyclelength"]?.value) ?? 0
              : 0,
            stakingProfitSharePct: daoConfig
              ? Number(
                  daoConfig["im.paideia.staking.profit.sharepct"]?.value
                ) ?? 0
              : 0,
          },
        },
        governance: {
          ...data.governance,
          supportNeeded: daoData.governance.support_needed / 10,
          quorum: daoData.governance.quorum / 10,
          voteDuration: daoData.governance.vote_duration__sec / 60,
          voteDurationUnits: "minutes",
          participationWeight: daoConfig
            ? Number(
                daoConfig["im.paideia.staking.weight.participation"]?.value
              ) ?? 0
            : 0,
          pureParticipationWeight: daoConfig
            ? Number(
                daoConfig["im.paideia.staking.weight.pureparticipation"]?.value
              ) ?? 0
            : 0,
        },
        design: {
          ...data.design,
          banner: {
            ...data.design.banner,
            show: daoData.design.show_banner,
          },
          footer: {
            ...data.design.footer,
            show: daoData.design.show_footer,
            mainText: daoData.design.footer_text,
          },
        },
      });
    }
  }, [daoData, daoConfig]);

  const checkError = () => {
    return (
      data?.basicInformation.daoName !== "" &&
      data?.basicInformation.daoUrl !== "" &&
      (data?.tokenomics.stakingConfig.stakingCycleLength ?? 0) > 0 &&
      (data?.tokenomics.stakingConfig.stakingEmissionAmount ?? 0) > 0 &&
      (data?.tokenomics.stakingConfig.stakingProfitSharePct ?? 0) >= 0 &&
      (data?.tokenomics.stakingConfig.stakingProfitSharePct ?? 0) <= 100 &&
      (data?.tokenomics.stakingConfig.stakingEmissionDelay ?? 0) >= 1 &&
      (data?.tokenomics.stakingConfig.stakingEmissionDelay ?? 0) <= 10 &&
      (data?.governance.participationWeight ?? 0) >= 0 &&
      (data?.governance.participationWeight ?? 0) <= 100 &&
      (data?.governance.pureParticipationWeight ?? 0) >= 0 &&
      (data?.governance.pureParticipationWeight ?? 0) <= 100 &&
      Number(data?.governance.participationWeight ?? 0) +
        Number(data?.governance.participationWeight ?? 0) >=
        0 &&
      Number(data?.governance.participationWeight ?? 0) +
        Number(data?.governance.pureParticipationWeight ?? 0) <=
        100
    );
  };

  const submit = async () => {
    setLoading(true);
    const d = generateDiff(diff, data);
    if (data.design.logo.file !== undefined) {
      const imageUrl = await getImageUrl(data.design.logo.file);
      // @ts-ignore
      d["im.paideia.dao.logo"] = imageUrl;
    }
    if (data.design.banner.data.file !== undefined) {
      const imageUrl = await getImageUrl(data.design.banner.data.file);
      // @ts-ignore
      d["im.paideia.dao.banner"] = imageUrl;
    }
    const params = generateRedirectUrl(d);
    router.push(`/${dao}/proposal/create?auto_update_config=true&${params}`);
  };

  const getImageUrl = async (image: File) => {
    const imgRes = await api.uploadFile(image);
    return imgRes.data.image_url;
  };

  return (
    <ConfigContext.Provider value={{ api }}>
      <Layout>
        <Header title="DAO Config" large />
        <BasicInformation />
        <Divider />
        <Tokenomics />
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
            mb: "1rem",
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
          <LoadingButton
            disabled={!checkError()}
            loading={loading}
            sx={{ width: "50%" }}
            size="small"
            variant="contained"
            onClick={submit}
          >
            <Box sx={{ display: deviceWrapper("none", "block") }}>
              Submit Proposal
            </Box>
            <Box sx={{ display: deviceWrapper("block", "none") }}>Submit</Box>
          </LoadingButton>
        </Box>
      </Layout>
    </ConfigContext.Provider>
  );
};

const generateDiff = (initState: IConfigData, currentState: IConfigData) => {
  const durationMapper = {
    seconds: 1,
    minutes: 60,
    hours: 60 * 60,
    days: 60 * 60 * 24,
    weeks: 60 * 60 * 24 * 7,
  };
  const voteDurationDiff =
    initState.governance.voteDuration !==
      currentState.governance.voteDuration ||
    initState.governance.voteDurationUnits !==
      currentState.governance.voteDurationUnits
      ? currentState.governance.voteDuration *
        1000 *
        // @ts-ignore
        durationMapper[currentState.governance.voteDurationUnits]
      : null;
  return {
    "im.paideia.dao.name":
      initState.basicInformation.daoName ===
      currentState.basicInformation.daoName
        ? null
        : currentState.basicInformation.daoName,
    "im.paideia.dao.url":
      initState.basicInformation.daoUrl === currentState.basicInformation.daoUrl
        ? null
        : currentState.basicInformation.daoUrl,
    "im.paideia.dao.desc":
      initState.basicInformation.shortDescription ===
      currentState.basicInformation.shortDescription
        ? null
        : currentState.basicInformation.shortDescription,
    "im.paideia.staking.emission.amount":
      initState.tokenomics.stakingConfig.stakingEmissionAmount ===
      currentState.tokenomics.stakingConfig.stakingEmissionAmount
        ? null
        : currentState.tokenomics.stakingConfig.stakingEmissionAmount,
    "im.paideia.staking.emission.delay":
      initState.tokenomics.stakingConfig.stakingEmissionDelay ===
      currentState.tokenomics.stakingConfig.stakingEmissionDelay
        ? null
        : currentState.tokenomics.stakingConfig.stakingEmissionDelay,
    "im.paideia.staking.cyclelength":
      initState.tokenomics.stakingConfig.stakingCycleLength ===
      currentState.tokenomics.stakingConfig.stakingCycleLength
        ? null
        : currentState.tokenomics.stakingConfig.stakingCycleLength,
    "im.paideia.staking.profit.sharepct":
      initState.tokenomics.stakingConfig.stakingProfitSharePct ===
      currentState.tokenomics.stakingConfig.stakingProfitSharePct
        ? null
        : currentState.tokenomics.stakingConfig.stakingProfitSharePct,
    "im.paideia.dao.threshold":
      initState.governance.supportNeeded ===
      currentState.governance.supportNeeded
        ? null
        : currentState.governance.supportNeeded * 10,
    "im.paideia.dao.quorum":
      initState.governance.quorum === currentState.governance.quorum
        ? null
        : currentState.governance.quorum * 10,
    "im.paideia.staking.weight.participation":
      initState.governance.participationWeight ===
      currentState.governance.participationWeight
        ? null
        : currentState.governance.participationWeight,
    "im.paideia.staking.weight.pureparticipation":
      initState.governance.pureParticipationWeight ===
      currentState.governance.pureParticipationWeight
        ? null
        : currentState.governance.pureParticipationWeight,
    "im.paideia.dao.min.proposal.time": voteDurationDiff,
    "im.paideia.dao.banner.enabled":
      initState.design.banner.show === currentState.design.banner.show
        ? null
        : currentState.design.banner.show,
    "im.paideia.dao.footer.enabled":
      initState.design.footer.show === currentState.design.footer.show
        ? null
        : currentState.design.footer.show,
    "im.paideia.dao.footer":
      initState.design.footer.mainText === currentState.design.footer.mainText
        ? null
        : currentState.design.footer.mainText,
  };
};

const generateRedirectUrl = (diff: any) => {
  const url: any = {};
  Object.keys(diff).forEach((key) => {
    if (diff[key] !== null) {
      url[key] = diff[key];
    }
  });
  const params = new URLSearchParams(url);
  return params.toString();
};

export default DaoConfig;
