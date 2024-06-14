import { Button } from "@mui/material";
import * as React from "react";
import AddWallet from "./AddWallet";
import { useAddWallet } from "./AddWalletContext";
import { useWallet } from "./WalletContext";
import { deviceWrapper } from "@components/utilities/Style";

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
        sx={{ display: props.show ? deviceWrapper("none", "flex") : "none" }}
      >
        {wallet
          ? wallet.slice(0, 5) + "..." + wallet.slice(-5)
          : "Connect Wallet"}
      </Button>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        size="small"
        sx={{ display: props.show ? deviceWrapper("flex", "none") : "none" }}
      >
        {wallet ? wallet.slice(0, 5) + "..." + wallet.slice(-5) : "Connect"}
      </Button>
    </>
  );
};

export default ConnectWallet;
