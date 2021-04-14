export default function useDefaultLocation() {
  return {
    title: 'Kägenstrasse 2, 4153 Reinach Basel-Landschaft, Schweiz',
    id: 'here:af:streetsection:5KMg2iHp13CWUtdZQ2BLEB:CgcIBCCy6pd-EAEaATI',
    resultType: 'houseNumber',
    houseNumberType: 'PA',
    address: {
      label: 'Kägenstrasse 2, 4153 Reinach Basel-Landschaft, Schweiz',
      countryCode: 'CHE',
      countryName: 'Schweiz',
      stateCode: 'BL',
      state: 'Basel-Landschaft',
      county: 'Arlesheim',
      city: 'Reinach',
      district: 'Reinach',
      street: 'Kägenstrasse',
      postalCode: '4153',
      houseNumber: '2'
    },
    position: {
      lat: 47.4892,
      lng: 7.59757
    },
    access: [
      {
        lat: 47.4892,
        lng: 7.59783
      }
    ],
    mapView: {
      west: 7.59624,
      south: 47.4883,
      east: 7.5989,
      north: 47.4901
    },
    scoring: {
      queryScore: 1,
      fieldScore: {
        city: 1,
        streets: [1],
        houseNumber: 1,
        postalCode: 1
      }
    }
  };
}
