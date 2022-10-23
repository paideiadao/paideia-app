import useDidMountEffect from "@components/utilities/hooks";
import { deviceWrapper } from "@components/utilities/Style";
import { useWallet } from "@components/wallet/WalletContext";
import { fetcher, getDaoPath } from "@lib/utilities";
import { axiosGetFetcher } from "@utils/axios";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import useSWR from "swr";
import { GlobalContext, IGlobalContext } from "../../lib/AppContext";
import BottomNav from "./nav/BottomNav";
import Nav from "./nav/SideNav";
import TopNav from "./nav/TopNav";


const DaoTemplate: React.FC = (props) => {
  const [showMobile, setShowMobile] = React.useState<boolean>(false);
  const router = useRouter();
  const { dao } = router.query;
  const { data: daoData, error: daoError } = useSWR(
    `/dao/${dao === undefined ? "paideia" : dao}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { utxos } = useWallet();

  const globalContext = React.useContext<IGlobalContext>(GlobalContext);

  useDidMountEffect(() => {
    globalContext.api.setDaoData(daoData);
  }, [daoData]);

  // useDidMountEffect(() => {
  //   router.push(getDaoPath(id as string, '/404'));
  // }, [daoError]);

  return (
    <>
      
      <Container maxWidth="xl" disableGutters>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Nav showMobile={showMobile} setShowMobile={setShowMobile} />
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
              {daoError ? 'error' : props.children}
            </Box>
            <BottomNav />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DaoTemplate;
