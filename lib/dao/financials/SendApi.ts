import { AppApi } from "@lib/AppApi";
import { ITokenHolder } from "@lib/creation/Interfaces";
import { AbstractApi } from "@lib/utilities";
// import { IProposal } from "@pages/dao/[id]/proposal/create";

export interface IAsset {
  amount: number;
  usd: number;
  balance: number;
  ticker: string;
  logo: string;
}

export interface IReceiver {
  address: string;
  assets: IAsset;
}

export interface ISendFunds {
  receivers: ITokenHolder[];
  recurring: boolean;
  firstPayment: Date;
  frequency: "Hourly" | "Weekly" | "Daily" | "Monthly" | "Yearly";
  emissionLengthValue: number;
  emissionLength: "Hours" | "Weeks" | "Days" | "Months" | "Years";
}

export default class SendApi extends AbstractApi {
  api?: AppApi;
  value: ISendFunds;
  setValue: (value: ISendFunds) => void;

  constructor(
    api: AppApi | undefined,
    value: ISendFunds,
    setValue: (value: ISendFunds) => void
  ) {
    super();
    this.api = api;
    this.value = value;
    this.setValue = setValue;
    this.setAlert = api?.setAlert ?? (() => {});
  }
}
