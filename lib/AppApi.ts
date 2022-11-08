import { AbstractApi, getUserId } from "./utilities";
import { Theme } from "@mui/material";
import { CreationApi } from "./creation/CreationApi";
import { IAlerts } from "@components/utilities/Alert";
import {
  IDaoUserData,
  IDaoUserRes,
  IEditUser,
  ITokenCheckResponse,
} from "./Interfaces";


export class AppApi extends AbstractApi {
  theme: Theme;
  setTheme: Function;
  daoData: any;
  setDaoData: Function;
  daoUserData: IDaoUserData;
  setDaoUserData: (val: IDaoUserData) => void;

  constructor(
    alert: IAlerts[],
    setAlert: (val: IAlerts[]) => void,
    theme: Theme,
    setTheme: Function,
    daoData: any,
    setDaoData: Function,
    daoUserData: IDaoUserData,
    setDaoUserData: (val: IDaoUserData) => void
  ) {
    super();
    this.alert = alert;
    this.setAlert = setAlert;
    this.theme = theme;
    this.setTheme = setTheme;
    this.daoData = daoData;
    this.setDaoData = setDaoData;
    this.daoUserData = daoUserData;
    this.setDaoUserData = setDaoUserData;
  }

  async paideiaTokenCheck(addresses: string[]): Promise<ITokenCheckResponse> {
    return this.post<ITokenCheckResponse>(
      "https://api.paideia.im/assets/locked/paideia",
      {
        addresses,
      }
    );
  }

  async editUser(data: IEditUser): Promise<any> {
    return this.put(
      `/users/details/${this.daoUserData.id}?dao_id=${this.daoUserData.dao_id}`,
      data
    );
  }

  async getDaoUser(): Promise<IDaoUserRes> {
    let userId = getUserId();
    if (userId != null && this.daoData !== undefined && !isNaN(userId)) {
      return this.get<IDaoUserRes>(
        `/users/details/${userId}?dao_id=${this.daoData.id}`
      );
    }
    return null;
  }

  async getOrCreateDaoUser(): Promise<void> {
    let userId = getUserId();

    let res = await this.getDaoUser();
    if (res !== null) {
      if (res === undefined && this.daoUserData === undefined) {
        try {
          // check for tokens here.....
          let creationRes = await this.post<IDaoUserRes>(
            "/users/create_user_profile?dao_id=" + this.daoData.id
          );
          this.setDaoUserData(creationRes.data);
          return;
        } catch (e) {
          this.error("Error connecting to DAO");
          return;
        }
      }
      this.setDaoUserData(res.data);
      return;
    } else if (this.daoData != null && userId != null && !isNaN(userId)) {
      this.error("Please add Paideia tokens to participate");
    }
  }
}
