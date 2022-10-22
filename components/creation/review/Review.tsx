import { Alert, Box, Button, AlertTitle, Modal } from "@mui/material";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CreationContext } from "../../../lib/creation/Context";
import { Header } from "../utilities/HeaderComponents";
import ReviewDrawer from "./ReviewDrawer";
import { modalBackground } from "../../utilities/modalBackground";
import Router from "next/router";
import { deviceStruct } from "@components/utilities/Style";

const Review: React.FC = () => {
  const creationContext = React.useContext(CreationContext);
  let data = creationContext.api.data;
  const [publish, setPublish] = React.useState<boolean>(false);
  return (
    <Box
      sx={{
        width: deviceStruct("93%", "93%", "70%", "70%", "70%"),
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: "text.primary",
      }}
    >
      <Box>
        <Button
          onClick={() =>
            creationContext.api.setData({
              ...data,
              navStage: data.navStage - 1,
            })
          }
          size="small"
        >
          <ArrowBackIcon sx={{ mr: ".5rem", fontSize: "1rem" }} />
          Back
        </Button>
      </Box>
      <Header
        title="Review"
        large={true}
        subtitle="Check once more that your DAO configuration is correct. Remember, you can always publish it as a draft and review it later on."
      />
      <ReviewDrawer />
      <Box
        sx={{
          width: "100%",
          mt: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ width: "49%", mr: ".5rem" }}
          variant="outlined"
          onClick={() =>
            creationContext.api.setData({ ...data, draftModal: true })
          }
        >
          <Box
            sx={{
              display: deviceStruct("none", "none", "block", "block", "block"),
            }}
          >
            Publish as a draft
          </Box>
          <Box
            sx={{
              display: deviceStruct("block", "block", "none", "none", "none"),
            }}
          >
            Publish Draft
          </Box>
        </Button>
        <Button
          sx={{ width: "49%", ml: ".5rem" }}
          variant="contained"
          onClick={() => setPublish(true)}
        >
          Publish DAO
        </Button>
      </Box>
      <Box sx={{ mt: "1rem" }}>
        <Alert severity="warning" color="warning" sx={{ fontSize: ".8rem" }}>
          <AlertTitle sx={{ fontSize: ".9rem" }}>Draft publishing</AlertTitle>
          <Box sx={{ ml: "-1.75rem" }}>
            Publishing as a draft allows you to see the DAO configuation before
            committing to it. You will be able to change any configuration
            (except name and URL). When you publish as a draft the users you
            whitelisted won't be notified and nothing will happen until you are
            ready to do the FINAL publish.
          </Box>
        </Alert>
      </Box>
      <Modal
        open={publish}
        onClose={() => setPublish(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...modalBackground,
            width: deviceStruct("90%", "90%", "35%", "35%", "35%"),
          }}
        >
          <Box sx={{ fontSize: "1.1rem", fontWeight: 450 }}>
            You are about to publish the final version of your DAO
          </Box>

          <Box sx={{ mt: "1rem", fontSize: ".9rem" }}>
            Once you publish the DAO any configuration change would have to be
            done through the proposal system. Also, keep in mind that tokens
            will be minted and distributed instantly as your Tokenomics
            configuration.
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              mt: "1rem",
            }}
          >
            <Box sx={{ ml: "auto" }}>
              <Button sx={{ mr: "1rem" }} onClick={() => setPublish(false)}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  // creationContext.api.setData({
                  //   ...data,
                  //   isDraft: 0,
                  //   isPublished: 1,
                  // });
                  let res = await creationContext.api.createDao(false);
                  if (res) {
                    Router.push(`/dao/${res.data.dao_name.toLowerCase()}`);
                  } else {
                    creationContext.api.api.error(
                      "Connection issue, please submit again."
                    );
                  }
                }}
              >
                Publish DAO
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Review;
