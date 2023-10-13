import * as React from "react";
import PropsosalListing from "@components/dao/proposals/ProposalListing";
import Layout from "@components/dao/Layout";
import { fetcher } from "@lib/utilities";
import useDidMountEffect from "@components/utilities/hooks";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import { useRouter } from "next/router";
import useSWR from "swr";

const Mine: React.FC = () => {
  const context = React.useContext<IGlobalContext>(GlobalContext);
  const [daoUserData] = context.api.daoUserState;
  const { data, error } = useSWR(
    daoUserData?.id && `/proposals/by_user_details_id/${daoUserData?.id}`,
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
      {daoUserData ? (
        <PropsosalListing
          title="My proposals"
          proposals={
            data === undefined
              ? undefined
              : data.filter((i: any) =>
                  (i.user_details_id === daoUserData) == null
                    ? null
                    : daoUserData.id
                )
          }
        />
      ) : (
        "Must login to view your proposals!"
      )}
    </Layout>
  );
};

export default Mine;
