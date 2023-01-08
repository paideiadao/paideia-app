import { AbstractApi, getUserId } from "./utilities";
import { Theme } from "@mui/material";
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
    if (daoTokenIds.length > 0 && addresses.length > 0) {
      return this.post<ITokenCheckNew>(
        `${process.env.API_URL}/assets/token-exists`,
        {
          "addresses": addresses,
          "tokens": daoTokenIds
        }
      )
    }
    else return { data: {} }
  }

  async daoTokenCheckSingleToken(addresses: string[], daoTokenId: string): Promise<number> {
    if (addresses.length > 0) {
      const res = await this.post<ITokenCheckNew>(
        `${process.env.API_URL}/assets/token-exists`,
        {
          "addresses": addresses,
          "tokens": [daoTokenId]
        }
      )
      const sort = Object.values(res.data)[0][0][daoTokenId]
      return sort
    }
    else return 0
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
      (m, { token, value }) => m.set(token, (m.get(token) || 0) + value), new Map
    ), ([token, value]) => ({ token, value }));

    let currentTokens: {
      token: string;
      value: number;
    }[] = []
    if (this.daoData?.tokenomics?.token_id != undefined) {
      currentTokens = sort1.filter(item => item.token == this.daoData.tokenomics.token_id)
    }

    // check if user profile for the current dao exists and get the data
    let res = await this.getDaoUser();

    const response = {
      currentDaoTokens: currentTokens.length > 0 ? currentTokens[0].value : 0,
      membershipList: sort1
    }

    if (res !== null) {
      if (res === undefined && (this.daoUserData === undefined || isEmptyUserData(this.daoUserData))) {
        try {
          if (response.currentDaoTokens > 0) {
            // if they have tokens, create the user account
            let creationRes = await this.post<IDaoUserRes>(
              "/users/create_user_profile?dao_id=" + this.daoData.id
            );
            this.setDaoUserData({...creationRes.data, loading: false});
          }
          else {
            this.error('Please add ' + this.daoData.dao_name + ' tokens to participate')
            this.setDaoUserData({...this.daoUserData, loading: false})
          }
        } catch (e) {
          this.error("Error connecting to DAO");
          this.setDaoUserData({...this.daoUserData, loading: false})
        }
      }
      else if (res?.data) {
        this.setDaoUserData({...res.data, loading: false});
      }
      else {
        this.setDaoUserData(undefined)
        this.error('Please add ' + this.daoData.dao_name + ' tokens to participate')
      }
    }
    return response
  }
}

const isEmptyUserData = (daoUserData: IDaoUserData) => {
  return (
    daoUserData.address === "" &&
    daoUserData.bio === "" &&
    daoUserData.created === 0 &&
    daoUserData.dao_id === 0 &&
    daoUserData.followers.length === 0 &&
    daoUserData.following.length === 0 &&
    daoUserData.id === 0 &&
    daoUserData.level === 0 &&
    daoUserData.name === "" &&
    daoUserData.profile_img_url === "" &&
    daoUserData.social_links.length === 0 &&
    daoUserData.user_id === 0 &&
    daoUserData.xp === 0
  );
};
