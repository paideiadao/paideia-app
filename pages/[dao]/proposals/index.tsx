import * as React from "react";
import PropsosalListing from "@components/dao/proposals/ProposalListing";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher, getBaseUrl } from "@lib/utilities";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import useDidMountEffect from "@components/utilities/hooks";
import Layout from "@components/dao/Layout";

const All: React.FC = () => {
  const context = React.useContext<IGlobalContext>(GlobalContext);
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `/proposals/by_dao_id/${id === undefined ? 1 : id}`,
    fetcher
  );

  useDidMountEffect(() => {
    if (error) {
      context.api.showAlert("Error fetching proposals.", "error");
    }
  }, [error]);

  return (
    <Layout width={"96%"}>
      <PropsosalListing title="All proposals" proposals={data} />
    </Layout>
  );
};

export default All;
