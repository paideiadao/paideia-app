import { useMemo } from "react";
import useSWR from "swr";
import { axiosGetFetcher } from "@utils/axios";

export const useDaoSlugs = () => {
  const { data, error } = useSWR(
    `${process.env.API_URL}/dao/`,
    axiosGetFetcher
  );

  const daoSlugsObject: any = useMemo(() => {
    if (data) {
      let object = {};
      data.map(
        (item: any) => (object = { ...object, [item?.dao_url]: item?.id })
      );

      return object;
    } else {
      return [];
    }
  }, [data]);

  const daoTokensObject: {name: string; tokenId: string; id: number}[] = useMemo(() => {
    if (data) {
      let array = data.map(
        (item: any) => {
          return {
            name: item.dao_name,
            tokenId: item.token_id,
            id: item.id
          }
        }
      );
      return array;
    } else {
      return [];
    }
  }, [data])

  return {
    daoSlugs: data,
    daoSlugsObject,
    daoTokensObject,
    daoSlugsIsLoading: !error && !data,
    daoSlugsIsError: error,
    // currentDao: getObj(
    //   data,
    //   "id",
    //   daoSlugsObject ? daoSlugsObject.dao : undefined
    // ),
  };
};
