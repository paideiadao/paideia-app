import React from "react";
import PropsosalListing from "@components/dao/proposals/ProposalListing";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "@lib/utilities";
import Layout from "@components/dao/Layout";
import { useDaoSlugs } from "@hooks/useDaoSlugs";

const All: React.FC = () => {
  const router = useRouter();
  const { dao } = router.query;
  const { daoSlugsObject } = useDaoSlugs();

  const { data: proposalData, error: proposalDataError } = useSWR(
    dao &&
      daoSlugsObject[dao.toString()] &&
      `/proposals/by_dao_id/${daoSlugsObject[dao.toString()]}`,
    fetcher
  );

  return (
    <Layout width={"96%"}>
      <PropsosalListing title="All proposals" proposals={proposalData} />
    </Layout>
  );
};

export default All;
