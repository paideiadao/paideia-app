import { Avatar, Badge, Box, IconButton, Slide } from "@mui/material";
import React, { useEffect } from "react";
import { GlobalContext, IGlobalContext } from "../../../lib/AppContext";
import { DarkTheme } from "@theme/theme";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { deviceWrapper } from "@components/utilities/Style";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeContext, IThemeContext } from "@lib/ThemeContext";
import LightFooter from "@public/dao/light-footer.png";
import DarkFooter from "@public/dao/dark-footer.png";
import DaoBio from "./DaoBio";
import Contents from "./Contents";
import { useWallet } from "@components/wallet/WalletContext";
import ConnectWallet from "@components/wallet/ConnectWallet";
import { isAddressValid } from "@components/wallet/AddWallet";
import { ProfilePopup } from "./ProfilePopup";
import { snipAddress } from "@lib/utilities";
import NotificationsPopup from "./NotificationsPopup";
import CloseIcon from '@mui/icons-material/Close';

export interface INav {
  setShowMobile: (val: boolean) => void;
  showMobile: boolean;
}

const TopNav: React.FC<INav> = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);
  const router = useRouter();
  const { dao } = router.query;
  const { wallet } = useWallet();
  const themeContext = React.useContext<IThemeContext>(ThemeContext);

  const closeNavOnResize = () => {
    props.setShowMobile(false)
  }
  useEffect(() => {
    window.addEventListener("resize", closeNavOnResize);
    closeNavOnResize();
    return () => window.removeEventListener("resize", closeNavOnResize);
  }, []);

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
        }}
      >
        <IconButton
          color="primary"
          onClick={() => props.setShowMobile(true)}
          sx={{ display: deviceWrapper("flex", "none") }}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <Box
          sx={{
            color: "text.primary",
            backgroundColor: "backgroundColor.main",
            ml: "auto",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            height: "2rem",
            mr: ".5rem",
          }}
        >
          {/* <DarkSwitch /> */}
          {globalContext.api.daoUserData !== undefined &&
            isAddressValid(wallet) && (
              <>
                <Box
                  sx={{
                    ml: ".5rem",
                    mr: ".5rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link href={dao === undefined ? "" : `/${dao}/notifications`}>
                    <IconButton sx={{ display: deviceWrapper("flex", "none") }}>
                      <Badge badgeContent={undefined} color="primary">
                        <NotificationsIcon
                          sx={{
                            fontSize: "1.1rem",
                            opacity:
                              globalContext.api.theme === DarkTheme
                                ? "1"
                                : ".5",
                          }}
                        />
                      </Badge>
                    </IconButton>
                  </Link>

                  <IconButton
                    onClick={handleOpen}
                    sx={{ display: deviceWrapper("none", "flex") }}
                  >
                    <Badge badgeContent={undefined} color="primary">
                      <NotificationsIcon
                        sx={{
                          fontSize: "1.1rem",
                          opacity:
                            globalContext.api.theme === DarkTheme ? "1" : ".5",
                        }}
                      />
                    </Badge>
                  </IconButton>
                </Box>
                {/* <Link
                href={dao === undefined ? "" : `${dao}/profile`}
              > */}
                {globalContext.api.daoUserData !== undefined && (
                  <Box
                    sx={{
                      ml: ".5rem",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      mr: ".5rem",
                    }}
                    onClick={handleOpenProfile}
                  >
                    <Avatar
                      sx={{ mr: ".5rem" }}
                      src={
                        globalContext.api.daoUserData !== undefined
                          ? globalContext.api.daoUserData.profile_img_url
                          : ""
                      }
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
                        Lvl {globalContext.api.daoUserData.level} |{" "}
                        {globalContext.api.daoUserData.level}
                      </Box>
                    </Box>
                  </Box>
                )}
                {/* </Link> */}
              </>
            )}
          <ConnectWallet show={globalContext.api.daoUserData === undefined} />
        </Box>
        <Box sx={{ position: "relative" }}>
          <ProfilePopup open={openProfile} close={handleCloseProfile} />
          <NotificationsPopup open={open} close={handleClose} />
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
            left: '.5rem',
            top: '.5rem',
            position: 'absolute',
            zIndex: 1001,
          }}
        >
          <CloseIcon />
        </IconButton>
          <Box sx={{ width: "100%", position: "relative", height: '100%' }}>

            <Box sx={{
              flexDirection: 'column',
              display: 'flex',
              height: '100%',
            }}>
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
