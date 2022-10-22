import * as React from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Accordion, Box, Button, Typography } from "@mui/material";
import { Value } from "./ReviewDrawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

const BasicInformation: React.FC<{
  data: any;
  expanded: string | boolean;
  handleChange: Function;
  edit: Function;
}> = (props) => {
  let data = props.data;
  return (
    <Accordion
      elevation={0}
      disableGutters
      expanded={props.expanded === "basic"}
      onChange={props.handleChange("basic")}
      sx={{
        backgroundColor: "fileInput.outer",
        borderBottom: "1px solid",
        borderBottomColor: "border.main",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="basic-header">
        <CheckCircleIcon color="success" sx={{ mr: "1rem" }} />
        <Typography sx={{ width: "100%", flexShrink: 0, fontSize: "1.1rem" }}>
          1. Basic Information
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: "100%" }}>
          <Value
            labelWidth="35%"
            title="DAO Name"
            value={data.basicInformation.daoName}
          />
          <Value
            labelWidth="35%"
            title="DAO URL"
            value={data.basicInformation.daoUrl}
          />
          <Value
            labelWidth="35%"
            title="Short Description"
            value={data.basicInformation.shortDescription}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: ".5rem",
          }}
        >
          <Button onClick={() => props.edit(0)}>
            Edit Section
            <EditIcon sx={{ ml: ".5rem" }} />
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default BasicInformation;
