export default function InputField({ id, label, changed, value, placeholder, disabled }) {
  return (
    <div className="w-full flex flex-col my-2">
      {label && <label className="font-semibold" htmlFor={id}>{label}</label>}
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
    </div>
  );
}
