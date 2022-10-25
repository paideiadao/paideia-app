import { Header } from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import { Box, Button } from "@mui/material";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import MyDistributions from "@components/dao/distributions/MyDistributions";
import CurrentDistributions from "@components/dao/distributions/CurrentDistributions";
import PastDistributions from "@components/dao/distributions/PastDistributions";
import Link from "next/link";
import { useRouter } from "next/router";

const Distributions: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;

  return (
    <Layout width="95%">
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Header title="Distributions" large />
        <Box sx={{ ml: "auto" }}>
          <Link
            href={
              dao === undefined
                ? "/dao/distributions/create"
                : `/${dao}/distributions/create`
            }
          >
            <Button variant="contained">
              Create New <AddIcon sx={{ ml: ".5rem" }} />
            </Button>
          </Link>
        </Box>
      </Box>
      <MyDistributions />
      <CurrentDistributions />
      <PastDistributions />
    </Layout>
  );
};

export default Distributions;
