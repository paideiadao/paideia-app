import { Header } from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { GlobalContext, IGlobalContext } from "@lib/AppContext";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import { IUpdateConfig } from "./UpdateConfig";

const GOVERNANCE_OPTION = "";

const SecurityUpgrade: React.FC<IProposalAction> = (props) => {
  const router = useRouter();
  const query = router.query;
  const context = React.useContext<IProposalContext>(ProposalContext);
  const globalContext = React.useContext<IGlobalContext>(GlobalContext);
  const staleDefaults: string[] =
    globalContext.api?.daoData?.security_upgrade?.staleDefaults ?? [];
  const [defaultsClass, setDefaultsClass] =
    React.useState<string>(GOVERNANCE_OPTION);
  const [value, setValue] = React.useState<IUpdateConfig>({
    config: [],
    activation_time: Date.now() + 2 * 24 * 60 * 60 * 1000,
  });
  const [apiLoad, setApiLoad] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (apiLoad) {
      const temp = [...(context.api?.value.actions ?? [])];
      temp[props.c ?? 0].data = value;
      context.api?.setValue({
        ...context.api.value,
        actions: temp,
      });
    }
  }, [value, apiLoad]);

  React.useEffect(() => {
    if (context.api) setApiLoad(true);
  }, [context.api]);

  React.useEffect(() => {
    const fetchManifest = async () => {
      try {
        const url = defaultsClass
          ? `/dao/${query.dao}/security/upgrade-manifest?defaults_class=${defaultsClass}`
          : `/dao/${query.dao}/security/upgrade-manifest`;
        const manifest = (await context.api?.get<any>(url)).data;
        const config = [
          ...(manifest.update ?? []).map((u: any) => ({
            action_type: "update",
            key: u.key,
            type: u.valueType,
            value: u.value,
          })),
          ...(manifest.insert ?? []).map((u: any) => ({
            action_type: "insert",
            key: u.key,
            type: u.valueType,
            value: u.value,
          })),
          ...(manifest.remove ?? []).map((k: any) => ({
            action_type: "remove",
            key: k,
            type: "",
            value: "",
          })),
        ];
        setValue({
          config,
          // placeholder only: the create page substitutes the proposal's end
          // time at submit, so the upgrade performs as soon as the vote ends
          activation_time: Date.now(),
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (query.dao) {
      fetchManifest();
    }
  }, [query, defaultsClass]);

  return (
    <Layout>
      <Header
        title="Security Upgrade"
        large
        subtitle="Upgrade this DAO's governance contracts to the patched (1.1.0) versions"
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
      {staleDefaults.length > 0 && (
        <FormControl sx={{ width: "100%", mb: "1rem" }}>
          <InputLabel id="security-upgrade-defaults-class-label">
            What to upgrade
          </InputLabel>
          <Select
            labelId="security-upgrade-defaults-class-label"
            id="security-upgrade-defaults-class"
            sx={{ width: "100%" }}
            label="What to upgrade"
            value={defaultsClass}
            onChange={(e: SelectChangeEvent<string>) => {
              setDefaultsClass(e.target.value);
            }}
          >
            <MenuItem value={GOVERNANCE_OPTION}>
              Governance contracts (StakeVote, ChangeStake, Treasury,
              ProposalBasic whitelist)
            </MenuItem>
            {staleDefaults.map((className) => (
              <MenuItem
                value={className}
                key={`security-upgrade-defaults-class-${className}`}
              >
                Default template: {className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {value.config.length > 0 ? (
        <Box sx={{ fontSize: ".9rem" }}>
          This will upgrade the following contract config keys to their
          patched (1.1.0) values. The upgrade executes as soon as the vote
          ends and passes:
          <Box component="ul" sx={{ mt: ".5rem", mb: 0, pl: "1.25rem" }}>
            {value.config.map((cfg, index) => (
              <Box component="li" key={`security-upgrade-key-${index}`}>
                {cfg.key}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ fontSize: ".9rem", color: "text.secondary" }}>
          This DAO is already on the patched contracts — nothing to upgrade.
        </Box>
      )}
      {staleDefaults.length > 0 && (
        <Box sx={{ fontSize: ".8rem", color: "text.secondary", mt: ".5rem" }}>
          Default templates are upgraded one per proposal (on-chain action
          size limit).
        </Box>
      )}
      <Box sx={{ mb: "2rem" }} />
    </Layout>
  );
};

export default SecurityUpgrade;
