import React, { FC, useState } from "react";
import {
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

const AccordionSx = {
  p: "0 0 6px 0",
  minHeight: 0,
  "& .Mui-expanded": {
    m: "0px",
    minHeight: 0,
  },
  "& .MuiAccordionSummary-content": {
    m: "0 0 0 6px",
  },
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
};

interface IAccordionProps {
  title: string;
  children: React.ReactFragment;
  noDivider?: boolean;
}

const FilterAccordionItem: FC<IAccordionProps> = ({
  title,
  children,
  noDivider,
}) => {
  return (
    <>
      <Accordion
        sx={{
          background: "transparent",
          boxShadow: "none",
          "&:before": {
            background: "transparent",
          },
        }}
        disableGutters
      >
        <AccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "14px" }} />}
          aria-controls={`panel-${title.replace(/\s/g, "")}`}
          id={`panel-${title.replace(/\s/g, "")}-header`}
          sx={AccordionSx}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <FormGroup
            sx={{
              "& .MuiFormControlLabel-root .MuiTypography-root": {
                fontSize: "16px",
              },
            }}
          >
            {children}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      {!noDivider && (
        <Divider sx={{ background: "rgba(255,255,255,0.005)", my: "12px" }} />
      )}
    </>
  );
};

interface IFilterProps {}

const FilterOptions: FC<IFilterProps> = ({}) => {
  const totalMembers = [3, 4520];
  const [daoMemberRange, setDaoMemberRange] = useState<number[]>(totalMembers);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setDaoMemberRange(newValue as number[]);
  };

  return (
    <Box
      sx={{
        border: "1px solid #666",
        p: "12px",
      }}
    >
      <Typography sx={{ color: "#bbb" }}>Filters</Typography>
      <Divider sx={{ background: "rgba(255,255,255,0.3)", my: "12px" }} />

      {/* FILTER BY CATEGORY */}
      <FilterAccordionItem title="Categories">
        <Box sx={{ mx: "6px" }}>
          <FormControlLabel
            control={<Checkbox sx={{ p: "6px 9px" }} size="small" />}
            label="Music"
          />
          <FormControlLabel
            control={<Checkbox sx={{ p: "6px 9px" }} size="small" />}
            label="Finance"
          />
          <FormControlLabel
            control={<Checkbox sx={{ p: "6px 9px" }} size="small" />}
            label="Gaming"
          />
        </Box>
      </FilterAccordionItem>

      {/* FILTER BY DAO SIZE */}
      <FilterAccordionItem title="Members">
        <Box sx={{ mx: "12px" }}>
          <Slider
            getAriaLabel={() => "DAO Members"}
            value={daoMemberRange}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={totalMembers[0]}
            max={totalMembers[1]}
          />
        </Box>
      </FilterAccordionItem>

      {/* FILTER BY DATE CREATED */}
      <FilterAccordionItem title="Initiation Date">
        <Box sx={{ mx: "6px" }}>
          <FormControlLabel
            control={<Checkbox sx={{ p: "6px 9px" }} size="small" />}
            label="Past month"
          />
          <FormControlLabel
            control={<Checkbox sx={{ p: "6px 9px" }} size="small" />}
            label="Past year"
          />
          <FormControlLabel
            control={<Checkbox sx={{ p: "6px 9px" }} size="small" />}
            label="All time"
          />
        </Box>
      </FilterAccordionItem>

      {/* FILTER BY GOVERNANCE TYPE */}
      <FilterAccordionItem title="Governance" noDivider>
        <Box sx={{ mx: "6px" }}>
          <FormControlLabel
            control={<Checkbox sx={{ p: "6px 9px" }} size="small" />}
            label="Optimistic"
          />
          <FormControlLabel
            control={<Checkbox sx={{ p: "6px 9px" }} size="small" />}
            label="Standard Quorum"
          />
        </Box>
      </FilterAccordionItem>
    </Box>
  );
};

export default FilterOptions;
