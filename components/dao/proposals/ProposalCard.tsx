import {
  Box,
  Badge,
  Chip,
  Avatar,
  IconButton,
  ButtonBase,
  Typography,
} from "@mui/material";
import * as React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { percentage } from "@lib/creation/Utilities";
import Link from "next/link";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { useRouter } from "next/router";
import { deviceWrapper } from "@components/utilities/Style";
import { getRandomImage } from "@components/utilities/images";
import LikesDislikesApi from "@lib/LikesDislikesApi";
import useDidMountEffect from "@components/utilities/hooks";
import FollowApi from "@lib/FollowApi";
import { generateSlug } from "@lib/utilities";
import { SentimentVerySatisfiedOutlined } from "@mui/icons-material";
import { niceNumber } from "../proposal/VoteWidget";

export interface IProposalCard {
  id: number;
  name: string;
  image_url: string;
  is_proposal: string;
  status?: string;
  userSide: number;
  followers: number[];
  likes: number[];
  dislikes: number[];
  category: string;
  widget: any;
  c: number;
  yes: number;
  no: number;
  comments: any[];
  users: number;
  date: Date;
  width: any;
  scrollable?: boolean;
}

export const VoteWidget: React.FC<{
  yes: number;
  no: number;
}> = (props) => {
  return (
    <Box sx={{ width: "100%", mt: "-.1rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          color: "success.light",
        }}
      >
        {percentage(props.yes / (props.yes + props.no), 0)} YES
        <Box sx={{ ml: "auto", color: "error.light" }}>
          {percentage(props.no / (props.yes + props.no), 0)} NO
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: ".4rem", display: "flex" }}>
        <Box
          sx={{
            width: percentage(props.yes / (props.yes + props.no)),
            backgroundColor: "success.light",
            height: ".2rem",
          }}
        ></Box>
        <Box
          sx={{
            width: percentage(props.no / (props.yes + props.no)),
            backgroundColor: "error.light",
            height: ".2rem",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: deviceWrapper("none", "flex"),
          alignItems: "center",
          color: "text.secondary",
          fontSize: "1rem",
        }}
      >
        {niceNumber(props.yes)} votes
        <Box sx={{ ml: "auto" }}>{niceNumber(props.no)} votes</Box>
      </Box>
    </Box>
  );
};

export const ProposalStatus: React.FC<{ status: string }> = (props) => {
  const getStatusColor = () => {
    switch (props.status) {
      case "Challenged": {
        return "tokenAlert.main";
      }
      case "Draft": {
        return "tokenAlert.main";
      }
      case "Passed": {
        return "success.light";
      }
      case "Active": {
        return "success.light";
      }
      case "Proposal": {
        return "success.light";
      }
      case "Discussion": {
        return "primary.main";
      }
      case "Unchallenged": {
        return "success.light";
      }
      case "Failed": {
        return "red";
      }
      case "Failed - Quorum": {
        return "red";
      }
      case "Failed - Vote": {
        return "red";
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: getStatusColor(),
        fontSize: ".7rem",
      }}
    >
      <CircleIcon sx={{ fontSize: "1rem", mr: ".1rem" }} />
      {props.status}
    </Box>
  );
};

interface ILikesDislikes {
  likes: number;
  dislikes: number;
  userSide: number;
  putUrl?: string;
}

export const getUserSide = (
  likes: number[],
  dislikes: number[],
  userId: number
) => {
  return likes.indexOf(userId) > -1
    ? 1
    : dislikes.indexOf(userId) > -1
    ? 0
    : undefined;
};

