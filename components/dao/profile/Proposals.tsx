import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box } from "@mui/material";
import * as React from "react";
import ProposalCard, { IProposalCard } from "../proposals/ProposalCard";

interface IProposalsListing {
  proposals: IProposalCard[];
}

const ProposalsListing: React.FC<IProposalsListing> = (props) => {
  return props.proposals ? (
    <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
      <CapsInfo
        title={`This user made ${props.proposals.length} proposal${
          props.proposals.length <= 1 ? "" : "s"
        }`}
      />
      {props.proposals.map((i: IProposalCard, c: number) => (
        <ProposalCard
          {...i}
          c={c}
          key={"proposal-card-key-profile-" + c}
          width={{ xs: "98%", sm: "98%", md: "50%", lg: "33%" }}
        />
      ))}
    </Box>
  ) : (
    <>Loading Here</>
  );
};

export default ProposalsListing;
