import { Badge, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BarChartIcon from "@mui/icons-material/BarChart";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DiamondIcon from "@mui/icons-material/Diamond";
import GroupsIcon from "@mui/icons-material/Groups";
import MovingIcon from "@mui/icons-material/Moving";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import BalanceIcon from "@mui/icons-material/Balance";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GridViewIcon from "@mui/icons-material/GridView";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FaceIcon from "@mui/icons-material/Face";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BoltIcon from "@mui/icons-material/Bolt";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import Link from "next/link";
import { useDaoSlugs } from "@hooks/useDaoSlugs";

const BasicLink: React.FC<{
  icon: JSX.Element;
  title: string;
  selected: boolean;
  set: Function;
  m?: string;
  ml?: string;
  notifications?: number;
}> = (props) => {
  const router = useRouter()
  const { dao } = router.query;
  const [daoName, setDaoName] = useState('')

  useEffect(() => {
    if (router.isReady && dao != undefined) {
      setDaoName(dao.toString())
    }
  }, [router.isReady])
  const linkLookup = {
    Dashboard: daoName ? `/${daoName}` : "",
    All: daoName ? `/${daoName}/proposals` : "",
    Following: daoName
      ? `/${daoName}/proposals/following`
      : "",
    Mine: daoName
      ? `/${daoName}/proposals/mine`
      : "",
    Past: daoName
      ? `/${daoName}/proposals/past`
      : "",
    Treasury: daoName
      ? `/${daoName}/financials/treasury`
      : "",
    Tokenomics: daoName
      ? `/${daoName}/financials/tokenomics`
      : "",
    Recurring: daoName
      ? `/${daoName}/financials/recurring`
      : "",
    Token: daoName
      ? `/${daoName}/financials/token`
      : "",
    Distributions: daoName
      ? `/${daoName}/financials/distributions`
      : "",
    Staking: daoName ? `/${daoName}/staking` : "",
    Members: daoName ? `/${daoName}/members` : "",
    Activity: daoName
      ? `/${daoName}/activity`
      : "",
    "Edit profile": daoName
      ? `/${daoName}/profile/edit`
      : "",
    Notifications: daoName
      ? `/${daoName}/notifications/edit`
      : "",
    Wallet: daoName ? `/${daoName}/wallet` : "",

    "DAO Config": daoName
      ? `/${daoName}/dao-config`
      : "",
  };

  return (
    <Link href={linkLookup[props.title as keyof typeof linkLookup]}>
      <Box
        sx={{
          width: "100%",
          mt: props.m === undefined ? ".25rem" : props.m,
          mb: props.m === undefined ? ".25rem" : props.m,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: ".7rem",
            cursor: "pointer",
            color: props.selected ? "primary.main" : "text.primary",
            ":hover": {
              backgroundColor: "linkHover.main",
            },
          }}
          onClick={() => props.set(props.title)}
        >
          <Box
            sx={{
              backgroundColor: props.selected
                ? "secondary.main"
                : "transparent",
              height: "2rem",
              width: ".15rem",
              borderTopRightRadius: ".5rem",
              borderBottomRightRadius: ".5rem",
              mr: "auto",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              pt: ".25rem",
              pb: ".25rem",
              ml: ".5rem",
              mr: "auto",
              borderTopLeftRadius: ".3rem",
              borderBottomLeftRadius: ".3rem",
              pl: ".5rem",
              width: "100%",
              alignItems: "center",
              backgroundColor: props.selected
                ? "linkHover.main"
                : "transparent",
            }}
          >
            <Box
              sx={{
                width: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: ".5rem",
                ml: props.ml === undefined ? 0 : props.ml,
                color: props.selected ? "primary.main" : "inherit",
              }}
            >
              {props.icon}
            </Box>
            <Box sx={{ width: "73.5%" }}>{props.title}</Box>
            {props.notifications > 0 && (
              <Box sx={{ width: "10%" }}>
                <Badge
                  color="primary"
                  badgeContent={props.notifications}
                  sx={{ pt: ".1rem" }}
                  max={10}
                ></Badge>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

const DropdownLink: React.FC<{
  icon: JSX.Element;
  title: string;
  selected: boolean;
  set: Function;
  subSelected: string;
  links: JSX.Element;
  disabled?: boolean;
}> = (props) => {
  return (
    <Accordion
      disabled={props.disabled}
      sx={{
        backgroundColor: "transparent",
        color: props.selected ? "primary.main" : "text.primary",
        pl: 0,
        ml: 0,
        mt: ".25rem",
        mb: ".25rem",
        "&:before": {
          display: "none",
        },
      }}
      disableGutters
      elevation={0}
      expanded={props.selected}
    >
      <AccordionSummary
        onClick={() =>
          props.selected ? props.set(undefined) : props.set(props.title)
        }
        expandIcon={
          <Box
            sx={{
              pl: "1rem",
              pr: "1rem",
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent",
              width: "3.5rem",
              height: "2rem",
              minHeight: 0,
            }}
          >
            <ExpandMoreIcon
              sx={{
                color: props.selected ? "primary.main" : "text.primary",
              }}
            />
          </Box>
        }
        id="panel1a-header"
        sx={{
          height: "2rem",
          ml: 0,
          pl: 0,
          pr: 0,
          pt: 0,
          pb: 0,
          minHeight: 0,
          ":hover ": {
            backgroundColor: "linkHover.main",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            mt: "-1rem",
            mb: "-1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: ".7rem",
              cursor: "pointer",
              width: "100%",
              color: props.selected ? "primary.main" : "text.primary",
            }}
            onClick={() => props.set(props.title)}
          >
            <Box
              sx={{
                mr: "auto",
                width: ".2rem",
                height: "2rem",
                backgroundColor:
                  props.selected && props.subSelected === undefined
                    ? "backgroundColor.main"
                    : "transparent",
                ":hover ": {
                  backgroundColor: "linkHover.main",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor:
                    props.selected && props.subSelected === undefined
                      ? "secondary.main"
                      : "transparent",
                  height: "2rem",
                  width: ".15rem",
                  borderTopRightRadius: ".5rem",
                  borderBottomRightRadius: ".5rem",
                  mr: "auto",
                }}
              ></Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                pt: ".5rem",
                pb: ".5rem",
                ml: ".5rem",
                mr: "auto",
                borderTopLeftRadius: ".3rem",
                borderBottomLeftRadius: ".3rem",
                pl: ".5rem",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "10%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: ".65rem",
                  ml: ".1rem",
                  color: props.selected ? "primary.main" : "inherit",
                }}
              >
                {props.icon}
              </Box>
              <Box sx={{ width: "100%" }}>{props.title}</Box>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ opacity: 1, color: "text.primary", p: 0 }}>
        {props.links}
      </AccordionDetails>
    </Accordion>
  );
};

// change to accordion.... still use list structure, but change components
// accordion should go inside a scollable wrapper.

export interface ISideNavComponent {
  setShowMobile?: (val: boolean) => void;
}

const Contents: React.FC<ISideNavComponent> = (props) => {
  const router = useRouter();
  const path = router.asPath;

  const getSelected = (): string => {
    if (path.includes("proposals")) {
      return "Proposals";
    } else if (path.includes("financials")) {
      return "Financials";
    } else if (path.includes("staking")) {
      return "Staking";
    } else if (path.includes("distributions")) {
      return "Distributions";
    } else if (path.includes("members")) {
      return "Members";
    } else if (path.includes("activity")) {
      return "Activity";
    } else if (
      path.includes("settings") ||
      path.includes("wallet") ||
      path.includes("profile/edit") ||
      path.includes("notifications/edit")
    ) {
      return "Settings";
    } else if (path.includes("config")) {
      return "DAO Config";
    } else {
      return "Dashboard";
    }
  };

  const getSubSelected = (): string => {
    if (path.includes("profile/edit")) {
      return "Edit profile";
    } else if (path.includes("notifications/edit")) {
      return "Notifications";
    } else if (path.includes("/wallet")) {
      return "Wallet";
    } else if (path.includes("/financials/treasury")) {
      return "Treasury";
    } else if (path.includes("/financials/tokenomics")) {
      return "Tokenomics";
    } else if (path.includes("/financials/recurring")) {
      return "Recurring";
    } else if (path.includes("/financials/token")) {
      return "Token";
    } else if (path.includes("/proposals/all")) {
      return "All";
    } else if (path.includes("/proposals/following")) {
      return "Following";
    } else if (path.includes("/proposals/mine")) {
      return "Mine";
    } else if (path.includes("/proposals/past")) {
      return "Past";
    } else {
      return "";
    }
  };

  const [selected, setSelected] = React.useState<string>(getSelected());
  const [subSelected, setSubSelected] = React.useState<string>(
    getSubSelected()
  );
  const setWrapper = (v: string) => {
    if (v !== "Distributions") {
      setSubSelected(undefined);
      setSelected(v);
      if (["Proposals", "Financials", "Settings"].indexOf(v) === -1) {
        props.setShowMobile(false);
      }
    }
  };
  const setSubWrapper = (v: string) => {
    setSubSelected(v);

    props.setShowMobile(false);
  };

  React.useEffect(() => {
    setSelected(getSelected());
    setSubSelected(getSubSelected());
  }, [router]);

  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  let categories = [
    { icon: <BarChartIcon sx={{ opacity: ".8" }} />, label: "Dashboard" },
    {
      icon: <BalanceIcon sx={{ opacity: ".8" }} />,
      label: "Proposals",
      links: (
        <>
          <BasicLink
            icon={<GridViewIcon sx={{ opacity: ".8" }} />}
            title={"All"}
            selected={"All" === subSelected}
            set={setSubWrapper}
            ml=".5rem"
          />
          <BasicLink
            icon={<FavoriteIcon sx={{ opacity: ".8" }} />}
            title={"Following"}
            selected={"Following" === subSelected}
            set={setSubWrapper}
            ml=".5rem"
          />
          {globalContext.api.daoUserData && (
            <BasicLink
              icon={<FaceIcon sx={{ opacity: ".8" }} />}
              title={"Mine"}
              selected={"Mine" === subSelected}
              set={setSubWrapper}
              ml=".5rem"
            />
          )}
          <BasicLink
            icon={<AccessTimeFilledIcon sx={{ opacity: ".8" }} />}
            title={"Past"}
            selected={"Past" === subSelected}
            set={setSubWrapper}
            ml=".5rem"
          />
        </>
      ),
    },
    // {
    //   icon: <AttachMoneyIcon sx={{ opacity: ".8" }} />,
    //   label: "Financials",
    //   links: (
    //     <>
    //       <BasicLink
    //         icon={<AccountBalanceIcon sx={{ opacity: ".8" }} />}
    //         title={"Treasury"}
    //         selected={"Treasury" === subSelected}
    //         set={setSubWrapper}
    //         ml=".5rem"
    //       />
    //       <BasicLink
    //         icon={<DonutSmallIcon sx={{ opacity: ".8" }} />}
    //         title={"Tokenomics"}
    //         selected={"Tokenomics" === subSelected}
    //         set={setSubWrapper}
    //         ml=".5rem"
    //       />
    //       <BasicLink
    //         icon={<AutorenewIcon sx={{ opacity: ".8" }} />}
    //         title={"Recurring"}
    //         selected={"Recurring" === subSelected}
    //         set={setSubWrapper}
    //         ml=".5rem"
    //       />
    //       <BasicLink
    //         icon={<BoltIcon sx={{ opacity: ".8" }} />}
    //         title={"Token"}
    //         selected={"Token" === subSelected}
    //         set={setSubWrapper}
    //         ml=".5rem"
    //       />
    //     </>
    //   ),
    // },
    // {
    //   icon: <AutoAwesomeIcon sx={{ opacity: ".8" }} />,
    //   label: "Distributions",
    // },
    // { icon: <DiamondIcon sx={{ opacity: ".8" }} />, label: "Staking" },
    { icon: <GroupsIcon sx={{ opacity: ".8" }} />, label: "Members" },
    {
      icon: <MovingIcon sx={{ opacity: ".8" }} />,
      label: "Activity",
      notifications: 0,
    },
    globalContext.api.daoUserData === undefined
      ? undefined
      : {
          icon: <SettingsIcon sx={{ opacity: ".8" }} />,
          label: "Settings",
          links: (
            <>
              <BasicLink
                icon={<PersonIcon sx={{ opacity: ".8" }} />}
                title={"Edit profile"}
                selected={"Edit profile" === subSelected}
                set={setSubWrapper}
                ml=".5rem"
              />
              <BasicLink
                icon={<EditNotificationsIcon sx={{ opacity: ".8" }} />}
                title={"Notifications"}
                selected={"Notifications" === subSelected}
                set={setSubWrapper}
                ml=".5rem"
              />
              <BasicLink
                icon={<AccountBalanceWalletIcon sx={{ opacity: ".8" }} />}
                title={"Wallet"}
                selected={"Wallet" === subSelected}
                set={setSubWrapper}
                ml=".5rem"
              />
            </>
          ),
        },
    {
      icon: <DisplaySettingsIcon sx={{ opacity: ".8" }} />,
      label: "DAO Config",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        mb: "1rem",
        height: "75%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {categories
        .filter((i: any) => i !== undefined)
        .map((i: any, c: number) =>
          ["Proposals", "Financials", "Settings"].indexOf(i.label) > -1 ? (
            <DropdownLink
              title={i.label}
              set={setWrapper}
              subSelected={subSelected}
              icon={i.icon}
              selected={i.label === selected}
              links={i.links}
              key={"nav-contents-key-" + c}
            />
          ) : (
            <BasicLink
              icon={i.icon}
              title={i.label}
              selected={i.label === selected}
              set={setWrapper}
              notifications={i.notifications}
              key={"nav-contents-key-" + c}
            />
          )
        )}
    </Box>
  );
};

export default Contents;
