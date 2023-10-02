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
  actionType: string,
  key: string,
  type: string,
  value: string,
  activation_time: number
): any => {
  const field = {
    key: key,
    valueType: type,
    value: value,
  };
  return {
    actionType: "UpdateConfig",
    action: {
      optionId: 1,
      activationTime: activation_time,
      remove: actionType === "remove" ? [field] : [],
      update: actionType === "update" ? [field] : [],
      insert: actionType === "insert" ? [field] : [],
    },
  };
};
