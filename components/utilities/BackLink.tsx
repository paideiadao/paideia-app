import { Button } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IBackLink {
  variant?: "outlined" | "contained" | "text";
}

const BackLink: React.FC<IBackLink> = (props) => {
  const router = useRouter();
  return (
    <Button
      variant={props.variant ? props.variant : "outlined"}
      onClick={() => router.back()}
      size="small"
    >
      <ArrowBackIcon sx={{ mr: ".5rem", fontSize: "1rem" }} />
      Back
    </Button>
  );
};

export default BackLink;
