import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import { generateSlug, getDaoPath } from "@lib/utilities";
import { Avatar, Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { LikesDislikes, ProposalStatus } from "../proposals/ProposalCard";
import { IDataComponent } from "./DiscussionInfo";

interface IReference {
  img: string;
  name: string;
  status: string;
  likes: number[];
  dislikes: number[];
  id: number;
  is_proposal: boolean;
}

const DiscussionReferences: React.FC<IDataComponent> = (props) => {
  const router = useRouter();
  const { id, discussion_id } = router.query;
  return props.data === undefined ? (
    <>Loading Here...</>
  ) : (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexWrap: deviceWrapper("wrap", "nowrap"),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: deviceWrapper("100%", "50%"),
          }}
        >
          <CapsInfo
            title={`this discussion has been referenced ${props.data.length} ${
              props.data.length === 1 ? "time" : "times"
            }`}
            mb="0"
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: "1rem" }}>
        {props.data.map((i: IReference, c: number) => (
          <DiscussionCard
            key={`discussion-reference-${c}`}
            {...i}
            status="Active"
          />
        ))}
      </Box>
    </>
  );
};

const DiscussionCard: React.FC<IReference> = (props) => {
  const router = useRouter();
  const { dao } = router.query;
  return (
    <Box
      sx={{
        width: "100%",
        mb: ".5rem",
        p: ".5rem",
        borderRadius: ".3rem",
        border: "1px solid",
        borderColor: "border.main",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar
        // src={`https://picsum.photos/200/200/?random=${props.id}`}
        src={props.img}
        sx={{
          width: deviceWrapper("2.5rem", "3rem"),
          height: deviceWrapper("2.5rem", "3rem"),
          ml: ".5rem",
        }}
      />
      <Box
        sx={{
          ml: deviceWrapper(".75rem", "1rem"),
          fontSize: deviceWrapper(".8rem", "1rem"),
        }}
      >
        {props.name.length > 120
          ? props.name.substring(0, 120) + "..."
          : props.name}
        <Box sx={{ display: deviceWrapper("none", "block") }}>
          <ProposalStatus status={props.status} />
        </Box>
      </Box>
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          alignItems: deviceWrapper("flex-end", "center"),
          flexDirection: deviceWrapper("column", "row"),
        }}
      >
        <Box sx={{ display: deviceWrapper("block", "none") }}>
          <ProposalStatus status={props.status} />
        </Box>
        <LikesDislikes
          likes={props.likes.length}
          dislikes={props.dislikes.length}
          userSide={
            props.likes.indexOf(parseInt(localStorage.getItem("user_id"))) > -1
              ? 1
              : props.dislikes.indexOf(
                  parseInt(localStorage.getItem("user_id"))
                ) > -1
              ? 0
              : undefined
          }
          putUrl={`/proposals/like/${props.id}`}
        />

        <Link
          href={`/${dao}/${
            props.is_proposal ? "proposal" : "discussion"
          }/${generateSlug(props.id, props.name)}`}
        >
          <Button
            size="small"
            sx={{ ml: "1rem", display: deviceWrapper("none", "flex") }}
          >
            View
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default DiscussionReferences;
