import { Avatar, Box } from "@mui/material";
import * as React from "react";
import dateFormat from "dateformat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { deviceWrapper } from "@components/utilities/Style";
import { generateSlug } from "@lib/utilities";
import Link from "@components/Link";
import { useRouter } from "next/router";
import { shorterString } from "@lib/ShorterString";

export interface IActivity {
  img_url: string;
  name: string;
  action: string;
  value: string;
  date: Date;
  category: string;
  secondary?: string;
  secondaryValue?: string;
  link?: string;
}

const Activity: React.FC<{ i: IActivity; c: number }> = (props) => {
  const router = useRouter();
  const { dao } = router.query;
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
          gap: deviceWrapper(0, 4)
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            minWidth: 0,
            alignItems: "center",
            // width: deviceWrapper("100%", "65%"),
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
            {!props.i.name.includes(" ") &&
              !["Withdrawal"].includes(props.i.name) ? (
              <Link
                sx={{ textDecoration: "none", color: "text.primary" }}
                href={`/${dao}/members/${props.i.name}`}
              >
                {props.i.name}
              </Link>
            ) : (
              props.i.name
            )}{" "}
            <Box
              sx={{
                display: "inline",
                color: "text.secondary",
                ml: ".1rem",
                mr: ".1rem",
              }}
            >
              {props.i.action}
            </Box>{" "}
            {props.i.link
              ? <Link
                sx={{
                  textDecoration: "none", color: "text.primary",
                  overflowWrap: props.i.value.length > 30 && !props.i.value.includes(" ") ? 'break-word' : 'normal',
                  wordBreak: props.i.value.length > 30 && !props.i.value.includes(" ") ? 'break-all' : 'normal'
                }}
                href={
                  props.i.link ? generateRedirectUrl(props.i, String(dao)) : ""
                }
              >
                {props.i.value}
              </Link>
              : props.i.value
            }
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
            gap: 1,
            flexDirection: deviceWrapper("row", "row-reverse"),
            // mt: deviceWrapper(".0rem", "0"),
            minWidth: 0,  // Prevent flexbox overflow
          }}
        >
          <CalendarTodayIcon
            sx={{ fontSize: deviceWrapper("1rem", "1.5rem") }}
          />
          {dateFormat(props.i.date, "mmm dd, yyyy: h:MM")}
        </Box>
      </Box>
    </Box>
  );
};

const generateRedirectUrl = (activity: IActivity, dao: string) => {
  if (["Transactions", "Staking"].includes(activity.category)) {
    return `https://explorer.ergoplatform.com/en/transactions/${activity.link}`;
  }
  const url =
    "/" +
    dao +
    "/proposal/" +
    generateSlug(activity.link ?? "", activity.value);
  if (activity.category === "Comments") {
    return url + "?tab=comments";
  }
  return String(url);
};

export default Activity;
