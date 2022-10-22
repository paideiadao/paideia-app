import { IAlerts } from "@components/utilities/Alert";
import { AppApi } from "@lib/AppApi";
import {
  IBasicInformation,
  IGovernance,
  IDesign,
} from "@lib/creation/Interfaces";
import { AbstractApi } from "@lib/utilities";
import { IDiscussion } from "@pages/[dao]/discussion/create";
import { IConfigContext } from "./ConfigContext";

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
  }
}
