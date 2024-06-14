import { Theme } from "@mui/material";
import * as React from "react";
import { CreationApi } from "./CreationApi";

export interface ICreationContext {
  api: CreationApi;
}

export const CreationContext = React.createContext({
  api: new CreationApi(
    undefined,
    {
      navStage: 0,
      basicInformation: {
        daoName: "",
        daoUrl: "",
        shortDescription: "",
      },
      governance: {
        optimisticGovernance: false,
        quadraticVoting: false,
        timeToChallenge: 0,
        timeToChallengeUnits: "days",
        quorum: 10,
        voteDuration: 0,
        voteDurationUnits: "days",
        whitelist: [
          {
            alias: "",
            address: "",
            img: "",
          },
        ],
        amount: "",
        currency: "",
        supportNeeded: 51,
        pureParticipationWeight: 0,
        participationWeight: 0,
      },
      tokenomics: {
        type: "create",
        tokenName: "",
        tokenId: "",
        tokenTicker: "",
        tokenAmount: 0,
        tokenImage: -1,
        tokenImageUrl: "",
        tokenRemaining: 0,
        tokenHolders: [
          {
            alias: "",
            address: "",
            img: "",
            balance: 0,
            percentage: 0,
          },
        ],
        activateTokenomics: false,
        distributions: [],
        stakingConfig: {
          stakePoolSize: 0,
          stakingEmissionAmount: 0,
          stakingEmissionDelay: 0,
          stakingCycleLength: 0,
          stakingProfitSharePct: 0,
        },
      },
      design: {
        logo: {
          url: "",
          file: undefined,
        },
        theme: 1,
        banner: {
          show: false,
          data: { url: "", file: undefined },
        },
        footer: {
          show: false,
          mainText: "",
          links: [],
        },
      },
      isDraft: 0,
      isPublished: 0,
      review: 0,
      draftModal: false,
    },
    () => {}
  ),
});
