import * as React from "react";
import ProposalApi from "./ProposalApi";

export interface IProposalContext {
  api: ProposalApi;
}

const ProposalContext = React.createContext({
  api: undefined,
});

export default ProposalContext;
