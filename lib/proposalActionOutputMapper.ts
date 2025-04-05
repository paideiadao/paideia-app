import { ISendFundsRecipient } from "@components/dao/proposal/vote/YesNo/Actions/SendFunds";
import { IConfig } from "@components/dao/proposal/vote/YesNo/Actions/UpdateConfig";

const NERGs = 1000000000;

export const bPaideiaSendFundsBasic = (
  funds: ISendFundsRecipient[],
  activation_time: number
): any => {
  return {
    actionType: "SendFundsBasic",
    action: {
      optionId: 1,
      activationTime: activation_time,
      outputs: funds.map((fundDetails) => {
        return {
          address: fundDetails.address,
          nergs: Math.round(fundDetails.ergs * NERGs) + 1000000,
          tokens: fundDetails.tokens.map((token) => {
            return [
              token.tokenId,
              Math.round(Number(token.amount) * Math.pow(10, token.decimals)),
            ];
          }),
          registers: [],
        };
      }),
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
