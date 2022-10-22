import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box } from "@mui/material";
import * as React from "react";
import { Overview } from "../discussion/Widgets";
import LanIcon from "@mui/icons-material/Lan";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dateFormat from "dateformat";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Details: React.FC = () => {
  const proposalContext = React.useContext<IProposalContext>(ProposalContext);
  const [time, setTime] = React.useState<string>("");

  React.useEffect(() => {
    var x = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = proposalContext.api.value.date.getTime() - now;

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
  }, []);
  return (
    <>
      <Overview
        proposal
        userDetailId={0}
        alias={""}
        level={0}
        img={""}
        followers={[]}
        created={0}
      />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "fileInput.outer",
          borderRadius: ".3rem",
          border: 1,
          borderColor: "border.main",
          p: ".5rem",
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
          ID: {"proposal_id_here"}
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
          Created: {dateFormat(proposalContext.api.value.date, "mmmm dS, yyyy")}
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
          <AccessTimeIcon sx={{ mr: ".3rem", fontSize: "1.2rem" }} />
          Reamining: {time}
        </Box>
      </Box>
    </>
  );
};

export default Details;
