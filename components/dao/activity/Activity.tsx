import { Avatar, Box } from "@mui/material";
import * as React from "react";
import dateFormat from "dateformat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { deviceWrapper } from "@components/utilities/Style";

export interface IActivity {
  img_url: string;
  name: string;
  action: string;
  value: string;
  date: Date;
  category: string;
  secondary?: string;
  secondaryValue?: string;
}

const Activity: React.FC<{ i: IActivity; c: number }> = (props) => {
  return (
    <Box
      key={`activities-key-${props.c}`}
      sx={{
        width: "100%",
        pt: "1rem",
        display: "flex",
        alignItems: "center",
        fontSize: ".8rem",
        flexWrap: deviceWrapper("wrap", "nowrap"),
        overflowX: "hidden",
      }}
    >
      <Avatar
        sx={{
          mr: ".5rem",
          width: "2rem",
          height: "2rem",
          display: deviceWrapper("flex", "none"),
        }}
        src={props.i.img_url}
      ></Avatar>
      <Box
        sx={{
          width: deviceWrapper("80%", "100%"),
          display: "flex",
          flexDirection: deviceWrapper("column", "row"),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: deviceWrapper("100%", "65%"),
          }}
        >
          <Avatar
            sx={{
              mr: ".5rem",
              width: "2rem",
              height: "2rem",
              display: deviceWrapper("none", "flex"),
            }}
            src={props.i.img_url}
          ></Avatar>
          <Box>
            {props.i.name + " "}
            <Box
              sx={{
                display: "inline",
                color: "text.secondary",
                ml: ".1rem",
                mr: ".1rem",
              }}
            >
              {props.i.action}
            </Box>
            {" " +
              (props.i.value.length > 120
                ? props.i.value.substring(0, 120) + "..."
                : props.i.value)}
            {props.i.secondary !== undefined && (
              <Box
                sx={{
                  display: "inline",
                  color: "text.secondary",
                  ml: ".1rem",
                  mr: ".1rem",
                }}
              >
                {" " + props.i.secondary}
              </Box>
            )}
            {props.i.secondaryValue !== undefined &&
              " " + props.i.secondaryValue}
          </Box>
        </Box>

        <Box
          sx={{
            ml: deviceWrapper("0", "auto"),
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
            mt: deviceWrapper(".0rem", "0"),
          }}
        >
          <CalendarTodayIcon
            sx={{ mr: ".5rem", fontSize: deviceWrapper("1rem", "1.5rem") }}
          />
          {dateFormat(props.i.date, "mmm dd, yyyy: h:MM")}
        </Box>
      </Box>
    </Box>
  );
};

export default Activity;
