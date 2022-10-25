import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  InputAdornment,
  TextField,
} from "@mui/material";
import * as React from "react";
import PaideiaLogo from "@public/dao/bio-image/paideia-logo.png";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { ISideNavComponent } from "./Contents";
import { getTokenUtxos } from "@lib/wallet/Nautilus";
import { useWallet } from "@components/wallet/WalletContext";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { isAddressValid } from "@components/wallet/AddWallet";
import { getUserId } from "@lib/utilities";
import { useDaoSlugs } from "@hooks/useDaoSlugs";

export interface IDao {
  name: string;
  url: string;
  id: number;
  href: string;
  img: string;
  token: string;
  ticker: string;
}

// make dynamic after MVP
const daos: IDao[] = [
  {
    id: 1,
    name: "Paideia",
    url: "app.paideia.im/paideia",
    href: "",
    img: PaideiaLogo.src,
    token: "1fd6e032e8476c4aa54c18c1a308dce83940e8f4a28f576440513ed7326ad489",
    ticker: "Paideia",
  },
  {
    id: 2,
    name: "EGIO",
    url: "app.paideia.im/egio",
    href: "egio",
    img: "https://ergopad-public.s3.us-west-2.amazonaws.com/assets.logo.1666366935479758.png",
    token: "00b1e236b60b95c2c6f8007a9d89bc460fc9e78f98b09faec9449007b40bccf3",
    ticker: 'EGIO'
  },
  // {
  //   id: 2,
  //   name: "Ergo Lend",
  //   url: "paideia.im/dao/ergolend",
  //   href: "ergolend",
  //   img: ErgoLend.src,
  // },
  // {
  //   id: 3,
  //   name: "Ergo Pad",
  //   url: "paideia.im/dao/ergopad",
  //   href: "ergopad",
  //   img: ErgoPad.src,
  // },
  // {
  //   id: 4,
  //   name: "Swamp Audio",
  //   url: "paideia.im/dao/swamp",
  //   href: "swamp",
  //   img: Swamp.src,
  // },
];

const DaoBio: React.FC<ISideNavComponent> = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
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
      <Avatar sx={{ width: "4rem", height: "4rem", mt: ".5rem", mb: ".5rem" }}>
        <img src={daoData.design.logo_url} />
      </Avatar>
      <DaoSelector {...props} />
    </Box>
  ) : null;
};

interface IDaoSelector extends ISideNavComponent {
  redirect?: boolean;
}

export const DaoSelector: React.FC<IDaoSelector> = (props) => {
  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");

  const [id, setId] = React.useState<number>(1);
  // make dynamic after MVP
  const [dao, setDao] = React.useState<IDao>({
    id: 1,
    name: "Paideia",
    url: "paideia.im/dao",
    href: "",
    img: PaideiaLogo.src,
    token: "1fd6e032e8476c4aa54c18c1a308dce83940e8f4a28f576440513ed7326ad489",
    ticker: "Paideia",
  });
  const setDaoWrapper = (dao: IDao) => {
    if (props.setShowMobile !== undefined) {
      props.setShowMobile(false);
    }
    setId(dao.id);
    setDao(dao);
    setDropdown(false);
  };

  const globalContext = React.useContext<IGlobalContext>(GlobalContext);

  const { wallet, utxos, setUtxos, dAppWallet } = useWallet();
  const {daoSlugsObject} = useDaoSlugs()
  console.log(globalContext.api.daoData)

  React.useEffect(() => {
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
            <img src={dao.img} />
          </Avatar>
        )}
        <Box>
          <Box sx={{ fontSize: ".7rem" }}>{dao.name}</Box>
          <Box sx={{ fontSize: ".6rem", color: "text.secondary" }}>
            {dao.url}
          </Box>
        </Box>
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
                    ? daos.filter((i: IDao) => utxos > 0)
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
                {daos.filter((i: IDao) => utxos > 0).length === 0 &&
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
                  daos
                    .filter((i: IDao) =>
                      search === ""
                        ? utxos > 0
                        : i.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((d: any, c: number) => (
                      <DaoSelect
                        data={d}
                        set={(val: IDao) => setDaoWrapper(val)}
                        key={`dao-select-key-${c}`}
                        selected={id === d.id && utxos > 0}
                        inWallet={utxos > 0}
                        redirect={props.redirect}
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
              disabled
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

const DaoSelect: React.FC<IDaoSelect> = (props) => {
  const content = (
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
        onClick={() => props.set(props.data)}
      >
        <Avatar
          src={props.data.img}
          sx={{ width: "1.5rem", height: "1.5rem" }}
        />
        <Box sx={{ fontSize: ".7rem", ml: ".5rem" }}>
          {props.data.name}
          <Box sx={{ fontSize: ".6rem", color: "text.secondary" }}>
            {props.data.url}
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
          You don't have any {props.data.ticker} in your wallet
        </Box>
      )}
    </>
  );
  return props.redirect === undefined ? (
    <Link href={`/${props.data.href}`}>{content}</Link>
  ) : (
    content
  );
};

export default DaoBio;
