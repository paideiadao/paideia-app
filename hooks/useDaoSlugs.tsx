import { useMemo } from 'react';
import useSWR from 'swr';
import { axiosGetFetcher } from '@utils/axios';
import { isTemplateLiteral } from 'typescript';
import { getObj } from '@lib/utilities';
import React from 'react';

interface IDao {
  id: number,
  dao_name: string,
  dao_short_description: string,
  dao_url: string
}

export const useDaoSlugs = () => {
  console.log(`${process.env.API_URL}/dao`)
  const { data, error } = useSWR(`${process.env.API_URL}/dao`, axiosGetFetcher)
  const [currentDao, setCurrentDao] = React.useState<IDao>(undefined)

  const daoSlugsObject: any = useMemo(() => {
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

  React.useEffect(() => {
    setCurrentDao(getObj(data, 'id', daoSlugsObject ? daoSlugsObject.dao : undefined))
  }, [daoSlugsObject])

  console.log('currentDaoState', currentDao)

  return {
    daoSlugs: data,
    daoSlugsObject,
    daoSlugsIsLoading: !error && !data,
    daoSlugsIsError: error,
    currentDao: currentDao, 
  }
}