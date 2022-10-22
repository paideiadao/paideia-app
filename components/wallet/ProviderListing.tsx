import { Avatar, Box, Chip } from "@mui/material";
import * as React from "react";
import Nautilus from "@public/icons/nautilus.png";
import Ergo from "@public/icons/ergo.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";

const ProviderListing: React.FC<{ set: Function }> = (props) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "1.5rem",
          cursor: "pointer",
        }}
        onClick={() => props.set("nautilus")}
      >
        <Avatar
          src={Nautilus.src}
          sx={{ height: "2.5rem", width: "2.5rem", mr: "1rem" }}
        />
        <Box sx={{ fontSize: ".9rem", color: "text.secondary" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "1rem",
              color: "text.primary",
            }}
          >
            Nautilus
            <Chip
              icon={<CheckIcon />}
              variant="outlined"
              color="primary"
              label="Recommended"
              size="small"
              sx={{ ml: ".5rem" }}
            />
          </Box>
          Connect automatically signing with your wallet.
        </Box>
        <ChevronRightIcon sx={{ ml: "auto", opacity: ".6" }} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          mt: ".5rem",
        }}
        onClick={() => props.set("mobile")}
      >
        <Avatar
          src={Ergo.src}
          sx={{ height: "2.5rem", width: "2.5rem", mr: "1rem" }}
        />
        <Box sx={{ fontSize: ".9rem", color: "text.secondary" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "1rem",
              color: "text.primary",
            }}
          >
            Mobile Wallet
          </Box>
          Connect by manually adding your wallet address
        </Box>
        <ChevronRightIcon sx={{ ml: "auto", opacity: ".6" }} />
      </Box>
    </>
  );
};

export default ProviderListing;
