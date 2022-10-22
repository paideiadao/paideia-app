import * as React from "react";
import { ISocialLink } from "@lib/creation/Interfaces";
import { CreationContext } from "@lib/creation/Context";
import {
  Subheader,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Collapse
} from "@mui/material";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import AddIcon from "@mui/icons-material/Add";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import GitHubIcon from "@mui/icons-material/GitHub";
import DeleteIcon from "@mui/icons-material/Delete";
import { deviceStruct } from "@components/utilities/Style";
import { IConfigContext } from "@lib/dao/dao-config/ConfigContext";

const Footer: React.FC<{ context?: IConfigContext }> = (props) => {
  let creationContext =
    props.context === undefined
      ? React.useContext(CreationContext)
      : props.context;

  let data = creationContext.api.data.design;
  let setData = (data: any) => {
    creationContext.api.setData({
      ...creationContext.api.data,
      design: data,
    });
  };
  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderTopColor: "border.main",
        pt: "1rem",
        mt: "1rem",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%", mb: "1rem" }}>
        <Box sx={{ mb: ".5rem" }}>
          <Subheader title="Footer" />
        </Box>
        <Subtitle subtitle="Add a footer with your own personalized text and link the DAO socials to it." />
      </Box>
      <LabeledSwitch
        title="Show footer"
        value={data.footer.show}
        onChange={() =>
          setData({
            ...data,
            footer: {
              ...data.footer,
              show: !data.footer.show,
            },
          })
        }
      />
      <Collapse in={data.footer.show}>
        <Box sx={{ width: "100%", color: "text.primary" }}>
          <TextField
            label="Main text"
            value={data.footer.mainText}
            sx={{ width: "100%", mb: "1rem" }}
            onChange={(e: any) =>
              setData({
                ...data,
                footer: { ...data.footer, mainText: e.target.value },
              })
            }
          />

          <Subheader title="Social Links" small />
          <Box sx={{ mt: ".5rem" }}>
            {data.footer.links.map((i: ISocialLink, c: number) => (
              <SocialRow
                c={c}
                data={i}
                key={`social-link-${c}`}
                set={(m: any) => {
                  let temp = [...data.footer.links];
                  temp[c] = m;
                  setData({
                    ...data,
                    footer: {
                      ...data.footer,
                      links: temp,
                    },
                  });
                }}
                delete={(m: any) => {
                  let temp = [...data.footer.links];
                  temp.splice(c, 1);
                  setData({
                    ...data,
                    footer: {
                      ...data.footer,
                      links: temp,
                    },
                  });
                }}
              />
            ))}
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              size="small"
              onClick={() => {
                let temp = [...data.footer.links];
                temp.push({
                  socialNetwork: "",
                  address: "",
                });
                setData({ ...data, footer: { ...data.footer, links: temp } });
              }}
            >
              <AddIcon sx={{ mr: ".5rem" }} />
              Add {data.footer.links.length > 0 ? "Another" : ""}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export const SocialRow: React.FC<{
  data: ISocialLink;
  set: Function;
  c: number;
  delete: Function;
}> = (props) => {
  return (
    <Box
      sx={{
        mt: "1rem",
        mb: "1rem",
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexWrap: deviceStruct("wrap", "wrap", "nowrap", "nowrap", "nowrap"),
      }}
    >
      <FormControl
        sx={{
          width: deviceStruct("83%", "83%", "35%", "35%", "35%"),
          mr: ".5rem",
        }}
      >
        <InputLabel htmlFor={`social-link-label-${props.c}`}>
          Social network
        </InputLabel>
        <Select
          labelId={`social-link-label-${props.c}`}
          id={`social-link-${props.c}`}
          variant="outlined"
          label="Social network"
          value={props.data.socialNetwork}
          renderValue={(value: string) => {
            switch (value) {
              case "reddit": {
                return <Reddit />;
              }
              case "youtube": {
                return <Youtube />;
              }
              case "telegram": {
                return <Telegram />;
              }
              case "twitter": {
                return <Twitter />;
              }
              case "discord": {
                return <Discord />;
              }
              case "medium": {
                return <Medium />;
              }
              case "github": {
                return <Github />;
              }
              case "facebook": {
                return <Facebook />;
              }
              case "instagram": {
                return <Instagram />;
              }
            }
          }}
          sx={{ height: "100%", color: "text.primary" }}
          onChange={(e: any) =>
            props.set({ ...props.data, socialNetwork: e.target.value })
          }
        >
          <MenuItem value="reddit">
            <Reddit />
          </MenuItem>
          <MenuItem value="youtube">
            <Youtube />
          </MenuItem>
          <MenuItem value="telegram">
            <Telegram />
          </MenuItem>
          <MenuItem value="twitter">
            <Twitter />
          </MenuItem>
          <MenuItem value="discord">
            <Discord />
          </MenuItem>
          <MenuItem value="medium">
            <Medium />
          </MenuItem>
          <MenuItem value="github">
            <Github />
          </MenuItem>
          <MenuItem value="facebook">
            <Facebook />
          </MenuItem>
          <MenuItem value="instagram">
            <Instagram />
          </MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          width: "13%",
          display: deviceStruct("flex", "flex", "none", "none", "none"),
          justifyContent: "center",
        }}
      >
        <IconButton color="error" onClick={() => props.delete()}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
      <TextField
        label="Address"
        sx={{
          width: deviceStruct("100%", "100%", "60%", "60%", "60%"),
          mt: deviceStruct(".5rem", ".5rem", "0", "0", "0"),
        }}
        value={props.data.address}
        onChange={(e: any) =>
          props.set({ ...props.data, address: e.target.value })
        }
      />
      <Box
        sx={{
          width: "13%",
          display: deviceStruct("none", "none", "flex", "flex", "flex"),
          justifyContent: "center",
        }}
      >
        <IconButton color="error" onClick={() => props.delete()}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </Box>
  );
};

const Reddit: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <RedditIcon sx={{ mr: ".5rem" }} />
      Reddit
    </Box>
  );
};

const Twitter: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TwitterIcon sx={{ mr: ".5rem" }} />
      Twitter
    </Box>
  );
};

const Youtube: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <YouTubeIcon sx={{ mr: ".5rem" }} />
      Youtube
    </Box>
  );
};

const Telegram: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TelegramIcon sx={{ mr: ".5rem" }} />
      Telegram
    </Box>
  );
};

const Discord: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TelegramIcon sx={{ mr: ".5rem" }} />
      Discord
    </Box>
  );
};

const Medium: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TelegramIcon sx={{ mr: ".5rem" }} />
      Telegram
    </Box>
  );
};

const Github: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <GitHubIcon sx={{ mr: ".5rem" }} />
      GitHub
    </Box>
  );
};

const Facebook: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <FacebookIcon sx={{ mr: ".5rem" }} />
      Facebook
    </Box>
  );
};

const Instagram: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <InstagramIcon sx={{ mr: ".5rem" }} />
      Instagram
    </Box>
  );
};

export default Footer;
