import {
  LearnMore,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import MultiWalletSelector from "@components/utilities/MultiWalletSelector";
import { deviceStruct } from "@components/utilities/Style";
import { IWallet } from "@lib/creation/Interfaces";
import {
  ConfigContext,
  IConfigContext,
} from "@lib/dao/dao-config/ConfigContext";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Collapse,
} from "@mui/material";
import * as React from "react";

const OptimisticGovernance: React.FC = () => {
  const context = React.useContext<IConfigContext>(ConfigContext);
  const data = context.api?.data.governance;
  return (
    <>
      <LearnMore
        title="Optimistic Governance"
        tooltipTitle="Optimistic Governance"
        tooltipText="Choose this option if you'd like to whitelist individual wallets so that only those wallets can make proposals. All proposals will pass, unless a DAO member challenges that proposal. Choosing this option means that proposals will require collateral, and if the proposal is successfully challenged, IE DAO members vote it down after someone challenges it, that collateral is lost and distributed to the voters. This prevents corrupt individuals from draining the DAO or behaving in a way that is not in members' best interestes. Optimistic governance can make the DAO more agile and focused, as there is less engagement required from most members. "
        tooltipLink="https://docs.paideia.im/governance-structures#_yj9ebg49un1g"
      />
      <Subtitle subtitle="If active, only whitelisted members will be able to create proposals. If a proposal is not challenged, they will be approved." />
      <LabeledSwitch
        disabled
        small
        onChange={() =>
          context.api?.setData({
            ...context.api.data,
            governance: {
              ...data,
              optimisticGovernance: data && !data.optimisticGovernance,
            },
          })
        }
        value={data?.optimisticGovernance ?? false}
        title="Activate Optimistic Governance"
      />
      <Collapse in={data && data.optimisticGovernance}>
        <LearnMore
          title="White listed members"
          // tooltipTitle="Whitelisted Members"
          tooltipText="These will be the only addresses that can submit proposals for this DAO. All members will be able to challenge proposals, but not all members will be able to submit. Make sure you add a few addresses. Too few will represent a significant centralization of control. "
          // tooltipLink="/here"
        />
        <MultiWalletSelector
          wallets={data?.whitelist ?? []}
          set={(value: IWallet[]) =>
            context.api?.setData({
              ...context.api.data,
              governance: {
                ...data,
                whitelist: value,
              },
            })
          }
        />
        <LearnMore
          small
          title="Collateral"
          // tooltipTitle="Title Here"
          tooltipText="All proposals in Optimistic Governance require collateral. If the proposal is challenged, and is then voted down, the collateral is distributed to those who voted. A challenger must also submit equal collateral. If the challenge does not pass, and DAO members vote to pass the proposal, the challenger's collateral is distributed to voters. "
          // tooltipLink="/here"
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            mt: ".4rem",
          }}
        >
          <Box sx={{ width: "50%", mr: ".8rem" }}>
            <TextField
              value={data?.amount}
              label="Amount"
              type="number"
              sx={{ width: "100%" }}
              onChange={(e) =>
                context.api?.setData({
                  ...context.api.data,
                  governance: {
                    ...data,
                    amount: e.target.value,
                  },
                })
              }
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <FormControl fullWidth>
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                value={data?.currency}
                label="Currency"
                onChange={(e) =>
                  context.api?.setData({
                    ...context.api.data,
                    governance: {
                      ...data,
                      currency: e.target.value,
                    },
                  })
                }
              >
                <MenuItem value="sigusd">SigUSD</MenuItem>
                <MenuItem value="erg">ERG</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <LearnMore
          small
          title="Time to challenge a proposal"
          // tooltipTitle="Title Here"
          tooltipText="All proposals pass in Optimistic Governance, unless challenged. DAO members need enough time to assess each proposal to make sure it's agreeable. This is the length of time each proposal can be challenged before it passes. "
          // tooltipLink="/here"
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: ".8rem",
          }}
        >
          <Box sx={{ width: deviceStruct("70%", "70%", "30%", "30%", "30%") }}>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor={`challenge-time-input`} shrink>
                Challenge time
              </InputLabel>
              <OutlinedInput
                notched
                id={`challenge-time-input`}
                type="number"
                value={data?.timeToChallenge === 0 ? "" : data?.timeToChallenge}
                onChange={(e) =>
                  context.api?.setData({
                    ...context.api.data,
                    governance: {
                      ...data,
                      timeToChallenge: e.target.value,
                    },
                  })
                }
                endAdornment={
                  <Box
                    sx={{
                      height: "100%",
                      width: "90%",
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
                        value={data?.timeToChallengeUnits}
                        sx={{ height: "100%", color: "text.primary" }}
                        onChange={(e) =>
                          context.api?.setData({
                            ...context.api.data,
                            governance: {
                              ...data,
                              timeToChallengeUnits: e.target.value,
                            },
                          })
                        }
                      >
                        <MenuItem value="minutes">Minutes</MenuItem>
                        <MenuItem value="hours">Hours</MenuItem>
                        <MenuItem value="days">Days</MenuItem>
                        <MenuItem value="weeks">Weeks</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                }
                label="Challenge time"
              />
            </FormControl>
          </Box>
        </Box>
      </Collapse>
    </>
  );
};

export default OptimisticGovernance;
