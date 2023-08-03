import { Subheader } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import { useWallet } from "@components/wallet/WalletContext";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import { Box } from "@mui/material";
import * as React from "react";
import { InfoCard } from "./GeneralInfo";

const YourStaking: React.FC = () => {
  const appContext = React.useContext<IGlobalContext>(GlobalContext);
  const { utxos } = useWallet();
  const [stakeAmount, setStakeAmount] = React.useState<string>("-");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const daoId = appContext.api.daoData.id;
        const userId = appContext.api.daoUserData.user_id;
        const res = await appContext.api.post<any>("/staking/user_stake_info", {
          dao_id: daoId,
          user_id: userId,
        });
        const stake = res.data;
        const sum = stake.stake_keys
          .map((stake: { stake: any }) => stake.stake)
          .reduce((a: number, c: number) => a + c, 0);
        setStakeAmount(sum);
      } catch (e: any) {
        console.log(e);
      }
    };

    if (
      utxos.currentDaoTokens &&
      appContext.api.daoData?.id &&
      appContext.api.daoUserData?.id
    ) {
      fetchData();
    }
  }, [utxos, appContext.api.daoData, appContext.api.daoUserData]);
  const ticker = "PAI";

  return (
    <Box>
      <Subheader title="Your staking" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexWrap: deviceWrapper("wrap", "nowrap"),
        }}
      >
        <InfoCard value={stakeAmount} title={`${ticker} tokens staked`} c={0} />
        <InfoCard value="-" title={`${ticker} tokens earned`} c={1} />
        <InfoCard
          c={2}
          full
          value={`-`}
          title={`Earned tokens`}
          // dropdown
          // last
        />
      </Box>
    </Box>
  );
};

export default YourStaking;
