import React, { useEffect, useState, useContext, FC } from "react";
import useDidMountEffect from "@components/utilities/hooks";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { fetcher } from "@lib/utilities";
import { Box, Button, Avatar, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Subheader } from "../../creation/utilities/HeaderComponents";
import Activity, { IActivity } from "../activity/Activity";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import axios from "axios";

export const activities = [
  {
    date: new Date(),
    img: "T",
    name: "Username",
    action: "created the proposal",
    value: "proposal name",
  },
  {
    date: new Date(),
    img: "T",
    name: "Username",
    action: "made a comment on the proposal",
    value: "proposal name",
  },
  {
    date: new Date(),
    img: "T",
    name: "Username",
    action: "voted on the proposal",
    value: "proposal name",
  },
  {
    date: new Date(),
    img: "T",
    name: "Username",
    action: "created the proposal",
    value: "proposal name",
  },
  {
    date: new Date(),
    img: "T",
    name: "Username",
    action: "created the proposal",
    value: "proposal name",
  },
];

const LatestActivity: React.FC = () => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);

  const router = useRouter();
  const { dao } = router.query;
  const { daoSlugsObject } = useDaoSlugs();
  const [data, setData] = useState<IActivity[] | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (dao && daoSlugsObject[dao.toString()]) {
      const url = `${process.env.API_URL}/activities/by_dao_id/${
        daoSlugsObject[dao.toString()]
      }`;
      axios
        .get(url)
        .then((res) => {
          if (isMounted) setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [dao, daoSlugsObject]);

  return (
    <Box sx={{ width: "100%", pb: ".5rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: ".5rem",
        }}
      >
        <Subheader title="Latest Activity" small bold />
        <Link href={dao === undefined ? "" : `/${dao}/activity`}>
          <Button sx={{ ml: "auto", fontSize: ".8rem" }} size="small">
            View Activity Log
          </Button>
        </Link>
      </Box>
      {data ? (
        data.slice(0, 5).map((i: IActivity, c: number) => {
          return <Activity i={i} c={c} key={"latest-activity" + c} />;
        })
      ) : (
        <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              my: "1rem",
            }}
          >
            <CircularProgress />
          </Box>
      )}
    </Box>
  );
};

export default LatestActivity;
