import { Button } from "@mui/material";
import * as React from "react";
import AddWallet from "./AddWallet";
import { useAddWallet } from "./AddWalletContext";
import { useWallet } from "./WalletContext";

const ConnectWallet: React.FC<{ show: boolean }> = (props) => {
  const { wallet } = useWallet();
  const { setAddWalletOpen } = useAddWallet();
  const handleClickOpen = () => {
    setAddWalletOpen(true);
  };

  return (
    <>
      <AddWallet />
      <Button
        variant="contained"
        onClick={handleClickOpen}
        size="small"
        sx={{ display: props.show ? "flex" : "none" }}
      >
        {wallet
          ? wallet.slice(0, 5) + "..." + wallet.slice(-5)
          : "Connect Wallet"}
      </Button>
    </>
  );
};

export default ConnectWallet;
