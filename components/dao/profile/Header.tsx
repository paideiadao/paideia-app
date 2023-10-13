import { Avatar, Box, Button, LinearProgress, Modal } from "@mui/material";
import * as React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { GlobalContext } from "@lib/AppContext";
import { modalBackground } from "@components/utilities/modalBackground";
import { Header } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import EditFollow from "./EditFollow";
import { IDaoUserData } from "@lib/Interfaces";
import { snipAddress } from "@lib/utilities";

interface ILevel {
  name: string;
  points: number;
}

export const levels: ILevel[] = [
  { name: "Citizen", points: 0 },
  { name: "Citizen", points: 100 },
  { name: "Citizen", points: 200 },
  { name: "Citizen", points: 500 },
  { name: "Citizen", points: 1000 },
  { name: "Citizen", points: 2000 },
  { name: "Citizen", points: 3000 },
  { name: "Citizen", points: 5000 },
  { name: "Citizen", points: 8000 },
  { name: "Citizen", points: 12000 },
  { name: "Citizen", points: 20000 },
];

interface IAction {
  action: string;
  pointsEarned: number;
}

let actions: IAction[] = [
  { action: "Get upvoted on a comment or a proposal", pointsEarned: 10 },
  { action: "Vote on a proposal", pointsEarned: 100 },
  { action: "Get your proposal approved", pointsEarned: 500 },
];

const ProfileHeader: React.FC<{
  edit?: boolean;
  followed?: boolean;
  data: IDaoUserData;
}> = (props) => {
  let globalContext = React.useContext(GlobalContext);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    props.data !== undefined && (
      <Box
        sx={{
          ml: deviceWrapper("0", "1rem"),
          display: "flex",
          alignItems: deviceWrapper("center", "flex-start"),
          mt: ".5rem",
          flexDirection: deviceWrapper("column", "row"),
        }}
      >
        <Avatar
          sx={{
            mr: deviceWrapper("0", ".5rem"),
            width: deviceWrapper("8rem", "4.5rem"),
            height: deviceWrapper("8rem", "4.5rem"),
          }}
          src={props.data.profile_img_url}
        ></Avatar>
        <Box
          sx={{
            fontSize: "1.3rem",
            display: deviceWrapper("block", "none"),
            mx: 1,
            overflow: "hidden",
          }}
        >
          {snipAddress(props.data.name, 25, 12)}
        </Box>
        <Box
          sx={{
            display: deviceWrapper("block", "none"),
            mt: ".5rem",
            mb: "1.5rem",
          }}
        >
          <EditFollow
            edit={props.edit}
            followed={props.followed}
            user_id={props.data.id}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: deviceWrapper("100%", "75%"),
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {props.data.name}
            </Box>
            <Box
              sx={{
                color: "text.secondary",
                fontSize: deviceWrapper(".9rem", ".7rem"),
                display: "flex",
                alignItems: "center",
                width: "100%",
                mt: "-.5rem",
                mb: ".5rem",
              }}
            >
              Lvl {props.data.level} | {levels[props.data.level].name}
              <Box sx={{ ml: "auto" }}>
                <Button
                  onClick={handleOpen}
                  startIcon={<InfoIcon />}
                  size="small"
                >
                  Learn More
                </Button>
              </Box>
            </Box>
            <Box sx={{ width: "100%", height: ".5rem", pr: 1 }}>
              <LinearProgress variant="determinate" value={15} />
            </Box>
            <Box sx={{ width: "100%", display: "flex", pr: 1 }}>
              <Box
                sx={{ ml: "auto", color: "text.secondary", fontSize: ".7rem" }}
              >
                {levels[props.data.level + 1].points -
                  levels[props.data.level].points}{" "}
                PTS till next lvl
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: deviceWrapper("none", "flex"),
              height: "100%",
              alignItems: "center",
              ml: "auto",
            }}
          >
            <EditFollow
              edit={props.edit}
              followed={props.followed}
              user_id={props.data.id}
            />
          </Box>
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              ...modalBackground,
              backgroundColor: "fileInput.main",
              width: deviceWrapper("18rem", "30rem"),
              pb: ".5rem",
            }}
          >
            <Header title="How do levels work?" />
            <Box
              sx={{ fontSize: deviceWrapper(".6rem", ".9rem"), mt: ".5rem" }}
            >
              We have a level system that easily identifies users that are more
              engaged members of the community. The way it works is straight
              forward. Different actions get you points and each time you reach
              a specific amount of points, you reach a new level.
            </Box>
            <Box sx={{ mt: ".5rem" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  mt: ".25rem",
                  mb: ".25rem",
                  color: "text.primary",
                  fontSize: deviceWrapper(".6rem", ".9rem"),
                }}
              >
                <Box>Level</Box>
                <Box sx={{ ml: "auto" }}>Points needed</Box>
              </Box>
              {levels.map((i: ILevel, c: number) => (
                <Box
                  key={`level-key-${c}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    mt: ".25rem",
                    mb: ".25rem",
                    color: "text.secondary",
                    fontSize: deviceWrapper(".6rem", ".9rem"),
                  }}
                >
                  <Box>
                    Level {c} - {i.name}
                  </Box>
                  <Box sx={{ ml: "auto" }}>{i.points} Points</Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: ".5rem" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  mt: ".25rem",
                  mb: ".25rem",
                  color: "text.primary",
                  fontSize: deviceWrapper(".6rem", ".9rem"),
                }}
              >
                <Box>Actions</Box>
                <Box sx={{ ml: "auto" }}>Points earned</Box>
              </Box>
              {actions.map((i: IAction, c: number) => (
                <Box
                  key={`action-key-${c}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    mt: ".25rem",
                    mb: ".25rem",
                    color: "text.secondary",
                    fontSize: deviceWrapper(".6rem", ".9rem"),
                  }}
                >
                  <Box>{i.action}</Box>
                  <Box
                    sx={{ ml: "auto", minWidth: deviceWrapper("30$", "0%") }}
                  >
                    +{i.pointsEarned} points
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ width: "100%", display: "flex", mt: ".5rem" }}>
              <Button
                variant="text"
                onClick={handleClose}
                sx={{ ml: "auto" }}
                size="small"
              >
                Got it
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    )
  );
};

export default ProfileHeader;
