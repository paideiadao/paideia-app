import AbstractDate from "@components/creation/utilities/AbstractDate";
import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import CancelLink from "@components/utilities/CancelLink";
import { Box, Button, TextField } from "@mui/material";
import * as React from "react";

const BurnForm: React.FC = () => {
  const terminationDate = new Date();
  terminationDate.setDate(terminationDate.getDate() + 60);
  const [data, setData] = React.useState<{
    amount: number;
    terminationDate: Date;
  }>({
    amount: 0,
    terminationDate: terminationDate,
  });
  return (
    <>
      <CapsInfo title="Token Burn Form" />
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <TextField
          label="Amount of tokens to burn"
          sx={{ width: "50%", mr: "1rem" }}
          type="number"
          value={data.amount === undefined ? "" : data.amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, amount: parseFloat(event.target.value) })
          }
        />
        <AbstractDate
          value={data.terminationDate}
          setValue={(newValue: Date) =>
            setData({ ...data, terminationDate: newValue })
          }
          width="50%"
          label="Termination date"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mt: "1.5rem",
        }}
      >
        <CancelLink>
          <Button
            variant="outlined"
            sx={{ width: "50%", mr: "1rem" }}
            size="small"
          >
            Cancel
          </Button>
        </CancelLink>
        <Button variant="contained" sx={{ width: "50%" }} size="small">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default BurnForm;
