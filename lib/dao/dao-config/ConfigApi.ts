import { AppApi } from "@lib/AppApi";
import {
  IBasicInformation,
  IGovernance,
  IDesign,
} from "@lib/creation/Interfaces";
import { AbstractApi } from "@lib/utilities";

export interface IConfigData {
  basicInformation: IBasicInformation;
  governance: IGovernance;
  design: IDesign;
}

export default class ConfigApi extends AbstractApi {
  api: AppApi;
  data: IConfigData;
  setData: Function;

  constructor(api: AppApi, data: IConfigData, setData: Function) {
    super();
    this.api = api;
    this.data = data;
    this.setData = setData;
    this.setAlert = api.setAlert;
  }
}
