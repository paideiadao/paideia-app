import { Theme } from "@mui/material";
import * as React from "react";
import { AppApi } from "./AppApi";

export interface IGlobalContext {
  api: AppApi;
}

export const GlobalContext = React.createContext({
  api: undefined,
});
