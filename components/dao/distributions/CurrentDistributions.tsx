import { Subheader } from "@components/creation/utilities/HeaderComponents";
import { Box, Button, Chip } from "@mui/material";
import * as React from "react";
import dateFormat from "dateformat";
import CircleIcon from "@mui/icons-material/Circle";
import CellTowerIcon from "@mui/icons-material/CellTower";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Link from "next/link";
import { useRouter } from "next/router";

const temp = new Date();
temp.setTime(temp.getTime() + 40);

export const currentDistributions: IDistributionCard[] = [
  {
    id: 1,
    name: "Seed round 0",
    startDate: new Date(),
    endDate: temp,
    amount: "10,000",
    type: "Airdrop",
    status: "Soon",
  },
  {
    id: 2,
    name: "Seed round 2",
    startDate: new Date(),
    endDate: temp,
    amount: "30,000",
    type: "Public Sale",
    status: "Active",
  },
];

export interface IDistributionCard {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  type: string;
  amount: string;
  status: string;
}

export const DistributionCard: React.FC<IDistributionCard> = (props) => {
  const router = useRouter();
  const { dao } = router.query;
  const ticker = "PAI";
  return (
    <Box
      sx={{
        width: "100%",
        mt: ".5rem",
        mb: ".5rem",
        p: ".5rem",
        display: "flex",
        alignItems: "center",
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".3rem",
      }}
    >
      <Box sx={{ width: "26%" }}>
        <Box sx={{ fontSize: ".9rem" }}>{props.name}</Box>
        <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
          {dateFormat(props.startDate, "mmmm d, yyyy")} -{" "}
          {dateFormat(props.endDate, "mmmm d, yyyy")}
        </Box>
      </Box>
      <Box sx={{ width: "22%" }}>
        <Chip
          variant="outlined"
          icon={
            props.type === "Airdrop" ? (
              <CellTowerIcon sx={{ fontSize: "1.1rem", ml: ".5rem" }} />
            ) : (
              <AttachMoneyIcon sx={{ fontSize: "1.1rem", ml: ".5rem" }} />
            )
          }
          color="primary"
          sx={{ fontSize: ".7rem" }}
          label={props.type}
        />
      </Box>
      <Box sx={{ width: "22%" }}>
        {props.amount} {ticker}
      </Box>
      <Box
        sx={{
          width: "22%",
          display: "flex",
          alignItems: "center",
          fontSize: ".8rem",
          color:
            props.status === "Active"
              ? "primary.lightSuccess"
              : props.status === "Finished"
              ? "error.main"
              : "tokenAlert.main",
        }}
      >
        <CircleIcon sx={{ fontSize: "1rem", mr: ".3rem" }} />
        {props.status}
      </Box>
      <Box sx={{ width: "8%", display: "flex" }}>
        <Link
          href={
            dao === undefined
              ? ``
              : `/${dao}/distribution/${props.id}`
          }
        >
          <Button variant="text" sx={{ ml: "auto" }}>
            View
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

const CurrentDistributions: React.FC = () => {
  return (
    <Box sx={{ mt: "1rem" }}>
      <Subheader title="Current distributions" />
      {currentDistributions.map((i: IDistributionCard, c: number) => (
        <DistributionCard {...i} key={`${c}-current-distribution-card`} />
      ))}
    </Box>
  );
};

export default CurrentDistributions;
