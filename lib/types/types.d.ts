interface Signature {
  signedMessage: string;
  proof: string;
}

type NonceResponse = {
  nonce: string;
  userId: string;
};

type Credentials = {
  nonce: string;
  userId: string;
  signature: string;
  wallet: string;
};

type ParsedWallet = {
  type: "mobile" | "nautilus";
  defaultAddress: string;
  usedAddresses: string[];
  unusedAddresses: string[];
};

type DeleteEmptyUserResponse = {
  success?: boolean;
  error?: string;
};
