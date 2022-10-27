import React from "react";
import { paths, props } from "@lib/DistributionPaths";
import Layout from "@components/dao/Layout";

// move dao to a wildcard subdomain
const RedeemDistribution: React.FC = () => {
  return <Layout>Redeem Distribution Here....</Layout>;
};

export default RedeemDistribution;

// routing for the dao urls should be dynamic... the routing for the dao pages is contained here.
// export const getStaticPaths = paths;
// export const getStaticProps = props;
