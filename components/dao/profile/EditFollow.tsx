import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import Follow from "@components/utilities/Follow";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";

const EditFollow: React.FC<{
  edit: boolean;
  followed: boolean;
  user_id: number;
}> = (props) => {
  const router = useRouter();
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const { dao } = router.query;
  return globalContext.api.daoUserData == null ? null : props.edit ||
    props.user_id == globalContext.api.daoUserData.id ? (
    <Link
      href={dao === undefined ? "" : `/${dao}/profile/edit`}
    >
      <Button variant="contained" endIcon={<EditIcon />} size="small">
        Edit Profile
      </Button>
    </Link>
  ) : (
    <Follow
      followed={props.followed}
      putUrl={"/users/profile/follow"}
      user_id={props.user_id}
    />
  );
};

export default EditFollow;
