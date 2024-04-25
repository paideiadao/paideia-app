import { Box, Button, InputBase, Paper } from "@mui/material";
import * as React from "react";
import BalanceIcon from "@mui/icons-material/Balance";
import CancelIcon from "@mui/icons-material/Cancel";
import QuadraticVoting from "./Actions/QuadraticVoting";
import {
  CapsInfo,
  Header,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import SearchIcon from "@mui/icons-material/Search";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import SendFunds from "./Actions/SendFunds";
import LiquidityPool from "./Actions/LiquidityPool";
import DaoDescription from "./Actions/DaoDescription";
import VoteDuration from "./Actions/VoteDuration";
import Support from "./Actions/Support";
import Quorum from "./Actions/Quorum";
import OptimisticGovernance from "./Actions/OptimisticGovernance";
import { deviceWrapper } from "@components/utilities/Style";
import ActionSelect from "./ActionSelect";
import { getData } from "../Options/DraggableContext";
import UpdateConfig from "./Actions/UpdateConfig";

export interface IActionType {
  title:
    | "Send Funds"
    | "Create Liquidity Pool"
    | "Change DAO's Description"
    | "Quadratic Voting"
    | "Vote Duration"
    | "Support"
    | "Quorum"
    | "Optimistic Governance"
    | "Update DAO Config"
    | undefined;
  subtitle: string;
  icon: JSX.Element;
  mostCommon?: boolean;
  select?: () => void;
}

const renderDisplay = (display: string, props: IProposalAction) => {
  switch (display) {
    case "Quadratic Voting":
      return <QuadraticVoting {...props} />;
    case "Send Funds":
      return <SendFunds {...props} />;
    case "Update DAO Config":
      return <UpdateConfig {...props} />;
    case "Create Liquidity Pool":
      return <LiquidityPool {...props} />;
    case "Change DAO's Description":
      return <DaoDescription {...props} />;
    case "Vote Duration":
      return <VoteDuration {...props} />;
    case "Support":
      return <Support {...props} />;
    case "Quorum":
      return <Quorum {...props} />;
    case "Optimistic Governance":
      return <OptimisticGovernance {...props} />;
  }
};

const AddAction: React.FC<IProposalAction> = (props) => {
  const actionTypes: IActionType[] = [
    {
      title: "Send Funds",
      subtitle: "Propose to send an amount of fund to one or multiple wallets",
      icon: <AttachMoneyIcon />,
      mostCommon: true,
    },
    {
      title: "Update DAO Config",
      subtitle: "Propose to update the Dao Config values",
      icon: <SettingsIcon />,
      mostCommon: true,
    },
    // {
    //   title: "Create Liquidity Pool",
    //   subtitle: "Create a liquidity pool with a set amount of tokens",
    //   icon: <AttachMoneyIcon />,
    //   mostCommon: true,
    // },
    // {
    //   title: "Change DAO's Description",
    //   subtitle: "Propose a different text for the DAO's description",
    //   icon: <SettingsIcon />,
    //   mostCommon: true,
    // },
    // {
    //   title: "Quadratic Voting",
    //   subtitle: "Turn on or off the quadratic voting option",
    //   icon: <BalanceIcon />,
    // },
    // {
    //   title: "Vote Duration",
    //   subtitle:
    //     "Create, edit, or delete the vote durations set for the DAO's governance",
    //   icon: <BalanceIcon />,
    // },
    // {
    //   title: "Support",
    //   subtitle:
    //     "Edit the minimum level of support needed for single choice voting",
    //   icon: <BalanceIcon />,
    // },
    // {
    //   title: "Quorum",
    //   subtitle:
    //     "Edit the minimum level of quorum needed fro any proposal to be approved",
    //   icon: <BalanceIcon />,
    // },
    // {
    //   title: "Optimistic Governance",
    //   subtitle:
    //     "Turn on or off optimistic governance and or edit the whitelisted members",
    //   icon: <BalanceIcon />,
    // },
  ];
  const [search, setSearch] = React.useState<string>("");
  const [showAll, setShowAll] = React.useState<boolean>(false);

  const context = React.useContext<IProposalContext>(ProposalContext);

  return (
    <Box
      sx={{
        borderRadius: ".3rem",
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        display: "flex",
        flexWrap: "wrap",
        mt: "1rem",
        mb: "1rem",
        width: "100%",
        position: "relative",
        justifyContent: "center",
      }}
    >
      {props.name === undefined ? (
        <Box sx={{ width: "100%", pl: "1rem", pr: "1rem" }}>
          <Box
            sx={{
              width: "100%",
              mb: "1rem",
            }}
          >
            <Header
              title="Choose an action"
              large
              mb="0"
              subtitle="Pick from the most common actions or simply use the search bar."
            />
          </Box>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "backgroundColor.main",
              border: "1px solid",
              borderColor: "border.main",
              p: ".35rem",
              borderRadius: "5rem",
              display: "flex",
              alignItems: "center",
              ":hover": {
                borderColor: "primary.main",
              },
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: deviceWrapper("13%", "5%"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon sx={{ opacity: ".6", fontSize: "1.2rem" }} />
            </Box>
            <InputBase
              sx={{
                ml: ".5rem",
                fontSize: ".9rem",
                color: "text.primary",
                width: "100%",
              }}
              placeholder="Search action"
              value={search}
              // @ts-ignore
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setSearch(event.target.value)}
            />
          </Paper>
          <Box sx={{ mt: "1rem" }}>
            <CapsInfo
              title={
                showAll
                  ? "All actions"
                  : search === ""
                  ? "Most Common Actions"
                  : "Search Results"
              }
              mb=".25rem"
            />
            {actionTypes
              .filter((i: IActionType) => {
                let temp = search.toLowerCase();
                return showAll
                  ? true
                  : temp === ""
                  ? i.mostCommon
                  : i.title
                  ? i.title.toLowerCase().includes(temp)
                  : false;
              })
              .map((i: IActionType, c: number) => {
                return (
                  <ActionSelect
                    key={`proposal-action-${c}-${i.title}`}
                    {...i}
                    select={() => {
                      let temp = [...(context.api?.value.actions ?? [])];
                      temp[props.c ?? 0].name = i.title;
                      if (context.api?.value.voting_system === "options") {
                        temp[props.c ?? 0].icon = i.icon;
                        temp[props.c ?? 0].description = i.subtitle;
                        temp[props.c ?? 0].options = [
                          {
                            name: "",
                            description: "",
                            data: i.title ? getData(i.title) : undefined,
                            rank: 1,
                          },
                        ];
                      }
                      context.api?.setValue({
                        ...context.api.value,
                        actions: temp,
                      });
                    }}
                  />
                );
              })}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pb: ".5rem",
            }}
          >
            <Button
              onClick={() => setShowAll(!showAll)}
              endIcon={
                showAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
            >
              {showAll ? "Show most common actions" : "Show all actions"}
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          {props.options === undefined && (
            <CancelIcon
              sx={{
                position: "absolute",
                top: ".65rem",
                right: ".5rem",
                cursor: "pointer",
              }}
              color="error"
              onClick={() => props.close && props.close()}
            />
          )}
          {props.options !== undefined && props.name !== undefined ? (
            <Box
              sx={{
                width: "100%",
                alignItems: "center",
                display: "flex",
                pt: ".5rem",
                backgroundColor: "primary.lightOpacity",
                border: 1,
                borderColor: "primary.main",
                borderRadius: ".3rem",
                pb: ".75rem",
              }}
            >
              <Box
                sx={{
                  width: deviceWrapper("20%", "8%"),
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.main",
                  display: "flex",
                }}
              >
                {props.icon}
              </Box>
              <Box sx={{ width: "80%", alignItems: "center" }}>
                <Header title={props.name} small mb="0" />
                <Subtitle subtitle={props.description ?? ""} small />
              </Box>
              <Button
                sx={{ ml: "auto", mr: "1rem" }}
                onClick={() => props.close && props.close()}
              >
                Change
              </Button>
            </Box>
          ) : (
            renderDisplay(props.name, props)
          )}
        </>
      )}
    </Box>
  );
};

export default AddAction;
