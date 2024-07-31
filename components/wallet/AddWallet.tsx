import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CircularProgress,
} from "@mui/material";
import { useAddWallet } from "@components/wallet/AddWalletContext";
import { useWallet } from "@components/wallet/WalletContext";
import ProviderListing from "./ProviderListing";
import Nautilus from "./Nautilus";
import MobileWallet from "./MobileWallet";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import useDidMountEffect from "@components/utilities/hooks";
import { trpc } from "@utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import { paideiaApi } from "@server/services/axios";
import { LoadingButton } from "@mui/lab";

export const WALLET_ADDRESS = "wallet_address";
export const WALLET_ADDRESS_LIST = "wallet_address_list";
export const DAPP_CONNECTED = "dapp_connected";
export const MOBILE_CONNECTED = "mobile_connected";

/**
 * Note on es-lint disable line:
 *
 * Ergo dApp injector uses global variables injected from the browser,
 * es-lint will complain if we reference un defined varaibles.
 *
 * Injected variables:
 * - ergo
 * - window.ergo_check_read_access
 * - window.ergo_request_read_access
 */
const AddWallet: React.FC = () => {
  const [walletInput, setWalletInput] = React.useState("");
  const { addWalletOpen, setAddWalletOpen } = useAddWallet();
  const {
    wallet,
    setWallet,
    dAppWallet,
    setDAppWallet,
    mobileWallet,
    setMobileWallet,
  } = useWallet();
  const [init, setInit] = React.useState(false);
  const [qrCode, setQrCode] = React.useState<string | null>(null);

  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  /**
   * dapp state
   *
   * dAppConnected: true if permission granted (persisted in local storage)
   * dAppError: show error message
   * dAppAddressTableData: list available addresses from wallet
   */
  const [loading, setLoading] = React.useState(false);
  const [view, setView] = React.useState<string>(
    wallet !== "" && !dAppWallet.connected
      ? "mobile"
      : wallet !== "" && dAppWallet.connected
      ? "nautilus"
      : "listing"
  );

  // trpc
  const session = useSession();
  const [defaultAddress, setDefaultAddress] = React.useState<string | null>(
    null
  );
  const [usedAddresses, setUsedAddresses] = React.useState<string[]>([]);
  const [unusedAddresses, setUnusedAddresses] = React.useState<string[]>([]);
  const getNonce = trpc.auth.getNonce.useQuery(
    { address: defaultAddress ?? "" },
    { enabled: false, retry: false }
  );
  const [nonce, setNonce] = React.useState<NonceResponse | null>(null);
  const [verificationId, setVerificationId] = React.useState<string | null>(
    null
  );
  const [signature, setSignature] = React.useState<Signature | null>(null);
  const deleteEmptyUser = trpc.auth.deleteEmptyUser.useMutation();
  const mobileInitiate = trpc.auth.initiateLogin.useMutation();
  trpc.auth.checkLoginStatus.useQuery(
    // @ts-ignore
    { verificationId },
    {
      enabled: !!verificationId,
      refetchInterval: (data: {
        status: "PENDING" | "SIGNED";
        signedMessage?: string;
        proof?: string;
      }) => {
        // If the status is 'SIGNED', stop polling
        if (data?.status === "SIGNED") {
          return false;
        }
        // Otherwise, continue polling every 2 seconds
        return 2000;
      },
      refetchIntervalInBackground: true,
      onSuccess: (data) => {
        if (data?.status === "SIGNED") {
          localStorage.setItem("wallet_address", defaultAddress ?? walletInput);
          handleSubmitWallet(defaultAddress ?? walletInput);
          setMobileWallet({
            connected: true,
          });
          data?.proof &&
            data?.signedMessage &&
            setSignature({
              proof: data.proof,
              signedMessage: data.signedMessage,
            });
        }
      },
    }
  );

  // get the new nonce
  const refetchData = () => {
    getNonce
      .refetch()
      .then((response: any) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        }
        setNonce(response.data);
      })
      .catch((error: any) => {
        globalContext.api?.error(error);
      });
  };

  React.useEffect(() => {
    const authSignInMobile = async () => {
      await signIn("credentials", {
        nonce: nonce?.nonce,
        userId: nonce?.userId,
        signature: JSON.stringify(signature),
        wallet: JSON.stringify({
          type: "mobile",
          defaultAddress: defaultAddress,
          usedAddresses: [],
          unusedAddresses: [],
        }),
        redirect: false,
      });
    };

    if (mobileWallet.connected && signature) {
      authSignInMobile();
    }
  }, [mobileWallet.connected, signature]);

  React.useEffect(() => {
    if (defaultAddress && view === "nautilus") {
      refetchData();
    }
  }, [defaultAddress, view]);

  React.useEffect(() => {
    if (
      nonce &&
      defaultAddress &&
      !dAppWallet.connected &&
      view === "nautilus"
    ) {
      signInNautilus();
    }
  }, [nonce, defaultAddress, dAppWallet.connected]);

  React.useEffect(() => {
    const initiateUser = async () => {
      try {
        const res = await paideiaApi.post(
          "/auth/initiate_user",
          {},
          {
            headers: {
              Authorization: `bearer ${session.data?.user.jwt}`,
            },
          }
        );
        const user = res.data;
        localStorage.setItem("jwt_token_login", session.data?.user.jwt ?? "");
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("alias", user.alias);
      } catch (e: any) {
        clearWallet(true);
        globalContext.api?.error(e);
      }
    };
    if (
      (dAppWallet.connected || mobileWallet.connected) &&
      session.data?.user.jwt
    ) {
      initiateUser();
    }
  }, [dAppWallet.connected, mobileWallet.connected, session.data?.user.jwt]);

  // handle events
  React.useEffect(() => {
    window.addEventListener("ergo_wallet_disconnected", () => {
      clearWallet(true);
    });
    //@ts-ignore
    // load primary address
    if (localStorage.getItem(WALLET_ADDRESS)) {
      setWallet(localStorage.getItem(WALLET_ADDRESS));
      setWalletInput(localStorage.getItem(WALLET_ADDRESS) ?? "");
    }
    // load dApp state
    if (
      localStorage.getItem(DAPP_CONNECTED) &&
      localStorage.getItem(WALLET_ADDRESS_LIST)
    ) {
      setDAppWallet({
        connected:
          localStorage.getItem(DAPP_CONNECTED) === "true" ? true : false,
        addresses: JSON.parse(
          localStorage.getItem(WALLET_ADDRESS_LIST) ?? "[]"
        ),
      });
    }
    if (localStorage.getItem(MOBILE_CONNECTED)) {
      setMobileWallet({
        connected:
          localStorage.getItem(MOBILE_CONNECTED) === "true" ? true : false,
      });
    }

    setInit(true);
  }, []);

  /**
   * update persist storage
   */
  React.useEffect(() => {
    if (init) {
      localStorage.setItem(
        DAPP_CONNECTED,
        dAppWallet.connected ? "true" : "false"
      );
      localStorage.setItem(
        MOBILE_CONNECTED,
        mobileWallet.connected ? "true" : "false"
      );
      localStorage.setItem(
        WALLET_ADDRESS_LIST,
        JSON.stringify(dAppWallet.addresses)
      );
      dAppRefresh();
    }
  }, [dAppWallet, mobileWallet, init]);

  React.useEffect(() => {
    // setLoading(false)
    if (init) localStorage.setItem(WALLET_ADDRESS, wallet);
  }, [wallet, init]);

  const handleSubmitWallet = (address: string) => {
    // add read only wallet
    setWallet(address);
    // clear dApp state
    setDAppWallet({
      connected: false,
      addresses: [],
    });
    setQrCode(null);
  };

  const clearWallet = (force: boolean = false) => {
    // clear state and local storage
    localStorage.setItem(WALLET_ADDRESS, "");
    localStorage.setItem(WALLET_ADDRESS_LIST, "[]");
    localStorage.setItem(DAPP_CONNECTED, "false");
    localStorage.setItem(MOBILE_CONNECTED, "false");
    localStorage.setItem("jwt_token_login", "");
    localStorage.setItem("user_id", "");
    localStorage.setItem("alias", "");
    setWalletInput("");
    globalContext.api?.setDaoUserData(undefined);
    setWallet("");
    // clear dApp state
    setView("listing");
    setDAppWallet({
      connected: false,
      addresses: [],
    });
    setMobileWallet({
      connected: false,
    });
    setNonce(null);
    force && signOut();
    globalContext.api?.setDaoUserData(undefined);
  };

  /**
   * dapp connector
   */
  const dAppConnect = async () => {
    setLoading(true);
    try {
      // @ts-ignore
      if (await ergoConnector.nautilus.isConnected()) {
        await dAppLoad();
      } else if (
        // @ts-ignore
        await ergoConnector.nautilus.connect({ createErgoObject: false })
      ) {
        // @ts-ignore
        if (await ergoConnector.nautilus.isConnected()) {
          await dAppLoad();
        }
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const dAppRefresh = async () => {
    try {
      // @ts-ignore
      if (!(await ergoConnector.nautilus.isConnected())) {
        // @ts-ignore
        await ergoConnector.nautilus.connect({ createErgoObject: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useDidMountEffect(() => {
    if (view === "listing") {
      clearWallet();
    }
  }, [view]);

  const dAppLoad = async () => {
    try {
      const context = await getErgoWalletContext();
      const change_address = await context.get_change_address();
      const address_used = await context.get_used_addresses();
      const address_unused = await context.get_unused_addresses();
      setUsedAddresses(address_used);
      setUnusedAddresses(address_unused);
      const addresses = [...address_used, ...address_unused];
      if (change_address) {
        setDefaultAddress(await mapToPrimaryAddress(change_address));
      } else {
        setDefaultAddress(await mapToPrimaryAddress(addresses[0]));
      }
      // use the first used address if available or the first unused one if not as default
      // when a user hits the signing request, it should be a list of addresses that they have connected.
      // If one of them has an account, then you login using that method... don't default to 0
    } catch (e) {
      globalContext.api?.error(e);
      clearWallet(true);
      setLoading(false);
    }
    setLoading(false);
  };

  const signInNautilus = async () => {
    setLoading(true);
    if (!defaultAddress || !nonce) {
      setLoading(false);
      return;
    }
    try {
      const addresses = [...usedAddresses, ...unusedAddresses];
      const context = await getErgoWalletContext();
      const signature = await context.auth(defaultAddress, nonce.nonce);
      if (!signature.signedMessage || !signature.proof) {
        throw new Error("Signature failed to generate");
      }

      const response = await signIn("credentials", {
        nonce: nonce.nonce,
        userId: nonce.userId,
        signature: JSON.stringify(signature),
        wallet: JSON.stringify({
          type: "nautilus",
          defaultAddress: defaultAddress,
          usedAddresses,
          unusedAddresses,
        }),
        redirect: false,
      });

      if (!response || !response?.status || response.status !== 200) {
        throw new Error("Sign in Failed");
      }

      setWallet(defaultAddress);
      localStorage.setItem(WALLET_ADDRESS, defaultAddress);

      setDAppWallet({
        connected: true,
        addresses: addresses,
      });
    } catch (e: any) {
      globalContext.api?.error("Error logging in with Nautilus Wallet");
      if (nonce.userId) {
        deleteEmptyUser.mutateAsync({
          userId: nonce.userId,
        });
      }
      clearWallet();
    } finally {
      setLoading(false);
    }
  };

  const mapToPrimaryAddress = async (address: string): Promise<string> => {
    try {
      const response = await paideiaApi.get(
        `/users/details/search?search_string=${address}`
      );
      const results = response.data.filter(
        (r: { address: string }) => r.address === address
      );
      if (results.length === 0) {
        return address;
      }
      return results[0].alias;
    } catch {
      return address;
    }
  };

  const signInMobile = async () => {
    setLoading(true);
    if (!walletInput) {
      setLoading(false);
      return;
    }
    const address = await mapToPrimaryAddress(walletInput);
    setDefaultAddress(address);
    try {
      const response = await mobileInitiate.mutateAsync({
        address: address,
      });
      setVerificationId(response.verificationId);
      setNonce(response.nonce);
      setQrCode(
        `ergoauth://${process.env.ERGOAUTH_DOMAIN?.replace(
          "https://",
          ""
        ).replace("http://", "")}/api/ergo-auth/request?verificationId=${
          response.verificationId
        }&address=${address}`
      );
    } catch (e: any) {
      globalContext.api?.error("Error logging in with Mobile Wallet");
      if (nonce?.userId) {
        deleteEmptyUser.mutateAsync({
          userId: nonce.userId,
        });
      }
      clearWallet();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem(WALLET_ADDRESS_LIST)) {
      if (
        JSON.parse(localStorage.getItem(WALLET_ADDRESS_LIST) ?? "[]").length > 0
      ) {
        setDAppWallet({
          connected: true,
          addresses: localStorage.getItem(WALLET_ADDRESS_LIST)
            ? JSON.parse(localStorage.getItem(WALLET_ADDRESS_LIST) ?? "[]")
            : [],
        });
        setWallet(localStorage.getItem(WALLET_ADDRESS));
      }
    } else if (isAddressValid(wallet)) {
      setDAppWallet({
        // connected: true,
        connected: false,
        addresses: [],
      });
      setWallet(localStorage.getItem(WALLET_ADDRESS));
    }
  }, [view]);

  return (
    <>
      <Dialog
        open={addWalletOpen}
        onClose={() => setAddWalletOpen(false)}
        PaperProps={{ sx: { maxWidth: "38rem" } }}
      >
        <DialogTitle sx={{ backgroundColor: "fileInput.main", mb: "-.5rem" }}>
          Connect Wallet
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "fileInput.main" }}>
          <DialogContentText sx={{ fontSize: ".9rem" }}>
            Your private key will never be stored on our server. If you are
            using a dapp wallet, please make sure only one wallet is enabled.
            Enabling multiple wallet extensions willl cause undefined behavior.
          </DialogContentText>
          {view === "listing" ? (
            <ProviderListing set={setView} />
          ) : view === "nautilus" ? (
            <Nautilus
              set={() => setView("listing")}
              connect={dAppConnect}
              connected={dAppWallet.connected}
              addresses={dAppWallet.addresses}
              setLoading={setLoading}
              setDAppWallet={setDAppWallet}
              dAppWallet={dAppWallet}
              loading={loading}
              clear={clearWallet}
            />
          ) : (
            <MobileWallet
              set={() => setView("listing")}
              wallet={walletInput}
              setWallet={setWalletInput}
              qrCode={qrCode ?? ""}
            />
          )}
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "fileInput.main",
            pl: "1rem",
            pr: "1rem",
            pb: ".5rem",
          }}
        >
          <Button onClick={() => setAddWalletOpen(false)} sx={{ mr: "1rem" }}>
            Close
          </Button>
          <Box sx={{ ml: "auto" }}>
            {loading && <CircularProgress color="primary" size="small" />}
            {isAddressValid(wallet) && view !== "listing" && (
              <Button
                color="error"
                variant="outlined"
                sx={{ mr: view === "mobile" ? ".5rem" : 0 }}
                onClick={() => {
                  clearWallet(true);
                }}
              >
                Disconnect
              </Button>
            )}
            {view === "mobile" && qrCode === null && !isAddressValid(wallet) && (
              <LoadingButton
                loading={loading}
                onClick={signInMobile}
                disabled={walletInput === ""}
                variant="contained"
              >
                Confirm
              </LoadingButton>
            )}
            {view === "mobile" && qrCode && (
              <Button
                onClick={() => {
                  clearWallet();
                  setView("listing");
                  setQrCode(null);
                }}
                variant="contained"
              >
                Go Back
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const isAddressValid = (address: string) => {
  return address !== undefined ? address.length > 5 : false;
};

export const getErgoWalletContext = async () => {
  try {
    // @ts-ignore
    const walletConnector = window.ergoConnector.nautilus;
    let context;

    try {
      context = await walletConnector.getContext();
    } catch (contextError) {
      console.log("No context available, attempting to connect...");
      await walletConnector.connect();
      context = await walletConnector.getContext(); // Try to get context again after connecting
    }

    if (!context) {
      throw new Error("Failed to obtain context even after connecting.");
    }

    return context;
  } catch (error) {
    console.error("Error retrieving the wallet context:", error);
    throw error; // Re-throw the error if you want the caller to handle it.
  }
};

export default AddWallet;
