import * as React from "react";
import DiscussionApi from "./DiscussionApi";

export interface IDiscussionContext {
  api: DiscussionApi;
}

const DiscussionContext = React.createContext({
  api: undefined,
});

export default DiscussionContext;
