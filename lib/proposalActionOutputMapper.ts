const B_PAIDEIA_TOKEN_ID =
  "f60fb5aa6127d4a2b537a91518a15eab1d21099cd34bc2e4c9f59022c3dd5af2";
const DAYS_7 = 7 * 24 * 60 * 60 * 100;

export const bPaideiaSendFundsBasic = (
  address: string,
  nergs: number,
  tokens: number
): any => {
  return {
    actionType: "SendFundsBasic",
    action: {
      optionId: 1,
      activationTime: new Date().getTime() + DAYS_7,
      outputs: [
        {
          address: address,
          nergs: nergs + 1000000,
          tokens: [[B_PAIDEIA_TOKEN_ID, tokens]],
          registers: [],
        },
      ],
      repeats: 0,
      repeatDelay: 0,
    },
  };
};
