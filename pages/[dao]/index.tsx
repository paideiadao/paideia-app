import React, { useEffect, useContext } from "react";
import Dashboard from "@components/dao/dashboard/Dashboard";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { isAddressValid } from "@components/wallet/AddWallet";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import { useWallet } from "@components/wallet/WalletContext";

export default function Dao() {
  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const { wallet, setUtxos, dAppWallet } = useWallet();
  const {  daoTokensObject } = useDaoSlugs();

  useEffect(() => {
    const load = async (tokensIds: string[]) => {
      try {
        if (dAppWallet.connected) {
          if (dAppWallet.addresses.length > 0) {
            const addresses = dAppWallet.addresses.map(
              (address: { id: number; name: string }) => address.name
            );
            const membership = await globalContext.api.getOrCreateDaoUser(
              addresses,
              tokensIds
            );
            setUtxos(membership);
          }
        } else if (isAddressValid(wallet)) {
          const membership = await globalContext.api.getOrCreateDaoUser(
            [wallet],
            tokensIds
          );
          setUtxos(membership);
        }
      } catch (e) {
        console.log(e);
        setUtxos({
          currentDaoTokens: 0,
          membershipList: [],
        });
      }
    };
    if (daoTokensObject.length > 0 && globalContext.api.daoData) {
      const tokenIds = Object.values(daoTokensObject).map(
        (item) => item.tokenId
      );
      load(tokenIds);
    } else {
      setUtxos({
        currentDaoTokens: 0,
        membershipList: [],
      });
    }
  }, [wallet, dAppWallet, globalContext.api.daoData]);
  return <Dashboard />;
}
