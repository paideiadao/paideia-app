import React, { FC } from "react";
import { styled } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled from "@mui/base/TabUnstyled";

interface ITabs {
  tabs: {
    title: string;
    fragment: React.ReactFragment;
  }[];
  headline?: string;
}

const TabsList = styled(TabsListUnstyled)`
  display: inline-flex;
  border-radius: 4px;
  .Mui-selected {
    -webkit-text-decoration: none;
    text-decoration: none;
    background-color: rgba(159, 210, 219, 0.08);
    border: 1px solid #9fd2db;
  }
`;

const TabsStyled = styled(TabUnstyled)`
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: inherit;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Helvetica Neue", sans-serif;
  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1.75;
  text-transform: uppercase;
  min-width: 64px;
  padding: 3px 9px;
  border-radius: 4px;
  -webkit-transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border: 1px solid rgba(159, 210, 219, 0.5);
  color: #9fd2db;
  min-width: 40px;
  :not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right-color: transparent;
  }
  :last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: -1px;
  }
  :hover {
    -webkit-text-decoration: none;
    text-decoration: none;
    background-color: rgba(159, 210, 219, 0.08);
    border: 1px solid #9fd2db;
  }
`;

const CustomTable: FC<ITabs> = ({ tabs, headline }) => {
  return (
    <TabsUnstyled defaultValue={0}>
      <Grid
        container
        spacing={3}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", md: "flex-start" },
          marginBottom: "24px",
        }}
      >
        <Grid item md={8}>
          <Typography
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "23px",
            }}
          >
            {headline}
          </Typography>
        </Grid>
        <Grid item md="auto">
          <TabsList>
            {tabs.map((tab, i) => {
              return (
                <TabsStyled key={i} type="button">
                  {tab.title}
                  <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                </TabsStyled>
              );
            })}
          </TabsList>
        </Grid>
      </Grid>
      {tabs.map((tab, i) => {
        return (
          <TabPanelUnstyled value={i} key={i}>
            {tab.fragment}
          </TabPanelUnstyled>
        );
      })}
    </TabsUnstyled>
  );
};

export default CustomTable;
