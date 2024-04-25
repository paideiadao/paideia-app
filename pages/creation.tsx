import { Box, Modal } from "@mui/material";
import React from "react";
import Nav from "@components/creation/nav/SideNav";
import { LightTheme, DarkTheme } from "@theme/theme";
import Button from "@mui/material/Button";
import BasicInformation from "@components/creation/basic-information/BasicInformation";
import { CreationContext } from "@lib/creation/Context";
import { CreationApi } from "../lib/creation/CreationApi";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { checkCompleteness } from "@lib/creation/Utilities";
import Governance from "@components/creation/governance/Governance";
import Tokenomics from "@components/creation/tokenomics/Tokenomics";
import Design from "@components/creation/design/Design";
import Review from "@components/creation/review/Review";
import CreationLoading from "@components/creation/loading/CreationLoading";
import { modalBackground } from "@components/utilities/modalBackground";
import Status from "@components/utilities/Status";
import { deviceStruct } from "@components/utilities/Style";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { ICreationData } from "@lib/creation/Interfaces";

export let colorLookup = {
  light: "#FFFFFF",
  dark: "#0E1420",
};

export default function Creation() {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [alert, setAlert] = React.useState({
    show: false,
    value: "",
    current: "",
    action: "",
  });
  const [theme, setTheme] = React.useState(LightTheme);
  const [data, setData] = React.useState<ICreationData>({
    navStage: 0,
    basicInformation: {
      daoName: "",
      daoUrl: "",
      shortDescription: "",
    },
    governance: {
      optimisticGovernance: false,
      quadraticVoting: false,
      timeToChallenge: 0,
      timeToChallengeUnits: "days",
      quorum: 4,
      voteDuration: 0,
      voteDurationUnits: "days",
      whitelist: [
        {
          alias: "",
          address: "",
          img: "",
        },
      ],
      amount: "",
      currency: "",
      supportNeeded: 50,
    },
    tokenomics: {
      type: "create",
      tokenName: "",
      tokenId: "",
      tokenTicker: "",
      tokenAmount: 0,
      tokenImage: -1,
      tokenImageUrl: "",
      tokenRemaining: 0,
      tokenHolders: [
        {
          alias: "",
          address: "",
          img: "",
          balance: 0,
          percentage: 0,
        },
      ],
      activateTokenomics: false,
      distributions: [],
    },
    design: {
      logo: {
        url: "",
        file: undefined,
      },
      theme: 1,
      banner: {
        show: false,
        data: { url: "", file: undefined },
      },
      footer: {
        show: false,
        mainText: "",
        links: [],
      },
    },
    isDraft: 0,
    isPublished: 0,
    review: 0,
    draftModal: false,
  });

  let content = [
    <BasicInformation key={1} />,
    <Tokenomics key={2} />,
    <Governance key={3} />,
    <Design key={4} />,
    <Review key={5} />,
  ];

  React.useEffect(() => {
    setTheme(localStorage.getItem("theme") === "dark" ? DarkTheme : LightTheme);
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [data.navStage]);

  React.useEffect(() => {
    if (["success", "info"].indexOf(alert.value) > -1) {
      setTimeout(
        () => setAlert({ show: false, value: "", current: "", action: "" }),
        3000
      );
    }
  }, [alert]);

  const api = new CreationApi(globalContext.api, data, setData);
  return (
    <CreationContext.Provider value={{ api }}>
      {data.isPublished === 1 ? (
        <CreationLoading />
      ) : (
        <>
          <Nav
            value={data.review === undefined ? data.navStage : 4}
            theme={theme}
            setTheme={setTheme}
          />
          <Box
            sx={{
              ml: { xs: 0, md: "15rem" },
              // mt: deviceStruct("6rem", "6rem", "3.5rem", "3.5rem", "3.5rem"),
              width: deviceStruct(
                "100%",
                "100%",
                "calc(100% - 15rem)",
                "calc(100% - 15rem)",
                "calc(100% - 15rem)"
              ),
              px: "16px",
              pt: deviceStruct(".75rem", ".75rem", "1rem", "1.5rem", "1.5rem"),
              display: "flex",
              flexDirection: "column",
              height: "calc(100% - 3rem)",
              pb: deviceStruct(".5rem", ".5rem", "1rem", "1.5rem", "1.5rem"),
              // overflowY: "scroll",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {content[data.navStage]}
            </Box>
            {data.review !== undefined && data.navStage !== 4 && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: "1rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setData({ ...data, navStage: 4 })}
                  sx={{ ml: 1 }}
                >
                  Back to Review
                </Button>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                mt: ".5rem",
              }}
            >
              {data.navStage < 4 && (
                <>
                  {data.navStage > 0 && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<ArrowBackIcon />}
                      sx={{
                        width: deviceStruct(
                          "90%",
                          "90%",
                          "fit-content",
                          "fit-content",
                          "fit-content"
                        ),
                        mr: ".5rem",
                        ml: ".5rem",
                      }}
                      onClick={() =>
                        setData({ ...data, navStage: data.navStage - 1 })
                      }
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    disabled={checkCompleteness(data)}
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    size="small"
                    sx={{
                      width: deviceStruct(
                        "90%",
                        "90%",
                        "fit-content",
                        "fit-content",
                        "fit-content"
                      ),
                      mr: data.navStage > 0 ? ".5rem" : "0",
                    }}
                    onClick={() =>
                      setData({ ...data, navStage: data.navStage + 1 })
                    }
                  >
                    Next
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </>
      )}
      <Modal
        open={data.draftModal}
        onClose={() => setData({ ...data, draftModal: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...modalBackground,
            width: deviceStruct("90%", "90%", "35%", "35%", "35%"),
          }}
        >
          <Box sx={{ fontSize: "1.1rem", fontWeight: 450 }}>
            You are about to publish your DAO as a draft
          </Box>
          <Box sx={{ mt: "1rem", fontSize: ".9rem" }}>
            Please keep in mind that if you continue you won&apos;t be able to change
            either your DAO&apos;s name or it&apos;s URL. The rest of the properties can
            be changed though. Also, your tokens won&apos;t be minted or distributed
            until you publish the final version.
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              mt: "1rem",
            }}
          >
            <Box sx={{ ml: "auto" }}>
              <Button
                sx={{ mr: "1rem" }}
                onClick={() => setData({ ...data, draftModal: false })}
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  setData({
                    ...data,
                    isDraft: 1,
                    isPublished: 1,
                    draftModal: false,
                  })
                }
              >
                Publish DAO AS A DRAFT
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {alert.show && (
        <Status
          value={alert.value}
          current={alert.current}
          action={alert.action}
        />
      )}
    </CreationContext.Provider>
  );
}
