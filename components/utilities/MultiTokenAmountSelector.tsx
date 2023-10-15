import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { deviceWrapper } from "./Style";

interface IMultiTokenAmountSelectorProps {
  tokens: any;
  setTokens: Function;
}

export interface ITokenAmountDetails {
  tokenId: string;
  amount: string;
  decimals: number;
}

const MultiTokenAmountSelector: React.FC<IMultiTokenAmountSelectorProps> = (
  props
) => {
  const [tokens, setTokens] = useState<ITokenAmountDetails[]>([]);

  useEffect(() => {
    props.setTokens(tokens);
  }, [tokens]);

  return (
    <>
      {tokens.map((token, index) => {
        return (
          <Box
            key={token.tokenId}
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: deviceWrapper("wrap", "nowrap"),
              mt: "1rem",
            }}
            id={token.tokenId}
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
              <FormControl fullWidth>
                <InputLabel id="token-select-label">Token Name</InputLabel>
                <Select
                  labelId="token-select-label"
                  id="token-select"
                  sx={{ width: "100%" }}
                  label="Token Name"
                  value={token.tokenId}
                  onChange={(e) => {
                    const cp = [...tokens];
                    cp[index].tokenId = e.target.value;
                    cp[index].decimals =
                      props.tokens.filter(
                        (token: { tokenId: string }) =>
                          token.tokenId === e.target.value
                      )[0]?.decimals ?? 0;
                    setTokens([...cp]);
                  }}
                >
                  {props.tokens.map(
                    (tokenDetails: { tokenId: string; name: string }) => (
                      <MenuItem
                        key={token.tokenId}
                        value={tokenDetails.tokenId}
                      >
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
                value={token.amount}
                onChange={(e) => {
                  const cp = [...tokens];
                  cp[index].amount = e.target.value;
                  setTokens([...cp]);
                }}
              />
            </Box>
          </Box>
        );
      })}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: ".8rem",
          mb: "1.2rem",
        }}
      >
        <Button
          variant="text"
          size="small"
          sx={{ mr: 1 }}
          endIcon={<AddIcon />}
          onClick={() => {
            setTokens([...tokens, { tokenId: "", amount: "0", decimals: 0 }]);
          }}
        >
          Add Tokens
        </Button>
        <Button
          variant="text"
          size="small"
          endIcon={<DeleteIcon />}
          onClick={() => {
            setTokens(tokens.slice(0, tokens.length - 1));
          }}
        >
          Remove Token
        </Button>
      </Box>
    </>
  );
};

export default MultiTokenAmountSelector;
