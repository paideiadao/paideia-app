import * as React from "react";
import AbstractProfile from "@components/dao/profile/AbstractProfile";
import { fetcher, getDaoPath } from "@lib/utilities";
import useSWR from "swr";
import { useRouter } from "next/router";
import useDidMountEffect from "@components/utilities/hooks";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";

const Member: React.FC = () => {
  const router = useRouter();
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const { member_id, id } = router.query;
  const { data: userData, error: userError } = useSWR(
    member_id !== undefined &&
      `/users/details/${member_id}?dao_id=${id === undefined ? 1 : id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useDidMountEffect(() => {
    if (userError !== undefined) {
      router.push(getDaoPath(id as string, '/404'));
    }
  }, [userError]);

  return (
    <AbstractProfile
      data={userData}
      proposals={[]}
      activities={[]}
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
