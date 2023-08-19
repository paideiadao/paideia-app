import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import MarkdownRender from "@lib/MarkdownRender";
import { Skeleton } from "@mui/material";
import * as React from "react";

interface ProposalInfoProps {
  content: string;
  actions: any[];
}

const NERGS = 1000 * 1000 * 1000;

const ProposalInfo: React.FC<ProposalInfoProps> = ({ content, actions }) => {
  return (
    <>
      <CapsInfo title="Proposal Content" />
      {content === undefined ? (
        <Skeleton animation="wave" width="100%" />
      ) : (
        <MarkdownRender description={content} />
      )}
      <CapsInfo title="Proposal Actions" />
      {content === undefined ? (
        <Skeleton animation="wave" width="100%" />
      ) : (
        <MarkdownRender description={renderActions(actions)} />
      )}
    </>
  );
};

const renderActions = (actions: any[]) => {
  return `As part of this proposal the following actions will be executed.
  ${actions.map((action) => generateActionDescription(action))}
  `;
};

const generateActionDescription = (action: any) => {
  return `#### Action Type: ${action.actionType}
  Activation Time: ${new Date(action.action.activationTime)}\\
  Repeats: ${action.action.repeats}
  ${action.action.outputs.map((output: any) => generateFormattedOutputDescription(output))}
  `;
};

const generateFormattedOutputDescription = (output: any) => {
  const address = output.address;
  const nergs = output.nergs;
  if (!output.tokens) output.tokens = [];
  const tokenDetails = output.tokens
    .map((tokenArray: any[]) => generateTokenDetails(tokenArray))
    .filter((obj: any) => obj !== null);

  return `###### **Outputs**
  Address: ${address}\\
  Ergs: ${nergs / NERGS}
  ${generateTokenDescriptionTable(tokenDetails)}
  `;
};

const generateTokenDetails = (tokenArray: any[]) => {
  return tokenArray.length === 2
    ? { tokenId: tokenArray[0], amount: tokenArray[1] }
    : null;
};

const generateTokenDescriptionTable = (tokenDetails: any) => {
  if (!tokenDetails.length) {
    return `\n`;
  }
  return `
  | TokenId | Amount (!Decimals) |\n|---|---|
  ${tokenDetails.map((token: any) => generateTokenDescription(token))}
  `;
};

const generateTokenDescription = (token: any) => {
  return `| ${token.tokenId} | ${token.amount} |\n`;
};

export default ProposalInfo;
