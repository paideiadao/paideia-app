import { Header } from "@components/creation/utilities/HeaderComponents";
import TextEditor from "@components/utilities/TextEditor";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box } from "@mui/material";
import * as React from "react";

const Content: React.FC = () => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderTopColor: "border.main",
        mt: "1.5rem",
        pt: "1rem",
      }}
    >
      <Box sx={{ mb: "1rem" }}>
        <Header
          title="Proposal content"
          subtitle="Write about your propoal, you can add videos, links, images, and format your content using the editor below."
        />
      </Box>

      <TextEditor
        onChange={(value: any) =>
          context.api.setValue({ ...context.api.value, content: value })
        }
        initial={context.api.value.content}
      />
    </Box>
  );
};

export default Content;
