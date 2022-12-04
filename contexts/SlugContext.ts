import React, { createContext } from "react";

export interface ISlug {
  [key: string]: number;
}

export interface ITokens {
  name: string;
  tokenId: string;
  id: number;
}

export interface ISlugContext {
  daoSlugs: ISlug;
  daoTokens: ITokens[];
  setDaoSlugs: React.Dispatch<React.SetStateAction<ISlug>>;
  daoSlugsIsLoading: boolean;
}

export const SlugContext = createContext({} as ISlugContext);
