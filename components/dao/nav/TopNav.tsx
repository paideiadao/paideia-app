import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Slide,
  Skeleton,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";
import { deviceWrapper } from "@components/utilities/Style";
import MenuIcon from "@mui/icons-material/Menu";
import DaoBio from "./DaoBio";
import Contents from "./Contents";
import { useWallet } from "@components/wallet/WalletContext";
import ConnectWallet from "@components/wallet/ConnectWallet";
import {
  DAPP_CONNECTED,
  MOBILE_CONNECTED,
  WALLET_ADDRESS,
  WALLET_ADDRESS_LIST,
  isAddressValid,
} from "@components/wallet/AddWallet";
import { ProfilePopup } from "./ProfilePopup";
import { getWsUrl, snipAddress } from "@lib/utilities";
import NotificationsPopup from "./NotificationsPopup";
import CloseIcon from "@mui/icons-material/Close";
import { fetcher } from "@lib/utilities";
import useSWR from "swr";
import DarkSwitch from "@components/utilities/DarkSwitch";
import { useSession } from "next-auth/react";
import Link from "@components/Link";
import { trpc } from "@utils/trpc";

export interface INav {
  setShowMobile: (val: boolean) => void;
  showMobile: boolean;
  reduced?: boolean;
}

const TopNav: React.FC<INav> = (props) => {
  const theme = useTheme();
  const session = useSession();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();
  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const [open, setOpen] = useState(false);
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

  const [openProfile, setOpenProfile] = useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);
  const { dao } = router.query;
  const { wallet, utxos, dAppWallet } = useWallet();
  const [stakeAmount, setStakeAmount] = useState<number>(0);

  const clearWallet = () => {
    // clear state and local storage
    localStorage.setItem(WALLET_ADDRESS, "");
    localStorage.setItem(WALLET_ADDRESS_LIST, "[]");
    localStorage.setItem(DAPP_CONNECTED, "false");
    localStorage.setItem(MOBILE_CONNECTED, "false");
    localStorage.setItem("jwt_token_login", "");
    localStorage.setItem("user_id", "");
    localStorage.setItem("alias", "");
    globalContext.api?.setDaoUserData(undefined);
  };

  const closeNavOnResize = () => {
    props.setShowMobile(false);
  };
  useEffect(() => {
    window.addEventListener("resize", closeNavOnResize);
    closeNavOnResize();
    return () => window.removeEventListener("resize", closeNavOnResize);
  }, []);

  const userCache = trpc.userCache.updateCache.useMutation();
  useEffect(() => {
    if (
      globalContext.api?.daoUserData?.name &&
      globalContext.api?.daoData?.dao_url
    ) {
      userCache.mutate({
        name: globalContext.api.daoUserData.name,
        dao: globalContext.api.daoData.dao_url,
        profileImageUrl: globalContext.api?.daoUserData.profile_img_url,
      });
    }
  }, [
    globalContext.api?.daoUserData?.name,
    globalContext.api?.daoUserData?.profile_img_url,
    globalContext.api?.daoData?.dao_url,
  ]);

  useEffect(() => {
    if (dAppWallet.connected) {
      if (dao !== undefined && dao !== "") {
        if (globalContext.api?.daoUserData) {
          globalContext.api.setDaoUserData({
            ...globalContext.api.daoUserData,
            loading: true,
          });
        } else
          globalContext.api?.setDaoUserData({
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
      globalContext.api?.setDaoUserData(undefined);
    }
  }, [dao, wallet, dAppWallet.connected]);

  const { data: apiNotifications, error: notificationsError } = useSWR(
    globalContext.api?.daoUserData?.id &&
      `/notificatons/${globalContext.api?.daoUserData?.id}`,
    fetcher
  );

  const user_details_id = globalContext.api?.daoUserData?.id;
  const [liveNotifications, setLiveNotifications] = useState<any>([]);
  useEffect(() => {
    if (user_details_id) {
      const ws = new WebSocket(
        `${getWsUrl()}/notificatons/ws/${user_details_id}`
      );
      ws.onmessage = (event: any) => {
        try {
          const wsRes = JSON.parse(event.data).notifications;
          setLiveNotifications(wsRes);
        } catch (e) {
          console.log(e);
        }
      };
      return () => ws.close();
    }
  }, [user_details_id]);

  const notifications = liveNotifications.concat(
    (apiNotifications ?? []).filter(
      (x: { id: string }) =>
        !liveNotifications.map((nt: { id: string }) => nt.id).includes(x.id)
    )
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
    if (
      session.data === null &&
      session.status === "unauthenticated" &&
      notificationsError?.response?.status === 401
    ) {
      globalContext.api?.error(
        notificationsError.response.data.detail + " - Please login again."
      );
      setTimeout(() => {
        clearWallet();
        router.reload();
      }, 2000);
    }
  }, [notificationsError, session]);

  useEffect(() => {
    if (globalContext.api?.userStakeData) {
      const stake = globalContext.api.userStakeData;
      const stakeAmount = stake.stake_keys
        .map((stake: { stake: number }) => stake.stake)
        .reduce((a: number, c: number) => a + c, 0);
      setStakeAmount(stakeAmount);
    }
  }, [globalContext.api?.userStakeData]);

  return (
    <>
      {props.reduced ? (
        <>
          {globalContext.api?.daoUserData !== undefined &&
          globalContext.api.daoUserData.loading === true ? (
            <Box sx={{ width: { xs: "40px", md: "160px" } }}>
              <Skeleton
                variant={desktop ? "rounded" : "circular"}
                height={40}
              />
            </Box>
          ) : globalContext.api?.daoUserData !== undefined &&
            globalContext.api.daoUserData.name &&
            isAddressValid(wallet) ? (
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
                      {parseFloat(
                        (utxos.currentDaoTokens + stakeAmount).toFixed(0)
                      ).toLocaleString("en-US")}{" "}
                      {globalContext.api.daoData.tokenomics.token_ticker ??
                        "DAO Tokens"}
                    </Box>
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <></>
          )}
          <ConnectWallet show={globalContext.api?.daoUserData === undefined} />
        </>
      ) : (
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
              <IconButton
                color="primary"
                onClick={() => props.setShowMobile(true)}
              >
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
              <Button color="primary" variant="outlined" sx={{ mr: 1 }}>
                <Link href="https://docs.ergoplatform.com/eco/paideia/#using-paideia">
                  Getting Started
                </Link>
              </Button>
              <Box
                sx={{
                  mr:
                    globalContext.api?.daoUserData !== undefined
                      ? null
                      : "0.5rem",
                }}
              >
                <DarkSwitch />
              </Box>
              {globalContext.api?.daoUserData !== undefined && (
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
              )}
              {globalContext.api?.daoUserData !== undefined &&
              globalContext.api.daoUserData.loading === true ? (
                <Box sx={{ width: { xs: "40px", md: "160px" } }}>
                  <Skeleton
                    variant={desktop ? "rounded" : "circular"}
                    height={40}
                  />
                </Box>
              ) : globalContext.api?.daoUserData !== undefined &&
                globalContext.api.daoUserData.name &&
                isAddressValid(wallet) ? (
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
                          {snipAddress(
                            globalContext.api.daoUserData.name,
                            25,
                            5
                          )}
                        </Box>
                        <Box
                          sx={{ color: "text.secondary", fontSize: ".7rem" }}
                        >
                          {parseFloat(
                            (utxos.currentDaoTokens + stakeAmount).toFixed(0)
                          ).toLocaleString("en-US")}{" "}
                          {globalContext.api.daoData.tokenomics.token_ticker ??
                            "DAO Tokens"}
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {/* </Link> */}
                </>
              ) : (
                <></>
              )}
              <ConnectWallet
                show={globalContext.api?.daoUserData === undefined}
              />
            </Box>
            <Box sx={{ position: "relative" }}>
              <ProfilePopup open={openProfile} close={handleCloseProfile} />
              <NotificationsPopup
                open={open}
                close={handleClose}
                notifications={notifications.slice(0, 10)}
              />
            </Box>
          </Box>
          <Slide
            direction="right"
            in={props.showMobile}
            mountOnEnter
            unmountOnExit
          >
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
      )}
    </>
  );
};

export default TopNav;
