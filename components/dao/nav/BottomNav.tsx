import { Box, Link, useTheme } from "@mui/material";
import * as React from "react";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
import { deviceWrapper } from "@components/utilities/Style";
import { useRouter } from "next/router";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { getIcon } from "@components/creation/review/Design";

interface ISocialLinkGet {
  social_network: string;
  link_url: string;
}

const BottomNav: React.FC = () => {
  const router = useRouter();
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const daoData = globalContext.api.daoData;
  const theme = useTheme()
  return daoData === undefined ? null : (
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
      <Box sx={{ fontSize: ".9rem" }}>
        {daoData.design ? daoData.design.footer_text : ""}
      </Box>
      <Box
        sx={{
          ml: deviceWrapper("", "auto"),
          mt: deviceWrapper(".5rem", "0"),
          display: "flex",
          alignItems: "center",
          mr: deviceWrapper("0", ".75rem"),
        }}
      >
        {daoData.design
          ? daoData.design.footer_social_links.map((i: ISocialLinkGet, index: number) => {
            return (
              <Link
                href={i.link_url}
                key={index}
                sx={{ 
                  svg: { fontSize: "1.3rem" }, 
                  ml: '6px', 
                  '&:hover': {
                    color: theme.palette.text.primary
                  }
                }}
              >
                {getIcon(i.social_network.toLowerCase())}
              </Link>
            );
          })
          : null}
      </Box>
    </Box>
  );
};

export default BottomNav;
