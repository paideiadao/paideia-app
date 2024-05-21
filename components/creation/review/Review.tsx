import { Alert, Box, Button, AlertTitle, Modal } from "@mui/material";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CreationContext } from "@lib/creation/Context";
import { Header } from "@components/creation/utilities/HeaderComponents";
import ReviewDrawer from "./ReviewDrawer";
import { modalBackground } from "@components/utilities/modalBackground";
import { deviceStruct } from "@components/utilities/Style";
import { getErgoWalletContext } from "@components/wallet/AddWallet";

const Review: React.FC = () => {
  const creationContext = React.useContext(CreationContext);
  const data = creationContext.api.data;
  const api = creationContext.api.api;
  const [publish, setPublish] = React.useState<boolean>(false);

  const getAddressList = (): string[] => {
    const addressList = localStorage.getItem("wallet_address_list");
    const address = localStorage.getItem("wallet_address");
    if (addressList === null && address !== null) {
      return [address];
    } else {
      return JSON.parse(addressList ?? "[]");
    }
  };

  const getImageUrl = async (image: File) => {
    if (!image.name) {
      throw new Error(
        "File not defined. If you have restored the page from a save please readd the images in design section."
      );
    }
    const img = await api?.uploadFile(image);
    return img.data.image_url;
  };

  const publishDAO = async () => {
    if (api) {
      try {
        const addresses = getAddressList();
        if (addresses.length === 0) {
          api.error("Please connect your wallet");
          return;
        }
        const durationMapper = {
          seconds: 1,
          minutes: 60,
          hours: 60 * 60,
          days: 60 * 60 * 24,
          weeks: 60 * 60 * 24 * 7,
        };
        const request = {
          name: data.basicInformation.daoName,
          url: data.basicInformation.daoUrl.replace("app.paideia.im/", ""),
          description: data.basicInformation.shortDescription,
          tokenomics: {
            token_id: data.tokenomics.tokenId,
            token_name: data.tokenomics.tokenName,
            token_ticker: data.tokenomics.tokenTicker,
            staking_config: {
              stake_pool_size: data.tokenomics.stakingConfig.stakePoolSize,
              staking_emission_amount:
                data.tokenomics.stakingConfig.stakingEmissionAmount,
              staking_emission_delay:
                data.tokenomics.stakingConfig.stakingEmissionDelay,
              staking_cycle_length:
                data.tokenomics.stakingConfig.stakingCycleLength,
              staking_profit_share_pct:
                data.tokenomics.stakingConfig.stakingProfitSharePct,
            },
          },
          governance: {
            governance_type: "DEFAULT",
            quorum: data.governance.quorum * 10,
            threshold: data.governance.supportNeeded * 10,
            min_proposal_time:
              data.governance.voteDuration *
              1000 *
              // @ts-ignore
              durationMapper[data.governance.voteDurationUnits],
            participation_weight: data.governance.participationWeight,
            pure_participation_weight: data.governance.pureParticipationWeight,
          },
          design: {
            theme: "default",
            logo: await getImageUrl(data.design.logo.file),
            banner_enabled: data.design.banner.show,
            banner: data.design.banner.show
              ? await getImageUrl(data.design.banner.data.file)
              : null,
            footer_enabled: data.design.footer.show,
            footer: data.design.footer.show
              ? data.design.footer.mainText
              : null,
          },
          user_addresses: addresses,
        };
        const response = (await api.post<any>("/dao/on_chain_dao", request))
          .data;
        const tx = response.unsigned_transaction;
        const ergoContext = await getErgoWalletContext();
        const signed = await ergoContext.sign_tx(tx);
        const txId = await ergoContext.submit_tx(signed);
        api.showAlert(`Transaction Submitted: ${txId}`, "success");
      } catch (e) {
        api.error(e);
      }
    }
  };

  return (
    <Box
      sx={{
        width: deviceStruct("93%", "93%", "70%", "70%", "70%"),
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: "text.primary",
      }}
    >
      <Box>
        <Button
          onClick={() =>
            creationContext.api.setData({
              ...data,
              navStage: data.navStage - 1,
            })
          }
          size="small"
        >
          <ArrowBackIcon sx={{ mr: ".5rem", fontSize: "1rem" }} />
          Back
        </Button>
      </Box>
      <Header
        title="Review"
        large={true}
        subtitle="Check once more that your DAO configuration is correct. Remember, you can always publish it as a draft and review it later on."
      />
      <ReviewDrawer />
      <Box
        sx={{
          width: "100%",
          mt: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ width: "49%", mr: ".5rem" }}
          variant="outlined"
          onClick={() =>
            creationContext.api.setData({ ...data, draftModal: true })
          }
        >
          <Box
            sx={{
              display: deviceStruct("none", "none", "block", "block", "block"),
            }}
          >
            Save
          </Box>
          <Box
            sx={{
              display: deviceStruct("block", "block", "none", "none", "none"),
            }}
          >
            Save
          </Box>
        </Button>
        <Button
          sx={{ width: "49%", ml: ".5rem" }}
          variant="contained"
          onClick={() => setPublish(true)}
        >
          Publish DAO
        </Button>
      </Box>
      <Modal
        open={publish}
        onClose={() => setPublish(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...modalBackground,
            width: deviceStruct("90%", "90%", "35%", "35%", "35%"),
          }}
        >
          <Box sx={{ fontSize: "1.1rem", fontWeight: 450 }}>
            You are about to publish the final version of your DAO
          </Box>
          <Box sx={{ mt: "1rem", fontSize: ".9rem" }}>
            Once you publish the DAO any configuration change would have to be
            done through the proposal system. Also, keep in mind that tokens
            will be minted and distributed instantly as your Tokenomics
            configuration.
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              mt: "1rem",
            }}
          >
            <Box sx={{ ml: "auto" }}>
              <Button sx={{ mr: "1rem" }} onClick={() => setPublish(false)}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  creationContext.api.setData({ ...data, isPublished: 1 });
                  await publishDAO();
                }}
              >
                Publish DAO
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Review;
