import React from "react";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import Link from "next/link";
import { generateSlug } from "@lib/utilities";

export interface ISecurityUpgradeProposalRef {
  proposalIndex: number;
  name: string;
  proposalId?: string;
}

export interface ISecurityUpgradeStatus {
  needed: boolean;
  staleContracts: string[];
  staleDefaults?: string[];
  activeProposal?: ISecurityUpgradeProposalRef | null;
}

interface ISecurityUpgradeBanner {
  status?: ISecurityUpgradeStatus;
  daoSlug: string;
}

/**
 * Warns, on every page of a DAO, when that DAO is still running the vulnerable 1.0.0
 * governance contracts and needs the security upgrade. If an upgrade proposal is already
 * open it links to that proposal; otherwise it points the user at the create-proposal flow
 * to open one. Renders nothing when the DAO is already patched (`needed` false / undefined).
 */
const SecurityUpgradeBanner: React.FC<ISecurityUpgradeBanner> = ({
  status,
  daoSlug,
}) => {
  if (!status?.needed || !daoSlug) return null;

  const active = status.activeProposal;
  const contracts =
    status.staleContracts && status.staleContracts.length > 0
      ? status.staleContracts.join(", ")
      : "governance contracts";
  const staleDefaults =
    status.staleDefaults && status.staleDefaults.length > 0
      ? status.staleDefaults.join(", ")
      : null;

  // proposal pages are keyed by the api's proposal id; the on-chain index is not a route
  const href = active
    ? active.proposalId
      ? `/${daoSlug}/proposal/${generateSlug(active.proposalId, active.name)}`
      : `/${daoSlug}/proposals`
    : `/${daoSlug}/proposal/create`;

  return (
    <Box sx={{ width: "100%", px: "1rem", pt: ".75rem" }}>
      <Alert
        severity="warning"
        variant="outlined"
        action={
          <Link href={href}>
            <Button color="warning" size="small" sx={{ whiteSpace: "nowrap" }}>
              {active ? "View upgrade proposal" : "Create upgrade proposal"}
            </Button>
          </Link>
        }
        sx={{ alignItems: "center" }}
      >
        <AlertTitle sx={{ mb: 0 }}>Security upgrade required</AlertTitle>
        This DAO is running outdated {contracts} with a known security
        vulnerability.{" "}
        {active
          ? "An upgrade proposal is open — cast your vote to apply the patched contracts."
          : "Open a governance proposal to upgrade to the patched (1.1.0) contracts."}
        {staleDefaults
          ? ` Default templates still to update: ${staleDefaults}.`
          : null}
      </Alert>
    </Box>
  );
};

export default SecurityUpgradeBanner;
