import { Header } from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Box } from "@mui/material";
import { IProposalAction } from "@pages/[dao]/proposal/create";
import * as React from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import { IUpdateConfig } from "./UpdateConfig";

const SecurityUpgrade: React.FC<IProposalAction> = (props) => {
  const router = useRouter();
  const query = router.query;
  const context = React.useContext<IProposalContext>(ProposalContext);
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
        const manifest = (
          await context.api?.get<any>(
            `/dao/${query.dao}/security/upgrade-manifest`
          )
        ).data;
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
          activation_time:
            manifest.activationTime ?? Date.now() + 2 * 24 * 60 * 60 * 1000,
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (query.dao) {
      fetchManifest();
    }
  }, [query]);

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
      {value.config.length > 0 ? (
        <Box sx={{ fontSize: ".9rem" }}>
          This will upgrade the following contract config keys to their
          patched (1.1.0) values:
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
      <Box sx={{ mb: "2rem" }} />
    </Layout>
  );
};

export default SecurityUpgrade;
