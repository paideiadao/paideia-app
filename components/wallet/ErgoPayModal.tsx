import Link from "@components/Link";
import { Box, Modal, Typography } from "@mui/material";
import { useWallet } from "./WalletContext";
import QRCode from "react-qr-code";
import { deviceWrapper } from "@components/utilities/Style";

interface IErgoPayModalProps {
  url: string | null;
  handleClose: Function;
}

const ErgoPayModal: React.FC<IErgoPayModalProps> = (props) => {
  const { wallet } = useWallet();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: deviceWrapper(400, 700),
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={props.url !== null}
      onClose={() => props.handleClose()}
      aria-labelledby="ergopay-modal"
    >
      <Box sx={style}>
        <Typography id="ergopay-modal" variant="h5" component="h2">
          Pay using Mobile Wallet
        </Typography>
        <Box>
          <Box
            sx={{
              mx: "auto",
              maxWidth: "260px",
              background: "#fff",
              p: 3,
              mb: 2,
              borderRadius: "12px",
            }}
          >
            <QRCode
              size={180}
              value={props.url ?? ""}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
            />
          </Box>
        </Box>
        <Typography sx={{ textAlign: "center", fontSize: "1.1rem" }}>
          Scan QR using your mobile wallet or{" "}
          <Link href={props.url ?? ""}>click this link</Link> to open your
          wallet app.
        </Typography>
        <Typography sx={{ mt: 2, textAlign: "center", fontSize: "0.9rem" }}>
          <Link
            href={`https://explorer.ergoplatform.com/en/addresses/${wallet}`}
          >
            View your wallet on explorer
          </Link>{" "}
          to check if it went through (You may need to refresh a few times)
        </Typography>
      </Box>
    </Modal>
  );
};

export default ErgoPayModal;
