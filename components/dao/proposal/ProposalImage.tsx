import { LearnMore } from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Typography } from "@mui/material";
import * as React from "react";
import DiscussionBanner from "../discussion/DiscussionBanner";

const ProposalImage: React.FC = () => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const data = context.api.value.image_url;

  return (
    <>
      <Typography
        sx={{
          mt: "20px",
          mb: "12px",
          fontSize: "0.9rem",
        }}
      >
        Proposal Image
      </Typography>
      <DiscussionBanner
        file={""}
        fileUrl={data === undefined ? "" : data}
        handleImage={() => {}}
        id="proposal-img-upload"
      />
    </>
  );
};

export default ProposalImage;
