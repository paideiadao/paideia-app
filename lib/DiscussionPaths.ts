import { GetStaticPaths, GetStaticProps } from "next/types";

export const paths: GetStaticPaths = async () => {
  // query db for proposals here...
  const discussions = [
    {
      id: "spreadly",
      discussion_id: "1",
    },
    {
      id: "spreadly",
      discussion_id: "2",
    },
    {
      id: "spreadly",
      discussion_id: "3",
    },
  ];

  return {
    paths: discussions.map((discussion) => {
      return {
        params: {
          id: discussion.id,
          discussion_id: discussion.discussion_id,
        },
      };
    }),
    fallback: false,
  };
};
