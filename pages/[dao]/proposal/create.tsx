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
import Content from "@components/dao/proposal/Content";
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
import VoteDuration, {
  IVoteDuration,
} from "@components/dao/proposal/vote/YesNo/Actions/VoteDuration";
import { ISupport } from "@components/dao/proposal/vote/YesNo/Actions/Support";
import { OptionType } from "@components/dao/proposal/vote/Options/OptionSystemSelector";
import CancelLink from "@components/utilities/CancelLink";
import {
  bPaideiaSendFundsBasic,
  bPaideiaUpdateDAOConfig,
} from "@lib/proposalActionOutputMapper";
import { getErgoWalletContext } from "@components/wallet/AddWallet";
import { useState, useContext, useEffect } from "react";
import { generateSlug } from "@lib/utilities";
import {
  IConfig,
  IUpdateConfig,
} from "@components/dao/proposal/vote/YesNo/Actions/UpdateConfig";

export type ActionType =
  | IOptimisticGovernance
  | IQuorum
  | ISendFunds
  | ILiquidityPool
  | IQuadradicVoting
  | IDaoDescription
  | IVoteDuration
  | ISupport
  | IUpdateConfig;

export interface IProposalAction {
  name:
    | "Send Funds"
    | "Update DAO Config"
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
  data?: ActionType;
  close?: () => void;
  c?: number;
  options?: IProposalOption[];
  actionType?: string;
  action?: IAction;
}

export type Output = {
  address: string;
  nergs: number;
  tokens: Token[];
  registers: any[]; // TODO: add appropriate type here
};

export interface IAction {
  repeats: any;
  activationTime: number;
  optionId: number;
  outputs: Output[];
}

export type Token = [string, number]; // [tokenId, tokenAmount (not accounting for decimals)]

export interface IProposalOption {
  name: string;
  description: string;
  data?: ActionType;
  rank: number;
  default?: boolean;
}

export type VotingType = "yes/no" | "options" | "unselected";

const NERGs = 1000000000;
const TIME_MS = 1000;
const BUFFER = 900 * TIME_MS;

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
  referenced_meta?: string[];
  votes: number[];
  alias?: string;
  profile_img_url?: string;
  user_followers?: number[];
}

export interface ICreateProposalErrors {
  name: boolean;
  category: boolean;
  voting: boolean;
  actionConfig: boolean;
  votingDuration: boolean;
  activationTime: boolean;
}

const defaultErrors: ICreateProposalErrors = {
  name: false,
  category: false,
  voting: false,
  actionConfig: false,
  votingDuration: false,
  activationTime: false,
};

