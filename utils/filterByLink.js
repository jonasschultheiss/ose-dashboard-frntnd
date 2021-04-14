export default function filterByLink(assets, meshName) {
  return assets.find(asset => asset.mesh?.name === meshName);
}
