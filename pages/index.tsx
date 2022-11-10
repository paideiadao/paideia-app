import React from "react";
import useSWR from "swr";
import { fetcher } from "@lib/utilities";
import {
  Typography,
  Grid,
  Container,
  Box,
  Divider,
  Icon,
  Button,
} from "@mui/material";
import ProjectList from "@components/ProjectList";

interface IQuotesProps {
  quote: string;
  author: string;
}

export default function Projects() {
  const { data: highlightsData } = useSWR(
    `/blogs/?highlights_only=true`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { data: quotesData } = useSWR(
    `/quotes/`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const { data: daoData } = useSWR(
    "/dao/",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  
  const daos = daoData ? daoData.map((dao: any) => { return { ...dao, category: "Default" }; }) : [];
console.log(daos)
  return (
    <Container sx={{ pb: "240px" }}>
      <ProjectList daos={daos} />
    </Container>
  );
}
