import { Box } from "@mui/material";
import * as React from "react";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
import { deviceWrapper } from "@components/utilities/Style";
import { useRouter } from "next/router";

const BottomNav: React.FC = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: "calc(100%)",
        backgroundColor: "backgroundColor.main",
        borderTop: "1px solid",
        borderTopColor: "border.main",

        p: ".5rem",
        display: "flex",
        alignItems: "center",
        mb: "-1rem",
        pb:
          router === undefined
            ? deviceWrapper(".5rem", ".75rem")
            : router.pathname.includes("notifications") &&
              !router.pathname.includes("edit")
            ? deviceWrapper("4rem", ".75rem")
            : router.pathname.includes("proposal/")
            ? deviceWrapper("3rem", ".75rem")
            : deviceWrapper(".5rem", ".75rem"),
        pt: deviceWrapper(".5rem", ".75rem"),
        flexDirection: deviceWrapper("column", "row"),
      }}
    >
      <Box sx={{ fontSize: ".9rem" }}>Visit our website at paideia.im.</Box>
      <Box
        sx={{
          ml: deviceWrapper("", "auto"),
          mt: deviceWrapper(".5rem", "0"),
          display: "flex",
          alignItems: "center",
          mr: deviceWrapper("0", ".75rem"),
        }}
      >
        <TwitterIcon color="primary" sx={{ mr: ".5rem" }} />
        <RedditIcon color="primary" />
      </Box>
    </Box>
  );
};

export default BottomNav;
