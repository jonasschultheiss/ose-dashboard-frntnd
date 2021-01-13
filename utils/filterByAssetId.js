export default function filterByTagId(assets, wantedAssetId) {
  const res = assets.find((asset, i) => asset.id === wantedAssetId);

  return res;
}
