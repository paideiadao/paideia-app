import {
  Box,
  Button,
  InputAdornment,
  TextField,
  AlertTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import * as React from "react";
import { ITokenomics } from "@lib/creation/Interfaces";
import { IData } from "@lib/Interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import { CapsInfo, Header } from "../../utilities/HeaderComponents";
import BalanceInput from "../../utilities/BalanceInput";
import PercentageInput from "../../utilities/PercentageInput";
import Alert from "@mui/material/Alert";
import LabeledSwitch from "../../utilities/LabeledSwitch";
import AbstractDate from "../../utilities/AbstractDate";
import useDidMountEffect from "../../../utilities/hooks";
import DistributionName from "../../utilities/DistributionName";

export interface IStakingInfo {
  distributionName: string;
  balance: number;
  percentage: number;
  emissionType: string;
  startDate: Date;
  endDate: Date;
  stakingFee: boolean;
  witholdPercentage: number;
  id: string;
}

const Staking: React.FC<{
  data: IData<ITokenomics>;
  close: Function;
  c: number;
}> = (props) => {
  let data = props.data.data;
  let start = new Date();
  let end = new Date();
  end.setDate(end.getDate() + 30);
  let temp: any = data.distributions[props.c];

  const [value, setValue] = React.useState<IStakingInfo>({
    distributionName:
      data.distributions[props.c] === undefined
        ? `Staking`
        : temp.distributionName,
    balance: data.distributions[props.c] === undefined ? 0 : temp.balance,
    percentage: data.distributions[props.c] === undefined ? 0 : temp.percentage,
    emissionType:
      data.distributions[props.c] === undefined ? "weekly" : temp.emissionType,
    startDate:
      data.distributions[props.c] === undefined ? start : temp.startDate,
    endDate: data.distributions[props.c] === undefined ? end : temp.endDate,
    stakingFee:
      data.distributions[props.c] === undefined ? false : temp.stakingFee,
    witholdPercentage:
      data.distributions[props.c] === undefined ? 0 : temp.witholdPercentage,
    id: "Staking",
  });

  React.useEffect(() => {
    /// add data to global context...
    let temp = [...data.distributions];
    temp[props.c] = { ...value };
    props.data.setData({
      ...data,
      distributions: temp,
    });
  }, [value]);

  useDidMountEffect(() => {
    setValue({
      ...value,
      balance: props.data.data.distributions[props.c].balance,
    });
  }, [props.data.data.distributions]);

  return (
    <>
      <DeleteIcon
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
        }}
        color="error"
        onClick={() => props.close()}
      />

      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid",
          borderColor: "border.main",
          mb: "1rem",
          pl: "1rem",
        }}
      >
        <Header
          title="Staking"
          subtitle="Create a staking contract which distributes tokens over a fixed time-frame."
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          pl: "1rem",
          pr: "1rem",
          borderBottom: "1px solid",
          borderColor: "border.main",
          mb: "1rem",
          pb: "1rem",
        }}
      >
        <CapsInfo title="General Information" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: ".5rem",
            mb: ".5rem",
          }}
        >
          <DistributionName
            c={props.c}
            value={value.distributionName}
            set={(e: any) => {
              setValue({ ...value, distributionName: e });
            }}
          />
          <BalanceInput
            total={data.tokenAmount}
            remaining={data.tokenRemaining}
            balance={value.balance}
            value={value}
            set={setValue}
          />
          <PercentageInput
            total={data.tokenAmount}
            remaining={data.tokenRemaining}
            percentage={value.percentage}
            value={value}
            set={setValue}
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", pl: "1rem", pr: "1rem", pb: "1rem" }}>
        <CapsInfo title="Configuration" />
        <FormControl sx={{ width: "32.3%", mr: ".5rem" }}>
          <InputLabel htmlFor={`vesting-frequency-label-${props.c}`} shrink>
            Emission type
          </InputLabel>
          <Select
            labelId={`emission-type-staking-${props.c}`}
            id={`emission-type-staking-${props.c}`}
            variant="outlined"
            label="Emission type"
            value={value.emissionType}
            sx={{ height: "100%", color: "text.primary" }}
            onChange={(e: any) =>
              setValue({
                ...value,
                emissionType: e.target.value,
              })
            }
          >
            <MenuItem value="hourly">Hourly</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
        <AbstractDate
          value={value.startDate}
          setValue={(newValue: Date) =>
            setValue({ ...value, startDate: newValue })
          }
          width="32.3%"
          label="Start date"
          mr=".5rem"
        />
        <AbstractDate
          value={value.endDate}
          setValue={(newValue: Date) =>
            setValue({ ...value, endDate: newValue })
          }
          width="32.3%"
          label="End date"
        />
      </Box>
      <Box sx={{ width: "100%", pl: "1rem", pb: "1rem", pr: ".6rem" }}>
        <LabeledSwitch
          small
          title="DAOs staking fee"
          subtitle="You can activate this option in order to withold some fo the staking rewards for the DAO's treasury."
          value={value.stakingFee}
          onChange={() => setValue({ ...value, stakingFee: !value.stakingFee })}
        />
        {value.stakingFee && (
          <TextField
            value={value.witholdPercentage === 0 ? "" : value.witholdPercentage}
            sx={{ width: "20%" }}
            onChange={(e: any) =>
              setValue({ ...value, witholdPercentage: e.target.value })
            }
            type="number"
            label="Withold"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ color: "text.primary" }}>%</Box>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Box>
    </>
  );
};

export default Staking;
