import { getUnits } from "@components/creation/tokenomics/TokenStaking";
import {
  Header,
  LearnMore,
} from "@components/creation/utilities/HeaderComponents";
import { deviceStruct } from "@components/utilities/Style";
import {
  ConfigContext,
  IConfigContext,
} from "@lib/dao/dao-config/ConfigContext";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import * as React from "react";

const Tokenomics: React.FC = () => {
  const context = React.useContext<IConfigContext>(ConfigContext);
  const data = context.api?.data;
  const setData = context.api?.setData ?? (() => {});

  const [stakingCycleDuration, setStakingCycleDuration] =
    React.useState<number>(
      getUnits(data?.tokenomics.stakingConfig.stakingCycleLength ?? 0).duration
    );
  const [stakingCycleDurationUnits, setStakingCycleDurationUnits] =
    React.useState<string>(
      getUnits(data?.tokenomics.stakingConfig.stakingCycleLength ?? 0).units
    );

  React.useEffect(() => {
    if (stakingCycleDurationUnits === "") {
      return;
    }
    const durationMapper = {
      seconds: 1,
      minutes: 60,
      hours: 60 * 60,
      days: 60 * 60 * 24,
      weeks: 60 * 60 * 24 * 7,
    };
    const stakingCycleLength = // @ts-ignore
      stakingCycleDuration * durationMapper[stakingCycleDurationUnits] * 1000;
    setData({
      ...data,
      tokenomics: {
        ...data?.tokenomics,
        stakingConfig: {
          ...data?.tokenomics.stakingConfig,
          stakingCycleLength: stakingCycleLength,
        },
      },
    });
  }, [stakingCycleDuration, stakingCycleDurationUnits]);

  const checkError = () => {
    return (
      (data?.tokenomics.stakingConfig.stakingCycleLength ?? 0) > 0 &&
      (data?.tokenomics.stakingConfig.stakingEmissionAmount ?? 0) > 0 &&
      (data?.tokenomics.stakingConfig.stakingProfitSharePct ?? 0) >= 0 &&
      (data?.tokenomics.stakingConfig.stakingProfitSharePct ?? 0) <= 100 &&
      (data?.tokenomics.stakingConfig.stakingEmissionDelay ?? 0) >= 1 &&
      (data?.tokenomics.stakingConfig.stakingEmissionDelay ?? 0) <= 10
    );
  };

  return (
    <>
      <Header
        title="Tokenomics and Staking Configuration"
        subtitle="Update your tokenomics and staking configuration"
        mb=".25rem"
      />
      <Box sx={{ mb: 1 }}>
        <LearnMore
          title="Token Staking Config"
          tooltipTitle="Staking Config"
          tooltipText="
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
              value={data?.tokenomics.stakingConfig.stakingEmissionAmount}
              sx={{ width: "100%" }}
              label="Emission Amount"
              onChange={(e) =>
                setData({
                  ...data,
                  tokenomics: {
                    ...data?.tokenomics,
                    stakingConfig: {
                      ...data?.tokenomics.stakingConfig,
                      stakingEmissionAmount: e.target.value,
                    },
                  },
                })
              }
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              value={data?.tokenomics.stakingConfig.stakingEmissionDelay}
              sx={{ width: "100%" }}
              label="Emission Delay"
              onChange={(e) =>
                setData({
                  ...data,
                  tokenomics: {
                    ...data?.tokenomics,
                    stakingConfig: {
                      ...data?.tokenomics.stakingConfig,
                      stakingEmissionDelay: e.target.value,
                    },
                  },
                })
              }
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              value={data?.tokenomics.stakingConfig.stakingProfitSharePct}
              sx={{ width: "100%" }}
              label="Profit Share Percentage"
              onChange={(e) =>
                setData({
                  ...data,
                  tokenomics: {
                    ...data?.tokenomics,
                    stakingConfig: {
                      ...data?.tokenomics.stakingConfig,
                      stakingProfitSharePct: e.target.value,
                    },
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
            <InputLabel htmlFor={`challenge-time-input-cycle-ii`}>
              Staking Cycle Duration
            </InputLabel>
            <OutlinedInput
              notched
              id={`challenge-time-input-cycle-ii`}
              type="number"
              value={
                getUnits(data?.tokenomics.stakingConfig.stakingCycleLength ?? 0)
                  .duration
              }
              onChange={(e) => {
                setStakingCycleDuration(parseFloat(e.target.value));
                if (stakingCycleDurationUnits === "")
                  setStakingCycleDurationUnits(
                    getUnits(
                      data?.tokenomics.stakingConfig.stakingCycleLength ?? 0
                    ).units
                  );
              }}
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
                      value={
                        getUnits(
                          data?.tokenomics.stakingConfig.stakingCycleLength ?? 0
                        ).units
                      }
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
      {!checkError() && (
        <FormHelperText error>Invalid Configuration</FormHelperText>
      )}
    </>
  );
};

export default Tokenomics;
