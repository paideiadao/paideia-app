import { Header } from "@components/creation/utilities/HeaderComponents";
import TextEditor from "@components/utilities/TextEditor";
import DiscussionContext, {
  IDiscussionContext,
} from "@lib/dao/discussion/DiscussionContext";
import { Box, useTheme } from "@mui/material";
import React, { useMemo } from "react";
// import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { SimpleMDEReactProps } from "react-simplemde-editor";

const SimpleMdeEditor = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }
);

const Content: React.FC = () => {
  const theme = useTheme()
  const context = React.useContext<IDiscussionContext>(DiscussionContext);

  const mdeOptions = useMemo(() => {
    return {
      showIcons: ["code", "table"],
      spellChecker: false,
    } as SimpleMDEReactProps["options"]
  }, []);

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
      <Box
        sx={
          theme.palette.mode === 'dark' &&
          {
            '& .EasyMDEContainer': {
              '& .editor-toolbar': {
                borderColor: 'rgba(133, 133, 133, 0.2)',
              },
              '& .separator': {
                borderColor: 'rgba(133, 133, 133, 0.2)',
              },
              '& button': {
                color: theme.palette.text.secondary,
                background: '',
                '& :hover': {
                  background: theme.palette.background.paper
                }
              },
              '& button.active': {
                background: theme.palette.background.paper,
                '& button:hover': {
                  background: theme.palette.background.paper
                }
              },
              '& .editor-toolbar button:hover': {
                background: theme.palette.background.paper
              },
              '& .CodeMirror': {
                color: theme.palette.text.primary,
                background: 'rgba(0,0,0,0)',
                borderColor: 'rgba(133, 133, 133, 0.2)',
              },
              '& .CodeMirror-focused': {
                borderColor: theme.palette.primary.main,
              },
              '& .CodeMirror-cursor': {
                borderColor: theme.palette.text.secondary,
              },
              '& .editor-preview': {
                background: theme.palette.background.paper,
              }
            }
          }
        }
      >
        <SimpleMdeEditor
          value={context.api.value.content}
          options={mdeOptions}
          onChange={(value: any) =>
            context.api.setValue({ ...context.api.value, content: value })
          }
        />
      </Box>
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
