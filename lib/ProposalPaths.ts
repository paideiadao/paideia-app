import { GetStaticPaths, GetStaticProps } from "next/types";

export const paths: GetStaticPaths = async () => {
  // query db for proposals here...
  const proposals = [
    {
      id: "spreadly",
      proposal_id: "1",
    },
    {
      id: "spreadly",
      proposal_id: "2",
    },
  ];

  return {
    paths: proposals.map((proposal) => {
      return {
        params: {
          id: proposal.id,
          proposal_id: proposal.proposal_id,
        },
      };
    }),
    fallback: false,
  };
};

export const props: GetStaticProps = async ({ params }) => {
  const daoData = {
    daoId: params?.id,
  };
  return {
    props: {
      daoData,
    },
  };
};
