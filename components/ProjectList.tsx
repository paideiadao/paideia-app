import React, { FC } from "react";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DarkTheme } from "@theme/theme";
import SearchIcon from "@mui/icons-material/Search";
import FilterOptions from "@components/FilterOptions";
import { SxProps } from "@mui/material";

interface IDaosProps {
  dao_name: string;
  logo_url?: string;
  dao_short_description?: string;
  dao_url: string;
  category?: string;
}

interface IDaoCard {
  dao: IDaosProps;
}

const DaoCard: FC<IDaoCard> = ({ dao }) => {
  return (
    <Box
      sx={{
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".3rem",
        width: "100%",
        height: '100%',
        ":hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Grid
        container
        sx={{ height: "100%", p: "24px" }}
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item sx={{ textAlign: "left" }}>
          {dao?.category && (
            <Box
              sx={{
                position: "absolute",
                top: "-4px",
                right: "-6px",
                fontSize: "12px",
              }}
            >
              <Chip
                icon={<StarIcon sx={{ fontSize: 16 }} />}
                label={dao.category}
                size="small"
                sx={{
                  color: "#bbb",
                  background: "#111827",
                  fontSize: "14px",
                  mb: "24px",
                  border: "1px solid #999",
                }}
              />
            </Box>
          )}
          <Avatar
            src={dao?.logo_url}
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              mb: "12px",
              border: "1px solid #000",
              boxShadow: "0 0 0 2px #666",
            }}
            alt={dao.dao_name}
          />
          <Typography
            sx={{
              fontWeight: "700",
              lineHeight: "42px",
              mb: "24px",
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: "34px",
              letterSpacing: "0.225543px",
            }}
          >
            {dao.dao_name}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              mb: "24px",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': '4',
              '-webkit-box-orient': 'vertical'
            }}
          >
            {dao.dao_short_description}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            endIcon={<ArrowForwardIcon />}
            href={dao.dao_url}
            sx={{ py: "2px", ml: "-6px" }}
          >
            View DAO
          </Button>
        </Grid>
      </Grid>
    </Box >
  );
};

interface ISortByProps {
  sx?: SxProps;
}

const SortBy: FC<ISortByProps> = ({ sx }) => {
  const [sortOption, setSortOption] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as string);
  };

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id="sort-select-box-input">Sort By</InputLabel>
      <Select
        labelId="sort-select-box-label"
        id="sort-select-box"
        value={sortOption}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"oldest"}>Oldest</MenuItem>
        <MenuItem value={"newest"}>Newest</MenuItem>
        <MenuItem value={"most members"}>Most Members</MenuItem>
        <MenuItem value={"least members"}>Least Members</MenuItem>
      </Select>
    </FormControl>
  );
};

interface ISearchBar {
  sx?: SxProps;
}

const SearchBar: FC<ISearchBar> = ({ sx }) => {
  return (
    <FormControl fullWidth variant="outlined" sx={sx}>
      <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
      <OutlinedInput
        id="outlined-adornment-search"
        endAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        label="Search"
      />
    </FormControl>
  );
};

interface IProjectListProps {
  daos: IDaosProps[];
  sx?: SxProps;
}

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          background: "rgb(14, 20, 33)",
          width: "100%",
          maxWidth: "400px",
          maxHeight: "80vh",
        },
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Filter &amp; Sort</DialogTitle>
      <DialogContent dividers>
        <SortBy sx={{ mb: "24px" }} />
        <FilterOptions />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

const ProjectList: FC<IProjectListProps> = ({ daos, sx }) => {
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
  const [filterDialogvalue, setFilterDialogValue] = React.useState("Dione");

  const handleDialogClick = () => {
    setFilterDialogOpen(true);
  };

  const handleDialogClose = (newValue?: string) => {
    setFilterDialogOpen(false);

    if (newValue) {
      setFilterDialogValue(newValue);
    }
  };

  return (
    <>
      <Grid container sx={{ mt: "0", mb: '24px' }} spacing={3} direction="row">
        <Grid item xs>
          <SearchBar />
        </Grid>
        <Grid item xs="auto">
          <Button
            sx={{ height: "100%" }}
            variant="outlined"
            aria-label="filter"
            onClick={handleDialogClick}
          >
            <FilterAltIcon />
          </Button>
          <ConfirmationDialogRaw
            id="ringtone-menu"
            keepMounted
            open={filterDialogOpen}
            onClose={handleDialogClose}
            value={filterDialogvalue}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        columns={{ xs: 1, sm: 2, sm3: 3, md: 3, md2: 4, lg: 3 }}
        sx={{ mb: "24px" }}
      >
        {daos.map((dao, i) => (
          <Grid key={i} item xs={1} sx={{ textAlign: "center" }}>
            <DaoCard dao={dao} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Button disabled variant="contained">Load more...</Button>
      </Box>
    </>
  );
};

export default ProjectList;
