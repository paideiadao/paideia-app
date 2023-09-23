import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { deviceWrapper } from "./Style";
import { ISendFundsRecipient } from "@components/dao/proposal/vote/YesNo/Actions/SendFunds";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import { fetcher } from "@lib/utilities";
import useSWR from "swr";
import MultiTokenAmountSelector from "./MultiTokenAmountSelector";

interface IMultiTokenHolders {
  recipients: ISendFundsRecipient[];
  treasuryAmount: number;
  set: (tokenHolders: ISendFundsRecipient[]) => void;
}

const MultiTokenHolders: React.FC<IMultiTokenHolders> = (props) => {
  const context = React.useContext<IGlobalContext>(GlobalContext);
  const daoId = context.api.daoData?.id;
  const { data: treasury, error: error } = useSWR(
    daoId && `/dao/treasury/${daoId}`,
    fetcher
  );

  const tokens = treasury?.balance?.confirmed?.tokens ?? [];

  return (
    <>
      {props.recipients.map((i: ISendFundsRecipient, c: number) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: deviceWrapper("wrap", "nowrap"),
                mt: "1rem",
              }}
              key={`${c}-token-holder`}
            >
              <Box
                sx={{
                  width: deviceWrapper("100%", "50%"),
                  mr: ".5rem",
                  mb: deviceWrapper(".75rem", "0"),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Wallet Address"
                  sx={{ width: "100%" }}
                  value={i.address}
                  onChange={(e) => {
                    const temp = [...props.recipients];
                    temp[c] = { ...i, address: e.target.value };
                    props.set(temp);
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: deviceWrapper("100%", "50%"),
                  mr: ".5rem",
                  mb: deviceWrapper(".75rem", "0"),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Ergs"
                  sx={{ width: "100%" }}
                  value={i.ergs}
                  onChange={(e) => {
                    const temp = [...props.recipients];
                    temp[c] = {
                      ...i,
                      // @ts-ignore
                      ergs: e.target.value,
                    };
                    props.set(temp);
                  }}
                />
              </Box>
              {props.recipients.length > 1 && (
                <IconButton
                  sx={{ display: deviceWrapper("none", "flex"), ml: ".5rem" }}
                  size="small"
                >
                  <DeleteIcon
                    color="error"
                    onClick={() => {
                      const temp = [...props.recipients];
                      temp.splice(c, 1);
                      props.set(temp);
                    }}
                  />
                </IconButton>
              )}
            </Box>
            <MultiTokenAmountSelector
              tokens={tokens}
              setTokens={(tokenDetails: any) => {
                const temp = [...props.recipients];
                temp[c] = {
                  ...i,
                  tokens: tokenDetails,
                };
                props.set(temp);
              }}
            />
          </>
        );
      })}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: ".8rem",
        }}
      >
        <Button
          disabled
          variant="text"
          size="small"
          sx={{ mr: 2 }}
          endIcon={<AddIcon />}
          onClick={() => {
            let temp = [...props.recipients];
            props.set(temp.concat([{ address: "", ergs: 0, tokens: [] }]));
          }}
        >
          Add Another
        </Button>
        <Button
          disabled
          variant="text"
          size="small"
          endIcon={<FileUploadIcon />}
        >
          Add from file
        </Button>
      </Box>
    </>
  );
};

export default MultiTokenHolders;
