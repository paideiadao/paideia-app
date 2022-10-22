import { Box } from "@mui/material";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProfileHeader from "@components/dao/profile/Header";
import ProposalsListing from "@components/dao/profile/Proposals";
import Activity from "@components/dao/profile/Activity";
import Layout from "../Layout";
import { deviceWrapper } from "@components/utilities/Style";
import AboutUser from "./AboutUser";
import BackLink from "@components/utilities/BackLink";
import { IProposalCard } from "../proposals/ProposalCard";
import { IActivity } from "../activity/Activity";
import { IDaoUserData } from "@lib/Interfaces";

interface IAbstractProfile {
  edit?: boolean;
  followed?: boolean;
  data: IDaoUserData;
  proposals: IProposalCard[];
  activities: IActivity[];
}

const AbstractProfile: React.FC<IAbstractProfile> = (props) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Layout width="98%">
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          flexWrap: deviceWrapper("wrap", "nowrap"),
        }}
      >
        <Box
          sx={{
            width: deviceWrapper("100%", "70%"),
            p: ".75rem",
            pt: deviceWrapper("0", ".5rem"),
          }}
        >
          <BackLink />
          <Box sx={{ mt: "1rem" }} />
          <ProfileHeader
            edit={props.edit}
            followed={props.followed}
            data={props.data}
          />
          <Box sx={{ width: "100%", display: deviceWrapper("block", "none") }}>
            {props.data !== undefined && (
              <AboutUser
                token_id={
                  "1fd6e032e8476c4aa54c18c1a308dce83940e8f4a28f576440513ed7326ad489"
                }
                followers={props.data.followers}
                created={0}
                approved={0}
                bio={props.data.bio}
                social_links={props.data.social_links}
              />
            )}
          </Box>
          <Box>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "border.main" }}>
                <TabList onChange={handleChange}>
                  <Tab
                    label={`Proposals${
                      props.proposals ? ` | ${props.proposals.length}` : ""
                    }`}
                    value="1"
                  />
                  <Tab label="Activity" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ pl: 0, pr: 0 }}>
                <ProposalsListing proposals={props.proposals} />
              </TabPanel>
              <TabPanel value="2" sx={{ pl: 0, pr: 0 }}>
                <Activity activities={props.activities} />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
        <Box sx={{ width: "30%", display: deviceWrapper("none", "block") }}>
          {props.data !== undefined && (
            <AboutUser
              token_id={
                "1fd6e032e8476c4aa54c18c1a308dce83940e8f4a28f576440513ed7326ad489"
              }
              followers={props.data.followers}
              created={props.data.created}
              bio={props.data.bio}
              social_links={props.data.social_links}
              approved={0}
              wallet={props.data.address}
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default AbstractProfile;
