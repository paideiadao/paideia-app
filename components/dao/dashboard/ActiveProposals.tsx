import { Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { Subheader } from "../../creation/utilities/HeaderComponents";
import ProposalCard from "../proposals/ProposalCard";
import useDidMountEffect from "@components/utilities/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { deviceStruct, deviceWrapper } from "@components/utilities/Style";
import CardSlider from "@components/CardSlider";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import axios from "axios";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { IProposal } from "@pages/[dao]/proposal/create";

const temp = new Date();
temp.setDate(temp.getDate() - 30);

const ActiveProposal: React.FC = () => {
  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const [slide, setSlide] = React.useState<number>(1);

  useDidMountEffect(() => {
    const element = document.getElementById(
      `proposal-active-${slide === 0 ? slide : slide - 1}`
    );
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [slide]);

  const router = useRouter();
  const { dao } = router.query;
  const { daoSlugsObject } = useDaoSlugs();
  const [proposalData, setProposalData] = useState<null | IProposal[]>(null);

  useEffect(() => {
    let isMounted = true;
    globalContext.api?.setLoading((current: number) => current + 1);
    if (dao && daoSlugsObject[dao.toString()]) {
      const url = `${process.env.API_URL}/proposals/by_dao_id/${
        daoSlugsObject[dao.toString()]
      }`;
      axios
        .get(url)
        .then((res) => {
          if (isMounted) setProposalData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    globalContext.api?.setLoading((current: number) => current - 1);
    return () => {
      isMounted = false;
    };
  }, [dao, daoSlugsObject]);

  return (
    <>
      {proposalData === null ? (
        <Box>
          <CircularProgress color="inherit" />
        </Box>
      ) : proposalData.length === 0 ? (
        <Box
          sx={{
            width: "100%",
            height: "7rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
          }}
        >
          No Proposals Yet!
        </Box>
      ) : (
        <CardSlider
          uniqueId="uses"
          addMargin={0}
          buttonTop
          header={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: deviceWrapper("80%", "90%"),
              }}
            >
              <Subheader title="Active Proposals" small bold />
              <Box sx={{ ml: "auto" }}>
                <Link href={dao === undefined ? "" : `/${dao}/proposal`}>
                  <Button sx={{ fontSize: ".8rem", mr: "1rem" }} size="small">
                    View All
                  </Button>
                </Link>
              </Box>
            </Box>
          }
        >
          {proposalData
            .slice()
            .reverse()
            .slice(0, 10)
            .map((i: any, c: number) => (
              <ProposalCard
                {...i}
                c={c}
                scrollable
                key={"proposal-card-key-" + c}
                width={deviceStruct(
                  "15rem",
                  "15rem",
                  "15rem",
                  "16rem",
                  "17rem"
                )}
              />
            ))}
        </CardSlider>
      )}
    </>
  );
};

export default ActiveProposal;
