import { Alert, AlertTitle, Box, Button } from "@mui/material";
import * as React from "react";
import { ITokenomics } from "@lib/creation/Interfaces";
import { CreationContext } from "../../../lib/creation/Context";
import { IData } from "@lib/Interfaces";
import WalletSelector from "../governance/WalletSelector";
import { LearnMore } from "../utilities/HeaderComponents";
import AddIcon from "@mui/icons-material/Add";
import {
  percentage,
  percentageToBalance,
} from "../../../lib/creation/Utilities";
import PercentageInput from "../utilities/PercentageInput";
import BalanceInput from "../utilities/BalanceInput";
import DeleteIcon from "@mui/icons-material/Delete";
import CsvLoader from "../../utilities/CsvLoader";
import { deviceStruct } from "@components/utilities/Style";

const TokenHolders: React.FC<IData<ITokenomics>> = (props) => {
  let creationContext = React.useContext(CreationContext);
  let data = props.data;

  React.useEffect(() => {}, [props.data.tokenAmount]);

  return (
    <Box
      sx={{
        pb: "1rem",
      }}
    >
      <LearnMore
        title="Token Holders"
        tooltipTitle="Initial distribution"
        tooltipText="Select who receives tokens when the DAO is created. It is important to distribute enough tokens so that DAO voting can take place, but you don't have to distribute all of them now. Whatever percent of total tokens is leftover will be sent to the DAO treasury. "
        // tooltipLink="/here"
      />
      <Box
        sx={{
          width: "100%",
        }}
      >
        {data.tokenHolders.map((i: any, c: number) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: deviceStruct(
                  "wrap",
                  "wrap",
                  "no-wrap",
                  "no-wrap",
                  "no-wrap"
                ),
                mt: "1rem",
              }}
              key={`${c}-token-holder`}
            >
              <Box
                sx={{
                  width: { sm: "100%", md: "46%" },
                  mr: ".5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WalletSelector
                  id="tokenomics"
                  key={c + "tokenomics"}
                  canDelete={data.tokenHolders.length > 0}
                  data={i}
                  mt="0"
                  number={c}
                  set={(j: any) => {
                    let temp = [...data.tokenHolders];
                    if (j === undefined) {
                      temp.splice(c, 1);
                    } else {
                      temp[c] = { ...temp[c], ...j };
                    }
                    props.setData({ ...props.data, tokenHolders: temp });
                  }}
                />
                {data.tokenHolders.length > 1 && screen.width <= 900 && (
                  <DeleteIcon
                    style={{
                      marginLeft: ".4rem",
                      cursor: "pointer",
                      width: "10%",
                    }}
                    color="error"
                    onClick={() => {
                      let temp = [...data.tokenHolders];
                      temp.splice(c, 1);
                      props.setData({ ...data, tokenHolders: temp });
                    }}
                  />
                )}
              </Box>
              <BalanceInput
                total={data.tokenAmount}
                remaining={data.tokenRemaining}
                balance={data.tokenHolders[c].balance}
                value={data.tokenHolders[c]}
                mt={{ sm: ".5rem", md: "0" }}
                width={{ sm: "48%", md: "23%" }}
                set={(newValue: any) => {
                  let temp = [...data.tokenHolders];
                  temp[c] = { ...newValue };
                  props.setData({ ...props.data, tokenHolders: temp });
                }}
              />
              <PercentageInput
                width={{ sm: "48%", md: "23%" }}
                mt={{ sm: ".5rem", md: "0" }}
                total={data.tokenAmount}
                remaining={data.tokenRemaining}
                percentage={data.tokenHolders[c].percentage}
                value={data.tokenHolders[c]}
                set={(newValue: any) => {
                  let temp = [...data.tokenHolders];
                  temp[c] = { ...newValue };
                  props.setData({ ...props.data, tokenHolders: temp });
                }}
              />
              {data.tokenHolders.length > 1 && screen.width >= 900 && (
                <DeleteIcon
                  style={{
                    marginLeft: ".4rem",
                    cursor: "pointer",
                    width: "3%",
                  }}
                  color="error"
                  onClick={() => {
                    let temp = [...data.tokenHolders];
                    temp.splice(c, 1);
                    props.setData({ ...data, tokenHolders: temp });
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

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
              let temp = [...data.tokenHolders];
              creationContext.api.setData({
                ...creationContext.api.data,
                tokenomics: {
                  ...data,
                  tokenHolders: temp.concat([
                    {
                      alias: "",
                      address: "",
                      img: "",
                      balance: 0,
                      percentage: 0,
                    },
                  ]),
                },
              });
            }}
          >
            Add Another <AddIcon />
          </Button>
          <CsvLoader
            id="tokenomics-loader"
            handleFile={(imported: any) => {
              imported = imported.map((i: any, c: number) => {
                return {
                  ...i,
                  balance: percentageToBalance(
                    data.tokenAmount,
                    i.percentage / 100
                  ),
                  alias: `Wallet ${c}`,
                  img: "",
                };
              });
              let temp = [data.tokenHolders];
              creationContext.api.setData({
                ...creationContext.api.data,
                tokenomics: {
                  ...data,
                  tokenHolders: temp.concat(imported),
                },
              });
            }}
          />
        </Box>
      )}

      {data.tokenAmount > 0 && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Alert severity="warning" color="warning" sx={{ fontSize: ".8rem" }}>
            <AlertTitle sx={{ fontSize: ".9rem" }}>
              Tokens will be automatically sent to the treasury
            </AlertTitle>
            <Box sx={{ ml: "-1.75rem" }}>
              You have {data.tokenRemaining} unassigned {data.tokenName} tokens
              {data.tokenAmount > 0 &&
                ` (${percentage(data.tokenRemaining / data.tokenAmount)})`}
              . You can distribute them now by setting token configuration below
              or if you choose not to do it now, they will go to the treasury.
            </Box>
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default TokenHolders;
