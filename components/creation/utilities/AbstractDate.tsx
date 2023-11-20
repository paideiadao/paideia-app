import { Box, TextField } from "@mui/material";
import * as React from "react";
import { CapsInfo } from "./HeaderComponents";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dateFormat from "dateformat";
import EditIcon from "@mui/icons-material/Edit";

const AbstractDate: React.FC<{
  value: Date;
  setValue: Function;
  label: string;
  width: string | any;
  mr?: string;
}> = (props) => {
  let temp = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        showToolbar
        ToolbarComponent={(props) => (
          <Box
            sx={{
              pt: ".8rem",
              pl: "1.2rem",
              pr: "1.2rem",
              pb: ".5rem",
              backgroundColor: "backgroundColor.main",
              borderBottom: "1px solid",
              borderBottomColor: "border.main",
            }}
          >
            <CapsInfo title="Select Date" />
            <Box
              sx={{
                color: "text.primary",
                display: "flex",
                mt: "-.6rem",
              }}
            >
              {dateFormat(temp.value, "ddd, mmm d")}
              <Box sx={{ ml: "auto" }}>
                <EditIcon color="primary" />
              </Box>
            </Box>
          </Box>
        )}
        label={props.label}
        value={props.value}
        InputAdornmentProps={{ position: "start", variant: "standard" }}
        onChange={(newValue) => {
          props.setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={null}
            sx={{
              width: props.width,
              svg: { color: "primary.main" },
              mr: props.mr,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default AbstractDate;
