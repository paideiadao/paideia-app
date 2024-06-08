import { deviceStruct } from "@components/utilities/Style";
import { IData } from "@lib/Interfaces";
import { CreationContext } from "@lib/creation/Context";
import { ITokenomics } from "@lib/creation/Interfaces";
import {
  ButtonGroup,
  Button,
  Box,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { LearnMore } from "../utilities/HeaderComponents";
import React, { useEffect, useState } from "react";

const getUnits = (ms: number) => {
  const s = Math.floor(ms / 1000);
  if (s % 60 !== 0) {
    return {
      duration: s,
      units: "seconds",
    };
  } else if (s % (60 * 60) !== 0) {
    return {
      duration: Math.floor(s / 60),
      units: "minutes",
    };
  } else if (s % (60 * 60 * 24) !== 0) {
    return {
      duration: Math.floor(s / (60 * 60)),
      units: "hours",
    };
  } else if (s % (60 * 60 * 24 * 7) !== 0) {
    return {
      duration: Math.floor(s / (60 * 60 * 24)),
      units: "days",
    };
  } else {
    return {
      duration: Math.floor(s / (60 * 60 * 24 * 7)),
      units: "weeks",
    };
  }
};

const TokenStaking: React.FC<IData<ITokenomics>> = (props) => {
  const [stakingCycleDuration, setStakingCycleDuration] = useState<number>(
    getUnits(props.data.stakingConfig.stakingCycleLength).duration
  );
  const [stakingCycleDurationUnits, setStakingCycleDurationUnits] =
    useState<string>(
      getUnits(props.data.stakingConfig.stakingCycleLength).units
    );

  useEffect(() => {
    const durationMapper = {
      seconds: 1,
      minutes: 60,
      hours: 60 * 60,
      days: 60 * 60 * 24,
      weeks: 60 * 60 * 24 * 7,
    };
    const stakingCycleLength = // @ts-ignore
      stakingCycleDuration * durationMapper[stakingCycleDurationUnits] * 1000;
    props.setData({
      ...props.data,
      stakingConfig: {
        ...props.data.stakingConfig,
        stakingCycleLength: stakingCycleLength,
      },
    });
  }, [stakingCycleDuration, stakingCycleDurationUnits]);

  return (
    <Box sx={{ mb: 1 }}>
      <LearnMore
        title="Token Staking Config"
        tooltipTitle="Staking Config"
        tooltipText="
        Stake Pool Size: Number of governance tokens to lock into the stake pool, 0 or more.\n
        Emission Amount: Amount of governance tokens distributed to stakers every staking cycle.\n
        Emission Delay: Delay for rewards to be distributed to stakers (staker first gets reward after so many cycles), 1 to 10.\n
        Profit Share Percentage: Amount of DAO profit to share with stakers, 0 to 100.\n
        Staking Cycle Duration: Length of a staking cycle, reward and profit is shared every cycle.\n"
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
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Box sx={{ fontSize: ".9rem", fontWeight: 410, my: "1rem" }}>
          How long does a staking cycle last?
        </Box>
        <FormControl
          sx={{
            m: 1,
            ml: 0,
            width: deviceStruct("100%", "80%", "50%", "50%", "30%"),
          }}
          variant="outlined"
        >
          <InputLabel htmlFor={`challenge-time-input-cycle`}>
            Staking Cycle Duration
          </InputLabel>
          <OutlinedInput
            notched
            id={`challenge-time-input-cycle`}
            type="number"
            value={stakingCycleDuration === 0 ? "" : stakingCycleDuration}
            onChange={(e) =>
              setStakingCycleDuration(parseFloat(e.target.value))
            }
            endAdornment={
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "backgroundColor.main",
                  color: "text.primary",
                  lineHeight: "350%",
                  textAlign: "center",
                  borderRadius: "0 .3rem .3rem 0",
                  mr: "-.8rem",
                  ml: ".5rem",
                  display: "flex",
                }}
              >
                <FormControl fullWidth>
                  <Select
                    labelId="currency-select-label"
                    id="currency-select"
                    variant="outlined"
                    value={stakingCycleDurationUnits}
                    sx={{ height: "100%", color: "text.primary" }}
                    onChange={(e: SelectChangeEvent<string>) =>
                      setStakingCycleDurationUnits(e.target.value)
                    }
                  >
                    <MenuItem value="seconds">Seconds</MenuItem>
                    <MenuItem value="minutes">Minutes</MenuItem>
                    <MenuItem value="hours">Hours</MenuItem>
                    <MenuItem value="days">Days</MenuItem>
                    <MenuItem value="weeks">Weeks</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            }
            label="Staking Cycle Duration"
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default TokenStaking;
