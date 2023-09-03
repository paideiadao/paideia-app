import Layout from "@components/dao/Layout";
import CreateHeader from "@components/dao/proposal/Header";
import { Box, Button, Modal } from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import { useRouter } from "next/router";
import Link from "next/link";
import ProposalContext from "@lib/dao/proposal/ProposalContext";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import ProposalApi from "@lib/dao/proposal/ProposalApi";
import GeneralInformation from "@components/dao/proposal/GeneralInformation";
import ProposalImage from "@components/dao/proposal/ProposalImage";
import ProposalVote from "@components/dao/proposal/ProposalVote";
import Content from "@components/dao/proposal/Context";
import { modalBackground } from "@components/utilities/modalBackground";
import LoadingButton from "@mui/lab/LoadingButton";
import PublishIcon from "@mui/icons-material/Publish";
import Warning from "@components/utilities/Warning";
import { IOptimisticGovernance } from "@components/dao/proposal/vote/YesNo/Actions/OptimisticGovernance";
import { IQuorum } from "@components/dao/proposal/vote/YesNo/Actions/Quorum";
import { ISendFunds } from "@components/dao/proposal/vote/YesNo/Actions/SendFunds";
import { deviceWrapper } from "@components/utilities/Style";
import { IComment } from "@components/dao/discussion/Comments";
import Reference from "@components/dao/discussion/Reference";
import { IAddendum } from "@components/dao/proposal/Addendums";
import { getRandomImage } from "@components/utilities/images";
import { IFile } from "@lib/creation/Interfaces";
import { ILiquidityPool } from "@components/dao/proposal/vote/YesNo/Actions/LiquidityPool";
import { IQuadradicVoting } from "@components/dao/proposal/vote/YesNo/Actions/QuadraticVoting";
import { IDaoDescription } from "@components/dao/proposal/vote/YesNo/Actions/DaoDescription";
import { IVoteDuration } from "@components/dao/proposal/vote/YesNo/Actions/VoteDuration";
import { ISupport } from "@components/dao/proposal/vote/YesNo/Actions/Support";
import { OptionType } from "@components/dao/proposal/vote/Options/OptionSystemSelector";
import CancelLink from "@components/utilities/CancelLink";
import { bPaideiaSendFundsBasic } from "@lib/proposalActionOutputMapper";
import { getErgoWalletContext } from "@components/wallet/AddWallet";
import { useState, useContext, useEffect } from "react";
import { generateSlug } from "@lib/utilities";

export type ActionType =
  | IOptimisticGovernance
  | IQuorum
  | ISendFunds
  | ILiquidityPool
  | IQuadradicVoting
  | IDaoDescription
  | IVoteDuration
  | ISupport;

export interface IProposalAction {
  name:
    | "Send Funds"
    | "Create Liquidity Pool"
    | "Change DAO's Description"
    | "Quadratic Voting"
    | "Vote Duration"
    | "Support"
    | "Quorum"
    | "Optimistic Governance"
    | undefined;
  icon?: React.ReactNode;
  description?: string;
  data: ActionType;
  close?: () => void;
  c?: number;
  options?: IProposalOption[];
}

export interface IProposalOption {
  name: string;
  description: string;
  data: ActionType;
  rank: number;
  default?: boolean;
}

export type VotingType = "yes/no" | "options" | "unselected";

const PAIDEIA_TOKEN_ADJUST = 10000;
const NERGs = 1000000000;

export interface IProposal {
  id?: string;
  dao_id?: string;
  user_details_id?: number;
  name: string;
  image?: IFile;
  image_url?: string;
  category: string;
  content: string;
  status: string;
  voting_system: VotingType;
  references: string[];
  actions: IProposalAction[];
  date?: Date;
  created?: number;
  likes: string[];
  dislikes: string[];
  followers: string[];
  tags?: string[];
  comments: IComment[];
  attachments?: IFile[];
  addendums: IAddendum[];
  optionType: OptionType;
  is_proposal: boolean;
  userSide?: number;
  references_meta?: string[];
  votes: number[];
  alias?: string;
  profile_img_url?: string;
  user_followers?: number[];
}

