import * as React from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Accordion, Box, Button, Typography } from "@mui/material";
import { ActiveInactive, Value, WalletListing } from "./ReviewDrawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

const Governance: React.FC<{
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
      expanded={props.expanded === "governance"}
      onChange={props.handleChange("governance")}
      sx={{
        backgroundColor: "fileInput.outer",
        borderBottom: "1px solid",
        borderBottomColor: "border.main",
        alignItems: "center",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="governance-header">
        <CheckCircleIcon color="success" sx={{ mr: "1rem" }} />
        <Typography sx={{ width: "100%", flexShrink: 0, fontSize: "1.1rem" }}>
          3. Governance and voting configuration
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: "100%" }}>
          <Value
            labelWidth="35%"
            title="Optimistic governance"
            component={
              <ActiveInactive value={data.governance.optimisticGovernance} />
            }
          />
          {data.governance.optimisticGovernance && (
            <>
              <Value
                labelWidth="35%"
                title="White listed members"
                component={<WalletListing data={data.governance.whitelist} />}
              />
              <Value
                labelWidth="35%"
                title="Collateral amount"
                value={data.governance.amount}
              />
              <Value
                labelWidth="35%"
                title="Collateral currency"
                value={data.governance.currency}
              />
              <Value
                labelWidth="35%"
                title="Challenge time"
                value={
                  data.governance.timeToChallenge +
                  " " +
                  data.governance.timeToChallengeUnits.charAt(0).toUpperCase() +
                  data.governance.timeToChallengeUnits.slice(1)
                }
              />
            </>
          )}

          <Value
            labelWidth="35%"
            title="Quadratic voting"
            component={
              <ActiveInactive value={data.governance.quadraticVoting} />
            }
          />
          <Value
            labelWidth="35%"
            title="Support"
            value={data.governance.supportNeeded + "%"}
          />
          <Value
            labelWidth="35%"
            title="Quorum"
            value={data.governance.quorum + "%"}
          />
          <Value
            labelWidth="35%"
            title="Vote Duration"
            value={
              data.governance.voteDuration +
              " " +
              data.governance.voteDurationUnits.charAt(0).toUpperCase() +
              data.governance.voteDurationUnits.slice(1)
            }
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
          <Button onClick={() => props.edit(2)}>
            Edit Section
            <EditIcon sx={{ ml: ".5rem" }} />
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Governance;
