import { GetStaticPaths, GetStaticProps } from "next/types";

export const paths: GetStaticPaths = async () => {
  // query db for proposals here...
  const distributions = [
    {
      id: "spreadly",
      distribution_id: "1",
    },
    {
      id: "spreadly",
      distribution_id: "2",
    },
    {
      id: "spreadly",
      distribution_id: "3",
    },
  ];

  return {
    paths: distributions.map((distribution) => {
      return {
        params: {
          id: distribution.id,
          distribution_id: distribution.distribution_id,
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
