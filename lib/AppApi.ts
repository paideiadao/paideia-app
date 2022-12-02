import { AbstractApi, getUserId } from "./utilities";
import { Theme } from "@mui/material";
import { CreationApi } from "./creation/CreationApi";
import { IAlerts } from "@components/utilities/Alert";
import {
  IDaoUserData,
  IDaoUserRes,
  IEditUser,
  ITokenCheckResponse,
  ITokenCheckNew,
  IDaoMembership
} from "./Interfaces";



export class AppApi extends AbstractApi {
  theme: Theme;
  setTheme: Function;
  daoData: any;
  setDaoData: Function;
  daoUserData: IDaoUserData;
  setDaoUserData: (val: IDaoUserData) => void;
  loading: number;
  setLoading: Function;

  constructor(
    alert: IAlerts[],
    setAlert: (val: IAlerts[]) => void,
    theme: Theme,
    setTheme: Function,
    daoData: any,
    setDaoData: Function,
    daoUserData: IDaoUserData,
    setDaoUserData: (val: IDaoUserData) => void,
    loading: number,
    setLoading: (val: number) => void
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
    this.loading = loading;
    this.setLoading = setLoading;
  }

  async daoTokenCheck(addresses: string[], daoTokenIds: string[]): Promise<ITokenCheckNew> {
    return this.post<ITokenCheckNew>(
      "http://52.12.102.149:2719/api/token/exists/",
      {
        "addresses": addresses,
        "tokens": daoTokenIds
      }
    )
  }

  async paideiaTokenCheck(addresses: string[]): Promise<ITokenCheckResponse> {
    return this.post<ITokenCheckResponse>(
      `${process.env.API_URL}/assets/locked/paideia`,
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
    if (userId != null && this.daoData !== undefined && !isNaN(userId) && this.daoData.id !== undefined) {
      return this.get<IDaoUserRes>(
        `/users/details/${userId}?dao_id=${this.daoData.id}`
      );
    }
    return null;
  }

  async getOrCreateDaoUser(addresses: string[], tokenIds: string[]): Promise<IDaoMembership> {
    const tokenCheck = await this.daoTokenCheck(addresses, tokenIds)

    const sort = [...new Set([].concat(...Object.values(tokenCheck.data)))]
    .map((item) => {
      return {
        token: Object.keys(item)[0],
        value: Object.values(item)[0]
      }
    })
    const sort1 = Array.from(sort.reduce(
      (m, {token, value}) => m.set(token, (m.get(token) || 0) + value), new Map
    ), ([token, value]) => ({token, value}));

    const currentTokens = sort1.filter(item => item.token == this.daoData.tokenomics.token_id)
    
    // check if user profile for the current dao exists and get the data
    let res = await this.getDaoUser();
    // console.log(res.data)

    const response = {
      currentDaoTokens: currentTokens.length > 0 ? currentTokens[0].value : 0,
      membershipList: sort1
    }

    // console.log(response);
    
    if (res !== null) {
      if (res === undefined && this.daoUserData === undefined) {
        try {
          if (response.currentDaoTokens > 0) {
            // if they have tokens, create the user account
            let creationRes = await this.post<IDaoUserRes>(
              "/users/create_user_profile?dao_id=" + this.daoData.id
            );
            this.setDaoUserData(creationRes.data);
          }
          else {
            this.error('Please add ' + this.daoData.dao_name + ' tokens to participate')
          }
        } catch (e) {
          this.error("Error connecting to DAO");
        }
      }
      else {
        this.setDaoUserData(res.data);
      }
    }
    return response
  }
}
