import { IUserStakeData } from "@components/dao/staking/YourStaking";
import { IAlerts } from "@components/utilities/Alert";
import { Theme } from "@mui/material";
import {
  IDaoMembership,
  IDaoUserData,
  IDaoUserRes,
  IEditUser,
  ITokenCheckNew,
  ITokenCheckResponse,
} from "./Interfaces";
import { AbstractApi, getUserId } from "./utilities";

export class AppApi extends AbstractApi {
  theme: Theme;
  setTheme: Function;
  daoData: any; // todo: fix this
  setDaoData: Function;
  daoUserData: IDaoUserData;
  setDaoUserData: Function;
  userStakeData: IUserStakeData;
  setUserStakeData: Function;
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
    userStakeData: IUserStakeData,
    setUserStakeData: (val: IUserStakeData) => void,
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
    this.userStakeData = userStakeData;
    this.setUserStakeData = setUserStakeData;
    this.loading = loading;
    this.setLoading = setLoading;
  }

  async daoTokenCheck(
    addresses: string[],
    daoTokenIds: string[]
  ): Promise<ITokenCheckNew> {
    if (daoTokenIds.length > 0 && addresses.length > 0) {
      return this.post<ITokenCheckNew>(
        `${process.env.API_URL}/assets/token-exists`,
        {
          addresses: addresses,
          tokens: daoTokenIds,
        }
      );
    } else return { data: {} };
  }

  async daoTokenCheckSingleToken(
    addresses: string[],
    daoTokenId: string
  ): Promise<number> {
    if (addresses.length > 0) {
      try {
        const res = await this.post<ITokenCheckNew>(
          `${process.env.API_URL}/assets/token-exists`,
          {
            addresses: addresses,
            tokens: [daoTokenId],
          }
        );
        const sort = Object.values(res.data)[0][0][daoTokenId];
        return sort;
      } catch (e) {
        return 0;
      }
    } else return 0;
  }

  async paideiaTokenCheck(addresses: string[]): Promise<ITokenCheckResponse> {
    return this.post<ITokenCheckResponse>(
      `${process.env.API_URL}/assets/locked/paideia`,
      {
        addresses,
      }
    );
  }

  async markNotificationsAsRead(lastNotificationId: number): Promise<any> {
    return this.put(
      `/notificatons/mark_as_read/${lastNotificationId}`,
      lastNotificationId
    );
  }

  async editUser(data: IEditUser): Promise<any> {
    return this.put(
      `/users/details/${this.daoUserData.id}?dao_id=${this.daoUserData.dao_id}`,
      data
    );
  }

  async getDaoUser(): Promise<IDaoUserRes | null> {
    const userId = getUserId();
    // if (!userId) {
    //   const tell = this.get(`/users/me`)
    //   console.log(tell)
    // }
    if (userId && this.daoData && this.daoData.id !== undefined) {
      const result = this.get<IDaoUserRes>(
        `/users/details/${userId}?dao_id=${this.daoData.id}`
      );
      return result;
    }
    return null;
  }

  async getOrCreateDaoUser(
    addresses: string[],
    tokenIds: string[]
  ): Promise<IDaoMembership> {
    const tokenCheck = await this.daoTokenCheck(addresses, tokenIds);
    const sortIndex = [...Object.values(tokenCheck.data)];

    const sort: {
      [key: string]: number;
    }[] = [];
    sortIndex.forEach((index) => {
      index.forEach((t) => sort.push(t));
    });

    const sort1 = sort.reduce((m, p) => {
      const token = Object.keys(p)[0];
      const value = p[token];
      m.set(token, (m.get(token) ?? 0) + value);
      return m;
    }, new Map<string, number>());

    const currentTokens: {
      token: string | null;
      value: number;
    } = {
      token: null,
      value: 0,
    };
    if (this.daoData?.tokenomics?.token_id) {
      const tokenId: string = this.daoData.tokenomics.token_id;
      currentTokens.token = tokenId;
      currentTokens.value = sort1.get(tokenId) ?? 0;
    }

    // check if user profile for the current dao exists and get the data
    const res = await this.getDaoUser();

    const membershipList: {
      token: string;
      value: number;
    }[] = [];
    sort1.forEach((value, key) => {
      membershipList.push({
        token: key,
        value: value,
      });
    });
    const response = {
      currentDaoTokens: currentTokens.token ? currentTokens.value : 0,
      membershipList: membershipList,
    };
    if (res !== null) {
      if (
        res === undefined &&
        (this.daoUserData === undefined || isEmptyUserData(this.daoUserData))
      ) {
        try {
          // if (response.currentDaoTokens > 0) {
          // if they have tokens, create the user account
          const creationRes = await this.post<IDaoUserRes>(
            "/users/create_user_profile?dao_id=" + this.daoData.id
          );
          this.setDaoUserData({ ...creationRes.data, loading: false });
          // } else {
          //   this.error(
          //     "Please add " + this.daoData.dao_name + " tokens to participate"
          //   );
          //   this.setDaoUserData({ ...this.daoUserData, loading: false });
          // }
        } catch (e) {
          console.log(e);
          this.error("Error connecting to DAO");
          this.setDaoUserData({ ...this.daoUserData, loading: false });
        }
      } else if (res?.data) {
        this.setDaoUserData({ ...res.data, loading: false });
      } else {
        this.setDaoUserData({ ...this.daoUserData, loading: false });
        this.error(
          "Please add " + this.daoData.dao_name + " tokens to participate"
        );
      }
    } else {
      this.setDaoUserData({ ...this.daoUserData, loading: false });
      this.error("Unable to retrieve user account. Retrying...");
    }
    return response;
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
