export const bPaideiaSendFundsBasic = (
  address: string,
  nergs: number,
  tokens: number,
  token_id: string,
  activation_time: number,
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
          tokens: [[token_id, tokens]],
          registers: [],
        },
      ],
      repeats: 0,
      repeatDelay: 0,
    },
  };
};
