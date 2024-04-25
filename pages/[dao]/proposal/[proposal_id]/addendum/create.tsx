import { Header } from "@components/creation/utilities/HeaderComponents";
import "easymde/dist/easymde.min.css";
import Layout from "@components/dao/Layout";
import BackLink from "@components/utilities/BackLink";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { FC, useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { SimpleMDEReactProps } from "react-simplemde-editor";
import axios from "axios";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import CancelLink from "@components/utilities/CancelLink";
import LoadingButton from "@mui/lab/LoadingButton";
import Warning from "@components/utilities/Warning";
import { useRouter } from "next/router";

interface ICreateProposalAddendum {
  name: string;
  content: string;
}

const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const CreateProposalAddendum: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const { dao, proposal_id } = router.query;
  const parsed_proposal_id = proposal_id
    ? (proposal_id as string).split("-").slice(-5).join("-")
    : null;
  const [addendum, setAddendum] = useState<ICreateProposalAddendum>({
    name: "",
    content: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

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
            globalContext.api?.error(
              "Error " + error.response.status + ": " + error.response.data
            );
          });
      },
      imagePathAbsolute: true,
    } as SimpleMDEReactProps["options"];
  }, []);

  const handleSumbit = async () => {
    setLoading(true);
    const api = globalContext.api;
    if (api) {
      try {
        const res = await api.put<any>(
          `/proposals/addendum/${parsed_proposal_id}`,
          addendum
        );
        const addendumId = res.data.id;
        router.push(`/${dao}/proposal/${proposal_id}/addendum/${addendumId}`);
      } catch (e) {
        api.error(e);
      }
    }
    setLoading(false);
  };

  return (
    <Layout>
      <BackLink />
      <Box sx={{ mt: "1rem" }} />
      <Header
        title="Add Addendum"
        subtitle="Note: Addendums once created cannot be updated or deleted."
      />
      <Box
        sx={{
          borderTop: "1px solid",
          borderTopColor: "border.main",
          mt: "1rem",
          pt: "1rem",
        }}
      >
        <Box sx={{ mb: "1rem" }}>
          <Header title="Addendum Title" />
        </Box>
        <Box sx={{ mb: "1rem" }}>
          <TextField
            sx={{ width: "100%" }}
            label="Title"
            variant="outlined"
            value={addendum.name}
            onChange={(e) => setAddendum({ ...addendum, name: e.target.value })}
          />
        </Box>
      </Box>
      <Box
        sx={{
          //   borderTop: "1px solid",
          //   borderTopColor: "border.main",
          mt: "1rem",
          //   pt: "1rem",
        }}
      >
        <Box sx={{ mb: "1rem" }}>
          <Header
            title="Addendum Content"
            subtitle="You can drag and drop or copy/paste images, and use any standard markdown commands (or use the toolbar below to help with formatting)"
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
            value={addendum.content}
            options={mdeOptions}
            onChange={(value: any) =>
              setAddendum({ ...addendum, content: value })
            }
          />
        </Box>
      </Box>
      <Box sx={{ mt: "1rem" }} />
      {(addendum.content === "" || addendum.name === "") && (
        <Warning title="Addendum name or content cannot be empty" subtitle="" />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: "1rem",
          mb: "1rem",
        }}
      >
        <CancelLink>
          <Button variant="outlined" sx={{ width: "50%", mr: "1rem" }}>
            Cancel
          </Button>
        </CancelLink>
        <LoadingButton
          variant="contained"
          sx={{ width: "50%" }}
          loading={loading}
          disabled={
            addendum.content === "" ||
            addendum.name === "" ||
            !parsed_proposal_id
          }
          onClick={handleSumbit}
        >
          Add Addendum
        </LoadingButton>
      </Box>
    </Layout>
  );
};

export default CreateProposalAddendum;
