import {
  Header,
  LearnMore,
} from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import * as React from "react";

const GeneralInformation: React.FC = () => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const handleChange = (event: SelectChangeEvent) => {
    context.api.setValue({
      ...context.api.value,
      category: event.target.value,
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    context.api.setValue({
      ...context.api.value,
      name: event.target.value,
    });
  };
  return (
    <>
      <Header title="Proposal General Information" />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "1rem",
          flexWrap: deviceWrapper("wrap", "nowrap"),
        }}
      >
        <TextField
          value={context.api.value.name}
          label="Proposal name"
          onChange={handleNameChange}
          sx={{
            width: deviceWrapper("100%", "50%"),
            mr: deviceWrapper("0", "1rem"),
          }}
        />
        <FormControl
          sx={{
            width: deviceWrapper("100%", "50%"),
            mt: deviceWrapper("1rem", "0"),
          }}
        >
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={context.api.value.category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="New Feature">New Feature</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Governance">Governance</MenuItem>
            <MenuItem value="Technical">Technical</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default GeneralInformation;
