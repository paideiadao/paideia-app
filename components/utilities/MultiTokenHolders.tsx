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
            <Box
              sx={{
                width: deviceWrapper("100%", "50%"),
                mr: ".5rem",
                mb: deviceWrapper(".75rem", "0"),
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="token-select-label">Token Name</InputLabel>
                <Select
                  labelId="token-select-label"
                  id="token-select"
                  sx={{ width: "100%" }}
                  label="Token Name"
                  value={i.token_id}
                  onChange={(e) => {
                    const temp = [...props.recipients];
                    temp[c] = {
                      ...i,
                      // @ts-ignore
                      token_id: e.target.value,
                    };
                    props.set(temp);
                  }}
                >
                  {tokens.map(
                    (tokenDetails: { tokenId: string; name: string }) => (
                      <MenuItem value={tokenDetails.tokenId}>
                        {tokenDetails.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
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
                label="Token Amount"
                sx={{ width: "100%" }}
                value={
                  isNaN(
                    i.tokens /
                      Math.pow(
                        10,
                        tokens.filter(
                          (tokenDetails: { tokenId: string }) =>
                            tokenDetails.tokenId === i.token_id
                        )[0]?.decimals ?? 0
                      )
                  )
                    ? i.tokens
                    : i.tokens /
                      Math.pow(
                        10,
                        tokens.filter(
                          (tokenDetails: { tokenId: string }) =>
                            tokenDetails.tokenId === i.token_id
                        )[0]?.decimals ?? 0
                      )
                }
                onChange={(e) => {
                  const tokenDetails = tokens.filter(
                    (tokenDetails: { tokenId: string }) =>
                      tokenDetails.tokenId === i.token_id
                  )[0];
                  const tokenDecimals = tokenDetails?.decimals ?? 0;
                  const temp = [...props.recipients];
                  temp[c] = {
                    ...i,
                    // @ts-ignore
                    tokens: isNaN(e.target.value * Math.pow(10, tokenDecimals))
                      ? e.target.value
                      // @ts-ignore
                      : e.target.value * Math.pow(10, tokenDecimals),
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
            props.set(
              temp.concat([{ address: "", ergs: 0, tokens: 0, token_id: "" }])
            );
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
