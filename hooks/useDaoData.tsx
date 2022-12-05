import { useMemo } from "react";
import useSWR from "swr";
import { axiosGetFetcher } from "@utils/axios";
import { isTemplateLiteral } from "typescript";

export const useDaoData = (id: number) => {
  const { data, error } = useSWR(
    id && `${process.env.API_URL}/${id.toString()}`,
    axiosGetFetcher
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
