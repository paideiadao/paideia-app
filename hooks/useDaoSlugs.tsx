import { useMemo } from 'react';
import useSWR from 'swr';
import { axiosGetFetcher } from '@utils/axios';
import { isTemplateLiteral } from 'typescript';

export const useDaoSlugs = () => {
  const { data, error } = useSWR(`${process.env.API_URL}/dao`, axiosGetFetcher)

  const daoSlugsObject = useMemo(() => {
    if (data) {
      let object = {}
      data.map((item: any) => (
        object = {...object, [item?.dao_url]: item?.id}
      ))
      return object
    } else {
      return [];
    }
  }, [data])

  return {
    daoSlugs: data,
    daoSlugsObject,
    daoSlugsIsLoading: !error && !data,
    daoSlugsIsError: error
  }
}