// userSide, undefined for no vote, 0 for dislike, 1 for like
export const LikesDislikes: React.FC<ILikesDislikes> = (props) => {
  // use a prop setter function to set user state to liked or disliked & make an api call here.
  const [value, setValue] = React.useState<ILikesDislikes>({
    ...props,
  });

  const iconFont = {
    xs: ".9rem",
    sm: ".9rem",
    md: ".8rem",
    lg: ".8rem",
    xl: "1rem",
  };

  const globalContext = React.useContext<IGlobalContext>(GlobalContext);

  const api = new LikesDislikesApi(globalContext.api, props.putUrl);
  React.useEffect(() => {
    setValue({ ...props });
  }, [props]);
  return (
    <Box sx={{ display: "flex", alignItems: "center", fontSize: iconFont }}>
      {value.userSide === undefined ? (
        <>
          <ButtonBase
            draggable="false"
            onClick={() => {
              api.like();
              setValue({
                ...value,
                userSide: 1,
                likes: value.likes + 1,
              });
            }}
          >
            <ThumbUpOffAltIcon
              sx={{
                ml: ".2rem",
                mr: ".1rem",
                fontSize: iconFont,
                // cursor: "pointer",
              }}
            />
            {value.likes}
          </ButtonBase>
          <ButtonBase
            draggable="false"
            onClick={() => {
              api.dislike();
              setValue({
                ...value,
                userSide: 0,
                dislikes: value.dislikes + 1,
              });
            }}
          >
            <ThumbDownOffAltIcon
              sx={{
                mr: ".1rem",
                fontSize: iconFont,
                // cursor: "pointer",
                ml: ".4rem",
              }}
            />
            {value.dislikes}
          </ButtonBase>
        </>
      ) : value.userSide === 0 ? (
        <>
          <ButtonBase
            draggable="false"
            onClick={() => {
              api.like();
              setValue({
                ...value,
                userSide: 1,
                likes: value.likes + 1,
                dislikes: value.dislikes - 1,
              });
            }}
          >
            <ThumbUpOffAltIcon
              sx={{
                ml: ".2rem",
                mr: ".1rem",
                fontSize: iconFont,
                // cursor: "pointer",
              }}
            />
            {value.likes}
          </ButtonBase>
          <ButtonBase
            draggable="false"
            onClick={() => {
              api.remove();
              setValue({
                ...value,
                userSide: undefined,
                likes: value.likes,
                dislikes: value.dislikes - 1,
              });
            }}
          >
            <ThumbDownIcon
              sx={{
                mr: ".1rem",
                ml: ".4rem",
                fontSize: iconFont,
                // cursor: "pointer",
                color: "error.light",
              }}
            />
            <Box sx={{ color: "error.light", display: "inline" }}>
              {value.dislikes}
            </Box>
          </ButtonBase>
        </>
      ) : (
        <>
          <ButtonBase
            draggable="false"
            onClick={() => {
              api.remove();
              setValue({
                ...value,
                userSide: undefined,
                likes: value.likes - 1,
                dislikes: value.dislikes,
              });
            }}
          >
            <ThumbUpIcon
              sx={{
                ml: ".2rem",
                mr: ".1rem",
                fontSize: iconFont,
                color: "success.light",
                cursor: "pointer",
              }}
            />
            <Box sx={{ color: "success.light" }}>{value.likes}</Box>
          </ButtonBase>
          <ButtonBase
            draggable="false"
            onClick={() => {
              api.dislike();
              setValue({
                ...value,
                userSide: 0,
                dislikes: value.dislikes + 1,
                likes: value.likes - 1,
              });
            }}
          >
            <ThumbDownOffAltIcon
              sx={{
                mr: ".1rem",
                fontSize: iconFont,
                cursor: "pointer",
                ml: ".4rem",
              }}
            />
            {value.dislikes}
          </ButtonBase>
        </>
      )}
    </Box>
  );
};

const CountdownTimer: React.FC<{ widget: any }> = (props) => {
  const [time, setTime] = React.useState<string>("");
  let temp = new Date();
  temp.setDate(temp.getDate() + 30);
  var countDownDate = temp.getTime();
  React.useEffect(() => {
    if (typeof props.widget === "object") {
      var x = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          setTime("EXPIRED");
        }
      }, 1000);
    }
  }, [props.widget]);
  let widget = props.widget;
  return (
    <>
      {typeof widget === "object" || widget === "DAO termination" ? (
        <Chip
          icon={
            <Box
              sx={{
                height: "1rem",
                width: "1rem",
                display: "flex",
                alignItems: "center",
                color: "white",
              }}
            >
              {typeof widget === "object" ? (
                <AccessTimeFilledIcon sx={{ fontSize: "1rem" }} />
              ) : (
                widget === "DAO termination" && (
                  <DeleteIcon sx={{ fontSize: "1rem" }} />
                )
              )}
            </Box>
          }
          label={typeof widget === "object" ? time : widget}
          size="small"
          sx={{
            fontSize: ".7rem",
            color: "backgroundColor.main",
            backgroundColor:
              widget === "DAO termination" ? "error.light" : "tokenAlert.main",
            border: "1px solid",
            borderColor:
              widget === "DAO termination" ? "error.light" : "tokenAlert.main",
          }}
        />
      ) : (
        <Box></Box>
      )}
    </>
  );
};

