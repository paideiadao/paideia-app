import React, { useEffect, useState } from "react";
import { deviceWrapper } from "@components/utilities/Style";
import { fetcher } from "@lib/utilities";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import BottomNav from "@components/dao/nav/BottomNav";
import Nav from "@components/dao/nav/SideNav";
import TopNav from "@components/dao/nav/TopNav";
import { isAddressValid } from "@components/wallet/AddWallet";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import { useWallet } from "@components/wallet/WalletContext";
import ErrorPage from "@components/error/ErrorPage";

const DaoTemplate: React.FC = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const { wallet, setUtxos, dAppWallet } = useWallet();
  const { daoTokensObject } = useDaoSlugs();
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const router = useRouter();
  const [daoSlug, setDaoSlug] = useState("");
  const { dao } = router.query;
  useEffect(() => {
    if (router.isReady && dao != undefined) {
      setDaoSlug(dao.toString());
    }
  }, [router.isReady, dao]);

  const { data: daoList, error: daoListError } = useSWR(`/dao/`, fetcher);

  const { data: daoData, error: daoError } = useSWR(
    daoSlug && `/dao/${daoSlug}`,
    fetcher
  );

  useEffect(() => {
    if (daoSlug && daoData && daoList) {
      const daoSummary = daoList.filter(
        (dao: { dao_url: string }) => dao.dao_url === daoSlug
      )[0];
      globalContext.api.setDaoData({
        ...daoData,
        member_count: daoSummary?.member_count,
        proposal_count: daoSummary?.proposal_count,
      });
    }
  }, [daoData, daoList, daoSlug]);

  useEffect(() => {
    const load = async (tokensIds: string[]) => {
      try {
        if (dAppWallet.connected) {
          if (dAppWallet.addresses.length > 0) {
            const addresses = dAppWallet.addresses.map(
              (address: { id: number; name: string }) => address.name
            );
            const membership = await globalContext.api.getOrCreateDaoUser(
              addresses,
              tokensIds
            );
            setUtxos(membership);
          }
        } else if (isAddressValid(wallet)) {
          const membership = await globalContext.api.getOrCreateDaoUser(
            [wallet],
            tokensIds
          );
          setUtxos(membership);
        }
      } catch (e) {
        console.log(e);
        setUtxos({
          currentDaoTokens: 0,
          membershipList: [],
        });
      }
    };
    if (daoTokensObject.length > 0 && globalContext.api.daoData) {
      const tokenIds = Object.values(daoTokensObject).map(
        (item) => item.tokenId
      );
      load(tokenIds);
    } else {
      setUtxos({
        currentDaoTokens: 0,
        membershipList: [],
      });
    }
  }, [wallet, dAppWallet, globalContext.api.daoData]);

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
              {daoError ? (
                <ErrorPage
                  title="Uh oh...!"
                  description="Something didn't work as expected."
                  withGoBack
                />
              ) : (
                props.children
              )}
            </Box>
            <BottomNav />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DaoTemplate;
