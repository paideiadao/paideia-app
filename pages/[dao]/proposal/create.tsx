import Layout from "@components/dao/Layout";
import CreateHeader from "@components/dao/proposal/Header";
import { Box, Button, Modal } from "@mui/material";
import * as React from "react";
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

export interface IProposal {
  id?: number;
  name: string;
  image?: IFile; // make optional
  category: string;
  content: string;
  status: string;
  votingSystem: VotingType;
  references: number[];
  actions: IProposalAction[];
  date?: Date;
  createdDate?: Date;
  likes?: number;
  dislikes?: number;
  followed?: boolean;
  tags?: any[];
  userSide?: number;
  comments?: IComment[];
  attachments?: IFile[];
  addendums: IAddendum[];
  optionType: OptionType;
}

const CreateProposal: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;
  const [value, setValue] = React.useState<IProposal>({
    name: "",
    image: {
      url: getRandomImage(),
      file: undefined,
    },
    status: "",
    category: "",
    content: "",
    votingSystem: "unselected",
    optionType: "one-option",
    references: [],
    actions: [
      {
        name: undefined,
        data: undefined,
      },
    ],
    addendums: [],
  });

  console.log(value)

  const context = React.useContext<IGlobalContext>(GlobalContext);
  const api = new ProposalApi(context.api, value, setValue);

  const [publish, setPublish] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

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
              api.create();
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
                  onClick={() => (loading ? null : setLoading(true))}
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
