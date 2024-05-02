import { Avatar, Box, Button, InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import nautilus from "@public/icons/nautilus.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getErgoWalletContext, isAddressValid } from "./AddWallet";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { useWallet } from "./WalletContext";
import { LoadingButton } from "@mui/lab";
import { trpc } from "@utils/trpc";

const Nautilus: React.FC<{
  set: Function;
  connect: Function;
  connected: boolean;
  addresses: string[];
  setLoading: Function;
  setDAppWallet: Function;
  dAppWallet: any;
  loading: boolean;
  clear: Function;
}> = (props) => {
  const { wallet, setWallet, dAppWallet } = useWallet();
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [changeLoading, setChangeLoading] = React.useState<number | null>(null);
  const getNonceForChangeAddress =
    trpc.auth.getNonceForChangeAddress.useMutation();
  const verifyNonceForChangeAddress =
    trpc.auth.verifyNonceForChangeAddress.useMutation();

  React.useEffect(() => {
    const wrapper = async () => {
      props.setLoading(true);
      await props.connect();
      props.setLoading(false);
    };
    if (!dAppWallet.connected || !isAddressValid(wallet)) {
      wrapper();
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {dAppWallet.connected && isAddressValid(wallet) ? (
        <>
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                fontSize: "1.5rem",
                mt: "1rem",
              }}
            >
              <CheckCircleIcon
                color="primary"
                sx={{ fontSize: "3rem", mr: "1rem" }}
              />
              Wallet successfully connected!
            </Box>
            <Box sx={{ mt: ".5rem", fontSize: ".9rem", mb: ".5rem" }}>
              Select which address you want to use as as the default.
            </Box>
            <TextField
              label="Default Wallet Address"
              sx={{ width: "100%", mt: ".75rem" }}
              value={wallet}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {wallet !== "" && <CheckCircleIcon color="success" />}
                  </InputAdornment>
                ),
              }}
            />
          </>

          <Box
            sx={{
              width: "100%",
              border: "1px solid",
              borderColor: "border.main",
              borderRadius: ".3rem",
              mt: "1rem",
              maxHeight: "12rem",
              overflowY: "auto",
            }}
          >
            {props.addresses.map((i: string, c: number) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    fontSize: ".7rem",
                    pl: ".5rem",
                    mt: ".5rem",
                    pb: ".5rem",
                    borderBottom:
                      c === props.addresses.length - 1 ? 0 : "1px solid",
                    borderBottomColor: "border.main",
                  }}
                  key={`${i}-address-selector-${c}`}
                >
                  {i}
                  {changeLoading === c ? (
                    <LoadingButton
                      color="primary"
                      loading
                      variant="contained"
                      sx={{ ml: "auto", mr: ".5rem" }}
                    >
                      Active
                    </LoadingButton>
                  ) : (
                    <Button
                      sx={{ ml: "auto", mr: ".5rem" }}
                      variant="contained"
                      color={wallet === i ? "success" : "primary"}
                      size="small"
                      onClick={async () => {
                        if (wallet !== i) {
                          {
                            setChangeLoading(c);
                            try {
                              const address = i;
                              const nonce =
                                await getNonceForChangeAddress.mutateAsync();
                              const context = await getErgoWalletContext();
                              const response = await context.auth(
                                address,
                                nonce.nonce
                              );
                              const signedMessage: string =
                                response.signedMessage;
                              const proof: string = response.proof;
                              const result =
                                await verifyNonceForChangeAddress.mutateAsync({
                                  address: address,
                                  signedMessage: signedMessage,
                                  proof: proof,
                                });
                              localStorage.setItem("user_id", result.id);
                              localStorage.setItem("alias", result.alias);
                              props.setLoading(false);
                              setWallet(i);
                              setChangeLoading(null);
                            } catch (e) {
                              console.log(e);
                              setChangeLoading(null);
                            }
                          }
                        }
                      }}
                    >
                      {wallet === i ? "Active" : "Choose"}
                    </Button>
                  )}
                </Box>
              );
            })}
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: "1rem",
              width: "100%",
              backgroundColor: "primary.lightOpacity",
              p: "1rem",
              borderRadius: ".5rem",
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Avatar
              src={nautilus.src}
              sx={{ height: "3rem", width: "3rem", mr: "1rem" }}
            />
            <Box sx={{ fontSize: "1.2rem", color: "text.primary" }}>
              Nautilus
              <Box
                sx={{
                  fontSize: ".9rem",
                  color: "text.secondary",
                  mt: "-.25rem",
                }}
              >
                Connect automatically signing with your wallet
              </Box>
            </Box>
            <Button
              sx={{ ml: "auto" }}
              size="small"
              onClick={() => props.set()}
            >
              Change
            </Button>
          </Box>
          <Box sx={{ mt: ".5rem", fontSize: ".9rem" }}>
            Follow the instructions in your Nautilus Wallet to confirm and you
            will connect your wallet instantly. If a popup box is not appearing
            or if you accidentally closed it, please{" "}
            <Box
              sx={{
                cursor: "pointer",
                display: "inline",
                textDecoration: "underline",
                color: "primary.main",
              }}
              onClick={async () => {
                await props.connect();
              }}
            >
              click here
            </Box>{" "}
            to open it again
          </Box>
        </>
      )}
    </Box>
  );
};

export default Nautilus;
