import { Header } from "@components/creation/utilities/HeaderComponents";
import TextEditor from "@components/utilities/TextEditor";
import DiscussionContext, {
  IDiscussionContext,
} from "@lib/dao/discussion/DiscussionContext";
import { Box } from "@mui/material";
import React, { useState, useCallback } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

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

      <SimpleMdeReact
        value={context.api.value.content}
        onChange={(value: any) =>
          context.api.setValue({ ...context.api.value, content: value })
        }
      />;
      {/* <TextEditor
        onChange={(value: any) =>
          context.api.setValue({ ...context.api.value, content: value })
        }
        initial={context.api.value.content}
      /> */}
    </Box>
  );
};

export default Content;
