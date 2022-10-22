import * as React from "react";
import PropsosalListing from "@components/dao/proposals/ProposalListing";
import Layout from "@components/dao/Layout";
import useDidMountEffect from "@components/utilities/hooks";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import { getBaseUrl, fetcher } from "@lib/utilities";
import { useRouter } from "next/router";
import useSWR from "swr";

const Past: React.FC = () => {
  const context = React.useContext<IGlobalContext>(GlobalContext);
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `/proposals/by_dao_id/${id === undefined ? 1 : id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useDidMountEffect(() => {
    if (error) {
      context.api.showAlert("Error fetching proposals.", "error");
    }
  }, [error]);

  return (
    <Layout width={"96%"}>
      <PropsosalListing title="Past proposals" proposals={data} />
    </Layout>
  );
};

export default Past;
