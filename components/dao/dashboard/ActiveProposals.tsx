import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Subheader } from "../../creation/utilities/HeaderComponents";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProposalCard from "../proposals/ProposalCard";
import useDidMountEffect from "@components/utilities/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { deviceStruct, deviceWrapper } from "@components/utilities/Style";
import CardSlider from "@components/CardSlider";
import { getBaseUrl, fetcher } from "@lib/utilities";
import useSWR from "swr";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import axios from "axios";

let temp = new Date();
temp.setDate(temp.getDate() - 30);

const ActiveProposal: React.FC = () => {
  const [slide, setSlide] = React.useState<number>(1);

  useDidMountEffect(() => {
    let element = document.getElementById(
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
  const [proposalData, setProposalData] = useState(undefined);

  useEffect(() => {
    if (dao != undefined && daoSlugsObject[dao.toString()] != undefined) {
      const url = `${process.env.API_URL}/proposals/by_dao_id/${
        daoSlugsObject[dao.toString()]
      }`;
      axios
        .get(url)
        .then((res) => {
          setProposalData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dao]);

  return (
    <>
      {proposalData === undefined ? (
        <Box>Loading Here...</Box>
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
              <Subheader title="Active proposals" small bold />
              <Box sx={{ ml: "auto" }}>
                <Link href={dao === undefined ? "" : `/${dao}/proposals/all`}>
                  <Button sx={{ fontSize: ".8rem", mr: "1rem" }} size="small">
                    View All
                  </Button>
                </Link>
              </Box>
            </Box>
          }
        >
          {proposalData.map((i: any, c: number) => (
            <ProposalCard
              {...i}
              c={c}
              scrollable
              key={"proposal-card-key-" + c}
              width={deviceStruct("15rem", "15rem", "15rem", "16rem", "17rem")}
            />
          ))}
        </CardSlider>
      )}
    </>
  );
};

export default ActiveProposal;
