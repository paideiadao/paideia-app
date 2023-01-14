import * as React from "react";
import { AppApi } from "@lib/AppApi";
import { MetaDataHandler } from "@lib/MetaDataHandler";

export interface IGlobalContext {
  api: AppApi;
  metadata: MetaDataHandler;
}

export const GlobalContext = React.createContext({
  api: undefined,
  metadata: undefined,
});
