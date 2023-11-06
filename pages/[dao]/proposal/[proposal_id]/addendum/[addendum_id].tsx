import { Header } from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import BackLink from "@components/utilities/BackLink";
import { Box, Skeleton } from "@mui/material";
import * as React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@lib/utilities";
import { FC } from "react";
import MarkdownRender from "@lib/MarkdownRender";

const ProposalAddendum: FC = () => {
  const router = useRouter();
  const { proposal_id, addendum_id } = router.query;
  const parsed_proposal_id = proposal_id
    ? (proposal_id as string).split("-").slice(-5).join("-")
    : null;

  const { data } = useSWR(
    parsed_proposal_id ? `/proposals/${parsed_proposal_id}` : null,
    fetcher
  );

  const addendum = data
    ? data.addendums.filter(
        (addendum: { id: string }) => addendum.id === addendum_id
      )[0] ?? {
        name: "404 Not Found",
        content: "",
      }
    : {
        name: "Loading...",
        content: "",
      };

  return (
    <Layout>
      <BackLink />
      <Box sx={{ mt: "1rem" }} />
      <Header title={addendum.name} />
      <Box
        sx={{
          alignItems: "center",
          color: "text.secondary",
          fontSize: ".8rem",
          display: "flex",
        }}
      >
        <CalendarTodayIcon sx={{ mr: ".3rem", fontSize: "1rem" }} />
        {dateFormat(addendum.date, "mmmm dS, yyyy")}
      </Box>
      <Box sx={{ mt: 4, mb: 4 }}>
        {data === undefined ? (
          <Skeleton animation="wave" width="100%" />
        ) : (
          <MarkdownRender description={addendum.content} />
        )}
      </Box>
    </Layout>
  );
};

export default ProposalAddendum;
