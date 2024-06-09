import { LearnMore } from "@components/creation/utilities/HeaderComponents";
import {
  IConfigContext,
  ConfigContext,
} from "@lib/dao/dao-config/ConfigContext";
import { Box, Grid, TextField } from "@mui/material";
import React from "react";

const ParticipationWeight: React.FC = () => {
  const context = React.useContext<IConfigContext>(ConfigContext);
  const data = context.api?.data;
  const setData = context.api?.setData ?? (() => {});

  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <LearnMore
        title="Participation Weight"
        tooltipText="Pure Participation Weight: Percentage defining how much participation in governance is weighted in reward distribution, 0 to 100.\n
      Participation Weight: Percentage defining how much used votes are weighted in reward distribution, 0 to 100.\n
      These two should not exceed 100 combined. Remaining percentage is rewards distributed based on staked amount."
      />
      <Grid
        container
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        sx={{ mt: 1, mb: 2 }}
      >
        <Grid item md={6}>
          <TextField
            type="number"
            value={data?.governance.pureParticipationWeight}
            sx={{ width: "100%" }}
            label="Pure Participation Weight"
            onChange={(e) =>
              setData({
                ...data,
                governance: {
                  ...data?.governance,
                  pureParticipationWeight: e.target.value,
                },
              })
            }
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            type="number"
            value={data?.governance.participationWeight}
            sx={{ width: "100%" }}
            label="Participation Weight"
            onChange={(e) =>
              setData({
                ...data,
                governance: {
                  ...data?.governance,
                  participationWeight: e.target.value,
                },
              })
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParticipationWeight;
