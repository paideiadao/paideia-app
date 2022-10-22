import { props } from "@lib/DaoPaths";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import * as React from "react";

interface IFollowBadge {
  onChange: (val: boolean) => void;
  followed: boolean;
}

const FollowBadge: React.FC<IFollowBadge> = (props) => {
  const [followed, setFollowed] = React.useState<boolean>(props.followed);
  return (
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
        props.onChange(!followed);
        setFollowed(!followed);
      }}
    >
      {followed ? (
        <Favorite sx={{ fontSize: "1rem", fill: "red" }} />
      ) : (
        <FavoriteBorder sx={{ fontSize: "1rem", fill: "red" }} />
      )}
    </IconButton>
  );
};

export default FollowBadge;
