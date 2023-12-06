import React, { useEffect, useState, useContext, FC } from "react";
import { Header } from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import {
  Box,
  Fab,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slide,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@components/utilities/Chip";
import AppsIcon from "@mui/icons-material/Apps";
import StarIcon from "@mui/icons-material/Star";
import Activity, { IActivity } from "@components/dao/activity/Activity";
import Musk from "@public/profile/musk-full.png";
import PaideiaLogo from "@public/dao/bio-image/paideia-logo.png";
import { paths, props } from "@lib/DaoPaths";
import { deviceWrapper } from "@components/utilities/Style";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MobileFilters from "@components/dao/activity/MobileFilters";
import { useRouter } from "next/router";
import useSWR from "swr";
import useDidMountEffect from "@components/utilities/hooks";
import { fetcher } from "@lib/utilities";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import { useDaoSlugs } from "@hooks/useDaoSlugs";
import axios from "axios";

// export const getStaticPaths = paths;
// export const getStaticProps = props;

export const categories = [
  { icon: <AppsIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />, label: "All" },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Comments",
  },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Proposals",
  },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Transactions",
  },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Staking",
  },
];

let temp = new Date();
temp.setDate(temp.getDate() - 4);

export interface IFilters {
  sortBy: string;
  search: string;
  categories: string[];
}

const Activities: FC = () => {
  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const [filters, setFilters] = useState<IFilters>({
    search: "",
    sortBy: "Newest",
    categories: ["All"],
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const router = useRouter();
  const { dao } = router.query;
  const { daoSlugsObject } = useDaoSlugs();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (dao != undefined && daoSlugsObject[dao.toString()] != undefined) {
      const url = `${process.env.API_URL}/activities/by_dao_id/${
        daoSlugsObject[dao.toString()]
      }`;
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          globalContext.api.showAlert("Error fetching activities.", "error");
        });
    }
  }, [dao]);

  return (
    <Layout width="95%">
      <Header title="Activity Log" large />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: "1rem",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "backgroundColor.main",
            border: "1px solid",
            borderColor: "border.main",
            p: ".65rem",
            borderRadius: "5rem",
            display: "flex",
            alignItems: "center",
            ":hover": {
              borderColor: "primary.main",
            },
            width: deviceWrapper("100%", "75%"),
          }}
        >
          <Box
            sx={{
              width: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon sx={{ opacity: ".6", fontSize: "1.2rem" }} />
          </Box>
          <InputBase
            sx={{
              ml: ".5rem",
              fontSize: ".9rem",
              color: "text.primary",
              width: "100%",
            }}
            placeholder="Search by keyword or user"
            value={filters.search}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setFilters({ ...filters, search: event.target.value })}
          />
        </Paper>
        <FormControl
          sx={{
            width: "25%",
            ml: "1rem",
            display: deviceWrapper("none", "flex"),
          }}
        >
          <InputLabel id="sort-by-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-select-label"
            id="sort-by-select"
            value={filters.sortBy}
            label="Sort by"
            onChange={(event: SelectChangeEvent) =>
              setFilters({ ...filters, sortBy: event.target.value })
            }
          >
            <MenuItem value={"Newest"}>Newest</MenuItem>
            <MenuItem value={"Oldest"}>Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "-webkit-box",
          alignItems: "center",
          pt: ".75rem",
          overflowX: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {categories.map((i: any, c: number) => (
          <Chip
            {...i}
            set={() => {
              let temp = [...filters.categories];
              let allIndex = temp.indexOf("All");
              let index = temp.indexOf(i.label);
              if (index > -1) {
                temp.splice(index, 1);
              } else {
                if (i.label === "All") {
                  temp = ["All"];
                } else if (i.label !== "All" && allIndex > -1) {
                  temp.splice(allIndex, 1);
                  temp.push(i.label);
                } else {
                  temp.push(i.label);
                }
              }

              setFilters({
                ...filters,
                categories: temp,
              });
            }}
            c={c}
            key={"activity-filter-chip-key-" + c}
            variant={
              filters.categories.indexOf(i.label) > -1
                ? "contained"
                : "outlined"
            }
          />
        ))}
      </Box>
      {data != undefined ? (
        data
          .filter((i: IActivity) => {
            return (
              (filters.categories.indexOf("All") > -1
                ? true
                : filters.categories.indexOf(i.category) > -1) &&
              (i.name.toLowerCase().includes(filters.search) ||
                filters.search === "" ||
                i.action.toLowerCase().includes(filters.search) ||
                i.value.toLowerCase().includes(filters.search))
            );
          })
          .sort((a: IActivity, b: IActivity) =>
            filters.sortBy === "Oldest"
              ? //@ts-ignore
                new Date(a.date) - new Date(b.date)
              : //@ts-ignore
                b.date - a.date
          )
          .map((i: any, c: number) => {
            return <Activity i={i} c={c} key={c} />;
          })
      ) : (
        <>Loading Here...</>
      )}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          display: deviceWrapper("flex", "none"),
          zIndex: 999,
        }}
        onClick={() => setShowFilters(true)}
      >
        <FilterAltIcon />
      </Fab>
      <Slide direction="left" in={showFilters} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: "17rem",
            zIndex: 1000,
            backgroundColor: "backgroundColor.main",
            borderRight: "1px solid",
            color: "text.primary",
            borderLeft: "1px solid",
            height: "100vh",
            borderColor: "border.main",
            position: "fixed",
            top: 0,
            right: 0,
          }}
        >
          <MobileFilters
            close={() => setShowFilters(false)}
            set={(val: IFilters) => setFilters(val)}
            filters={filters}
          />
        </Box>
      </Slide>
    </Layout>
  );
};

export default Activities;
