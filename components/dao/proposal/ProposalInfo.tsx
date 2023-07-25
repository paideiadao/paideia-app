import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box } from "@mui/material";
import * as React from "react";

interface ProposalInfoProps {
  content: string;
}

const ProposalInfo: React.FC<ProposalInfoProps> = ({ content }) => {
  return (
    <>
      <CapsInfo title="Proposal Content" />
      <Box
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></Box>
    </>
  );
};

export default ProposalInfo;
