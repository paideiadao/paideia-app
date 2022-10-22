import * as React from "react";
import { AlertTitle, Box, Divider, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { CreationContext } from "../../../lib/creation/Context";
import { deviceStruct } from "@components/utilities/Style";
import useDidMountEffect from "@components/utilities/hooks";

const BasicInformation: React.FC = () => {
  let creationContext = React.useContext(CreationContext);
  let data = creationContext.api.data.basicInformation;

  useDidMountEffect(() => {
    let clean = data.daoName.toLowerCase().replaceAll(" ", "");
    creationContext.api.setData({
      ...creationContext.api.data,
      basicInformation: {
        ...data,
        daoUrl: clean === "" ? clean : "paideia.im/dao/" + clean,
      },
    });
  }, [data.daoName]);

  return (
    <Box
      sx={{
        width: deviceStruct("100%", "100%", "70%", "70%", "70%"),
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: "text.primary",
      }}
    >
      <Box
        sx={{
          textAlign: "left",
          width: "100%",
          fontSize: "1.2rem",
          mb: "16px",
        }}
      >
        Basic Information
        <Box sx={{ width: "100%", color: "text.secondary", fontSize: ".8rem" }}>
          Here you will pick your DAO's name, this will determine your DAO's URL
          as shown below and you can also write a short description of what your
          DAO is about.
        </Box>
      </Box>
      <Grid container spacing={2} direction={{ xs: "column", md: "row" }}>
        <Grid item md={6}>
          <TextField
            label="DAO Name"
            sx={{ width: "100%" }}
            value={data.daoName}
            onChange={(e) =>
              creationContext.api.setData({
                ...creationContext.api.data,
                basicInformation: {
                  ...data,
                  daoName: e.target.value,
                },
              })
            }
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            label="DAO URL"
            sx={{ width: "100%" }}
            value={data.daoUrl}
            onChange={(e) =>
              creationContext.api.setData({
                ...creationContext.api.data,
                basicInformation: {
                  ...data,
                  daoUrl: e.target.value,
                },
              })
            }
          />
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Alert severity="warning" color="warning" sx={{ fontSize: ".8rem" }}>
          <AlertTitle sx={{ fontSize: ".9rem" }}>
            You won't be able to change this once published
          </AlertTitle>
          <Box sx={{ ml: "-2rem" }}>
            The name and URL of your DAO can't be changed even if you publish
            your DAO as a draft. You will be able to review everything later
            before fully committing though.
          </Box>
        </Alert>
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <TextField
          label="DAO short description"
          inputProps={{
            maxLength: 250,
          }}
          multiline
          value={data.shortDescription}
          onChange={(e) =>
            creationContext.api.setData({
              ...creationContext.api.data,
              basicInformation: {
                ...data,
                shortDescription: e.target.value,
              },
            })
          }
          rows={5}
          sx={{ width: "100%" }}
          FormHelperTextProps={{ sx: { textAlign: "right" } }}
          helperText={`${data.shortDescription.length}/250`}
        />
      </Box>
    </Box>
  );
};

export default BasicInformation;
