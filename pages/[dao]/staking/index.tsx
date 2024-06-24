import {
  CapsInfo,
  Header,
  Subheader,
} from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import GeneralInfo from "@components/dao/staking/GeneralInfo";
import YourStaking, {
  IUserStakeData,
} from "@components/dao/staking/YourStaking";
import { Avatar, Box, Button, Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import Coin from "../../../public/icons/coin.png";
import Activity, { IActivity } from "@components/dao/activity/Activity";
import { ThemeContext } from "@lib/ThemeContext";
import { LightTheme } from "@theme/theme";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";

export const StakingActivity: React.FC = () => {
  return (
    <Box>
      <Subheader title="Activity" />
      {[].map((i: any, c: number) => {
        return <Activity i={i} c={c} key="activity-dummy" />;
      })}
    </Box>
  );
};

const Staking: React.FC = () => {
  const themeContext = React.useContext(ThemeContext);
  const appContext = React.useContext<IGlobalContext>(GlobalContext);
  const router = useRouter();
  const { dao } = router.query;

  React.useEffect(() => {
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

  return (
    <Layout width="92%">
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Header title="Staking" large />
        <Box sx={{ ml: "auto" }}>
          <Link
            href={
              dao === undefined
                ? "/dao/staking/manage"
                : `/${dao}/staking/manage`
            }
          >
            {appContext.api?.daoUserData ? (
              <Button variant="contained" size="small">
                Manage Stake{" "}
                <img
                  src={Coin.src}
                  style={{
                    marginLeft: ".5rem",
                    filter:
                      themeContext.theme === LightTheme ? "invert(100%)" : "",
                  }}
                />
              </Button>
            ) : (
              <Tooltip
                title="Connect wallet to manage stake"
                arrow
                placement="left"
              >
                <span style={{ marginLeft: "auto" }}>
                  <Button variant="contained" size="small" disabled>
                    Manage Stake{" "}
                    <img
                      src={Coin.src}
                      style={{
                        marginLeft: ".5rem",
                        filter:
                          themeContext.theme === LightTheme
                            ? "invert(100%)"
                            : "",
                      }}
                    />
                  </Button>
                </span>
              </Tooltip>
            )}
          </Link>
        </Box>
      </Box>
      <GeneralInfo />
      <YourStaking />
      {/* <StakingActivity /> */}
    </Layout>
  );
};

export default Staking;
