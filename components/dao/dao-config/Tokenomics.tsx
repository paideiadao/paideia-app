import { Header } from "@components/creation/utilities/HeaderComponents";
import {
  ConfigContext,
  IConfigContext,
} from "@lib/dao/dao-config/ConfigContext";
import * as React from "react";

const Tokenomics: React.FC = () => {
  const context = React.useContext<IConfigContext>(ConfigContext);
  return (
    <>
      <Header
        title="Tokenomics and Staking Configuration"
        subtitle="Update your tokenomics and staking configuration"
        mb=".25rem"
      />
    </>
  );
};

export default Tokenomics;
