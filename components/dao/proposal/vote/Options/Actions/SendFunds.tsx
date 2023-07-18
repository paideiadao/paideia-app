import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import MultiTokenHolders from "@components/utilities/MultiTokenHolders";
import { ITokenHolder } from "@lib/creation/Interfaces";
import * as React from "react";
import { ISendFunds } from "../../YesNo/Actions/SendFunds";

interface IwSendFunds extends ISendFunds {
  set: (val: ISendFunds) => void;
}

const SendFunds: React.FC<IwSendFunds> = (props) => {
  let treasuryAmount = 100000;
  const set = (val: any) => {
    props.set({
      recurring: props.recurring,
      tokenHolders: props.tokenHolders,
      ...val,
    });
  };
  return (
    <>
      <MultiTokenHolders
        tokenHolders={props.tokenHolders}
        treasuryAmount={treasuryAmount}
        set={(newTokenHolders: ITokenHolder[]) =>
          set({ tokenHolders: newTokenHolders })
        }
      />
      <LabeledSwitch
        title="Set as Recurring"
        subtitle="Set and schedule this payment to be done for a determined amount of time, in any frequency you wish."
        value={props.recurring}
        onChange={() => set({ recurring: !props.recurring })}
      />
    </>
  );
};

export default SendFunds;
