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
import { IProposal } from "./create";

const Following: React.FC = () => {
  const context = React.useContext<IGlobalContext>(GlobalContext);
  const router = useRouter();
  const { dao } = router.query;
  const { daoSlugsObject } = useDaoSlugs();
  const [proposalData, setProposalData] = useState<IProposal[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (dao && daoSlugsObject[dao.toString()] !== undefined) {
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
    return () => {
      isMounted = false;
    };
  }, [dao]);

  return (
    <Layout width={"96%"}>
      <PropsosalListing
        title="Following proposals"
        proposals={
          proposalData === null
            ? undefined
            : proposalData.filter(
                (i: any) =>
                  i.followers.indexOf(
                    context.api?.daoUserData == null
                      ? null
                      : context.api.daoUserData.id
                  ) > -1
              )
        }
      />
    </Layout>
  );
};

export default Following;
