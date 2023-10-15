import Progress from "./Progress";
import React, { FC } from "react";
import { Box, Divider, Step, StepLabel, Stepper, Theme } from "@mui/material";
import StepSelector, { steps } from "./StepSelector";
import Help from "./Help";
import DarkLogo from "@public/logos/dark_logo.svg";
import LightLogo from "@public/logos/light_logo.svg";
import { DarkTheme } from "@theme/theme";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Save from "@mui/icons-material/Save";
import { CreationContext } from "@lib/creation/Context";
import { ThemeContext } from "@lib/ThemeContext";
import { deviceStruct } from "@components/utilities/Style";
import ThemeToggle from "@components/dao/nav/ThemeToggle";

interface INavProps {
  value: number;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const Nav: FC<INavProps> = ({ value }) => {
  let creationContext = React.useContext(ThemeContext);
  let global = React.useContext(CreationContext);

  let theme = creationContext.theme;
  const [logo, setLogo] = React.useState(
    theme === DarkTheme ? LightLogo : DarkLogo
  );

  React.useEffect(() => {
    setLogo(theme === DarkTheme ? LightLogo : DarkLogo);
  }, [theme]);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "15rem",
          pb: 2,
          borderRight: "1px solid",
          borderBottom: "1px solid",
          borderRightColor: "border.main",
          borderBottomColor: "border.main",
          backgroundColor: "backgroundColor.main",
          color: "color.main",
          display: deviceStruct(
            "none",
            "none",
            "inherit",
            "inherit",
            "inherit"
          ),
        }}
      >
        <Progress value={value} />
        <Divider sx={{ mt: 2, mb: 1, borderBottomColor: "border.main" }} />
        <StepSelector value={value} />
        <Divider sx={{ mt: 1, mb: 1, borderBottomColor: "border.main" }} />
        <Help />
      </Box>
      <Box
        sx={{
          position: "sticky",
          top: "0",
          ml: deviceStruct("0", "0", "15rem", "15rem", "15rem"),
          backgroundColor: "backgroundColor.main",
          borderBottom: "1px solid",
          borderBottomColor: "border.main",
          width: deviceStruct(
            "100%",
            "100%",
            "calc(100% - 15rem)",
            "calc(100% - 15rem)",
            "calc(100% - 15rem)"
          ),
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 2,
            pr: 2,
            width: "100%",
            height: "3.5rem",
            color: "text.primary",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.6rem",
              mr: "1.5rem",
            }}
          >
            <img src={logo.src} />
          </Box>
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            {/* <Box sx={{ width: "180px" }}>
              <ThemeToggle />
            </Box> */}
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteIcon />}
              size="small"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
              size="small"
              endIcon={<Save />}
              onClick={() =>
                global.api.setData({ ...global.api.data, draftModal: true })
              }
            >
              Save
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "fileInput.main",
            zIndex: 1000,
            pb: ".5rem",
            pt: ".5rem",
            borderTop: "1px solid",
            borderTopColor: "border.main",
            height: "2.5rem",
            display: deviceStruct("block", "block", "none", "none", "none"),
          }}
        >
          <Stepper
            activeStep={value}
            connector={
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  ml: "-.3rem",
                }}
              >
                <Box
                  sx={{ width: "100%", border: 1, borderColor: "border.main" }}
                ></Box>
              </Box>
            }
          >
            {steps.map((i: any, c: number) => (
              <Step
                key={i.title}
                sx={{
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <StepLabel sx={{ ml: ".1rem" }}>
                  {c === value && (
                    <Box sx={{ fontSize: ".68rem", width: "5.6rem" }}>
                      {i.title}
                    </Box>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
    </>
  );
};

export default Nav;
