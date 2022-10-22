import { Header } from "@components/creation/utilities/HeaderComponents";
import TextEditor from "@components/utilities/TextEditor";
import DiscussionContext, {
  IDiscussionContext,
} from "@lib/dao/discussion/DiscussionContext";
import { Box } from "@mui/material";
import * as React from "react";

const Content: React.FC = () => {
  const context = React.useContext<IDiscussionContext>(DiscussionContext);

  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderTopColor: "border.main",
        mt: "1rem",
        pt: "1rem",
      }}
    >
      <Box sx={{ mb: "1rem" }}>
        <Header
          title="Discussion content"
          subtitle="Write about your discussion, you can add videos, links, images, code snippets, and format your content using the editor below."
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
