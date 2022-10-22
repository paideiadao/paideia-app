import { Header } from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import BackLink from "@components/utilities/BackLink";
import { Box } from "@mui/material";
import * as React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dateFormat from "dateformat";

const ProposalAddendum: React.FC = () => {
  return (
    <Layout>
      <BackLink />
      <Box sx={{ mt: "1rem" }} />
      <Header title="Addendum 1" />
      <Box
        sx={{
          alignItems: "center",
          color: "text.secondary",
          fontSize: ".8rem",
          display: "flex",
        }}
      >
        <CalendarTodayIcon sx={{ mr: ".3rem", fontSize: "1rem" }} />
        {dateFormat(new Date(), "mmmm dS, yyyy")}
      </Box>
      <Box
        dangerouslySetInnerHTML={{
          __html: "<p>Addendum content here!</p>",
        }}
      />
    </Layout>
  );
};

export default ProposalAddendum;
