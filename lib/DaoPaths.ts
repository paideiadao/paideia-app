import { GetStaticPaths, GetStaticProps } from "next/types";

export const paths: GetStaticPaths = async () => {
  const paths = [{ params: { id: "spreadly" } }, { params: { id: "ergopad" } }];
  return {
    paths,
    fallback: false,
  };
};

export const props: GetStaticProps = async ({ params }) => {
  const daoData = { params };
  return {
    props: {
      params,
    },
  };
};
