import React, { FC } from "react";
import AbstractProfile from "@components/dao/profile/AbstractProfile";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { fetcher } from "@lib/utilities";
import useSWR from "swr";

// export const getStaticPaths = paths;
// export const getStaticProps = props;

const Profile: FC = () => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [daoUserData] = globalContext.api.daoUserState;

  const { data: activitiesData, error } = useSWR(
    daoUserData !== undefined && `/activities/${daoUserData.id}`,
    fetcher
  );

  const { data: proposalsData, error: proposalsError } = useSWR(
    daoUserData !== undefined &&
      `/proposals/by_user_details_id/${daoUserData.id}`,
    fetcher
  );

  return (
    <AbstractProfile
      edit
      data={daoUserData}
      proposals={proposalsData}
      activities={activitiesData}
    />
  );
};

export default Profile;
