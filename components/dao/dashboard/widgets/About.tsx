import * as React from "react";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box, Paper } from "@mui/material";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";

const About: React.FC = () => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const daoData = globalContext.api?.daoData;
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: ".5rem",
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        p: ".5rem",
        mt: "1rem",
        mb: ".5rem",
      }}
    >
      <CapsInfo title="About Dao" small />
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            fontSize: ".7rem",
            color: "text.secondary",
            borderRight: "1px solid",
            borderColor: "border.main",
          }}
        >
          Members
          <Box sx={{ fontSize: "1.2rem", color: "text.primary" }}>
            {daoData.member_count ?? "-"}
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            textAlign: "center",
            fontSize: ".7rem",
            color: "text.secondary",
          }}
        >
          Proposals
          <Box sx={{ fontSize: "1.2rem", color: "text.primary" }}>
            {daoData.proposal_count ?? "-"}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", fontSize: ".9rem", mt: ".5rem" }}>
        {daoData.dao_short_description}
      </Box>
      <Box sx={{ fontSize: ".7rem", color: "text.secondary", mt: ".5rem" }}>
        Active since {new Date(daoData.created_dtz).toDateString()}
      </Box>
    </Paper>
  );
};

export default About;
