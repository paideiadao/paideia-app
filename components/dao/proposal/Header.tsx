import * as React from "react";
import { Header } from "@components/creation/utilities/HeaderComponents";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const CreateHeader: React.FC<{ type?: string }> = (props) => {
  const router = useRouter();

  const { dao } = router.query;
  return (
    <>
      <Box>
        <Link
          href={
            router.pathname.includes("discussion") ||
            router.pathname.includes("proposal")
              ? dao === undefined
                ? ""
                : `/${dao}/create`
              : dao === undefined
              ? ""
              : `/${dao}/proposal`
          }
        >
          <Button
            size="small"
            sx={{ mb: "1rem" }}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
          >
            Back
          </Button>
        </Link>
        <Header
          title={
            props.type === undefined
              ? "Create a proposal or discussion"
              : "Create a " + props.type
          }
          large
          subtitle={`Follow the steps and create a proposal. Once a proposal has been created you won't be able to edit it, but you can always create as many addendums as you want to add extra information, even afterwards!`}
        />
      </Box>
      <Typography
        sx={{
          mt: "16px",
          mb: "16px",
          fontSize: "0.9rem",
        }}
      >
        What do you want to do?
      </Typography>
      {/* <LearnMore
        small
        title="What do you want to do?"
        tooltipText="Content Here"
        tooltipTitle="Title Here"
        tooltipLink="/here"
      /> */}
    </>
  );
};

export default CreateHeader;
