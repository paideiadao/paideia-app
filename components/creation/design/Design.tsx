import { Avatar, Box, Fab, Paper } from "@mui/material";
import * as React from "react";
import { Header, LearnMore, Subtitle } from "../utilities/HeaderComponents";
import CheckIcon from "@mui/icons-material/Check";
import Logo from "./Logo";
import { CreationContext } from "../../../lib/creation/Context";
import Banner from "./Banner";
import Footer from "./Footer";
import { deviceStruct } from "@components/utilities/Style";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";
import { DarkTheme } from "@theme/theme";

export interface ITheme {
  id: number;
  label: string;
  primary: string;
  secondary: string;
  primaryDark: string;
  secondaryDark: string;
}

export const themes: ITheme[] = [
  {
    id: 1,
    label: "Paideia",
    primary: "#00868F",
    secondary: "#FF8219",
    secondaryDark: "#FC9E4F",
    primaryDark: "#9FD2DB",
  },
  {
    id: 2,
    label: "Electric Violet",
    primary: "#57e9a3",
    secondary: "#c7a3f0",
    primaryDark: "#00a068",
    secondaryDark: "#c655ff",
  },
  {
    id: 3,
    label: "Autumn Leaves",
    primary: "#a09ef4",
    secondary: "#e3c880",
    primaryDark: "#825cff",
    secondaryDark: "#e2903f",
  },
  {
    id: 4,
    label: "Oceanic",
    primary: "#ff79ba",
    secondary: "#90eeff",
    primaryDark: "#c43b62",
    secondaryDark: "#2c9ec1",
  },
];

interface IThemeCard {
  set: Function;
  i: ITheme;
  theme: number;
}

export const ThemeCard: React.FC<IThemeCard> = (props) => {
  const themeContext = React.useContext<IThemeContext>(ThemeContext);
  return (
    <Paper
      onClick={() => props.set(props.i.id)}
      elevation={0}
      sx={{
        width: deviceStruct("44%", "44%", "22%", "22%", "22%"),
        cursor: "pointer",
        m: ".5rem",
        p: props.i.id === props.theme ? ".2rem" : 0,
        backgroundColor: "transparent",
        backgroundImage: "none",
        borderRadius: ".8rem",
        border: "1px solid",
        borderColor: props.i.id === props.theme ? "#42A5F5" : "transparent",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "fileInput.outer",
          border: "1px solid",
          borderColor: "border.main",
          m: props.i.id === props.theme ? "0rem" : ".2rem",
          borderRadius: ".6rem",
        }}
      >
        <Box
          sx={{
            backgroundColor:
              themeContext.theme === DarkTheme
                ? props.i.secondaryDark
                : props.i.secondary,
            width: "100%",
            height: "5rem",
            borderTopLeftRadius: ".6rem",
            borderTopRightRadius: ".6rem",
            position: "relative",
          }}
        >
          {props.i.id === props.theme && (
            <Box sx={{ position: "absolute", bottom: 5, right: 5 }}>
              <Avatar
                sx={{
                  backgroundColor: "fileInput.outer",
                  border: "1px solid",
                  borderColor: "#42A5F5",
                }}
              >
                <CheckIcon color="primary" />
              </Avatar>
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor:
                themeContext.theme === DarkTheme
                  ? props.i.primaryDark
                  : props.i.primary,
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
              borderTopLeftRadius: ".6rem",
              borderTopRightRadius: ".6rem",
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            pb: "1rem",
            pt: "1rem",
            borderTop: "1px solid",
            borderTopColor: "border.main",
            fontSize: ".9rem",
          }}
        >
          {props.i.label}
        </Box>
      </Paper>
    </Paper>
  );
};

const Design: React.FC = (props) => {
  let creationContext = React.useContext(CreationContext);

  const [theme, setTheme] = React.useState<number>(1);

  let data = creationContext.api.data.design;
  let setData = (data: any) => {
    creationContext.api.setData({
      ...creationContext.api.data,
      design: data,
    });
  };

  React.useEffect(() => {
    setData({
      ...data,
      theme: theme,
    });
  }, [theme]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        width: deviceStruct("93%", "93%", "70%", "70%", "70%"),
      }}
    >
      <Header
        title="DAO Design"
        subtitle="Choose the perfect theme for your DAO. Add a logo, upload a banner, and create your own personalized footer."
      />
      <Box sx={{ width: "100%", mb: "1rem" }}>
        <LearnMore
          title="Theme"
          // tooltipTitle="Title Here"
          tooltipText="Choose the color scheme that will appear on your DAO's dashboard for all users"
          // tooltipLink="/here"
        />
        <Subtitle subtitle="In order to best match your DAO design you can select between four different theme colors and choose if you want a light or dark theme." />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {themes.map((i: any, c: number) => {
          return (
            <ThemeCard
              set={setTheme}
              theme={theme}
              i={i}
              key={`theme-card-${c}`}
            />
          );
        })}
      </Box>
      <Logo />
      <Banner />
      <Footer />
    </Box>
  );
};

export default Design;
