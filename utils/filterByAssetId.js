export default function filterByTagId(assets, wantedAssetId) {
  return assets.find(asset => asset.id === wantedAssetId);
}
