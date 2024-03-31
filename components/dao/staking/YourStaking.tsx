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

interface IUserStakeKeyProfit {
  token_name: string;
  token_id: string;
  amount: number;
}

interface IUserStakeKeyParticipationInfo {
  proposals_voted_on: number;
  total_voting_power_used: number;
}

interface IUserStakeKey {
  key_id: string;
  stake: number;
  profit: IUserStakeKeyProfit[];
  participation_info: IUserStakeKeyParticipationInfo;
}

export interface IUserStakeData {
  dao_id: string;
  user_id: string;
  stake_keys: IUserStakeKey[];
}

const YourStaking: React.FC = () => {
  const appContext = React.useContext<IGlobalContext>(GlobalContext);
  const [stakeInfo, setStakeInfo] = React.useState<IYourStakingInfo>({
    stakeAmount: "-",
    proposalsVoted: "-",
    totalVotingPowerUsed: "-",
  });

  React.useEffect(() => {
    if (appContext.api?.userStakeData) {
      const stake = appContext.api.userStakeData;
      const stakeAmount = stake.stake_keys
        .map((stake) => stake.stake)
        .reduce((a: number, c: number) => a + c, 0);
      const proposalsVoted = stake.stake_keys
        .map((stake) => stake.participation_info.proposals_voted_on)
        .reduce((a: number, c: number) => a + c, 0);
      const totalVotingPowerUsed = stake.stake_keys
        .map(
          (stake: {
            participation_info: { total_voting_power_used: number };
          }) => stake.participation_info?.total_voting_power_used ?? 0
        )
        .reduce((a: number, c: number) => a + c, 0);
      setStakeInfo({
        stakeAmount: String(stakeAmount),
        proposalsVoted: String(proposalsVoted),
        totalVotingPowerUsed: String(totalVotingPowerUsed),
      });
    }
  }, [appContext.api?.userStakeData]);
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
