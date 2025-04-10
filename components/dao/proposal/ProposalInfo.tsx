import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import {
  Box,
  Skeleton,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import {
  IAction,
  IProposalAction,
  Output,
  Token,
} from "@pages/[dao]/proposal/create";
import axios from "axios";
import MarkdownRender from "@lib/MarkdownRender";

interface ProposalInfoProps {
  content: string;
  actions: IProposalAction[];
}

type TokenDetails = { tokenId: string; amount: number };

type AssetInfo = {
  name: string;
  description: string;
  decimals: number;
  minted: number;
  token_type: string;
  token_meta_data: any;
};

const NERGS = 1000 * 1000 * 1000;

const tokenInfo = async (tokenId: string): Promise<AssetInfo> => {
  try {
    const response = await axios.get(
      `https://api.cruxfinance.io/crux/asset_info/${tokenId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const adjustAmount = (amount: number, decimals: number): number => {
  return amount / Math.pow(10, decimals);
};

const ProposalInfo: React.FC<ProposalInfoProps> = ({ content, actions }) => {
  const [tokenAmounts, setTokenAmounts] = React.useState<{
    [key: string]: string;
  }>({});
  const [tokenInfos, setTokenInfos] = React.useState<
    Record<string, AssetInfo | null>
  >({});
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    const fetchAllTokenDescriptions = async () => {
      const amounts: { [key: string]: string } = {};
      const infos: Record<string, AssetInfo | null> = {};
      if (!actions) return;
      for (const [i_action, action] of actions.entries()) {
        for (const [i_output, output] of action.action?.outputs.entries() ?? []) {
          if (output.tokens) {
            for (const tokenArray of output.tokens) {
              const tokenDetails = generateTokenDetails(tokenArray);
              if (tokenDetails) {
                const assetInfo = await fetchAssetInfo(tokenDetails);
                infos[tokenDetails.tokenId] = assetInfo;

                if (assetInfo) {
                  amounts[i_action + i_output + tokenDetails.tokenId] = adjustAmount(
                    tokenDetails.amount,
                    assetInfo.decimals
                  ).toString();
                } else {
                  amounts[i_action + i_output + tokenDetails.tokenId] =
                    tokenDetails.amount.toString(); // Without decimals
                }
              }
            }
          }
        }
      }
      setTokenAmounts(amounts);
      setTokenInfos(infos);
    };

    fetchAllTokenDescriptions();
  }, [actions]);

  const renderOutput = (output: any, action_ix: number, output_ix: number) => {
    return (
      <Paper
        key={output.address}
        elevation={0}
        sx={{
          background: "rgba(120,120,120,0.08)",
          p: 2,
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", lg: "row" },
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Recipient:</Typography>
          <Typography sx={{ wordBreak: "break-all" }}>
            {output.address}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", lg: "row" },
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Ergs:</Typography>
          <Typography>{output.nergs / NERGS}</Typography>
        </Box>
        {output.tokens.length > 0 && (
          <>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>
              Additional tokens:{" "}
            </Typography>
            {output.tokens.map(([tokenId, _amount]: string[]) => (
              <Paper
                elevation={0}
                sx={{
                  background: "rgba(120,120,120,0.08)",
                  p: 2,
                  borderRadius: "8px",
                  mb: 2,
                }}
                key={tokenId}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: mobile ? "column" : "row",
                    alignItems: mobile ? "flex-start" : "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>
                    {tokenInfos[tokenId] ? "Name:" : "TokenId:"}
                  </Typography>
                  <Typography
                    sx={{
                      wordBreak: "break-all",
                      textAlign: "right",
                      mb: mobile ? 1 : 0,
                    }}
                  >
                    {tokenInfos && tokenInfos[tokenId]
                      ? tokenInfos[tokenId]?.name
                      : tokenId}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: mobile ? "column" : "row",
                    alignItems: mobile ? "flex-start" : "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>Amount:</Typography>
                  <Typography>
                    {tokenAmounts[action_ix + output_ix + tokenId] || "Loading..."}
                  </Typography>
                </Box>
                {!tokenInfos[tokenId] && (
                  <Typography color="error" variant="caption">
                    Note: Unable to fetch token info. Amount shown does not
                    account for decimals.
                  </Typography>
                )}
              </Paper>
            ))}
          </>
        )}
      </Paper>
    );
  };

  const renderUpdate = (update: any) => {
    return (
      <Paper
        key={update.key}
        elevation={0}
        sx={{
          background: "rgba(120,120,120,0.08)",
          p: 2,
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", lg: "row" },
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Key:</Typography>
          <Typography
            sx={{
              wordBreak: "break-all",
              textAlign: "right",
              mb: mobile ? 1 : 0,
            }}
          >
            {update.key}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", lg: "row" },
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Value:</Typography>
          <Typography
            sx={{
              wordBreak: "break-all",
              textAlign: "right",
              mb: mobile ? 1 : 0,
            }}
          >
            {update.value}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", lg: "row" },
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Type:</Typography>
          <Typography
            sx={{
              wordBreak: "break-all",
              textAlign: "right",
              mb: mobile ? 1 : 0,
            }}
          >
            {update.valueType}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", lg: "row" },
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Action:</Typography>
          <Typography
            sx={{
              wordBreak: "break-all",
              textAlign: "right",
              mb: mobile ? 1 : 0,
            }}
          >
            {update.action}
          </Typography>
        </Box>
      </Paper>
    );
  };

  return (
    <>
      <CapsInfo title="Proposal Content" />
      <Box sx={{ mb: 4 }}>
        {content === undefined ? (
          <Skeleton animation="wave" width="100%" />
        ) : (
          <MarkdownRender description={content} />
        )}
      </Box>
      <CapsInfo title="Proposal Actions" />
      {actions?.map((action, action_ix) => (
        <Box key={action.actionType} sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", lg: "row" },
              mb: 1,
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Action type:</Typography>
            <Typography sx={{ wordBreak: "break-all" }}>
              {action.actionType}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", lg: "row" },
              mb: 1,
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Activation time:</Typography>
            <Typography sx={{ wordBreak: "break-all" }}>
              {new Date(action.action?.activationTime ?? 0).toLocaleString()}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", lg: "row" },
              mb: 1,
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Recurring:</Typography>
            <Typography sx={{ wordBreak: "break-all" }}>
              {action.action?.repeats ? action.action.repeats : "N/A"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", lg: "row" },
              mb: 1,
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 1 }}>
              {action.action && concatUpdates(action.action).length > 0
                ? "Config Diff"
                : "Outputs:"}
            </Typography>
            <Typography sx={{ wordBreak: "break-all" }}>
              {action.action &&
                !action.action?.outputs &&
                concatUpdates(action.action).length === 0 &&
                "N/A"}
            </Typography>
          </Box>
          <Box>
            {action.action?.outputs?.map((output, output_ix) => renderOutput(output, action_ix, output_ix))}
            {action.action &&
              concatUpdates(action.action).map((update) =>
                renderUpdate(update)
              )}
          </Box>
        </Box>
      ))}
    </>
  );
};

const generateTokenDetails = (tokenArray: Token): TokenDetails | null => {
  return tokenArray.length === 2
    ? { tokenId: tokenArray[0], amount: tokenArray[1] }
    : null;
};

const fetchAssetInfo = async (token: TokenDetails): Promise<AssetInfo> => {
  try {
    const assetInfo = await tokenInfo(token.tokenId);
    return assetInfo;
  } catch (error) {
    console.log(error);
    return {
      name: "",
      description: "",
      decimals: 0,
      minted: 0,
      token_type: "Unknown",
      token_meta_data: {},
    };
  }
};

const concatUpdates = (action: IAction) => {
  if (!action) return [];
  // @ts-ignore
  const remove = (action?.remove ?? []).map((config) => {
    return { ...config, action: "remove" };
  });
  // @ts-ignore
  const update = (action?.update ?? []).map((config) => {
    return { ...config, action: "update" };
  });
  // @ts-ignore
  const insert = (action?.insert ?? []).map((config) => {
    return { ...config, action: "insert" };
  });
  return [...remove, ...update, ...insert];
};

export default ProposalInfo;
