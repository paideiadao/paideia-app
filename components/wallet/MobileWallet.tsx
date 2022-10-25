import {
  Avatar,
  Box,
  Button,
  DialogContentText,
  IconButton,
  InputAdornment,
  TextField,
  Link,
} from "@mui/material";
import * as React from "react";
import ergo from "@public/icons/ergo.png";
import ClearIcon from "@mui/icons-material/Clear";
import QRCode from "react-qr-code";
import { isAddressValid } from "./AddWallet";
import { useWallet } from "./WalletContext";

const MobileWallet: React.FC<{
  set: Function;
  wallet: string;
  setWallet: Function;
  qrCode: string;
}> = (props) => {
  const { wallet } = useWallet();
  return (
    <Box sx={{ width: "100%" }}>
      {props.qrCode === undefined ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: "1rem",
              width: "100%",
              backgroundColor: "primary.lightOpacity",
              p: "1rem",
              borderRadius: ".5rem",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Avatar
              src={ergo.src}
              sx={{ height: "2.5rem", width: "2.5rem", mr: "1rem" }}
            />
            <Box sx={{ fontSize: "1.2rem", color: "text.primary" }}>
              Mobile Wallet
              <Box
                sx={{
                  fontSize: ".9rem",
                  color: "text.secondary",
                  mt: "-.25rem",
                }}
              >
                Connect by manually adding your wallet address
              </Box>
            </Box>
            <Button
              sx={{ ml: "auto" }}
              size="small"
              onClick={() => props.set()}
            >
              Change
            </Button>
          </Box>
          <Box sx={{ mt: ".75rem", fontSize: ".9rem" }}>
            Please type your wallet address in the input field in order to
            connect it to Paideia and access all of Paideia's features.
          </Box>
          <TextField
            key="mobile-wallet-input"
            label="Wallet address    "
            sx={{ width: "100%", mt: ".75rem", fontSize: ".9rem" }}
            value={props.wallet}
            onChange={(e: any) => props.setWallet(e.target.value)}
            autoComplete={"false"}
            size="medium"
            InputProps={{
              readOnly: props.qrCode === undefined && isAddressValid(wallet),
              endAdornment: !isAddressValid(wallet) && (
                <InputAdornment position="end">
                  {props.wallet !== "" && (
                    <IconButton
                      color="primary"
                      onClick={() => props.setWallet("")}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </>
      ) : (
        <Box sx={{ width: "100%" }}>
          <DialogContentText
            sx={{ fontSize: ".9rem", mb: ".75rem", mt: ".75rem" }}
          >
            Scan the QR code or <Link href={props.qrCode}>click this link</Link> to authenticate with Ergo Mobile Wallet.
          </DialogContentText>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <QRCode value={props.qrCode} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MobileWallet;
