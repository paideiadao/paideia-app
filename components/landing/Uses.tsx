import React, { FC } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  FabClassKey,
} from "@mui/material";
import SectionTitle from "@components/SectionTitle";
import Blockquote from "@components/Blockquote";
import CardSlider from "@components/CardSlider";
import { DarkTheme } from "@theme/theme";

const cardTitleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  lineHeight: "32px",
  fontFamily: '"Space Grotesk", sans-serif',
  mt: "2px",
  mb: "16px",
};

interface MyCardProps {
  image: string;
  title: string;
  body: string;
}

const MyCard: FC<MyCardProps> = ({ image, title, body }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#20252f",
        backgroundImage: 'url("/card-bg.jpg")',
        width: "460px",
        maxWidth: "calc(100vw - 48px)",
        display: "inline-flex",
        whiteSpace: "normal",
        px: "20px",
        py: "32px",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <CardContent>
        <img src={image} width={35} height={35} />
        <Typography sx={cardTitleStyle}>{title}</Typography>
        <Blockquote small noIndent sx={{ mb: "0px" }}>
          {body}
        </Blockquote>
      </CardContent>
    </Card>
  );
};

const theCards = [
  {
    title: "Existing DAOs",
    body: "DAOs with existing tokens can use Paideia. Just put in the token ID when creating a DAO on the platform. ",
    image: "/icons/HandshakeIcon.svg",
  },
  {
    title: "Investor Groups",
    body: "Using a DAO, groups of people can pool their funds and manage each members' stake in the overall investment. Eliminate the need to trust a specific individual with control of the funds.",
    image: "/icons/ChartIcon.svg",
  },
  {
    title: "Blockchain Development Teams",
    body: "Crowdsource funding for a project, and launch a DAO to manage the treasury. Give contributors a say in the direction of project development.",
    image: "/icons/DevIcon.svg",
  },
  {
    title: "Startups",
    body: "Paideia allows startups to raise funds on chain, and manage the treasury with a group of executives. Investors can follow the process through blockchain transparency. ",
    image: "/icons/FingerSnapIcon.svg",
  },
  {
    title: "Blockchain Projects",
    body: "Rugpull resistance is built in because investors have a say in how the treasury is spent.",
    image: "/icons/CubesIcon.svg",
  },
  {
    title: "P2E Gaming Guilds",
    body: "Crowdsource funding for a project, and launch a DAO to manage the treasury. Give contributors a say in the direction of project development.",
    image: "/icons/GamingIcon.svg",
  },
];

export default function Uses() {
  return (
    <>
      <Container sx={{ px: "24px" }}>
        <Grid container sx={{ pt: "120px", pb: "64px" }}>
          <Grid item md={5}>
            <Grid container spacing={3}>
              <Grid item>
                <SectionTitle>Uses</SectionTitle>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: "48px",
                    fontWeight: "400",
                    lineHeight: "116.7%",
                    color: DarkTheme.palette.text.primary,
                    textTransform: "uppercase",
                    fontFamily: '"Viga", sans-serif',
                  }}
                >
                  What can you do?&lt;
                </Typography>
              </Grid>
              <Grid item>
                <Blockquote noIndent small>
                  There are a lot of ways to use a DAO. Here are just a few
                  examples of the types of organizations that could launch a DAO
                  on Paideia.
                </Blockquote>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={7}></Grid>
        </Grid>
      </Container>
      <CardSlider uniqueId="uses" addMargin={24}>
        {theCards.map(({ title, body, image }, i: number) => {
          return <MyCard key={i} title={title} body={body} image={image} />;
        })}
      </CardSlider>
    </>
  );
}
