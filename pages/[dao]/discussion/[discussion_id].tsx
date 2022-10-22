import { Box, Button, Chip, Skeleton } from "@mui/material";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ThemeContext } from "@lib/ThemeContext";
import { DarkTheme } from "@theme/theme";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Header } from "@components/creation/utilities/HeaderComponents";
import LanIcon from "@mui/icons-material/Lan";
import { useRouter } from "next/router";
import CircleIcon from "@mui/icons-material/Circle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dateFormat from "dateformat";
import { LikesDislikes } from "@components/dao/proposals/ProposalCard";
import { Overview, State } from "@components/dao/discussion/Widgets";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DiscussionInfo from "@components/dao/discussion/DiscussionInfo";
import Comments, { IComment } from "@components/dao/discussion/Comments";
import DiscussionReferences from "@components/dao/discussion/DiscussionReferences";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";
import { getRandomImage } from "@components/utilities/images";
import useSWR from "swr";
import { attrOrUndefined, fetcher, getBaseUrl, getDaoPath, getWsUrl } from "@lib/utilities";
import Follow, { FollowMobile } from "@components/utilities/Follow";
import Details from "@components/dao/discussion/Details";
import useDidMountEffect from "@components/utilities/hooks";
import { GlobalContext } from "@lib/AppContext";

