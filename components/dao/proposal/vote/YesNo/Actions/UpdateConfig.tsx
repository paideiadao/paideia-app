import {
  CapsInfo,
  Header,
} from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import {
  Box,
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

export interface IUpdateConfig {
  action_type: string;
  key: string;
  type: string;
  value: string;
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
    action_type: "",
    key: "",
    type: "",
    value: "",
    voting_duration: (24 * 60 * 60).toString(),
    activation_time: Date.now() + 2 * 24 * 60 * 60 * 1000,
  });

  React.useEffect(() => {
    const temp = [...context.api.value.actions];
    temp[props.c].data = value;
    context.api.setValue({
      ...context.api.value,
      actions: temp,
    });
  }, [value]);

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
      <Box
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
            value={value.action_type}
            onChange={(e: SelectChangeEvent<string>) => {
              setValue({
                ...value,
                action_type: e.target.value,
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
            value={value.key}
            onChange={(e: SelectChangeEvent<string>) => {
              setValue({
                ...value,
                key: e.target.value,
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
            value={value.type}
            onChange={(e: SelectChangeEvent<string>) => {
              setValue({
                ...value,
                type: e.target.value,
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
          value={value.value}
          onChange={(e) => {
            setValue({
              ...value,
              value: e.target.value,
            });
          }}
        />
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
        <TextField
          error={context.api.errors.votingDuration}
          helperText={
            context.api.errors.votingDuration
              ? "Voting duration cannot be less than minimum in Dao Config"
              : `Voting Ends at ${new Date(
                  new Date().getTime() +
                    Number(value.voting_duration) * 1000 +
                    900 * 1000
                ).toUTCString()}`
          }
          label="Duration in Seconds"
          sx={{ width: "50%" }}
          value={value.voting_duration}
          onChange={(e) => {
            setValue({ ...value, voting_duration: e.target.value });
          }}
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