const CreateProposal: React.FC = () => {
  const router = useRouter();
  const { dao, auto_update_config } = router.query;
  const [value, setValue] = useState<IProposal>({
    name: "",
    image: {
      url: getRandomImage() ?? "",
      file: undefined,
    },
    status: "Draft",
    category: "",
    content: "",
    voting_system: auto_update_config ? "yes/no" : "unselected",
    optionType: "one-option",
    references: [],
    attachments: [],
    comments: [],
    actions: auto_update_config
      ? [
          {
            name: "Update DAO Config",
            data: {
              config: [],
              voting_duration: (24 * 60 * 60).toString(),
              activation_time: Date.now() + 2 * 24 * 60 * 60 * 1000,
            },
          },
        ]
      : [],
    addendums: [],
    likes: [],
    dislikes: [],
    followers: [],
    is_proposal: true,
    votes: [0, 0],
  });
  const [errors, setErrors] = useState<ICreateProposalErrors>(defaultErrors);

  const context = useContext<IGlobalContext>(GlobalContext);
  const api = new ProposalApi(context.api, value, setValue, errors, setErrors);

  const [publish, setPublish] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [stake, setStake] = useState<any>({});
  const tokenomics = context.api.daoData?.tokenomics;
  const governance = context.api.daoData?.governance;

  useEffect(() => {
    if (context.api.userStakeData) {
      const stake = context.api.userStakeData;
      setStake(stake);
      if (!stake.stake_keys?.length) {
        api.error(
          "Stake key either not present or in use on another transaction, add stake now"
        );
      }
    }
  }, [context.api.userStakeData]);

  useEffect(() => {
    if (auto_update_config) {
      setValue({
        ...value,
        voting_system: "yes/no",
        actions: [
          {
            name: "Update DAO Config",
            data: {
              config: [],
              voting_duration: (24 * 60 * 60).toString(),
              activation_time: Date.now() + 2 * 24 * 60 * 60 * 1000,
            },
          },
        ],
      });
    }
  }, [auto_update_config]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const error = validateErrors(value, governance, errors, setErrors);
      if (error) {
        throw "Form Validation Error";
      }
      const imgUrl = await getBannerUrl();
      const action =
        value.actions[0].name === "Send Funds"
          ? bPaideiaSendFundsBasic(
              // @ts-ignore
              value.actions[0].data.recipients[0].address,
              // @ts-ignore
              value.actions[0].data.recipients[0].ergs * NERGs,
              // @ts-ignore
              value.actions[0].data.recipients[0].tokens,
              // @ts-ignore
              value.actions[0].data.activation_time
            )
          : value.actions[0].name === "Update DAO Config"
          ? bPaideiaUpdateDAOConfig(
              // @ts-ignore
              value.actions[0].data.config,
              // @ts-ignore
              value.actions[0].data.activation_time
            )
          : {}; // should never occur
      const proposal = {
        dao_id: context.api.daoData?.id,
        user_details_id: context.api.daoUserData?.id,
        ...value,
        image_url: imgUrl,
        actions: [action],
        is_proposal: true,
        stake_key: stake.stake_keys[0].key_id,
        end_time:
          new Date().getTime() +
          // @ts-ignore
          value.actions[0].data.voting_duration * TIME_MS +
          BUFFER,
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
          subtitle={`Because of the DAO's configuration, in order for this proposal to be approved it will need to have at least ${
            governance?.support_needed / 10
          }% support and ${
            governance?.quorum / 10
          }% quorum of the full DAO. Minimum voting duration is ${
            governance?.vote_duration__sec
          } seconds. You can find more information about this on the DAO Config.`}
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

const validateErrors = (
  value: IProposal,
  governance: any,
  errors: ICreateProposalErrors,
  setErrors: Function
) => {
  errors.name = value.name === "";
  errors.category = value.category === "";
  errors.voting = // @ts-ignore
    value.actions.length !== 1 ||
    // @ts-ignore
    (value.actions[0].name === "Send Funds" &&
      // @ts-ignore
      value.actions[0].data?.recipients?.length !== 1);
  // @ts-ignore
  if (!errors.voting && value.actions[0].name === "Send Funds") {
    errors.actionConfig =
      errors.voting ||
      // @ts-ignore
      value.actions[0].data.recipients[0].address === "" ||
      // @ts-ignore
      value.actions[0].data.recipients[0].ergs === "" ||
      // @ts-ignore
      isNaN(value.actions[0].data.recipients[0].ergs) ||
      // @ts-ignore
      value.actions[0].data.recipients[0].tokens.some(
        // @ts-ignore
        (token) =>
          isNaN(token.amount) ||
          token.amount === "" ||
          token.amount === "0" ||
          token.tokenId === ""
      );
  } else if (
    !errors.voting &&
    // @ts-ignore
    value.actions[0].name === "Update DAO Config"
  ) {
    // @ts-ignore
    const actionData: IConfig[] = value.actions[0].data.config;
    const error =
      actionData.length === 0 ||
      actionData.filter(
        (config) =>
          config.action_type === "" ||
          config.key === "" ||
          config.type === "" ||
          config.value === ""
      ).length > 0;
    errors.actionConfig = errors.voting || error;
  } else {
    errors.voting = true; // should never occur
  }
  if (!errors.voting && !errors.actionConfig) {
    const endTime =
      new Date().getTime() +
      // @ts-ignore
      value.actions[0].data.voting_duration * TIME_MS +
      BUFFER;
    // @ts-ignore
    const actionTime = value.actions[0].data.activation_time;
    errors.activationTime =
      isNaN(actionTime) || isNaN(endTime) || actionTime < endTime;
    errors.votingDuration =
      isNaN(endTime) ||
      new Date().getTime() + Number(governance?.vote_duration__sec) * TIME_MS >=
        endTime;
  }
  setErrors(errors);
  return (
    errors.category ||
    errors.name ||
    errors.voting ||
    errors.actionConfig ||
    errors.activationTime ||
    errors.votingDuration
  );
};

export default CreateProposal;
