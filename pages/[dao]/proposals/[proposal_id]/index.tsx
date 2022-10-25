import { Box, Button, Chip, Fab, Tab } from "@mui/material";
import * as React from "react";
import { paths, props } from "@lib/ProposalPaths";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";
import Comments from "@components/dao/discussion/Comments";
import DiscussionInfo from "@components/dao/discussion/DiscussionInfo";
import DiscussionReferences from "@components/dao/discussion/DiscussionReferences";
import { Overview, State } from "@components/dao/discussion/Widgets";
import { LikesDislikes } from "@components/dao/proposals/ProposalCard";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { DarkTheme, LightTheme } from "@theme/theme";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import DiscussionPlaceholder from "@public/dao/discussion-banner-placeholder.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeContext } from "@lib/ThemeContext";
import { IProposal } from "../create";
import ProposalPlaceholder from "@public/dao/discussion-banner-placeholder.png";
import { Header } from "@components/creation/utilities/HeaderComponents";
import LanIcon from "@mui/icons-material/Lan";
import { useRouter } from "next/router";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircleIcon from "@mui/icons-material/Circle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dateFormat from "dateformat";
import GavelIcon from "@mui/icons-material/Gavel";
import ProposalContext from "@lib/dao/proposal/ProposalContext";
import ProposalApi from "@lib/dao/proposal/ProposalApi";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import ProposalInfo from "@components/dao/proposal/ProposalInfo";
import Discussion from "@components/dao/proposal/Discussion";
import Addendums from "@components/dao/proposal/Addendums";
import VoteWidget from "@components/dao/proposal/VoteWidget";
import OptionsWidget from "@components/dao/proposal/OptionsWidget";
import Link from "next/link";
import { getRandomImage } from "@components/utilities/images";
import BackLink from "@components/utilities/BackLink";
import Details from "@components/dao/proposal/Details";
import { FollowMobile } from "@components/utilities/Follow";

const endDate = new Date();
endDate.setDate(endDate.getDate() + 10);

const startDate = new Date();
startDate.setDate(startDate.getDate() - 10);

const Proposal: React.FC = () => {
  const themeContext = React.useContext(ThemeContext);
  const router = useRouter();
  const { dao, proposal_id } = router.query;
  const [value, setValue] = React.useState<IProposal>({
    name: "",
    image: {
      url: getRandomImage(),
      file: undefined,
    },
    status: "active",
    category: "Finance",
    content: "",
    votingSystem: "yes/no",
    references: [],
    actions: [
      {
        name: undefined,
        data: undefined,
      },
    ],
    optionType: undefined,
    tags: ["Controversial"],
    followed: false,
    dislikes: 31,
    likes: 158,
    date: endDate,
    createdDate: startDate,
    addendums: [
      {
        id: 1,
        name: "Addendum 1",
        date: new Date(),
        content: "Addendum 1 content here...",
      },
    ],
  });

  const [tab, setTab] = React.useState("0");
  const [loaded, setLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const context = React.useContext<IGlobalContext>(GlobalContext);
  const api = new ProposalApi(context.api, value, setValue);

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
                ), url(${value.image.url})`,
                      `url(${value.image.url})`
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
                  {context.api.daoUserData != null && (
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
                          [].indexOf(
                            parseInt(localStorage.getItem("user_id"))
                          ) > -1
                        }
                        putUrl={"/proposals/follow/" + proposal_id}
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
                    <Header title="Proposal name" large bold />
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Chip
                        label={"Discussion"}
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
                      likes={value.likes}
                      dislikes={value.dislikes}
                      userSide={value.userSide}
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
                    <Header title="Proposal name" large />
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
                      ID: {proposal_id}
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
                    <Button
                      onClick={() =>
                        setValue({ ...value, followed: !value.followed })
                      }
                      sx={{
                        color: value.followed
                          ? "error.light"
                          : "text.secondary",
                        borderColor: value.followed
                          ? "error.light"
                          : "text.secondary",
                        ":hover": {
                          borderColor: "error.light",
                          color: "error.light",
                        },
                        display: deviceWrapper("none", "flex"),
                      }}
                      variant="outlined"
                      size="small"
                      startIcon={
                        value.followed ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )
                      }
                    >
                      Follow{value.followed && "ed"}
                    </Button>
                    <Link
                      href={
                        dao === undefined
                          ? `/dao/proposals/${proposal_id}/vote`
                          : `/${dao}/proposals/${proposal_id}/vote`
                      }
                    >
                      <Button
                        sx={{
                          ml: "1rem",
                          display: deviceWrapper("none", "flex"),
                        }}
                        variant="contained"
                        size="small"
                        startIcon={<GavelIcon />}
                      >
                        Vote Now
                      </Button>
                    </Link>
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
                    label={value.category}
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
                      color="primary"
                      sx={{ mr: ".3rem", fontSize: "1rem" }}
                    />
                    Discussion
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
                      likes={value.likes}
                      dislikes={value.dislikes}
                      userSide={value.userSide}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: deviceWrapper("block", "none"),
                  }}
                >
                  {value.votingSystem === "yes/no" ? (
                    <VoteWidget />
                  ) : (
                    <OptionsWidget />
                  )}
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

                      <Tab label="Discussion" value="1" />
                      <Tab label="Comments | 7" value="2" />
                      <Tab label="Referenced | 1" value="3" />
                      <Tab label="Addendum" value="4" />
                      <Tab
                        label="Proposal Details"
                        value="5"
                        sx={{ display: deviceWrapper("flex", "none") }}
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="0" sx={{ pl: 0, pr: 0 }}>
                    <ProposalInfo />
                  </TabPanel>
                  <TabPanel value="1" sx={{ pl: 0, pr: 0 }}>
                    <Discussion />
                  </TabPanel>
                  <TabPanel value="2" sx={{ pl: 0, pr: 0 }}>
                    <Comments data={[]} id={0} />
                  </TabPanel>
                  <TabPanel value="3" sx={{ pl: 0, pr: 0 }}>
                    <DiscussionReferences data={[]} />
                  </TabPanel>
                  <TabPanel value="4" sx={{ pl: 0, pr: 0 }}>
                    <Addendums />
                  </TabPanel>
                  <TabPanel value="5" sx={{ pl: 0, pr: 0 }}>
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
                <Overview
                  proposal
                  userDetailId={0}
                  alias={""}
                  level={0}
                  img={""}
                  followers={[]}
                  created={0}
                />
                {value.votingSystem === "yes/no" ? (
                  <VoteWidget />
                ) : (
                  <OptionsWidget />
                )}
              </Box>
            </Box>
            <Button
              size="small"
              startIcon={<GavelIcon />}
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                display: deviceWrapper("flex", "none"),
                borderRadius: 0,
              }}
              variant="contained"
            >
              Vote Now
            </Button>
          </>
        )}
      </Layout>
    </ProposalContext.Provider>
  );
};

export default Proposal;

// export const getStaticPaths = paths;
// export const getStaticProps = props;
