import React from "react";
import { createContext, useContext, useState } from "react";
import { IDaoMembership } from "@lib/Interfaces";

export interface IDAppWallet {
  connected: boolean;
  addresses: string[];
}

export interface IMobileWallet {
  connected: boolean;
}

export interface IWalletContext {
  wallet: string;
  dAppWallet: IDAppWallet;
  mobileWallet: IMobileWallet;
  setWallet: Function;
  setDAppWallet: Function;
  setMobileWallet: Function;
  loggedIn: boolean;
  setLoggedIn: Function;
  utxos: IDaoMembership;
  setUtxos: Function;
}

// The Context
const WalletContext = createContext<IWalletContext>({
  wallet: "",
  dAppWallet: {
    connected: false,
    addresses: [],
  },
  mobileWallet: {
    connected: false
  },
  setWallet: () => {},
  setDAppWallet: () => {},
  setMobileWallet: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  utxos: {
    currentDaoTokens: 0,
    membershipList: [],
  },
  setUtxos: () => {},
});

// Template Provider
const WalletProvider = ({ children }: any) => {
  const [wallet, setWallet] = useState(""); // primary address
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [dAppWallet, setDAppWallet] = useState({
    connected: false,
    addresses: [],
  }); // dApp only
  const [mobileWallet, setMobileWallet] = useState({
    connected: false
  })
  const [utxos, setUtxos] = React.useState<IDaoMembership>({
    currentDaoTokens: 0,
    membershipList: [],
  });

  // Context values passed to consumer
  const value = {
    wallet, // <------ Expose Value to Consumer
    dAppWallet,
    mobileWallet,
    setWallet, // <------ Expose Setter to Consumer
    setDAppWallet,
    setMobileWallet,
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
