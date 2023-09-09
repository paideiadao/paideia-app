import { Header } from "@components/creation/utilities/HeaderComponents";
import { deviceStruct } from "@components/utilities/Style";
import {
  ConfigContext,
  IConfigContext,
} from "@lib/dao/dao-config/ConfigContext";
import { Box, TextField } from "@mui/material";
import * as React from "react";

const BasicInformation: React.FC = () => {
  const context = React.useContext<IConfigContext>(ConfigContext);
  const data = context.api.data.basicInformation;
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
            value={data.daoName}
            disabled
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
            value={data.daoUrl}
            disabled
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: 2 }}>
        <TextField
          disabled
          label="DAO short description"
          inputProps={{
            maxLength: 250,
          }}
          multiline
          value={data.shortDescription}
          onChange={(e) =>
            context.api.setData({
              ...context.api.data,
              basicInformation: {
                ...data,
                shortDescription: e.target.value,
              },
            })
          }
          maxRows={5}
          sx={{ width: "100%" }}
          FormHelperTextProps={{ sx: { textAlign: "right" } }}
          helperText={`${data.shortDescription.length}/250`}
        />
      </Box>
    </>
  );
};

export default BasicInformation;
