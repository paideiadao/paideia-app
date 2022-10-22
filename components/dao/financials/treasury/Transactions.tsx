import Activity, { IActivity } from "@components/dao/activity/Activity";
import { Box, Button } from "@mui/material";
import * as React from "react";
import { Subheader } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";

const Transactions: React.FC = () => {
  // const transactionActivities = activities.filter(
  //   (i: IActivity) => i.category === "Transactions"
  // );
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Subheader title="Latest Transactions" />
        <Button variant="text" sx={{ ml: "auto" }} size="small">
          <Box sx={{ display: deviceWrapper("none", "block") }}>
            View all transations
          </Box>
          <Box sx={{ display: deviceWrapper("block", "none") }}>View all</Box>
        </Button>
      </Box>
      {[].map((i: any, c: number) => {
        return <Activity i={i} c={c} />;
      })}
    </Box>
  );
};

export default Transactions;
