import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState, useContext, FC } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { ISideNavComponent } from "./Contents";
import { useWallet } from "@components/wallet/WalletContext";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { isAddressValid } from "@components/wallet/AddWallet";
import { getObj, getUserId } from "@lib/utilities";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import { useRouter } from "next/router";
import axios from "axios";

export interface IDao {
  dao_name: string;
  dao_url: string;
  id: number;
  logo_url: string;
  token_id: string;
  token_ticker: string;
  member_count: number;
  proposal_count: number;
}

const DaoBio: FC<ISideNavComponent> = (props) => {
  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const daoData = globalContext.api.daoData;
  return daoData ? (
    <Box
      sx={{
        width: "100%",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid",
        borderBottomColor: "border.main",
        flexDirection: "column",
        p: ".75rem",
        pt: "0rem",
        zIndex: 100,
      }}
    >
      {daoData.design &&
        <Avatar sx={{ width: "4rem", height: "4rem", mt: ".5rem", mb: ".5rem" }}>
          <img src={daoData.design.logo_url} />
        </Avatar>
      }
      <DaoSelector {...props} />
    </Box>
  ) : null;
};

interface IDaoSelector extends ISideNavComponent {
  redirect?: boolean;
}

export const DaoSelector: FC<IDaoSelector> = (props) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const { dao } = router.query;
  const [id, setId] = useState<number>(1);
  const [selectedDao, setSelectedDao] = useState<IDao>(undefined);
  const setDaoWrapper = (dao: IDao) => {
    if (props.setShowMobile !== undefined) {
      props.setShowMobile(false);
    }
    setId(dao.id);
    setSelectedDao(dao);
    setDropdown(false);
  };

  const { daoSlugs, daoSlugsObject } = useDaoSlugs();

  useEffect(() => {
    if (router.isReady && dao != undefined) {
      
      setSelectedDao(getObj(daoSlugs ?? [], "dao_url", dao));
    }
  }, [router.isReady]);

  const globalContext = useContext<IGlobalContext>(GlobalContext);
  useEffect(() => {
    let isMounted = true;
    if (dao != undefined && daoSlugsObject[dao.toString()] != undefined) {
      const url = `${process.env.API_URL}/dao/${
        daoSlugsObject[dao.toString()]
      }`;
      axios
        .get(url)
        .then((res) => {
          if (isMounted) globalContext.api.setDaoData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => { isMounted = false };
  }, [dao]);

  const { wallet, utxos, setUtxos, dAppWallet } = useWallet();

  useEffect(() => {
    const load = async () => {
      try {
        if (dAppWallet.connected) {
          if (dAppWallet.addresses.length > 0) {
            let res = await globalContext.api.paideiaTokenCheck(
              dAppWallet.addresses.map((i: any) => i.name)
            );
            if (res.data.totalTokens > 0) {
              await globalContext.api.getOrCreateDaoUser();
            }
            setUtxos(res.data.totalTokens);
          }
        } else if (getUserId()) {
          if (isAddressValid(wallet)) {
            let res = await globalContext.api.paideiaTokenCheck([wallet]);
            if (res.data.totalTokens > 0) {
              globalContext.api.getOrCreateDaoUser();
            }
            setUtxos(res.data.totalTokens);
          }
        } else {
          setUtxos(0);
        }
      } catch (e) {
        console.log(e);
        setUtxos(0);
      }
    };

    load();
  }, [wallet, dAppWallet, globalContext.api.daoData]);


  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          p: ".4rem",
          pt: ".2rem",
          pb: ".2rem",
          backgroundColor: "fileInput.main",
          borderRadius: ".3rem",
          display: "flex",
          alignItems: "center",
          border: "1px solid",
          borderColor: "border.main",
          cursor: "pointer",
        }}
        onClick={() => setDropdown(true)}
      >
        {selectedDao ? (
          <>
            {props.redirect === false && (
              <Avatar
                sx={{
                  width: "2rem",
                  height: "2rem",
                  mt: ".5rem",
                  mb: ".5rem",
                  mr: ".5rem",
                  backgroundColor: "transparent",
                }}
              >
                <img src={selectedDao.logo_url} />
              </Avatar>
            )}
            <Box>
              <Box sx={{ fontSize: ".7rem" }}>{selectedDao.dao_name}</Box>
              <Box sx={{ fontSize: ".6rem", color: "text.secondary" }}>
                app.paideia.im/{selectedDao.dao_url}
              </Box>
            </Box>
          </>
        ) : (
          <Typography sx={{ fontSize: ".6rem", color: "text.secondary" }}>Choose a DAO</Typography>
        )}
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardArrowUpIcon
            sx={{ mb: "-.3rem", opacity: ".8", fontSize: "1.2rem" }}
          />
          <KeyboardArrowDownIcon
            sx={{ mt: "-.3rem", opacity: ".8", fontSize: "1.2rem" }}
          />
        </Box>

      </Box>

      {dropdown && (
        <ClickAwayListener onClickAway={() => setDropdown(false)}>
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              backgroundColor: "fileInput.main",
              // bottom: "-7rem",
              top: "0rem",
              display: "flex",
              alignItems: "flex-start",
              zIndex: 100,
              borderRadius: ".25rem",
              flexDirection: "column",
              p: ".5rem",
              pb: 0,
              pl: "0",
              pr: "0",
              border: "1px solid",
              borderColor: "border.main",
            }}
          >
            <Box
              sx={{
                width: "100%",
                pb: ".5rem",
                borderBottom: "1px solid",
                borderColor: "border.main",
                mb: ".5rem",
                pl: ".5rem",
                pr: ".5rem",
              }}
            >
              <TextField
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                size="small"
                placeholder="Search by name or url"
                InputProps={{
                  sx: { fontSize: ".7rem" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon color="primary" sx={{ fontSize: "1rem" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "100%" }}
              />
            </Box>
            <Box sx={{ pl: ".5rem" }}>
              <CapsInfo
                title={
                  search === ""
                    ? daoSlugs.filter((i: IDao) => utxos > 0)
                      ? "Daos Connected to your wallet"
                      : "Daos Connected to your wallet"
                    : "Search Results"
                }
                fontSize=".6rem"
                mb=".25rem"
              />
            </Box>
            <>
              <Box
                sx={{
                  width: "100%",
                  pl: ".5rem",
                  pr: ".5rem",
                  overflowY: "auto",
                  maxHeight: "15rem",
                }}
              >
                {daoSlugs.filter((i: IDao) => utxos > 0).length === 0 &&
                  search === "" ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      fontSize: ".8rem",
                      width: "100%",
                    }}
                  >
                    No dao tokens in your wallet
                  </Box>
                ) : (
                  daoSlugs
                    .filter((i: IDao) =>
                      search === ""
                        ? utxos > 0
                        : i.dao_name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((d: any, c: number) => (
                      <DaoSelect
                        data={d}
                        set={(val: IDao) => setDaoWrapper(val)}
                        key={`dao-select-key-${c}`}
                        selected={id === d.id && utxos > 0}
                        inWallet={utxos > 0}
                        // redirect={props.redirect}
                      />
                    ))
                )}{" "}
              </Box>
            </>

            <Button
              size="small"
              sx={{
                fontSize: ".7rem",
                width: "100%",
                mt: ".5rem",
                borderTop: 1,
                borderColor: "border.main",
                borderRadius: 0,
              }}
              href="/"
            >
              View complete dao list
            </Button>
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
};

interface IDaoSelect extends IDaoSelector {
  set: Function;
  selected: boolean;
  data: IDao;
  inWallet: boolean;
}

const DaoSelect: FC<IDaoSelect> = (props) => {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          pl: ".5rem",
          pt: ".25rem",
          pb: ".25rem",
          mb: ".5rem",
          width: "100%",
          cursor: "pointer",
          borderRadius: ".3rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: props.selected
            ? "primary.lightOpacity"
            : "fileInput.main",
          pr: ".25rem",
        }}
        onClick={() => {
          props.set(props.data)
          router.push('/' + props.data.dao_url)
        }}
      >
        <Avatar
          src={props.data.logo_url}
          sx={{ width: "1.5rem", height: "1.5rem" }}
        />
        <Box sx={{ fontSize: ".7rem", ml: ".5rem" }}>
          {props.data.dao_name}
          <Box sx={{ fontSize: ".6rem", color: "text.secondary" }}>
            app.paideia.im/{props.data.dao_url}
          </Box>
        </Box>
        {props.selected && (
          <Box sx={{ ml: "auto" }}>
            <CheckIcon sx={{ fontSize: "1rem" }} color="primary" />
          </Box>
        )}
      </Box>
      {!props.inWallet && (
        <Box sx={{ fontSize: ".57rem", color: "error.main" }}>
          You don't have any {props.data.token_ticker} in your wallet
        </Box>
      )}
    </>
  )
};

export default DaoBio;