const CreateProposal: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;
  const [value, setValue] = useState<IProposal>({
    name: "",
    image: {
      url: getRandomImage(),
      file: undefined,
    },
    status: "draft",
    category: "",
    content: "",
    voting_system: "unselected",
    optionType: "one-option",
    references: [],
    attachments: [],
    comments: [],
    actions: [],
    addendums: [],
    likes: [],
    dislikes: [],
    followers: [],
    is_proposal: true,
    votes: [0, 0],
  });

  const context = useContext<IGlobalContext>(GlobalContext);
  const api = new ProposalApi(context.api, value, setValue);

  const [publish, setPublish] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [stake, setStake] = useState<any>({});

  useEffect(() => {
    const getData = async () => {
      try {
        const stake = (
          await context.api.post<any>("/staking/user_stake_info", {
            dao_id: context.api.daoData?.id,
            user_id: context.api.daoUserData?.user_id,
          })
        ).data;
        setStake(stake);
        if (!stake.stake_keys?.length) {
          api.error("Stake Key is not present");
        }
      } catch (e: any) {
        api.error(e);
      }
    };

    if (context.api.daoData?.id && context.api.daoUserData?.user_id) {
      getData();
    }
  }, [context.api.daoData, context.api.daoUserData]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const imgUrl = await getBannerUrl();
      const action = bPaideiaSendFundsBasic(
        // @ts-ignore
        value.actions[0].data.recipients[0].address,
        // @ts-ignore
        value.actions[0].data.recipients[0].ergs * NERGs,
        // @ts-ignore
        value.actions[0].data.recipients[0].tokens * PAIDEIA_TOKEN_ADJUST,
        context.api.daoData?.tokenomics?.token_id
      );
      const proposal = {
        dao_id: context.api.daoData?.id,
        user_details_id: context.api.daoUserData?.id,
        ...value,
        image_url: imgUrl,
        actions: [action],
        is_proposal: true,
        stake_key: stake.stake_keys[0].key_id,
        end_time: action.action.activationTime,
      };
      const data = (
        await context.api.post<any>("/proposals/on_chain_proposal", proposal)
      ).data;
      const tx = data.unsigned_transaction;
      const ergoContext = await getErgoWalletContext();
      const signed = await ergoContext.sign_tx(tx);
      const txId = await ergoContext.submit_tx(signed);
      context.api.showAlert(`Transaction Submitted: ${txId}`, "success");
      setPublish(false);
      router.push(
        `/${dao === undefined ? "" : dao}/proposal/${generateSlug(
          data.proposal.id,
          data.proposal.name
        )}`
      );
    } catch (e: any) {
      api.error(e);
    }
    setLoading(false);
  };

  const getBannerUrl = async () => {
    const image = await getImg();
    const imgRes = await api.uploadFile(image);
    return imgRes.data.image_url;
  };

  const getImg = async () => {
    if (value.image.file === undefined) {
      const defaultImage = await fetch(value.image.url);
      const data = await defaultImage.blob();
      const metadata = {
        type: "image/jpeg",
      };
      return new File([data], "test.jpg", metadata);
    } else {
      return value.image.file;
    }
  };

  return (
    <ProposalContext.Provider value={{ api }}>
      <Layout>
        <CreateHeader type="proposal" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: "1px solid",
            borderColor: "primary.main",
            backgroundColor: "fileInput.main",
            pl: "0",
            borderRadius: ".3rem",
            pt: ".75rem",
            pb: deviceWrapper("0", ".75rem"),
            flexDirection: deviceWrapper("column", "row"),
          }}
        >
          <Box
            sx={{
              width: "10%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BalanceIcon sx={{ fontSize: "2rem" }} color="primary" />
          </Box>
          <Box
            sx={{
              width: "75%",
              fontSize: "1.3rem",
              fontWeight: 400,
              textAlign: deviceWrapper("center", "left"),
            }}
          >
            Create a proposal
            <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
              Provide users with different options to vote on, and the proposal
              will either be approved or declined. Keep in mind, once you create
              a proposal, it can't be edited or deleted.
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: deviceWrapper("100%", "15%"),
              justifyContent: "center",
            }}
          >
            <Link href={dao === undefined ? "/dao/create" : `/${dao}/create`}>
              <Button
                size="small"
                sx={{
                  mt: deviceWrapper(".5rem", "0"),
                  borderTop: deviceWrapper("1px solid", "0"),
                  borderColor: "border.main",
                  width: deviceWrapper("100%", "15%"),
                  pt: deviceWrapper(".5rem", "0"),
                  pb: deviceWrapper(".5rem", "0"),
                  borderTopLeftRadius: deviceWrapper("0", ".5rem"),
                  borderTopRightRadius: deviceWrapper("0", ".5rem"),
                }}
              >
                Change
              </Button>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            mt: "1.5rem",
            mb: "1.5rem",
            borderBottom: 1,
            borderColor: "border.main",
          }}
        />
        <GeneralInformation />
        <ProposalImage />
        <Box sx={{ mt: "1.5rem" }} />
        <Reference context />
        <Box
          sx={{
            width: "100%",
            borderBottom: 1,
            borderColor: "border.main",
            mt: "1.5rem",
          }}
        />
        <ProposalVote />
        <Content />
        <Box sx={{ mt: "1rem" }} />
        <Warning
          title="What would it take to get this proposal approved?"
          subtitle="Because of the DAO's configuration, in order for this proposal to be approved it will need to have at least 51% support and 70% quorum of the full DAO. You can find more information about this on the DAO configuration"
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: "1rem",
          }}
        >
          <CancelLink>
            <Button variant="outlined" sx={{ width: "50%", mr: "1rem" }}>
              Cancel
            </Button>
          </CancelLink>
          <Button
            variant="contained"
            sx={{ width: "50%" }}
            onClick={() => {
              setPublish(true);
            }}
          >
            Publish
          </Button>
        </Box>
        <Modal
          open={publish}
          onClose={() => setPublish(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{ ...modalBackground, width: deviceWrapper("20rem", "35rem") }}
          >
            <Box sx={{ fontSize: "1.1rem", fontWeight: 450 }}>
              You are about to publish a proposal
            </Box>
            <Box sx={{ mt: "1rem", fontSize: ".9rem" }}>
              Once published, a proposal can't be edited or deleted.
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
                {!loading && (
                  <Button sx={{ mr: "1rem" }} onClick={() => setPublish(false)}>
                    Cancel
                  </Button>
                )}
                <LoadingButton
                  onClick={handleSubmit}
                  startIcon={<PublishIcon />}
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                >
                  Publish
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Layout>
    </ProposalContext.Provider>
  );
};

export default CreateProposal;
