import { NextPage } from "next";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { SlugContext } from "@contexts/SlugContext";

interface IDaoProps {}

const Dao: NextPage<IDaoProps> = ({}) => {
  const slugContext = useContext(SlugContext);
  // routing
  const router = useRouter();
  const { dao } = router.query;
  console.log(slugContext.daoSlugs);
  return <>No DAO loaded.</>;
};

export default Dao;
