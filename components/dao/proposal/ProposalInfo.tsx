import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box } from "@mui/material";
import * as React from "react";

const ProposalInfo: React.FC = () => {
  return (
    <>
      <CapsInfo title="Proposal Content" />
      <Box
        dangerouslySetInnerHTML={{
          __html: "<p>Attachments should have a separate tab!</p>",
        }}
      ></Box>
    </>
  );
};

export default ProposalInfo;
