import { Header } from "@components/creation/utilities/HeaderComponents";
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import * as React from "react";
import Musk from "../../../../public/profile/musk-full.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import SwapVertIcon from "@mui/icons-material/SwapVert";
import { SocialRow } from "@components/creation/design/Footer";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";
import { IFile, ISocialLink } from "@lib/creation/Interfaces";
import { LoadingButton } from "@mui/lab";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import useDidMountEffect from "@components/utilities/hooks";
import CancelLink from "@components/utilities/CancelLink";

const ProfileEditImage: React.FC<{ set: (val: IFile) => void; img: string }> = (
  props
) => {
  const [file, setFile] = React.useState<IFile>({
    file: -1,
    url: props.img as string,
  });
  const [deleted, setDeleted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setFile({
      ...file,
      url: props.img,
    });
  }, [props.img]);

  function handleImage(e: any) {
    setDeleted(false);
    let fileInput = e.currentTarget.files;
    if (fileInput && fileInput[0]) {
      if (fileInput.length != 1) return;
      if (fileInput[0].size > 3000000000) {
        setFile({ ...file, file: -1 });
        return;
      }

      var reader = new FileReader();
      reader.onload = function (_e: any) {
        setFile({ ...file, url: _e.target.result });
      };

      reader.readAsDataURL(fileInput[0]);
      setFile({
        ...file,
        file: fileInput[0],
      });
      props.set({
        ...file,
        file: fileInput[0],
      });
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        pt: "1rem",
        pb: ".5rem",
        flexDirection: deviceWrapper("column", "row"),
      }}
    >
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <IconButton
            sx={{
              ml: "-2rem",
              mt: "-2rem",
              p: ".1rem",
              backgroundColor: "favoriteBackground.main",
              ":hover": {
                backgroundColor: "favoriteBackground.main",
              },
              border: "1px solid",
              borderColor: "border.main",
            }}
            onClick={() => {
              setDeleted(true);
              setFile({
                file: -1,
                url: "",
              });
            }}
          >
            <DeleteIcon color="error" sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        }
      >
        <Avatar
          sx={{
            height: deviceWrapper("8rem", "7rem"),
            width: deviceWrapper("8rem", "7rem"),
          }}
          src={deleted || typeof file.url !== "string" ? "" : file.url}
        ></Avatar>
      </Badge>
      <Box
        sx={{
          ml: deviceWrapper("0", "1.5rem"),
          mt: deviceWrapper(".5rem", "0"),
          width: deviceWrapper("100%", "65%"),
          display: deviceWrapper("flex", "block"),
          justifyContent: "center",
        }}
      >
        <input
          type="file"
          id="replace-profile-image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleImage(e)}
        />
        <Button
          variant="outlined"
          size="small"
          endIcon={<SwapVertIcon />}
          onClick={() => {
            const fileInput = document.getElementById("replace-profile-image");
            fileInput.click();
          }}
        >
          Replace Image
        </Button>
        <Box
          sx={{
            fontSize: ".9rem",
            color: "text.secondary",
            display: deviceWrapper("none", "block"),
          }}
        >
          Image needs to be at least 256px x 256px. JPEG and PNG files
          supported, less than 3mb.
        </Box>
      </Box>
    </Box>
  );
};

const Edit: React.FC<{ params: any }> = (props) => {
  const [value, setValue] = React.useState<{
    username: string;
    shortBio: string;
    socialLinks: ISocialLink[];
    img: IFile | string;
  }>({
    username: "",
    shortBio: "",
    img: undefined,
    socialLinks: [
      {
        socialNetwork: "",
        address: "",
      },
    ],
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [daoUserData, setDaoUserData] = globalContext.api.daoUserState;

  React.useEffect(() => {
    let val = daoUserData;
    if (val !== undefined) {
      setValue({
        username: val.name,
        socialLinks: val.social_links,
        img: val.profile_img_url,
        shortBio: val.bio,
      });
    }
  }, [daoUserData]);

  return (
    <Layout>
      {daoUserData !== undefined && (
        <>
          <Header title="Edit profile" large />
          <ProfileEditImage
            set={(val: IFile) => setValue({ ...value, img: val })}
            img={value.img as string}
          />
          <TextField
            value={value.username}
            label="User name"
            sx={{ width: "100%", mt: ".5rem" }}
            onChange={(e) => setValue({ ...value, username: e.target.value })}
          />
          <TextField
            value={value.shortBio}
            label="Short bio"
            sx={{ width: "100%", mt: "1rem" }}
            minRows={2}
            onChange={(e) => setValue({ ...value, shortBio: e.target.value })}
            multiline
            FormHelperTextProps={{ sx: { textAlign: "right" } }}
            helperText={`${
              value.shortBio == null ? 0 : value.shortBio.length
            }/250`}
          />
          <Header title="Social Links" small />
          <Box sx={{ mt: ".5rem" }}>
            {value.socialLinks.map((i: ISocialLink, c: number) => (
              <SocialRow
                c={c}
                data={i}
                key={`social-link-${c}`}
                set={(m: any) => {
                  let temp = [...value.socialLinks];
                  temp[c] = m;
                  setValue({
                    ...value,
                    socialLinks: temp,
                  });
                }}
                delete={(m: any) => {
                  let temp = [...value.socialLinks];
                  temp.splice(c, 1);
                  setValue({
                    ...value,
                    socialLinks: temp,
                  });
                }}
              />
            ))}
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              startIcon={<AddIcon />}
              size="small"
              onClick={() => {
                let temp = [...value.socialLinks];
                temp.push({
                  socialNetwork: "",
                  address: "",
                });
                setValue({ ...value, socialLinks: temp });
              }}
            >
              Add {value.socialLinks.length > 0 ? "Another" : ""}
            </Button>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "1rem",
            }}
          >
            <CancelLink>
              <Button
                variant="outlined"
                sx={{ width: "49%", mr: ".5rem" }}
                size="small"
              >
                Cancel
              </Button>
            </CancelLink>
            <LoadingButton
              size="small"
              variant="contained"
              sx={{ width: "49%" }}
              loadingPosition={"center"}
              loading={loading}
              onClick={async () => {
                setLoading(true);
                let imgRes;
                if (typeof value.img !== "string") {
                  const image = value?.img?.file ?? -1;
                  imgRes =
                    image === undefined || image === -1
                      ? ""
                      : await globalContext.api.uploadFile(image).catch((e) => {
                          globalContext.api.error(e);
                          return "";
                        });
                }
                await globalContext.api.editUser({
                  name: value.username,
                  profile_img_url:
                    imgRes === undefined || imgRes === ""
                      ? ""
                      : imgRes.data.image_url,
                  bio: value.shortBio,
                  social_links: value.socialLinks,
                });
                setDaoUserData({
                  ...daoUserData,
                  name: value.username,
                  profile_img_url:
                    imgRes === undefined || imgRes === ""
                      ? ""
                      : imgRes.data.image_url,
                  bio: value.shortBio,
                  social_links: value.socialLinks,
                });
                setLoading(false);
              }}
            >
              {!loading ? (
                <>
                  <Box sx={{ display: deviceWrapper("none", "block") }}>
                    {"Save Changes"}
                  </Box>
                  <Box sx={{ display: deviceWrapper("block", "none") }}>
                    {"Save"}
                  </Box>
                </>
              ) : (
                <Box>.</Box>
              )}
            </LoadingButton>
          </Box>
        </>
      )}
    </Layout>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = [{ params: { id: "spreadly" } }, { params: { id: "ergopad" } }];
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const daoData = { params };
//   return {
//     props: {
//       params,
//     },
//   };
// };

export default Edit;
