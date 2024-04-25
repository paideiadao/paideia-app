import * as React from "react";
import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import Chip from "@components/utilities/Chip";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IThemeContext, ThemeContext } from "@lib/ThemeContext";
import { DarkTheme } from "@theme/theme";
import { categories, IFilters, marks } from "@pages/[dao]/members/index";

interface IMobileFilters {
  filters: IFilters;
  set: (filters: IFilters, val: number[]) => void;
  close: () => void;
}

const MobileFilters: React.FC<IMobileFilters> = (props) => {
  const [filters, setFilters] = React.useState<IFilters>(props.filters);
  const themeContext = React.useContext<IThemeContext>(ThemeContext);
  const [value, setValue] = React.useState<number[]>([1, 10]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Box
        sx={{
          height: "5rem",
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "flex-end",
          color: "backgroundColor.main",
          pl: ".5rem",
          pb: ".5rem",
        }}
      >
        Filters
        <IconButton
          sx={{
            ml: "auto",
            color: themeContext.theme === DarkTheme ? "black" : "white",
          }}
          size="small"
          onClick={props.close}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: "100%", mt: ".5rem", ml: ".5rem" }}>
        <CapsInfo title="Categories" mb="0" />
        <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
          {categories.map((i: any, c: number) => (
            <Chip
              {...i}
              mt=".5rem"
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
        <Box sx={{ mt: "1rem" }} />
        <CapsInfo title="Other Filters" mb="0" />
        <Slider
          step={1}
          value={value}
          valueLabelDisplay="auto"
          marks={marks}
          min={1}
          max={10}
          sx={{ width: "75%", ml: "1.5rem", mb: "1.5rem" }}
          onChange={handleChange}
        />
        <FormControl
          sx={{
            width: "94%",
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
          position: "absolute",
          bottom: "1rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          p: ".5rem",
        }}
      >
        <Button
          sx={{ width: "50%", mr: ".5rem" }}
          size="small"
          variant="outlined"
          onClick={props.close}
        >
          Cancel
        </Button>
        <Button
          sx={{ width: "50%" }}
          size="small"
          variant="contained"
          onClick={() => {
            props.set(filters, value);
            props.close();
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default MobileFilters;
