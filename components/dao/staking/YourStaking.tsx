import { Subheader } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import { useWallet } from "@components/wallet/WalletContext";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import { Box } from "@mui/material";
import * as React from "react";
import { InfoCard } from "./GeneralInfo";

const YourStaking: React.FC = () => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [daoData] = globalContext.api.daoState;
  const [daoUserData] = globalContext.api.daoUserState;
  const { post } = globalContext.api;
  const { utxos } = useWallet();
  const [stakeAmount, setStakeAmount] = React.useState<string>("-");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const daoId = daoData.id;
        const userId = daoUserData.user_id;
        const res = await post<any>("/staking/user_stake_info", {
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

    if (utxos.currentDaoTokens && daoData?.id && daoUserData?.id) {
      fetchData();
    }
  }, [utxos, daoData, daoUserData, post]);
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
