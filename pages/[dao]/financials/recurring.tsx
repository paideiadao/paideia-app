import { Header } from "@components/creation/utilities/HeaderComponents";
import RecurringCard, {
  IRecurringCard,
} from "@components/dao/financials/recurring/RecurringCard";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";
import { Box } from "@mui/material";
import * as React from "react";
import { TreasuryInfo } from "./treasury";

const recurringPayments: IRecurringCard[] = [
  {
    username: "trappert",
    address: "9hqkhhDT2Px7HajPeaSHDiX5XsG3HAeK6mVhawdQZejUSgyzSxB",
    proposalName: "Proposal name",
    proposalUsername: "trappert",
    paymentSig: 535.38,
    paymentErg: 171.59,
    id: 1,
    frequency: "Monthly",
    startDate: new Date(),
  },
  {
    username: "trappert",
    address: "9hqkhhDT2Px7HajPeaSHDiX5XsG3HAeK6mVhawdQZejUSgyzSxB",
    proposalName: "Proposal name",
    proposalUsername: "trappert",
    paymentSig: 535.38,
    paymentErg: 171.59,
    id: 2,
    frequency: "Daily",
    startDate: new Date(),
  },
  {
    username: "trappert",
    address: "9hqkhhDT2Px7HajPeaSHDiX5XsG3HAeK6mVhawdQZejUSgyzSxB",
    proposalName: "Proposal name",
    proposalUsername: "trappert",
    paymentSig: 535.38,
    paymentErg: 171.59,
    id: 3,
    frequency: "Monthly",
    startDate: new Date(),
  },
  {
    username: "trappert",
    address: "9hqkhhDT2Px7HajPeaSHDiX5XsG3HAeK6mVhawdQZejUSgyzSxB",
    proposalName: "Proposal name",
    proposalUsername: "trappert",
    paymentSig: 535.38,
    paymentErg: 171.59,
    id: 4,
    frequency: "Daily",
    startDate: new Date(),
  },
  {
    username: "trappert",
    address: "9hqkhhDT2Px7HajPeaSHDiX5XsG3HAeK6mVhawdQZejUSgyzSxB",
    proposalName: "Proposal name",
    proposalUsername: "trappert",
    paymentSig: 535.38,
    paymentErg: 171.59,
    id: 5,
    frequency: "Yearly",
    startDate: new Date(),
  },
  {
    username: "trappert",
    address: "9hqkhhDT2Px7HajPeaSHDiX5XsG3HAeK6mVhawdQZejUSgyzSxB",
    proposalName: "Proposal name",
    proposalUsername: "trappert",
    paymentSig: 535.38,
    paymentErg: 171.59,
    id: 6,
    frequency: "Monthly",
    startDate: new Date(),
  },
  {
    username: "trappert",
    address: "9hqkhhDT2Px7HajPeaSHDiX5XsG3HAeK6mVhawdQZejUSgyzSxB",
    proposalName: "Proposal name",
    proposalUsername: "trappert",
    paymentSig: 535.38,
    paymentErg: 171.59,
    id: 7,
    frequency: "Daily",
    startDate: new Date(),
  },
  {
    username: "trappert",
    address: "9hqkhhDT2Px7HajPeaSHDiX5XsG3HAeK6mVhawdQZejUSgyzSxB",
    proposalName: "Proposal name",
    proposalUsername: "trappert",
    paymentSig: 535.38,
    paymentErg: 171.59,
    id: 8,
    frequency: "Monthly",
    startDate: new Date(),
  },
  {
    username: "trappert",
    address: "9hqkhhDT2Px7HajPeaSHDiX5XsG3HAeK6mVhawdQZejUSgyzSxB",
    proposalName: "Proposal name",
    proposalUsername: "trappert",
    paymentSig: 535.38,
    paymentErg: 171.59,
    id: 9,
    frequency: "Yearly",
    startDate: new Date(),
  },
];

const Recurring: React.FC = () => {
  return (
    <Layout width={deviceWrapper("92%", "95%")}>
      <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
        <Box sx={{ width: deviceWrapper("100%", "72%") }}>
          <Header
            title="Recurring payments"
            large
            subtitle="Recurring payments description here."
          />
          <Box sx={{ mt: "1rem" }} />
          {recurringPayments.map((i: IRecurringCard, c: number) => (
            <RecurringCard key={`recurring-card-${c}`} {...i} />
          ))}
          <Box
            sx={{
              width: "100%",
              display: deviceWrapper("block", "none"),
              mt: "1rem",
            }}
          >
            <TreasuryInfo />
          </Box>
        </Box>
        <Box
          sx={{
            width: "28%",
            position: "sticky",
            top: deviceWrapper("0", "4.8rem"),
            ml: "1.5rem",
            display: deviceWrapper("none", "block"),
          }}
        >
          <TreasuryInfo />
        </Box>
      </Box>
    </Layout>
  );
};

export default Recurring;
