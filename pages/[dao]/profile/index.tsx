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
  const userData = appContext.api?.daoUserData;

  const { data: activitiesData, error } = useSWR(
    userData?.id && `/activities/${userData.id}`,
    fetcher
  );

  const { data: proposalsData, error: proposalsError } = useSWR(
    userData?.id && `/proposals/by_user_details_id/${userData.id}`,
    fetcher
  );

  return userData ? (
    <AbstractProfile
      edit
      data={userData}
      proposals={proposalsData}
      activities={activitiesData}
    />
  ) : (
    <></>
  );
};

export default Profile;
