import { createContext, useContext, useState } from "react";

// The Context
const AddWalletContext = createContext(undefined);

// Template Provider
const AddWalletProvider = ({ children }: any) => {
  const [addWalletOpen, setAddWalletOpen] = useState(false);

  // Context values passed to consumer
  const value = {
    addWalletOpen, // <------ Expose Value to Consumer
    setAddWalletOpen, // <------ Expose Setter to Consumer
  };

  return (
    <AddWalletContext.Provider value={value}>
      {children}
    </AddWalletContext.Provider>
  );
};

// Template Consumer
const AddWalletConsumer = ({ children }: any) => {
  return (
    <AddWalletContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "AddWalletConsumer must be used within AddWalletProvider"
          );
        }
        return children(context);
      }}
    </AddWalletContext.Consumer>
  );
};

// useTemplate Hook
const useAddWallet = () => {
  const context = useContext(AddWalletContext);
  if (context === undefined)
    throw new Error("useAddWallet must be used within AddWalletProvider");
  return context;
};

export { AddWalletProvider, AddWalletConsumer, useAddWallet };
