import { Header } from "@components/creation/utilities/HeaderComponents";
import { deviceWrapper } from "@components/utilities/Style";
import DiscussionContext, {
  IDiscussionContext,
} from "@lib/dao/discussion/DiscussionContext";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";

const GeneralInformation: React.FC = () => {
  const discussionContext =
    React.useContext<IDiscussionContext>(DiscussionContext);
  const value = discussionContext.api?.value;

  return (
    <>
      <Header title="Discussion general information" />
      <Box
        sx={{
          width: "100%",
          mt: "1rem",
          display: "flex",
          alignItems: "center",
          flexWrap: deviceWrapper("wrap", "nowrap"),
        }}
      >
        <TextField
          value={value?.name}
          label="Discussion name"
          onChange={(e: any) =>
            discussionContext.api?.setValue({
              ...value,
              name: e.target.value,
            })
          }
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
          <InputLabel htmlFor={`new-discussion-category-label`}>
            Discussion category
          </InputLabel>
          <Select
            labelId={`new-discussion-category-label`}
            id={`new-discussion-category`}
            variant="outlined"
            label="Discussion category"
            value={value?.category}
            sx={{ height: "100%", color: "text.primary" }}
            onChange={(e: any) =>
              discussionContext.api?.setValue({
                ...value,
                category: e.target.value,
              })
            }
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
