import * as React from "react";
import SendApi from "./SendApi";

export interface ISendContext {
  api?: SendApi;
}

const SendContext = React.createContext<ISendContext>({
  api: undefined,
});

export default SendContext;
