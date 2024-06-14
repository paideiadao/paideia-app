import React, { FC, memo } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import { SxProps } from "@mui/material";
import Image from "next/image";

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

interface IArticle {
  name: string;
  image?: string;
  description: string;
  link: string;
  category?: string;
}

interface IArticleCard {
  article: IArticle;
}

interface IArticleListProps {
  articles: IArticle[];
  sx?: SxProps;
}

const ArticleCard: FC<IArticleCard> = ({ article }) => {
  const randomInteger = (min: number, max: number) => {
    return (min + Math.random() * (max - min)).toFixed();
  };
  // const rand = randomInteger(1, 18);
  const rand = 1;
  const router = useRouter();

  return (
    <Card
      sx={{
        height: "100%",
        background: "#111827",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "16px",
      }}
    >
      <CardActionArea
        sx={{ height: "100%", verticalAlign: "top" }}
        onClick={() => router.push(`/blog/${article?.link}`)}
      >
        <CardContent sx={{ padding: 0, minHeight: "357px", height: "100%" }}>
          <Box
            sx={{
              display: "block",
              position: "relative",
              height: "188px",
              overflow: "hidden",
            }}
          >
            {article?.image ? (
              <Image
                src={article.image}
                alt={article.name}
                layout="fill"
                sizes="30vw"
                objectFit="cover"
              // height={188}
              />
            ) : (
              <Image
                src={`/images/placeholder/${rand}.jpg`}
                alt={article.name}
                layout="fill"
                sizes="30vw"
                objectFit="cover"
              // height={188}
              />
            )}
            {article?.category && (
              <Chip
                icon={<StarIcon sx={{ fontSize: 16 }} />}
                label={article.category}
                size="small"
                sx={{
                  color: "#9FD2DB",
                  background: "rgba(17,24,39,0.7)",
                  fontSize: "14px",
                  border: "1px solid #9FD2DB",
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                }}
              />
            )}
          </Box>
          <Box sx={{ p: "24px" }}>
            <Typography
              sx={{
                fontWeight: "700",
                lineHeight: "32px",
                mb: "24px",
                color: "#fff",
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: "24px",
                letterSpacing: "0.225543px",
              }}
            >
              {article.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                mb: "24px",
              }}
            >
              {article.description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ArticleCardMemo = memo(ArticleCard);

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
        {/* <FilterChips /> */}
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

const ArticleList: FC<IArticleListProps> = ({ articles, sx }) => {
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

  const theme = useTheme();

  return (
    <Box>
      {useMediaQuery(theme.breakpoints.up("lg")) ? (
        <Grid container sx={{ mb: "32px" }} spacing={3}>
          <Grid item md={7}>
            <SearchBar />
          </Grid>
          <Grid item md={5}>
            <SortBy />
          </Grid>
        </Grid>
      ) : (
        // <FilterChips />
        <Grid container sx={{ mb: "32px" }} spacing={3} direction="row">
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
      )}
      <Grid
        container
        spacing={4}
        columns={{ xs: 1, sm: 2, sm3: 3, md: 3, md2: 4, lg: 3 }}
        sx={{ mb: "24px" }}
        alignItems="stretch"
      >
        {articles.map((article, i) => (
          <Grid key={i} item xs={1}>
            <ArticleCardMemo article={article} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Button disabled variant="contained">
          Load more...
        </Button>
      </Box>
    </Box>
  );
};

export default ArticleList;
