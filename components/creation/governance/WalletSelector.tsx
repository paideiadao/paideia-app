import { Avatar, Box, Paper, TextField } from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { walletStruct } from "@lib/creation/Constants";
import ClearIcon from "@mui/icons-material/Clear";
import PersonIcon from "@mui/icons-material/Person";
import { deviceStruct } from "@components/utilities/Style";
import { isAddressValid } from "@components/wallet/AddWallet";

const WalletSelector: React.FC<{
  data: {
    alias: string;
    address: string;
    img: string;
  };
  set: Function;
  number: number;
  id: string;
  mt?: string;
  canDelete?: boolean;
}> = (props) => {
  const [focused, setFocused] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  React.useEffect(() => {
    if (isAddressValid(search)) {
      props.set({
        ...props.data,
        address: search,
      });
    }
  }, [search]);
  return (
    <Box
      sx={{
        width: "100%",
        mt: props.mt ? props.mt : "0",
        position: "relative",
      }}
      key={props.number + props.id + "-textfield"}
      onBlur={() => setFocused(false)}
    >
      <TextField
        autoComplete="off"
        label="Wallet Address"
        sx={{ width: "100%" }}
        placeholder={
          props.data.alias === "" ? "Search by name or wallet address" : ""
        }
        // helperText="Search by name or wallet address"
        onFocus={() => setFocused(true)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        FormHelperTextProps={{
          sx: {
            display: focused || props.data.alias !== "" ? "none" : "inherit",
          },
        }}
        InputProps={{
          readOnly: props.data.alias !== "",
          startAdornment: props.data.alias !== "" && (
            <InputAdornment
              position="end"
              sx={{ mt: 1, pt: 4, pb: 4, ml: "-.2rem" }}
            >
              <Avatar
                sx={{
                  fontSize: ".75rem",
                  mr: 1,
                  width: "2rem",
                  height: "2rem",
                }}
              >
                {props.data.img === "" || props.data.img === undefined ? (
                  <PersonIcon color="primary" />
                ) : (
                  props.data.img
                )}
              </Avatar>
              <Box sx={{ color: "text.primary", fontSize: ".9rem" }}>
                <Box sx={{ color: "text.primary" }}>{props.data.alias}</Box>
                <Box
                  sx={{
                    color: "text.secondary",
                    fontSize: ".6rem",
                    mt: "-.3rem",
                  }}
                >
                  <Box
                    sx={{
                      display: deviceStruct(
                        "none",
                        "none",
                        "none",
                        "block",
                        "block"
                      ),
                    }}
                  >
                    {props.data.address !== undefined &&
                      `${props.data.address.slice(
                        0,
                        14
                      )}...${props.data.address.slice(
                        props.data.address.length - 14,
                        props.data.address.length
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
                    {props.data.address !== undefined &&
                      `${props.data.address.slice(
                        0,
                        11
                      )}...${props.data.address.slice(
                        props.data.address.length - 11,
                        props.data.address.length
                      )}`}
                  </Box>
                </Box>
              </Box>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {props.data.alias !== "" && props.canDelete && (
                <ClearIcon
                  style={{
                    marginRight: ".4rem",
                    cursor: "pointer",
                  }}
                  color="primary"
                  onClick={() => {
                    setSearch("");
                    props.set({
                      alias: "",
                      address: "",
                      img: "",
                    });
                  }}
                />
              )}

              {props.data.alias === "" && (
                <SearchIcon sx={{ fill: "#9FD2DB" }} />
              )}
            </InputAdornment>
          ),
        }}
      />
      {focused && props.data.alias === "" && (
        <Paper
          sx={{
            maxHeight: "15rem",
            position: "absolute",
            zIndex: 100,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {walletStruct
            .filter(
              (i: any) => i.address.includes(search) || i.alias.includes(search)
            )
            .map((i: any) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: ".9rem",
                    zIndex: 100,
                    p: 1,
                    backgroundColor: "backgroundColor.main",
                    color: "text.secondary",
                    ":hover": {
                      backgroundColor: "darkHover.main",
                      color: "text.secondary",
                    },
                  }}
                  key={`${i.address}-wallet-card`}
                  onClick={() => {
                    setFocused(false);
                    setSearch("");
                    props.set(i);
                  }}
                >
                  <Box sx={{ mr: 1 }}>
                    <Avatar sx={{ fontSize: ".75rem" }}>{i.img}</Avatar>
                  </Box>
                  <Box>
                    <Box sx={{ color: "text.primary" }}>{i.alias}</Box>
                    <Box sx={{ fontSize: ".6rem" }}>
                      {i.address.slice(0, 18)}...
                      {i.address.substr(i.address.length - 18)}
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Paper>
      )}
    </Box>
  );
};

export default WalletSelector;
