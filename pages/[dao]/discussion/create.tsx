import React from "react";
import CreateHeader from "@components/dao/proposal/Header";
import { Box, Button, Modal } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useRouter } from "next/router";
import Link from "next/link";
import GeneralInformation from "@components/dao/discussion/GeneralInformation";
import DiscussionApi from "@lib/dao/discussion/DiscussionApi";
import DiscussionContext from "@lib/dao/discussion/DiscussionContext";
import DiscussionImage from "@components/dao/discussion/DiscussionImage";
import Reference from "@components/dao/discussion/Reference";
import Content from "@components/dao/discussion/Content";
import { modalBackground } from "@components/utilities/modalBackground";
import LoadingButton from "@mui/lab/LoadingButton";
import PublishIcon from "@mui/icons-material/Publish";
import { IComment } from "@components/dao/discussion/Comments";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";
import { getRandomImage } from "@components/utilities/images";
import { IFile } from "@lib/creation/Interfaces";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import CancelLink from "@components/utilities/CancelLink";
import { generateSlug } from "@lib/utilities";

export interface IDiscussion {
  name: string;
  category: string;
  image?: IFile;
  references: string[];
  content: string;
  date?: Date;
  likes?: number;
  dislikes?: number;
  followed?: boolean;
  tags?: any[];
  userSide?: number;
  comments?: IComment[];
  attachments?: IFile[];
}

const CreateDiscussion: React.FC = () => {
  const [value, setValue] = React.useState<IDiscussion>({
    name: "",
    category: "",
    image: {
      url: getRandomImage(),
      file: undefined,
    },
    references: [],
    content: "",
  });
  const [publish, setPublish] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const router = useRouter();
  const { dao } = router.query;
  const [daoData] = globalContext.api.daoState;
  const daoId = daoData?.id;

  const api = new DiscussionApi(globalContext.api, value, setValue);

  return (
    <DiscussionContext.Provider value={{ api }}>
      <Layout>
        <CreateHeader type="discussion" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: "1px solid",
            borderColor: "primary.main",
            backgroundColor: "fileInput.main",
            pl: "0",
            borderRadius: ".3rem",
            pt: ".75rem",
            pb: deviceWrapper("0", ".75rem"),
            flexDirection: deviceWrapper("column", "row"),
          }}
        >
          <Box
            sx={{
              width: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChatIcon sx={{ fontSize: "2rem" }} color="primary" />
          </Box>
          <Box
            sx={{
              width: "75%",
              fontSize: "1.3rem",
              fontWeight: 400,
              textAlign: deviceWrapper("center", "left"),
            }}
          >
            Create a discussion
            <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
              Get feedback from other users on a specific subject before
              creating a full proposal. Discussions can easily be upgraded to
              proposals at any time.
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: deviceWrapper("100%", "15%"),
              justifyContent: "center",
            }}
          >
            <Link href={dao === undefined ? "" : `/${dao}/create`}>
              <Button
                size="small"
                sx={{
                  mt: deviceWrapper(".5rem", "0"),
                  borderTop: deviceWrapper("1px solid", "0"),
                  borderColor: "border.main",
                  width: deviceWrapper("100%", "15%"),
                  pt: deviceWrapper(".5rem", "0"),
                  pb: deviceWrapper(".5rem", "0"),
                  borderTopLeftRadius: deviceWrapper("0", ".5rem"),
                  borderTopRightRadius: deviceWrapper("0", ".5rem"),
                }}
              >
                Change
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            borderTop: "1px solid",
            borderTopColor: "border.main",
            mt: "1rem",
            pt: "1rem",
          }}
        >
          <GeneralInformation />
          <DiscussionImage />
          <Box sx={{ mt: "1.5rem" }} />
          <Reference />
          <Content />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              mt: "1rem",
              mb: ".5rem",
            }}
          >
            <CancelLink>
              <Button variant="outlined" sx={{ width: "50%", mr: "1rem" }}>
                Cancel
              </Button>
            </CancelLink>

            <Button
              variant="contained"
              sx={{ width: "50%" }}
              onClick={() => setPublish(true)}
            >
              Publish
            </Button>
          </Box>
        </Box>
        <Modal
          open={publish}
          onClose={() => setPublish(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{ ...modalBackground, width: deviceWrapper("20rem", "35rem") }}
          >
            <Box sx={{ fontSize: "1.1rem", fontWeight: 450 }}>
              You are about to publish a discussion
            </Box>
            <Box sx={{ mt: "1rem", fontSize: ".9rem" }}>
              Once published, a discussion can&apos;t be edited or deleted.
              However, a discussion can be upgraded to a proposal at any time.
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                mt: "1rem",
              }}
            >
              <Box sx={{ ml: "auto" }}>
                {!loading && (
                  <Button sx={{ mr: "1rem" }} onClick={() => setPublish(false)}>
                    Cancel
                  </Button>
                )}
                <LoadingButton
                  onClick={async () => {
                    if (!loading) {
                      setLoading(true);
                      try {
                        let image;
                        if (value.image.file === undefined) {
                          const defaultImage = await fetch(value.image.url);
                          const data = await defaultImage.blob();
                          const metadata = {
                            type: "image/jpeg",
                          };
                          image = new File([data], "test.jpg", metadata);
                        } else {
                          image = value.image.file;
                        }
                        const imgRes = await api.uploadFile(image);
                        const res = await api.create(
                          imgRes.data.image_url,
                          daoId
                        );
                        if (res?.status == 200) {
                          router.push(
                            `/${
                              dao === undefined ? "" : dao
                            }/discussion/${generateSlug(
                              res.data.id,
                              res.data.name
                            )}`
                          );
                        }
                        setLoading(false);
                      } catch (e) {
                        console.log(e);
                        api.api.error(e);
                        setLoading(false);
                      }
                    }
                  }}
                  startIcon={<PublishIcon />}
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                >
                  Publish
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Layout>
    </DiscussionContext.Provider>
  );
};

export default CreateDiscussion;
