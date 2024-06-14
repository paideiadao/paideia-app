import { Header } from "@components/creation/utilities/HeaderComponents";
import { deviceStruct } from "@components/utilities/Style";
import {
  ConfigContext,
  IConfigContext,
} from "@lib/dao/dao-config/ConfigContext";
import { Box, FormHelperText, TextField } from "@mui/material";
import * as React from "react";

const BasicInformation: React.FC = () => {
  const context = React.useContext<IConfigContext>(ConfigContext);
  const data = context.api?.data.basicInformation;

  const checkError = () => {
    return data?.daoName !== "" && data?.daoUrl !== "";
  };

  return (
    <>
      <Header
        title="Basic Information"
        subtitle="Here you will pick your DAO's name, this will determine your DAO's URL
        as shown below and you can also write a short description of what your
        DAO is about."
        mb=".25rem"
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: 2,
          flexDirection: deviceStruct("column", "column", "row", "row", "row"),
        }}
      >
        <Box
          sx={{
            width: deviceStruct("100%", "100%", "50%", "50%", "50%"),
            mr: deviceStruct("0", "0", ".5rem", ".5rem", ".5rem"),
            mt: deviceStruct(".25rem", "1rem", "0", "0", "0"),
          }}
        >
          <TextField
            label="DAO Name"
            sx={{ width: "100%" }}
            value={data?.daoName}
            onChange={(e) =>
              context.api?.setData({
                ...context.api.data,
                basicInformation: {
                  ...data,
                  daoName: e.target.value,
                },
              })
            }
          />
        </Box>
        <Box
          sx={{
            width: deviceStruct("100%", "100%", "50%", "50%", "50%"),
            mr: deviceStruct("0", "0", ".5rem", ".5rem", ".5rem"),
            mt: deviceStruct("1rem", "1rem", "0", "0", "0"),
          }}
        >
          <TextField
            label="DAO URL"
            sx={{ width: "100%" }}
            value={data?.daoUrl}
            onChange={(e) =>
              context.api?.setData({
                ...context.api.data,
                basicInformation: {
                  ...data,
                  daoUrl: e.target.value,
                },
              })
            }
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <TextField
          rows={3}
          label="DAO Short Description"
          inputProps={{
            maxLength: 250,
          }}
          multiline
          value={data?.shortDescription}
          onChange={(e) =>
            context.api?.setData({
              ...context.api.data,
              basicInformation: {
                ...data,
                shortDescription: e.target.value,
              },
            })
          }
          sx={{ width: "100%" }}
          FormHelperTextProps={{ sx: { textAlign: "right" } }}
          helperText={`${data?.shortDescription.length}/250`}
        />
      </Box>
      {!checkError() && (
        <FormHelperText error>Invalid Configuration</FormHelperText>
      )}
    </>
  );
};

export default BasicInformation;
