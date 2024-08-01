import Layout from "@components/dao/Layout";
import { Box, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Header } from "@components/creation/utilities/HeaderComponents";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import StakingForm from "@components/dao/staking/StakingForm";
import WithdrawForm from "@components/dao/staking/WithdrawForm";
import { deviceWrapper } from "@components/utilities/Style";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { useContext, useEffect, useState } from "react";
import { IUserStakeData } from "@components/dao/staking/YourStaking";

interface ITokenBanner {
  amount: number;
  ticker: string;
}

const TokenBanner: React.FC<ITokenBanner> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "fileInput.outer",
        display: "flex",
        alignItems: "center",
        fontSize: "1.3rem",
        fontWeight: 500,
        color: "text.primary",
        border: "1px solid",
        borderColor: "border.main",
        p: "1rem",
        borderRadius: ".3rem",
        mt: "1rem",
        pt: ".5rem",
        pb: ".5rem",
      }}
    >
      {props.amount}
      <Box
        sx={{
          ml: "auto",
          color: "text.secondary",
          fontSize: ".9rem",
          fontWeight: 500,
        }}
      >
        {`${props.ticker?.toUpperCase()} tokens staked`}
      </Box>
    </Box>
  );
};

const ManageStake: React.FC = () => {
  const tabStyle = { pl: 0, pr: 0 };
  const appContext = useContext<IGlobalContext>(GlobalContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("Stake Tokens");
  const [stakeState, setStakeState] = useState<any>({});

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(true);
    if (appContext.api?.userStakeData) {
      const stake = appContext.api.userStakeData;
      setStakeState(stake);
      setLoading(false);
    }
  }, [appContext.api?.userStakeData]);

  useEffect(() => {
    const getData = async () => {
      const daoId = appContext.api?.daoData?.id;
      const userId = appContext.api?.daoUserData?.user_id;
      if (appContext.api) {
        try {
          const res = await appContext.api.post<any>(
            "/staking/user_stake_info",
            {
              dao_id: daoId,
              user_id: userId,
            }
          );
          const data: IUserStakeData = res.data;
          appContext.api.setUserStakeData(data);
        } catch (e) {
          console.log(e);
        }
      }
    };
    if (appContext.api?.daoData?.id && appContext.api.daoUserData?.user_id) {
      getData();
    }
  }, [appContext.api?.daoData?.id, appContext.api?.daoUserData?.user_id]);

  const router = useRouter();
  const { dao } = router.query;

  const ticker =
    appContext.api?.daoData?.tokenomics.token_ticker ??
    appContext.api?.daoData?.tokenomics.token_name;

  return (
    <Layout width={deviceWrapper("92%", "65%")}>
      <Link href={dao === undefined ? "/dao/staking" : `/${dao}/staking`}>
        <Button
          variant="outlined"
          size="small"
          sx={{ mb: "1rem", mt: 1 }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Link>
      <Header title="Manage your staked tokens" large />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ mt: 10 }} />
        </Box>
      ) : (
        <>
          <TokenBanner
            amount={stakeState?.stake_keys
              ?.map((key: { stake: number }) => key.stake)
              .reduce((a: number, c: number) => a + c, 0)}
            ticker={ticker}
          />
          <TabContext value={value}>
            <Box
              sx={{ borderBottom: 1, borderColor: "border.main", mt: "1.5rem" }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Stake Tokens" value="Stake Tokens" />
                <Tab label="Withdraw Tokens" value="Withdraw Tokens" />
              </TabList>
            </Box>
            <TabPanel value="Stake Tokens" sx={tabStyle}>
              <StakingForm stake={stakeState} />
            </TabPanel>
            <TabPanel value="Withdraw Tokens" sx={tabStyle}>
              <WithdrawForm stake={stakeState} />
            </TabPanel>
          </TabContext>
        </>
      )}
    </Layout>
  );
};

export default ManageStake;