const CountdownWidget: React.FC<{ date: Date }> = (props) => {
  const [time, setTime] = React.useState<string>("");
  React.useEffect(() => {
    var x = setInterval(function () {
      let temp = new Date(props.date);
      temp.setDate(temp.getDate() + 30);
      var countDownDate = temp.getTime();
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      setTime(days + " days " + hours + " hours " + minutes + " minutes");

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        setTime("EXPIRED");
      }
    }, 1000);
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        fontSize: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {time}
      <Box sx={{ fontSize: ".7rem", color: "text.secondary" }}>
        Until proposal passes
      </Box>
    </Box>
  );
};

const ProposalCard: React.FC<IProposalCard> = (props) => {
  const [favorited, setFavorited] = React.useState<boolean>(undefined);
  const [userSide, setUserSide] = React.useState<1 | 0 | undefined>(undefined);
  const [moved, setMoved] = React.useState(false);
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const getFavoritedSide = (favorites: number[]) => {
    const userId = globalContext.api.daoUserData
      ? globalContext.api.daoUserData.id
      : null;
    return favorites === undefined ? false : favorites.indexOf(userId) > -1;
  };

  React.useEffect(() => {
    setFavorited(getFavoritedSide(props.followers));
    setUserSide(
      getUserSide(
        props.likes,
        props.dislikes,
        globalContext.api.daoUserData == null
          ? null
          : globalContext.api.daoUserData.id
      )
    );
  }, [globalContext.api.daoUserData]);
  const getFooter = () => {
    const footerFont = {
      xs: "1rem",
      sm: "1rem",
      md: ".8rem",
      lg: ".9rem",
      xl: "1rem",
    };
    const footerSmallFont = {
      xs: ".9rem",
      sm: ".9rem",
      md: ".8rem",
      lg: ".7rem",
      xl: ".8rem",
    };
    switch ("Discussion" as string) {
      case "Challenged": {
        return <VoteWidget yes={props.yes} no={props.no} />;
      }
      case "Passed": {
        return "text.secondarySuccess";
      }
      case "Active": {
        return <VoteWidget yes={props.yes} no={props.no} />;
      }
      case "Discussion": {
        const totalUsers = [
          ...new Set(props.comments.map((item) => item.user_id)),
        ].length;
        const totalComments = props.comments.length;

        return (
          <ButtonBase
            sx={{
              p: ".5rem",
              height: "4rem",
              width: "100%",
              display: "flex",
              alignItems: "center",
              textAlign: "left",
            }}
            draggable="false"
            onMouseDown={() => {
              setMoved(false);
            }}
            onMouseMove={() => {
              setMoved(true);
            }}
            onMouseUp={() => {
              if (!moved) {
                router.push(
                  (dao === undefined ? "" : `/${dao}/`) +
                    `${
                      !props.is_proposal ? "discussion" : "proposal"
                    }/${generateSlug(props.id, props.name)}?tab=comments`
                );
              }
            }}
          >
            <Box sx={{ width: "100%", fontSize: footerFont }}>
              <Typography sx={{ mb: "4px" }}>Join the Conversation</Typography>
              <Box sx={{ fontSize: footerSmallFont, color: "text.secondary" }}>
                {totalComments} comment{totalComments === 1 ? "" : "s"} from{" "}
                {totalUsers} user{totalUsers === 1 ? "" : "s"}
              </Box>
            </Box>
          </ButtonBase>
        );
      }
      case "Unchallenged": {
        return <CountdownWidget date={props.date} />;
      }
    }
  };

  const api = new FollowApi(globalContext.api, "/proposals/follow/" + props.id);

  const router = useRouter();
  const { dao } = router.query;

  // use a local state to make it dynamic...
  return (
    <Box
      sx={{
        pr: deviceWrapper("0", props.scrollable ? "0" : "1rem"),
        pt: ".5rem",
        pb: ".5rem",
        mt: props.scrollable ? ".5rem" : "0",
        minWidth: "280px",
        maxWidth: props.width,
      }}
      id={`proposal-active-${props.c}`}
    >
      <Badge
        badgeContent={
          globalContext.api.daoUserData != null && (
            <IconButton
              sx={{
                backgroundColor: "favoriteBackground.main",
                color: "text.secondary",
                p: ".2rem",
                borderRadius: "50%",
                width: "1.5rem",
                height: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                api.follow(!favorited ? "follow" : "unfollow");
                setFavorited(!favorited);
              }}
            >
              {favorited ? (
                <FavoriteIcon sx={{ fontSize: "1rem", fill: "red" }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: "1rem", fill: "red" }} />
              )}
            </IconButton>
          )
        }
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            backgroundColor: "fileInput.outer",
            border: "1px solid",
            borderColor: "border.main",
            borderRadius: ".3rem",
            width: "100%",
            ":hover": {
              borderColor: "primary.main",
            },
          }}
        >
          <Box
            sx={{
              borderBottom: "1px solid",
              borderBottomColor: "border.main",
              p: ".5rem",
            }}
          >
            <ButtonBase
              onMouseDown={() => {
                setMoved(false);
              }}
              onMouseMove={() => {
                setMoved(true);
              }}
              onMouseUp={() => {
                if (!moved) {
                  router.push(
                    (dao === undefined ? "" : `/${dao}/`) +
                      `${
                        !props.is_proposal ? "discussion" : "proposal"
                      }/${generateSlug(props.id, props.name)}`
                  );
                }
              }}
              draggable="false"
              sx={{
                fontSize: "1rem",
                width: "100%",
                height: "100%",
                borderRadius: "3px",
                textAlign: "left",
                alignItems: "left",
                justifyContent: "left",
                verticalAlign: "top",
              }}
            >
              <Box
                sx={{
                  cursor: "pointer",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {props.name.length > 60
                  ? props.name.substring(0, 60) + "..."
                  : props.name}
              </Box>
            </ButtonBase>
            <Box sx={{ display: "flex", fontSize: "1rem" }}>
              <ProposalStatus
                status={!props.is_proposal ? "Discussion" : props.status}
              />
              <Box sx={{ ml: "auto" }}>
                <LikesDislikes
                  likes={props.likes.length}
                  dislikes={props.dislikes.length}
                  userSide={getUserSide(
                    props.likes,
                    props.dislikes,
                    globalContext.api.daoUserData == null
                      ? null
                      : globalContext.api.daoUserData.id
                  )}
                  putUrl={`/proposals/like/${props.id}`}
                />
              </Box>
            </Box>
            <ButtonBase
              onMouseDown={() => {
                setMoved(false);
              }}
              onMouseMove={() => {
                setMoved(true);
              }}
              onMouseUp={() => {
                if (!moved) {
                  router.push(
                    (dao === undefined ? "" : `/${dao}/`) +
                      `${
                        !props.is_proposal ? "discussion" : "proposal"
                      }/${generateSlug(props.id, props.name)}`
                  );
                }
              }}
              draggable="false"
              sx={{
                mt: ".5rem",
                height: "7rem",
                backgroundColor: "fileInput.outer",
                backgroundImage: `url(${props.image_url})`,
                backgroundSize: "100%",
                width: "100%",
                // border: "1px solid",
                // borderColor: "border.main",
                borderRadius: ".3rem",
                p: ".25rem",
                position: "relative",
                textAlign: "left",
              }}
            >
              <Box sx={{ position: "absolute", right: ".3rem" }}>
                <CountdownTimer widget={props.widget} />
              </Box>
              <Box
                sx={{ position: "absolute", bottom: ".3rem", left: "0.3rem" }}
              >
                {props.category && (
                  <Chip
                    label={props.category}
                    size="small"
                    sx={{
                      fontSize: ".7rem",
                      color: "primary.main",
                      backgroundColor: "backgroundColor.main",
                      border: "1px solid",
                      borderColor: "primary.main",
                    }}
                  />
                )}
              </Box>
            </ButtonBase>
          </Box>

          {getFooter()}
        </Box>
      </Badge>
    </Box>
  );
};

export default ProposalCard;
