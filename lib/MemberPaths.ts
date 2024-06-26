import { GetStaticPaths, GetStaticProps } from "next/types";

export const paths: GetStaticPaths = async () => {
  // query db for proposals here...
  const members = [
    {
      id: "spreadly",
      member_id: "1",
    },
    {
      id: "spreadly",
      member_id: "2",
    },
  ];

  return {
    paths: members.map((member) => {
      return {
        params: {
          id: member.id,
          member_id: member.member_id,
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
