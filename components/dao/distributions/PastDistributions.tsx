import { Subheader } from "@components/creation/utilities/HeaderComponents";
import { Box } from "@mui/material";
import * as React from "react";
import { DistributionCard, IDistributionCard } from "./CurrentDistributions";

const temp = new Date();
temp.setTime(temp.getTime() + 40);

const pastDistributions: IDistributionCard[] = [
  {
    id: 1,
    name: "Seed round 0",
    startDate: new Date(),
    endDate: temp,
    amount: "10,000",
    type: "Airdrop",
    status: "Finished",
  },
  {
    id: 2,
    name: "Seed round 2",
    startDate: new Date(),
    endDate: temp,
    amount: "30,000",
    type: "Public Sale",
    status: "Finished",
  },
];

const PastDistributions: React.FC = () => {
  return (
    <Box sx={{ mt: "1rem" }}>
      <Subheader title="Past distributions" />
      {pastDistributions.map((i: IDistributionCard, c: number) => (
        <DistributionCard {...i} key={`${c}-past-distribution-card`} />
      ))}
    </Box>
  );
};

export default PastDistributions;
