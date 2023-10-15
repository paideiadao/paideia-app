import { ICreationData, ITokenHolder } from "./Interfaces";

export function checkCompleteness(_data: ICreationData): boolean {
  switch (_data.navStage) {
    case 0: {
      return (
        _data.basicInformation.daoName === "" ||
        _data.basicInformation.daoUrl === "" ||
        _data.basicInformation.shortDescription === ""
      );
    }
    case 2: {
      return (
        (_data.governance.optimisticGovernance
          ? _data.governance.timeToChallenge === 0 ||
            _data.governance.amount === "" ||
            _data.governance.amount === 0 ||
            _data.governance.currency === ""
          : false) || _data.governance.voteDuration === 0
      );
    }
    case 1: {
      return (
        _data.tokenomics.tokenTicker === "" ||
        _data.tokenomics.tokenName === "" ||
        _data.tokenomics.tokenImage == -1 ||
        (_data.tokenomics.type === "existing"
          ? false
          : _data.tokenomics.tokenRemaining < 0 ||
            _data.tokenomics.tokenAmount === 0 ||
            _data.tokenomics.tokenHolders.filter((i: ITokenHolder) => {
              return i.alias !== "" && i.balance !== 0;
            }).length === 0 ||
            _data.tokenomics.distributions
              .filter((i: any) => i !== undefined)
              .filter((i: any) => {
                return i.balance === 0;
              }).length !== 0 ||
            _data.tokenomics.distributions
              .filter((i: any) => i !== undefined)
              .filter((i: any) => {
                return i.hasOwnProperty("tokenHolders");
              })
              .filter((i: any) => {
                return (
                  i.tokenHolders.filter(
                    (i: any) => i.alias === "" || i.balance === 0
                  ).length > 0
                );
              }).length !== 0)
      );
    }
    case 3: {
      return (
        _data.design.logo.file === undefined ||
        (_data.design.banner.show === true
          ? _data.design.banner.data.file === undefined
          : false) ||
        (_data.design.footer.show === true
          ? _data.design.footer.mainText === ""
          : false)
      );
    }
  }
}

export function bytesToSize(bytes: any) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

export function balanceToPercentage(total: number, balance: number): number {
  return total === 0 ? 0 : parseFloat(((balance / total) * 100).toFixed(6));
}

export function percentageToBalance(total: number, percentage: number): number {
  return parseFloat((total * percentage).toFixed(2));
}

export function percentage(
  value: number,
  places: number = 2,
  showPerc: boolean = true
): string {
  return isNaN(value)
    ? "0" + (showPerc ? "%" : "")
    : (value * 100).toFixed(places) + (showPerc ? "%" : "");
}
