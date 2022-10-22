import AbstractDate from "@components/creation/utilities/AbstractDate";
import { deviceStruct, deviceWrapper } from "@components/utilities/Style";
import SendContext, { ISendContext } from "@lib/dao/financials/SendContext";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import * as React from "react";

const RecurringForm: React.FC<{ context?: boolean }> = (props) => {
  const sendContext = React.useContext<ISendContext>(SendContext);
  // const firstPayment = sendContext.api.value.firstPayment;
  // const frequency = sendContext.api.value.firstPayment;
  // const emissionLength = sendContext.api.value.emissionLength;
  // const emissionLengthValue = sendContext.api.value.emissionLengthValue;
  // const changeWrapper () => {

  // }

  const handleChange = (event: SelectChangeEvent) => {
    sendContext.api.setValue({
      ...sendContext.api.value,
      frequency: event.target.value as
        | "Monthly"
        | "Daily"
        | "Yearly"
        | "Weekly",
    });
  };

  return (
    <>
      {sendContext.api !== undefined ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexWrap: deviceWrapper("wrap", "nowrap"),
            mb: "2rem",
          }}
        >
          <AbstractDate
            value={sendContext.api.value.firstPayment}
            setValue={(value: Date) =>
              sendContext.api.setValue({
                ...sendContext.api.value,
                firstPayment: value,
              })
            }
            label={"First payment"}
            width={deviceWrapper("48%", "25%")}
          />
          <FormControl
            sx={{
              width: deviceWrapper("48%", "30%"),
              ml: deviceWrapper(".5rem", "1rem"),
            }}
          >
            <InputLabel id="frequency-recurring-input">Frequency</InputLabel>
            <Select
              labelId="frequency-recurring-label"
              id="frequency-recurring"
              value={sendContext.api.value.frequency}
              label="Frequency"
              onChange={handleChange}
            >
              <MenuItem value={"Hourly"}>Hourly</MenuItem>
              <MenuItem value={"Weekly"}>Weekly</MenuItem>
              <MenuItem value={"Monthly"}>Monthly</MenuItem>
              <MenuItem value={"Yearly"}>Yearly</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              ml: deviceWrapper("0", "1rem"),
              mt: deviceWrapper("0.75rem", "0"),
              width: deviceStruct("80%", "70%", "37.5%", "37.5%", "37.5%"),
            }}
            variant="outlined"
          >
            <InputLabel htmlFor={`emission-length-input`}>
              Emission Length
            </InputLabel>
            <OutlinedInput
              id={`emission-length-input`}
              type="number"
              value={
                sendContext.api.value.emissionLengthValue === 0
                  ? ""
                  : sendContext.api.value.emissionLengthValue
              }
              onChange={
                (e) => null
                //   creationContext.api.setData({
                //     ...creationContext.api.data,
                //     governance: {
                //       ...data,
                //       voteDuration:
                //         e.target.value === "" ? 0 : parseInt(e.target.value),
                //     },
                //   })
              }
              endAdornment={
                <Box
                  sx={{
                    height: "100%",
                    width: "60%",
                    backgroundColor: "backgroundColor.main",
                    color: "text.primary",
                    lineHeight: "350%",
                    textAlign: "center",
                    borderRadius: "0 .3rem .3rem 0",
                    mr: "-.8rem",
                    ml: ".5rem",
                    display: "flex",
                  }}
                >
                  <FormControl fullWidth>
                    <Select
                      labelId="currency-select-label"
                      id="currency-select"
                      variant="outlined"
                      value={sendContext.api.value.emissionLength}
                      sx={{ height: "100%", color: "text.primary" }}
                      onChange={
                        (e: SelectChangeEvent) =>
                          sendContext.api.setValue({
                            ...sendContext.api.value,
                            emissionLength: e.target.value as
                              | "Months"
                              | "Days"
                              | "Years"
                              | "Weeks",
                          })
                        //   creationContext.api.setData({
                        //     ...creationContext.api.data,
                        //     governance: {
                        //       ...data,
                        //       voteDurationUnits: e.target.value,
                        //     },
                        //   })
                      }
                    >
                      <MenuItem value="Hours">Hours</MenuItem>
                      <MenuItem value="Days">Days</MenuItem>
                      <MenuItem value="Weeks">Weeks</MenuItem>
                      <MenuItem value="Months">Months</MenuItem>
                      <MenuItem value="Years">Years</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              }
              label="Emission Length"
            />
          </FormControl>
        </Box>
      ) : (
        <>loading here...</>
      )}
    </>
  );
};
export default RecurringForm;
