import * as React from "react";
import { ITokenomics } from "@lib/creation/Interfaces";
import { IData } from "@lib/Interfaces";
import { Box } from "@mui/material";
import { CapsInfo, Header } from "../../utilities/HeaderComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import VestingSchedule, { IVestingSchedule } from "./VestingSchedule";
import BalanceInput from "../../utilities/BalanceInput";
import PercentageInput from "../../utilities/PercentageInput";
import useDidMountEffect from "../../../utilities/hooks";
import DistributionName from "../../utilities/DistributionName";

export interface ITreasuryInfo {
  distributionName: string;
  balance: number;
  percentage: number;
  vesting: boolean;
  initialDistribution: number;
  emissionStartDate: number;
  emissionStartDateUnits: string;
  frequency: string;
  emissionLength: number;
  emissionLengthUnits: string;
  id: string;
}

const Treasury: React.FC<{
  data: IData<ITokenomics>;
  close: Function;
  c: number;
}> = (props) => {
  let data = props.data.data;
  let temp: any = data.distributions[props.c];
  const [value, setValue] = React.useState<ITreasuryInfo>({
    distributionName:
      data.distributions[props.c] === undefined
        ? `Treasury`
        : temp.distributionName,
    balance: data.distributions[props.c] === undefined ? 0 : temp.balance,
    percentage: data.distributions[props.c] === undefined ? 0 : temp.percentage,
    vesting: data.distributions[props.c] === undefined ? false : temp.vesting,
    initialDistribution:
      data.distributions[props.c] === undefined ? 0 : temp.initialDistribution,
    emissionStartDate:
      data.distributions[props.c] === undefined ? 0 : temp.emissionStartDate,
    emissionStartDateUnits:
      data.distributions[props.c] === undefined
        ? "weeks"
        : temp.emissionStartDateUnits,
    frequency:
      data.distributions[props.c] === undefined ? "weekly" : temp.frequency,
    emissionLength:
      data.distributions[props.c] === undefined ? 0 : temp.emissionLength,
    emissionLengthUnits:
      data.distributions[props.c] === undefined
        ? "weeks"
        : temp.emissionLengthUnits,
    id: "Treasury",
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
          title="Treasury"
          subtitle="Organize your treasury into categories"
        />
      </Box>
      <Box sx={{ width: "100%", pl: "1rem", pr: "1rem" }}>
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
      <VestingSchedule
        set={(data: IVestingSchedule) => setValue({ ...value, ...data })}
        value={value.vesting}
        id="treasury"
      />
    </>
  );
};

export default Treasury;
