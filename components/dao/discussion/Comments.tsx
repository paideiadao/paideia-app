import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
  Menu,
  MenuItem,
  Modal,
  Link,
} from "@mui/material";
import * as React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import dateFormat from "dateformat";
import {
  getUserSide,
  LikesDislikes,
} from "@components/dao/proposals/ProposalCard";
import { deviceWrapper } from "@components/utilities/Style";
import { LightTheme } from "@theme/theme";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import CommentsApi from "@lib/CommentsApi";
import { modalBackground } from "@components/utilities/modalBackground";
import { useRouter } from "next/router";

export interface IComment {
  id: number;
  likes: number[];
  dislikes: number[];
  date: Date;
  alias: string;
  profile_img_url: string;
  comment: string;
  parent: number;
  show?: boolean;
}

const Comments: React.FC<{ title?: string; data: IComment[]; id: number }> = (
  props
) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const api = new CommentsApi(globalContext.api, props.id);

  const setCommentsWrapper = async (newComment: IComment) => {
    try {
      await api.publish(newComment);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {props.title === undefined && (
        <>
          <CapsInfo title="Post a comment" />
          <CommentInput length={props.data.length} set={setCommentsWrapper} />
        </>
      )}

      <CapsInfo
        title={props.title === undefined ? "All comments" : props.title}
      />
      {props.data === undefined ? (
        <>Loading here...</>
      ) : props.data.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "2rem",
          }}
        >
          No Comments Yet
        </Box>
      ) : (
        props.data
          .sort(
            (a: IComment, b: IComment) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .filter((i: IComment) => i?.parent == null)
          .map((i: IComment, c: number) => {
            return (
              <BaseComment
                comment={i}
                data={props.data}
                key={`base-comment-${c}`}
                set={setCommentsWrapper}
              />
            );
          })
      )}
    </>
  );
};

