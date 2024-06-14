import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import {
  Box,
  Button,
  Paper,
  InputBase,
  Fab,
  Slide,
  IconButton,
  Grid,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AppsIcon from "@mui/icons-material/Apps";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GavelIcon from "@mui/icons-material/Gavel";
import CodeIcon from "@mui/icons-material/Code";
import ProposalCard, {
  IProposalCard,
} from "@components/dao/proposals/ProposalCard";
import Chip from "@components/utilities/Chip";
import Link from "next/link";
import { useRouter } from "next/router";
import { deviceStruct, deviceWrapper } from "@components/utilities/Style";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MobileFilters from "./MobileFilters";
import Tooltip from "@mui/material/Tooltip";

export interface IFilters {
  search: string;
  proposalStatus: string;
  sortBy: string;
  categories: string[];
}

export const categoriesMap: { [key: string]: any } = {
  all: <AppsIcon />,
  finance: <AttachMoneyIcon />,
  governance: <GavelIcon />,
  technical: <CodeIcon />,
};

interface IProposalListing {
  proposals: any;
  title: string;
}

const ProposalListing: React.FC<IProposalListing> = (props) => {
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const [filters, setFilters] = React.useState<IFilters>({
    search: "",
    proposalStatus: "",
    sortBy: "Most Recent",
    categories: ["All"],
  });

  const [showFilters, setShowFilters] = React.useState<boolean>(false);

  const router = useRouter();
  const { dao } = router.query;

  const categories = (
    props.proposals
      ? [
        "All",
        ...props.proposals
          .map((proposal: { category: string }) => proposal.category)
          .filter(
            (v: string, i: number, x: string[]) => v && x.indexOf(v) === i
          ),
      ]
      : ["All"]
  ).map((category: string) => {
    return {
      icon: categoriesMap[category.toLowerCase()] ?? <StarIcon />,
      label: category,
    };
  });
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box sx={{ width: "100%" }} onClick={() => setShowFilters(false)}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            mb: "1rem",
          }}
        >
          <Header large title={props.title} />
          {globalContext.api?.daoUserData != undefined ? (
            <Link href={dao === undefined ? "" : `/${dao}/create`}>
              <Button
                variant="contained"
                sx={{ ml: "auto" }}
                endIcon={<AddIcon />}
                size="small"
              >
                {!mobile && "Create "}
                New
              </Button>
            </Link>
          ) : (
            <Tooltip
              title="Connect wallet to create proposal"
              arrow
              placement="left"
            >
              <span style={{ marginLeft: "auto" }}>
                <Button
                  variant="contained"
                  sx={{ ml: "auto" }}
                  endIcon={<AddIcon />}
                  size="small"
                  disabled
                >
                  {!mobile && "Create "}
                  New
                </Button>
              </span>
            </Tooltip>
          )}
        </Box>
        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
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
              width: deviceWrapper("100%", "50%"),
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
              placeholder="Search by proposal name, id, or user"
              value={filters.search}
              // @ts-ignore
              onChange={(event: any) =>
                setFilters({ ...filters, search: event.target.value })
              }
            />
          </Paper>
          <FormControl
            sx={{
              width: "25%",
              ml: "1rem",
              display: deviceWrapper("none", "flex"),
            }}
          >
            <InputLabel id="sort-by-select-label">Proposal Status</InputLabel>
            <Select
              labelId="sort-by-select-label"
              id="sort-by-select"
              value={filters.proposalStatus}
              label="Proposal Status"
              onChange={(event: SelectChangeEvent) =>
                setFilters({ ...filters, proposalStatus: event.target.value })
              }
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Passed"}>Passed</MenuItem>
              <MenuItem value={"Failed"}>Failed</MenuItem>
              <MenuItem value={"Discussion"}>Discussion</MenuItem>
              <MenuItem value={"Draft"}>Draft</MenuItem>
            </Select>
          </FormControl>
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
              <MenuItem value="Most Recent">Most recent</MenuItem>
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
                }
                setFilters({
                  ...filters,
                  categories: temp,
                });
              }}
              c={c}
              key={"proposal-filter-chip-key-" + c}
              variant={
                filters.categories.indexOf(i.label) > -1
                  ? "contained"
                  : "outlined"
              }
            />
          ))}
        </Box>
        <Grid container spacing={1} sx={{ mt: "1.5rem" }}>
          {props.proposals === undefined ? (
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
          ) : props.proposals.length === 0 ? (
            <Grid item>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  // mt: "3rem",
                  fontSize: "1.5rem",
                  justifyContent: "center",
                }}
              >
                No Proposals Yet!
              </Box>
            </Grid>
          ) : (
            props.proposals
              .sort((a: any, b: any) =>
                filters.sortBy === ""
                  ? true
                  : filters.sortBy === "Most Recent"
                    ? new Date(b.date).getTime() - new Date(a.date).getTime()
                    : true
              )
              .filter((i: any) => {
                return (
                  (filters.proposalStatus === "" ||
                    filters.proposalStatus === "All"
                    ? true
                    : i.status === filters.proposalStatus ||
                    i.status
                      .toLowerCase()
                      .includes(filters.proposalStatus.toLowerCase())) &&
                  (filters.search === ""
                    ? true
                    : i.name
                      .toLowerCase()
                      .includes(filters.search.toLowerCase())) &&
                  (filters.categories.indexOf("All") > -1
                    ? true
                    : filters.categories.indexOf(i.category) > -1)
                );
              })
              .map((i: any, c: number) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  xl={3}
                  alignItems="stretch"
                  key={"proposal-card-key-" + c + i.id}
                >
                  <ProposalCard
                    {...i}
                    c={c}
                    key={"proposal-card-key-" + c + i.id}
                    width="100%"
                  />
                </Grid>
              ))
          )}
        </Grid>
      </Box>
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
            categories={categories}
          />
        </Box>
      </Slide>
    </>
  );
};

export default ProposalListing;
