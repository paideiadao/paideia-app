import React, { useEffect, useState, useContext } from "react";
import useDidMountEffect from "@components/utilities/hooks";
import { deviceWrapper } from "@components/utilities/Style";
import { useWallet } from "@components/wallet/WalletContext";
import { fetcher, getDaoPath } from "@lib/utilities";
import { useRouter } from "next/router";
import useSWR from "swr";
import { GlobalContext, IGlobalContext } from "../../lib/AppContext";
import BottomNav from "./nav/BottomNav";
import Nav from "./nav/SideNav";
import TopNav from "./nav/TopNav";
import {
  Box,
  Container,
  useScrollTrigger,
  Slide,
  AppBar,
  Typography,
  Toolbar,
  Link,
  useTheme
} from "@mui/material";
import { SlugContext } from "@contexts/SlugContext";
import { useDaoData } from "@hooks/useDaoData";


const DaoTemplate: React.FC = (props) => {
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const slugContext = useContext(SlugContext)
  const router = useRouter();
  const { dao } = router.query;
  console.log(dao)
  const [id, setId] = useState<number>(0)
  const { utxos } = useWallet();

  const globalContext = React.useContext<IGlobalContext>(GlobalContext);

  useDidMountEffect(() => {
    const daoString = dao.toString()
    setId(slugContext.daoSlugs[daoString])
  }, [dao])

  const { data: daoData, error: daoError } = useSWR(
    `/dao/${id === undefined ? "paideia" : id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useDidMountEffect(() => {
    globalContext.api.setDaoData(daoData);
  }, [daoData]);

  useDidMountEffect(() => {
    // router.push(getDaoPath(id.toString(), '/404'));
  }, [daoError]);

  const theme = useTheme()

  interface Props {
    children: React.ReactElement;
  }
  function HideOnScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    })

    return (
      <Slide appear={false} direction="up" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return (
    <>


      {/* BEGIN TEMPORARY WARNING FOR ALPHA VERSION */}
      <HideOnScroll>
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: theme.palette.warning.main }}>
          <Toolbar variant="dense">
            <Typography sx={{ color: '#000', fontSize: '0.9rem', fontWeight: 'bold' }}>
              NOTE: This release of Paideia is a web2 alpha test. If you encounter any bugs, please submit them to the team via {' '}
              <Link
                href="https://discord.gg/J3KDrtCFEn"
                target="_blank"
                sx={{
                  color: '#000',
                  textDecoration: 'underline',
                  '&:hover': {
                    textDecoration: 'none',
                  }
                }}
              >
                Discord
              </Link>{' '} or{' '}
              <Link
                href="https://t.me/paideiaDAO"
                target="_blank"
                sx={{
                  color: '#000',
                  textDecoration: 'underline',
                  '&:hover': {
                    textDecoration: 'none',
                  }
                }}
              >
                Telegram
              </Link>.
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* END TEMPORARY WARNING FOR ALPHA VERSION */}


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
              {props.children}
            </Box>
            <BottomNav />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DaoTemplate;
