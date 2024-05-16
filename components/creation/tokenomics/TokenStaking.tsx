import { deviceStruct } from "@components/utilities/Style";
import { IData } from "@lib/Interfaces";
import { CreationContext } from "@lib/creation/Context";
import { ITokenomics } from "@lib/creation/Interfaces";
import { ButtonGroup, Button, Box, Grid, TextField } from "@mui/material";
import { LearnMore } from "../utilities/HeaderComponents";
import React from "react";

const TokenStaking: React.FC<IData<ITokenomics>> = (props) => {
  return (
    <Box sx={{ mb: 1 }}>
      <LearnMore
        title="Token Staking Config"
        tooltipTitle="Staking Config"
        tooltipText="
        Stake Pool Size: Number of governance tokens to lock into the stake pool, 0 or more.\n
        Emission Amount: Amount of governance tokens distributed to stakers every staking cycle.\n
        Emission Delay: Delay for rewards to be distributed to stakers (staker first gets reward after so many cycles), 1 to 10.\n
        Staking Cycle Length: Length in ms of a staking cycle, reward and profit is shared every cycle.\n
        Profit Share Percentage: Amount of DAO profit to share with stakers, 0 to 100."
      />
      <Grid
        container
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        sx={{ mt: 1 }}
      >
        <Grid item md={6}>
          <TextField
            type="number"
            value={props.data.stakingConfig.stakePoolSize}
            sx={{ width: "100%" }}
            label="Stake Pool Size"
            onChange={(e) =>
              props.setData({
                ...props.data,
                stakingConfig: {
                  ...props.data.stakingConfig,
                  stakePoolSize: e.target.value,
                },
              })
            }
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            type="number"
            value={props.data.stakingConfig.stakingEmissionAmount}
            sx={{ width: "100%" }}
            label="Emission Amount"
            onChange={(e) =>
              props.setData({
                ...props.data,
                stakingConfig: {
                  ...props.data.stakingConfig,
                  stakingEmissionAmount: e.target.value,
                },
              })
            }
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            value={props.data.stakingConfig.stakingEmissionDelay}
            sx={{ width: "100%" }}
            label="Emission Delay"
            onChange={(e) =>
              props.setData({
                ...props.data,
                stakingConfig: {
                  ...props.data.stakingConfig,
                  stakingEmissionDelay: e.target.value,
                },
              })
            }
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            value={props.data.stakingConfig.stakingCycleLength}
            sx={{ width: "100%" }}
            label="Staking Cycle Length (ms)"
            onChange={(e) =>
              props.setData({
                ...props.data,
                stakingConfig: {
                  ...props.data.stakingConfig,
                  stakingCycleLength: e.target.value,
                },
              })
            }
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            value={props.data.stakingConfig.stakingProfitSharePct}
            sx={{ width: "100%" }}
            label="Profit Share Percentage"
            onChange={(e) =>
              props.setData({
                ...props.data,
                stakingConfig: {
                  ...props.data.stakingConfig,
                  stakingProfitSharePct: e.target.value,
                },
              })
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TokenStaking;
