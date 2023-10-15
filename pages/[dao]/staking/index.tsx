import {
  Header,
  Subheader,
} from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import GeneralInfo from "@components/dao/staking/GeneralInfo";
import YourStaking from "@components/dao/staking/YourStaking";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import Coin from "../../../public/icons/coin.png";
import Activity, { IActivity } from "@components/dao/activity/Activity";
import { ThemeContext } from "@lib/ThemeContext";
import { LightTheme } from "@theme/theme";

export const StakingActivity: React.FC = () => {
  return (
    <Box>
      <Subheader title="Activity" />
      {[].map((activity: IActivity, index: number) => {
        const { name, date } = activity;
        return (
          <Activity key={`${name}+${date}`} activity={activity} c={index} />
        );
      })}
    </Box>
  );
};

const Staking: React.FC = () => {
  const themeContext = React.useContext(ThemeContext);
  const router = useRouter();
  const { dao } = router.query;
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
            <Button variant="contained" size="small">
              Manage Stake{" "}
              <img
                alt="Coin icon"
                src={Coin.src}
                style={{
                  marginLeft: ".5rem",
                  filter:
                    themeContext.theme === LightTheme ? "invert(100%)" : "",
                }}
              />
            </Button>
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
