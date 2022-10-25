import { modalBackground } from "@components/utilities/modalBackground";
import { Avatar, Box, Button, Modal } from "@mui/material";
import * as React from "react";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useRouter } from "next/router";
import Link from "next/link";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import ThemeToggle from "./ThemeToggle";
import {
  DAPP_CONNECTED,
  WALLET_ADDRESS,
  WALLET_ADDRESS_LIST,
} from "@components/wallet/AddWallet";
import { useWallet } from "@components/wallet/WalletContext";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";

interface IProfilePopup {
  open: boolean;
  close: () => void;
}

interface IProfilePopupRow {
  icon: JSX.Element;
  title: string;
  link: string;
}

const ProfilePopupRow: React.FC<IProfilePopupRow> = (props) => {
  const router = useRouter();
  const { dao } = router.query;
  return (
    <Link
      href={dao === undefined ? `/${props.link}` : `/${dao}${props.link}`}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: ".25rem",
          mb: ".25rem",
          fontSize: ".9rem",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: "21%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: ".25rem",
            ml: ".25rem",
          }}
        >
          <Avatar
            sx={{
              color: "primary.main",
              backgroundColor: "primary.lightOpacity",
              height: "2.5rem",
              width: "2.5rem",
            }}
          >
            {props.icon}
          </Avatar>
        </Box>
        {props.title}
      </Box>
    </Link>
  );
};

const rows: IProfilePopupRow[] = [
  {
    icon: <PersonIcon />,
    title: "View profile",
    link: "/profile",
  },
  {
    icon: <EditIcon />,
    title: "Edit profile",
    link: "/profile/edit",
  },
  {
    icon: <EditNotificationsIcon />,
    title: "Notification settings",
    link: "/notifications/edit",
  },
  {
    icon: <AccountBalanceWalletIcon />,
    title: "Wallet",
    link: "/wallet",
  },
];

export const ProfilePopup: React.FC<IProfilePopup> = (props) => {
  const { setWallet, setDAppWallet } = useWallet();
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  return (
    <Modal open={props.open} onClose={props.close}>
      <Box
        sx={{
          ...modalBackground,
          p: 0,
          width: "17rem",
          right: "-8rem",
          top: "22.75rem",
          left: "",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            backgroundColor: "fileInput.main",
            borderRadius: ".3rem",
            pt: ".25rem",
          }}
          //   onClick={props.close}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderBottom: 1,
              borderBottomColor: "border.main",
            }}
            onClick={props.close}
          >
            {rows.map((i: IProfilePopupRow, c: number) => (
              <ProfilePopupRow {...i} key={`profile-popup-row-${c}`} />
            ))}
          </Box>
          <Box sx={{ mt: ".75rem", mb: ".75rem", ml: ".75rem" }}>
            <CapsInfo title="Appearance" small mb=".5rem" />
            <ThemeToggle />
          </Box>
          <Button
            sx={{
              width: "100%",
              borderRadius: 0,
              p: ".25rem",
              borderBottomRightRadius: ".3rem",
              borderBottomLeftRadius: ".3rem",
              borderTop: 1,
              borderTopColor: "border.main",
            }}
            size="small"
            onClick={() => {
              localStorage.setItem(WALLET_ADDRESS, "");
              localStorage.setItem(WALLET_ADDRESS_LIST, "[]");
              localStorage.setItem(DAPP_CONNECTED, "false");
              localStorage.setItem("jwt_token_login", "");
              localStorage.setItem("user_id", "");
              localStorage.setItem("alias", "");
              setWallet("");
              setDAppWallet({
                connected: false,
                addresses: [],
              });
              globalContext.api.setDaoUserData(undefined);
              props.close();
            }}
          >
            Disconnect wallet
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
