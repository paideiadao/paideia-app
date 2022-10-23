import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import dateFormat from "dateformat";
import { getUserSide, LikesDislikes } from "../proposals/ProposalCard";
import { deviceWrapper } from "@components/utilities/Style";
import { LightTheme } from "@theme/theme";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import CommentsApi from "@lib/CommentsApi";

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
      let res = await api.publish(newComment);
      if (res.status !== 200) {
        api.api.error("Error adding comment");
      }
    } catch (e) {
      console.log(e);
      api.api.error("Unknown error adding comment");
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
    const [show, setShow] = React.useState<boolean>(true);
    const [reply, setReply] = React.useState<boolean>(false);

    return (
      <>
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
                {props.comment.alias.length > 14
                  ? "skeeep"
                  : props.comment.alias}
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
              {props.comment.alias.length > 30
                ? props.comment.alias.slice(0, 15) +
                  "....." +
                  props.comment.alias.slice(-15)
                : props.comment.alias}
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
                  {props.comment.comment}
                  <Box
                    sx={{ display: "flex", width: "100%", mt: ".5rem", pr: 0 }}
                  >
                    {/* {children.length > 0 && !show && (
                <Button
                  onClick={() => setShow(true)}
                  size="small"
                  variant="outlined"
                  sx={{ mr: ".5rem" }}
                  startIcon={
                    <ReplyIcon
                      sx={{
                        transform: "rotate(-180deg)",
                      }}
                    />
                  }
                >
                  View {children.length}{" "}
                  {children.length === 1 ? "reply" : "replies"}
                </Button>
              )} */}
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
      </>
    );
  } else {
    return <Typography>Comment not found</Typography>;
  }
};

export default Comments;
