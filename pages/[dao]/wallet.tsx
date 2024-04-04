import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import { useAddWallet } from "@components/wallet/AddWalletContext";
import { useWallet } from "@components/wallet/WalletContext";
import { Box, Button, Tab, IconButton, Avatar, Chip } from "@mui/material";
import * as React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import ImagePlaceholder from "../../../public/images/image-placeholder.png";
import dateFormat from "dateformat";
import { CheckCircle } from "@mui/icons-material";
import PaideiaLogo from "@public/dao/bio-image/paideia-logo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { paths, props } from "@lib/DaoPaths";
import { deviceWrapper } from "@components/utilities/Style";
import Nautilus from "@public/icons/nautilus.png";
import Ergo from "@public/icons/ergo.png";
import { isAddressValid } from "@components/wallet/AddWallet";
import { GlobalContext } from "@lib/AppContext";

// export const getStaticPaths = paths;
// export const getStaticProps = props;

const ActiveWallet: React.FC<{ previous?: boolean }> = (props) => {
  const globalContext = React.useContext(GlobalContext);
  const { wallet, dAppWallet, utxos } = useWallet();
  const { setAddWalletOpen } = useAddWallet();
  const handleClickOpen = () => {
    setAddWalletOpen(true);
  };
  const [show, setShow] = React.useState<boolean>(false);
  const ticker =
    globalContext.api?.daoData.tokenomics.token_ticker ??
    globalContext.api?.daoData.tokenomics.token_name;
  const [stakeAmount, setStakeAmount] = React.useState<number>(0);

  React.useEffect(() => {
    if (globalContext.api?.userStakeData) {
      const stake = globalContext.api.userStakeData;
      const stakeAmount = stake.stake_keys
        .map((stake: { stake: number }) => stake.stake)
        .reduce((a: number, c: number) => a + c, 0);
      setStakeAmount(stakeAmount);
    }
  }, [globalContext.api?.userStakeData]);

  return !isAddressValid(wallet) ? (
    <>Error Message Here..</>
  ) : (
    <Box
      sx={{
        p: "1rem",
        pt: ".75rem",
        pb: ".5rem",
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".3rem",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <CapsInfo
          title={`${props.previous ? "Previously " : ""}Connected Wallet`}
          mb={props.previous ? ".5rem" : "0"}
        />
        {/* {!props.previous && (
          <IconButton
            onClick={handleClickOpen}
            sx={{ mr: "-.5rem" }}
            size="small"
          >
            <EditIcon sx={{ ml: "auto" }} color="primary" />
          </IconButton>
        )} */}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={dAppWallet.connected ? Nautilus.src : Ergo.src}
          sx={{ width: "2.5rem", height: "2.5rem" }}
        />
        <Box sx={{ ml: "1rem" }}>
          {dAppWallet.connected ? "Nautilus" : "Ergo Mobile Wallet"}
          <Box
            sx={{
              fontSize: deviceWrapper(".8rem", ".9rem"),
              color: "text.secondary",
            }}
          >
            Connected at: {dateFormat(new Date(), "mmm d, yyyy: h:mmTT")}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: deviceWrapper("flex-start", "center"),
          mt: "1rem",
          flexDirection: deviceWrapper("column", "row"),
        }}
      >
        <Box>
          <CapsInfo title="Primary wallet address" mb=".2rem" />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircle color="success" sx={{ mr: ".5rem" }} />
            {wallet}
          </Box>
        </Box>
        <Box
          sx={{
            ml: deviceWrapper("0", "auto"),
            mt: deviceWrapper("0.5rem", "0"),
          }}
        >
          <Chip
            icon={
              <Avatar
                src={PaideiaLogo.src}
                sx={{ height: "1.5rem", width: "1.5rem" }}
              />
            }
            label={
              utxos &&
              (utxos.currentDaoTokens + stakeAmount).toFixed(2) + " " + ticker
            }
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: props.previous ? "none" : "flex",
          justifyContent: "center",
          width: "100%",
          mt: "1rem",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button
          onClick={() => setShow(!show)}
          size="small"
          endIcon={show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        >
          {show ? "Hide" : "Show"} other wallet addresses{" "}
        </Button>
        {show && (
          <Box sx={{ width: "100%" }}>
            {dAppWallet.addresses
              .filter((i: string) => i !== wallet)
              .map((i: string, c: number) => (
                <Box
                  key={`other-wallet-addresses-key-${c}`}
                  sx={{
                    mt: ".5rem",
                    mb: ".5rem",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  {i}
                </Box>
              ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const previousWallets = [1, 2];

const Wallet: React.FC = () => {
  const { setAddWalletOpen } = useAddWallet();
  const handleClickOpen = () => {
    setAddWalletOpen(true);
  };

  const [value, setValue] = React.useState("Active");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mb: "2rem",
        }}
      >
        <Header title="Wallet connection" large />
        <Button
          sx={{ ml: "auto" }}
          variant="contained"
          onClick={handleClickOpen}
          size="small"
          endIcon={<AccountBalanceWalletIcon />}
        >
          <Box sx={{ display: deviceWrapper("none", "block") }}>
            Change Wallet
          </Box>
          <Box sx={{ display: deviceWrapper("block", "none") }}>Change</Box>
        </Button>
      </Box>
      <ActiveWallet />

      {/* <TabContext value={value}>
        <Box
          sx={{
            width: "100%",
            borderBottom: "1px solid",
            borderBottomColor: "border.main",
            mt: "1rem",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Active" value="Active" />
            <Tab label="Previously Connected" value="Previously Connected" />
          </TabList>
        </Box>
        <TabPanel value="Active" sx={{ pl: 0, pr: 0 }}>
        </TabPanel>
        <TabPanel value="Previously Connected" sx={{ pl: 0, pr: 0 }}>
          {previousWallets.map((i: any, c: number) => {
            return (
              <Box sx={{ mb: "1rem" }}>
                <ActiveWallet key={`previous-wallet-key-${c}`} previous />
              </Box>
            );
          })}
        </TabPanel>
      </TabContext> */}
    </Layout>
  );
};

export default Wallet;
