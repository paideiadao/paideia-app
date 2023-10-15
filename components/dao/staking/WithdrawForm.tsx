import WalletSelector from "@components/creation/governance/WalletSelector";
import {
  CapsInfo,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import { useWallet } from "@components/wallet/WalletContext";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import * as React from "react";
import { deviceWrapper } from "@components/utilities/Style";
import CancelLink from "@components/utilities/CancelLink";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { useContext, useState } from "react";
import { getErgoWalletContext } from "@components/wallet/AddWallet";

interface IStakeState {
  stake: any;
}

const WithdrawForm: React.FC<IStakeState> = (props) => {
  const appContext = useContext<IGlobalContext>(GlobalContext);
  const { wallet } = useWallet();
  const ticker = "PAI";
  const [loading, setLoading] = useState<boolean>(false);

  const totalStaked = props.stake?.stake_keys
    ?.map((key: { stake: number }) => key.stake)
    ?.reduce((a: number, c: number) => a + c, 0);
  const maxStake = props.stake?.stake_keys
    ?.map((key: { stake: number }) => key.stake)
    ?.reduce((a: number, b: number) => Math.max(a, b), 0);
  const totalKeys = props.stake?.stake_keys?.length;

  const [value, setValue] = useState<number>(Math.min(maxStake, 100));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const daoId = appContext.api.daoData.id;
      const userId = appContext.api.daoUserData.user_id;
      const stake = props.stake.stake_keys.filter(
        (key: { stake: any }) => key.stake === maxStake
      )[0];
      const res = await appContext.api.put<any>("/staking/", {
        dao_id: daoId,
        user_id: userId,
        new_stake_key_info: {
          ...stake,
          stake: stake.stake - value,
        },
      });
      const tx = res.data.unsigned_transaction;
      const context = await getErgoWalletContext();
      const signed = await context.sign_tx(tx);
      const txId = await context.submit_tx(signed);
      appContext.api.showAlert(`Transaction Submitted: ${txId}`, "success");
    } catch (e: any) {
      appContext.api.error(e);
    }
    setLoading(false);
  };

  return (
    <Box>
      <CapsInfo title="Withdrawal Form" mb=".5rem" />
      <Subtitle subtitle="" />
      <Box sx={{ mt: "1rem" }} />
      <WalletSelector
        id="staking-wallet-input"
        data={{
          alias: appContext.api.daoUserData?.name,
          address: wallet,
          img: appContext.api.daoUserData?.profile_img_url,
        }}
        number={1}
        set={() => {}}
      />
      <Box sx={{ display: "flex", alignItems: "center", mt: "1rem" }}>
        <TextField
          label="Amount of tokens to withdraw"
          sx={{ width: deviceWrapper("90%", "45%") }}
          size="medium"
          value={value}
          type="number"
          onChange={handleChange}
          helperText={`${totalStaked} ${ticker} staked`}
          InputProps={{
            inputProps: {
              min: 1,
              max: 9999999999,
            },
            endAdornment: (
              <InputAdornment position="end">{ticker}</InputAdornment>
            ),
          }}
        />
        <Button
          variant="text"
          size="small"
          sx={{ ml: ".5rem" }}
          onClick={() => setValue(maxStake)}
        >
          Max
        </Button>
      </Box>
      {totalKeys >= 2 && (
        <Typography fontSize="small" sx={{ mt: 2 }}>
          There are multiple stake keys associated with your wallet you can at
          most withdraw {maxStake} tokens in a single transaction(s)
        </Typography>
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "2rem",
        }}
      >
        <CancelLink>
          <Button
            variant="outlined"
            sx={{ width: "50%", mr: "1rem" }}
            size="small"
          >
            Cancel
          </Button>
        </CancelLink>
        <Button
          disabled={loading}
          variant="contained"
          sx={{ width: "50%" }}
          onClick={handleSubmit}
          size="small"
        >
          {!loading ? "Withdraw" : <CircularProgress size={26} />}
        </Button>
      </Box>
    </Box>
  );
};

export default WithdrawForm;
