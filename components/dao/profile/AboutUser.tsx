import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Avatar, Box, Chip } from "@mui/material";
import * as React from "react";
import PaideiaTokenSymbol from "../../../public/images/paideia-token-symbol.png";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ISocialLink } from "@lib/creation/Interfaces";
import { useWallet } from "@components/wallet/WalletContext";
import { getIcon } from "@components/creation/review/Design";
import { snipAddress } from "@lib/utilities";
import { getTokenAmount } from "@lib/wallet/Utilities";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";

const UserSocial: React.FC<{ icon: JSX.Element; label: string }> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        color: "primary.main",
        mt: ".25rem",
        mb: ".25rem",
        fontSize: "1rem",
      }}
    >
      {props.icon}
      <Box sx={{ ml: ".5rem" }}></Box>
      {props.label}
    </Box>
  );
};

const UserAttr: React.FC<{ label: string }> = (props) => {
  return (
    <Chip
      label={props.label}
      color="primary"
      variant="outlined"
      sx={{ m: ".2rem" }}
    />
  );
};

interface IAboutUser {
  followers: number[];
  created: number;
  approved: number;
  bio: string;
  social_links: ISocialLink[];
  token_id: string;
  wallet?: string;
}

const AboutUser: React.FC<IAboutUser> = (props) => {
  const { wallet, utxos } = useWallet();
  const [userTokens, setUserTokens] = React.useState<number>(0);
  const appContext = React.useContext<IGlobalContext>(GlobalContext);
  React.useEffect(() => {
    const load = async () => {
      let res = await appContext.api.paideiaTokenCheck([props.wallet]);
      setUserTokens(res?.data?.totalTokens);
    };
    if (props.wallet) {
      load();
    }
  }, []);

  const ticker = "PAI";

  return (
    <Box
      sx={{
        backgroundColor: "fileInput.outer",
        m: ".5rem",
        borderRadius: ".3rem",
        border: "1px solid",
        borderColor: "border.main",
        ml: 0,
        mr: 0,
      }}
    >
      <Box sx={{ p: ".5rem", width: "100%" }}>
        <CapsInfo title="About User" small />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              fontSize: ".7rem",
              color: "text.secondary",
              textAlign: "center",
              borderRight: "1px solid",
              borderRightColor: "border.main",
              pr: ".75rem",
            }}
          >
            Followers
            <Box sx={{ color: "text.primary", fontSize: "1.1rem" }}>
              {props.followers.length}
            </Box>
          </Box>
          <Box
            sx={{
              fontSize: ".7rem",
              pl: ".75rem",
              color: "text.secondary",
              textAlign: "center",
              borderRight: "1px solid",
              borderRightColor: "border.main",
              pr: "1rem",
            }}
          >
            Created
            <Box sx={{ color: "text.primary", fontSize: "1.1rem" }}>
              {props.created}
            </Box>
          </Box>
          <Box
            sx={{
              fontSize: ".7rem",
              pl: ".75rem",
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            Approved
            <Box sx={{ color: "text.primary", fontSize: "1.1rem" }}>
              {props.approved}
            </Box>
          </Box>
        </Box>
        <Box sx={{ fontSize: ".9rem" }}>{props.bio}</Box>
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            width: "100%",
            mt: ".5rem",
          }}
        >
          <UserAttr label="Proposal maker" />
          <UserAttr label="Voter" />
          <UserAttr label="V.I.P." />
          <UserAttr label="Yes person" />
        </Box> */}
        <Box sx={{ width: "100%" }}>
          {props.social_links.map((i: ISocialLink, c: number) => {
            return (
              <UserSocial
                label={i.address}
                key={i.socialNetwork + "-" + c}
                icon={getIcon(i.socialNetwork.toLowerCase())}
              />
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid",
          borderTopColor: "border.main",
          pt: ".5rem",
          pl: ".5rem",
          pb: ".5rem",
          pr: ".5rem",
        }}
      >
        <CapsInfo title="Wallet Information" small />
        <Box>
          <Chip
            icon={<AccountBalanceWalletIcon />}
            label={props.wallet ? props.wallet : wallet}
            color="primary"
          />
        </Box>

        <Chip
          avatar={<Avatar alt="PAI" src={PaideiaTokenSymbol.src} />}
          label={
            (props.wallet && userTokens
              ? userTokens.toLocaleString("en-US")
              : utxos?.toLocaleString("en-US")) +
            " " +
            ticker
          }
          sx={{ mt: ".5rem" }}
        />
      </Box>
    </Box>
  );
};

export default AboutUser;
