import React, { useState, useEffect } from "react";
import { Avatar, Badge, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { ISocialLink } from "@lib/creation/Interfaces";
import { snipAddress } from "@lib/utilities";
import { levels } from "../profile/Header";
import useDidMountEffect from "@components/utilities/hooks";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import FollowBadge from "@components/utilities/FollowBadge";
import FollowApi from "@lib/FollowApi";

export interface IMemberCard {
  width: any;
  bio: string;
  dao_id: number;
  followers: number[];
  following: number[];
  id: number;
  level: number;
  name: string;
  profile_img_url: string;
  socialLinks: ISocialLink[];
  user_id: number;
  xp: number;
  created: number;
}

const MemberCard: React.FC<IMemberCard> = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [daoUserData] = globalContext.api.daoUserState;

  const [favorited, setFavorited] = React.useState<boolean>(
    props.followers.indexOf(daoUserData == null ? null : daoUserData.id) > -1
  );
  const router = useRouter();
  const api = new FollowApi(globalContext.api, "/users/profile/follow");

  useDidMountEffect(() => {}, [favorited]);

  const { dao } = router.query;
  const [daoNameWithLeadingSlash, setDaoNameWithLeadingSlash] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setDaoNameWithLeadingSlash("/" + dao.toString());
    }
  }, [router.isReady]);

  return (
    <Box
      sx={{
        pr: "1rem",
        pt: ".5rem",
        pb: ".5rem",
        minWidth: props.width,
        maxWidth: props.width,
      }}
      id={`proposal-active-${props.id}`}
    >
      <Badge
        badgeContent={
          daoUserData != null &&
          daoUserData.id !== props.id && (
            <FollowBadge
              onChange={(followed: boolean) => {
                api.follow(followed ? "follow" : "unfollow", props.id);
              }}
              followed={
                props.followers.indexOf(
                  daoUserData == null ? null : daoUserData.id
                ) > -1
              }
            />
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
              p: ".5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pt: "1rem",
            }}
          >
            <Avatar
              src={props.profile_img_url}
              sx={{ width: "4.5rem", height: "4.5rem" }}
            />
            <Box>{snipAddress(props.name, 20, 10)}</Box>
            <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
              Level {props.level} | {levels[props.level].name}
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                mt: ".5rem",
              }}
            >
              <Box
                sx={{
                  fontSize: ".7rem",
                  color: "text.secondary",
                  textAlign: "center",
                  pr: "1rem",

                  borderRight: "1px solid",
                  borderRightColor: "border.main",
                }}
              >
                Followers
                <Box sx={{ color: "text.primary", fontSize: "1.1rem" }}>
                  {props.followers.length}
                </Box>
              </Box>
              <Box
                sx={{
                  fontSize: ".7rem",
                  pl: "1rem",
                  color: "text.secondary",
                  textAlign: "center",
                  pr: "1rem",

                  borderRight: "1px solid",
                  borderRightColor: "border.main",
                }}
              >
                Created
                <Box sx={{ color: "text.primary", fontSize: "1.1rem" }}>
                  {props.created}
                </Box>
              </Box>
              <Box
                sx={{
                  fontSize: ".7rem",
                  pl: "1rem",
                  color: "text.secondary",
                  textAlign: "center",
                }}
              >
                Approved
                <Box sx={{ color: "text.primary", fontSize: "1.1rem" }}>
                  {0}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              borderTop: 1,
              mt: "0rem",
              borderColor: "border.main",
            }}
          >
            <Link href={`${daoNameWithLeadingSlash}/members/${props.name}`}>
              <Button
                variant="text"
                sx={{
                  width: "100%",
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                }}
                size="small"
              >
                View Profile{" "}
              </Button>
            </Link>
          </Box>
        </Box>
      </Badge>
    </Box>
  );
};

export default MemberCard;
