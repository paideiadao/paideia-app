import axios from "axios";
import { IObj } from "@lib/Interfaces";
import { IAlerts, ValidAlert } from "@components/utilities/Alert";

type RequestType = "POST" | "PUT" | "GET" | "PATCH" | "DELETE";

const statusLookup: IObj<number> = {
  GET: 200,
  POST: 200,
  PATCH: 200,
  PUT: 200,
  DELETE: 204,
};

export const getUserId = () => {
  return parseInt(localStorage.getItem("user_id"));
};

export const snipAddress = (
  val: string,
  maxLength: number,
  showNumber: number
): string => {
  return val.length > maxLength
    ? val.slice(0, showNumber) + "....." + val.slice(-showNumber)
    : val;
};

export const getBaseUrl = () => {
  return process.env.NODE_ENV == "development"
    ? process.env.LOCAL_URL
    : process.env.API_URL;
};

export const fetcher = (url: string) =>
  axios
    .get(process.env.API_URL + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token_login")}`,
      },
    })
    .then((res) => res.data);

interface IUpdateUser {
  alias?: string;
  primary_wallet_address?: string;
}

export const attrOrUndefined = (
  data: IObj<any>,
  attr: string,
  extraAttr: string = undefined
): any => {
  try {
    if (data === undefined) {
      return undefined;
    } else if (extraAttr !== undefined) {
      let temp: IObj<any> = data[attr];
      return temp[extraAttr];
    } else {
      return data[attr];
    }
  } catch (e) {
    return undefined;
  }
};

export const getDaoPath = (id: string, path: string) => {
  return `${id === undefined ? "" : `/${id}`}${path}`;
};

export const addDays = (days: number, date: Date = new Date()): Date => {
  let temp = new Date(date);
  temp.setDate(temp.getDate() + days);
  return temp;
};

export const clientSideOnly = (func: Function): void => {
  if (typeof window !== "undefined") {
    // Client-side-only code
    func();
  }
};
export interface ISigningMessage {
  signingMessage: string;
}

export interface ILoginResponse {
  access_token: string;
  id: string;
  alias: string;
}

export const getWsUrl = (): string => {
  //process.env.NODE_ENV == "development"

  return `${process.env.NODE_ENV == "development" ? "ws" : "wss"}://${
    process.env.NODE_ENV == "development"
      ? "localhost:8000/api"
      : "wss.paideia.im"
  }`;
};

export class AbstractApi {
  alert: IAlerts[] = [];
  setAlert: (val: IAlerts[]) => void = undefined;

  webSocket(request_id: string): WebSocket {
    const ws = new WebSocket(`${process.env.WSS_URL}/auth/ws/${request_id}`);
    return ws;
  }

  async signingMessage(addresses: string[]): Promise<any> {
    const data = await this.post<{ data: ISigningMessage }>(
      "/auth/login",
      { addresses },
      "added user.",
      ""
    );

    return data;
  }

  async uploadFile(file: any): Promise<any> {
    const defaultOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token_login")}`,
        "Content-Type": file.type,
      },
    };
    const formData = new FormData();
    formData.append("fileobject", file, file.name);
    return axios.post(
      `${process.env.API_URL}/util/upload_file`,
      formData,
      defaultOptions
    );
  }

  async changeAddress(address: string): Promise<any> {
    const data = await this.post<{ data: ISigningMessage }>(
      "/users/change_primary_address",
      { address: address }
    );

    return data;
  }

  async signMessage(url: string, response: any) {
    return await this.post<{ data: ILoginResponse }>(
      url,
      response,
      "signed message",
      ""
    );
  }

  async updateUser(address: string, user: IUpdateUser) {
    return await this.put<{ data: any }>(
      `/users/${address}`,
      user,
      "updated address",
      ""
    );
  }

  async mobileLogin(address: string) {
    return await this.post<{ data: any }>(
      "/auth/login/mobile",
      { addresses: [address] },
      "added user.",
      ""
    );
  }

  async login(username: string, password: string) {
    const res: any = await this.post(
      "/auth/token",
      { username, password },
      "logged in.",
      ""
    );

    if (res !== false) {
      localStorage.setItem("jwt_token_login", res.data.access_token);
    }
  }

  error(err: any): any {
    console.log(err);
    if (this !== undefined) {
      let temp = [...this.alert];
      temp.push({
        content: err,
        severity: "error",
      });
      this.setAlert(temp);
    }
  }

  showAlert = (content: string, severity: ValidAlert): boolean => {
    if (content !== "" && content !== undefined) {
      let temp = [...this.alert];
      temp.push({
        content: content,
        severity: severity,
      });
      this.setAlert(temp);
    }
    return false;
  };

  async get<T>(url: string): Promise<T> {
    let self = this;
    // @ts-ignore
    return await this.request(url, "GET").then((data: T) => {
      return data;
    }, self.error);
  }

  async post<T>(
    url: string,
    body: any = undefined,
    action: string = undefined,
    current: string = ""
  ): Promise<T> {
    let self = this;
    return await this.request(url, "POST", body).then(
      // @ts-ignore
      (data: T) => {
        return data;
      },
      self.error
    );
  }

  async patch<T>(
    url: string,
    action: string,
    current: string = ""
  ): Promise<T> {
    let self = this;
    return await this.request(url, "PATCH").then(
      // @ts-ignore
      (data: T) => data,
      self.error
    );
  }

  async put<T>(
    url: string,
    body: any,
    action: string = "",
    current: string = ""
  ): Promise<T> {
    let self = this;
    return await this.request(url, "PUT", body).then(
      // @ts-ignore
      (data: T) => data,
      self.error
    );
  }

  async delete<T>(
    url: string,
    body: any,
    action: string,
    current: string = ""
  ): Promise<T> {
    let self = this;
    return await this.request(url, "DELETE", body).then(
      // @ts-ignore
      (data: T) => data,
      self.error
    );
  }

  async request(url: string, method: RequestType, body?: any) {
    return await new Promise(async (resolve, reject) => {
      try {
        if (body !== undefined) {
          return await this._request(url, method, body).then(async (res) => {
            if (res.status !== statusLookup[method]) {
              resolve("error");
            } else {
              resolve(res);
            }
          });
        } else {
          return await this._request(url, method, body).then(async (res) => {
            if (res.status !== statusLookup[method]) {
              resolve(undefined);
            } else {
              resolve(res);
            }
          });
        }
      } catch (err) {
        console.log("err", err);
        return reject(err);
      }
    });
  }

  async _request(
    url: string,
    method: RequestType,
    body?: IObj<any>
  ): Promise<Response> {
    const methods: IObj<Function> = {
      POST: axios.post,
      GET: axios.get,
      PATCH: axios.patch,
      DELETE: axios.delete,
      PUT: axios.put,
    };
    const defaultOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token_login")}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    };
    // url = url.includes("http")
    //   ? url
    //   : url.includes("8000")
    //   ? getBaseUrl() + url.split("8000")[1]
    //   : getBaseUrl() + url;
    url = process.env.API_URL + url
    return await methods[method](url, body, defaultOptions);
  }
}
