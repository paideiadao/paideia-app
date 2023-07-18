import WalletSelector from "@components/creation/governance/WalletSelector";
import BalanceInput from "@components/creation/utilities/BalanceInput";
import PercentageInput from "@components/creation/utilities/PercentageInput";
import { ITokenHolder } from "@lib/creation/Interfaces";
import { Box, Button, IconButton, TextField } from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { deviceWrapper } from "./Style";

interface IMultiTokenHolders {
  tokenHolders: ITokenHolder[];
  treasuryAmount: number;
  set: (tokenHolders: ITokenHolder[]) => void;
}

const MultiTokenHolders: React.FC<IMultiTokenHolders> = (props) => {
  return (
    <>
      {props.tokenHolders.map((i: ITokenHolder, c: number) => {
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
                  const temp = [...props.tokenHolders];
                  temp[c] = { ...i, address: e.target.value };
                  props.set(temp);
                }}
              />
            </Box>
            <BalanceInput
              width={deviceWrapper("100%", "50%")}
              total={props.treasuryAmount}
              remaining={
                props.treasuryAmount -
                props.tokenHolders
                  .map((i: ITokenHolder) => i.balance)
                  .reduce((partialSum, a) => partialSum + a, 0)
              }
              balance={i.balance}
              value={i}
              set={(newValue: any) => {
                const temp = [...props.tokenHolders];
                temp[c] = { ...newValue };
                props.set(temp);
              }}
            />
            {/* <PercentageInput
              width={deviceWrapper("47.25%", "23%")}
              total={props.treasuryAmount}
              remaining={
                props.treasuryAmount -
                props.tokenHolders
                  .map((i: ITokenHolder) => i.balance)
                  .reduce((partialSum, a) => partialSum + a, 0)
              }
              percentage={i.percentage}
              value={i}
              set={(newValue: any) => {
                let temp = [...props.tokenHolders];
                temp[c] = { ...newValue };
                props.set(temp);
              }}
            /> */}
            {props.tokenHolders.length > 1 && (
              <IconButton
                sx={{ display: deviceWrapper("none", "flex"), ml: ".5rem" }}
                size="small"
              >
                <DeleteIcon
                  color="error"
                  onClick={() => {
                    let temp = [...props.tokenHolders];
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
          variant="text"
          size="small"
          sx={{ mr: 2 }}
          endIcon={<AddIcon />}
          onClick={() => {
            let temp = [...props.tokenHolders];
            props.set(
              temp.concat([
                { alias: "", address: "", img: "", balance: 0, percentage: 0 },
              ])
            );
          }}
        >
          Add Another
        </Button>
        <Button variant="text" size="small" endIcon={<FileUploadIcon />}>
          Add from file
        </Button>
      </Box>
    </>
  );
};

export default MultiTokenHolders;
