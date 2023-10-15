import {
  Subheader,
  Subtitle,
} from "@components/creation/utilities/HeaderComponents";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ThemeContext } from "@lib/ThemeContext";
import { DarkTheme } from "@theme/theme";
import { deviceWrapper } from "@components/utilities/Style";
import { IGlobalContext, GlobalContext } from "@lib/AppContext";
import useSWR from "swr";
import { fetcher } from "@lib/utilities";
import { useContext, useEffect, useState } from "react";

export interface IInfoCard {
  title: string;
  value: string;
  last?: boolean;
  ticker?: string;
  dropdown?: boolean;
  c?: number;
  full?: boolean;
}

export const InfoCard: React.FC<IInfoCard> = (props) => {
  const [time, setTime] = useState("24hrs");

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };
  const themeContext = useContext(ThemeContext);
  return (
    <Box
      sx={{
        border: "1px solid",
        backgroundColor: "fileInput.outer",
        borderColor: "border.main",
        borderRadius: ".3rem",
        width: deviceWrapper(props.full ? "100%" : "47.25%", "33%"),
        display: "flex",
        justifyContent: deviceWrapper("flex-start", "center"),
        alignItems: "center",
        p: deviceWrapper(".6rem", "1rem"),
        mt: "1rem",
        mb: deviceWrapper(props.c === 2 ? "1rem" : "0", "1rem"),
        mr:
          props.full || props.last
            ? "0rem"
            : deviceWrapper(
                props.c % 2 === 0 ? "1rem" : "0",
                props.c === 2 ? "0" : "1rem"
              ),
      }}
    >
      <Box sx={{ textAlign: deviceWrapper("left", "center") }}>
        <Box
          sx={{
            fontSize: deviceWrapper(".9rem", "1.3rem"),
            color: "text.primary",
          }}
        >
          {props.value}{" "}
          <Box
            sx={{
              display: "inline",
              color: "text.secondary",
              fontSize: ".9rem",
              fontWeight: 500,
            }}
          >
            {props.ticker}
          </Box>
        </Box>
        <Box
          sx={{
            color: "text.secondary",
            fontSize: deviceWrapper(".7rem", ".9rem"),
          }}
        >
          {props.title}
        </Box>
      </Box>
      {props.dropdown && (
        <Box
          sx={{
            ml: deviceWrapper("auto", "1rem"),
            color: "backgroundColor.main",
          }}
        >
          <Select
            size="small"
            sx={{
              backgroundColor: "primary.main",
              color: "backgroundColor.main",
              fontSize: deviceWrapper(".8rem", ".9rem"),
              p: "-1rem",
              svg: {
                fill: themeContext.theme === DarkTheme ? "black" : "white",
              },
            }}
            notched
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={time}
            onChange={handleChange}
          >
            <MenuItem value="24hrs">24h</MenuItem>
            <MenuItem value="1d">1d</MenuItem>
            <MenuItem value="1w">1w</MenuItem>
            <MenuItem value="1m">1m</MenuItem>
            <MenuItem value="1yr">1yr</MenuItem>
          </Select>
        </Box>
      )}
    </Box>
  );
};

interface IStakingGeneralInfo {
  numberOfStakers: string;
  tokensStaked: string;
  apy: string;
}

const GeneralInfo: React.FC = () => {
  const [data, setData] = useState<IStakingGeneralInfo>({
    numberOfStakers: "-",
    tokensStaked: "-",
    apy: "-",
  });
  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const [daoData] = globalContext.api.daoState;
  const daoId = daoData?.id;

  const { data: stakingData, error: error } = useSWR(
    daoId && `/staking/dao_stake_info/${daoId}`,
    fetcher
  );

  useEffect(() => {
    const getData = async () => {
      setData({
        ...data,
        numberOfStakers: stakingData.stakers,
        tokensStaked: stakingData.total_staked,
        apy: Number(stakingData.apy).toFixed(2),
      });
    };

    if (!error && stakingData) {
      getData();
    }
  }, [stakingData, error]);

  return (
    <Box sx={{ width: "100%", mt: "1rem" }}>
      <Subheader title="General Info" />
      <Subtitle subtitle="Staking your tokens will generate new tokens daily based on the APY percentage below." />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexWrap: deviceWrapper("wrap", "nowrap"),
        }}
      >
        <InfoCard
          title="Number of Stakers"
          value={data.numberOfStakers}
          c={0}
        />
        <InfoCard title="PAI tokens staked" value={data.tokensStaked} c={1} />
        <InfoCard title="Current APY" value={data.apy} last c={2} />
      </Box>
    </Box>
  );
};

export default GeneralInfo;
