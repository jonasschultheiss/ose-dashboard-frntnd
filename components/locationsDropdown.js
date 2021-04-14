import LocationDropdownItem from './locationDropdownItem';

export default function LocationsDropdown({ locations, locationSelected }) {
  return (
    <div className="mt-2 mb-4 w-full">
      <p className="font-semibold">Suggestions:</p>
      {locations &&
        locations.map((location, index) => (
          <LocationDropdownItem key={index} location={location} locationSelected={locationSelected} />
        ))}
    </div>
  );
}
