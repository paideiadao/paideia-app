const DAYS_2 = 2 * 24 * 60 * 60 * 1000;

export const bPaideiaSendFundsBasic = (
  address: string,
  nergs: number,
  tokens: number,
  token_id: string,
): any => {
  return {
    actionType: "SendFundsBasic",
    action: {
      optionId: 1,
      activationTime: new Date().getTime() + DAYS_2,
      outputs: [
        {
          address: address,
          nergs: nergs + 1000000,
          tokens: [[token_id, tokens]],
          registers: [],
        },
      ],
      repeats: 0,
      repeatDelay: 0,
    },
  };
};
