import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";
import { deviceWrapper } from "@components/utilities/Style";
import AbstractDate from "@components/creation/utilities/AbstractDate";
import VoteDurationSelector from "@components/creation/utilities/VoteDurationSelector";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export interface IConfig {
  action_type: string;
  key: string;
  type: string;
  value: string;
}

export interface IUpdateConfig {
  config: IConfig[];
  voting_duration: string;
  activation_time: number;
}

const allowedActions = ["Insert", "Update", "Remove"];
const allowedKeys = [
  "im.paideia.dao.name",
  "im.paideia.dao.url",
  "im.paideia.dao.threshold",
  "im.paideia.dao.quorum",
  "im.paideia.dao.min.proposal.time",
  "im.paideia.staking.emission.amount",
  "im.paideia.dao.theme",
  "im.paideia.dao.logo",
  "im.paideia.dao.banner",
  "im.paideia.dao.banner.enabled",
  "im.paideia.dao.footer",
  "im.paideia.dao.footer.enabled",
];
const allowedTypes = [
  "Byte",
  "Long",
  "String",
  "Coll[Byte]",
  "Coll[Long]",
  "PaideiaContractSignature",
  "Coll[Coll[?]]",
];

const UpdateConfig: React.FC<IProposalAction> = (props) => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const [value, setValue] = React.useState<IUpdateConfig>({
    config: [
      {
        action_type: "",
        key: "",
        type: "",
        value: "",
      },
    ],
    voting_duration: (24 * 60 * 60).toString(),
    activation_time: Date.now() + 2 * 24 * 60 * 60 * 1000,
  });
  const [votingDuration, setVotingDuration] = React.useState<any>({
    duration: 1,
    unit: "days",
  });

  React.useEffect(() => {
    const temp = [...context.api.value.actions];
    temp[props.c].data = value;
    context.api.setValue({
      ...context.api.value,
      actions: temp,
    });
  }, [value]);

  React.useEffect(() => {
    const multiplier_map = {
      seconds: 1,
      minutes: 60,
      hours: 60 * 60,
      days: 60 * 60 * 24,
      weeks: 60 * 60 * 24 * 7,
    };
    // @ts-ignore
    const multiplier = multiplier_map[votingDuration.unit];
    const voting_duration = votingDuration.duration * multiplier;
    setValue({ ...value, voting_duration: voting_duration.toString() });
  }, [votingDuration]);

  return (
    <Layout>
      <Header
        title="Update DAO Config"
        large
        subtitle="Insert, Update or Remove a key value pair from the DAO Config"
        mb="0"
      />
      <Box
        sx={{
          width: "calc(100% + 1rem)",
          ml: "-.5rem",
          borderBottom: 1,
          borderColor: "border.main",
          mt: ".5rem",
          mb: "1rem",
        }}
      />
      {value.config.map((_config, index) => (
        <Box
          key={"config-update-" + index}
          sx={{
            width: "100%",
            mb: ".75rem",
            display: "flex",
            alignItems: "center",
            flexWrap: deviceWrapper("wrap", "nowrap"),
          }}
        >
          <FormControl
            sx={{
              mr: ".5rem",
              mb: deviceWrapper(".75rem", "0"),
              width: deviceWrapper("100%", "50%"),
            }}
            fullWidth
          >
            <InputLabel id="action-select-label">Action Type</InputLabel>
            <Select
              labelId="action-select-label"
              id="action-select"
              sx={{ width: "100%" }}
              label="Action Type"
              value={value.config[index].action_type}
              onChange={(e: SelectChangeEvent<string>) => {
                const update = [...value.config];
                update[index] = {
                  ...update[index],
                  action_type: e.target.value,
                };
                setValue({
                  ...value,
                  config: [...update],
                });
              }}
            >
              {allowedActions.map((action: string) => (
                <MenuItem value={action.toLowerCase()}>{action}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              mr: ".5rem",
              mb: deviceWrapper(".75rem", "0"),
              width: deviceWrapper("100%", "50%"),
            }}
            fullWidth
          >
            <InputLabel id="key-select-label">Key</InputLabel>
            <Select
              labelId="key-select-label"
              id="key-select"
              sx={{ width: "100%" }}
              label="Key"
              value={value.config[index].key}
              onChange={(e: SelectChangeEvent<string>) => {
                const update = [...value.config];
                update[index] = {
                  ...update[index],
                  key: e.target.value,
                };
                setValue({
                  ...value,
                  config: [...update],
                });
              }}
            >
              {allowedKeys.map((key: string) => (
                <MenuItem value={key}>{key}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              mr: ".5rem",
              mb: deviceWrapper(".75rem", "0"),
              width: deviceWrapper("100%", "50%"),
            }}
            fullWidth
          >
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              sx={{ width: "100%" }}
              label="Type"
              value={value.config[index].type}
              onChange={(e: SelectChangeEvent<string>) => {
                const update = [...value.config];
                update[index] = {
                  ...update[index],
                  type: e.target.value,
                };
                setValue({
                  ...value,
                  config: [...update],
                });
              }}
            >
              {allowedTypes.map((type: string) => (
                <MenuItem value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Value"
            sx={{
              mr: ".5rem",
              mb: deviceWrapper(".75rem", "0"),
              width: deviceWrapper("100%", "50%"),
            }}
            value={value.config[index].value}
            onChange={(e) => {
              const update = [...value.config];
              update[index] = {
                ...update[index],
                value: e.target.value,
              };
              setValue({
                ...value,
                config: [...update],
              });
            }}
          />
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: ".8rem",
          mb: "1.2rem",
        }}
      >
        <Button
          variant="text"
          size="small"
          sx={{ mr: 1 }}
          endIcon={<AddIcon />}
          onClick={() => {
            setValue({
              ...value,
              config: [
                ...value.config,
                {
                  action_type: "",
                  key: "",
                  type: "",
                  value: "",
                },
              ],
            });
          }}
        >
          Add Row
        </Button>
        <Button
          variant="text"
          size="small"
          endIcon={<DeleteIcon />}
          onClick={() => {
            setValue({
              ...value,
              config: value.config.slice(0, value.config.length - 1),
            });
          }}
        >
          Remove Row
        </Button>
      </Box>
      {context.api.errors.actionConfig && (
        <FormHelperText error sx={{ mb: "1rem" }}>
          Config field is not set
        </FormHelperText>
      )}
      <Box
        sx={{
          width: "calc(100% + 1rem)",
          ml: "-.5rem",
          borderBottom: 1,
          borderColor: "border.main",
          mt: "1rem",
          mb: "1rem",
        }}
      />
      <CapsInfo title="Configuration" mb="-1rem" />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "1rem",
          pt: "1rem",
        }}
      >
        <Header
          title="Voting Duration"
          subtitle="Set how long the voting window should be open"
        />
        <FormHelperText error={context.api.errors.votingDuration}>
          {context.api.errors.votingDuration
            ? "Voting duration cannot be less than minimum in Dao Config"
            : `Voting Ends at ${new Date(
                new Date().getTime() +
                  Number(value.voting_duration) * 1000 +
                  900 * 1000
              ).toUTCString()}`}
        </FormHelperText>
        <VoteDurationSelector
          voteDuration={votingDuration.duration}
          set={(val: number) =>
            setVotingDuration({ ...votingDuration, duration: val })
          }
          voteDurationUnits={votingDuration.unit}
          setUnits={(val: string) =>
            setVotingDuration({ ...votingDuration, unit: val })
          }
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          mt: "1rem",
          pt: "1rem",
          mb: "1rem",
        }}
      >
        <Header
          title="Activation Time"
          subtitle="Set time when the action will be executed"
        />
        {context.api.errors.activationTime && (
          <FormHelperText error>
            Activation time cannot be before voting ends
          </FormHelperText>
        )}
        <AbstractDate
          value={new Date(value.activation_time)}
          setValue={(newValue: Date) =>
            setValue({ ...value, activation_time: newValue.getTime() })
          }
          width="50%"
          label="Activation Time"
        />
      </Box>
      <Box sx={{ mb: "2rem" }} />
    </Layout>
  );
};

export default UpdateConfig;
