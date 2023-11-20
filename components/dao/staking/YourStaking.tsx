import { Subheader } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import { useWallet } from "@components/wallet/WalletContext";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import { Box } from "@mui/material";
import * as React from "react";
import { InfoCard } from "./GeneralInfo";

interface IYourStakingInfo {
  stakeAmount: string;
  proposalsVoted: string;
  totalVotingPowerUsed: string;
}

const YourStaking: React.FC = () => {
  const appContext = React.useContext<IGlobalContext>(GlobalContext);
  const { utxos } = useWallet();
  const [stakeInfo, setStakeInfo] = React.useState<IYourStakingInfo>({
    stakeAmount: "-",
    proposalsVoted: "-",
    totalVotingPowerUsed: "-",
  });

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
        const stakeAmount = stake.stake_keys
          .map((stake: { stake: number }) => stake.stake)
          .reduce((a: number, c: number) => a + c, 0);
        const proposalsVoted = stake.stake_keys
          .map(
            (stake: { participation_info: { proposals_voted_on: number } }) =>
              stake.participation_info?.proposals_voted_on ?? 0
          )
          .reduce((a: number, c: number) => a + c, 0);
        const totalVotingPowerUsed = stake.stake_keys
          .map(
            (stake: {
              participation_info: { total_voting_power_used: number };
            }) => stake.participation_info?.total_voting_power_used ?? 0
          )
          .reduce((a: number, c: number) => a + c, 0);
        setStakeInfo({
          stakeAmount,
          proposalsVoted,
          totalVotingPowerUsed,
        });
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
        <InfoCard
          value={stakeInfo.stakeAmount}
          title={`${ticker} tokens staked`}
          c={0}
        />
        <InfoCard
          value={stakeInfo.proposalsVoted}
          title={"Proposals Voted On"}
          c={1}
        />
        <InfoCard
          c={2}
          full
          value={stakeInfo.totalVotingPowerUsed}
          title={"Voting Power Used"}
          // dropdown
          // last
        />
      </Box>
    </Box>
  );
};

export default YourStaking;
