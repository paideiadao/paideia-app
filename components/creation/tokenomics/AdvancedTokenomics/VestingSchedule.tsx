import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import LabeledSwitch from "../../utilities/LabeledSwitch";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export interface IVestingSchedule {
  vesting: boolean;
  initialDistribution: number;
  emissionStartDate: number;
  emissionStartDateUnits: string;
  frequency: string;
  emissionLength: number;
  emissionLengthUnits: string;
}

const VestingSchedule: React.FC<{
  set: Function;
  value: boolean;
  id: string;
}> = (props) => {
  const [value, setValue] = React.useState<IVestingSchedule>({
    vesting: props.value,
    initialDistribution: 0,
    emissionStartDate: 0,
    emissionStartDateUnits: "weeks",
    frequency: "weekly",
    emissionLength: 0,
    emissionLengthUnits: "weeks",
  });

  React.useEffect(() => {
    props.set(value);
  }, [value]);

  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderColor: "border.main",
        width: "100%",
        mt: "1rem",
        pl: "1rem",
        pr: "1rem",
      }}
    >
      <LabeledSwitch
        title="Set Vesting Schedule"
        subtitle="Prevent tokens from being sold for a specific period of time by distributing them through stages"
        value={props.value}
        onChange={() => setValue({ ...value, vesting: !value.vesting })}
      />
      {props.value && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "1rem",
            mb: "1rem",
            width: "100%",
          }}
        >
          <TextField
            value={
              value.initialDistribution === 0 ? "" : value.initialDistribution
            }
            label="Initial"
            type="number"
            sx={{ width: "18%" }}
            onChange={(e: any) =>
              setValue({
                ...value,
                initialDistribution: parseFloat(e.target.value),
              })
            }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ color: "text.primary" }}>%</Box>
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ width: "20%", ml: ".5rem" }}>
            <InputLabel htmlFor={`vesting-frequency-label-${props.id}`} shrink>
              Frequency
            </InputLabel>
            <Select
              labelId={`vesting-frequency-label-${props.id}`}
              id={`vesting-frequency-${props.id}`}
              variant="outlined"
              label="Frequency"
              value={value.frequency}
              sx={{ height: "100%", color: "text.primary" }}
              onChange={(e: any) =>
                setValue({
                  ...value,
                  frequency: e.target.value,
                })
              }
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem
                value="weekly"
                disabled={["days"].indexOf(value.emissionLengthUnits) > -1}
              >
                Weekly
              </MenuItem>
              <MenuItem
                value="monthly"
                disabled={
                  ["days", "weeks"].indexOf(value.emissionLengthUnits) > -1
                }
              >
                Monthly
              </MenuItem>
              <MenuItem
                value="yearly"
                disabled={
                  ["days", "weeks", "months"].indexOf(
                    value.emissionLengthUnits
                  ) > -1
                }
              >
                Yearly
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1, width: "33%" }}
            variant="outlined"
            hiddenLabel
          >
            <InputLabel
              htmlFor={`vesting-emission-start-date-${props.id}`}
              shrink
            >
              Emission Start Date
            </InputLabel>
            <OutlinedInput
              notched
              id={`vesting-emission-start-date-${props.id}`}
              type="number"
              value={
                value.emissionStartDate === 0 ? "" : value.emissionStartDate
              }
              onChange={(e: any) =>
                setValue({
                  ...value,
                  emissionStartDate: parseInt(e.target.value),
                })
              }
              label="Emission Start Date"
              endAdornment={
                <Box
                  sx={{
                    height: "100%",
                    width: "60%",
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
                      id={`vesting-emission-start-date-units-${props.id}`}
                      variant="outlined"
                      value={value.emissionStartDateUnits}
                      sx={{ height: "100%", color: "text.primary" }}
                      onChange={(e: any) =>
                        setValue({
                          ...value,
                          emissionStartDateUnits: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="days">Days</MenuItem>
                      <MenuItem value="weeks">Weeks</MenuItem>
                      <MenuItem value="months">Months</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              }
            />
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "40%" }}
            variant="outlined"
            hiddenLabel
          >
            <InputLabel htmlFor={`vesting-emission-length-${props.id}`} shrink>
              Emission Length
            </InputLabel>
            <OutlinedInput
              notched
              id={`vesting-emission-length-${props.id}`}
              type="number"
              value={value.emissionLength === 0 ? "" : value.emissionLength}
              onChange={(e: any) =>
                setValue({
                  ...value,
                  emissionLength: parseInt(e.target.value),
                })
              }
              label="Emission Length"
              endAdornment={
                <Box
                  sx={{
                    height: "3.3rem",
                    width: "50%",
                    backgroundColor: "backgroundColor.main",
                    color: "text.primary",
                    lineHeight: "400%",
                    textAlign: "center",
                    borderRadius: "0 .3rem .3rem 0",
                    mr: "-.8rem",
                    ml: ".5rem",
                    display: "flex",
                  }}
                >
                  <FormControl fullWidth>
                    <Select
                      id={`vesting-emission-length-units-${props.id}`}
                      variant="outlined"
                      value={value.emissionLengthUnits}
                      sx={{
                        height: "120%",
                        color: "text.primary",
                        fontSize: ".9rem",
                      }}
                      onChange={(e: any) =>
                        setValue({
                          ...value,
                          emissionLengthUnits: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="days">Days</MenuItem>
                      <MenuItem value="weeks">Weeks</MenuItem>
                      <MenuItem value="months">Months</MenuItem>
                      <MenuItem value="years">Years</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              }
            />
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default VestingSchedule;
