import { IObj } from "@lib/Interfaces";

export const getTokenAmount = async (tokenId: string): Promise<number> => {
  let dappConnected = localStorage.getItem("dapp_connected");
  let userId = localStorage.getItem("user_id");

  dappConnected = JSON.parse(dappConnected);
  if (dappConnected) {
    // @ts-ignore
    await ergoConnector.nautilus.connect();
    // @ts-ignore
    const balance = await ergo.get_balance(tokenId);
    return balance;
  } else if (userId !== undefined) {
    userId = JSON.parse(userId);
    // mobile wallet here...
  } else {
    // all should be unconnected...
    return undefined;
  }
};

export const tokenLookup: IObj<string> = {};
