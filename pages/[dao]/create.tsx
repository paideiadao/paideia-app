import * as React from "react";
import { paths, props } from "@lib/DaoPaths";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import BalanceIcon from "@mui/icons-material/Balance";
import ChatIcon from "@mui/icons-material/Chat";
import CreateHeader from "@components/dao/proposal/Header";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";

const Create: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;
  return (
    <Layout>
      {/* get last link here */}
      <CreateHeader />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "stretch",
          flexDirection: deviceWrapper("column", "row"),
        }}
      >
        {/* <Link
          href={
            id === undefined
              ? "/dao/proposal/create"
              : `/dao/${id}/proposal/create`
          }
        > */}
        <Box
          sx={{
            cursor: "pointer",
            borderRadius: ".5rem",
            border: "1px solid",
            p: ".5rem",
            backgroundColor: "fileInput.outer",
            borderColor: "border.main",
            width: deviceWrapper("100%", "50%"),
            mt: deviceWrapper("1rem", "0"),
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mr: "1rem",
            ":hover": {
              borderColor: "primary.main",
            },
            opacity: ".5",
          }}
        >
          <BalanceIcon sx={{ fontSize: "2rem", opacity: ".6" }} />
          <Box
            sx={{
              textAlign: "center",
              fontSize: "1.3rem",
              fontWeight: 350,
            }}
          >
            Create a proposal
          </Box>
          <Box
            sx={{
              textAlign: "center",
              fontSize: ".8rem",
              color: "text.secondary",
            }}
          >
            Provide users with different options to vote on, and the proposal
            will either be approved or declined. Keep in mind, once you create a
            proposal, it can't be edited or deleted.
          </Box>
        </Box>
        {/* </Link> */}
        <Link
          href={
            id === undefined
              ? "/dao/discussion/create"
              : `/dao/${id}/discussion/create`
          }
        >
          <Box
            sx={{
              cursor: "pointer",
              borderRadius: ".5rem",
              border: "1px solid",
              p: ".5rem",
              backgroundColor: "fileInput.outer",
              borderColor: "border.main",
              width: deviceWrapper("100%", "50%"),
              mt: deviceWrapper("1rem", "0"),

              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              ":hover": {
                borderColor: "primary.main",
              },
            }}
          >
            <ChatIcon sx={{ fontSize: "2rem", opacity: ".6" }} />
            <Box
              sx={{
                textAlign: "center",
                fontSize: "1.3rem",
                fontWeight: 350,
              }}
            >
              Create a discussion
            </Box>
            <Box
              sx={{
                textAlign: "center",
                fontSize: ".8rem",
                color: "text.secondary",
              }}
            >
              Get feedback from others on a specific subject before creating a
              full proposal. Discussions can easily be upgraded to proposals at
              any time.
            </Box>
          </Box>
        </Link>
      </Box>
    </Layout>
  );
};

// export const getStaticPaths = paths;
// export const getStaticProps = props;

export default Create;
