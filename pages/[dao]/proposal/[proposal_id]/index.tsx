import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Fab,
  Tab,
  useTheme,
} from "@mui/material";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";
import Comments, { IComment } from "@components/dao/discussion/Comments";
import DiscussionReferences from "@components/dao/discussion/DiscussionReferences";
import { Overview } from "@components/dao/discussion/Widgets";
import { LikesDislikes } from "@components/dao/proposals/ProposalCard";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { DarkTheme } from "@theme/theme";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { ThemeContext } from "@lib/ThemeContext";
import { IProposal } from "../create";
import { Header } from "@components/creation/utilities/HeaderComponents";
import LanIcon from "@mui/icons-material/Lan";
import { useRouter } from "next/router";
import CircleIcon from "@mui/icons-material/Circle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dateFormat from "dateformat";
import GavelIcon from "@mui/icons-material/Gavel";
import ProposalContext from "@lib/dao/proposal/ProposalContext";
import ProposalApi from "@lib/dao/proposal/ProposalApi";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import ProposalInfo from "@components/dao/proposal/ProposalInfo";
import Addendums from "@components/dao/proposal/Addendums";
import PaideiaVoteWidget from "@components/dao/proposal/VoteWidget";
import Link from "next/link";
import { getRandomImage } from "@components/utilities/images";
import BackLink from "@components/utilities/BackLink";
import Details from "@components/dao/proposal/Details";
import Follow, { FollowMobile } from "@components/utilities/Follow";
import useSWR from "swr";
import { attrOrUndefined, fetcher, getWsUrl } from "@lib/utilities";
import { useContext, useState, useEffect } from "react";
import useDidMountEffect from "@components/utilities/hooks";

const endDate = new Date();
endDate.setDate(endDate.getDate() + 10);

const startDate = new Date();
startDate.setDate(startDate.getDate() - 10);

