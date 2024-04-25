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

interface IDiscussionReferencesData {
  references: IReference[];
  referenced: IReference[];
}

const DiscussionReferences: React.FC<IDiscussionReferencesData> = (props) => {
  const router = useRouter();
  const { id, discussion_id } = router.query;
  return (
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
            title={`References ${props.references.length === 0 ? "None" : ""}`}
            mb="0"
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: "1rem" }}>
        {props.references.map((i: IReference, c: number) => (
          <DiscussionCard key={`discussion-references-${c}`} {...i} />
        ))}
      </Box>
      <Box
        sx={{
          mt: "1rem",
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
            title={`Referenced By ${
              props.referenced.length === 0 ? "None" : ""
            }`}
            mb="0"
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: "1rem" }}>
        {props.referenced.map((i: IReference, c: number) => (
          <DiscussionCard key={`discussion-referenced-${c}`} {...i} />
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
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          router.push(
            `/${dao}/${
              props.is_proposal ? "proposal" : "discussion"
            }/${generateSlug(props.id, props.name)}`
          );
        }}
      >
        {props.name.length > 120
          ? props.name.substring(0, 120) + "..."
          : props.name}
        <Box sx={{ display: "block" }}>
          <ProposalStatus
            status={props.status === "discussion" ? "Discussion" : props.status}
          />
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
        {/* <Box sx={{ display: deviceWrapper("none", "block") }}>
          <ProposalStatus status={props.status} />
        </Box> */}
        <LikesDislikes
          likes={props.likes.length}
          dislikes={props.dislikes.length}
          userSide={
            props.likes.indexOf(parseInt(localStorage.getItem("user_id") ?? "")) > -1
              ? 1
              : props.dislikes.indexOf(
                  parseInt(localStorage.getItem("user_id") ?? "")
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
