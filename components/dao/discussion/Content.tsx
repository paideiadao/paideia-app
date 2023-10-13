import { Header } from "@components/creation/utilities/HeaderComponents";
import DiscussionContext, {
  IDiscussionContext,
} from "@lib/dao/discussion/DiscussionContext";
import { Box, useTheme } from "@mui/material";
import React, { useMemo } from "react";
// import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { SimpleMDEReactProps } from "react-simplemde-editor";
import axios from "axios";
import { parseJSON } from "date-fns";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";

const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const Content: React.FC = () => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const theme = useTheme();
  const context = React.useContext<IDiscussionContext>(DiscussionContext);

  const mdeOptions = useMemo(() => {
    return {
      showIcons: ["code", "table"],
      hideIcons: ["side-by-side", "fullscreen"],
      spellChecker: false,
      uploadImage: true,
      imageUploadFunction: (file: File, onSuccess, onError) => {
        const defaultOptions = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token_login")}`,
            "Content-Type": file.type,
          },
        };
        const formData = new FormData();
        formData.append("fileobject", file, file.name);
        axios
          .post(
            process.env.API_URL + "/util/upload_image_markdown",
            formData,
            defaultOptions
          )
          .then((res) => {
            onSuccess(res.data.filePath);
          })
          .catch((error) => {
            globalContext.api.error(
              "Error " + error.response.status + ": " + error.response.data
            );
          });
      },
      imagePathAbsolute: true,
    } as SimpleMDEReactProps["options"];
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
          subtitle="Write about your discussion. You can drag and drop or copy/paste images, and use any standard markdown commands (or use the toolbar below to help with formatting)"
        />
      </Box>
      <Box
        sx={
          // theme.palette.mode === 'dark' &&
          {
            "& .EasyMDEContainer": {
              "& .cm-formatting-code-block, .cm-comment": {
                background: "none",
              },
              "& .editor-toolbar": {
                borderColor: "rgba(133, 133, 133, 0.2)",
              },
              "& .separator": {
                borderColor: "rgba(133, 133, 133, 0.2)",
              },
              "& button": {
                color: theme.palette.text.secondary,
                background: "",
                "& :hover": {
                  background: theme.palette.background.paper,
                },
              },
              "& button.active": {
                background: theme.palette.background.paper,
                "& button:hover": {
                  background: theme.palette.background.paper,
                },
              },
              "& .editor-toolbar button:hover": {
                background: theme.palette.background.paper,
              },
              "& .CodeMirror": {
                color: theme.palette.text.primary,
                background: "rgba(0,0,0,0)",
                borderColor: "rgba(133, 133, 133, 0.2)",
              },
              "& .CodeMirror-focused": {
                borderColor: theme.palette.primary.main,
              },
              "& .CodeMirror-cursor": {
                borderColor: theme.palette.text.secondary,
              },
              "& .editor-preview": {
                background: theme.palette.background.paper,
                "& a": {
                  color: theme.palette.primary.main,
                },
                "& a:visited": {
                  color: theme.palette.primary.main,
                },
                "& pre": {
                  background: "rgba(144,144,144,0.2)",
                  padding: "12px",
                  borderRadius: "6px",
                },
                "& table td, table th": {
                  borderColor: "rgba(144,144,144,0.5)",
                },
              },
            },
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
    </Box>
  );
};

export default Content;
