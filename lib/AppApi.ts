import { AbstractApi, getUserId } from "./utilities";
import { Theme } from "@mui/material";
import { IAlerts } from "@components/utilities/Alert";
import {
  IDaoUserData,
  IDaoUserRes,
  IEditUser,
  ITokenCheckResponse,
  ITokenCheckNew,
  IDaoMembership,
} from "./Interfaces";
import { Dispatch, SetStateAction } from "react";

export class AppApi extends AbstractApi {
  themeState: [Theme, React.Dispatch<React.SetStateAction<Theme>>];
  loadingState: [number, React.Dispatch<React.SetStateAction<number>>];
  daoState: [any, Dispatch<any>];
  daoUserState: [IDaoUserData, Dispatch<SetStateAction<IDaoUserData>>];
  alertState: [IAlerts[], Dispatch<SetStateAction<IAlerts[]>>];

  constructor({
    themeState,
    loadingState,
    daoState,
    daoUserState,
    alertState,
  }: Pick<
    AppApi,
    "themeState" | "loadingState" | "daoState" | "daoUserState" | "alertState"
  >) {
    super();
    this.alertState = alertState;
    this.themeState = themeState;
    this.daoUserState = daoUserState;
    this.loadingState = loadingState;
    this.daoState = daoState;
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
        console.log(e);
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
    const [daoUserData] = this.daoUserState;

    return this.put(
      `/users/details/${daoUserData.id}?dao_id=${daoUserData.dao_id}`,
      data
    );
  }

  async getDaoUser(): Promise<IDaoUserRes> {
    const userId = getUserId();
    const [daoData] = this.daoState;

    if (userId && daoData && daoData.id !== undefined) {
      return this.get<IDaoUserRes>(
        `/users/details/${userId}?dao_id=${daoData.id}`
      );
    }
    return null;
  }

  async getOrCreateDaoUser(
    addresses: string[],
    tokenIds: string[]
  ): Promise<IDaoMembership> {
    const [daoData] = this.daoState;
    const [daoUserData, setDaoUserData] = this.daoUserState;

    const tokenCheck = await this.daoTokenCheck(addresses, tokenIds);

    const sort = [...new Set([].concat(...Object.values(tokenCheck.data)))].map(
      (item) => {
        return {
          token: Object.keys(item)[0],
          value: Object.values(item)[0],
        };
      }
    );
    const sort1 = Array.from(
      sort.reduce(
        (m, { token, value }) => m.set(token, (m.get(token) || 0) + value),
        new Map()
      ),
      ([token, value]) => ({ token, value })
    );

    let currentTokens: {
      token: string;
      value: number;
    }[] = [];
    if (daoData?.tokenomics?.token_id != undefined) {
      currentTokens = sort1.filter(
        (item) => item.token == daoData.tokenomics.token_id
      );
    }

    // check if user profile for the current dao exists and get the data
    const res = await this.getDaoUser();

    const response = {
      currentDaoTokens: currentTokens.length > 0 ? currentTokens[0].value : 0,
      membershipList: sort1,
    };

    if (res !== null) {
      if (
        res === undefined &&
        (daoUserData === undefined || isEmptyUserData(daoUserData))
      ) {
        try {
          if (response.currentDaoTokens > 0) {
            // if they have tokens, create the user account
            const creationRes = await this.post<IDaoUserRes>(
              "/users/create_user_profile?dao_id=" + daoData.id
            );
            setDaoUserData({ ...creationRes.data, loading: false });
          } else {
            this.error(
              "Please add " + daoData.dao_name + " tokens to participate"
            );
            setDaoUserData({ ...daoUserData, loading: false });
          }
        } catch (e) {
          console.log(e);
          this.error("Error connecting to DAO");
          setDaoUserData({ ...daoUserData, loading: false });
        }
      } else if (res?.data) {
        setDaoUserData({ ...res.data, loading: false });
      } else {
        setDaoUserData(undefined);
        this.error("Please add " + daoData.dao_name + " tokens to participate");
      }
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
