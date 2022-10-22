import { Box } from "@mui/material";
import Button from "@mui/material/Button";

export default function Help() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ fontSize: ".8rem", fontWeight: 450 }}>Need help?</Box>
      <Box
        sx={{
          fontSize: ".7rem",
          fontWeight: 400,
          mb: 2,
          color: "text.secondary",
        }}
      >
        Learn more about DAOs
      </Box>
      <Button
        variant="contained"
        sx={{
          fontWeight: 450,
          backgroundColor: "circle.main",
          color: "backgroundColor.main",
        }}
      >
        Check FAQs
      </Button>
    </Box>
  );
}
