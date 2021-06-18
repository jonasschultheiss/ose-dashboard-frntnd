import iso from 'iso-3166-1';
import ReactCountryFlag from 'react-country-flag';

export default function LocationDropdownItem({ location, locationSelected }) {
  return (
    <button
      onClick={() => locationSelected(location)}
      className="focus:outline-none flex flex-row justify-center items-center bg-gray-800 w-full rounded-md p-1 my-1"
    >
      {location.address && <ReactCountryFlag countryCode={iso.whereAlpha3(location.address.countryCode).alpha2} />}
      <p className="text-gray-300 ml-2">{location.title}</p>
    </button>
  );
}
