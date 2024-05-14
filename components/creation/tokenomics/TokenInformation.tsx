import { Box, Button, ButtonGroup, TextField, Grid } from "@mui/material";
import * as React from "react";
import { ICreationData, ITokenomics } from "@lib/creation/Interfaces";
import { CreationContext } from "../../../lib/creation/Context";
import { IData } from "@lib/Interfaces";
import { Header, LearnMore, Subheader } from "../utilities/HeaderComponents";
import { deviceStruct, deviceWrapper } from "@components/utilities/Style";

const NewToken: React.FC<IData<ITokenomics>> = (props) => {
  let data = props.data;
  return (
    <Grid container spacing={2} direction={{ xs: "column", md: "row" }}>
      <Grid item md={6}>
        <TextField
          value={data.tokenName}
          sx={{ width: "100%" }}
          label="Token name"
          onChange={(e) =>
            props.setData({
              ...data,
              tokenName: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item md={3}>
        <TextField
          value={data.tokenTicker}
          sx={{ width: "100%" }}
          label="Token ticker"
          onChange={(e) =>
            props.setData({
              ...data,
              tokenTicker: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item md={3}>
        <TextField
          value={data.tokenAmount === 0 ? "" : data.tokenAmount}
          sx={{ width: "100%" }}
          label="Token amount"
          type="number"
          onChange={(e) =>
            props.setData({
              ...data,
              tokenAmount: e.target.value === "" ? 0 : parseInt(e.target.value),
            })
          }
        />
      </Grid>
    </Grid>
  );
};

const ExistingToken: React.FC<IData<ITokenomics>> = (props) => {
  let data = props.data;
  return (
    <Grid container spacing={2} direction={{ xs: "column", md: "row" }}>
      <Grid item md={12}>
        <TextField
          value={data.tokenId}
          sx={{ width: "100%" }}
          label="Token ID"
          onChange={(e) =>
            props.setData({
              ...data,
              tokenId: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          value={data.tokenName}
          sx={{ width: "100%" }}
          label="Token name"
          onChange={(e) =>
            props.setData({
              ...data,
              tokenName: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          value={data.tokenTicker}
          sx={{ width: "100%" }}
          label="Token ticker"
          onChange={(e) =>
            props.setData({
              ...data,
              tokenTicker: e.target.value,
            })
          }
        />
      </Grid>
    </Grid>
  );
};

const TokenInformation: React.FC<IData<ITokenomics>> = (props) => {
  const [tokenType, setTokenType] = React.useState<string>("existing");
  const creationContext = React.useContext(CreationContext);

  React.useEffect(() => {
    creationContext.api.setData({
      ...creationContext.api.data,
      tokenomics: {
        ...creationContext.api.data.tokenomics,
        type: tokenType,
      },
    });
  }, [tokenType]);

  return (
    <Box>
      <LearnMore
        title="Token information"
        // small
        tooltipTitle="Token Information"
        tooltipText="If using an existing token, double check the token ID using ergo explorer. Once set, this cannot be changed. The token you choose will be the governance token for the DAO you create. "
        // tooltipLink="/here"
      />
      <ButtonGroup
        variant="outlined"
        sx={{ width: "100%", mt: ".5rem", mb: "24px" }}
      >
        <Button
          disabled
          sx={{
            width: "50%",
            fontSize: ".8rem",
            backgroundColor:
              tokenType === "create" ? "primary.selectedButton" : "",
          }}
          onClick={() => setTokenType("create")}
        >
          <Box
            sx={{
              display: deviceStruct("none", "none", "block", "block", "block"),
            }}
          >
            Create a new token
          </Box>
          <Box
            sx={{
              display: deviceStruct("block", "block", "none", "none", "none"),
            }}
          >
            New token
          </Box>
        </Button>
        <Button
          sx={{
            width: "50%",
            fontSize: ".8rem",
            backgroundColor:
              tokenType === "existing" ? "primary.selectedButton" : "",
          }}
          onClick={() => setTokenType("existing")}
        >
          <Box
            sx={{
              display: deviceStruct("none", "none", "block", "block", "block"),
            }}
          >
            Use an existing one
          </Box>
          <Box
            sx={{
              display: deviceStruct("block", "block", "none", "none", "none"),
            }}
          >
            Existing One
          </Box>
        </Button>
      </ButtonGroup>
      {tokenType === "create" ? (
        <NewToken {...props} />
      ) : (
        <ExistingToken {...props} />
      )}
    </Box>
  );
};

export default TokenInformation;
