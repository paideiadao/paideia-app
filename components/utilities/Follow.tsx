import { Button, Fab, Tooltip } from "@mui/material";
import * as React from "react";
import { deviceWrapper } from "./Style";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useDidMountEffect from "./hooks";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import FollowApi from "@lib/FollowApi";

interface IFollow {
  followed: boolean;
  putUrl: string;
  user_id?: number;
  small?: boolean;
}

export const FollowMobile: React.FC<IFollow> = (props) => {
  const [followed, setFollowed] = React.useState<boolean>(props.followed);
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const api = new FollowApi(globalContext.api, props.putUrl);
  const smallStyle =
    props.small === undefined ? {} : { width: "2rem", height: "2rem" };
  return (
    <Tooltip title={followed ? "Unfollow" : "Follow"} placement="top">
      <Fab
        size="small"
        onClick={() => {
          api.follow(!followed ? "follow" : "unfollow");
          setFollowed(!followed);
        }}
        sx={{
          zIndex: 10,
          backgroundColor: followed ? "white" : "error.main",
          color: followed ? "error.light" : "white",
          ":hover": {
            backgroundColor: followed ? "white" : "error.main",
            color: followed ? "error.light" : "white",
          },
          ...smallStyle,
        }}
      >
        <FavoriteIcon sx={{ fontSize: "1.2rem" }} />
      </Fab>
    </Tooltip>
  );
};

const Follow: React.FC<IFollow> = (props) => {
  const [followed, setFollowed] = React.useState<boolean>(props.followed);
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const api = new FollowApi(globalContext.api, props.putUrl);

  React.useEffect(() => {
    setFollowed(props.followed);
  }, [props.followed]);

  return (
    <Button
      onClick={() => {
        setFollowed(!followed);
        api.follow(
          !followed ? "follow" : "unfollow",
          props.user_id ? props.user_id : globalContext.api?.daoUserData.id
        );
      }}
      sx={{
        color: followed ? "error.light" : "text.secondary",
        borderColor: followed ? "error.light" : "text.secondary",
        ":hover": {
          borderColor: "error.light",
          color: "error.light",
        },
        // display: deviceWrapper("none", "flex"),
      }}
      variant="outlined"
      size="small"
      startIcon={followed ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    >
      Follow{followed && "ed"}
    </Button>
  );
};

export default Follow;
