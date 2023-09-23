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
