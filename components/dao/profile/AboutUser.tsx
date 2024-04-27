import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Avatar, Box, Chip, Link, Skeleton } from "@mui/material";
import * as React from "react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ISocialLink } from "@lib/creation/Interfaces";
import { useWallet } from "@components/wallet/WalletContext";
import { getIcon } from "@components/creation/review/Design";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { IUserStakeData } from "../staking/YourStaking";

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
      <Link
        href={props.label.startsWith("https://") ? props.label : undefined}
        underline="hover"
        target="_blank"
        rel="noreferrer"
      >
        {props.label.length > 32
          ? props.label.slice(0, 32) + "..."
          : props.label}
      </Link>
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
  user_id: string;
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
  const [stakeAmount, setStakeAmount] = React.useState<number>(0);
  const appContext = React.useContext<IGlobalContext>(GlobalContext);

  React.useEffect(() => {
    const load = async () => {
      const res = await appContext.api?.daoTokenCheckSingleToken(
        [props.wallet ?? ""],
        props.token_id
      );
      if (res) {
        setUserTokens(res);
      } else setUserTokens(utxos.currentDaoTokens);
    };
    if (props.wallet) {
      load();
    }
  }, [props.wallet, utxos.currentDaoTokens]);

  React.useEffect(() => {
    const getData = async () => {
      const daoId = appContext.api?.daoData.id;
      const userId = props.user_id;
      try {
        const res = await appContext.api?.post<any>(
          "/staking/user_stake_info",
          {
            dao_id: daoId,
            user_id: userId,
          }
        );
        const stake: IUserStakeData = res.data;
        const stakeAmount = stake.stake_keys
          .map((stake: { stake: number }) => stake.stake)
          .reduce((a: number, c: number) => a + c, 0);
        setStakeAmount(stakeAmount);
      } catch (e) {
        console.log(e);
      }
    };
    if (appContext.api?.daoData?.id && props.user_id && props.user_id !== "0") {
      getData();
    }
  }, [appContext.api?.daoData?.id, props.user_id]);

  const ticker =
    appContext.api?.daoData?.tokenomics.token_ticker ??
    appContext.api?.daoData?.dao_name + " DAO tokens";
  const tokenImage = appContext.api?.daoData?.tokenomics.token_image_url;

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
        <Box sx={{ fontSize: ".9rem", mt: 1 }}>{props.bio}</Box>
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
                icon={getIcon(i.socialNetwork.toLowerCase()) ?? <></>}
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
        {props.wallet && userTokens ? (
          <Chip
            avatar={<Avatar alt={ticker} src={tokenImage} />}
            label={
              parseFloat((userTokens + stakeAmount).toFixed(0)).toLocaleString(
                "en-US"
              ) +
              " " +
              ticker
            }
            sx={{ mt: ".5rem" }}
          />
        ) : (
          <Skeleton
            variant="rounded"
            width={100}
            height={32}
            sx={{ mt: "12px", borderRadius: "24px" }}
          />
        )}
      </Box>
    </Box>
  );
};

export default AboutUser;
