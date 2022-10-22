import { Subheader } from "@components/creation/utilities/HeaderComponents";
import { Box, Button } from "@mui/material";
import * as React from "react";
import dateFormat from "dateformat";
import { useRouter } from "next/router";
import Link from "next/link";

const temp = new Date();
temp.setTime(temp.getTime() + 40);

const myDistributions: IMyDistributionCard[] = [
  {
    id: 1,
    name: "Seed round 0",
    startDate: new Date(),
    endDate: temp,
    receivedAmount: "10,000",
    redeemableAmount: "30,000",
    futureRedemption: "700,000",
  },
  {
    id: 2,
    name: "Seed round 2",
    startDate: new Date(),
    endDate: temp,
    receivedAmount: "10,000",
    redeemableAmount: "30,000",
    futureRedemption: "700,000",
  },
];

interface IMyDistributionCard {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;

  receivedAmount: string;
  redeemableAmount: string;
  futureRedemption: string;
}

const MyDistributionCard: React.FC<IMyDistributionCard> = (props) => {
  const router = useRouter();
  const { id } = router.query;
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
        <Box sx={{ fontSize: ".9rem" }}>
          {props.receivedAmount} {ticker}
        </Box>
        <Box sx={{ fontSize: ".8rem" }}>received</Box>
      </Box>
      <Box sx={{ width: "22%" }}>
        <Box sx={{ fontSize: ".9rem" }}>
          {props.redeemableAmount} {ticker}
        </Box>
        <Box sx={{ fontSize: ".8rem" }}>available to redeem</Box>
      </Box>
      <Box sx={{ width: "22%" }}>
        <Box sx={{ fontSize: ".9rem" }}>
          {props.futureRedemption} {ticker}
        </Box>
        <Box sx={{ fontSize: ".8rem" }}>future redemption</Box>
      </Box>
      <Box sx={{ width: "8%", display: "flex" }}>
        <Link
          href={
            id === undefined
              ? `/dao/distribution/redeem/${props.id}`
              : `/dao/${id}/distribution/redeem/${props.id}`
          }
        >
          <Button variant="text" sx={{ ml: "auto" }}>
            Redeem
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

const MyDistributions: React.FC = () => {
  return (
    <Box sx={{ mt: "1rem" }}>
      <Subheader title="My distributions" />
      {myDistributions.map((i: IMyDistributionCard, c: number) => (
        <MyDistributionCard {...i} key={`${c}-my-distribution-card`} />
      ))}
    </Box>
  );
};

export default MyDistributions;