const CommentInput: React.FC<{
  set: Function;
  length: number;
  parent?: number;
  level?: number;
}> = (props) => {
  const [value, setValue] = React.useState<string>("");
  const themeContext = React.useContext<IThemeContext>(ThemeContext);
  return (
    <Box
      sx={{
        pl: props.level === undefined ? "0rem" : `${0.45}rem`,
        mt: props.level === undefined ? 0 : ".5rem",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          backgroundColor: "fileInput.main",
          pt: ".25rem",
          pl: ".5rem",
          borderRadius: "1px solid",
          border: 1,
          borderColor:
            themeContext.theme === LightTheme
              ? "border.main"
              : "fileInput.main",
          pr: "1.5rem",
          mb: "1.5rem",
        }}
      >
        <InputBase
          sx={{
            ml: ".25rem",
            flex: 1,
            pb: "1rem",
            width: "100%",
            pt: ".5rem",
            fontSize: deviceWrapper(".8rem", "1rem"),
          }}
          placeholder="Type something to leave a comment"
          multiline
          value={value}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setValue(e.target.value)}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            pb: ".5rem",
          }}
        >
          <Box
            sx={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
              mr: "-.5rem",
            }}
          >
            <IconButton sx={{ mr: ".5rem" }} size="small">
              <TagFacesIcon color="primary" />
            </IconButton>
            <IconButton sx={{ mr: "1rem" }} size="small">
              <AttachFileIcon color="primary" />
            </IconButton>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                if (
                  [undefined, ""].indexOf(localStorage.getItem("alias")) === -1
                )
                  props.set({
                    id: props.length + 1,
                    parent: props.parent,
                    userSide: undefined,
                    likes: 0,
                    dislikes: 0,
                    date: new Date(),
                    alias: localStorage.getItem("alias"),
                    comment: value,
                  });
                setValue("");
              }}
            >
              Publish
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const BaseComment: React.FC<{
  comment: IComment;
  data: any[];
  set?: Function;
  level?: number;
}> = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  if (props.comment != undefined) {
    const children = props.data.filter(
      (i: IComment) => i?.parent === props.comment.id
    );
    const level = props.level;
    const router = useRouter();
    const { dao } = router.query;
    const [filter, setFilter] = React.useState<boolean>(false);
    const [show, setShow] = React.useState<boolean>(true);
    const [reply, setReply] = React.useState<boolean>(false);
    const commentStringArray = props.comment.comment.split("\n\n");

    return (
      <>
        {!filter && (
          <Box
            sx={{
              width: "100%",
              mt: "1rem",
              pl: props.level === undefined ? 0 : `${0.45}rem`,
              fontSize: ".9rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                // mr: ".5rem",
                alignItems: deviceWrapper("center", "center"),
              }}
            >
              {!show && (
                <IconButton size="small" onClick={() => setShow(true)}>
                  <OpenInFullIcon />
                </IconButton>
              )}
              <Box
                sx={{
                  width: deviceWrapper("12%", "7%"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Avatar
                  src={props.comment.profile_img_url}
                  sx={{
                    width: deviceWrapper("1.75rem", "2.25rem"),
                    height: deviceWrapper("1.75rem", "2.25rem"),
                  }}
                />
              </Box>
              <Box sx={{ display: deviceWrapper("block", "none") }}>
                <Box
                  sx={{
                    alignItems: "center",
                    fontSize: deviceWrapper(".7rem", "9rem"),
                  }}
                >
                  <Link
                    href={`/${dao}/members/${props.comment.alias}`}
                    underline="none"
                  >
                    {props.comment.alias.length > 14
                      ? "[Alias Skipped]"
                      : props.comment.alias}
                  </Link>
                </Box>
                <Box
                  sx={{
                    ml: "auto",
                    color: "text.secondary",
                    fontSize: deviceWrapper(".7rem", "9rem"),
                  }}
                >
                  {dateFormat(props.comment.date, "mmmm dS, yyyy @ h:MM TT")}
                </Box>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: deviceWrapper("none", "flex"),
                  fontSize: "1rem",
                }}
              >
                <Link
                  href={`/${dao}/members/${props.comment.alias}`}
                  underline="none"
                >
                  {props.comment.alias.length > 30
                    ? props.comment.alias.slice(0, 15) +
                      "..." +
                      props.comment.alias.slice(-15)
                    : props.comment.alias}
                </Link>
              </Box>
              <Box
                sx={{
                  ml: "auto",
                  color: "text.secondary",
                  display: deviceWrapper("none", "flex"),
                }}
              >
                {dateFormat(props.comment.date, "mmmm dS, yyyy @ h:MM TT")}
              </Box>
              <Box
                sx={{
                  ml: deviceWrapper("auto", "0"),
                  pl: 1,
                  color: "text.secondary",
                }}
              >
                <CommentOptions
                  commentId={props.comment.id}
                  userAlias={props.comment.alias}
                  callbackHandler={() => {
                    setFilter(true);
                  }}
                />
              </Box>
            </Box>
            {show && (
              <Box
                sx={{
                  width: "100%",
                  mr: ".5rem",
                  display: "flex",
                  alignContent: "stretch",
                  alignItems: "stretch",
                }}
              >
                {children.length > 0 && show && (
                  <Box
                    sx={{
                      width: ".4%",
                      ml: "1rem",
                      backgroundColor: "border.main",
                      ":hover": {
                        backgroundColor: "primary.lightOpacity",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => setShow(false)}
                  ></Box>
                )}
                <Box sx={{ width: "99.6%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: deviceWrapper("96%", "98.5%"),
                      flexDirection: "column",
                      fontSize: deviceWrapper(".8rem", "1rem"),
                      borderColor: "border.main",
                      ml: ".5rem",
                      mr: 0,
                      mt: ".25rem",
                    }}
                  >
                    {commentStringArray.map((string, i) => {
                      const breaks = string.split("\n");
                      return (
                        <Typography key={i} sx={{ mb: "16px" }}>
                          {breaks.map((str, i) => {
                            return (
                              <React.Fragment key={i}>
                                {str}
                                <br />
                              </React.Fragment>
                            );
                          })}
                        </Typography>
                      );
                    })}
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        mt: ".5rem",
                        pr: 0,
                      }}
                    >
                      {!reply && (
                        <Button
                          onClick={() => setReply(true)}
                          size="small"
                          variant="text"
                        >
                          Reply
                        </Button>
                      )}
                      <Box sx={{ ml: "auto" }}>
                        <LikesDislikes
                          likes={props.comment.likes.length}
                          dislikes={props.comment.dislikes.length}
                          userSide={getUserSide(
                            props.comment.likes,
                            props.comment.dislikes,
                            globalContext.api.daoUserData == null
                              ? null
                              : globalContext.api.daoUserData.id
                          )}
                          putUrl={`/proposals/comment/like/${props.comment.id}`}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {reply && (
                    <CommentInput
                      parent={props.comment.id}
                      length={props.data.length}
                      set={(newComment: IComment) => {
                        props.set(newComment);
                        setShow(true);
                        setReply(false);
                      }}
                      level={level === undefined ? 1 : level + 1}
                    />
                  )}
                  <Box>
                    {children.length >= 0 &&
                      show &&
                      children.map((i: IComment) => (
                        <BaseComment
                          key={`child-comment-${i.id}-${props.comment.id}`}
                          comment={i}
                          data={props.data}
                          level={level === undefined ? 1 : level + 1}
                          set={props.set}
                        />
                      ))}
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </>
    );
  } else {
    return <Typography>Comment not found</Typography>;
  }
};

const CommentOptions: React.FC<{
  commentId: number;
  userAlias: string;
  callbackHandler: () => void;
}> = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const api = new CommentsApi(globalContext.api, 0);
  const userData = globalContext.api.daoUserData;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleDelete = () => {
    api
      .deleteComment(props.commentId)
      .then()
      .catch((e) => console.log(e));
    props.callbackHandler();
    handleModalClose();
  };

  return (
    <Box>
      <IconButton
        id={`comment-more-button-${props.commentId}`}
        aria-controls={open ? `comment-menu-${props.commentId}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        size="small"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ fontSize: "1rem" }} />
      </IconButton>
      <Menu
        id={`comment-menu-${props.commentId}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `comment-more-button-${props.commentId}`,
        }}
      >
        <MenuItem
          disabled={props.userAlias !== userData?.name}
          sx={{ fontSize: "0.7rem", px: 3 }}
          onClick={() => {
            handleModalOpen();
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{ ...modalBackground, backgroundColor: "fileInput.main" }}>
          <Typography id="comment-modal-modal-title">
            Delete Comment?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleModalClose}>Back</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Comments;
