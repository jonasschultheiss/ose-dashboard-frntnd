export default function useSanitizedAsset(asset) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return {
    id: asset.id,
    serial_number: asset.serial_number,
    last_seen: new Date(asset.last_seen_at).toLocaleString(),
    production_date: `${months[new Date(asset.production_date).getMonth()]} ${new Date(asset.production_date).getFullYear()}`,
    tag: {
      name: asset.instrumentations.items[0].tag,
      description: asset.instrumentations.items[0].description,
      accessibility: asset.instrumentations.items[0].accessibility,
      criticality: asset.instrumentations.items[0].criticality,
    },
    product: {
      manufacturer: asset.product.manufacturer.name,
      name: asset.product.name,
      product_code: asset.product.product_code,
    },
    status: {
      name: asset.status.name,
      description: asset.status.description,
      code: asset.status.code,
    },
  };
}
