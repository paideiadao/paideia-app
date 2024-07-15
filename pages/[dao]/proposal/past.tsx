import React from "react";
import PropsosalListing from "@components/dao/proposals/ProposalListing";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "@lib/utilities";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import Layout from "@components/dao/Layout";
import { useDaoSlugs } from "@hooks/useDaoSlugs";

const Past: React.FC = () => {
  const context = React.useContext<IGlobalContext>(GlobalContext);
  const router = useRouter();
  const { dao } = router.query;
  const { daoSlugsObject } = useDaoSlugs();

  const { data: proposalData, error: proposalDataError } = useSWR(
    dao &&
      daoSlugsObject[dao.toString()] &&
      `/proposals/by_dao_id/${daoSlugsObject[dao.toString()]}`,
    fetcher
  );

  // ADD FILTER FOR proposalData
  const pastProposals = proposalData
    ? proposalData.filter(
        (proposal: { status: string }) =>
          !["Draft", "Active"].includes(proposal.status)
      )
    : undefined;

  return (
    <Layout width={"96%"}>
      <PropsosalListing title="Past Proposals" proposals={pastProposals} />
    </Layout>
  );
};

export default Past;
