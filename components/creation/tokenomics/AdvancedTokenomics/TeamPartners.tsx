import { Box, Button, InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import { ITokenHolder, ITokenomics } from "@lib/creation/Interfaces";
import { IData } from "@lib/Interfaces";
import { CapsInfo, Header, LearnMore } from "../../utilities/HeaderComponents";
import VestingSchedule, { IVestingSchedule } from "./VestingSchedule";
import BalanceInput from "../../utilities/BalanceInput";
import PercentageInput from "../../utilities/PercentageInput";
import WalletSelector from "../../governance/WalletSelector";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import useDidMountEffect from "../../../utilities/hooks";
import DistributionName from "../../utilities/DistributionName";

export interface ITeamPartnersInfo {
  distributionName: string;
  balance: number;
  percentage: number;
  tokenHolders: ITokenHolder[];
  vesting: boolean;
  initialDistribution: number;
  emissionStartDate: number;
  emissionStartDateUnits: string;
  frequency: string;
  emissionLength: number;
  emissionLengthUnits: string;
  id: string;
}

const TeamPartners: React.FC<{
  data: IData<ITokenomics>;
  close: Function;
  c: number;
}> = (props) => {
  let data = props.data.data;
  let temp: any = data.distributions[props.c];
  const [value, setValue] = React.useState<ITeamPartnersInfo>({
    distributionName:
      data.distributions[props.c] === undefined
        ? `Team & Partners`
        : temp.distributionName,
    balance: data.distributions[props.c] === undefined ? 0 : temp.balance,
    percentage: data.distributions[props.c] === undefined ? 0 : temp.percentage,
    tokenHolders:
      data.distributions[props.c] === undefined
        ? [
            {
              alias: "",
              address: "",
              img: "",
              balance: 0,
              percentage: 0,
            },
          ]
        : temp.tokenHolders,
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
    id: "Team & Partners",
  });
  const [tokenRemaining, setTokenRemaining] = React.useState<number>(0);

  React.useEffect(() => {
    setTokenRemaining(
      value.balance -
        (value.tokenHolders.length === 0
          ? 0
          : value.tokenHolders
              .map((i: any) => i.balance)
              .reduce((sum, current) => sum + current, 0))
    );
  }, [value.balance, value.tokenHolders]);

  useDidMountEffect(() => {
    setValue({
      ...value,
      balance: props.data.data.distributions[props.c].balance,
    });
  }, [props.data.data.distributions]);

  React.useEffect(() => {
    /// add data to global context...
    let temp = [...data.distributions];
    temp[props.c] = { ...value };
    props.data.setData({
      ...data,
      distributions: temp,
    });
  }, [value]);

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
          title="Team & Partners"
          subtitle="Distribute tokens between your team members or advisors."
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          pl: "1rem",
          borderBottom: "1px solid",
          borderColor: "border.main",
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
            pr: "1rem",
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
      <Box sx={{ width: "100%", pl: "1rem", mt: "1rem", pr: ".5rem" }}>
        <CapsInfo title="Configuration" />
        <LearnMore
          title="Token Holder Addresses"
          light
          tooltipTitle="Title Here"
          tooltipText="Content here."
          tooltipLink="/here"
        />
        {value.tokenHolders.map((tokenHolder: ITokenHolder, c: number) => {
          return (
            <Box
              key={tokenHolder.alias}
              sx={{ display: "flex", alignItems: "center", height: "5rem" }}
            >
              <Box
                sx={{
                  width: "57%",
                  mr: ".5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WalletSelector
                  id="tokenomics"
                  key={c + "tokenomics"}
                  data={tokenHolder}
                  mt="0"
                  number={c}
                  canDelete={value.tokenHolders.length > 0}
                  set={(j: any) => {
                    let temp = [...value.tokenHolders];
                    if (j === undefined) {
                      temp.splice(c, 1);
                    } else {
                      temp[c] = { ...temp[c], ...j };
                    }
                    setValue({ ...value, tokenHolders: temp });
                  }}
                />
              </Box>
              <BalanceInput
                total={value.balance}
                remaining={tokenRemaining}
                balance={value.tokenHolders[c].balance}
                value={value.tokenHolders[c]}
                set={(newValue: any) => {
                  let temp = [...value.tokenHolders];
                  temp[c] = { ...newValue };
                  setValue({ ...value, tokenHolders: temp });
                }}
              />
              <PercentageInput
                total={value.balance}
                remaining={tokenRemaining}
                percentage={value.tokenHolders[c].percentage}
                value={value.tokenHolders[c]}
                set={(newValue: any) => {
                  let temp = [...value.tokenHolders];
                  temp[c] = { ...newValue };
                  setValue({ ...value, tokenHolders: temp });
                }}
              />
              {value.tokenHolders.length > 1 && (
                <DeleteIcon
                  style={{
                    fill: "red",
                    marginLeft: ".4rem",
                    cursor: "pointer",
                    width: "3%",
                  }}
                  onClick={() => {
                    let temp = [...value.tokenHolders];
                    temp.splice(c, 1);
                    setValue({ ...value, tokenHolders: temp });
                  }}
                />
              )}
            </Box>
          );
        })}
        {data.tokenRemaining > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: ".8rem",
            }}
          >
            <Button
              variant="text"
              sx={{ mr: 2 }}
              onClick={() => {
                let temp = [...value.tokenHolders];
                setValue({
                  ...value,

                  tokenHolders: temp.concat([
                    {
                      alias: "",
                      address: "",
                      img: "",
                      balance: 0,
                      percentage: 0,
                    },
                  ]),
                });
              }}
            >
              Add Another <AddIcon />
            </Button>
            <Button variant="text">
              Add from file <FileUploadIcon />
            </Button>
          </Box>
        )}
      </Box>
      <VestingSchedule
        set={(data: IVestingSchedule) => setValue({ ...value, ...data })}
        value={value.vesting}
        id={"team-and-partners"}
      />
    </>
  );
};

export default TeamPartners;
