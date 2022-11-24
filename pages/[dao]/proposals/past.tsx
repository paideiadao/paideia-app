import React, { useEffect, useState } from "react";
import PropsosalListing from "@components/dao/proposals/ProposalListing";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher, getBaseUrl } from "@lib/utilities";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import useDidMountEffect from "@components/utilities/hooks";
import Layout from "@components/dao/Layout";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import axios from "axios";

const All: React.FC = () => {
  const context = React.useContext<IGlobalContext>(GlobalContext);
  const router = useRouter();
  const { dao } = router.query;
  const { daoSlugsObject } = useDaoSlugs();
  const [proposalData, setProposalData] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    if (dao != undefined && daoSlugsObject[dao.toString()] != undefined) {
      const url = `${process.env.API_URL}/proposals/by_dao_id/${
        daoSlugsObject[dao.toString()]
      }`;
      axios
        .get(url)
        .then((res) => {
          if (isMounted) setProposalData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => { isMounted = false };
  }, [dao]);

  // ADD FILTER FOR proposalData

  return (
    <Layout width={"96%"}>
      <PropsosalListing title="Past proposals" proposals={proposalData} />
    </Layout>
  );
};

export default All;
