import { Header } from "@components/creation/utilities/HeaderComponents";
import VoteDurationSelector from "@components/creation/utilities/VoteDurationSelector";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box, FormHelperText } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const TIME_MS = 1000;
const BUFFER = 900 * TIME_MS;

const VotingDuration = () => {
  const context = useContext<IProposalContext>(ProposalContext);
  const [votingDuration, setVotingDuration] = useState({
    duration: 1,
    unit: "days",
  });

  useEffect(() => {
    const multiplier_map = {
      seconds: 1,
      minutes: 60,
      hours: 60 * 60,
      days: 60 * 60 * 24,
      weeks: 60 * 60 * 24 * 7,
    };
    // @ts-ignore
    const multiplier = multiplier_map[votingDuration.unit];
    const voting_duration = votingDuration.duration * multiplier;
    context.api?.setValue({
      ...context.api.value,
      voting_duration,
    });
  }, [votingDuration]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        pt: "1rem",
      }}
    >
      <Header
        title="Voting Duration"
        subtitle="Set how long the voting window should be open"
      />
      <FormHelperText error={context.api?.errors.votingDuration}>
        {context.api?.errors.votingDuration
          ? "Voting duration cannot be less than minimum in Dao Config"
          : `Voting Ends at ${new Date(
              new Date().getTime() +
                Number(context.api?.value.voting_duration ?? 0) * 1000 +
                BUFFER
            ).toLocaleString()}`}
      </FormHelperText>
      <VoteDurationSelector
        voteDuration={votingDuration.duration}
        set={(val: number) =>
          setVotingDuration({ ...votingDuration, duration: val })
        }
        voteDurationUnits={votingDuration.unit}
        setUnits={(val: string) =>
          setVotingDuration({ ...votingDuration, unit: val })
        }
      />
    </Box>
  );
};

export default VotingDuration;
