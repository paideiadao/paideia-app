import { Avatar, Box, Button } from "@mui/material";
import * as React from "react";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import ImagePlaceholder from "../../../public/images/image-placeholder.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CircleIcon from "@mui/icons-material/Circle";
import Chip from "@components/utilities/Chip";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import dateFormat from "dateformat";
import { paths, props } from "@lib/DaoPaths";
import { useRouter } from "next/router";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";
import BackLink from "@components/utilities/BackLink";

// export const getStaticPaths = paths;
// export const getStaticProps = props;
let temp = new Date(),
  temp1 = new Date(),
  temp2 = new Date(),
  temp3 = new Date(),
  temp4 = new Date();
// should display hours
temp1.setTime(temp.getTime() - 6 * 60 * 60 * 1000);
// should display days
temp2.setDate(temp.getDate() - 5);
// should display months
temp3.setDate(temp.getDate() - 100);
temp4.setTime(temp.getTime() - 0.5 * 60 * 60 * 1000);

export interface INotification {
  img: string;
  action: string;
  username: string;
  date: Date;
  isread: number;
  proposalname: string;
  id: number;
}

export const newNotifications: INotification[] = [
  {
    img: ImagePlaceholder.src,
    username: "<User name>",
    action: "action description for",
    proposalname: "<Proposal name>",
    date: temp4, // less than 1 hour, show minutes. less than 1 day, show hours. less than 1 month show days. less than 1 year, show years.
    isread: 1,
    id: 1,
  },
  {
    img: ImagePlaceholder.src,
    username: "<User name>",
    action: "action description for",
    proposalname: "<Proposal name>",
    date: temp1, // less than 1 hour, show minutes. less than 1 day, show hours. less than 1 month show days. less than 1 year, show years.
    isread: 0,
    id: 2,
  },
  {
    img: ImagePlaceholder.src,
    username: "<User name>",
    action: "action description for",
    proposalname: "<Proposal name>",
    date: temp2, // less than 1 hour, show minutes. less than 1 day, show hours. less than 1 month show days. less than 1 year, show years.
    isread: 0,
    id: 3,
  },
  {
    img: ImagePlaceholder.src,
    username: "<User name>",
    action: "action description for",
    proposalname: "<Proposal name>",
    date: temp3, // less than 1 hour, show minutes. less than 1 day, show hours. less than 1 month show days. less than 1 year, show years.
    isread: 1,
    id: 4,
  },
];

export const oldNotifications: INotification[] = [
  {
    img: ImagePlaceholder.src,
    username: "<User name>",
    action: "action description for",
    proposalname: "<Proposal name>",
    date: temp4, // less than 1 hour, show minutes. less than 1 day, show hours. less than 1 month show days. less than 1 year, show years.
    isread: 1,
    id: 5,
  },
  {
    img: ImagePlaceholder.src,
    username: "<User name>",
    action: "action description for",
    proposalname: "<Proposal name>",
    date: temp1, // less than 1 hour, show minutes. less than 1 day, show hours. less than 1 month show days. less than 1 year, show years.
    isread: 0,
    id: 6,
  },
  {
    img: ImagePlaceholder.src,
    username: "<User name>",
    action: "action description for",
    proposalname: "<Proposal name>",
    date: temp2, // less than 1 hour, show minutes. less than 1 day, show hours. less than 1 month show days. less than 1 year, show years.
    isread: 0,
    id: 7,
  },
  {
    img: ImagePlaceholder.src,
    username: "<User name>",
    action: "action description for",
    proposalname: "<Proposal name>",
    date: temp3, // less than 1 hour, show minutes. less than 1 day, show hours. less than 1 month show days. less than 1 year, show years.
    isread: 1,
    id: 8,
  },
];

const getNotificationCountdown = (date: Date) => {
  let _temp = new Date();
  let hours = Math.abs(_temp.getTime() - date.getTime()) / 36e5;
  if (hours < 1) {
    return (
      (hours * 60).toFixed(0) +
      " minute" +
      ((hours * 60).toFixed(0) === "1" ? "" : "s") +
      " ago"
    );
  } else if (hours <= 24) {
    return (
      hours.toFixed(0) +
      " hour" +
      (hours.toFixed(0) === "1" ? "" : "s") +
      " ago"
    );
  } else if (hours <= 24 * 7) {
    return (
      (hours / 24).toFixed(0) +
      " day" +
      ((hours / 24).toFixed(0) === "1" ? "" : "s") +
      " ago"
    );
  } else {
    return dateFormat(date, "mmmm dS, yyyy");
  }
};

