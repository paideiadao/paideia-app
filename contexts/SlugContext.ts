import React, { createContext } from "react";

export interface ISlug {
  [key: string]: number;
}

export interface ISlugContext {
  daoSlugs: ISlug;
  setDaoSlugs: React.Dispatch<React.SetStateAction<ISlug>>;
  daoSlugsIsLoading: boolean;
}

export const SlugContext = createContext({} as ISlugContext);
