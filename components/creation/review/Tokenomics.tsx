import * as React from "react";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Accordion, Box, Button, Typography } from "@mui/material";
import {
  Value,
} from "./ReviewDrawer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { bytesToSize, percentage } from "../../../lib/creation/Utilities";
import { deviceStruct } from "@components/utilities/Style";
import { ITokenomics, ITokenHolder } from "@lib/creation/Interfaces";

const DistributionListing: React.FC<{ data: ITokenomics }> = (props) => {
  let tokenHolderBalance = props.data.tokenHolders
    .map((i: ITokenHolder) => i.balance)
    .reduce((sum, current) => sum + current, 0);

  let tokenomics = [
    !props.data.activateTokenomics
      ? {
        title: "Token holders",
        subtitle: `${props.data.tokenHolders.length} holders`,
        balance: tokenHolderBalance,
        tokenTicker: props.data.tokenTicker,
        percentage: percentage(
          tokenHolderBalance / props.data.tokenAmount,
          2,
          false
        ),
      }
      : undefined,
    {
      title: "Unassigned tokens",
      subtitle: `Treasury`,
      tokenTicker: props.data.tokenTicker,
      balance: props.data.tokenRemaining,
      percentage: percentage(
        props.data.tokenRemaining / props.data.tokenAmount,
        2,
        false
      ),
    },
  ];

  return (
    <Box sx={{ width: deviceStruct("100%", "100%", "65%", "65%", "65%") }}>
      {tokenomics
        .filter((i: any) => i !== undefined)
        .map((i: any, c: number) => {
          return (
            <Box
              key={`distribution-id-${c}`}
              sx={{
                borderRadius: ".2rem",
                border: ".1rem solid",
                borderColor: "border.main",
                mb: ".5rem",
                p: ".5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box>
                <Box sx={{ fontSize: ".9rem", color: "text.primary" }}>
                  {i.title}
                </Box>
                <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
                  {i.subtitle}
                </Box>
              </Box>
              <Box sx={{ ml: "auto", textAlign: "right" }}>
                <Box sx={{ fontSize: ".9rem", color: "text.primary" }}>
                  {i.balance + " "}
                  {i.tokenTicker}
                </Box>
                <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
                  {i.percentage}%
                </Box>
              </Box>
            </Box>
          );
        })}
      {props.data.activateTokenomics &&
        props.data.distributions.map((i: any, c: number) => {
          return (
            <Box
              key={`distribution-id-${c + 2}`}
              sx={{
                borderRadius: ".2rem",
                border: ".1rem solid",
                borderColor: "border.main",
                mb: ".5rem",
                p: ".5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box>
                <Box sx={{ fontSize: ".9rem", color: "text.primary" }}>
                  {i.distributionName}
                </Box>
                <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
                  {i.id}
                </Box>
              </Box>
              <Box sx={{ ml: "auto", textAlign: "right" }}>
                <Box sx={{ fontSize: ".9rem", color: "text.primary" }}>
                  {i.balance + " "}
                  {props.data.tokenTicker}
                </Box>
                <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
                  {i.percentage}%
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

const Tokenomics: React.FC<{
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
      sx={{
        backgroundColor: "fileInput.outer",
        borderBottom: "1px solid",
        borderBottomColor: "border.main",
      }}
      expanded={props.expanded === "tokenomics"}
      onChange={props.handleChange("tokenomics")}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id="tokenomics-header">
        <CheckCircleIcon color="success" sx={{ mr: "1rem" }} />
        <Typography sx={{ width: "100%", flexShrink: 0, fontSize: "1.1rem" }}>
          2. Tokenomics
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: "100%" }}>
          <Value
            labelWidth="35%"
            title="Token Creation Type"
            value={"Use an existing one"}
          />
          <Value
            labelWidth="35%"
            title="Token ID"
            value={
              data.tokenomics.tokenId.slice(0, 6) +
              "..." +
              data.tokenomics.tokenId.slice(
                data.tokenomics.tokenId.length - 6,
                data.tokenomics.tokenId.length
              )
            }
          />
          <Value
            labelWidth="35%"
            title="Staking Emission Amount (Decimal Adjusted)"
            value={data.tokenomics.stakingConfig.stakingEmissionAmount}
          />
          <Value
            labelWidth="35%"
            title="Staking Emission Delay"
            value={data.tokenomics.stakingConfig.stakingEmissionDelay + " cycles"}
          />
          <Value
            labelWidth="35%"
            title="Staking Cycle Length (ms)"
            value={data.tokenomics.stakingConfig.stakingCycleLength}
          />
          <Value
            labelWidth="35%"
            title="Staking Profit Share Percentage"
            value={data.tokenomics.stakingConfig.stakingProfitSharePct + "%"}
          />
          {/* <Value
            labelWidth="35%"
            title="Token amount"
            value={data.tokenomics.tokenAmount}
          /> */}
          {/* <Value
            labelWidth="35%"
            title="Token symbol"
            component={
              data.tokenomics.tokenImage.file ? (
                <ImageWrapper
                  size={bytesToSize(data.tokenomics.tokenImage.file.size)}
                  img={data.tokenomics.tokenImage.url}
                  name={data.tokenomics.tokenImage.file.name}
                />
              ) : (
                <></>
              )
            }
          /> */}
          {/* {!data.tokenomics.activateTokenomics && (
            <Value
              labelWidth="35%"
              title="Token holder addresses"
              component={<WalletListing data={data.tokenomics.tokenHolders} />}
            />
          )}
          <Value
            labelWidth="35%"
            title="Tokenomics"
            component={<DistributionListing data={data.tokenomics} />}
          /> */}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: ".5rem",
          }}
        >
          <Button onClick={() => props.edit(1)}>
            Edit Section
            <EditIcon sx={{ ml: ".5rem" }} />
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Tokenomics;
