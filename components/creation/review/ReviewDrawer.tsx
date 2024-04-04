import { Avatar, Box, Button } from "@mui/material";
import * as React from "react";
import { CreationContext } from "../../../lib/creation/Context";
import CircleIcon from "@mui/icons-material/Circle";
import PersonIcon from "@mui/icons-material/Person";
import BasicInformation from "./BasicInformation";
import Governance from "./Governance";
import Tokenomics from "./Tokenomics";
import Design from "./Design";
import { deviceStruct } from "@components/utilities/Style";

export const Value: React.FC<{
  labelWidth: string;
  title: string;
  value?: any;
  component?: JSX.Element;
}> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        mt: "1rem",
        mb: "1rem",
        height: "100%",
        fontSize: deviceStruct(".9rem", ".9rem", "1rem", "1rem", "1rem"),

        flexDirection: deviceStruct("column", "column", "row", "row", "row"),
      }}
    >
      <Box
        sx={{
          width: deviceStruct(
            "100%",
            "100%",
            props.labelWidth,
            props.labelWidth,
            props.labelWidth
          ),
          color: "text.secondary",
        }}
      >
        {props.title}
      </Box>
      {props.component === undefined ? (
        <Box>{props.value}</Box>
      ) : (
        props.component
      )}
    </Box>
  );
};

export const WalletListing: React.FC<{ data: any }> = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {props.data.map((i: any) => (
        <Box
          key={`wallet-listing-${i.alias}`}
          sx={{
            display: "flex",
            alignItems: "center",
            mt: ".5rem",
            mb: ".5rem",
          }}
        >
          <Avatar src={i.img}>
            <PersonIcon color="primary" />
          </Avatar>
          <Box sx={{ ml: ".5rem" }}>
            <Box sx={{ fontSize: ".9rem" }}>{i.alias}</Box>
            <Box sx={{ fontSize: ".7rem", color: "text.secondary" }}>
              <Box
                sx={{
                  display: deviceStruct(
                    "none",
                    "none",
                    "block",
                    "block",
                    "block"
                  ),
                }}
              >
                {i.address !== undefined &&
                  `${i.address.slice(0, 18)}...${i.address.slice(
                    i.address.length - 18,
                    i.address.length
                  )}`}
              </Box>
              <Box
                sx={{
                  display: deviceStruct(
                    "block",
                    "block",
                    "none",
                    "none",
                    "none"
                  ),
                }}
              >
                {i.address !== undefined &&
                  `${i.address.slice(0, 17)}...${i.address.slice(
                    i.address.length - 17,
                    i.address.length
                  )}`}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export const ActiveInactive: React.FC<{ value: boolean }> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: props.value ? "text.secondarySuccess" : "error.main",
        fontSize: ".9rem",
        fontWeight: 550,
      }}
    >
      <CircleIcon
        // @ts-ignore
        color={props.value ? "success" : "error.main"}
        sx={{ fontSize: ".9rem", mr: ".5rem" }}
      />
      {props.value ? "Active" : "Inactive"}
    </Box>
  );
};

export const ImageWrapper: React.FC<{
  img: string;
  name: string;
  size: string;
}> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: ".5rem",
        mb: ".5rem",
      }}
    >
      <Avatar src={props.img}></Avatar>
      <Box sx={{ ml: ".5rem" }}>
        <Box sx={{ fontSize: ".9rem" }}>{props.name}</Box>
        <Box sx={{ fontSize: ".7rem", color: "text.secondary" }}>
          {props.size}
        </Box>
      </Box>
    </Box>
  );
};

const ReviewDrawer: React.FC = () => {
  let creationContext = React.useContext(CreationContext);
  let data = creationContext.api.data;
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const setNavStage = (stage: number) => {
    creationContext.api.setData({
      ...creationContext.api.data,
      review: stage,
      navStage: stage,
    });
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".3rem",
      }}
    >
      <BasicInformation
        edit={setNavStage}
        expanded={expanded}
        handleChange={handleChange}
        data={data}
      />
      <Tokenomics
        edit={setNavStage}
        expanded={expanded}
        handleChange={handleChange}
        data={data}
      />
      <Governance
        edit={setNavStage}
        expanded={expanded}
        handleChange={handleChange}
        data={data}
      />
      <Design
        edit={setNavStage}
        expanded={expanded}
        handleChange={handleChange}
        data={data}
      />
    </Box>
  );
};

export default ReviewDrawer;
