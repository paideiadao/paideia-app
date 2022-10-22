import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box, Skeleton } from "@mui/material";
import * as React from "react";

export interface IDataComponent {
  data: any;
}

const DiscussionInfo: React.FC<IDataComponent> = (props) => {
  return (
    <>
      <CapsInfo title="Discussion Content" />
      {props.data === undefined ? (
        <Skeleton animation="wave" width="100%" />
      ) : (
        <Box
          dangerouslySetInnerHTML={{
            __html: props.data.content,
          }}
        ></Box>
      )}
    </>
  );
};

export default DiscussionInfo;
