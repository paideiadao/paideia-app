import {
  Box,
  Button,
  InputAdornment,
  TextField,
  AlertTitle,
} from "@mui/material";
import * as React from "react";
import { ITokenHolder, ITokenomics } from "@lib/creation/Interfaces";
import { IData } from "@lib/Interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import { CapsInfo, Header, LearnMore } from "../../utilities/HeaderComponents";
import BalanceInput from "../../utilities/BalanceInput";
import PercentageInput from "../../utilities/PercentageInput";
import VestingSchedule, { IVestingSchedule } from "./VestingSchedule";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import WalletSelector from "../../governance/WalletSelector";
import Alert from "@mui/material/Alert";
import { currencyFormatter } from "../../../utilities/currency";
import AbstractDate from "../../utilities/AbstractDate";
import useDidMountEffect from "../../../utilities/hooks";
import DistributionName from "../../utilities/DistributionName";

export interface IPublicRoundInfo {
  distributionName: string;
  balance: number;
  percentage: number;
  tokenPrice: number;
  maxPerWallet: number;
  signUpStartDate: Date;
  signUpEndDate: Date;
  contributionStartDate: Date;
  contributionEndDate: Date;
  waitlistStartDate: Date;
  waitlistEndDate: Date;
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

const PublicRound: React.FC<{
  data: IData<ITokenomics>;
  close: Function;
  c: number;
}> = (props) => {
  let data = props.data.data;
  let start = new Date();
  let end = new Date();
  end.setDate(end.getDate() + 30);
  let temp: any = data.distributions[props.c];
  const [value, setValue] = React.useState<IPublicRoundInfo>({
    distributionName:
      data.distributions[props.c] === undefined
        ? `Public Round`
        : temp.distributionName,
    balance: data.distributions[props.c] === undefined ? 0 : temp.balance,
    percentage: data.distributions[props.c] === undefined ? 0 : temp.percentage,
    tokenPrice:
      data.distributions[props.c] === undefined ? undefined : temp.tokenPrice,
    maxPerWallet:
      data.distributions[props.c] === undefined ? undefined : temp.maxPerWallet,
    signUpStartDate:
      data.distributions[props.c] === undefined ? start : temp.signUpStartDate,
    signUpEndDate:
      data.distributions[props.c] === undefined ? end : temp.signUpEndDate,
    contributionStartDate:
      data.distributions[props.c] === undefined
        ? start
        : temp.contributionStartDate,
    contributionEndDate:
      data.distributions[props.c] === undefined
        ? end
        : temp.contributionEndDate,
    waitlistStartDate:
      data.distributions[props.c] === undefined
        ? start
        : temp.waitlistStartDate,
    waitlistEndDate:
      data.distributions[props.c] === undefined ? end : temp.waitlistEndDate,
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
    id: "Public Round",
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
          title="Public Round"
          subtitle="Create a sign-up form to whitelist users for a public funding round."
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
      <Box sx={{ width: "100%", pl: "1rem", pr: "1rem" }}>
        <CapsInfo title="Configuration" />
        <Box sx={{ width: "100%", mt: "1rem", mb: "1rem" }}>
          <TextField
            value={value.tokenPrice === undefined ? "" : value.tokenPrice}
            type="number"
            sx={{ width: "49%", mr: ".5rem" }}
            onChange={(e: any) => {
              setValue({ ...value, tokenPrice: parseFloat(e.target.value) });
            }}
            label="Token Price"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ color: "text.secondary" }}>SigUSD</Box>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={value.maxPerWallet === undefined ? "" : value.maxPerWallet}
            type="number"
            sx={{ width: "49%" }}
            onChange={(e: any) => {
              setValue({ ...value, maxPerWallet: parseFloat(e.target.value) });
            }}
            label="Max per wallet"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ color: "text.secondary" }}>USD</Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ width: "100%", mt: "1rem", mb: "1rem" }}>
          <AbstractDate
            value={value.signUpStartDate}
            setValue={(newValue: Date) =>
              setValue({ ...value, signUpStartDate: newValue })
            }
            width="49%"
            label="Sign up start date"
            mr=".5rem"
          />
          <AbstractDate
            value={value.signUpEndDate}
            setValue={(newValue: Date) =>
              setValue({ ...value, signUpEndDate: newValue })
            }
            width="49%"
            label="Sign up end date"
          />
        </Box>
        <Box sx={{ width: "100%", mt: "1rem", mb: "1rem" }}>
          <AbstractDate
            value={value.contributionStartDate}
            setValue={(newValue: Date) =>
              setValue({ ...value, contributionStartDate: newValue })
            }
            width="49%"
            label="Contribution start date"
            mr=".5rem"
          />
          <AbstractDate
            value={value.contributionEndDate}
            setValue={(newValue: Date) =>
              setValue({ ...value, contributionEndDate: newValue })
            }
            width="49%"
            label="Contribution end date"
          />
        </Box>
        <Box sx={{ width: "100%", mt: "1rem", mb: "1rem" }}>
          <AbstractDate
            value={value.waitlistStartDate}
            setValue={(newValue: Date) =>
              setValue({ ...value, waitlistStartDate: newValue })
            }
            width="49%"
            label="Whitelist start date"
            mr=".5rem"
          />
          <AbstractDate
            value={value.waitlistEndDate}
            setValue={(newValue: Date) =>
              setValue({ ...value, waitlistEndDate: newValue })
            }
            width="49%"
            label="Whitelist end date"
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", pl: "1rem", mt: "1rem", pr: "1rem" }}>
        <CapsInfo title="Configuration" />
        <LearnMore
          title="Token Holder Addresses"
          light
          tooltipTitle="Title Here"
          tooltipText="Content here."
          tooltipLink="/here"
        />
        {value.tokenHolders.map((i: ITokenHolder, c: number) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", height: "5rem" }}>
              <Box
                sx={{
                  width: "57%",
                  mr: ".5rem",
                  display: "flex",
                }}
              >
                <WalletSelector
                  id="tokenomics"
                  key={c + "tokenomics"}
                  data={i}
                  mt="0"
                  number={c}
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
                remaining={data.tokenRemaining}
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
                remaining={data.tokenRemaining}
                percentage={value.tokenHolders[c].percentage}
                value={value.tokenHolders[c]}
                set={(newValue: any) => {
                  let temp = [...value.tokenHolders];
                  temp[c] = { ...newValue };
                  setValue({ ...value, tokenHolders: temp });
                }}
              />
            </Box>
          );
        })}
        {data.tokenRemaining > 0 &&
          value.tokenHolders.map((i: any) => i.balance).indexOf(0) === -1 &&
          value.tokenHolders.map((i: any) => i.percentage).indexOf(0) ===
            -1 && (
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
        id="public-round"
      />
      {value.tokenPrice !== undefined && value.balance !== 0 && (
        <Alert
          severity="warning"
          color="warning"
          sx={{ mr: "1rem", ml: "1rem", mb: "1rem", width: "100%" }}
        >
          <AlertTitle sx={{ fontSize: ".9rem" }}>
            You are creating a public sale for{" "}
            {currencyFormatter(value.tokenPrice * value.balance)} USD
          </AlertTitle>
        </Alert>
      )}
    </>
  );
};

export default PublicRound;
