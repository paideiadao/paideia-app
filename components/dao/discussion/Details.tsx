import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box } from "@mui/material";
import * as React from "react";
import LanIcon from "@mui/icons-material/Lan";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dateFormat from "dateformat";
import { Overview, State } from "@components/dao/discussion/Widgets";
import { IProposal } from "@pages/[dao]/proposal/create";

const Details: React.FC<{ data: IProposal }> = (props) => {
  return (
    <>
      <Overview
        userDetailId={props.data.user_details_id ?? 0}
        alias={props.data.alias ?? ""}
        level={0}
        img={props.data.profile_img_url ?? ""}
        // @ts-ignore
        followers={props.data.followers ?? []}
        created={props.data.created ?? 0}
      />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "fileInput.outer",
          borderRadius: ".3rem",
          border: 1,
          borderColor: "border.main",
          p: ".5rem",
          mb: "1rem",
        }}
      >
        <CapsInfo title="Details" mb={"0.5rem"} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: ".9rem",
            color: "text.secondary",
          }}
        >
          <LanIcon sx={{ opacity: ".8", fontSize: "1rem", mr: ".3rem" }} />
          Id: {props.data.id}
        </Box>
        <Box
          sx={{
            alignItems: "center",
            color: "text.secondary",
            fontSize: ".9rem",
            display: "flex",
            mt: ".5rem",
          }}
        >
          <CalendarTodayIcon sx={{ mr: ".3rem", fontSize: "1.2rem" }} />
          Created: {dateFormat(props.data.date, "mmmm dS, yyyy")}
        </Box>
      </Box>
      <State />
    </>
  );
};

export default Details;
