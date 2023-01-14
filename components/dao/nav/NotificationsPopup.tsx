import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { modalBackground } from "@components/utilities/modalBackground";
import { Modal, Button, Box } from "@mui/material";
import { Notification } from "@pages/[dao]/notifications";
import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/router";

interface INotificationsPopup {
  open: boolean;
  close: () => void;
  notifications?: any[];
}

const NotificationsPopup: React.FC<INotificationsPopup> = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const router = useRouter();
  const { dao } = router.query;

  return (
    <Modal open={props.open} onClose={props.close}>
      <Box
        sx={{
          ...modalBackground,
          p: 0,
          width: "30rem",
          right: "-12rem",
          top: "18.3rem",
          left: "",
        }}
      >
        <Box
          sx={{
            backgroundColor: "fileInput.main",
            p: ".5rem",
            pl: "1rem",
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderTopLeftRadius: ".2rem",
            borderTopRightRadius: ".2rem",
            borderBottom: "1px solid",
            borderBottomColor: "border.main",
          }}
        >
          <CapsInfo title="Notifications" mb={"0"} />
          <Box sx={{ ml: "auto" }}>
            <Button
              size="small"
              sx={{ whiteSpace: "nowrap" }}
              onClick={() =>
                globalContext.api
                  ?.markNotificationsAsRead(
                    props.notifications ? props.notifications[0].id : 0
                  )
                  .then(() => {
                    globalContext.metadata.setMetadata({
                      ...globalContext.metadata.metadata,
                      unreadNotificationCount: 0,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }
            >
              Mark all as read
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: "25rem", overflowY: "scroll" }}>
          {props.notifications ? (
            props.notifications.map((i: any, c: number) => {
              return (
                <Notification
                  c={c}
                  i={i}
                  m={"0"}
                  key={"notification-key-modal-" + c}
                />
              );
            })
          ) : (
            <Box sx={{ p: 2 }}>Reading your Notifications...</Box>
          )}
        </Box>
        <Box
          sx={{
            position: "relative",
            bottom: "0",
            left: "0",
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "fileInput.main",
            justifyContent: "center",
            borderBottomRightRadius: ".3rem",
            borderBottomLeftRadius: ".3rem",
          }}
          onClick={props.close}
        >
          <Link href={dao === undefined ? "" : `/${dao}/notifications`}>
            <Button
              sx={{
                width: "100%",
                borderRadius: 0,
                p: ".75rem",
                borderBottomRightRadius: ".3rem",
                borderBottomLeftRadius: ".3rem",
              }}
              size="small"
            >
              View All
            </Button>
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};

export default NotificationsPopup;