const Proposal: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();
  const router = useRouter();
  const { dao, proposal_id } = router.query;
  const parsed_proposal_id = proposal_id
    ? (proposal_id as string).split("-").slice(-5).join("-")
    : null;
  const [value, setValue] = useState<IProposal>({
    name: "",
    image_url: getRandomImage(),
    status: "proposal",
    category: "Finance",
    content: "",
    voting_system: "yes/no",
    references: [],
    actions: [],
    likes: [],
    dislikes: [],
    comments: [],
    option_type: "one-option",
    tags: [],
    followers: [],
    date: endDate,
    created: 0,
    addendums: [],
    is_proposal: true,
    references_meta: [],
    referenced_meta: [],
    votes: [0, 0],
    voting_duration: 0,
    user_followers: [],
  });

  const [tab, setTab] = useState("0");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [newestComment, setNewestComment] = useState<IComment>();
  const [liveComments, setLiveComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (parsed_proposal_id) {
      const ws = new WebSocket(
        `${getWsUrl()}/proposals/ws/${parsed_proposal_id}`
      );
      ws.onmessage = (event: any) => {
        try {
          const wsRes = JSON.parse(event.data);
          setWrapper(wsRes.comment);
        } catch (e) {
          console.log(e);
        }
      };
      return () => ws.close();
    }
  }, [parsed_proposal_id]);

  useDidMountEffect(() => {
    if (newestComment) {
      const temp = [...liveComments, newestComment];
      setLiveComments(temp);
    }
  }, [newestComment]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const setWrapper = (data: IComment) => {
    setNewestComment(data);
  };

  const context = useContext<IGlobalContext>(GlobalContext);
  const api = new ProposalApi(context.api, value, setValue);
  const decimalAdjust = Math.pow(
    10,
    context.api?.daoData?.tokenomics?.token_decimals ?? 0
  );

  const { data, error } = useSWR(
    parsed_proposal_id ? `/proposals/${parsed_proposal_id}` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setValue(data);
      setLoaded(true);
      if (!data.is_proposal) {
        router.replace(`/${dao}/discussion/${proposal_id}`);
      }
    }
  }, [data]);

  return (
    <ProposalContext.Provider value={{ api }}>
      <Layout width={deviceWrapper("92%", "97%")}>
        {loaded && (
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                pb: "3rem",
              }}
            >
              <Box sx={{ width: deviceWrapper("100%", "70%") }}>
                <Box
                  sx={{
                    width: deviceWrapper("calc(100% + 2rem)", "100%"),
                    borderRadius: deviceWrapper("0", ".3rem"),
                    position: "relative",
                    backgroundImage: deviceWrapper(
                      `linear-gradient(
                  to bottom, transparent, ${
                    themeContext.theme === DarkTheme ? "black" : "white"
                  }
                ), url(${value.image_url})`,
                      `url('${value.image_url}')`
                    ),
                    p: ".75rem",
                    maxHeight: "30rem",
                    display: "flex",
                    alignItems: "flex-start",
                    minHeight: deviceWrapper("9.5rem", "12rem"),
                    mt: deviceWrapper("-1rem", "0"),
                    ml: deviceWrapper("-1rem", "0"),
                  }}
                >
                  <BackLink variant="contained" />
                  {context.api?.daoUserData && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: ".75rem",
                        right: ".75rem",
                        display: deviceWrapper("flex", "none"),
                        alignItems: "center",
                      }}
                    >
                      <FollowMobile
                        followed={
                          value.followers.indexOf(
                            context.api.daoUserData
                              ? context.api.daoUserData.id
                              : null
                          ) > -1
                        }
                        putUrl={"/proposals/follow/" + parsed_proposal_id}
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: ".75rem",
                      left: ".75rem",
                      display: deviceWrapper("block", "none"),
                      alignItems: "center",
                    }}
                  >
                    <Header title={value.name} large bold />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        label={
                          value.status === "discussion"
                            ? "Discussion"
                            : value.status
                        }
                        variant="outlined"
                        icon={
                          <CircleIcon
                            color="primary"
                            sx={{ mr: ".3rem", fontSize: ".7rem" }}
                          />
                        }
                        sx={{
                          color: "primary.main",
                          borderColor: "primary.main",
                          fontSize: ".7rem",
                          display: "flex",
                          p: "0rem",
                          height: "1.4rem",
                          backgroundColor: "background.default",
                          mr: ".5rem",
                        }}
                      />
                      <Chip
                        label={value.category}
                        variant="outlined"
                        icon={
                          <LocalFireDepartmentIcon sx={{ fontSize: ".9rem" }} />
                        }
                        sx={{
                          color: "primary.main",
                          borderColor: "primary.main",
                          fontSize: ".7rem",
                          display: "flex",
                          p: "0rem",
                          height: "1.4rem",
                          backgroundColor: "background.default",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: ".75rem",
                      right: ".75rem",
                      display: deviceWrapper("flex", "none"),
                    }}
                  >
                    <LikesDislikes
                      likes={value.likes.length}
                      dislikes={value.dislikes.length}
                      userSide={
                        value.likes.indexOf(
                          context.api?.daoUserData
                            ? context.api.daoUserData.id
                            : null
                        ) > -1
                          ? 1
                          : value.dislikes.indexOf(
                              context.api?.daoUserData
                                ? context.api.daoUserData.id
                                : null
                            ) > -1
                          ? 0
                          : undefined
                      }
                      putUrl={`/proposals/like/${parsed_proposal_id}`}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    mt: "1rem",
                    display: deviceWrapper("none", "flex"),
                    pb: "1rem",
                    borderBottom: "1px solid",
                    borderColor: "border.main",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Header title={value.name} large />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: ".9rem",
                        color: "text.secondary",
                      }}
                    >
                      <LanIcon
                        sx={{ opacity: ".8", fontSize: "1rem", mr: ".3rem" }}
                      />
                      ID: {parsed_proposal_id}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      ml: "auto",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: deviceWrapper("column", "row"),
                    }}
                  >
                    {context.api?.daoUserData && (
                      <Follow
                        followed={
                          value.followers.indexOf(
                            context.api.daoUserData
                              ? context.api.daoUserData.id
                              : null
                          ) > -1
                        }
                        putUrl={"/proposals/follow/" + parsed_proposal_id}
                      />
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: ".5rem",
                    width: "100%",
                    alignItems: "center",
                    display: deviceWrapper("none", "flex"),
                  }}
                >
                  <Chip
                    label={value.category ?? "Default"}
                    variant="outlined"
                    icon={<LocalFireDepartmentIcon sx={{ fontSize: "1rem" }} />}
                    sx={{
                      color: "primary.main",
                      borderColor: "primary.main",
                      fontSize: ".7rem",
                    }}
                  />
                  <Box
                    sx={{
                      color: "primary.main",
                      ml: ".5rem",
                      alignItems: "center",
                      fontSize: ".9rem",
                      display: "flex",
                    }}
                  >
                    <CircleIcon
                      color={getStatusColor(value.status)}
                      sx={{ mr: ".3rem", fontSize: "1rem" }}
                    />
                    {value.status === "discussion"
                      ? "Discussion"
                      : value.status}
                  </Box>
                  <Box
                    sx={{
                      alignItems: "center",
                      ml: ".5rem",
                      color: "text.secondary",
                      fontSize: ".9rem",
                      display: "flex",
                    }}
                  >
                    <CalendarTodayIcon
                      sx={{ mr: ".3rem", fontSize: "1.2rem" }}
                    />
                    {dateFormat(value.date, "mmmm dS, yyyy")}
                  </Box>
                  <Box sx={{ ml: "auto" }}>
                    <LikesDislikes
                      likes={value.likes.length}
                      dislikes={value.dislikes.length}
                      userSide={
                        value.likes.indexOf(
                          context.api?.daoUserData
                            ? context.api.daoUserData.id
                            : null
                        ) > -1
                          ? 1
                          : value.dislikes.indexOf(
                              context.api?.daoUserData
                                ? context.api.daoUserData.id
                                : null
                            ) > -1
                          ? 0
                          : undefined
                      }
                      putUrl={`/proposals/like/${parsed_proposal_id}`}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: deviceWrapper("block", "none"),
                  }}
                >
                  <PaideiaVoteWidget
                    yes={value.votes ? value.votes[1] / decimalAdjust : 0}
                    no={value.votes ? value.votes[0] / decimalAdjust : 0}
                    status={value.status}
                  />
                </Box>
                <TabContext value={tab}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "border.main",
                      mt: ".5rem",
                      ml: deviceWrapper("-1rem", "0"),
                      width: deviceWrapper("calc(100% + 2rem)", "100%"),
                      position: "sticky",
                      top: "3.5rem",
                      backgroundColor: "background.default",
                      zIndex: 10,
                    }}
                  >
                    <TabList
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label="Proposal Info" value="0" />
                      <Tab
                        label={`Comments | ${
                          value.comments
                            .concat(liveComments)
                            .filter((x) => x)
                            .filter(
                              (v, i, a) =>
                                a.map((comment) => comment.id).indexOf(v.id) ===
                                i
                            ).length
                        }`}
                        value="1"
                      />
                      <Tab
                        label={`References | ${
                          (value?.references_meta?.length ?? 0) +
                          (value?.referenced_meta?.length ?? 0)
                        }`}
                        value="2"
                      />
                      <Tab label="Addendums" value="3" />
                      <Tab
                        label="Proposal Details"
                        value="4"
                        sx={{ display: deviceWrapper("flex", "none") }}
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="0" sx={{ pl: 0, pr: 0 }}>
                    <ProposalInfo
                      content={value.content}
                      actions={value.actions}
                    />
                  </TabPanel>
                  <TabPanel value="1" sx={{ pl: 0, pr: 0 }}>
                    <Comments
                      data={value.comments
                        .concat(liveComments)
                        .filter((x) => x)
                        .filter(
                          (v, i, a) =>
                            a.map((comment) => comment.id).indexOf(v.id) === i
                        )}
                      id={parsed_proposal_id ?? ""}
                    />
                  </TabPanel>
                  <TabPanel value="2" sx={{ pl: 0, pr: 0 }}>
                    <DiscussionReferences
                      references={data?.references_meta ?? []}
                      referenced={data?.referenced_meta ?? []}
                    />
                  </TabPanel>
                  <TabPanel value="3" sx={{ pl: 0, pr: 0 }}>
                    <Addendums />
                  </TabPanel>
                  <TabPanel value="4" sx={{ pl: 0, pr: 0 }}>
                    <Details />
                  </TabPanel>
                </TabContext>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  position: "sticky",
                  top: deviceWrapper("0", "4.5rem"),
                  display: deviceWrapper("none", "block"),
                  ml: "1.5rem",
                }}
              >
                <Details />
                <PaideiaVoteWidget
                  yes={value.votes ? value.votes[1] / decimalAdjust : 0}
                  no={value.votes ? value.votes[0] / decimalAdjust : 0}
                  status={value.status}
                />
              </Box>
            </Box>
          </>
        )}
        {!loaded && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              my: 5,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Layout>
      <Link
        href={
          dao === undefined
            ? `/dao/proposal/${proposal_id}/vote`
            : `/${dao}/proposal/${proposal_id}/vote`
        }
      >
        <Button
          disabled={value.status !== "Active" || !context.api?.daoUserData}
          // size="small"
          startIcon={<GavelIcon />}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            display: deviceWrapper("flex", "none"),
            borderRadius: 0,
            "&.Mui-disabled": {
              backgroundColor:
                theme.palette.mode === "dark" ? "rgb(46,52,64)" : "grey.400",
            },
          }}
          variant="contained"
        >
          Vote Now
        </Button>
      </Link>
    </ProposalContext.Provider>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Draft": {
      return "warning";
    }
    case "Passed": {
      return "success";
    }
    case "Active": {
      return "success";
    }
    case "Proposal": {
      return "success";
    }
    case "Failed": {
      return "error";
    }
    case "Failed - Quorum": {
      return "error";
    }
    case "Failed - Vote": {
      return "error";
    }
    default: {
      return "warning";
    }
  }
};

export default Proposal;