const Notifications: React.FC<{ params: any }> = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [view, setView] = React.useState<string>("All");
  const router = useRouter();

  const { dao } = router.query;

  return (
    <Layout>
      <BackLink />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          mt: "1rem",
          fontSize: deviceWrapper("1.3rem", "1.6rem"),
          alignItems: "center",
        }}
      >
        <Box sx={{ display: deviceWrapper("none", "block") }}>
          Notifications (4 new)
        </Box>
        <Box sx={{ display: deviceWrapper("block", "none") }}>
          Notifications
        </Box>
        <Link
          href={
            dao === undefined
              ? "/dao/notifications/edit"
              : `/${dao}/notifications/edit`
          }
        >
          <Button
            sx={{ ml: "auto" }}
            variant="contained"
            size="small"
            endIcon={<SettingsIcon />}
          >
            <Box sx={{ display: deviceWrapper("none", "block") }}>
              Notification Settings
            </Box>
            <Box sx={{ display: deviceWrapper("block", "none") }}>Settings</Box>
          </Button>
        </Link>
      </Box>
      <Box sx={{ mt: ".5rem", display: "flex", alignItems: "center" }}>
        <Chip
          label="All"
          icon={<AppsIcon />}
          set={() => {
            setView("All");
          }}
          c={1}
          variant={view === "All" ? "contained" : "outlined"}
        />
        <Chip
          label="Unread"
          icon={<MarkunreadIcon />}
          set={() => {
            setView("Unread");
          }}
          c={1}
          variant={view === "Unread" ? "contained" : "outlined"}
        />
      </Box>
      <Box
        sx={{
          mt: "1rem",
          pb: "1rem",
          width: "100%",
        }}
      >
        <CapsInfo title="New" />
        {newNotifications.map((i: INotification, c: number) => {
          return <Notification i={i} c={c} />;
        })}
      </Box>
      <Box
        sx={{
          mt: "1rem",
          pb: "1rem",
        }}
      >
        <CapsInfo title="Old" />
        {oldNotifications.map((i: INotification, c: number) => {
          return <Notification i={i} c={c} />;
        })}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          display: deviceWrapper("flex", "none"),
          alignItems: "center",
          backgroundColor: "fileInput.main",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ width: "100%", borderRadius: 0, p: ".75rem" }}
          size="small"
        >
          Mark all as read
        </Button>
      </Box>
    </Layout>
  );
};

export const Notification: React.FC<{
  i: INotification;
  m?: string;
  c: number;
}> = (props) => {
  let i = props.i;
  return (
    <Box
      sx={{
        mt: props.m === undefined ? deviceWrapper("0", ".75rem") : props.m,
        mb: props.m === undefined ? deviceWrapper("0", ".75rem") : props.m,
        width: deviceWrapper("calc(100% + 2rem)", "100%"),
        display: "flex",
        alignItems: "center",
        p: "1rem",
        backgroundColor: i.isread === 0 ? "fileInput.read" : "fileInput.outer",
        borderRadius:
          props.m === undefined ? deviceWrapper("0", ".3rem") : "0rem",
        border: 1,
        borderColor: "border.main",
        cursor: "pointer",
        ml: deviceWrapper("-1rem", "0"),
      }}
    >
      <Avatar src={i.img} sx={{ width: "4rem", height: "4rem" }}></Avatar>
      <Box
        sx={{
          width: "70%",
          ml: "1rem",
          fontSize: deviceWrapper(".7REM", ".9rem"),
        }}
      >
        <Box>
          {i.username + " "}
          <Box sx={{ display: "inline", color: "text.secondary" }}>
            {i.action}
          </Box>
          {" " + i.proposalname}
        </Box>
        <Box
          sx={{
            fontSize: ".7rem",
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AccessTimeIcon sx={{ fontSize: "1rem", mr: ".2rem" }} />{" "}
          {getNotificationCountdown(i.date)}
        </Box>
      </Box>
      {i.isread === 0 && (
        <Box sx={{ ml: "auto" }}>
          <CircleIcon
            color="primary"
            sx={{ fontSize: deviceWrapper(".65rem", "1rem") }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Notifications;
