import { Header } from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import BackLink from "@components/utilities/BackLink";
import { deviceWrapper } from "@components/utilities/Style";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import * as React from "react";

const Terminate: React.FC = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Layout width={deviceWrapper("97%", "60%")}>
      <BackLink />
      <Header
        title="Terminate DAO"
        subtitle="Please select how you wish to divide the DAO's funds and click continue to create a proposal to terminate the DAO."
      />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Divide Funds Equally" value="1" />
            <Tab label="Send Funds to Wallet Address" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"></TabPanel>
        <TabPanel value="2"></TabPanel>
      </TabContext>
    </Layout>
  );
};

export default Terminate;
