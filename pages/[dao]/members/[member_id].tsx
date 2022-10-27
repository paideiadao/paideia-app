import React, { useEffect, useState } from "react";
import AbstractProfile from "@components/dao/profile/AbstractProfile";
import { fetcher, getDaoPath } from "@lib/utilities";
import useSWR from "swr";
import { useRouter } from "next/router";
import useDidMountEffect from "@components/utilities/hooks";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { useDaoSlugs } from "@hooks/useDaoSlugs";

const Member: React.FC = () => {
  const router = useRouter();
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const { member_id, dao } = router.query;
  const [daoId, setDaoId] = useState(undefined);
  const { daoSlugsObject } = useDaoSlugs();

  useEffect(() => {
    if (router.isReady) {
      setDaoId(daoSlugsObject[dao.toString()]);
    }
  }, [router.isReady]);

  const { data: userData, error: userError } = useSWR(
    member_id !== undefined &&
      daoId !== undefined &&
      `/users/details/${member_id}?dao_id=${daoId}&mapping=user_details_id`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: activitiesData, error: activitiesError } = useSWR(
    member_id !== undefined && `/activities/${member_id}`,
    fetcher
  );

  const { data: proposalsData, error: proposalsError } = useSWR(
    member_id !== undefined && `/proposals/by_user_details_id/${member_id}`,
    fetcher
  );

  // useDidMountEffect(() => {
  //   if (userError !== undefined) {
  //     router.push(getDaoPath(daoId as string, "/404"));
  //   }
  // }, [userError]);

  return (
    <AbstractProfile
      data={userData}
      proposals={proposalsData ?? []}
      activities={activitiesData ?? []}
      followed={
        userData === undefined
          ? undefined
          : userData.followers.indexOf(
              globalContext.api.daoUserData
                ? globalContext.api.daoUserData.id
                : null
            ) > -1
      }
    />
  );
};
export default Member;
