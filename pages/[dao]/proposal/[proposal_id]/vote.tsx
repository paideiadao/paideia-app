import Layout from "@components/dao/Layout";
import { useRouter } from "next/router";
import { Box, Button, Link, Typography } from "@mui/material";
import {
  Header,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { deviceWrapper } from "@components/utilities/Style";
import { useContext, useEffect, useState } from "react";
import CancelLink from "@components/utilities/CancelLink";
import LoadingButton from "@mui/lab/LoadingButton";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { getErgoWalletContext } from "@components/wallet/AddWallet";

const CastVote: React.FC = () => {
  const router = useRouter();
  const { dao, proposal_id } = router.query;
  const parsed_proposal_id = proposal_id
    ? (proposal_id as string).split("-").slice(-5).join("-")
    : null;
  const context = useContext<IGlobalContext>(GlobalContext);
  const [vote, setVote] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [stake, setStake] = useState<any>(null);

  const daoId = context.api?.daoData?.id;
  const decimalAdjust = Math.pow(
    10,
    context.api?.daoData?.tokenomics?.token_decimals ?? 0
  );

  useEffect(() => {
    if (context.api?.userStakeData) {
      const stake = context.api.userStakeData;
      setStake(stake);
      if (!stake.stake_keys?.length) {
        context.api.error(
          "Stake key either not present or in use on another transaction, add stake now"
        );
      }
    }
  }, [context.api?.userStakeData]);

  const handleSubmit = async () => {
    setLoading(true);
    if (vote === null) {
      context.api?.error("Please select the preferred option");
      setLoading(false);
      return;
    }
    if (context.api) {
      try {
        if (!stake.stake_keys?.length) {
          context.api.error(
            "Stake key either not present or in use on another transaction, add stake now"
          );
          setLoading(false);
          return;
        }
        const stakeKey = stake.stake_keys[0].key_id;
        const stakeAmount = stake.stake_keys[0].stake * decimalAdjust;
        const req = {
          dao_id: daoId,
          proposal_id: parsed_proposal_id,
          stake_key: stakeKey,
          votes: vote ? [0, stakeAmount] : [stakeAmount, 0],
        };
        const res = (await context.api.post<any>("/proposals/vote", req)).data;
        const tx = res.unsigned_transaction;
        const ergoContext = await getErgoWalletContext();
        const signed = await ergoContext.sign_tx(tx);
        const txId = await ergoContext.submit_tx(signed);
        context.api.showAlert(`Transaction Submitted: ${txId}`, "success");
        router.back();
      } catch (e: any) {
        context.api.error(e);
      }
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Link
        href={
          dao === undefined
            ? "/dao/proposal"
            : `/${dao}/proposal/${proposal_id}`
        }
      >
        <Button
          variant="outlined"
          size="small"
          sx={{ mb: "1rem", mt: 1 }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Link>
      <Header title="Vote on this Proposal" large />
      <Box sx={{ width: "100%", mt: "0.5rem" }} />
      <Subtitle subtitle="Simply choose your preferred option and click vote." />
      <Box
        sx={{
          mt: "2rem",
          width: "100%",
          display: "flex",
          alignItems: "stretch",
          flexDirection: deviceWrapper("column", "row"),
        }}
      >
        <Box
          onClick={() => setVote(true)}
          sx={{
            cursor: "pointer",
            borderRadius: ".5rem",
            border: vote === true ? "3px solid" : "1px solid",
            p: "1rem",
            pb: "2rem",
            backgroundColor:
              vote === true ? "fileInput.outer" : "fileInput.inner",
            borderColor: vote === true ? "primary.main" : "border.main",
            width: deviceWrapper("100%", "50%"),
            mt: deviceWrapper("1rem", "0"),
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            mr: "1rem",
            ":hover": {
              borderColor: "primary.main",
            },
          }}
        >
          <DoneIcon sx={{ fontSize: "2rem", opacity: ".6" }} />
          <Box
            sx={{
              textAlign: "center",
              fontSize: "1.3rem",
              fontWeight: 350,
            }}
          >
            Approve Proposal
          </Box>
          <Box
            sx={{
              textAlign: "center",
              fontSize: ".8rem",
              color: "text.secondary",
            }}
          >
            Select this option if you want the proposal to be approved and
            executed.
          </Box>
        </Box>
        <Box
          onClick={() => setVote(false)}
          sx={{
            cursor: "pointer",
            borderRadius: ".5rem",
            border: vote === false ? "3px solid" : "1px solid",
            p: "1rem",
            pb: "2rem",
            backgroundColor:
              vote === false ? "fileInput.outer" : "fileInput.inner",
            borderColor: vote === false ? "primary.main" : "border.main",
            width: deviceWrapper("100%", "50%"),
            mt: deviceWrapper("1rem", "0"),
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            ":hover": {
              borderColor: "primary.main",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "2rem", opacity: ".6" }} />
          <Box
            sx={{
              textAlign: "center",
              fontSize: "1.3rem",
              fontWeight: 350,
            }}
          >
            Decline Proposal
          </Box>
          <Box
            sx={{
              textAlign: "center",
              fontSize: ".8rem",
              color: "text.secondary",
            }}
          >
            Select this option if you want the proposal to be rejected.
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "2rem",
        }}
      >
        <CancelLink>
          <Button
            variant="outlined"
            sx={{ width: "49%", mr: ".5rem" }}
            size="small"
          >
            Cancel
          </Button>
        </CancelLink>
        <LoadingButton
          variant="contained"
          sx={{ width: "49%" }}
          size="small"
          loading={loading}
          loadingPosition="center"
          onClick={handleSubmit}
        >
          <Box sx={{
            // display: deviceWrapper("none", "block") 
          }}>Vote</Box>
        </LoadingButton>
      </Box>
    </Layout>
  );
};

export default CastVote;
