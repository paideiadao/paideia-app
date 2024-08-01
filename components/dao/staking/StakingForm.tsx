import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  CapsInfo,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import WalletSelector from "@components/creation/governance/WalletSelector";
import { useWallet } from "@components/wallet/WalletContext";
import { IWallet } from "@lib/creation/Interfaces";
import { deviceWrapper } from "@components/utilities/Style";
import CancelLink from "@components/utilities/CancelLink";
import { useContext, useState } from "react";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { getErgoWalletContext } from "@components/wallet/AddWallet";
import { trpc } from "@utils/trpc";
import ErgoPayModal from "@components/wallet/ErgoPayModal";

interface IStakeState {
  stake: any;
}

const FEE_ADJUSTMENT = 0.1;

const StakingForm: React.FC<IStakeState> = (props) => {
  const appContext = useContext<IGlobalContext>(GlobalContext);
  const { wallet, utxos, mobileWallet, dAppWallet } = useWallet();

  const available = utxos.currentDaoTokens;
  const [value, setValue] = useState<number>(Math.min(available, 100));
  const [loading, setLoading] = useState<boolean>(false);
  const [ergoPayUrl, setErgoPayUrl] = useState<string | null>(null);

  const ticker =
    appContext.api?.daoData?.tokenomics.token_ticker ??
    appContext.api?.daoData?.tokenomics.token_name;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(event.target.value));
  };

  const ergopay = trpc.transaction.generateErgoPayQrCode.useMutation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const stakeKey = props.stake?.stake_keys?.[0]?.key_id;
      const tx = (await get_tx(stakeKey)).unsigned_transaction;
      if (mobileWallet.connected) {
        const url = await ergopay.mutateAsync({ unsignedTransaction: tx });
        setErgoPayUrl(url.qrCode);
      } else if (dAppWallet.connected) {
        const context = await getErgoWalletContext();
        const signed = await context.sign_tx(tx);
        const txId = await context.submit_tx(signed);
        appContext.api?.showAlert(`Transaction Submitted: ${txId}`, "success");
      } else {
        appContext.api?.error("Wallet not Connected");
      }
    } catch (e: any) {
      appContext.api?.error(e);
    }
    setLoading(false);
  };

  const get_tx = async (stakeKey: string | undefined) => {
    const daoId = appContext.api?.daoData.id;
    const userId = appContext.api?.daoUserData.user_id;
    const adjustedValue = Math.min(value, available - FEE_ADJUSTMENT);
    if (stakeKey) {
      const res = await appContext.api?.post<any>("/staking/add", {
        dao_id: daoId,
        user_id: userId,
        amount: adjustedValue,
        stake_key: stakeKey,
      });
      return res.data;
    } else {
      const res = await appContext.api?.post<any>("/staking/", {
        dao_id: daoId,
        user_id: userId,
        amount: adjustedValue,
      });
      return res.data;
    }
  };

  return (
    <Box>
      <CapsInfo title="Staking Form" mb=".5rem" />
      <Subtitle subtitle="" />
      <Box sx={{ mt: "1rem" }} />
      <WalletSelector
        id="staking-wallet-input"
        data={{
          alias: appContext.api?.daoUserData?.name ?? "",
          address: wallet,
          img: appContext.api?.daoUserData?.profile_img_url ?? "",
        }}
        number={1}
        set={() => {}}
      />
      <Box sx={{ display: "flex", alignItems: "center", mt: "1rem" }}>
        <TextField
          label="Amount of tokens to stake"
          sx={{ width: deviceWrapper("90%", "45%") }}
          size="medium"
          value={value}
          type="number"
          onChange={handleChange}
          helperText={`${available} ${ticker} available`}
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
          onClick={() => setValue(available)}
        >
          Max
        </Button>
      </Box>
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
          {!loading ? "Stake" : <CircularProgress size={26} />}
        </Button>
      </Box>
      <ErgoPayModal
        url={ergoPayUrl}
        handleClose={() => {
          setErgoPayUrl(null);
        }}
      />
    </Box>
  );
};

export default StakingForm;
