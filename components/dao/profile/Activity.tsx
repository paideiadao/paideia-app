import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box, Avatar } from "@mui/material";
import * as React from "react";
import { IActivity } from "../activity/Activity";
import ActivityRow from "../activity/Activity";

const Activity: React.FC<{ activities: IActivity[] }> = (props) => {
  return (
    <Box>
      <CapsInfo title={`User Activity`} />
      {props.activities.map((i: any, c: number) => (
        <ActivityRow i={i} c={c} key={c} />
      ))}
    </Box>
  );
};

export default Activity;
