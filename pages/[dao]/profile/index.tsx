import React, { FC } from "react";
import AbstractProfile from "@components/dao/profile/AbstractProfile";
import { paths, props } from "@lib/DaoPaths";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { fetcher } from "@lib/utilities";
import useSWR from "swr";

// export const getStaticPaths = paths;
// export const getStaticProps = props;

const Profile: FC = () => {
  const appContext = React.useContext<IGlobalContext>(GlobalContext);
  const userData = appContext.api.daoUserData;

  const { data: activitiesData, error } = useSWR(
    userData !== undefined && `/activities/${userData.id}`,
    fetcher
  );

  const { data: proposalsData, error: proposalsError } = useSWR(
    userData !== undefined && `/proposals/by_user_details_id/${userData.id}`,
    fetcher
  );
  return (
    <AbstractProfile
      edit
      data={userData}
      proposals={proposalsData}
      activities={activitiesData}
    />
  );
};

export default Profile;
