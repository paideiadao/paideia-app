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
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Select,
  MenuItem,
  Slider,
  TextField,
} from "@mui/material";
import * as React from "react";

const Quorum: React.FC = () => {
  const context = React.useContext<IConfigContext>(ConfigContext);
  const data = context.api.data.governance;
  return (
    <>
      <LearnMore
        small
        title="Quorum"
        // tooltipTitle="Title Here"
        tooltipText="Do not set this too high. Quorum means the number of voters required for any vote to pass. If you have 1000 vote tokens distributed, and quorum is set to 50%, at least 500 votes must be cast before any proposal passes. If you have many inactive members, it could mean the DAO can no longer pass any proposals. Be cautious with this setting. "
        // tooltipLink="/here"
      />
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          mt: "1rem",
          mb: ".5rem",
          pl: ".5rem",
        }}
      >
        <Box
          sx={{
            width: deviceStruct("70%", "70%", "87%", "87%", "87%"),
            display: "flex",
            alignItems: "center",
          }}
        >
          <Slider
            disabled
            value={data.quorum}
            min={0}
            max={100}
            onChange={(event, newValue) =>
              context.api.setData({
                ...context.api.data,
                governance: {
                  ...data,
                  quorum: newValue,
                },
              })
            }
          />
        </Box>
        <Box
          sx={{
            width: deviceStruct("30%", "30%", "13%", "13%", "13%"),
            ml: "1.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            disabled
            label="Value"
            type="number"
            value={data.quorum}
            onChange={(e) =>
              context.api.setData({
                ...context.api.data,
                governance: {
                  ...data,
                  quorum: e.target.value,
                },
              })
            }
            InputProps={{
              inputProps: { min: 0, max: 100 },
              endAdornment: <Box>%</Box>,
            }}
          />
        </Box>
      </Box>
      <Header small title="How long does the voting period last for?" />
      <Box sx={{ mt: ".75rem" }} />

      <FormControl
        sx={{
          mb: ".5rem",
          width: deviceStruct("60%", "60%", "30%", "30%", "30%"),
        }}
        variant="outlined"
      >
        <InputLabel htmlFor={`challenge-time-input`} shrink>
          Vote duration
        </InputLabel>
        <OutlinedInput
          disabled
          notched
          id={`challenge-time-input`}
          type="number"
          value={data.voteDuration === 0 ? "" : data.voteDuration}
          onChange={(e) =>
            context.api.setData({
              ...context.api.data,
              governance: {
                ...data,
                voteDuration:
                  e.target.value === "" ? 0 : parseInt(e.target.value),
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
                  disabled
                  labelId="currency-select-label"
                  id="currency-select"
                  variant="outlined"
                  value={data.voteDurationUnits}
                  sx={{ height: "100%", color: "text.primary" }}
                  onChange={(e) =>
                    context.api.setData({
                      ...context.api.data,
                      governance: {
                        ...data,
                        voteDurationUnits: e.target.value,
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
          label="Vote duration"
        />
      </FormControl>
    </>
  );
};

export default Quorum;
