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
  const userData = context.api?.daoUserData;
  const { data, error } = useSWR(
    userData?.id && `/proposals/by_user_details_id/${userData?.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useDidMountEffect(() => {
    if (error) {
      context.api?.showAlert("Error fetching proposals.", "error");
    }
  }, [error]);

  return (
    <Layout width={"96%"}>
      {context.api?.daoUserData ? (
        <PropsosalListing
          title="My proposals"
          proposals={
            data === undefined
              ? undefined
              : data.filter((i: any) =>
                  (i.user_details_id === context.api?.daoUserData) == null
                    ? null
                    : context.api?.daoUserData.id
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
