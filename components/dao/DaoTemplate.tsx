import React, { useEffect, useState } from "react";
import useDidMountEffect from "@components/utilities/hooks";
import { deviceWrapper } from "@components/utilities/Style";
import { useWallet } from "@components/wallet/WalletContext";
import { fetcher } from "@lib/utilities";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { GlobalContext, IGlobalContext } from "../../lib/AppContext";
import BottomNav from "./nav/BottomNav";
import Nav from "./nav/SideNav";
import TopNav from "./nav/TopNav";

const DaoTemplate: React.FC = (props) => {
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const router = useRouter();
  const [daoSlug, setDaoSlug] = useState('')
  const { dao } = router.query;
  useEffect(() => {
    if (router.isReady && dao != undefined) {
      setDaoSlug(dao.toString())
    }
  }, [router.isReady])
  const { data: daoData, error: daoError } = useSWR(
    `/dao/${daoSlug}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  useEffect(() => {
    globalContext.api.setDaoData(daoData);
  }, [daoData]);

  return (
    <>
      <Container maxWidth="xl" disableGutters>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {/* {!(daoSlug == '' || daoSlug == undefined) && ( */}
            <Nav showMobile={showMobile} setShowMobile={setShowMobile} />
          {/* )} */}
          
          <Box
            sx={{
              width: deviceWrapper("100%", "calc(100% - 14.5rem)"),
              top: "0",
              left: deviceWrapper("0", "14.5rem"),
              pt: "0rem",
              pb: "1rem",

              zIndex: deviceWrapper("100", "1000"),
            }}
          >
            <TopNav showMobile={showMobile} setShowMobile={setShowMobile} />
            <Box sx={{ width: "100%" }} onClick={() => setShowMobile(false)}>
              {daoError ? "error" : props.children}
            </Box>
            <BottomNav />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DaoTemplate;
