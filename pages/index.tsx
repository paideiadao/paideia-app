import React from "react";
import useSWR from "swr";
import { fetcher } from "@lib/utilities";
import { Container } from "@mui/material";
import ProjectList from "@components/ProjectList";

export default function Projects() {
  const { data: daoData } = useSWR("/dao/", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const daos = daoData
    ? daoData.map((dao: any) => {
        return { ...dao, category: "Default" };
      })
    : [];

  return (
    <Container sx={{ pb: "240px" }}>
      <ProjectList daos={daos} />
    </Container>
  );
}
