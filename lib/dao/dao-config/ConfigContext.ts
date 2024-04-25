import * as React from "react";
import ConfigApi from "./ConfigApi";

export interface IConfigContext {
  api?: ConfigApi;
}

export const ConfigContext = React.createContext<IConfigContext>({
  api: undefined,
});
