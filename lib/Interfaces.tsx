export interface IData<T> {
  data: T;
  setData: Function;
}

export interface IObj<TValue> {
  [id: string]: TValue;
}

export interface IDaoUserData {
  dao_id: number;
  followers: number[];
  following: number[];
  id: any;
  level: number;
  name: string;
  social_links: any;
  user_id: number;
  xp: number;
  bio: string;
  profile_img_url: string;
  address: string;
  created: number;
  loading?: boolean;
}

export interface IDaoUserRes {
  data: IDaoUserData;
}

export interface IEditUser {
  name: string;
  profile_img_url: string;
  bio: string;
  level?: number;
  xp?: number;
  social_links: any;
}

interface ITokenAmount {
  [token: string]: number;
}

export interface ITokenCheckResponse {
  data: {
    totalTokens: number;
    totalFree: number;
    totalStaked: number;
    totalVested: number;
    free: ITokenAmount;
    staked: ITokenAmount;
    vested: ITokenAmount;
  };
}

export interface ITokenCheckNew {
  data: {
    [key: string]: {
      [key: string]: number;
    }[];
  };
}

export interface IDaoMembership {
  currentDaoTokens: number;
  membershipList: {
    token: string;
    value: number;
  }[];
}
