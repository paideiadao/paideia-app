import { TextField } from "@mui/material";
import * as React from "react";
import { IDaoDescription } from "../../YesNo/Actions/DaoDescription";

interface IwDaoDescription extends IDaoDescription {
  set: (val: string) => void;
}

const DaoDescription: React.FC<IwDaoDescription> = (props) => {
  return (
    <TextField
      label="DAO Short Description"
      inputProps={{
        maxLength: 250,
      }}
      multiline
      value={props.shortDescription}
      onChange={(e) => props.set(e.target.value)}
      rows={5}
      sx={{ width: "100%" }}
      FormHelperTextProps={{ sx: { textAlign: "right" } }}
      helperText={`${props.shortDescription.length}/250`}
    />
  );
};

export default DaoDescription;
