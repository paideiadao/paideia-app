import { Box, Button } from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import dateFormat from "dateformat";
import { deviceWrapper } from "@components/utilities/Style";

export interface IRecurringCard {
  username: string;
  address: string;
  proposalName: string;
  proposalUsername: string;
  paymentSig: number;
  paymentErg: number;
  id: number;
  frequency: string;
  startDate: Date;
}

const RecurringCard: React.FC<IRecurringCard> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: deviceWrapper("column", "row"),
        alignItems: deviceWrapper("flex-start", "center"),
        width: "100%",
        pl: ".5rem",
        border: 1,
        borderColor: "border.main",
        mb: "1rem",
        borderRadius: ".4rem",
        pt: ".5rem",
        pb: ".5rem",
        pr: ".5rem",
        fontSize: {
          xs: ".8rem",
          sm: ".8rem",
          md: ".9rem",
          lg: ".9rem",
          xl: "1rem",
        },
        ":hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Box sx={{ width: deviceWrapper("100%", "35%") }}>
        Paid to: {props.username}
        <Box
          sx={{
            fontSize: deviceWrapper(".7rem", ".8rem"),
            color: "text.secondary",
          }}
        >
          {props.address.slice(0, 13) + "..." + props.address.slice(-13)}
        </Box>
      </Box>
      <Box sx={{ width: deviceWrapper("100%", "18%") }}>
        {props.proposalName}
        <Box
          sx={{
            fontSize: deviceWrapper(".7rem", ".8rem"),
            color: "text.secondary",
          }}
        >
          By: {props.proposalUsername}
        </Box>
      </Box>
      <Box
        sx={{
          width: deviceWrapper("100%", "20%"),
          display: deviceWrapper("flex", "block"),
        }}
      >
        <Box>
          {props.frequency}
          <Box
            sx={{
              fontSize: deviceWrapper(".7rem", ".8rem"),
              color: "text.secondary",
            }}
          >
            {dateFormat(props.startDate, "mm/dd/yyyy HH:MM")}
          </Box>
        </Box>

        <Box
          sx={{
            ml: "auto",
            textAlign: "right",
            display: deviceWrapper("block", "none"),
          }}
        >
          ${props.paymentSig}
          <Box
            sx={{
              fontSize: deviceWrapper(".7rem", ".8rem"),
              color: "text.secondary",
            }}
          >
            {props.paymentErg}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "12%", display: deviceWrapper("none", "block") }}>
        ${props.paymentSig}
        <Box
          sx={{
            fontSize: deviceWrapper(".7rem", ".8rem"),
            color: "text.secondary",
          }}
        >
          {props.paymentErg}
        </Box>
      </Box>
      <Box
        sx={{
          width: "calc(100% + 1rem)",
          display: deviceWrapper("flex", "none"),
          alignItems: "center",
          justifyContent: "center",
          mb: "-.5rem",
          borderTop: 1,
          borderTopColor: "border.main",
          ml: "-.5rem",
          mt: ".5rem",
        }}
      >
        <Button
          endIcon={<DeleteIcon />}
          variant="text"
          color="error"
          size="small"
          sx={{
            width: "100%",
            borderTopRightRadius: "0",
            borderTopLeftRadius: 0,
          }}
        >
          Cancel
        </Button>
      </Box>
      <Button
        endIcon={<DeleteIcon />}
        variant="text"
        sx={{
          ml: "auto",
          display: deviceWrapper("none", "flex"),
          color: "error.light",
        }}
        size="small"
      >
        Cancel
      </Button>
    </Box>
  );
};

export default RecurringCard;
