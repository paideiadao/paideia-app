import { IAlerts, ValidAlert } from "@components/utilities/Alert";
import { IObj } from "@lib/Interfaces";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

type RequestType = "POST" | "PUT" | "GET" | "PATCH" | "DELETE";

const statusLookup: IObj<number> = {
  GET: 200,
  POST: 200,
  PATCH: 200,
  PUT: 200,
  DELETE: 204,
};

export const getObj = (lst: any[], id_field: string, id: any): any => {
  try {
    let index = lst.map((item: any) => item[id_field]).indexOf(id);
    return index > -1 ? lst[index] : undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const getUserId = () => {
  return localStorage.getItem("user_id");
};

export const snipAddress = (
  val: string,
  maxLength: number,
  showNumber: number
): string => {
  return val?.length > maxLength
    ? val.slice(0, showNumber) + "..." + val.slice(-showNumber)
    : val;
};

export const getBaseUrl = () => {
  return process.env.API_URL;
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

export const generateSlug = (id: string | number, name: string) => {
  const slug =
    name
      .toLowerCase()
      .trim()
      .replaceAll(/[^a-zA-Z0-9 ]/g, "")
      .replaceAll(" ", "-") +
    "-" +
    id.toString();
  if (slug.startsWith("-")) return id;
  return slug;
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
  // process.env.NODE_ENV == "development"
  return process.env.WSS_URL;
};

export class AbstractApi {
  alert: IAlerts[] = [];
  setAlert: (val: IAlerts[]) => void = () => {};

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

  error(err: any): any {
    console.log("func:api_error:", err);
    const bMessage =
      typeof err?.message === "string"
        ? err.message
        : "Oops :( Some unknown error may have occurred";
    const message =
      typeof err === "string"
        ? err
        : err?.response
        ? err.response.status === 401
          ? err.response.data.detail ?? err.response.data
          : err.response.data
        : bMessage;
    if (this !== undefined) {
      this.showAlert(
        typeof message === "string" ? message : JSON.stringify(message),
        "error"
      );
    }
  }

  showAlert = (content: string, severity: ValidAlert): boolean => {
    if (
      content !== "" &&
      content !== undefined &&
      content !== "Cannot read properties of undefined (reading 'data')"
    ) {
      const temp = [...this.alert];
      temp.push({
        content: content,
        severity: severity,
        id: uuidv4(),
      });
      this.setAlert && this.setAlert(temp);
    }
    return false;
  };

  async get<T>(url: string): Promise<T> {
    return await this.request(url, "GET").then(
      // @ts-ignore
      (data: T) => {
        return data;
      },
      (e) => this.error(e)
    );
  }

  async post<T>(
    url: string,
    body: any = undefined,
    action: string = undefined,
    current: string = ""
  ): Promise<T> {
    return await this.request(url, "POST", body).then(
      // @ts-ignore
      (data: T) => {
        return data;
      },
      (e) => this.error(e)
    );
  }

  async patch<T>(
    url: string,
    action: string,
    current: string = ""
  ): Promise<T> {
    return await this.request(url, "PATCH").then(
      // @ts-ignore
      (data: T) => data,
      (e) => this.error(e)
    );
  }

  async put<T>(
    url: string,
    body: any,
    action: string = "",
    current: string = ""
  ): Promise<T> {
    return await this.request(url, "PUT", body).then(
      // @ts-ignore
      (data: T) => data,
      (e) => this.error(e)
    );
  }

  async delete<T>(
    url: string,
    body: any,
    action: string,
    current: string = ""
  ): Promise<T> {
    return await this.request(url, "DELETE", body).then(
      // @ts-ignore
      (data: T) => data,
      (e) => this.error(e)
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
        console.log(err);
        throw reject(err);
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
    url = url.includes("http") ? url : process.env.API_URL + url;
    if (["GET", "DELETE"].includes(method)) {
      // GET and DELETE don't have body
      return await methods[method](url, defaultOptions);
    } else {
      return await methods[method](url, body, defaultOptions);
    }
  }
}