const Discussion: React.FC = () => {
  const themeContext = React.useContext(ThemeContext);
  const globalContext = React.useContext(GlobalContext);

  const router = useRouter();
  const { discussion_id, id } = router.query;
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [newestComment, setNewestComment] = React.useState<IComment>();
  const [liveComments, setLiveComments] = React.useState<IComment[]>([]);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  // replace comments with global state.... duh
  // major to do... needed for api

  const [tab, setTab] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const { data, error } = useSWR(
    discussion_id !== undefined && loaded
      ? `/proposals/${discussion_id}`
      : null,
    fetcher
  );
  if (error) {
    router.push(getDaoPath(id as string, '/404'));
  }

  if (data !== undefined) {
    if (data.is_proposal) {
      router.push(getDaoPath(id as string, '/404'));
    }
  }

  const setWrapper = (data: IComment) => {
    setNewestComment(data);
  };

  React.useEffect(() => {
    if (discussion_id) {
      let ws = new WebSocket(`${getWsUrl()}/proposals/ws/${discussion_id}`);
      ws.onmessage = (event: any) => {
        try {
          let wsRes = JSON.parse(event.data);
          setWrapper(wsRes.comment);
        } catch (e) {
          console.log(e);
        }
      };

      return () => ws.close();
    }
  }, [discussion_id]);

  useDidMountEffect(() => {
    let temp = [...liveComments];
    temp.push(newestComment);
    setLiveComments(temp);
  }, [newestComment]);

  return (
    <Layout width={deviceWrapper("92%", "97%")}>
      {data !== undefined ? (
        <Box sx={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
          <Box sx={{ width: deviceWrapper("100%", "70%") }}>
            <Box
              sx={{
                width: deviceWrapper("calc(100% + 2rem)", "100%"),
                borderRadius: deviceWrapper("0", ".3rem"),
                position: "relative",
                backgroundImage: deviceWrapper(
                  `linear-gradient(
                  to bottom, transparent, ${themeContext.theme === DarkTheme ? "black" : "white"
                  }
                ), url(${data.image_url})`,
                  `url(${data.image_url})`
                ),
                backgroundSize: "100% 100%",
                p: "1rem",
                maxHeight: "30rem",
                display: "flex",
                alignItems: "flex-start",
                minHeight: deviceWrapper("9.5rem", "12rem"),
                mt: deviceWrapper("-1rem", "0"),
                ml: deviceWrapper("-1rem", "0"),
              }}
            >
              <Button
                variant="contained"
                size="small"
                startIcon={<ArrowBackIcon />}
                onClick={router.back}
              >
                Back
              </Button>
              <Box
                sx={{
                  position: "absolute",
                  top: ".75rem",
                  right: ".75rem",
                  display: deviceWrapper("flex", "none"),
                  alignItems: "center",
                }}
              >
                {globalContext.api.daoUserData != null && (
                    <FollowMobile
                      followed={
                        data.followers.indexOf(
                          globalContext.api.daoUserData
                            ? globalContext.api.daoUserData.id
                            : null
                        ) > -1
                      }
                      putUrl={"/proposals/follow/" + discussion_id}
                    />
                  )}
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
                  likes={data.likes.length}
                  dislikes={data.dislikes.length}
                  userSide={
                    data.likes.indexOf(
                      globalContext.api.daoUserData
                        ? globalContext.api.daoUserData.id
                        : null
                    ) > -1
                      ? 1
                      : data.dislikes.indexOf(
                        globalContext.api.daoUserData
                          ? globalContext.api.daoUserData.id
                          : null
                      ) > -1
                        ? 0
                        : undefined
                  }
                  putUrl={`/proposals/like/${discussion_id}`}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: ".75rem",
                  left: ".75rem",
                  display: deviceWrapper("block", "none"),
                  alignItems: "center",
                }}
              >
                <Header title={data.name} large bold />
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
                    label={data.category}
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
            </Box>
            <Box
              sx={{
                width: "100%",
                mt: "1rem",
                alignItems: "center",
                pb: "1rem",
                borderBottom: "1px solid",
                borderColor: "border.main",
                display: deviceWrapper("none", "flex"),
              }}
            >
              <Box>
                <Header title={attrOrUndefined(data, "name")} large />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: ".8rem",
                    color: "text.secondary",
                  }}
                >
                  {data === undefined ? (
                    <Skeleton animation="wave" height="1.2rem" width="3rem" />
                  ) : (
                    <>
                      <LanIcon
                        sx={{ opacity: ".8", fontSize: "1rem", mr: ".3rem" }}
                      />
                      ID: {data.id}
                      <Box
                        sx={{
                          alignItems: "center",
                          ml: ".5rem",
                          color: "text.secondary",
                          fontSize: ".8rem",
                          display: deviceWrapper("flex", "none"),
                        }}
                      >
                        <CalendarTodayIcon
                          sx={{ mr: ".3rem", fontSize: "1rem" }}
                        />
                        {dateFormat(
                          attrOrUndefined(data, "date"),
                          "mmmm dS, yyyy"
                        )}
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  ml: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    color: "primary.main",
                    alignItems: "center",
                    fontSize: deviceWrapper(".7rem", ""),
                    display: deviceWrapper("flex", "none"),
                  }}
                >
                  <CircleIcon
                    color="primary"
                    sx={{ mr: ".3rem", fontSize: ".8rem" }}
                  />
                  Discussion
                </Box>
                <Chip
                  label={data.category}
                  variant="outlined"
                  icon={<LocalFireDepartmentIcon sx={{ fontSize: "1.3rem" }} />}
                  sx={{
                    color: "primary.main",
                    borderColor: "primary.main",
                    fontSize: ".8rem",
                    display: deviceWrapper("flex", "none"),
                    mt: ".5rem",
                  }}
                />

                <Box
                  sx={{
                    display: deviceWrapper("none", "flex"),
                  }}
                >
                  {globalContext.api.daoUserData != null && (
                  <Follow
                    followed={
                      data.followers.indexOf(
                        globalContext.api.daoUserData
                          ? globalContext.api.daoUserData.id
                          : null
                      ) > -1
                    }
                    putUrl={"/proposals/follow/" + discussion_id}
                  />
                  )}
                </Box>
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
              {data === undefined ? (
                <Skeleton animation="wave" height="1.2rem" width="100%" />
              ) : (
                <>
                  <Chip
                    label={data.category}
                    variant="outlined"
                    icon={
                      <LocalFireDepartmentIcon sx={{ fontSize: "1.4rem" }} />
                    }
                    sx={{
                      color: "primary.main",
                      borderColor: "primary.main",
                      fontSize: "1rem",
                      display: "flex",
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
                    {dateFormat(data.date, "mmmm dS, yyyy")}
                  </Box>
                  <Box
                    sx={{
                      ml: deviceWrapper("0", "auto"),
                      display: deviceWrapper("none", "flex"),
                      mt: deviceWrapper(".5rem", "0"),
                    }}
                  >
                    <Box
                      sx={{
                        display: deviceWrapper("flex", "none"),
                      }}
                    >
                      {globalContext.api.daoUserData != null && (
                      <Follow
                        followed={
                          data.followers.indexOf(
                            globalContext.api.daoUserData
                              ? globalContext.api.daoUserData.id
                              : null
                          ) > -1
                        }
                        putUrl={"/proposals/follow/" + discussion_id}
                      />
                      )}
                    </Box>

                    <LikesDislikes
                      likes={data.likes.length}
                      dislikes={data.dislikes.length}
                      userSide={
                        data.likes.indexOf(
                          globalContext.api.daoUserData
                            ? globalContext.api.daoUserData.id
                            : null
                        ) > -1
                          ? 1
                          : data.dislikes.indexOf(
                            globalContext.api.daoUserData
                              ? globalContext.api.daoUserData.id
                              : null
                          ) > -1
                            ? 0
                            : undefined
                      }
                      putUrl={`/proposals/like/${discussion_id}`}
                    />
                  </Box>
                </>
              )}
            </Box>
            <TabContext value={tab}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "border.main",
                  mt: deviceWrapper("0", "1rem"),
                  ml: deviceWrapper("-1rem", "0"),
                  width: deviceWrapper("calc(100% + 2rem)", "100%"),
                  position: "sticky",
                  top: "3rem",
                  backgroundColor: "background.default",
                  zIndex: 10,
                }}
              >
                <TabList
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Discussion Info" value="1" />
                  <Tab
                    label={`Comments | ${data.comments.length + liveComments.length
                      }`}
                    value="2"
                  />
                  <Tab
                    label={`Referenced | ${data.references_meta.length}`}
                    value="3"
                  />
                  <Tab
                    label="Discussion Details"
                    value="4"
                    sx={{ display: deviceWrapper("flex", "none") }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ pl: 0, pr: 0 }}>
                <DiscussionInfo data={data} />
              </TabPanel>
              <TabPanel value="2" sx={{ pl: 0, pr: 0 }}>
                <Comments
                  data={data.comments.concat(liveComments)}
                  id={parseInt(discussion_id as string)}
                />
              </TabPanel>
              <TabPanel value="3" sx={{ pl: 0, pr: 0 }}>
                <DiscussionReferences
                  data={attrOrUndefined(data, "references_meta")}
                />
              </TabPanel>
              <TabPanel value="4" sx={{ pl: 0, pr: 0 }}>
                <Details date={data.date} />
              </TabPanel>
            </TabContext>
          </Box>
          <Box
            sx={{
              width: "30%",
              position: "sticky",
              top: deviceWrapper("0", "4.8rem"),
              display: deviceWrapper("none", "block"),
              ml: "1.5rem",
            }}
          >
            <Overview
              userDetailId={data.user_details_id}
              alias={data.alias}
              img={data.profile_img_url}
              followers={data.user_followers}
              created={data.created}
              level={0}
            />
            <State />
          </Box>
        </Box>
      ) : (
        <>Loading here....</>
      )}
    </Layout>
  );
};

export default Discussion;
