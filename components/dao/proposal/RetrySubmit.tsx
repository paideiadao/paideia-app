import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PublishIcon from "@mui/icons-material/Publish";
import ProposalContext from "@lib/dao/proposal/ProposalContext";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { useWallet } from "@components/wallet/WalletContext";
import { getErgoWalletContext } from "@components/wallet/AddWallet";
import ErgoPayModal from "@components/wallet/ErgoPayModal";
import { trpc } from "@utils/trpc";

const RetrySubmit: React.FC = () => {
  const proposalContext = useContext(ProposalContext);
  const context = useContext<IGlobalContext>(GlobalContext);
  const { mobileWallet, dAppWallet } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ergoPayUrl, setErgoPayUrl] = useState<string | null>(null);
  const ergopay = trpc.transaction.generateErgoPayQrCode.useMutation();

  const value = proposalContext.api?.value;
  const isOwner =
    !!context.api?.daoUserData &&
    !!value?.user_details_id &&
    value.user_details_id === context.api.daoUserData.id;

  if (!value || !value.is_proposal || value.box_id || !isOwner) {
    return null;
  }

  const handleRetry = async () => {
    setLoading(true);
    try {
      const stakeKey = context.api?.userStakeData?.stake_keys?.[0]?.key_id;
      if (!stakeKey) {
        context.api?.error(
          "Stake key either not present or in use on another transaction, add stake now"
        );
        setLoading(false);
        return;
      }
      const res = await context.api?.post<any>(
        `/proposals/${value.id}/resubmit`,
        { stake_key: stakeKey }
      );
      const data = res?.data;
      const tx = data.unsigned_transaction;
      if (mobileWallet.connected) {
        const url = await ergopay.mutateAsync({ unsignedTransaction: tx });
        setErgoPayUrl(url.qrCode);
      } else if (dAppWallet.connected) {
        const ergoWalletContext = await getErgoWalletContext();
        const signed = await ergoWalletContext.sign_tx(tx);
        const txId = await ergoWalletContext.submit_tx(signed);
        context.api?.showAlert(`Transaction Submitted: ${txId}`, "success");
        router.reload();
      } else {
        context.api?.error("Wallet not Connected");
      }
    } catch (e: any) {
      context.api?.error(e);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: "100%", mt: "1rem" }}>
      <LoadingButton
        onClick={handleRetry}
        startIcon={<PublishIcon />}
        loading={loading}
        loadingPosition="start"
        variant="contained"
        fullWidth
      >
        Retry On-chain Submission
      </LoadingButton>
      <ErgoPayModal url={ergoPayUrl} handleClose={() => setErgoPayUrl(null)} />
    </Box>
  );
};

export default RetrySubmit;
