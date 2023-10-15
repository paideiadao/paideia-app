import { Box, InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import { ITokenomics } from "@lib/creation/Interfaces";
import { IData } from "@lib/Interfaces";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Treasury from "./Treasury";
import CancelIcon from "@mui/icons-material/Cancel";
import { Header } from "../../utilities/HeaderComponents";
import TeamPartners from "./TeamPartners";
import PrivateRound from "./PrivateRound";
import PublicRound from "./PublicRound";
import Airdrop from "./Airdrop";
import Liquidity from "./Liquidity";
import Staking from "./Staking";

const renderDisplay = (
  display: string,
  props: {
    data: IData<ITokenomics>;
    close: Function;
    c: number;
  }
) => {
  switch (display) {
    case "Treasury":
      return <Treasury {...props} />;
    case "Team & Partners":
      return <TeamPartners {...props} />;
    case "Private Round":
      return <PrivateRound {...props} />;
    case "Public Round":
      return <PublicRound {...props} />;
    case "Airdrop":
      return <Airdrop {...props} />;
    case "Liquidity":
      return <Liquidity {...props} />;
    case "Staking":
      return <Staking {...props} />;
  }
};

const AddDistribution: React.FC<{
  data: IData<ITokenomics>;
  close: Function;
  c: number;
  distribution: any;
}> = (props) => {
  const [distribution, setDistribution] = React.useState<any>(
    props.distribution
  );

  const distributionTypes = [
    { label: "Treasury" },
    { label: "Team & Partners" },
    { label: "Private Round" },
    { label: "Public Round" },
    { label: "Airdrop" },
    { label: "Liquidity" },
    { label: "Staking" },
  ];

  React.useEffect(() => {
    setDistribution(props.distribution);
  }, [props.distribution]);

  return (
    <Box
      sx={{
        borderRadius: ".3rem",
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        display: "flex",
        flexWrap: "wrap",
        mt: ".5rem",
        mb: ".5rem",
        width: "100%",
        position: "relative",
        justifyContent: "center",
      }}
    >
      {distribution === undefined ? (
        <>
          <CancelIcon
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              cursor: "pointer",
            }}
            color="error"
            onClick={() => props.close()}
          />
          <Box
            sx={{
              width: "100%",
              borderBottom: "1px solid",
              borderColor: "border.main",
              mb: "1rem",
              pl: "1rem",
            }}
          >
            <Header
              title="Add Distribution"
              subtitle="Select what type of distribution you want to add from the list below."
            />
          </Box>
          <Box sx={{ pl: "1rem", pr: "1rem" }}>
            {distributionTypes.map((type, index) => {
              return (
                <TextField
                  key={`${type.label}-${index}`}
                  value={type.label}
                  sx={{
                    width: "32.33%",
                    mr: "1%",
                    mb: ".5rem",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  InputProps={{
                    style: { cursor: "pointer" },
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() =>
                          setDistribution({ ...distribution, id: type.label })
                        }
                      >
                        <NavigateNextIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              );
            })}
          </Box>
        </>
      ) : (
        renderDisplay(distribution.id, props)
      )}
    </Box>
  );
};

export default AddDistribution;
