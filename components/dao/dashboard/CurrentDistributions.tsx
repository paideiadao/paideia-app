import { Box, Button } from "@mui/material";
import * as React from "react";
import { Subheader } from "../../creation/utilities/HeaderComponents";
import dateFormat from "dateformat";
import CircleIcon from "@mui/icons-material/Circle";
import { deviceWrapper } from "@components/utilities/Style";

let temp = new Date();
temp.setDate(temp.getDate() + 30);

const distributions = [
  {
    start: new Date(),
    end: temp,
    name: "Free tokens",
    type: "Airdrop",
    amount: "20,000",
    ticker: "PAI",
    status: "Active",
    id: "1",
  },
  {
    start: new Date(),
    end: temp,
    name: "Seed round 1",
    type: "Public Sale",
    amount: "800,000",
    ticker: "PAI",
    status: "Active",
    id: "2",
  },
  {
    start: new Date(),
    end: temp,
    name: "Seed round 2",
    type: "Public Sale",
    amount: "1,600,000",
    ticker: "PAI",
    status: "Soon",
    id: "3",
  },
];

const CurrentDistributions: React.FC = () => {
  return (
    <Box sx={{ width: "100%", mt: "1rem" }}>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Subheader title="Current Distributions" small bold />
        <Button sx={{ ml: "auto", fontSize: ".8rem" }} size="small">
          View all
        </Button>
      </Box>
      {distributions.map((i: any, c: number) => {
        return (
          <Box
            key={`distributions-key-${c}`}
            sx={{
              width: "100%",
              backgroundColor: "fileInput.outer",
              mt: "1rem",
              mb: "1rem",
              borderRadius: ".3rem",
              border: "1px solid",
              borderColor: "border.main",
              display: "flex",
              alignItems: "center",
              p: "1rem",
              fontSize: ".8rem",
              ":hover": {
                borderColor: "primary.main",
              },
            }}
          >
            <Box
              sx={{ display: deviceWrapper("block", "none"), width: "100%" }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  {i.name}
                  <Box sx={{ fontSize: ".7rem", color: "text.secondary" }}>
                    {dateFormat(i.start, "mmm d, yyyy")} /{" "}
                    {dateFormat(i.end, "mmm d, yyyy")}
                  </Box>
                </Box>
                <Box
                  sx={{
                    ml: "auto",
                    display: "flex",
                    alignItems: "center",
                    color:
                      i.status === "Active"
                        ? "primary.lightSuccess"
                        : "tokenAlert.main",
                  }}
                >
                  <CircleIcon sx={{ fontSize: "1rem", mr: ".3rem" }} />{" "}
                  {i.status}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  mt: "1rem",
                }}
              >
                {i.amount} {i.ticker}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: "primary.main",
                    color: "primary.main",
                    p: ".3rem",
                    borderRadius: "1rem",
                    fontSize: ".7rem",
                    pt: ".1rem",
                    pb: ".1rem",
                    ml: "auto",
                  }}
                >
                  {i.type}
                </Box>
              </Box>
              <Box></Box>
            </Box>
            <Box
              sx={{
                width: "30%",
                flexDirection: "column",
                display: deviceWrapper("none", "flex"),
              }}
            >
              {i.name}
              <Box sx={{ fontSize: ".7rem", color: "text.secondary" }}>
                {dateFormat(i.start, "mmm d, yyyy")} /{" "}
                {dateFormat(i.end, "mmm d, yyyy")}
              </Box>
            </Box>
            <Box sx={{ width: "15%", display: deviceWrapper("none", "flex") }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid",
                  borderColor: "primary.main",
                  color: "primary.main",
                  p: ".3rem",
                  borderRadius: "1rem",
                  fontSize: ".7rem",
                  pt: ".1rem",
                  pb: ".1rem",
                }}
              >
                {i.type}
              </Box>
            </Box>
            <Box
              sx={{
                width: "20%",
                display: deviceWrapper("none", "flex"),
                pl: "1rem",
              }}
            >
              {i.amount} {i.ticker}
            </Box>
            <Box
              sx={{
                width: "20%",
                pl: ".5rem",
                display: deviceWrapper("none", "flex"),
                alignItems: "center",
                color:
                  i.status === "Active"
                    ? "primary.lightSuccess"
                    : "tokenAlert.main",
              }}
            >
              <CircleIcon sx={{ fontSize: "1rem", mr: ".3rem" }} /> {i.status}
            </Box>
            <Box
              sx={{
                width: "15%",
                display: deviceWrapper("none", "flex"),
                justifyContent: "center",
                borderLeft: "1px solid",
                borderLeftColor: "border.main",
              }}
            >
              <Button>View</Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default CurrentDistributions;
