export const getTokenUtxos = (utxos: any[], tokenId: string) => {
  try {
    return utxos.filter(
      (utxo: any) =>
        utxo.assets.map((asset: any) => asset.tokenId).indexOf(tokenId) > -1
    );
  } catch {
    return [];
  }
};
