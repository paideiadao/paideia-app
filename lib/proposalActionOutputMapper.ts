import { IConfig } from "@components/dao/proposal/vote/YesNo/Actions/UpdateConfig";
import { ITokenAmountDetails } from "@components/utilities/MultiTokenAmountSelector";

export const bPaideiaSendFundsBasic = (
  address: string,
  nergs: number,
  tokens: ITokenAmountDetails[],
  activation_time: number
): any => {
  return {
    actionType: "SendFundsBasic",
    action: {
      optionId: 1,
      activationTime: activation_time,
      outputs: [
        {
          address: address,
          nergs: nergs + 1000000,
          // tokens: [[token_id, tokens]],
          tokens: tokens.map((token) => {
            return [
              token.tokenId,
              Number(token.amount) * Math.pow(10, token.decimals),
            ];
          }),
          registers: [],
        },
      ],
      repeats: 0,
      repeatDelay: 0,
    },
  };
};

export const bPaideiaUpdateDAOConfig = (
  config: IConfig[],
  activation_time: number
): any => {
  return {
    actionType: "UpdateConfig",
    action: {
      optionId: 1,
      activationTime: activation_time,
      remove: config
        .filter((cfg) => cfg.action_type === "remove")
        .map((cfg) => {
          return { key: cfg.key, valueType: cfg.type, value: cfg.value };
        }),
      update: config
        .filter((cfg) => cfg.action_type === "update")
        .map((cfg) => {
          return { key: cfg.key, valueType: cfg.type, value: cfg.value };
        }),
      insert: config
        .filter((cfg) => cfg.action_type === "insert")
        .map((cfg) => {
          return { key: cfg.key, valueType: cfg.type, value: cfg.value };
        }),
    },
  };
};
