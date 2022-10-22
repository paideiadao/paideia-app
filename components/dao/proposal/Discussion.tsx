import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import Divider from "@components/utilities/Divider";
import { Box } from "@mui/material";
import * as React from "react";
import Comments from "../discussion/Comments";

const Discussion: React.FC = () => {
  return (
    <>
      <CapsInfo title="Discussion Content" />
      <Box
        dangerouslySetInnerHTML={{
          __html: "<p>Attachments should have a separate tab!</p>",
        }}
      ></Box>
      <Divider />
      <Comments title="Dicussion Comments" data={[]} id={0} />
    </>
  );
};

export default Discussion;
