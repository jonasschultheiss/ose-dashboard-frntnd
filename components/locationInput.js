import LocationsDropdown from './locationsDropdown';

export default function LocationInput({
  id,
  label,
  changed,
  value,
  placeholder,
  disabled,
  locations,
  locationSelected
}) {
  return (
    <div className="w-full flex flex-col">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className="p-2 rounded-md border-2 border-gray-900
        bg-gray-300 placeholder-gray-600 focus:outline-none disabled:opacity-50"
        type="text"
        onChange={changed}
        name={id}
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
      {locations && locations.length > 0 ? (
        <LocationsDropdown locations={locations} locationSelected={locationSelected} />
      ) : undefined}
    </div>
  );
}
