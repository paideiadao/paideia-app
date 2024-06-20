import { AppApi } from "@lib/AppApi";
import {
  IBasicInformation,
  IGovernance,
  IDesign,
  ITokenomics,
} from "@lib/creation/Interfaces";
import { AbstractApi } from "@lib/utilities";

export interface IConfigData {
  basicInformation: IBasicInformation;
  tokenomics: ITokenomics;
  governance: IGovernance;
  design: IDesign;
  loaded?: boolean;
}

export default class ConfigApi extends AbstractApi {
  api?: AppApi;
  data: IConfigData;
  setData: Function;

  constructor(api: AppApi | undefined, data: IConfigData, setData: Function) {
    super();
    this.api = api;
    this.data = data;
    this.setData = setData;
    this.setAlert = api?.setAlert ?? (() => {});
  }
}
