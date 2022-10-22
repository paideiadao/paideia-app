import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import MultiWalletSelector from "@components/utilities/MultiWalletSelector";
import { IWallet } from "@lib/creation/Interfaces";
import * as React from "react";
import { IOptimisticGovernance } from "../../YesNo/Actions/OptimisticGovernance";

interface IwOptimisticGovernance extends IOptimisticGovernance {
  set: (val: IOptimisticGovernance) => void;
}

const OptimisticGovernance: React.FC<IwOptimisticGovernance> = (props) => {
  const set = (val: any) => {
    props.set({
      wallets: props.wallets,
      activated: props.activated,

      ...val,
    });
  };
  return (
    <>
      <LabeledSwitch
        title="Optimistic governance"
        subtitle="All proposals are passed by default, unless challenged."
        value={props.activated}
        onChange={() => set({ activated: !props.activated })}
      />
      {props.activated && (
        <MultiWalletSelector
          wallets={props.wallets}
          set={(wallets: IWallet[]) =>
            set({
              wallets: wallets,
            })
          }
        />
      )}
    </>
  );
};

export default OptimisticGovernance;
