import * as React from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import {
  CreationContext,
  ICreationContext,
} from "../../../lib/creation/Context";
import { Header, Subheader } from "../utilities/HeaderComponents";
import TokenInformation from "./TokenInformation";
import TokenSymbol from "./TokenSymbol";
import TokenHolders from "./TokenHolders";
import AdvancedTokenomics from "./AdvancedTokenomics/AdvancedTokenomics";
import TokenDistribution from "./TokenDistribution";
import { ILiquidityInfo } from "./AdvancedTokenomics/Liquidity";
import InfoIcon from "@mui/icons-material/Info";
import {
  percentage,
  percentageToBalance,
} from "../../../lib/creation/Utilities";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { deviceStruct } from "@components/utilities/Style";
import { ITokenHolder, ITokenomics } from "@lib/creation/Interfaces";

const Tokenomics: React.FC = () => {
  const creationContext = React.useContext<ICreationContext>(CreationContext);
  let data = creationContext.api.data.tokenomics;
  const set = (tokenomicsData: ITokenomics) => {
    creationContext.api.setData({
      ...creationContext.api.data,
      tokenomics: {
        ...tokenomicsData,
      },
    });
  };

  let tokenAmount = data.tokenAmount;
  let tokenHolders = data.tokenHolders;
  let distributions = data.distributions;
  let activateTokenomics = data.activateTokenomics;

  React.useEffect(() => {
    set({
      ...creationContext.api.data.tokenomics,
      tokenRemaining:
        tokenAmount -
        (activateTokenomics
          ? 0
          : tokenHolders.length === 0
          ? 0
          : tokenHolders
              .map((i: ITokenHolder) => i.balance)
              .reduce((sum, current) => sum + current, 0)) -
        (distributions.length === 0 || !activateTokenomics
          ? 0
          : distributions
              .filter((i: any) => i !== undefined)
              .filter((i: any) => i.hasOwnProperty("contingency"))
              .map((i: any) => i.contingency.balance)
              .reduce((sum, current) => sum + current, 0)) -
        (distributions.length === 0 || !activateTokenomics
          ? 0
          : distributions
              .filter((i: any) => i !== undefined)
              .map((i: any) => i.balance)
              .reduce((sum, current) => sum + current, 0)),
    });
  }, [tokenHolders, tokenAmount, distributions, activateTokenomics]);

  React.useEffect(() => {
    set({
      ...creationContext.api.data.tokenomics,
      tokenHolders: activateTokenomics
        ? creationContext.api.data.tokenomics.tokenHolders
        : creationContext.api.data.tokenomics.tokenHolders.map(
            (i: ITokenHolder) => {
              return {
                ...i,
                balance: percentageToBalance(tokenAmount, i.percentage / 100),
              };
            }
          ),
      distributions: !activateTokenomics
        ? creationContext.api.data.tokenomics.distributions
        : creationContext.api.data.tokenomics.distributions.map((i: any) => {
            return {
              ...i,
              balance: percentageToBalance(tokenAmount, i.percentage / 100),
            };
          }),
    });
  }, [tokenAmount]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: deviceStruct("93%", "93%", "70%", "70%", "70%"),
      }}
    >
      {data.distributions.length > 0 && data.tokenAmount > 0 && (
        <Box
          sx={{
            position: "sticky",
            backgroundColor:
              data.tokenRemaining === 0
                ? "text.secondarySuccess"
                : data.tokenRemaining < 0
                ? "tokenAlert.main"
                : "primary.main",
            width: deviceStruct(
              "100%",
              "100%",
              "calc(100vw - 15.4rem)",
              "calc(100vw - 15.4rem)",
              "calc(100vw - 15.4rem)"
            ),
            ml: deviceStruct("0", "0", "-21.5%", "-21.5%", "-21.5%"),
            mt: deviceStruct(
              "0",
              "0",
              "-2rem",
              "-2rem",

              "-2rem"
            ),
            top: deviceStruct(
              "0rem",
              "0rem",
              "-2rem",
              "-2rem",

              "-2rem"
            ),
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "secondary.contrastText",
            pt: ".2rem",
            pb: ".2rem",
          }}
        >
          {data.tokenRemaining === 0 ? (
            <CheckCircleIcon sx={{ mr: ".5rem" }} />
          ) : (
            <InfoIcon sx={{ mr: ".5rem" }} />
          )}
          {data.tokenRemaining === 0
            ? "Tokenomics correctly distributed."
            : data.tokenRemaining > 0
            ? `You have a balance of ${data.tokenRemaining} (
          ${percentage(data.tokenRemaining / data.tokenAmount, 0, true)})
          unassigned tokens.`
            : `You are over your balance of assignable tokens +${-data.tokenRemaining} (+${percentage(
                -data.tokenRemaining / data.tokenAmount,
                0,
                true
              )}) tokens`}
        </Box>
      )}
      <Header
        title="Token creation and distribution"
        subtitle="Decide your token name, ticker, and distribution, or bring in an existing token."
      />
      <Box
        sx={{
          borderBottom: data.type === "existing" ? "0" : "1px solid",
          borderBottomColor: "border.main",
          pb: "1rem",
        }}
      >
        <TokenInformation
          data={data}
          setData={(tokenomicsData: ITokenomics) => set(tokenomicsData)}
        />
        <TokenSymbol
          data={data}
          setData={(tokenomicsData: ITokenomics) => set(tokenomicsData)}
        />
      </Box>
      {data.type !== "existing" && (
        <>
          <Box sx={{ mt: "1rem" }}>
            <Header title="Tokenomics" large />
            <ButtonGroup variant="outlined" sx={{ width: "100%", mt: ".5rem" }}>
              <Button
                sx={{
                  width: "50%",
                  fontSize: ".8rem",
                  backgroundColor: !activateTokenomics
                    ? "primary.selectedButton"
                    : "",
                }}
                onClick={() =>
                  set({
                    ...data,
                    activateTokenomics: false,
                  })
                }
              >
                Token Holders
              </Button>
              <Button
                sx={{
                  width: "50%",
                  fontSize: ".8rem",
                  backgroundColor: activateTokenomics
                    ? "primary.selectedButton"
                    : "",
                }}
                onClick={() =>
                  set({
                    ...data,
                    activateTokenomics: true,
                  })
                }
              >
                Advanced
              </Button>
            </ButtonGroup>
          </Box>

          {!activateTokenomics ? (
            <TokenHolders
              data={data}
              setData={(tokenomicsData: ITokenomics) => set(tokenomicsData)}
            />
          ) : (
            <>
              <AdvancedTokenomics
                data={data}
                setData={(tokenomicsData: ITokenomics) => set(tokenomicsData)}
              />
              <TokenDistribution
                data={data}
                setData={(tokenomicsData: ITokenomics) => set(tokenomicsData)}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Tokenomics;
