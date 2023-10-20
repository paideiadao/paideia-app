import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Slide,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { DarkTheme } from "@theme/theme";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { deviceWrapper } from "@components/utilities/Style";
import MenuIcon from "@mui/icons-material/Menu";
import DaoBio from "./DaoBio";
import Contents from "./Contents";
import { useWallet } from "@components/wallet/WalletContext";
import ConnectWallet from "@components/wallet/ConnectWallet";
import {
  DAPP_CONNECTED,
  WALLET_ADDRESS,
  WALLET_ADDRESS_LIST,
  isAddressValid,
} from "@components/wallet/AddWallet";
import { ProfilePopup } from "./ProfilePopup";
import { snipAddress } from "@lib/utilities";
import NotificationsPopup from "./NotificationsPopup";
import CloseIcon from "@mui/icons-material/Close";
import { fetcher } from "@lib/utilities";
import useSWR from "swr";
import DarkSwitch from "@components/utilities/DarkSwitch";

export interface INav {
  setShowMobile: (val: boolean) => void;
  showMobile: boolean;
}

const TopNav: React.FC<INav> = (props) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (dao !== undefined) {
      if (!desktop) {
        router.push(`/${dao}/notifications`);
      } else {
        setOpen(true);
      }
    }
  };
  const handleClose = () => setOpen(false);

  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);
  const { dao } = router.query;
  const { wallet, utxos, dAppWallet } = useWallet();

  const clearWallet = () => {
    // clear state and local storage
    localStorage.setItem(WALLET_ADDRESS, "");
    localStorage.setItem(WALLET_ADDRESS_LIST, "[]");
    localStorage.setItem(DAPP_CONNECTED, "false");
    localStorage.setItem("jwt_token_login", "");
    localStorage.setItem("user_id", "");
    localStorage.setItem("alias", "");
    globalContext.api.setDaoUserData(undefined);
  };

  const closeNavOnResize = () => {
    props.setShowMobile(false);
  };
  useEffect(() => {
    window.addEventListener("resize", closeNavOnResize);
    closeNavOnResize();
    return () => window.removeEventListener("resize", closeNavOnResize);
  }, []);

  useEffect(() => {
    if (wallet.connected || dAppWallet.connected) {
      if (dao !== undefined && dao !== "") {
        if (globalContext.api?.daoUserData != undefined) {
          globalContext.api.setDaoUserData({
            ...globalContext.api.daoUserData,
            loading: true,
          });
        } else
          globalContext.api.setDaoUserData({
            dao_id: 0,
            followers: [],
            following: [],
            id: 0,
            level: 0,
            name: "",
            social_links: [],
            user_id: 0,
            xp: 0,
            bio: "",
            profile_img_url: "",
            address: "",
            created: 0,
            loading: true,
          });
      }
    } else {
      globalContext.api.setDaoUserData(undefined);
    }
  }, [dao, wallet.connected, dAppWallet.connected]);

  const { data: notifications, error: notificationsError } = useSWR(
    globalContext.api?.daoUserData?.id &&
      `/notificatons/${globalContext.api?.daoUserData?.id}`,
    fetcher,
    { refreshInterval: 10000 }
  );

  const unreadCount = notifications
    ? notifications
        .map((notification: { is_read: boolean }) =>
          notification.is_read ? 0 : 1
        )
        .reduce((a: number, c: number) => a + c, 0)
    : null;

  useEffect(() => {
    globalContext.metadata.setMetadata({
      ...globalContext.metadata.metadata,
      unreadNotificationCount: unreadCount,
    });
  }, [unreadCount]);

  useEffect(() => {
    if (notificationsError?.response?.status === 401) {
      globalContext.api.error(
        notificationsError.response.data.detail +
          " - Please reconnect your wallet and refresh"
      );
      setTimeout(() => {
        clearWallet();
        router.reload();
      }, 2000);
    }
  }, [notificationsError]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          p: ".5rem",
          borderBottom: "1px solid",
          borderBottomColor: "border.main",
          display: "flex",
          backgroundColor: "backgroundColor.main",
          zIndex: 1000,
          position: "sticky",
          top: 0,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1, display: deviceWrapper("flex", "none") }}>
          <IconButton color="primary" onClick={() => props.setShowMobile(true)}>
            <MenuIcon color="primary" />
          </IconButton>
        </Box>
        <Box
          sx={{
            color: "text.primary",
            backgroundColor: "backgroundColor.main",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box>
            <DarkSwitch />
          </Box>
          <Box sx={{ mr: "0.5rem" }}>
            <IconButton
              onClick={handleOpen}
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              <Badge
                badgeContent={
                  globalContext.metadata.metadata.unreadNotificationCount
                }
                color="primary"
              >
                <NotificationsIcon
                  sx={{
                    fontSize: "18px",
                  }}
                />
              </Badge>
            </IconButton>
          </Box>
          {globalContext.api.daoUserData !== undefined &&
          globalContext.api.daoUserData.loading === true ? (
            <Box sx={{ width: { xs: "40px", md: "160px" } }}>
              <Skeleton
                variant={desktop ? "rounded" : "circular"}
                height={40}
              />
            </Box>
          ) : (
            globalContext.api.daoUserData !== undefined &&
            isAddressValid(wallet) && (
              <>
                {globalContext.api.daoUserData !== undefined && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      mr: { xs: "none", md: ".5rem" },
                    }}
                    onClick={handleOpenProfile}
                  >
                    <Avatar
                      sx={{
                        mr: { xs: "none", md: ".5rem" },
                        height: "32px",
                        width: "32px",
                      }}
                      src={globalContext.api.daoUserData.profile_img_url}
                    ></Avatar>
                    <Box
                      sx={{
                        display: deviceWrapper("none", "flex"),
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Box sx={{ fontSize: ".9rem" }}>
                        {snipAddress(globalContext.api.daoUserData.name, 25, 5)}
                      </Box>
                      <Box sx={{ color: "text.secondary", fontSize: ".7rem" }}>
                        {utxos.currentDaoTokens}{" "}
                        {globalContext.api.daoData.tokenomics.token_ticker}
                      </Box>
                    </Box>
                  </Box>
                )}
                {/* </Link> */}
              </>
            )
          )}
          <ConnectWallet show={globalContext.api.daoUserData === undefined} />
        </Box>
        <Box sx={{ position: "relative" }}>
          <ProfilePopup open={openProfile} close={handleCloseProfile} />
          <NotificationsPopup
            open={open}
            close={handleClose}
            notifications={notifications}
          />
        </Box>
      </Box>
      <Slide direction="right" in={props.showMobile} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: "16rem",
            zIndex: 1000,
            backgroundColor: "backgroundColor.main",
            borderRight: "1px solid",
            borderRightColor: "border.main",
            color: "text.primary",
            // borderBottom: "1px solid",
            height: "100vh",
            // borderBottomColor: "border.main",
            position: "fixed",
            top: 0,
          }}
        >
          <IconButton
            onClick={() => props.setShowMobile(false)}
            sx={{
              left: ".5rem",
              top: ".5rem",
              position: "absolute",
              zIndex: 1001,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ width: "100%", position: "relative", height: "100%" }}>
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
                height: "100%",
              }}
            >
              <DaoBio setShowMobile={props.setShowMobile} />
              <Contents setShowMobile={props.setShowMobile} />
            </Box>
          </Box>

          {/* <Footer /> */}
        </Box>
      </Slide>
    </>
  );
};

export default TopNav;
