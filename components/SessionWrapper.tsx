import React, { PropsWithChildren, useEffect } from "react";
import { GlobalContext } from "@lib/AppContext";
import { AppApi } from "@lib/AppApi";
import { MetaDataHandler } from "@lib/MetaDataHandler";
import { useSession } from "next-auth/react";

export interface SessionWrapperProps {
  api: AppApi;
  metadata: MetaDataHandler;
}

const SessionWrapper = (props: PropsWithChildren<SessionWrapperProps>) => {
  const session = useSession();
  useEffect(() => {
    const interval = setInterval(() => {
      session.update();
    }, 1800 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalContext.Provider
      value={{ api: props.api, metadata: props.metadata }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default SessionWrapper;
