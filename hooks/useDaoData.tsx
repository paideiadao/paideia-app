import { useMemo } from "react";
import useSWR from "swr";
import { axiosCachedGetFetcher } from "@utils/axios";

export const useDaoData = (id: number) => {
  const { data, error } = useSWR(
    id ? `${process.env.API_URL}/${id.toString()}` : false,
    axiosCachedGetFetcher
  );

  const daoDataObject = useMemo(() => {
    if (data) {
      return data;
    } else {
      return [];
    }
  }, [data]);

  return {
    daoData: data,
    daoDataObject,
    daoDataIsLoading: !error && !data,
    daoDataIsError: error,
  };
};
