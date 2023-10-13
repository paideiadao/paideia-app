import React from "react";
import { createContext, useContext, useState } from "react";
import { IDaoMembership } from "@lib/Interfaces";

// The Context
const WalletContext = createContext(undefined);

// Template Provider
const WalletProvider = ({ children }: any) => {
  const [wallet, setWallet] = useState(""); // primary address
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [dAppWallet, setDAppWallet] = useState({
    connected: false,
    addresses: [],
  }); // dApp only
  const [utxos, setUtxos] = React.useState<IDaoMembership>({
    currentDaoTokens: 0,
    membershipList: [],
  });

  // Context values passed to consumer
  const value = {
    wallet, // <------ Expose Value to Consumer
    dAppWallet,
    setWallet, // <------ Expose Setter to Consumer
    setDAppWallet,
    loggedIn,
    setLoggedIn,
    utxos,
    setUtxos,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

// Template Consumer
const WalletConsumer = ({ children }: any) => {
  return (
    <WalletContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("WalletConsumer must be used within WalletProvider");
        }
        return children(context);
      }}
    </WalletContext.Consumer>
  );
};

// useTemplate Hook
const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined)
    throw new Error("useWallet must be used within WalletProvider");
  return context;
};

export { WalletProvider, WalletConsumer, useWallet };
