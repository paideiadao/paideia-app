import {
  Box,
  Button,
  InputAdornment,
  TextField,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import * as React from "react";
import { ITokenHolder, ITokenomics } from "@lib/creation/Interfaces";
import { IData } from "@lib/Interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import { CapsInfo, Header, LearnMore } from "../../utilities/HeaderComponents";
import BalanceInput from "../../utilities/BalanceInput";
import PercentageInput from "../../utilities/PercentageInput";
import useDidMountEffect from "../../../utilities/hooks";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import WalletSelector from "../../governance/WalletSelector";
import LabeledSwitch from "../../utilities/LabeledSwitch";
import AbstractDate from "../../utilities/AbstractDate";
import DistributionName from "../../utilities/DistributionName";

export interface IAirdropInfo {
  distributionName: string;
  balance: number;
  percentage: number;
  distributionType: string;
  airdropDate: Date;
  whitelistStartDate: Date;
  whitelistEndDate: Date;
  tokenHolders: ITokenHolder[];
  manualDataValidation: boolean;
  whitelistInstructions: string;
  validatedFields: IValidatedField[];
  whitelistedAddress: ITokenHolder;
  id: string;
}

interface IValidatedField {
  value: string;
  number: number;
}

const Airdrop: React.FC<{
  data: IData<ITokenomics>;
  close: Function;
  c: number;
}> = (props) => {
  let data = props.data.data;
  let start = new Date();
  let end = new Date();
  end.setDate(end.getDate() + 30);
  let temp: any = data.distributions[props.c];
  const [value, setValue] = React.useState<IAirdropInfo>({
    distributionName:
      data.distributions[props.c] === undefined
        ? `Airdrop`
        : temp.distributionName,
    balance: data.distributions[props.c] === undefined ? 0 : temp.balance,
    percentage: data.distributions[props.c] === undefined ? 0 : temp.percentage,
    distributionType:
      data.distributions[props.c] === undefined
        ? "manual"
        : temp.distributionType,
    airdropDate:
      data.distributions[props.c] === undefined ? start : temp.airdropDate,
    whitelistStartDate:
      data.distributions[props.c] === undefined
        ? start
        : temp.whitelistStartDate,
    whitelistEndDate:
      data.distributions[props.c] === undefined ? end : temp.whitelistEndDate,
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
    manualDataValidation:
      data.distributions[props.c] === undefined
        ? false
        : temp.manualDataValidation,
    whitelistInstructions:
      data.distributions[props.c] === undefined
        ? ""
        : temp.whitelistInstructions,
    validatedFields:
      data.distributions[props.c] === undefined ? [] : temp.validatedFields,
    whitelistedAddress: {
      alias:
        data.distributions[props.c] === undefined
          ? ""
          : temp.whitelistedAddress === undefined
          ? ""
          : temp.whitelistedAddress.alias,
      address:
        data.distributions[props.c] === undefined
          ? ""
          : temp.whitelistedAddress === undefined
          ? ""
          : temp.whitelistedAddress.address,
      img:
        data.distributions[props.c] === undefined
          ? ""
          : temp.whitelistedAddress === undefined
          ? ""
          : temp.whitelistedAddress.img,
      balance:
        data.distributions[props.c] === undefined
          ? 0
          : temp.whitelistedAddress === undefined
          ? ""
          : temp.whitelistedAddress.balance,
      percentage:
        data.distributions[props.c] === undefined
          ? 0
          : temp.whitelistedAddress === undefined
          ? ""
          : temp.whitelistedAddress.percentage,
    },
    id: "Airdrop",
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
          title="Airdrop"
          subtitle="Distribute tokens to some addresses either manually or with a sign-up form."
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
      <Box
        sx={{
          width: "100%",
          pl: "1rem",
          pr: "1rem",
          pb: "1rem",
          borderBottom: "1px solid",
          borderColor: "border.main",
        }}
      >
        <ButtonGroup variant="outlined" sx={{ width: "100%", mb: "1rem" }}>
          <Button
            sx={{
              width: "50%",
              fontSize: ".8rem",
              backgroundColor:
                value.distributionType === "manual"
                  ? "primary.selectedButton"
                  : "",
            }}
            onClick={() => setValue({ ...value, distributionType: "manual" })}
          >
            Manual Distribution
          </Button>
          <Button
            sx={{
              width: "50%",
              fontSize: ".8rem",
              backgroundColor:
                value.distributionType === "whitelist"
                  ? "primary.selectedButton"
                  : "",
            }}
            onClick={() =>
              setValue({ ...value, distributionType: "whitelist" })
            }
          >
            Create Whitelist Form
          </Button>
        </ButtonGroup>
        {value.distributionType === "whitelist" && (
          <>
            <AbstractDate
              value={value.whitelistStartDate}
              setValue={(newValue: Date) =>
                setValue({ ...value, whitelistStartDate: newValue })
              }
              width="49%"
              label="Sign up start date"
              mr=".5rem"
            />
            <AbstractDate
              value={value.whitelistEndDate}
              setValue={(newValue: Date) =>
                setValue({ ...value, whitelistEndDate: newValue })
              }
              width="49%"
              label="Sign up end date"
            />
          </>
        )}
        <Box
          sx={{
            width: "100%",
            mt: "1rem",
            mb: value.distributionType === "manual" ? 0 : "1rem",
          }}
        >
          <AbstractDate
            value={value.airdropDate}
            setValue={(newValue: Date) =>
              setValue({ ...value, airdropDate: newValue })
            }
            width="49%"
            label="Airdrop date"
          />
        </Box>

        {value.distributionType === "whitelist" && (
          <Box sx={{ width: "99.25%", mt: "1rem" }}>
            <TextField
              minRows={3}
              multiline
              sx={{ width: "100%" }}
              label="Whitelist instructions"
              value={value.whitelistInstructions}
              onChange={(e: any) =>
                setValue({ ...value, whitelistInstructions: e.target.value })
              }
            />
          </Box>
        )}
      </Box>

      {value.distributionType === "whitelist" ? (
        <Box sx={{ pl: "1rem", pr: "1rem" }}>
          <LabeledSwitch
            small
            onChange={() =>
              setValue({
                ...value,
                manualDataValidation: !value.manualDataValidation,
              })
            }
            value={value.manualDataValidation}
            title="Activate manual data validation"
            subtitle="Create input fields of data you want to validate and assign a user to manually go through the validation process"
          />
          {value.manualDataValidation === true && (
            <Box sx={{ width: "100%", pb: "1rem" }}>
              <LearnMore
                title="Fields that will be validated"
                tooltipTitle="Title Here"
                tooltipText="Content here."
                tooltipLink="/here"
              />
              <Box sx={{ width: "100%" }}>
                {value.validatedFields.map((i: IValidatedField, c: number) => {
                  return (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        label={`Input name (${i.number + 1})`}
                        value={i.value}
                        sx={{ width: "100%", mt: ".5rem", mb: ".5rem" }}
                        onChange={(e: any) => {
                          let temp = [...value.validatedFields];
                          temp[c].value = e.target.value;
                          setValue({ ...value, validatedFields: temp });
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => {
                                  let temp = [...value.validatedFields];
                                  temp.splice(c, 1);
                                  setValue({ ...value, validatedFields: temp });
                                }}
                              >
                                <DeleteIcon color="error" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: "1rem",
                  mt: ".5rem",
                }}
              >
                <Button
                  variant="text"
                  onClick={() => {
                    let temp = [...value.validatedFields];
                    temp.push({
                      value: "",
                      number: temp.length,
                    });
                    setValue({ ...value, validatedFields: temp });
                  }}
                >
                  Add Input <AddIcon />
                </Button>
              </Box>
              <Box sx={{ width: "100%" }}>
                <WalletSelector
                  id="tokenomics"
                  key="manual-whitelist-airdrop"
                  data={value.whitelistedAddress}
                  mt="0"
                  number={1}
                  set={(j: any) =>
                    setValue({ ...value, whitelistedAddress: j })
                  }
                />
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ width: "100%", p: "1rem" }}>
          <CapsInfo title="Configuration" />
          <LearnMore
            title="Recepient wallet address"
            light
            tooltipTitle="Title Here"
            tooltipText="Content here."
            tooltipLink="/here"
          />
          {value.tokenHolders.map((i: ITokenHolder, c: number) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  height: "5rem",
                }}
              >
                <Box
                  sx={{
                    width: "57%",
                    mr: ".5rem",
                    display: "flex",
                    alignItem: "flex-start",
                  }}
                >
                  <WalletSelector
                    id="tokenomics"
                    key={c + "tokenomics-airdrop"}
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
      )}
      {}
    </>
  );
};

export default Airdrop;
