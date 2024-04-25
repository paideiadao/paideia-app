import { deviceStruct } from "@components/utilities/Style";
import { IWallet } from "@lib/creation/Interfaces";
import { Box, Button, IconButton } from "@mui/material";
import * as React from "react";
import WalletSelector from "../creation/governance/WalletSelector";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface IMultiWalletSelector {
  wallets: IWallet[];
  set: (value: IWallet[]) => void;
}

const MultiWalletSelector: React.FC<IMultiWalletSelector> = (props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {props.wallets.map((i: any, c: number) => {
          return (
            <Box
              key={`token-holder-wallet-${c}`}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                mt: ".5rem",
                mb: ".5rem",
              }}
            >
              <Box
                sx={{
                  width: deviceStruct("80%", "80%", "90%", "90%", "90%"),
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WalletSelector
                  id="governance"
                  data={i}
                  number={c}
                  canDelete={props.wallets.length > 0}
                  set={(j: any) => {
                    let temp = [...props.wallets];

                    if (j === undefined) {
                      temp.splice(c, 1);
                    } else {
                      temp[c] = j;
                    }
                    props.set(temp);
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: deviceStruct("20%", "20%", "10%", "10%", "10%"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  color="error"
                  disabled={props.wallets.length === 1}
                  sx={{ color: "error.main" }}
                  onClick={() => {
                    let temp = [...props.wallets];
                    temp.splice(c, 1);
                    props.set(temp);
                  }}
                >
                  <DeleteIcon
                    color="error"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>
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
          onClick={() => {
            let temp = [...props.wallets];
            props.set(temp.concat([{ alias: "", address: "", img: "" }]));
          }}
        >
          Add Another <AddIcon />
        </Button>
        <Button disabled variant="text" size="small">
          Add from file <FileUploadIcon />
        </Button>
      </Box>
    </>
  );
};

export default MultiWalletSelector;
